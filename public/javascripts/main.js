(function(){
  var businesses ={};
  var lat;
  var lon;
  refresh();

  ResView = Backbone.View.extend({
    template: _.template( $("#restaurants").html() ),
    render: function(data){
      // Compile the template using underscore
      this.$el.html( this.template(data) );
    }
  });

  function update(){
    var restaurants_view = new ResView({ el: $("#container") });
    restaurants_view.render({ 'businesses': businesses});
    // id of the div you want to append the template result to
  }


  function refresh (){
    navigator.geolocation.getCurrentPosition(function (position){
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      $.ajax({
        url: "/yelp" + "?latlon=" + lat + "," + lon
      }).done(function(data){
        businesses = data.businesses;
        update();
        console.log(data);
      })
    })
  }
})();
