# jsonfile-obj-db

```javascript
var MyOBJ_DB = require( "jsonfile-obj-db" );
MyOBJ_DB.open( "myCustomOBJName" );
MyOBJ_DB[ "self" ][ "random" ] = {
	some: "obj",
	array: ["asfdsas" , 1 , 3]
};
console.log( MyOBJ_DB.self );
MyOBJ_DB.save();
```


```javascript
var My_OBJ_DB_1 = require( "jsonfile-obj-db ");
MY_OBJ_DB_1.open( "myCustomOBJName" );
console.log( MyOBJ_DB.self );
```
