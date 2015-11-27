#! /bin/sh -x

user= #mapbox user to upload the mbtiles
token=  #MapboxAccessToken
poly=japan_poly.geojson  #clipping polygon
out=output.gejson #geojeson output from tile-reduce process

#mkdir /data/tmp
cd /data

# Get the latest OSM-QA tiles
wget https://s3.amazonaws.com/mapbox/osm-qa-tiles/latest.planet.mbtiles.gz

# clip mbtiles to country polugon
gunzip -c latest.planet.mbtiles.gz  > latest.planet.mbtiles
mbtiles-extracts latest.planet.mbtiles ../${clipping_poly} name

# extract all highways for a given timestamp 
node index.js > tmp/${out}

# Convert to mbtiles
tippecanoe -f -o japan_highway_edits.mbtiles -l jp_highway_edits -n "Japan Highways after 20150902 z5-18" -z18 -Z10 -g2 ${out}

# Upload to mapbox

export MapboxAccessToken=$token 
mapbox-upload $user.japan_highways_edits japan_highway_edits.mbtiles

rm -rf ../tmp/*


