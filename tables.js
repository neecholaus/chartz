class Table {
  
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.type = data.type ? data.type : 'vertical_bar';
    
    this.runBuildFunction();   
  }



  runBuildFunction() {
    // Stores built HTML strings and final injection function
    this.build();
    // Runs final injection
    this.inject();
    // Styles up the table
    this.styleIt();
  }



  // Loops through data and builds html string
  // based on type of table
  build() {
    switch (this.type) {
      case 'vertical_bar':
	this.buildItems = this.vertical_bar_build();
	this.inject = this.bar_injection();
	this.styleIt = this.vertical_bar_style();
	break;
    }
  }
  
  





  // ================================== BUILDS ================================== \\
  
  // VERTICAL BUILD 
  vertical_bar_build() {
    var items = [];
    for(var item in this.data.items) {
      var height = this.data.items[item].height;
      var classes = this.data.items[item].classes ? this.data.items[item].classes.join(' ') : '';
      var item = `<div class="vertical_bar_con"><div class="vertical_bar ${classes}" data-height="${height}"><div class="vertical_bar_title" data-height="${height}">${this.data.items[item].name}</div></div></div>`;
      items.push(item);
    }
    return items;
  }









  // ================================== INJECTIONS ================================== \\
  // Injection for bar type graphs
  bar_injection() {
    return function() {
      var con = document.getElementById(this.container);
      var htmlString = '<div id="vertical_max_width_con">';
      for(var item in this.buildItems) {
	htmlString += this.buildItems[item];
      }
      htmlString += '</div>';
      con.innerHTML = htmlString;
      con.id = `${this.type}_table_con`;
    }
  }








  // ================================== STYLING ================================== \\
  vertical_bar_style() {
    return function() {

      // Style container
      var con = document.getElementById('vertical_bar_table_con');
      if(this.data.max) {
	con.style.height = this.data.max;
      }
      
      // Style bars
      var all_bars = document.querySelectorAll('.vertical_bar_con');
      var count_bars = all_bars.length;
      var width = (100 / count_bars);
      if(this.data.max_width) {
	var max_width = this.data.max_width;
      }
      all_bars.forEach(function(e) {
	var height = e.getAttribute('data-height');
	e.style = `width: ${width}% !important; text-align: center; height: ${height}px; max-width: ${max_width}px;`;
      });

      // Style titles
      var all_titles = document.querySelectorAll('.vertical_bar_title');
      all_titles.forEach(function(e) {
	var height = e.getAttribute('data-height');
	e.style = `line-height: ${height}px`;
      });
    }
  }

  



  
// End of constructor
}







// Test Data for a vertical bar table.
var data = {
  'items' : [
    {'name': 'Bar 1', 'height': 100, 'classes': ['red']},
    {'name': 'Bar 1', 'height': 400, 'classes': ['green']}
  ],
  'type': 'vertical_bar',
  'max': 400,
  'max_width': 200,
}
new Table('container', data);


