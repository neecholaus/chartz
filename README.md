
# tableJS

![Sreenshot of an example](./docs/screenshot.png)

### Getting Started:
Initialize a new table with:
```javascript
new Table(elementId, options);
```
The bare necessities for the options is this:
```javascript
{
  items: [{
        name: <string>,
        height: <int>
    }]
}
```


### Options
```javascript
{
    items: [],
    type: <string>, /* Defaults to 'vertical_bar' */
    container: {
        height: <string>, /* Optional | Passed exactly as given */
        width: <int> /* Optional | Passed as percentage */
    },
    column: {
        maxWidth: <int> /* Optional | Passed as px */
    }
}
```


### Item Interface
```javascript
{
    name: <string>,
    height: <int>,
    classes: <array of strings> /* Optional */
}
```
