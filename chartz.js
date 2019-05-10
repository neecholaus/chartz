class Chart {
    constructor(parent, data) {
        this.parent = parent;
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

    /*
     * Returns {bars, axes}
     * Axes is optional, but bars is required.
     */
    build() {
        let bars = [],
        axes = [];

        for (let idx in this.data.items) {
            let item = this.data.items[idx],
            classes = item.classes ? item.classes.join(' ') : '';

            let a =  '<div class="chart-item-container">',
                b = `<div class="chart-item ${classes}" data-height="${item.height}">`,
                c = '';

            if(item.name) {
                c = `<div class="chart-item-title" data-height="${item.height}">`;
                c+= `${item.name}</div>`;
            }

            let d = '</div>';

            let bar = [a,b,c,d,d].join('');

            bars.push(bar);

            // Axes
            let e = `<div class="chart-x-axis-item">${item.x ? item.x : ''}</div>`;	

            axes.push({x:e});
        }

        return {bars,axes};
    }

    // Injection for bar type graphs
    inject() {
        return function () {
            const injectAxis = (axes) => {
                let str = '<div class="chart-x-axis-container">';

                for(let idx in axes) str += axes[idx].x;

                str += '</div>';
                return str;
            }
            
            let {bars, axes} = this.buildItems,
                html = '';
            
            if(this.data.container.axisPosition == 'top') html+= injectAxis(axes);
            
            let con = document.getElementById(this.parent);

            html+= '<div id="chart-max-width-container">';

            for(let bar in bars) html += bars[bar];

            html+= '</div></div>';

            if(['bottom',undefined].indexOf(this.data.container.axisPosition) !== -1) html+= injectAxis(axes); 

            con.innerHTML = html;
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
                let {height,width} = container;
                con.style.height = height ? height : 'auto';
                con.style.width = width ? `${width}%` : 'auto';
            }

            // Style bars
            let bars = document.querySelectorAll('.chart-item-container'),
                barWidth = (100 / bars.length),
                maxWidth;

            if(column && column.maxWidth) maxWidth = column.maxWidth;

            bars.forEach(function (e) {
                let barContainer = e;
                let bar = barContainer.getElementsByClassName('chart-item')[0];

                // set width of bar
                barContainer.style.width = `${barWidth}%`;
                barContainer.style.maxWidth = `${maxWidth}px`;

                let barHeight = bar.getAttribute('data-height');
                bar.style.textAlign = 'center';
                bar.style.height = `${barHeight}px`;
            });

            // Style titles
            let titles = document.querySelectorAll('.chart-item-title');
            titles.forEach(function (e) {
                let height = e.getAttribute('data-height');
                e.style.lineHeight = `${height}px`;
            });

            let xAxisItems = document.querySelectorAll('.chart-x-axis-container .chart-x-axis-item');
            xAxisItems.forEach(item => {
                item.style.width = `${barWidth}%`;
                item.style.maxWidth = `${maxWidth}px`;
            });
        }
    }
}

module.exports = Chart;
