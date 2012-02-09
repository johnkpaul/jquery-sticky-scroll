(function($,window, undefined){

        module("scrollfix tests",{
            "setup":function(){
                this.header = $("<div class='header'></div>").appendTo(document.body)
                .css("height","200px").css("margin-top","200px");
                document.body.style.height="100000px";
            },
            "teardown":function(){
                this.header.remove();
                this.header = null;
                $(window).scrollTop(0);
                document.body.style.height = "auto";
                $.fn.scrollfix.fixedItems = [];
            }    
        });

        asyncTest("scrollfix set position fixed if scrolled off the page", function(){
                this.header.scrollfix();
                $(window).scrollTop(202);
                var header = this.header;
                setTimeout(function(){
                        equal(header.css("position"), "fixed", "header is now position fixed");
                        start();
                },100);
        });

        asyncTest("scrollfix should not change css if element is not scrolled off page", function(){
                var computedStyle = getComputedStyleCssText(this.header.get(0));
                this.header.scrollfix();
                $(window).scrollTop(199);
                var header = this.header;
                setTimeout(function(){
                        equal(getComputedStyleCssText(header.get(0)), computedStyle, "header should not be position fixed");
                        start();
                },100);
        });

        asyncTest("scrollfix should return element to original state if scroll is returned to original", function(){
                var computedStyle = getComputedStyleCssText(this.header.get(0));
                this.header.scrollfix();
                $(window).scrollTop(202);
                        equal(this.header.css("position"), "fixed", "header is now position fixed");
                var header = this.header;
                setTimeout(function(){
                        $(window).scrollTop(0);
                        setTimeout(function(){
                                equal(getComputedStyleCssText(header.get(0)), computedStyle, "header should not be position fixed");
                                start();
                        },100);
                },100);
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
