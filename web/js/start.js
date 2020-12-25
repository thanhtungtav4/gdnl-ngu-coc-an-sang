$(window).on("load", function(e) {
    wow = new WOW({
        animateClass: "animated",
        offset: 100,
        callback: function(e) {
            console.log("WOW: animating <" + e.tagName.toLowerCase() + ">")
        }
    }), wow.init()
}), $(document).ready(function(e) {
    e("#cssmenu").menumaker({
        format: "multitoggle"
    }), 0 < e(".btn-searchsg").length && e(".btn-searchsg").click(function() {
        return e(".frm-search-1").hasClass("active") ? void e(".frm-search-1").removeClass("active") : (e(".frm-search-1").addClass("active"), !1)
    }), setTimeout(function() {
        e(".loading").fadeOut(300, function() {
            e(this).remove()
        })
    }, 800), e(".scroll-danhsach").click(function() {
        e("body,html").animate({
            scrollTop: e(".scroll").offset().top
        }, 800)
    })
}), $(document).click(function() {
    $(".a").removeClass("active"), $(".a").removeClass("show"), $("#a").removeClass("normal")
}), $(".list-cata, .btn-menu, #link-search,.frm-search,.frm-search-1, .layer-menu, .btn-action").click(function(e) {
    e.stopPropagation()
}),
    function(o) {
        o.fn.menumaker = function(e) {
            var t = o(this),
                n = o.extend({
                    format: "dropdown",
                    sticky: !1
                }, e);
            return this.each(function() {
                return o(this).find(".button").on("click", function() {
                    o(this).toggleClass("menu-opened");
                    var e = o(this).next("ul");
                    e.hasClass("open") ? e.slideToggle().removeClass("open") : (e.slideToggle().addClass("open"), "dropdown" === n.format && e.find("ul").show())
                }), t.find("li ul").parent().addClass("has-sub"), multiTg = function() {
                    t.find(".has-sub").prepend('<span class="submenu-button"></span>'), t.find(".submenu-button").on("click", function() {
                        o(this).toggleClass("submenu-opened"), o(this).siblings("ul").hasClass("open") ? o(this).siblings("ul").removeClass("open").slideToggle() : o(this).siblings("ul").addClass("open").slideToggle()
                    })
                }, "multitoggle" === n.format ? multiTg() : t.addClass("dropdown"), !0 === n.sticky && t.css("position", "fixed"), resizeFix = function() {
                    1e3 < o(window).width() && t.find("ul").show(), o(window).width() <= 1e3 && t.find("ul").hide().removeClass("open")
                }, resizeFix(), o(window).on("resize", resizeFix)
            })
        }
    }(jQuery);
