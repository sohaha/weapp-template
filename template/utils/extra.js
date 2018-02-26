/* wxa-extra v1.0.1 | (c) 2018-2018 seekwe | Released under the ISC License. | blog.73zls.com/project  */
"use strict"
var _extends =
    Object.assign ||
    function(a) {
      for (var c, b = 1; b < arguments.length; b++)
        for (var d in ((c = arguments[b]), c))
          Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
      return a
    },
  api = function(a, b) {
    for (
      var c = arguments.length, d = Array(2 < c ? c - 2 : 0), f = 2;
      f < c;
      f++
    )
      d[f - 2] = arguments[f]
    var g = "function" == typeof wx[a]
    return new Promise(function(h, j) {
      if (g) {
        var l
        ;(l = wx)[a].apply(
          l,
          [_extends({}, b, { success: h, fail: j })].concat(d)
        )
      } else j({ errMsg: "API:" + a + "\u4E0D\u5B58\u5728\uFF0C\u8BF7\u5C1D\u8BD5\u5347\u7EA7\u5FAE\u4FE1", type: "version" })
    })
  },
  openSetting = function(a) {
    return new Promise(function(b, c) {
      api("openSetting")
        .then(function(d) {
          getSetting(a, d)
            .then(function(f) {
              f ? b(f) : c(f)
            })
            .catch(function(f) {
              c(f)
            })
        })
        .catch(function(d) {
          c(d)
        })
    })
  },
  getSetting = function(a, b) {
    var c = function isTrue(f) {
        return f && (!(!0 !== a) || f.authSetting[a])
      },
      d = new Promise(function(f) {
        b
          ? f(c(b))
          : api("getSetting")
              .then(function(h) {
                f(c(h))
              })
              .catch(function(h) {
                f(h)
              })
      })
    return d
  },
  login = function() {
    var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : !0,
      b = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : 1,
      c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : {},
      d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
    return new Promise(function(f, g) {
      var h = function() {
        wx.login({
          success: function success(j) {
            var k = j.code
            0 === b,
              authApi("getUserInfo", "scope.userInfo", b, c, d)
                .then(function(l) {
                  ;(l.code = k), f(l)
                })
                .catch(function(l) {
                  ;(l.code = k), g(l)
                })
          },
          fail: function fail(j) {
            g(j)
          }
        })
      }
      a
        ? wx.checkSession({
            success: function success() {
              f(!0)
            },
            fail: function fail() {
              h()
            }
          })
        : h()
    })
  },
  authApi = function(a) {
    for (
      var b = arguments.length, c = Array(6 < b ? b - 6 : 0), d = 6;
      d < b;
      d++
    )
      c[d - 6] = arguments[d]
    var f =
        1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : null,
      g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 1,
      h = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : {},
      j = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : null,
      k = arguments[5]
    f || (f = !0)
    var l,
      m,
      n = new Promise(function(o, p) {
        ;(m = function() {
          openSetting(f)
            .then(function() {
              q()
            })
            .catch(function(s) {
              "version" === s.type
                ? p(s)
                : -1 === g
                  ? r(l)
                  : j
                    ? wx.showModal(
                        Object.assign(
                          {
                            title: "\u63D0\u793A",
                            confirmText: "\u786E\u5B9A",
                            content:
                              "\u5BF9\u5E94\u6743\u9650\u6CA1\u6709\u5F00\u542F,\u90E8\u5206\u529F\u80FD\u53D7\u9650",
                            showCancel: !1,
                            complete: function complete() {
                              p(l)
                            }
                          },
                          "string" == typeof j
                            ? { content: j }
                            : !0 === j ? {} : j
                        )
                      )
                    : p(l)
            })
        }),
          (h =
            !!h &&
            Object.assign(
              {
                title: "\u63D0\u793A",
                confirmText: "\u786E\u5B9A",
                content: "\u8BF7\u5148\u5F00\u542F\u5BF9\u5E94\u6743\u9650",
                showCancel: !1
              },
              "string" == typeof h ? { content: h } : !0 === h ? {} : h,
              {
                success: function success(s) {
                  !0 !== s.cancel && m()
                },
                fail: function fail() {}
              }
            ))
        var q = function success() {
            api
              .apply(void 0, [a, k].concat(c))
              .then(function(s) {
                o(s)
              })
              .catch(function(s) {
                p(s)
              })
          },
          r = function fail(s) {
            l || (l = s)
            s.type
            h ? wx.showModal(h) : m()
          }
        api
          .apply(void 0, [a, k].concat(c))
          .then(function(s) {
            o(s)
          })
          .catch(function(s) {
            var t = s.type || "warn"
            ;(s = _extends({ type: t }, s)),
              "version" !== t && 0 !== g ? r(s) : p(s)
          })
      })
    return n
  },
  run = function(a, b) {
    var c = 2 < arguments.length && arguments[2] !== void 0 && arguments[2]
    return function() {
      a--, (c ? 0 === a : 0 >= a) && b()
    }
  }
module.exports = {
  api: api,
  authApi: authApi,
  login: login,
  getSetting: getSetting,
  run: run
}