var $window,
    count,
    images,
    imagesList,
    overlay,
    partHeight;

$(document).on('ready', function(){
    $window = $(window);

    count = 18;
    images = $('.images');
    overlay = $('.overlay');

    for (var i = 3; i <= count; i++) {
        images.append( '<div class="image fade"><img src="images/photo ('+i+').jpg"></div>' );
    }

    documentHeight = images.outerHeight();
    partHeight = documentHeight / count;

    imagesList = images.find('.image');


    $window.on("scroll resize", check_if_in_view);
    check_if_in_view();


    // scroll to between 1 and 2
    setTimeout(function() {
        $window.scrollTop( (partHeight/2) + 1 );
    }, 100);

});


function check_if_in_view() {
    var vwHeight = $window.height(),
        scroll = $window.scrollTop(),
        bottom = scroll + vwHeight,
        vwMiddleY = bottom - (vwHeight / 2);

    var currentPart = Math.ceil( vwMiddleY / partHeight );
    var currentPartIndex = currentPart-1;
    currentPartStart = (currentPart-1) * partHeight;
    currentPartOneThird = currentPartStart + (partHeight/3);
    currentPartTwoThird = currentPartStart + ( 2 * (partHeight/3) );
    currentPartEnd = currentPartStart + partHeight;

    // display the current
    // imagesList.removeClass('in');
    // imagesList.eq( (currentPart-1) ).addClass('in');

    // overlay.addClass('in');


    if( scroll < (partHeight/2) ) {
        // on est au debut
        imagesList.removeClass('in').removeClass('semi-in');
        imagesList.eq( (currentPart-1) ).addClass('in');

    } else {

        if( vwMiddleY >= currentPartStart && vwMiddleY < currentPartOneThird ) {
            console.log( 'between '+(currentPart-1)+' and '+ currentPart );

            imagesList.removeClass('in').removeClass('semi-in');
            imagesList.eq( (currentPartIndex) ).addClass('semi-in');
            imagesList.eq( (currentPartIndex-1) ).addClass('semi-in');
        }
        else if( vwMiddleY > currentPartTwoThird && vwMiddleY <= currentPartEnd ) {
            console.log( 'between '+(currentPartIndex)+' and '+(currentPartIndex+1) );

            imagesList.removeClass('in').removeClass('semi-in');
            imagesList.eq( (currentPartIndex) ).addClass('semi-in');
            imagesList.eq( (currentPartIndex+1) ).addClass('semi-in');
        }
        else if( vwMiddleY >= currentPartOneThird && vwMiddleY <= currentPartTwoThird ) {
            console.log('safe zone part '+currentPartIndex);
            // overlay.removeClass('in');


            imagesList.removeClass('in').removeClass('semi-in');
            imagesList.eq( (currentPartIndex) ).addClass('in');
        }
    }
}