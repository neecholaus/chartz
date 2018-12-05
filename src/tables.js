class Table {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.type = data.type ? data.type : 'vertical_bar';

        this.runBuildFunction();
    }

    runBuildFunction() {
        // Stores built HTML strings and final injection function
        this.init();
        // Runs final injection
        this.doInjection();
        // Styles up the table
        this.styleIt();
    }

    // Loops through data and builds html string
    // based on type of table
    init() {
        switch (this.type) {
            case 'vertical_bar':
                this.buildItems = this.build();
                this.doInjection = this.inject();
                this.styleIt = this.style();
                break;
        }
    }

    build() {
        var items = [];
        for(var item in this.data.items) {
            var height = this.data.items[item].height;
            var classes = this.data.items[item].classes ? this.data.items[item].classes.join(' ') : '';

            let one = '<div class="vertical_bar_con">';
            let two = `<div class="vertical_bar ${classes}" data-height="${height}">`;
            let three = `<div class="vertical_bar_title" data-height="${height}">`;
            let four = `${this.data.items[item].name}`;
            let end = '</div>';

            let el = one + two + three + four + end + end + end;

            items.push(el);
        }
        return items;
    }

    // Injection for bar type graphs
    inject() {
        return function() {
            let con = document.getElementById(this.container);
            let htmlString = '<div id="vertical_max_width_con">';
            for(let item in this.buildItems) {
                htmlString += this.buildItems[item];
            }
            htmlString += '</div>';
            con.innerHTML = htmlString;
            con.id = `${this.type}_table_con`;
        }
    }

    style() {
        return function () {

            // Style container
            var con = document.getElementById('vertical_bar_table_con');

            // Set the height of container if given
            if (this.data.height) {
                con.style.height = this.data.height;
            }

            // Style bars
            let all_bars = document.querySelectorAll('.vertical_bar_con');
            let count_bars = all_bars.length;
            let width = (100 / count_bars);
            let max_width;
            if (this.data.max_width) {
                max_width = this.data.max_width;
            }

            all_bars.forEach(function (e) {
                let barContainer = e;
                let bar = barContainer.getElementsByClassName('vertical_bar')[0];

                // set width of bar
                barContainer.style.width = `${width}%`;
                barContainer.style.maxWidth = `${max_width}px`;

                let height = bar.getAttribute('data-height');
                bar.style.textAlign = 'center';
                bar.style.height = `${height}px`;
            });

            // Style titles
            let all_titles = document.querySelectorAll('.vertical_bar_title');
            all_titles.forEach(function (e) {
                let height = e.getAttribute('data-height');
                e.style.lineHeight = `${height}px`;
            });
        }
    }
}
