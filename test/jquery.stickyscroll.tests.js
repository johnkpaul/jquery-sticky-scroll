(function($,window, undefined){

        module("scrollfix tests",{
            "setup":function(){
                this.header = $("<div class='header'></div>").prependTo(document.body)
                .css("height","200px").css("margin-top","200px");
                document.body.style.height="100000px";
                this.originalOffset = this.header.offset();
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
                var originalOffset = this.originalOffset;
                setTimeout(function(){
                        equal(header.css("top"), "0px", "top is set to 0");
                        equal(header.css("left"), originalOffset.left+"px", "left is set to the original offset left");
                        equal(header.offset().top - $(window).scrollTop(),0, "header is on top of the screen");
                        equal(header.css("position"), "fixed", "header is now position fixed");
                        start();
                },0);
        });

        asyncTest("scrollfix should not change css if element is not scrolled off page", function(){
                var computedStyle = getComputedStyleCssText(this.header.get(0));
                this.header.scrollfix();
                $(window).scrollTop(199);
                var header = this.header;
                setTimeout(function(){
                        equal(getComputedStyleCssText(header.get(0)), computedStyle, "header should not be position fixed");
                        start();
                },0);
        });

        asyncTest("scrollfix should return element to original state if scroll is returned to original", function(){
                var computedStyle = getComputedStyleCssText(this.header.get(0));
                this.header.scrollfix();
                $(window).scrollTop(202);
                var header = this.header;
                setTimeout(function(){
                        $(window).scrollTop(0);
                        setTimeout(function(){
                                equal(getComputedStyleCssText(header.get(0)), computedStyle, "header should not be position fixed");
                                start();
                        },0);
                },0);
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
