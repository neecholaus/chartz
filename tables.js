class Table {
  
  constructor(container, data) {
    this.container = container;
    this.options = data.options;
    this.data = data;
    this.type = data.options.type ? data.options.type : 'vertical_bar';

    
    this.runBuildFunction();   
  }



  runBuildFunction() {
    // Stores built HTML strings and final injection function
    this.buildInjection();
    // Runs final injection
    this.runInjection();
  }



  // Loops through data and builds html string
  // based on type of table
  buildInjection() {
    switch (this.type) {
      case 'horizontal_bar':
	this.buildItems = this.horizontal_bar_build();
	this.injection = this.bar_injection();
	break;
      case 'vertical_bar':
	this.buildItems = this.vertical_bar_build();
	this.injection = this.bar_injection();
	break;
    }
  }


  // Runs the final injection function
  runInjection() {
    this.injection();
  }
  
  

  // Horizontal Bar Table Builds
  horizontal_bar_build() {
    var items = [];
    for(var item in this.data.items) {
      var width = this.data.max - (this.data.max / this.data.items[item].width);
      var item = `<div class="width-bar" data-width="${width}"><div class="horizontal-bar-title">${this.data.items[item].name}</div></div>`;
      items.push(item);
    }
    return items;
  }
  
  
  // Vertical Bar Table Builds
  // HTML String builder
  vertical_bar_build() {
    var items = [];
    for(var item in this.data.items) {
      var height = this.data.max - (this.data.max / this.data.items[item].height);
      var item = `<div class="vertical-bar" data-height="${height}"><div class="vertical-bar-title">${this.data.items[item].name}</div></div>`;
      items.push(item);
    }
    return items;
  }




  // Injection for bar type graphs
  bar_injection() {
    return function() {
      var con = document.getElementById(this.container);
      var htmlString = '';
      for(var item in this.buildItems) {
	htmlString += this.buildItems[item];
      }
      con.innerHTML = htmlString;
    }
  }




  
// End of constructor
}







// Test Data for a vertical bar table.
var data = {
  'items' : [
    {'name': 'bar1', 'height': 7},
    {'name': 'bar2', 'height': 8},
    {'name': 'bar3', 'height': 9}
  ],
  'max': 10,
  'x_title': 'X axis',
  'y_title': 'Y axis',
  'options': {}
}
new Table('user-links', data);


