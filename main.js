const jsonfile = require( "jsonfile" );
var WC = {
	_DB_NAME: null ,
	_DB_PATH: null ,
	self: {} ,
	open: function( wConfig ) {
		if ( !wConfig ) {
			wC._DB_NAME = "_id_" + Math.random().toString( 36 ).substr( 2 , 7 );
			wC._DB_PATH = process.argv[ 1 ].split( "/" ); xP.pop(); xP = xP.join("/") + "/" + wC._DB_NAME + ".json";
			wC._DB_PATH
			WC.save();
			return;
		}
		var xN , xP = null;
		var xT1 = wConfig.split("/").length;
		if ( xT1 > 1 ) {
			xN = wConfig.split("/"); xN = xN.pop(); xN = xN.split(".json")[0];
			xP = wConfig;
		}
		else {
			xN = wConfig;
			xP = process.argv[ 1 ].split( "/" ); xP.pop(); xP = xP.join("/") + "/" + xN + ".json";
		}
		WC._DB_NAME = xN;
		WC._DB_PATH = xP;
		try { WC.self = jsonfile.readFileSync( WC._DB_PATH ); }
		catch( error ) { WC.self = {}; WC.save(); }
	},
	save: function() { jsonfile.writeFileSync( WC._DB_PATH , WC.self ); }
};
module.exports = WC;