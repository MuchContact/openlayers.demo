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

var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        target: document.getElementById('mouse-position'),
        className: 'custom-mouse-position',
        undefinedHTML: '&nbsp;'
      });

var map = new ol.Map({
  controls: ol.control.defaults({
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
              collapsible: false
            })
          }).extend([mousePositionControl]),
  layers: layers,
  target: 'map',
  view: new ol.View({
    center: [119.901, 32.248],
    extent: [119.24147872797174,31.382735359191845,121.02512269794211,32.96650460467248],
    projection: 'EPSG:4326',
    zoom: 11
  })
});

var esrijsonFormat = new ol.format.EsriJSON();

var queryResultLayerSource = new ol.source.Vector({wrapX: false});

var queryResultLayer = new ol.layer.Vector({
  source: queryResultLayerSource
});

map.addLayer(queryResultLayer);

function queryField() {
  var coordinate = encodeURIComponent($('#queryCoordinate').val());
  var queryUrl = url + '/3/query?text=&geometry='
            +coordinate
            +'&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelWithin&relationParam=&objectIds=&where=&time=&returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=TBBH%2CTBMJ%2CQSDWMC&f=pjson';
  $.ajax({url: queryUrl, dataType: 'jsonp', success: function(response) {
      if (response.error) {
        alert(response.error.message + '\n' +
            response.error.details.join('\n'));
      } else {
        // dataProjection will be read from document
        var features = esrijsonFormat.readFeatures(response, {
          dataProjection: 'EPSG:4326'
        });
        if (features.length > 0) {
          queryResultLayerSource.clear();
          queryResultLayerSource.addFeatures(features);
        }
      }
    }});
}
