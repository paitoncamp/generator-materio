'use strict'
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var cc = require('camelCase');
var generators = require('yeoman-generator');

module.exports = class extends generators {
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
	/*
    this.argument("viewName", { type: String, required: false });
	this.argument("tableColumns", { type: String, required: false });
	if(this.options.viewName!=null && this.options.viewName!=""){
		if(this.options.tableColumns==null || this.options.tableColumns==""){
			this.options.tableColumns="ID|Name|Status";  //set to default value
		}
	}

    // And you can then access it later; e.g.
    this.log(this.options.viewName);
	this.log(this.options.tableColumns);
	this.viewName = this.options.viewName;
	this.tableColumns = this.options.tableColumns;
	*/
  }
  
  async prompting() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "viewName",
        message: "Enter your view name",
        default: 'defaultView' // Default to current folder name
      },
      {
        type: "input",
        name: "tableColumns",
        message: "Please specify table columns, separated by | symbol (i.e  ID|Name|Status)",
		default: 'ID|Name|Status'
      }
    ]);

    this.log("app name", answers.viewName);
    this.log("columns feature", answers.tableColumns);
	this.viewName = answers.viewName;
	this.tableColumns = answers.tableColumns;
  }
  /*
  paths() {
    this.destinationRoot();
    // returns '~/projects'

    this.destinationPath('index.js');
    // returns '~/projects/index.js'
	
	this.sourceRoot();
    // returns './templates'

    this.templatePath('index.js');
    // returns './templates/index.js'
  }
  */
  
  writing() {
    this.fs.copyTpl(
      this.templatePath('views/viewNameStoreModule.js'),
      this.destinationPath('views/apps/'+this.viewName+'/'+_.camelCase(this.viewName)+'StoreModule.js'),
      {	  viewName: this.viewName }
    );
	
	this.fs.copyTpl(
      this.templatePath('views/viewName-list/useViewNameList.js'),
      this.destinationPath('views/apps/'+this.viewName+'/'+this.viewName+'-list/use'+_.camelCase(this.viewName)+'List.js'),
      {	  viewName: this.viewName }
    );
	
	this.fs.copyTpl(
      this.templatePath('views/viewName-list/ViewNameList.vue'),
      this.destinationPath('views/apps/'+this.viewName+'/'+this.viewName+'-list/'+_.camelCase(this.viewName)+'List.vue'),
      {	  viewName: this.viewName }
    );
  }
  
}; 