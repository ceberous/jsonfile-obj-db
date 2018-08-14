# jsonfile-obj-db

```javascript
const JFODB = require( "jsonfile-obj-db" );

( ()=> {

	const my_db_1 = new JFODB( "test1" );
	const my_db_2 = new JFODB( "test2" );

	my_db_1.self[ "1" ] = [ "1" , 2 , [ 3 , 5 ] ];
	my_db_1.save();
	my_db_2.self[ "2" ] = "test";
	my_db_2.save();

})();
```