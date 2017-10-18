
class Table {
 
  constructor(container, options, data) {
    this.container = container;
    this.options = options;
    this.data = data;
    this.type = options.type ?: 'vertical_bar';
    
    this.buildTable();
    this.injectTable();
  }

  // setting a property that the user cannot change i.e. a constant
  get skel(){
    return {
      'vertical_bar': {
	
      },
      'horizontal_bar': {
	
      }
    };
  }

  buildTable() {
    
  }


  
  // Puts data into container
  injectTable() {
    var con = document.getElementById(this.container);
    con.innerHTML = '';
  }

}

