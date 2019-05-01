class Chart {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.type = data.type ? data.type : 'bar-vertical';

        this.make();
    }

    make() {
        // Stores built HTML strings and final injection function
        this.init();
        // Runs final injection
        this.doInjection();
        // Styles up the chart
        this.styleIt();
    }

    // Loops through data and builds html string
    // based on type of chart
    init() {
        switch (this.type) {
            case 'bar-vertical':
                this.buildItems = this.build();
                this.doInjection = this.inject();
                this.styleIt = this.style();
                break;
        }
    }

    build() {
        var items = [];
        for (var item in this.data.items) {
            var height = this.data.items[item].height;
            var classes = this.data.items[item].classes ? this.data.items[item].classes.join(' ') : '';

            let one = '<div class="chart-item-container">';
            let two = `<div class="chart-item ${classes}" data-height="${height}">`;
            let three = `<div class="chart-item-title" data-height="${height}">`;
            let four = `${this.data.items[item].name}`;
            let end = '</div>';

            let el = one + two + three + four + end + end + end;

            items.push(el);
        }
        return items;
    }

    // Injection for bar type graphs
    inject() {
        return function () {
            let con = document.getElementById(this.container);
            let htmlString = '<div id="chart-max-width-container">';

            for (let item in this.buildItems) htmlString += this.buildItems[item];

            htmlString += '</div>';
            con.innerHTML = htmlString;
            con.id = 'chart-container';
        }
    }

    style() {
        return function () {
            let {container, column} = this.data;

            // Style container
            let con = document.getElementById('chart-container');

            // Set the height of container if given
            if(container) {
                con.style.height = container.height ? container.height : 'auto';
                con.style.width = container.width ? `${container.width}%` : 'auto';
            }

            // Style bars
            let all_bars = document.querySelectorAll('.chart-item-container');
            let count_bars = all_bars.length;
            let width = (100 / count_bars);
            let maxWidth;
            if(column && column.maxWidth) {
                maxWidth = column.maxWidth;
            }

            all_bars.forEach(function (e) {
                let barContainer = e;
                let bar = barContainer.getElementsByClassName('chart-item')[0];

                // set width of bar
                barContainer.style.width = `${width}%`;
                barContainer.style.maxWidth = `${maxWidth}px`;

                let height = bar.getAttribute('data-height');
                bar.style.textAlign = 'center';
                bar.style.height = `${height}px`;
            });

            // Style titles
            let all_titles = document.querySelectorAll('.chart-item-title');
            all_titles.forEach(function (e) {
                let height = e.getAttribute('data-height');
                e.style.lineHeight = `${height}px`;
            });
        }
    }
}

module.exports = Chart;
