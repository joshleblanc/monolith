import React from 'react';
import { autorun } from 'meteor/cereal:reactive-render';

export default function(Component) {
  return autorun(class extends React.Component {
    render() {
      if(!Meteor.userId()) return null;
      return <Component />;
    }
  });
}