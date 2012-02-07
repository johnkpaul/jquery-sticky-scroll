(function($,window, undefined){
        
        $.fn.scrollfix = function(){
                
                return $(this).each(function(index, element){

                        var $el = $(element), 
                        offset = $el.offset();

                        $el.data("originalOffset",offset);
                        $.fn.scrollfix.fixedItems.push($el);
                });
        }
        $.fn.scrollfix.fixedItems = [];
        $(window).scroll(function(){
            $.fn.scrollfix.fixedItems.map(function($el){
                var offset = $el.data("originalOffset");
                $el.css("position","fixed").css({
                        "top":offset.top,
                        "left":offset.left
                });
            });
            
        });
})(jQuery,window);
