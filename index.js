'use strict';

var tileReduce = require('tile-reduce');
var path = require('path');
var turf = require('turf');

var numFeatures = 0;
var highwayFeatures = turf.featurecollection([]);
console.log('{"type":"FeatureCollection","features":[');
tileReduce({
    zoom: 15,
    map: path.join(__dirname, '/edits.js'),
    sources: [{name: 'japan', mbtiles: path.join(__dirname, 'tmp/latest.planet/japan.mbtiles'), raw: false}]
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
