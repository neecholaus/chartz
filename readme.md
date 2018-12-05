# Tables

## Getting Started:
Initialize a new table with
```javascript
new Table(<element-id>, <options>);
```

Options should follow this standard
```javascript
var options = {
  items: [
    {name: <string>, height: <px>},
    {name: <string>, height: <px>}
  ],
  height:    <px> | <null>,    // optional
  max_width: <px> | <null>     // optional
};
```
