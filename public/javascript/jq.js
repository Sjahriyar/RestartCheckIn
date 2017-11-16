$(document).ready(function(){
  $('.btn').on('click', function () {
      $('.form').addClass('form--no');
  });
  $(window).on("load resize ", function() {
      var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
      $('.tbl-header').css({'padding-right':scrollWidth});
    }).resize();

//Create Date for Live-Check in
var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  n =  new Date();
  y = n.getFullYear();
  m = n.getMonth() + 1;
  d = n.getDay();
  w = weekday[n.getDay()];
  document.getElementById("today").innerHTML = "Today is " + w + ":<br />" + "<span class='datenums'>" + m + " / " + d + " / " + y +"</span>";

   });
