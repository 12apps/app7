(function(){
  $.ajax({
    url: "/yelp" + "?latlon=fremont"
  }).done(function(data){
    console.log(data);
  })
})();
