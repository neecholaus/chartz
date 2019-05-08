# Chartz

![Sreenshot of an example](./docs/example.png)

### Getting Started:
First you need to require the module in your bundled javascript file.
```js
const Chart = require('chartz');
```
Once the javascript is taken care of, you need to import the scss file.
```scss
@import('chartz/chartz')
```
Support for vanilla JS or CSS via `<script>` or `<link>` tags is not currently available, but that is part of the roadmap.

Initialize a new chart with:
```js
new Chart(elementId, options);
```
The bare necessities for the options is this:
```js
{
  items: [{
        name: <string>,
        height: <int>
    }]
}
```


### Options
```js
{
    items: [],
    type: <string>, /* Defaults to 'bar-vertical' */
    container: {
        height: <string>, /* Optional | Passed exactly as given */
        width: <int> /* Optional | Passed as percentage */
    },
    column: {
        maxWidth: <int> /* Optional | Passed as px */
    }
}
```

### Chart Types:
There are many types on the roadmap, but for now there is only one – `bar-vertical`. Please let me know what charts you would find most useful.


### Item Interface
```js
{
    name: <string>,
    height: <int>,
    classes: <array of strings> /* Optional */
}
```

### Additional Options
By default you can add any of the following classes to an item to achieve similar styling to Bootstrap's associated colors.
`success`  `danger`  `info` `secondary` `warning`  `secondary`