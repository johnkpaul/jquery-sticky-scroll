(function($,window, undefined){

        module("sticky scroll tests",{
            "setup":function(){
                this.$el = $("<div></div>");

                this.$el.get(0).getBoundingClientRect = function(){
                        return {left:100,top:100};
                }

                this.getStickyScrollPlugin = function($el){
                        return $.data($el.get(0), "plugin_stickyScroll");
                }

                this.setupSpies = function(){
                        var plugin = this.getStickyScrollPlugin(this.$el);
                        plugin.elementScrolledOff = sinon.spy();
                        plugin.elementScrolledOn = sinon.spy();
                }
            
            },
            "teardown":function(){
            }    
        });

        test("sticky scroll default class is scrolled-off", function(){
                this.$el.stickyScroll();
                var actualClass = this.getStickyScrollPlugin(this.$el).options["class"];
                same(actualClass, "scrolled-off");
        });

        test("sticky scroll class can be overriden", function(){
                var newClass = "scrolled-off-fuh-real";
                this.$el.stickyScroll({"class":newClass});
                same(this.getStickyScrollPlugin(this.$el).options["class"], newClass);
        });

        test("if element is scrolled off viewport, correct plugin methods are called", function(){
                this.$el.stickyScroll();
                var plugin = this.getStickyScrollPlugin(this.$el);
                this.setupSpies();
                var event = jQuery.Event("scroll");
                event.target = $({scrollTop:101});
                $(window).trigger(event);
                equals(plugin.elementScrolledOff.called, true);
                equals(plugin.elementScrolledOn.called, false);
        });

        test("if element is scrolled into viewport, correct plugin methods are called", function(){
                this.$el.stickyScroll();
                var plugin = this.getStickyScrollPlugin(this.$el);
                this.setupSpies();
                var event = jQuery.Event("scroll");
                event.target = $({scrollTop:99});
                $(window).trigger(event);
                equals(plugin.elementScrolledOff.called, false);
                equals(plugin.elementScrolledOn.called, true);
        });

        test("elementScrolledOff function adds class", function(){
                this.$el.stickyScroll();
                var plugin = this.getStickyScrollPlugin(this.$el);
                plugin.elementScrolledOff();
                equals(this.$el.hasClass("scrolled-off"), true);
        });

        test("elementScrolledOn function remove class", function(){
                this.$el.stickyScroll();
                var plugin = this.getStickyScrollPlugin(this.$el);
                plugin.elementScrolledOn();
                equals(this.$el.hasClass("scrolled-off"), false);
        });

})(window.jQuery,window);


