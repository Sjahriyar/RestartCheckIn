$(document).ready(function(){
  $('.btn').on('click', function () {
      $('.form').addClass('form--no');
  });
  $(window).on("load resize ", function() {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({'padding-right':scrollWidth});
  }).resize();
   });
