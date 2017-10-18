$(document).ready(function () {

    // MODAL CHOICE CITY

    if($.cookie('city') != undefined) {
        console.log($.cookie('city'));
        $('#city').html($.cookie('city'));
        }else{
        $('#choice-city').modal();
        }


    $('.btn-yes').click(function () {
        $('#choice-city').modal('hide');
    });

    $('.cities').change(function () {
        var city = $('.cities option:selected').text();

        $('#city').html(city);
        $('#choice-city').modal('hide');

        $.cookie('city', city, {
            expires: 5,
            path: '/'
        });
    });


    // FIXED HEADER FOR MOBILE
    $(window).scroll(function(){
        if($(this).scrollTop()>237){
            $('.header-mob-fixed').addClass('fixed');
        }
        else if ($(this).scrollTop()<237){
            $('.header-mob-fixed').removeClass('fixed');
        }
    });


    // Slider

    $('#banner-slider').lightSlider({
        adaptiveHeight: true,
        item: 1,
        slideMargin: 0,
        loop: true,
        auto: true,
        pause: 4000,
        pauseOnHover: true,
        controls: false
    });

    // End Slider

    // Begin image Gallery

    $('.image-gallery').lightGallery({
         width: '250px',
        height: '250px',
        mode: 'lg-fade',
        addClass: 'fixed-size',
        counter: false,
        download: false,
        startClass: '',
        enableSwipe: false,
        enableDrag: false,
        speed: 500
    });
    // End image gallery


    $('.show-modal-buy').each(function () {
        this.onclick = function () {
            swal({
                    closeOnConfirm: false,
                    title: "Добавлено в корзину!",
                    type: "success",
                    showCancelButton: true,
                    cancelButtonClass: "btn-default",
                    cancelButtonText: "ОК",
                    confirmButtonClass: "btn-success",
                    confirmButtonText: "Открыть корзину"
                },
                function () {
                    swal.close()
                    $('#basket').modal('toggle')
                }
            );
        };
    });



    // Basket count
    $('.btn-number').click(function(e){
        e.preventDefault();

        fieldName = $(this).attr('data-field');
        type      = $(this).attr('data-type');
        var input = $("input[name='"+fieldName+"']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if(type == 'minus') {

                if(currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if(parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if(type == 'plus') {

                if(currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if(parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function(){
        $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function() {

        minValue =  parseInt($(this).attr('min'));
        maxValue =  parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if(valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if(valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }


    });
    $(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    // End Basket count



    //Link slow
    $("#link-to-catalog").click(function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        console.log(event.target);
        //забираем идентификатор бока с атрибута href
        console.log(this);
        var id  = $(this).attr('href');
        console.log(id);
//узнаем высоту от начала страницы до блока на который ссылается якорь
         var top = $(id).offset().top-100;


        console.log(top);

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1000);
    });
});