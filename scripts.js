window.addEvent('domready', function(j) {

    // https://developers.google.com/maps/documentation/javascript/examples/

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    // locations
    var brooklyn = new google.maps.LatLng(40.6743890, -73.9455);
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);

    var vancouver = new google.maps.LatLng(49.290504,-123.117655);
    var victoria = new google.maps.LatLng(48.42373,-123.35449);

    var waypts = [
        // location:checkboxArray[i].value,
        //   stopover:true
        // brooklyn,chicago
    ];

    var MY_MAPTYPE_ID = 'custom_style';

    function initialize() {

        // Style
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

        directionsDisplay = new google.maps.DirectionsRenderer();

        var mapOptions = {
            zoom: 9,
            center: vancouver,
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
            },
            mapTypeId: MY_MAPTYPE_ID
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);


        //Directions
        directionsDisplay.setMap(map);

        var request = {
            origin:vancouver,
            destination:victoria,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });



        var styledMapOptions = {
            name: 'Custom Style'
        };

        var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

        map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
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