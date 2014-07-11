/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('sublime-project generator', function () {
  var testDir = path.join(__dirname, 'temp');

  beforeEach(function (done) {
    helpers.testDirectory(testDir, function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('sublime-project:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var name = '[TEST] My Project',
      filename = name + '.sublime-project',
      expected = [
        filename,
      ];

    helpers.mockPrompt(this.app, {
      'name': name
    });
    this.app.run({}, function () {
      helpers.assertFile(expected);
      assert.fileContent(filename, new RegExp('^\\s*"path":\\s*"' + testDir + '",$', 'gm'));
      done();
    });
  });
});
