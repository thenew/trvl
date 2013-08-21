window.addEvent('domready', function(j) {

    // https://developers.google.com/maps/documentation/javascript/examples/

    var map;
    var brooklyn = new google.maps.LatLng(40.6743890, -73.9455);
    var vancouver = new google.maps.LatLng(49.290504,-123.117655);

    var MY_MAPTYPE_ID = 'custom_style';

    function initialize() {

        var featureOpts = [
            {
              stylers: [
                { hue: '#BADA55' },
                { visibility: 'simplified' },
                { gamma: 0.5 },
                { weight: 0.5 }
              ]
            },
            {
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            },
            {
              featureType: 'water',
              stylers: [
                { color: '#BADA55' }
              ]
            }
        ];

        var mapOptions = {
            zoom: 12,
            center: vancouver,
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
            },
            mapTypeId: MY_MAPTYPE_ID
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

        var styledMapOptions = {
            name: 'Custom Style'
        };

        var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

        map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

});
