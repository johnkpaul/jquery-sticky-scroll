(function($,window, undefined){
    var myObject = {
      init: function( options, element ) {
        this.options = $.extend( {}, this.options, options );

        this.element  = element;
        this.$element = $(this.element);
        this.pluginInit();

        return this;
      },
      pluginInit: function(){
        var self = this,
        offset = $(this.element).offset();
        $(window).scroll(function(event){
            if(elementIsOutsideViewport(event.target, offset)){
                self.elementScrolledOff(); 
            } 
            else{
                self.elementScrolledOn();
            }
        });
      },
      options: {
        name: "stickyScroll",
        "class":"scrolled-off"
      },
      elementScrolledOn: function(){
          $(this.element).removeClass(this.options["class"]);        
      },
      elementScrolledOff: function(){
          $(this.element).addClass(this.options["class"]);        
      }
    };


    // Create a plugin based on a defined object
    $.plugin = function( name, object ) {
      $.fn[name] = function( options ) {
        return this.each(function() {
          if ( ! $.data( this, name ) ) {
            $.data( this, 'plugin_'+name, begetObject(object).init(
            options, this ) );
          }
        });
      };
    };
    
    $.plugin('stickyScroll', myObject);

    function elementIsOutsideViewport(viewport,offset){
        var $viewport = $(viewport);
        return $viewport.scrollTop() > offset.top || $viewport.scrollLeft() > offset.left;
    }

    function begetObject(o){
        function F() {}
        if ( typeof Object.create !== 'function' ) {
            F.prototype = o;
            return new F();
        } else {
            return Object.create(o);
        }
    }

}(window.jQuery,window));
