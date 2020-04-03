import react from 'crayon-react';
import React from 'react';
import { app } from 'meteor/cereal:ui/lib/crayon';

app.use(react.router());

app.path('/famtime/**', async ctx => {
  const { App } = await import("meteor/famtime/client/main.js");
  new App({
    target: document.querySelector('main')
  });
});


app.path('/gnashblade/**', async ctx => {
  const { App } = await import("meteor/gnashblade/client/main.jsx")
  ctx.mount(() => <App />)
});

app.path('/secret-santa/**', async ctx => {
  const { App } = await import("meteor/secret-santa/client/main.js");
  ctx.mount(() => <App />)
})

Meteor.startup(() => {
  app.load();
});
