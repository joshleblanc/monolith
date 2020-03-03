import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { Game } from '../lib/Game';
import { Server } from '../lib/Server';
import { User } from '../lib/User';
import moment from 'moment';
import { daysOfWeek } from './utils';
import { Webhook } from '../lib/Webhook';

const Events = new Mongo.Collection('events', { idGeneration: 'MONGO' });

export const Event = Class.create({
    name: 'Event',
    collection: Events,
    fields: {
        name: {
            type: String,
            default: null,
            validators: [{
                type: 'minLength',
                param: 3
            }]
        },
        description: {
            type: String,
            default: "",
            validators: [{
                type: 'maxLength',
                param: 1000
            }]
        },
        serverId: Mongo.ObjectID,
        gameId: Mongo.ObjectID,
        creatorId: String,
        userIds: {
            type: [String],
            default: []
        },
        date: {
            type: Date,
            default: new Date(),
            validators: [{
                type: 'gt',
                param: new Date()
            }]
        },
    },
    helpers: {
        game() {
            return Game.findOne({ _id: this.gameId });
        },
        server() {
            return Server.findOne({ _id: this.serverId });
        },
        webhooks() {
            return Webhook.find({
                serverId: this.serverId
            });
        },
        users() {
            return User.find({
                _id: {
                    $in: this.userIds
                }
            });
        },
        availableUsers() {
            const d = moment(this.date).utc();
            const time = d.format('HH:00');
            const timeTableTime = `${daysOfWeek[d.day()]} ${time}`;
            const users = User.find({
                servers: {
                    $elemMatch: {
                        $eq: this.serverId
                    }
                },
                $or: [
                    {
                        checkGames: false
                    },
                    {
                        games: {
                            $elemMatch: {
                                $eq: this.gameId
                            }
                        }
                    }
                ],
                $or: [
                    {
                        alwaysAvailable: true
                    },
                    {
                        timeTable: {
                            $elemMatch: {
                                $eq: timeTableTime
                            }
                        }
                    }
                ]
                
            });
            return users.count();
        }
    },
    meteorMethods: {
        insert(callback) {
            this.validate({}, (err) => {
                if(!err) {
                    this.userIds = [ this.creatorId ];
                    const webhooks = this.webhooks().fetch();
                    this.save((err, id) => {
                        if(!err) {
                            webhooks.forEach(webhook => webhook.sendEvent("An event has been created on Famti.me!", this));
                            if(callback) {
                                callback(id);
                            }
                        }
                    });
                }
            });
        },
        destroy() {
            if(Meteor.userId() === this.creatorId) {
                this.remove();
            }
        },
        registerUser(userId) {
            if(this.userIds.includes(userId)) {
                this.userIds = this.userIds.filter(id => id !== userId);
            } else {
                this.userIds = [userId, ...this.userIds];
            }
            return this.save({ fields: ['userIds'] });
        }
    }
});
Event.sendReminders = function() {
    const now = moment().utc();
    Event.find({
        date: {
            $gt: new Date()
        }
    }).fetch().forEach(event => {
        let description;
        const date = moment(event.date).utc();
        const duration = moment.duration(date.diff(now));
        const minutes = Math.floor(duration.asMinutes());
        if(minutes === 15) {
            description = "An event is going to start in 15 minutes on Famti.me!"
        } else if(minutes === 0) {
            description = "An event has started on Famti.me!";
        } else {
            return;
        }
        const webhooks = event.webhooks();
        webhooks.forEach(webhook => {
            webhook.sendEvent(description, event);
        });
    });
};