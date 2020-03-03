// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by famtime.js.
import { name as packageName } from "meteor/famtime";

// Write your tests here!
// Here is an example.
Tinytest.add('famtime - example', function (test) {
  test.equal(packageName, "famtime");
});
