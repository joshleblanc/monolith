import svelte from 'crayon-svelte';
import crayon from 'crayon';
import ReactDOM from 'react-dom';
import React from 'react';

const app = crayon.create();

app.use(svelte.router());

app.path('/famtime/**', async ctx => {
  const { App } = await import("meteor/famtime/client/main.js");
  new App({
    target: document.querySelector('main')
  });
});

app.path('/gnashblade/**', async ctx => {
  const { App } = await import("meteor/gnashblade/client/main.jsx")
  ReactDOM.render(<App />, document.querySelector('main'));
});

Meteor.startup(() => {
  app.load();
});
