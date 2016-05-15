var $window,
    count,
    images,
    imagesList,
    currentPart,
    currentPartIndex,
    partHeight;

$(document).on('ready', function(){
    $window = $(window);

    // 22 images
    count = 22;
    images = $('.images');

    for (var i = 3; i <= count; i++) {
        images.append( '<div class="image fade"><img src="images/photo ('+i+').jpg"></div>' );
    }

    documentHeight = images.outerHeight();
    partHeight = documentHeight / count;

    imagesList = images.find('.image');


    $window.on("scroll resize", imagesHandle);
    imagesHandle();


    // scroll to between 1 and 2
    setTimeout(function() {
        $window.scrollTop( (partHeight/2) + 1 );
    }, 100);



    $('.splash .logo').imagesLoaded( {
        'background': true
    })
        .always( function( instance ) {
            $('.splash .logo').addClass('in');


            $('.images .image:nth-child(-n+2)').imagesLoaded()
            .always( function( instance ) {
                console.log('2 first images loaded');

                // setTimeout(function() {
                    $('.splash .bg').removeClass('in');

                    setTimeout(function() {
                        $('.splash').removeClass('in');
                    }, 2000);
                // }, 2000);
            });
        });




    nav();

});


function nav() {
    $window.keydown(function( e ) {
        // prev
        if ( e.which == 38 || e.which == 37 ) {
            e.preventDefault();
            $window.scrollTop( (partHeight*(currentPartIndex-1)) + 1 );
            currentPartIndex--;
        }
        // next
        if ( e.which == 39 || e.which == 40 ) {
            e.preventDefault();
            // console.log('currentPartIndex : ', currentPartIndex);
            currentPartIndex++;
            // console.log('partHeight*currentPartIndex : ', partHeight*currentPartIndex);

            $('html, body').animate({
                scrollTop: partHeight * currentPartIndex
            }, 1000);

            // imagesHandle();
        }
   });
}

function imagesHandle() {
    // console.log('imagesHandle');
    var vwHeight = $window.height(),
        scroll = $window.scrollTop(),
        bottom = scroll + vwHeight,
        vwMiddleY = bottom - (vwHeight / 2);

    currentPart = Math.ceil( vwMiddleY / partHeight );
    currentPartIndex = currentPart-1;
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
            // console.log( 'between '+(currentPart-1)+' and '+ currentPart );

            imagesList.removeClass('in').removeClass('semi-in');
            imagesList.eq( (currentPartIndex) ).addClass('semi-in');
            imagesList.eq( (currentPartIndex-1) ).addClass('semi-in');
        }
        else if( vwMiddleY > currentPartTwoThird && vwMiddleY <= currentPartEnd ) {
            // console.log( 'between '+(currentPartIndex)+' and '+(currentPartIndex+1) );

            imagesList.removeClass('in').removeClass('semi-in');
            imagesList.eq( (currentPartIndex) ).addClass('semi-in');
            imagesList.eq( (currentPartIndex+1) ).addClass('semi-in');
        }
        else if( vwMiddleY >= currentPartOneThird && vwMiddleY <= currentPartTwoThird ) {
            // console.log('safe zone part '+currentPartIndex);
            // overlay.removeClass('in');


            imagesList.removeClass('in').removeClass('semi-in');
            imagesList.eq( (currentPartIndex) ).addClass('in');
        }
    }
}