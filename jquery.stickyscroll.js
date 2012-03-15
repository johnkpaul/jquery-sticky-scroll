(function($,window, undefined){

    var pluginName = "stickyScroll",
    defaults = {
        "class":"scrolled-off"
    }

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;

        this.init();
    }

    Plugin.prototype.init = function(){
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

    }

    Plugin.prototype.elementScrolledOn = function(){
        $(this.element).removeClass(this.options["class"]);        
    }

    Plugin.prototype.elementScrolledOff = function(){
        $(this.element).addClass(this.options["class"]);        
    }

    $.fn.stickyScroll = function(options){
        return this.each(function(){
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin( this, options ));
            }        
        });
    }

    function elementIsOutsideViewport(viewport,offset){
        var $viewport = $(viewport);
        return $viewport.scrollTop() > offset.top || $viewport.scrollLeft() > offset.left;
    }

})(window.jQuery,window)
