import svelte from 'crayon-svelte';
import ReactDOM from 'react-dom';
import React from 'react';
import { app } from 'meteor/cereal:ui/lib/crayon';

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

app.path('/secret-santa/**', async ctx => {
  const { App } = await import("meteor/secret-santa/client/main.js");
  ReactDOM.render(<App />, document.querySelector('main'));
})

Meteor.startup(() => {
  app.load();
});
