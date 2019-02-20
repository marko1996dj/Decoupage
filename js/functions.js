function topFunction() {
    $("button").click(function() {
        $('html,body').animate({
            scrollTop: $(".gallery").offset().top},
            'slow');
    });
  }
  