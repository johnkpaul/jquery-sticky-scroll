(function($,window, undefined){
        module("scrollfix tests",{
            "teardown":function(){
                $(window).scrollTop(0);
                document.body.style.height = "auto";
            }    
        });

        test("scrollfix set position fixed if scrolled off the page", function(){
                var header = $(".header");
                header.scrollfix();
                header.css("height","200px");
                header.css("margin-top","200px");
                document.body.style.height="100000px";
                $(window).scrollTop("202");
                stop();
                setTimeout(function(){
                        equal(header.css("position"), "fixed", "header is now position fixed");
                        start();
                },100);
        });

        test("scrollfix should not change css if element is not scrolled off page", function(){
                var header = $(".header");
                header.css("height","200px");
                header.css("margin-top","200px");
                $(window).scroll("199");
                var computedStyle = getComputedStyleCssText(header.get(0));
                header.scrollfix();
                equal(getComputedStyleCssText(header.get(0)), computedStyle, "header should not be position fixed");
        });

})(jQuery,window);


function getComputedStyleCssText(element){
        var cssObject = window.getComputedStyle(element),
            prop,
            cssText, 
            cssAccumulator = [];

        if(cssObject.cssText != ""){
            return cssObject.cssText;
        }

        for(prop in cssObject){
            if(typeof cssObject[prop] == "string"){
                cssAccumulator.push(prop + " : " + cssObject[prop]);        
            }
        }
        return cssAccumulator.join("; ");
}
