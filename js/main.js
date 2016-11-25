var url ='http://192.168.31.165:6080/arcgis/rest/services/demo/MapServer';

var layers = [
  new ol.layer.Image({
    source: new ol.source.ImageArcGISRest({
      ratio: 1,
      projection: 'EPSG:4326',
      params: {},
      url: url
    })
  })
];

var map = new ol.Map({
  layers: layers,
  target: 'map',
  view: new ol.View({
    center: [119.901, 32.248],
    extent: [119.24147872797174,31.382735359191845,121.02512269794211,32.96650460467248],
    projection: 'EPSG:4326',
    zoom: 11
  })
});
