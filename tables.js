class Table {
 
  constructor(container, data) {
    this.container = container;
    this.options = data.options;
    this.data = data;
    this.type = data.options.type ? data.options.type : 'vertical_bar';
    console.log(this);
    this.buildVerticalBlocks();
    this.injectTable();
  }

  // setting a property that the user cannot change (it's a constant)
  get skel(){
    return {
      'vertical_bar': function() {
	
      }
    };
  }

  

  buildVerticalBlocks() {
    var rects = [];
    for(var item in this.data.items) {
      console.log(this.data.items[item]);
      rect = '';
      rects.push(rect);
    }
  }


  
  // Puts data into container
  injectTable() {
    var con = document.getElementById(this.container);
    con.innerHTML = '';
  }

}


var data = {
  'items' : [
    {'name': 'bar1', 'units': 7},
    {'name': 'bar2', 'units': 8},
    {'name': 'bar3', 'units': 9}
  ],
  'top': 10,
  'x_title': 'X axis',
  'y_title': 'Y axis',
  'options': {}
}
new Table('shipping_header', data);


