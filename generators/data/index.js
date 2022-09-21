var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);

		// Next, add your custom code
		//this.option('babel'); // This method adds support for a `--babel` flag
	}
	
	//--- request user input for view that will generated
	async prompting() {
		const answers = await this.prompt([
		  {
			type: "input",
			name: "viewName",
			message: "Enter a name for the new view (i.e. todo, will create todo-list , todo-view views group and its fakedb file) ",
			default: this.appname // Default to current folder name
		  }
		]);

		this.log("view name", answers.viewName);
		
	}
	
	
};
