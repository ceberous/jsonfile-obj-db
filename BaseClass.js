const process = require( "process" );
const jsonfile = require( "jsonfile" );

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


class JFO_DB_BaseClass {

	constructor( wConfigOBJ ) {
		
		this.config = wConfigOBJ;
		console.log( this.config );
		this._DB_NAME = null;
		this._DB_PATH = null;
		this.self = {};

		if ( !wConfigOBJ ) {
			let xP = process.argv[ 1 ].split( "/" );
			xP.pop();
			this._DB_NAME = "_id_" + Math.random().toString( 36 ).substr( 2 , 7 );
			this._DB_PATH = xP.join("/") + "/" + this._DB_NAME + ".json";
			this.save();
			return;
		}

		let isCFGaOBJ = typeof wConfigOBJ === "object" ? true : false;
		if ( !isCFGaOBJ ) { let x1 = wConfigOBJ; wConfigOBJ = {}; wConfigOBJ.path = x1; }
		let xN , xP = null;
		let xT1 = wConfigOBJ.path.split("/").length;
		if ( xT1 > 1 ) {
			xN = wConfigOBJ.path.split("/"); xN = xN.pop(); xN = xN.split(".json")[0];
			xP = wConfigOBJ.path;
		}
		else {
			xN = wConfigOBJ.path;
			xP = process.argv[ 1 ].split( "/" ); xP.pop(); xP = xP.join("/") + "/" + xN + ".json";
		}
		if ( xP.indexOf(".json") === -1 ) { xP = xP + ".json"; }
		this._DB_NAME = xN;
		this._DB_PATH = xP;

		try { this.self = jsonfile.readFileSync( this._DB_PATH ); }
		catch( error ) {
			if ( wConfigOBJ.skeleton ) {
				this.self = wConfigOBJ.skeleton;
			}
			else {
				this.self = {}; 
			}
			this.save();
		}
	}

	save() { jsonfile.writeFileSync( this._DB_PATH , this.self ); }

	edit( ...args ) {

		// https://stackoverflow.com/questions/16533384/javascript-assign-value-to-element-in-nested-object-without-knowing-level

		let x1 = args;
		let wNV = x1.pop();

		this.self = recReplace( this.self , x1 );
		this.save();

	}	

}

module.exports = JFO_DB_BaseClass;