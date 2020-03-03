import App from './App.svelte';
import 'bulma/css/bulma.css';
import 'nes.css/css/nes.css';
import '@fortawesome/fontawesome-pro/js/brands.js';
import '@fortawesome/fontawesome-pro/js/regular';
import '@fortawesome/fontawesome-pro/js/fontawesome.js';
import 'pickerjs/dist/picker.css';

console.log("??");

Meteor.startup(() => {

  const a = new App({
    target: document.querySelector('main')
  });
  console.log(a);
});