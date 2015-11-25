'use strict';

var tileReduce = require('tile-reduce');
var path = require('path');
var turf = require('turf');

var numFeatures = 0;
var highwayFeatures = turf.featurecollection([]);
console.log('{"type":"FeatureCollection","features":[');
tileReduce({
//    bbox: [138.691,34.8138,140.977,36.315],
    zoom: 12,
    map: path.join(__dirname, '/edits.js'),
    sources: [{name: 'japan', mbtiles: path.join(__dirname, 'japan_z12.mbtiles'), raw: false}]
})
    .on('reduce', function(highway) {
	if (highway.length != 0){
	    for(var i=0; i < highway.length; i++){
		console.log(JSON.stringify(highway[i],null,2) + ",");
	    }
	}
    })
    .on('end', function() {
	console.log(']}');


    });
