(function(){
  var businesses ={};
  var lat;
  var lon;
  //make menu schema
  var Menu = Backbone.View.extend({
    tagName: "div",
    id: "menu",
    events: {// declare click events
      "click span.glyphicon-refresh": "refresh"
    },
    refresh: function(){//define click events
      refresh();
    }
  });

 //instantiate menu schema
  var menu = new Menu({ el: $('#menu') });

//initialize first refresh
  refresh();

  //create schema for individual restaurants
  ResView = Backbone.View.extend({
    template: _.template( $("#restaurants").html() ),
    render: function(data){
      // Compile the template using underscore
      this.$el.html( this.template(data) );
    }
  });

//update view with data from yelp
  function update(){
    var restaurants_view = new ResView({ el: $("#container") });
    restaurants_view.render({ 'businesses': businesses});
    // id of the div you want to append the template result to
  }

//get data from yelp
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
