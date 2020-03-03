import svelte from 'crayon-svelte';
import crayon from 'crayon';


const app = crayon.create();

app.use(svelte.router());

app.path('/famtime', async ctx => {
  const { App } = await import("meteor/monolith:famtime/client/main.js");
  console.log(App);
  const a = new App({
    target: document.querySelector('main')
  });

})

Meteor.startup(() => {
  app.load();
});
