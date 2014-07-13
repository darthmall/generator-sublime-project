'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');


var SublimeProjectGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous SublimeProject generator!'));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What would you like to call this project?',
      default: this.appname
    }, {
      type: 'checkbox',
      name: 'projectfiles',
      message: 'What other project files would you like?',
      choices: [{
        name: '.editorconfig',
        value: 'includeEditorconfig',
        checked: true
      }, {
        name: '.jshintrc',
        value: 'includeJShintrc',
        checke: false
      }]
    }];

    this.prompt(prompts, function (props) {
      var projectfiles = props.projectfiles;

      function includeFile(file) {
        return projectfiles && projectfiles.indexOf(file) > -1;
      }

      this.name = props.name;

      this.includeEditorconfig = includeFile('includeEditorconfig');
      this.includeJShintrc = includeFile('includeJShintrc');

      done();
    }.bind(this));
  },

  projectfiles: function () {
    this.template('sublime-project', this.name + '.sublime-project');

    if (this.includeEditorconfig) {
      this.copy('editorconfig', '.editorconfig');
    }

    if (this.includeJShintrc) {
      this.copy('jshintrc', '.jshintrc');
    }
  }
});

module.exports = SublimeProjectGenerator;
