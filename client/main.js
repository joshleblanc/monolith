import svelte from 'crayon-svelte';
import crayon from 'crayon';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('main'));
})
