/* ==================================================================================================================== */
/*    Device Detection                                                                                                  */
/* ==================================================================================================================== */

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.mobile = true;
} else {
    window.mobile = false;
}

$(window).load(function(){
    $('.home-preloader').fadeOut('slow', function(){
        if(window.location.hash) {
            if($(window).width() > 800 && !window.mobile) {
                var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
                var getSlide = hash.split('-')[1];
                $('#section-controls').fadeIn('fast');
                $('#section-controls a').removeClass('active');
                $('#section-controls a[data-slide-index="'+getSlide+'"]').addClass('active');

                setTimeout(
                    function(){
                        $('body.page-home .header-section').removeClass('header-visible animate-home-header');
                        $('body.page-home .header-slide-' + getSlide).addClass('header-visible animate-home-header');
                    }, 500);

                setTimeout(
                    function(){

                        $('body.page-home').addClass('slide-' + getSlide);
                        $('body.page-home').attr('data-current-slide', getSlide);
                    }, 200);
            } else {

                $('.header-slide-1').addClass('animate-home-header');
            }
        } else {

            $('#section-controls').fadeIn('fast');
            setTimeout(
                function(){
                    $('body.page-home .header-slide-1').addClass('animate-home-header');
                }, 500);

            setTimeout(
                function(){
                    $('body.page-home').addClass('slide-1');
                    $('body.page-home').attr('data-current-slide', '1');
                }, 200);
        }
    });
});



$(document).ready(function(){



    /* ==================================================================================================================== */
    /*    If not a mobile device, do some magic :)                                                                          */
    /* ==================================================================================================================== */

    if(!window.mobile) {

        /* Get the current section to implement different functions depending on the section */
        getCurrentSection();

        /* Open external links in a new window */
        doExternalLinks();

        /* Trigger form labels behavior */
        placeholderToLabel();
        inputIsWriting();

    } else {

        /* Add is-mobile class to the html tag */
        $('html').addClass('is-mobile');

    }

    /* ==================================================================================================================== */
    /*    ALL SECTIONS > Mobile menu.                                                                                       */
    /* ==================================================================================================================== */

    sendForm('contact-form');

    function templateSectionReorder () {
        enquire.register("screen and (max-width:1023px)", {
            match : function() {
                $('.templates-pick-template .template-info').insertBefore('.templates-pick-template .template-holder');
            },
            unmatch : function() {
                $('.templates-pick-template .template-info').insertAfter('.templates-pick-template .template-holder');

            },
            deferSetup : true
        });
    }

    templateSectionReorder();

    enquire.register("screen and (max-width:800px)", {

        match : function() {
            $('.feature-editor .feature-description').insertBefore('.feature-editor .feature-image');
            $('.why-lander-what .why-lander-easy-to-use').insertBefore('.why-lander-what .why-lander-what-image');
            $('.pricing-lets .pricing-description').insertBefore('.pricing-lets .pricing-image');
        },      // OPTIONAL
                                    // If supplied, triggered when the media query transitions
                                    // *from an unmatched to a matched state*

        unmatch : function() {
            $('.feature-editor .feature-description').insertAfter('.feature-editor .feature-image');
            $('.why-lander-what .why-lander-easy-to-use').insertAfter('.why-lander-what .why-lander-what-image');
            $('.pricing-lets .pricing-description').insertAfter('.pricing-lets .pricing-image');
        },    // OPTIONAL
                                    // If supplied, triggered when the media query transitions
                                    // *from a matched state to an unmatched state*.
                                    // Also may be called when handler is unregistered (if destroy is not available)

        deferSetup : true           // OPTIONAL, defaults to false
                                    // If set to true, defers execution the setup function
                                    // until the media query is first matched. still triggered just once
    });

    function doMobileNav() {
        $('.mobile-nav-toggler, .mobile-nav-close').click(function(){
            $('body').toggleClass('mobile-nav-open');
        });
    }

    doMobileNav();


    $('.mobile-nav-holder').css('height', $('body').height());


    /* ==================================================================================================================== */

    /*    HOME functions                                                                                                    */

    /* ==================================================================================================================== */

    if(getCurrentSection() === 'home') {

        $(window).hashchange(function() {
            _gaq.push(['_trackPageview', location.pathname + location.search + location.hash]);
        });

        $(window).resize(function(){
            hash = window.location.hash.substring(1);

            if($(window).width() < 800) {
                window.location.hash = 'slide-1';
                $('.header-section').removeClass('animate-home-header header-visible');
                $('.header-slide-1').addClass('animate-home-header header-visible');
                $('body').removeClass().addClass('landf-cyan page-home slide-1');
                $('body').attr('data-current-slide', '1');
                $('#section-controls a').removeClass('active');
                $('#section-controls a[data-slide-index="1"]').addClass('active');
            } else {
                window.location.hash = hash;
            }
        });

        if($(window).width() > 800 || !mobile) {
            $(function(){
                var
                timer,
                currentSlide = 1;

                $(window).on ('mousewheel', function(event) {
                    var
                        delta           = event.deltaY,
                        animationHolder = $('body.page-home'),
                        currentClass    = animationHolder.attr("class").match(/slide[\w-]*\b/);

                    if ( timer ) clearTimeout(timer);

                    timer = setTimeout(function(){

                        currentSlide = parseInt(animationHolder.attr('data-current-slide'));

                        // Prev slide.
                        if(delta > 0) {
                            prevSlide       = (currentSlide - 1);

                            if(prevSlide >= 1) {
                                window.location.hash = '#slide-' + prevSlide;
                                $('#section-controls a').removeClass('active');
                                $('#section-controls a[data-slide-index="'+prevSlide+'"]').addClass('active');
                                $('body.page-home .header-section').removeClass('header-visible animate-home-header');
                                $('.header-slide-' + prevSlide).addClass('header-visible animate-home-header');
                                animationHolder.toggleClass(currentClass + ' slide-' + prevSlide);
                                animationHolder.attr('data-current-slide', prevSlide);
                                //console.log('prev: ' + prevSlide + ' ' + currentSlide);
                            }
                        }

                        // Next slide.
                        if(delta < 0) {
                            nextSlide       = (currentSlide + 1);

                            if(nextSlide <= 3) {
                                window.location.hash = '#slide-' + nextSlide;
                                $('#section-controls a').removeClass('active');
                                $('#section-controls a[data-slide-index="'+nextSlide+'"]').addClass('active');
                                $('body.page-home .header-section').removeClass('header-visible animate-home-header');
                                $('.header-slide-' + nextSlide).addClass('header-visible animate-home-header');
                                animationHolder.toggleClass(currentClass + ' slide-' + nextSlide);
                                animationHolder.attr('data-current-slide', nextSlide);
                                //console.log('next: ' + nextSlide + ' ' + currentSlide);
                            }
                        }

                    }, 300);

                    event.stopPropagation();
                    event.preventDefault();
                });

                $('#section-controls a').click(function(){

                    var
                        animationHolder = $('body.page-home'),
                        currentClass    = animationHolder.attr("class").match(/slide[\w-]*\b/);
                    var goToSlide = $(this).data('slide-index');

                    $('#section-controls a').removeClass('active');
                    $('#section-controls a[data-slide-index="'+goToSlide+'"]').addClass('active');

                    $('body.page-home .header-section').removeClass('header-visible animate-home-header');
                    $('.header-slide-' + goToSlide).addClass('header-visible animate-home-header');
                    animationHolder.toggleClass(currentClass + ' slide-' + goToSlide);
                    animationHolder.attr('data-current-slide', goToSlide);
                });
            });
        }

    }


    /* ==================================================================================================================== */

    /*    PRICING functions                                                                                                 */

    /* ==================================================================================================================== */


    /*Cuando la resolucion es menor a 800px, automaticamente se quita la clase showfull y se colapsa la tabla
    al mismo tiempo que desaparece el boton*/
    $(window).resize(function() {
        var ssz = $(window).width();

        if((ssz <= 600) && ($('.pricing-hide').hasClass('pricing-showfull'))){

            $('.pricing-hide').slideUp("slow", function() {
                $('.pricing-hide').removeClass('pricing-showfull');
                $('#btn-pricingfull').text('SHOW FULL FEATURE LIST');
            });
        }

    });

    if(getCurrentSection() === 'pricing') {

        $('.pricing-faq .answer-toggler').click(function(event){
            $(this).parent('li').toggleClass('question-visible');

            event.preventDefault();
        });

    }

    $('#btn-pricingfull').click(function() {

        if($('.pricing-hide').hasClass('pricing-showfull')){

            $('.pricing-hide').slideUp("slow", function() {
                $('.pricing-hide').removeClass('pricing-showfull');
                $('#btn-pricingfull').text('SHOW FULL FEATURE LIST');

        });

        }
        else{

            $('.pricing-hide').slideDown("slow", function() {
                $('.pricing-hide').addClass('pricing-showfull');
                $('#btn-pricingfull').text('HIDE FULL FEATURE LIST');

            });
        }
    });


    /* ==================================================================================================================== */

    /*    TEMPLATES functions                                                                                               */

    /* ==================================================================================================================== */

    if(getCurrentSection() === 'templates') {
        if($(window).width() > 1023) {
            $('.templates-pick-template').css('height', $('.template-holder').height());

            if(! $('.templates-pick-template').is('[height]'))
                $('.templates-pick-template').css('height', '458');
        }

        $(window).on('resize', function(){
            if($(window).width() > 1023) {
                $('.templates-pick-template').css('height', $('.template-holder').height());
            } else {
                $('.templates-pick-template').css('height', 'auto');
            }
         });

        $('.category-type').click(function(){
            var
                protocol         = location.protocol,
                domain           = window.location.host,
                url              = protocol + '//' + domain,
                categoryType     = $(this).data('template-category'),
                fileToLoad       = url + '/views/templates/templates_' + categoryType + '.php';
                templatesHolder  = $('.templates-pick-template');


            // templatesHolder
            //     .addClass('loading-templates')
            //     .delay(200)
            //     .queue(function(n){
            //         templatesHolder.html('');
            //         templatesHolder.load(fileToLoad, function(){
            //             templatesHolder.removeClass('loading-templates');
            //         })
            //         n();
            //     })

            templatesHolder
                .addClass('templates-unload templates-loading')
                .delay(300)
                .queue(function(n){
                    templatesHolder.html('');
                    templatesHolder.toggleClass('templates-unload templates-done');

                    setTimeout(function(){
                        templatesHolder
                            .load(fileToLoad, function(){
                                templatesHolder.removeClass('templates-loading templates-done');
                                templateSectionReorder();

                                $('.launch-template', templatesHolder).on('click', function(){
                                    $(this).attr({'target':'_blank'});
                                });
                            });
                        }, 1000);
                    n();
                });
        });


        $('.templates-pick-template').on('click', '.badge-template-picker', function(){
            var
                imageHolder         = $('.template-holder');
                templateImage       = $('img', imageHolder);
                imageToLoad         = $(this).data('load-template');
                urlToLaunch         = $(this).data('template-url');

            $('.badge-template-picker').removeClass('template-active-badge');
            $(this).addClass('template-active-badge');

            $('.launch-template').attr('href', urlToLaunch);

            templateImage.removeClass().addClass('animate-fadeout')
                .delay(1000)
                .queue(function(n){
                    //templateImage.attr('src', imageToLoad);
                    imageHolder.find('img').remove();
                    imageHolder.append('<img class="animate-fadein" src="'+imageToLoad+'" style="opacity:0; z-index:0" />');

                    setTimeout(function(){templateImage.removeClass().addClass('animate-fadein');}, 1000);
                    n();
                });

        });

    }



    /* ==================================================================================================================== */

    /*    SIGN UP functions                                                                                                 */

    /* ==================================================================================================================== */

    if(getCurrentSection() === 'sign-up') {

        function planSwitcher() {
            $('.plan-badge').click(function(event){
                var planType = $(this).data('plan-type');

                $('.plan-badge').removeClass('plan-active');
                $(this).addClass('plan-active');

                $('.input-plan').val(planType);

                event.preventDefault();
            });
        }

        planSwitcher();


        function passwordRevealer() {
            $('.password-revealer').click(function(event){
                $(this).toggleClass('toggle-hide toggle-show');

                $('button', $(this)).click(function(event){event.preventDefault();});

                if($(this).hasClass('toggle-hide')){
                    $('.password-toggle-status', $(this)).text('Hide');
                    $('.input-password input').attr('type', 'password');
                } else {
                    $('.password-toggle-status', $(this)).text('Show');
                    $('.input-password input').attr('type', 'text');
                }

                event.preventDefault();
            });
        }

        passwordRevealer();

        function passwordMeter() {
            $('input[type="password"]').bind('input', function(){

                currentCount = $(this).val().length;
                console.log( currentCount );

                var meter = $('.password-checker');
                var status = $('.password-checker-strenght-status');
                var failText = meter.data('meter-fail');
                var weakText = meter.data('meter-weak');
                var strongText = meter.data('meter-strong');

                if(currentCount === 0) {
                    meter.removeClass().addClass('password-checker');
                    status.text('How much strength do you have?');
                }
                else if(currentCount <= 3) {
                    meter.removeClass().addClass('password-checker meter-fail');
                    status.text(failText);
                } else if(currentCount > 3 && currentCount <= 9){
                    meter.removeClass().addClass('password-checker meter-weak');
                    status.text(weakText);
                } else if(currentCount > 9) {
                    meter.removeClass().addClass('password-checker meter-strong');
                    status.text(strongText);
                }

            });
        }

        passwordMeter();

    }



    /* ==================================================================================================================== */

    /*    TEAM functions                                                                                                    */

    /* ==================================================================================================================== */

    if(getCurrentSection() === 'team') {

        $('.team-send-message').hover(function(){
            $(this).parent('.team-join-us-block').off('click', showForm());
        }, function(){
            $(this).parent('.team-join-us-block').on('click', showForm());
        });


        function showForm() {
            $('.team-join-us-block').on('click', function(){
                $(this).toggleClass('form-visible');
            });
        }

        showForm();

    }

});






    /* ==================================================================================================================== */
    /*    ALL SECTIONS > Go to first section.                                                                               */
    /* ==================================================================================================================== */






    /* ==================================================================================================================== */
    /*    ALL SECTIONS > Get the current page.                                                                              */
    /* ==================================================================================================================== */

    function getCurrentSection() {
        var currentSection = window.location.pathname.split('/').pop(); // returns the the current path
        switch (currentSection) {
            case '':
                return 'home';
             case 'pricing':
                return 'pricing';
            case 'features':
                return 'features';
            case 'templates':
                return 'templates';
            case 'contact':
                return 'contact';
            case 'sign-up':
                return 'sign-up';
            case 'team':
                return 'team';
            case '404':
                return '404';
        }
    }



    /* ==================================================================================================================== */
    /*    ALL SECTIONS > _blank target links.                                                                               */
    /* ==================================================================================================================== */


    function doExternalLinks() {
        $('a[rel="external"]').on('click', function () {
            $(this).attr({'target':'_blank'});
        });
    }



    /* ==================================================================================================================== */
    /*    ALL SECTIONS > Forms and Input/textarea behavior.                                                                 */
    /* ==================================================================================================================== */

    /* Print at labels placeholder's content */
    function placeholderToLabel() {
        $('input, textarea').not('.field-newsletter').each(function(){
            var labelText = $(this).attr('placeholder');

            $(this).prev('label').text(labelText);
        });
    }

    /* Show label to replace placeholder when writing */
    function inputIsWriting() {
        var activeClass = "input-active";

        $('input, textarea').not('.field-newsletter').bind('checkval',function(){
            var holder = $(this).parent('.input-holder');

            placeholderToLabel();

            if(this.value !== '') holder.addClass(activeClass);
            else holder.removeClass(activeClass);

        }).on('keyup',function() {
            $(this).trigger('checkval');
        }).on('keydown',function() {
            $(this).parent('.input-holder').removeClass('input-error');
            $(this).trigger('checkval');

        }).trigger('checkval');
    }

    function adjustFormWrapper() {
        $('.form-wrapper').each(function(){
            $(this).css('height', $(this).find('form').height());
        });
    }

    /* Form validations */
    var error = false;
    function formValidation(formID) {

        errorsArray = [];

        $('.required', $('#'+formID)).each(function(){

            var elemValue  = $(this).val();
            var emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            var textError  = 'Please, fill in this field';
            var emailError = 'This is not a valid email address :(';


            function doShake(){
                $('.input-newsletter').addClass('do-shake').delay(1000).queue(function(){$(this).removeClass('do-shake')}, false);
            }

            if($(this).hasClass('field-text')) {
                if((elemValue.length === 0)||(elemValue.length === null)||(elemValue === ' ')) {
                    $(this).parent('.input-holder').addClass('input-error').find('label').text(textError);
                    error = true;
                } else {
                    error = false;
                }
                errorsArray.push(error);
            }
            if($(this).hasClass('field-email')) {
                if((elemValue.length === 0)||(elemValue.length === null)||(elemValue === ' ')) {
                    $(this).parent('.input-holder').addClass('input-error').find('label').text(textError);
                    error = true;
                } else if(!emailRegex.test(elemValue)){
                    $(this).parent('.input-holder').addClass('input-error').find('label').text(emailError);
                    error = true;
                } else {
                    error = false;
                }
                errorsArray.push(error);
            }
            if($(this).hasClass('field-newsletter')) {
                if((elemValue.length === 0)||(elemValue.length === null)||(elemValue === ' ')||(!emailRegex.test(elemValue))) {
                    setTimeout(doShake(), 999);
                    error = true;
                } else {
                    error = false;
                }
                errorsArray.push(error);
            }


            //console.log(errorsArray);

        });

        //console.log(error);
        if($.inArray(true, errorsArray) === -1){
            //console.log('go');
            return true;
        } else {
            //console.log('no');
            return false;
        }


    }




    function sendForm(formID) {

        $('#'+formID).submit(function(event){

            var evaluateValid = formValidation(formID);
            var evaluateInput = $('.field-evaluate', '#'+formID).val();

            //console.log(evaluateValid);

            if(!evaluateValid){
                return false;
            } else {
                $.ajax({
                    type:       'POST',
                    url:        $('#'+formID).attr('action'),
                    data:       $('#'+formID).serialize(),
                    success:    function(response){
                                    $('#'+formID).find('.form-sucess-message').html("<span>Sent!</span> Thanks for getting in touch.");
                                    $('input, textarea', '#'+formID).val('');
                                    $('input, textarea', '#'+formID).trigger('blur');

                                }
                });


            }
            return false;
        });
    }

        $(document).ready(function(){
            $('.header-section:not(".header-slide-2"), .header-section:not(".header-slide-2")').addClass('header-visible');
            setTimeout(function (){
                $('#main-content').addClass('main-content-visible');
            }, 200);
        });

        $('#abtest-range').on('input', function(event){
            var valor = parseInt(50 - $(this).val());
            $('.abtestlamp').css({
                    '-webkit-transform': 'rotate(' + valor + 'deg)',
                    '-moz-transform': 'rotate(' + valor + 'deg)',
                    '-ms-transform': 'rotate(' + valor + 'deg)',
                    'transform': 'rotate(' + valor + 'deg)',
                });
            event.preventDefault();
        });

        $(window).scroll(function () {
            if ($(window).scrollTop() >= 650) {
                $('.drag-me').addClass('drag-me-visible');
                $('#abtest-range').addClass('range-visible');
            }
        });


//    $('.category-type').on('click', function(){
//        $(window).scrollTop($(this).offset().top);
//    });

        $(".category-type").on('click', function() {
            $('html, body').animate({
                scrollTop: (parseInt($(".category-type").offset().top)) - 20
            }, 800);
        });


