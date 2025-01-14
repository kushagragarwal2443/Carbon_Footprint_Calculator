import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import {transform} from 'ol/proj';
import Circle from 'ol/geom/Circle';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

// ===============================================================
// TO ADD NODES GEOJSON LAYER ON MAP 

// var image = new CircleStyle({
//   radius: 2,
//   fill: new Fill({
//     color: 'rgba(255, 0, 0, 1)'
//   }),
//   stroke: new Stroke({color: 'red', width: 1})
// });

// var styles = {
//   'Point': new Style({
//     image: image
//   })
// };

// var styleFunction = function(feature) {
//     // console.log(feature.getGeometry(), "HI");
//     return styles[feature.getGeometry().getType()];
// };

// var geojsonObject = {
//     "type": "FeatureCollection",
//     "name": "Nodes_30_3857",
//     "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } },
//     "features": [
//     { "type": "Feature", "properties": { "id": 364177, "osm_id": 3902581376, "eout": null, "lon": -0.0796719, "lat": 51.5146861, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -8869.035338532381502, 6712845.70845721103251 ] } },
//     { "type": "Feature", "properties": { "id": 364178, "osm_id": 3902588541, "eout": null, "lon": 0.2792289, "lat": 51.5775461, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ 31083.61896276473999, 6724097.869115249253809 ] } },
//     { "type": "Feature", "properties": { "id": 364179, "osm_id": 3902588543, "eout": null, "lon": 0.279306, "lat": 51.5773155, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ 31092.201695507395925, 6724056.562479481101036 ] } },
//     { "type": "Feature", "properties": { "id": 364180, "osm_id": 3902588546, "eout": null, "lon": 0.2800372, "lat": 51.5771056, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ 31173.598507173814141, 6724018.963950295001268 ] } },
//     { "type": "Feature", "properties": { "id": 364181, "osm_id": 3902588547, "eout": null, "lon": 0.2784447, "lat": 51.5774331, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ 30996.322218085610075, 6724077.62776277307421 ] } },
//     { "type": "Feature", "properties": { "id": 364182, "osm_id": 3902588551, "eout": null, "lon": 0.2792769, "lat": 51.5774111, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ 31088.962298324117, 6724073.68697434104979 ] } },
//     { "type": "Feature", "properties": { "id": 364183, "osm_id": 3902598358, "eout": null, "lon": 0.2798795, "lat": 51.5774803, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ 31156.043423476265161, 6724086.082551670260727 ] } },
//     { "type": "Feature", "properties": { "id": 364184, "osm_id": 3902598359, "eout": null, "lon": 0.2784541, "lat": 51.5772071, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ 30997.368621299239749, 6724037.145208803005517 ] } },
//     { "type": "Feature", "properties": { "id": 364185, "osm_id": 3902598365, "eout": null, "lon": 0.2793143, "lat": 51.5772883, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ 31093.125647280954581, 6724051.690244848839939 ] } },
//     { "type": "Feature", "properties": { "id": 364186, "osm_id": 3902598370, "eout": null, "lon": 0.2796641, "lat": 51.5772563, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ 31132.065205159189645, 6724045.958207837305963 ] } },
//     { "type": "Feature", "properties": { "id": 364187, "osm_id": 3902598373, "eout": null, "lon": 0.2783918, "lat": 51.5773095, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ 30990.433417021737114, 6724055.487721591256559 ] } },
//     { "type": "Feature", "properties": { "id": 364188, "osm_id": 3902749115, "eout": null, "lon": -0.0669449, "lat": 51.4066993, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7452.272179207112458, 6693551.885941291227937 ] } },
//     { "type": "Feature", "properties": { "id": 364189, "osm_id": 3902749116, "eout": null, "lon": -0.0672633, "lat": 51.406785, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7487.716305075912715, 6693567.179736678488553 ] } },
//     { "type": "Feature", "properties": { "id": 364190, "osm_id": 3902749117, "eout": null, "lon": -0.0655766, "lat": 51.4068195, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7299.953719953739892, 6693573.336523544974625 ] } },
//     { "type": "Feature", "properties": { "id": 364191, "osm_id": 3902749119, "eout": null, "lon": -0.0671615, "lat": 51.4068446, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7476.383980913102278, 6693577.815811985172331 ] } },
//     { "type": "Feature", "properties": { "id": 364192, "osm_id": 3902749122, "eout": null, "lon": -0.0657571, "lat": 51.4069401, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7320.046888043480976, 6693594.858545437455177 ] } },
//     { "type": "Feature", "properties": { "id": 364193, "osm_id": 3902749126, "eout": null, "lon": -0.0668814, "lat": 51.4070053, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7445.203391540697339, 6693606.49402369838208 ] } },
//     { "type": "Feature", "properties": { "id": 364194, "osm_id": 3902749128, "eout": null, "lon": -0.0659406, "lat": 51.4070628, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7340.47401460409128, 6693616.755387160927057 ] } },
//     { "type": "Feature", "properties": { "id": 364195, "osm_id": 3902749131, "eout": null, "lon": -0.0662134, "lat": 51.4071207, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7370.841971691341314, 6693627.08814705722034 ] } },
//     { "type": "Feature", "properties": { "id": 364196, "osm_id": 3902749132, "eout": null, "lon": -0.066139, "lat": 51.4071219, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7362.559801575864185, 6693627.302297660149634 ] } },
//     { "type": "Feature", "properties": { "id": 364197, "osm_id": 3902749136, "eout": null, "lon": -0.066552, "lat": 51.4072015, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7408.534751273993606, 6693641.507633511908352 ] } },
//     { "type": "Feature", "properties": { "id": 364198, "osm_id": 3902749138, "eout": null, "lon": -0.0663984, "lat": 51.4072412, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7391.436077487384864, 6693648.592464785091579 ] } },
//     { "type": "Feature", "properties": { "id": 364199, "osm_id": 3902749142, "eout": null, "lon": -0.0663034, "lat": 51.4072968, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7380.860725862696199, 6693658.51480808109045 ] } },
//     { "type": "Feature", "properties": { "id": 364200, "osm_id": 3902749144, "eout": null, "lon": -0.066371, "lat": 51.4073416, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7388.385923440051556, 6693666.509798511862755 ] } },
//     { "type": "Feature", "properties": { "id": 364201, "osm_id": 3902749147, "eout": null, "lon": -0.0654914, "lat": 51.4073833, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7290.469299338039491, 6693673.951571200974286 ] } },
//     { "type": "Feature", "properties": { "id": 364202, "osm_id": 3902749148, "eout": null, "lon": -0.065648, "lat": 51.4073926, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7307.901931595516544, 6693675.611248050816357 ] } },
//     { "type": "Feature", "properties": { "id": 364203, "osm_id": 3902749149, "eout": null, "lon": -0.0654248, "lat": 51.40742, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7283.055421251917323, 6693680.501050617545843 ] } },
//     { "type": "Feature", "properties": { "id": 364204, "osm_id": 3902749151, "eout": null, "lon": -0.0665433, "lat": 51.4074559, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7407.566271705078179, 6693686.90776717569679 ] } },
//     { "type": "Feature", "properties": { "id": 364205, "osm_id": 3902749153, "eout": null, "lon": -0.0652508, "lat": 51.4075235, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7263.68582985377725, 6693698.971681647002697 ] } },
//     { "type": "Feature", "properties": { "id": 364206, "osm_id": 3902749154, "eout": null, "lon": -0.0666688, "lat": 51.4075392, "cnt": null, "chk": null, "ein": null }, "geometry": { "type": "Point", "coordinates": [ -7421.536867799641186, 6693701.77351049054414 ] } }
//     ]
// }

// var vectorSource = new VectorSource({
//   features: (new GeoJSON({featureProjection: "EPSG:4326"})).readFeatures(geojsonObject)
// });

// vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

// var vectorLayer = new VectorLayer({
//   source: vectorSource,
//   style: styleFunction
// });

// var vectorLayer = new VectorLayer({
//     source: new VectorSource({
//       url: '/home/shreeya/Desktop/Courses/Sem4/DASS/Project/Sprint 5/GUI-GUI_SP/Nodes1_GeoJSON_4.geojson',
//       format: new GeoJSON()
//     }),
//     style: styleFunction 
//   });

// ===============================================================
//TO SELECT START AND END NODES

var startPoint = new Feature();
var destPoint = new Feature();

var vectorLayer_2Nodes = new VectorLayer({
    source: new VectorSource({
      features: [startPoint, destPoint]
    })
});

// map.addLayer(vectorLayer_2Nodes);

// var transform = Proj.TransformFunction('EPSG:3857', 'EPSG:4326');


// ===============================================================
// MAIN MAP TO DISPLAY

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    // vectorLayer
  ],
  target: 'map',
  view: new View({
    center: [-13833.6035, 6711384.4043],
    zoom: 7,
    minZoom: 2,
    extent: [-56937.92, 6671958.72, 37340.68, 6744884.15]
  })
});


// ===============================================================
//TO SELECT START AND END NODES

map.addLayer(vectorLayer_2Nodes);

map.on('click', function(e){
    // console.log(e.coordinate);
    if (startPoint.getGeometry() == null) {
        // First click.
        startPoint.setGeometry(new Point(e.coordinate));
        console.log("start noted", startPoint);
    } 
    else if (destPoint.getGeometry() == null) {
        // Second click.
        destPoint.setGeometry(new Point(e.coordinate));
        // Transform the coordinates from the map projection (EPSG:3857)
        // to the server projection (EPSG:4326).
        var startCoord = transform(startPoint.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
        var destCoord = transform(destPoint.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
        var viewparams = [
        'x1:' + startCoord[0], 'y1:' + startCoord[1],
        'x2:' + destCoord[0], 'y2:' + destCoord[1]
        ];
        console.log("destination noted", destPoint);
        console.log("params", viewparams);

        //SEND PARAMETERS TO BACKEND.
    }
});

var clearButton = document.getElementById('clear');

clearButton.addEventListener('click', function(e) {
    // Reset the "start" and "destination" features.
    startPoint.setGeometry(null);
    destPoint.setGeometry(null);
    // Remove the result layer.
    console.log("Reset");
    console.log("params", viewparams);
    map.removeLayer(vectorLayer_2Nodes);
});
