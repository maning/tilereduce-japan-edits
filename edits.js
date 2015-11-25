'use strict';

module.exports = function(data, tile, writeData, done) {
    var count = 0;
    
    if (data.japan.osm){
	var features = data.japan.osm.features;
	var highwayFeatures = [];
	for(var i=0; i<features.length; i++){
	    if(features[i].properties.highway  &&  
	       features[i].properties._timestamp >= '1.441152e+09' ) {
		highwayFeatures.push(features[i]);
	    }
	}
    }
    done(null, highwayFeatures);
};
