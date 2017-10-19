class Table {
 
  constructor(container, data) {
    this.container = container;
    this.options = data.options;
    this.data = data;
    this.type = data.options.type ? data.options.type : 'vertical_bar';
    
    this.buildItems = this.runBuildFunction;
    this.injectTable();
    console.log(this);
  }



  get runBuildFunction() {
    var items = [];
    // will run a different build function depending on type of table user 
    switch (this.type) {
	
      case 'vertical_bar':
	for(var item in this.data.items) {
	  var height = this.data.max - (this.data.max / this.data.items[item].height);
	  var item = `<div class="vertical-bar" data-height="${height}"></div>`;
	  items.push(item);
	}
	break;
    }

    // assign array of items to class
    return items;
  }

  
  // Puts data into container
  injectTable() {
    var con = document.getElementById(this.container);
    con.innerHTML = '';
  }

}


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


