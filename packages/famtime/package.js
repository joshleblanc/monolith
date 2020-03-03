Package.describe({
  name: 'monolith:famtime',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.9.2');
  api.use('svelte:compiler');
  api.use('ecmascript');
  api.use('jagi:astronomy');
  api.use('mongo');
  api.use('lichthagel:accounts-discord');
  api.use('service-configuration');
  api.use('http');
  api.use('littledata:synced-cron');
  api.use('percolate:migrations');
  api.mainModule('server/main.js', ['server']);

  api.addFiles('client/App.svelte');

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('monolith:famtime');
  api.mainModule('famtime-tests.js');
});
