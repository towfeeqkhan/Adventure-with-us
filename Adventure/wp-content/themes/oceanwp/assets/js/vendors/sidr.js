/*! sidr - v3.0.0 - 2021-04-12
  http://www.berriart.com/sidr/
  * Copyright (c) 2013-2021 Alberto Varela; Licensed MIT */
! function() {
    "use strict";
    var s = {
            name: "sidr",
            speed: 200,
            side: "left",
            source: null,
            renaming: !0,
            body: "body",
            displace: !0,
            timing: "ease",
            method: "toggle",
            bind: "click",
            onOpen: function() {},
            onClose: function() {},
            onOpenEnd: function() {},
            onCloseEnd: function() {}
        },
        n = {},
        r = function(e, t) {
            n[e] = t
        },
        i = function(e) {
            return n[e]
        },
        o = function(e) {
            return !!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i").test(e)
        },
        a = function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            return e
        },
        l = function(e, t) {
            var n = new XMLHttpRequest;
            n.onreadystatechange = function() {
                4 === n.readyState && 200 === n.status && t(n.responseText)
            }, n.open("GET", e, !0), n.send()
        };

    function u(e, t) {
        var n = e.getAttribute(t);
        "string" == typeof n && "" !== n && "sidr-inner" !== n && e.setAttribute(t, n.replace(/([A-Za-z0-9_.-]+)/g, "sidr-" + t + "-$1"))
    }
    var e, t, c, d = {
            id: function(e) {
                return document.getElementById(e)
            },
            qs: function(e) {
                return document.querySelector(e)
            },
            qsa: function(e) {
                return document.querySelectorAll(e)
            },
            createElement: function(e) {
                var t = document.createElement("div");
                return t.id = e, document.body.appendChild(t), t
            },
            getHTMLContent: function(e) {
                var i = this,
                    o = "";
                return e.split(", ").forEach(function(e) {
                    for (var t = i.qsa(e), n = 0; n < t.length; n++) o += '<div class="sidr-inner">' + t[n].innerHTML + "</div>"
                }), o
            },
            addPrefixes: function(e) {
                var t = document.createElement("div");
                t.innerHTML = e;
                for (var n = t.querySelectorAll("*"), i = 0; i < n.length; i++) u(n[i], "id"), u(n[i], "class"), n[i].removeAttribute("style");
                return t.innerHTML
            },
            transitions: (e = (document.body || document.documentElement).style, t = !1, c = p = "transition", m = "transitionend", p in e ? t = !0 : (c = (t = !!(e = function(e, t) {
                for (var n, i = ["moz", "webkit", "o", "ms"], o = 0; o < i.length; o++)
                    if ((n = i[o]) + e in t) return n;
                return !1
            }(p = p.charAt(0).toUpperCase() + p.substr(1), e))) ? e + p : null, p = t ? "-" + e + "-" + p.toLowerCase() : null, "webkit" === e ? m = "webkitTransitionEnd" : "0" === e && (m = "oTransitionEnd")), {
                cssProperty: c,
                supported: t,
                property: p,
                event: m
            })
        },
        h = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        p = function(e, t, n) {
            return t && f(e.prototype, t), n && f(e, n), e
        };

    function f(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }
    var m = function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        },
        v = function(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        };

    function y(e, t, n) {
        for (var i = n.split(" "), o = 0; o < i.length; o++) {
            var s = i[o].trim();
            e.classList[t](s)
        }
    }

    function b(e, t, n) {
        e[t] = n
    }
    var g = (p(C, [{
        key: "bind",
        value: function(e, t) {
            this.element.addEventListener(e, t, !1)
        }
    }, {
        key: "unbind",
        value: function(e, t) {
            this.element.removeEventListener(e, t, !1)
        }
    }, {
        key: "style",
        value: function(e, t) {
            if ("string" == typeof e) this.element.style[e] = t;
            else
                for (var n in e) e.hasOwnProperty(n) && (this.element.style[n] = e[n])
        }
    }, {
        key: "addClass",
        value: function(e) {
            y(this.element, "add", e)
        }
    }, {
        key: "removeClass",
        value: function(e) {
            y(this.element, "remove", e)
        }
    }, {
        key: "html",
        value: function(e) {
            if (!e) return this.element.innerHTML;
            b(this.element, "innerHTML", e)
        }
    }, {
        key: "scrollTop",
        value: function(e) {
            if (!e) return this.element.scrollTop;
            b(this.element, "scrollTop", e)
        }
    }, {
        key: "offsetWidth",
        value: function() {
            return this.element.offsetWidth
        }
    }]), C);

    function C(e) {
        h(this, C), this.element = e
    }
    var k = "sidr-animating",
        O = "open";

    function w(e) {
        return "BODY" === e.tagName
    }

    function M(e) {
        var t = "sidr-open";
        return "sidr" !== e && (t += " " + e + "-open"), t
    }
    var E = (m(_, g), p(_, [{
        key: "prepare",
        value: function(e) {
            var t, n = e === O ? "hidden" : "";
            w(this.element) && (e = (t = new g(d.qs("html"))).scrollTop(), t.style("overflowX", n), t.scrollTop(e))
        }
    }, {
        key: "unprepare",
        value: function() {
            w(this.element) && new g(d.qs("html")).style("overflowX", "")
        }
    }, {
        key: "move",
        value: function(e) {
            this.addClass(k), e === O ? this.open() : this.close()
        }
    }, {
        key: "open",
        value: function() {
            var e, t, n = this;
            this.displace && (e = d.transitions, t = {
                width: this.offsetWidth() + "px",
                position: "initial"
            }, this.style(this.side, "0"), this.style(e.cssProperty, this.side + " " + this.speed / 1e3 + "s " + this.timing), this.style(t), setTimeout(function() {
                return n.style(n.side, n.menuWidth + "px")
            }, 1))
        }
    }, {
        key: "onClose",
        value: function() {
            var e = d.transitions,
                t = {
                    width: "",
                    position: "",
                    right: "",
                    left: ""
                };
            t[e.cssProperty] = "", this.style(t), this.unbind(e.event, this.temporalCallback)
        }
    }, {
        key: "close",
        value: function() {
            var e, t;
            this.displace && (e = d.transitions, this.style(this.side, 0), (t = this).temporalCallback = function() {
                t.onClose()
            }, this.bind(e.event, this.temporalCallback))
        }
    }, {
        key: "removeAnimationClass",
        value: function() {
            this.removeClass(k)
        }
    }, {
        key: "removeOpenClass",
        value: function() {
            this.removeClass(M(this.name))
        }
    }, {
        key: "addOpenClass",
        value: function() {
            this.addClass(M(this.name))
        }
    }]), _);

    function _(e, t) {
        h(this, _);
        var n = v(this, (_.__proto__ || Object.getPrototypeOf(_)).call(this, d.qs(e.body)));
        return n.name = e.name, n.side = e.side, n.speed = e.speed, n.timing = e.timing, n.displace = e.displace, n.menuWidth = t, n
    }
    var T = {
            moving: !1,
            opened: !1
        },
        A = (m(P, g), p(P, [{
            key: "init",
            value: function(e) {
                this.element || (this.element = d.createElement(this.name)), this.style(d.transitions.cssProperty, this.side + " " + this.speed / 1e3 + "s " + this.timing), this.addClass("sidr " + this.side + " sidr-" + this.side), this.body = new E(e, this.offsetWidth()), this.reload()
            }
        }, {
            key: "reload",
            value: function() {
                var e, t = this;
                "function" == typeof this.source ? (e = this.source(name), this.html(e)) : "string" == typeof this.source && o(this.source) ? l(this.source, function(e) {
                    t.html(e)
                }) : "string" == typeof this.source ? (e = d.getHTMLContent(this.source), this.renaming && (e = d.addPrefixes(e)), this.html(e)) : null !== this.source && console.error("Invalid Sidr Source")
            }
        }, {
            key: "move",
            value: function(e, t) {
                T.moving = !0, this.body.prepare(e), this.body.move(e), this.moveMenu(e, t)
            }
        }, {
            key: "open",
            value: function(e) {
                var t = this;
                T.opened === this.name || T.moving || (!1 === T.opened ? (this.move("open", e), this.onOpenCallback()) : i(T.opened).close(function() {
                    t.open(e)
                }))
            }
        }, {
            key: "close",
            value: function(e) {
                T.opened !== this.name || T.moving || (this.move("close", e), this.onCloseCallback())
            }
        }, {
            key: "toggle",
            value: function(e) {
                T.opened === this.name ? this.close(e) : this.open(e)
            }
        }, {
            key: "onOpenMenu",
            value: function(e) {
                var t = this.name;
                T.moving = !1, T.opened = t, this.unbind(d.transitions.event, this.temporalOpenMenuCallback), this.body.removeAnimationClass(), this.body.addOpenClass(), this.onOpenEndCallback(), "function" == typeof e && e(t)
            }
        }, {
            key: "openMenu",
            value: function(e) {
                var t = this;
                this.style(this.side, 0), this.temporalOpenMenuCallback = function() {
                    t.onOpenMenu(e)
                }, this.bind(d.transitions.event, this.temporalOpenMenuCallback)
            }
        }, {
            key: "onCloseMenu",
            value: function(e) {
                this.unbind(d.transitions.event, this.temporalCloseMenuCallback), this.style({
                    left: "",
                    right: ""
                }), this.body.unprepare(), T.moving = !1, T.opened = !1, this.body.removeAnimationClass(), this.body.removeOpenClass(), this.onCloseEndCallback(), "function" == typeof e && e(name)
            }
        }, {
            key: "closeMenu",
            value: function(e) {
                var t = this;
                this.style(this.side, ""), this.temporalCloseMenuCallback = function() {
                    t.onCloseMenu(e)
                }, this.bind(d.transitions.event, this.temporalCloseMenuCallback)
            }
        }, {
            key: "moveMenu",
            value: function(e, t) {
                "open" === e ? this.openMenu(t) : this.closeMenu(t)
            }
        }]), P);

    function P(e) {
        h(this, P);
        var t = v(this, (P.__proto__ || Object.getPrototypeOf(P)).call(this, d.id(e.name)));
        return t.name = e.name, t.speed = e.speed, t.side = e.side, t.displace = e.displace, t.source = e.source, t.timing = e.timing, t.method = e.method, t.renaming = e.renaming, t.onOpenCallback = e.onOpen, t.onCloseCallback = e.onClose, t.onOpenEndCallback = e.onOpenEnd, t.onCloseEndCallback = e.onCloseEnd, t.init(e), t
    }
    for (var L = {}, q = ["open", "close", "toggle", "reload"], z = 0; z < q.length; z++) {
        var j = q[z];
        L[j] = function(n) {
            return function(e, t) {
                e = "function" == typeof e ? (t = e, "sidr") : e || "sidr", i(e)[n](t)
            }
        }(j)
    }

    function x(e) {
        return "status" === e ? T : L[e] ? L[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof e && "string" != typeof e && e ? void console.error("Method " + e + " does not exist on sidr") : L.toggle.apply(this, arguments)
    }
    var H = (m(S, g), p(S, [{
        key: "init",
        value: function(e) {
            var t, n;
            this.element.getAttribute("data-sidr") || (t = e.name, n = e.method, e = e.bind, this.element.setAttribute("data-sidr", t), this.bind(e, function(e) {
                e.preventDefault(), x(n, t)
            }))
        }
    }]), S);

    function S(e, t) {
        h(this, S);
        e = v(this, (S.__proto__ || Object.getPrototypeOf(S)).call(this, e));
        return e.init(t), e
    }
    window.sidr = {
        new: function(e, t) {
            var n = a(s, t),
                i = d.qsa(e);
            r(n.name, new A(n));
            for (var o = 0; o < i.length; o++) new H(i[o], n)
        },
        status: function() {
            return x.apply(void 0, ["status"].concat(Array.prototype.slice.call(arguments)))
        },
        reload: function() {
            return x.apply(void 0, ["reload"].concat(Array.prototype.slice.call(arguments)))
        },
        close: function() {
            return x.apply(void 0, ["close"].concat(Array.prototype.slice.call(arguments)))
        },
        open: function() {
            return x.apply(void 0, ["open"].concat(Array.prototype.slice.call(arguments)))
        },
        toggle: function() {
            return x.apply(void 0, ["toggle"].concat(Array.prototype.slice.call(arguments)))
        }
    }
}();