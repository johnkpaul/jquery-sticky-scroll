(function($,window, undefined){
        
        $.fn.scrollfix = function(){

                return $(this).each(function(index, element){
                        

                        var $el = $(element), 
                        offset = $el.offset();


                        $el.css("position","fixed").css({
                                "top":offset.top,
                                "left":offset.left
                        });
                });
        }

})(jQuery,window);
