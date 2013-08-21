window.addEvent('domready', function(j) {

    // https://developers.google.com/maps/documentation/javascript/examples/

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    // locations
    var brooklyn = new google.maps.LatLng(40.6743890, -73.9455);
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);

    var vancouver = new google.maps.LatLng(49.290504,-123.117655);
    var richmond = new google.maps.LatLng(49.19168,-123.11442);

    var steps = [
        vancouverBeaverLake = [49.30520,-123.13878],
        tsawwassen = [49.00659,-123.13288],
        victoria = [48.42373,-123.35449],
        tofino = [49.15243,-125.90249],
        nanaimo = [49.16664,-123.93497],
        horseshoeBay = [49.37579,-123.27160],
        whistler = [50.11632,-122.95736],
        clearwater = [51.64102,-120.02728]
    ];


    var waypts = [];
    steps.each(function(el) {
        waypts.push({
            location: new google.maps.LatLng(el[0],el[1]),
            stopover:false
        });
    });

    var MY_MAPTYPE_ID = 'custom_style';

    function initialize() {

        // Style
        var featureOpts = [
            {
              stylers: [
                { hue: '#444' },
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
                { color: '#000' }
              ]
            }
        ];

        directionsDisplay = new google.maps.DirectionsRenderer();

        var mapOptions = {
            zoom: 9,
            center: vancouver,
            disableDefaultUI: true,
            // mapTypeControlOptions: {
            //   mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
            // },
            // mapTypeId: MY_MAPTYPE_ID
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);


        //Directions
        directionsDisplay.setMap(map);

        var request = {
            origin:vancouver,
            destination:richmond,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });



        // var styledMapOptions = {
        //     name: 'Custom Style'
        // };

        // var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

        // map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
    }

    google.maps.event.addDomListener(window, 'load', initialize);


    // Actions
    $('geo-list').getElements('a').addEvent('click', function(e) {
        var geo = this.get('data-geo');
        if(geo) {
            e.preventDefault();
            geo = geo.split(',');
            console.log(geo);
            var latLng = new google.maps.LatLng(geo[0],geo[1]);
            map.panTo(latLng);
        }
    });

});