const jsonfile = require( "jsonfile" );
var WC = {
	_DB_NAME: null ,
	_DB_PATH: null ,
	self: {} ,
	open: function( wConfig ) {

		if ( !wConfig ) {
			var xP = process.argv[ 1 ].split( "/" );
			xP.pop();
			WC._DB_NAME = "_id_" + Math.random().toString( 36 ).substr( 2 , 7 );
			WC._DB_PATH = xP.join("/") + "/" + WC._DB_NAME + ".json";
			WC.save();
			return;
		}
		var isCFGaOBJ = typeof wConfig === "object" ? true : false;
		if ( !isCFGaOBJ ) { var x1 = wConfig; wConfig = {}; wConfig.path = x1; }
		var xN , xP = null;
		var xT1 = wConfig.path.split("/").length;
		if ( xT1 > 1 ) {
			xN = wConfig.path.split("/"); xN = xN.pop(); xN = xN.split(".json")[0];
			xP = wConfig.path;
		}
		else {
			xN = wConfig.path;
			xP = process.argv[ 1 ].split( "/" ); xP.pop(); xP = xP.join("/") + "/" + xN + ".json";
		}
		if ( xP.indexOf(".json") === -1 ) { xP = xP + ".json"; }
		WC._DB_NAME = xN;
		WC._DB_PATH = xP;

		try { WC.self = jsonfile.readFileSync( WC._DB_PATH ); }
		catch( error ) {
			if ( wConfig.skeleton ) {
				WC.self = wConfig.skeleton;
			}
			else {
				WC.self = {}; 
			}
			WC.save(); 
		}
	},
	save: function() { jsonfile.writeFileSync( WC._DB_PATH , WC.self ); },
	edit: function( ...args ) {

		// https://stackoverflow.com/questions/16533384/javascript-assign-value-to-element-in-nested-object-without-knowing-level

		var x1 = args;
		var wNV = x1.pop();

		function recReplace( o , i ) {
			var ii = i.shift();
			if ( i.length == 0 ) {
				if ( !o[ ii ] ) { o[ ii ] = {}; }
				o[ ii ] = wNV;
			}
			else {
				if ( !o[ ii ] ) { o[ ii ] = {}; }
				o[ ii ] = recReplace( o[ ii ] , i );
			}
			return o;
		}

		WC.self = recReplace( WC.self , x1 );
		WC.save();

	}
};
module.exports = WC;