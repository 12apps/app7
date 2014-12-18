(function(){
  var businesses ={};

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
    $.ajax({
      url: "/yelp" + "?latlon=fremont"
    }).done(function(data){
      businesses = data.businesses;
      update();
      console.log(data);
    })
  }
})();
