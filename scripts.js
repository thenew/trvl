[
-123.14300537109374,
49.30184481970431
],

[-123.117655,49.290504],
[-123.13288,49.00659],
[-123.40808,48.68611],
[-123.35449,48.42373],
[-125.90249,49.15243],
[-123.93497,49.16664],
[-123.27160,49.37579],
[-122.95736,50.11632],
[-120.02728,51.64102],
[-118.07880,52.882],
[-115.57077,51.17836],
[-114.05810,51.04532],
[-118.19439,50.99867],
[-119.49601,49.88795],
[-119.45171,49.02947],
[-123.11442,49.19168]

var geoCities = {
    vancouver           : [49.290504,-123.117655],
    vancouverBeaverLake : [49.30520,-123.13878],
    tsawwassen          : [49.00659,-123.13288],
    swartzBay           : [48.68611,-123.40808],
    chemainus           : [48.93016,-123.73448],
    victoria            : [48.42373,-123.35449],
    tofino              : [49.15243,-125.90249],
    nanaimo             : [49.16664,-123.93497],
    horseshoeBay        : [49.37579,-123.27160],
    whistler            : [50.11632,-122.95736],
    clearwater          : [51.64102,-120.02728],
    jasper              : [52.882,-118.07880],
    banff               : [51.17836,-115.57077],
    calgary             : [51.04532,-114.05810],
    revelstoke          : [50.99867,-118.19439],
    kelowna             : [49.88795,-119.49601],
    osoyoos             : [49.02947,-119.45171],
    richmond            : [49.19168,-123.11442]
};

var map;

window.addEvent('domready', function(j) {


    // https://developers.google.com/maps/documentation/javascript/examples/

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();

    // locations
    var vancouver = new google.maps.LatLng(49.290504,-123.117655);
    var jasper = new google.maps.LatLng(52.88231,-118.07880);
    var richmond = new google.maps.LatLng(49.19168,-123.11442);

    // waypoints limités à 8
    var steps = [
        // vancouver = [49.290504,-123.117655],
        vancouverBeaverLake = [49.30520,-123.13878],
        // tsawwassen          = [49.00659,-123.13288],
        victoria            = [48.42373,-123.35449],
        tofino              = [49.15243,-125.90249],
        // nanaimo             = [49.16664,-123.93497],
        // horseshoeBay        = [49.37579,-123.27160],
        whistler            = [50.11632,-122.95736],
        clearwater          = [51.64102,-120.02728]
    ];
    var steps2 = [
        // jasper              = [52.882,-118.07880],
        banff               = [51.17836,-115.57077],
        calgary             = [51.04532,-114.05810],
        revelstoke          = [50.99867,-118.19439],
        kelowna             = [49.88795,-119.49601],
        osoyoos             = [49.02947,-119.45171]
        // richmond            = [49.19168,-123.11442]
    ];

    var waypts = [];
    steps.each(function(el) {
        waypts.push({
            location: new google.maps.LatLng(el[0],el[1]),
            stopover:false
        });
    });
    var waypts2 = [];
    steps2.each(function(el) {
        waypts2.push({
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


        var mapOptions = {
            zoom: 8,
            center: vancouver,
            disableDefaultUI: true,
            scrollwheel: false,
            // mapTypeControlOptions: {
            //   mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
            // },
            // mapTypeId: MY_MAPTYPE_ID
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);


        //Directions
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.suppressMarkers = true;
        directionsDisplay.setMap(map);
        // directionsDisplay.markerOptions = {
        //     icon: ''
        // };


/*        var request = {
            origin:vancouver,
            destination:jasper,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        directionsDisplay2 = new google.maps.DirectionsRenderer();
        directionsDisplay2.suppressMarkers = true;
        directionsDisplay2.setMap(map);

        var request2 = {
            origin:jasper,
            destination:richmond,
            waypoints: waypts2,
            optimizeWaypoints: true,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request2, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay2.setDirections(response);
            }
        });*/



        // var styledMapOptions = {
        //     name: 'Custom Style'
        // };

        // var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

        // map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
    }

    google.maps.event.addDomListener(window, 'load', initialize);


    // Actions

    // ShootOnSight each photos

    /*$$('.photo').addEvent('click', function(e) {
        var city = this.get('data-city');
        if(city && geoCities.hasOwnProperty(city)) {
            var latLng = new google.maps.LatLng(geoCities[city][0],geoCities[city][1]);
            map.panTo(latLng);
        }
    });*/


    // $$('.photo').each(function(photo) {
    //     shootOnSight(photo, panMap);
    // });


    $(window).addEvent('scroll',function(e){
        findTheStar($$('.photo'), panMap);
    });


});

function panMap() {
    var city = this.get('data-city');
    if(city && geoCities.hasOwnProperty(city)) {
        var latLng = new google.maps.LatLng(geoCities[city][0],geoCities[city][1]);
        map.panTo(latLng);
    }
}


// functions
/**
  * Trigger anim when el appears in viewport
  */

function shootOnSight(el, callback) {
    el.store('shot', false);
    var sight = window.getScroll().y + window.getHeight();
    var prey = el.getPosition().y + el.getHeight();
    if(!el.retrieve('shot') && sight > prey) {
        var callbackFn = callback.bind(el);
        callbackFn();
        el.store('shot', true);
    } else {
        $(window).addEvent('scroll',function(e){
            sight = window.getScroll().y + window.getHeight();
            prey = el.getPosition().y + el.getHeight();
            if(!el.retrieve('shot') && sight > prey) {
                var callbackFn = callback.bind(el);
                callbackFn();
                el.store('shot', true);
            }
        });
    }
}

// Find the most focus element in the viewport

function findTheStar(els, callback) {
    var theStar;

    // étudions tous les elements
    els.each(function(el){
        sight = window.getScroll().y + window.getHeight();
        heartPrey = el.getPosition().y + (el.getHeight()/1.2);
        if(sight >= heartPrey && heartPrey > window.getScroll().y ) {
            theStar = el;
        }

    });
    if(theStar) {
        var callbackFn = callback.bind(theStar);
        callbackFn();

    }
}