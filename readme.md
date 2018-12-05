# tableJS

### Getting Started:
Initialize a new table with
```javascript
new Table(<element-id>, <options>);
```
The bare necessities for the options is this:
```javascript
let options = {
  items: [
    {name: <string>, height: <int>}    
  ]
}
```


### Options
```javascript
{
    items: item[],            // array of items (see item interface)
    type: <string>,             // default: 'vertical_bar'
    container: {
        height: <int> | <null>
        width: <int> | <null>
    },
    column: {
        maxWidth: <int> | <null>
    }
}
```

               
### Item Interface
```javascript
{
    name: <string>,
    height: <int>,
    classes: <string[]> | null
}