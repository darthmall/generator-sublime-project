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
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;

      done();
    }.bind(this));
  },

  projectfiles: function () {
    this.template('sublime-project', this.name + '.sublime-project');
  }
});

module.exports = SublimeProjectGenerator;
