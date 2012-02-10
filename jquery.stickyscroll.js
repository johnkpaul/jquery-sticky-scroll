(function($,window, undefined){
        
        $.fn.scrollfix = function(){
                
                return $(this).each(function(index, element){

                        var $el = $(element), 
                        offset = $el.offset(),
                        position = $el.css("position");

                        $el.data("originalOffset",offset);
                        $el.data("originalPosition",position);
                        $el.data("originalMargin",$el.css("margin-top"));
                        $.fn.scrollfix.fixedItems.push($el);
                });
        }

        $.fn.scrollfix.fixedItems = [];

        $(window).scroll(function(){
            $.fn.scrollfix.fixedItems.map(function($el){
                var offset = $el.data("originalOffset");
                var position = $el.data("originalPosition");
                var marginTop = $el.data("originalMargin");

                if(elementIsOutsideViewport(offset)){
                        $el.css("position","fixed").css({
                                "top":0,
                                "left":offset.left,
                                "margin-top":"0px"
                        });
                }
                else{
                        $el.css("position",position).css({
                                "top":"auto",
                                "left":"auto",
                                "margin-top":marginTop
                        });
                }
            });
            
        });

        function elementIsOutsideViewport(offset){
                var $win = $(window);
                return $win.scrollTop() > offset.top || $win.scrollLeft() > offset.left;
        }
})(jQuery,window);

(function(window, undefined){
        window.getComputedStylePropertyValue = function(el,cssProperty){
                if(!window.getComputedStyle){
                    if(document.defaultView && document.defaultView.getComputedStyle){
                        return document.defaultView.getComputedStyle.getPropertyValue(cssProperty);
                    }    
                    else{
                            var camelCasedCssProperty = getCamelCasedCssProperty(cssProperty);
                            if(el.currentStyle){
                                return el.currentStyle(camelCasedCssProperty);
                            }
                            else{
                                return el.style[camelCasedCssProperty];
                            }
                    }
                }
                else{
                        return window.getComputedStyle(el).getPropertyValue(cssProperty);
                }
                
        }

        function getCamelCasedCssProperty(cssProperty){
                return cssProperty.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
        }

})(this)
