<script>
  import CurrentUserDisplay from './CurrentUserDisplay';
  import { format } from '../constants';
  import moment from 'moment';
  import Divider from './Divider';
  import { Tracker } from 'meteor/tracker';
  import { onDestroy } from 'svelte';
  import { Meteor } from 'meteor/meteor';
  import { User } from '../../lib/User';
  import { Event } from '../../lib/Event';
  import List from './List';
  import ListItemText from './ListItemText';
  import ListItem from './ListItem';
  import ListItemPrimaryText from './ListItemPrimaryText';
  import ListItemSecondaryText from './ListItemSecondaryText';
  import ListItemTertiaryText from './ListItemTertiaryText';
  import ServerListItem from './ServerListItem';
  import ListItemAvatar from './ListItemAvatar';
  import Avatar from './Avatar';
  import { Link } from 'svelte-routing';
  import Loader from './Loader';


  let events = [];
  let gameHandle;
  let serverHandle;
  let eventHandle;
  let ready = true;

  const computation = Tracker.autorun(() => {
    const user = User.current();
    const now = new Date();
    now.setHours(now.getHours() - 3);
    if(user) {
      events = Event.find({
        $and: [
          {
            serverId: {
              $in: user.servers
            }
          },
          {
            date: {
              $gt: now
            }
          }
        ]

      }, { sort: { date: 1 }}).fetch();
    } else {
      events = [];
    }
  });

  onDestroy(() => {
    computation.stop();
  });

</script>

<style>
  p {
    padding: 8px;
  }
</style>

<CurrentUserDisplay />
<Divider />
<List>
  {#if events.length === 0}
    <ListItem>
      <ListItemText>
        <ListItemPrimaryText>No events have been created!</ListItemPrimaryText>
      </ListItemText>
    </ListItem>
  {:else}
    {#each events as event}
      <Link to={`events/${event._id.toHexString()}`}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={event.game().iconUrl()}></Avatar>
          </ListItemAvatar>
          <ListItemText>
            <ListItemPrimaryText>{event.name}</ListItemPrimaryText>
            <ListItemSecondaryText>{event.server().name}</ListItemSecondaryText>
            <ListItemTertiaryText>{moment(event.date).format(format)}</ListItemTertiaryText>
          </ListItemText>
        </ListItem>
      </Link>
    {/each}
  {/if}
</List>
