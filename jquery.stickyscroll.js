(function($,window, undefined){
        
        $.fn.scrollfix = function(){
                
                return $(this).each(function(index, element){

                        var $el = $(element), 
                        offset = $el.offset(),
                        position = $el.css("position");

                        $el.data("originalOffset",offset);
                        $el.data("originalPosition",position);
                        $.fn.scrollfix.fixedItems.push($el);
                });
        }

        $.fn.scrollfix.fixedItems = [];

        $(window).scroll(function(){
            $.fn.scrollfix.fixedItems.map(function($el){
                var offset = $el.data("originalOffset");
                var position = $el.data("originalPosition");
                if($(window).scrollTop() > offset.top || $(window).scrollLeft() > offset.left){
                        $el.css("position","fixed").css({
                                "top":offset.top,
                                "left":offset.left
                        });
                }
                else{
                        $el.css("position",position).css({
                                "top":offset.top,
                                "left":offset.left
                        });
                }
            });
            
        });
})(jQuery,window);
