(function($,window, undefined){

        module("sticky scroll unit tests",{
            "setup":function(){
                this.$el = $("<div></div>");

                this.$el.get(0).getBoundingClientRect = function(){
                        return {left:100,top:100};
                }

            },
            "getStickyScrollPlugin":function($el){
                        return $.data($el.get(0), "plugin_stickyScroll");
            },
            "setupSpies":function($el){
                        var plugin = this.getStickyScrollPlugin($el);
                        plugin.elementScrolledOff = sinon.spy();
                        plugin.elementScrolledOn = sinon.spy();
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

        test("if element is scrolled off viewport, plugin elementScrolledOn method is called", function(){
                this.$el.stickyScroll();
                var plugin = this.getStickyScrollPlugin(this.$el);
                this.setupSpies(this.$el);
                var event = jQuery.Event("scroll");
                event.target = $({scrollTop:101});
                $(window).trigger(event);
                equals(plugin.elementScrolledOff.called, true);
                equals(plugin.elementScrolledOn.called, false);
        });

        test("if element is scrolled into viewport, plugin elementScrolledOff method is called", function(){
                this.$el.stickyScroll();
                var plugin = this.getStickyScrollPlugin(this.$el);
                this.setupSpies(this.$el);
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

        module("sticky scroll integration tests",{
            "setup":function(){
                this.$el = $("<div class='test-yo'></div>");
                this.$el.appendTo(document.body);

                this.getStickyScrollPlugin = function($el){
                        return $.data($el.get(0), "plugin_stickyScroll");
                }

            
            },
            "expandDocumentBody":function($el){
                $(document.body).css("height","10000px");
                
            },
            "shrinkDocumentBody":function($el){
                $(document.body).css("height","auto");
                
            },
            "teardown":function(){
                this.$el.remove();
            }    
        });

        asyncTest("using real browser events, scrolled-off class is added when el is out of viewport", function(){
                this.expandDocumentBody(); 
                this.$el.stickyScroll();
                var self = this;
                $(window).scrollTop(5000);
                setTimeout(function(){
                        equals(self.$el.hasClass("scrolled-off"), true);
                        self.shrinkDocumentBody();
                        start();
                        
                },0);
        });
})(window.jQuery,window);


