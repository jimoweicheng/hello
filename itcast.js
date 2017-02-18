/**
 * Created by hello on 2017/2/18.
 */
(function (global) {
    var itcast = function (selector, context) {
        return new itcast.fn.init(selector, context)
    }
    var document = global.document,
        arr = [], slice = arr.slice, push = arr.push;


    itcast.fn = itcast.prototype = {
        constructor: itcast,
        length: 0,
        splice: arr.splice,
        toArray: function () {
            return slice.call(this);
        },
        get: function (index) {
            if (!index) {
                return slice.call(this);
            }
            return this[index >= 0 ? index : index + this.length];
        },
        eq: function (index) {
            if (!index) {
                return slice.call(this);
            }
            return itcast(itcast.get(index));
        },
        first: function () {
            return itcast(itcast.get(0));
        },
        last: function () {
            return itcast(itcast.get(-1));
        },
        each: function (callback) {
            return itcast.each(this, callback);
        },
        map: function (callback) {
            return itcast(itcast.map(this, function (ele, i) {
                return callback.call(ele, ele, i);
            }));
        }

    };
    init = itcast.fn.init = function (selector, context) {
        if (!selector) {
            return this;
        }
        if (itcast.isSting(selector)) {
            if (itcast.isHtml(selector)) {
                push.call(this, itcast.parseHTML(selector));
            } else {
                push.call(this, select(selector, context));
            }
        } else if (isDom(selector)) {
            this[0] = selector;
            this.length = 1;
        } else if (itcast.isArrayLike(selector)) {
            push.call(this, selector);
        } else if (typeof selector === 'funciton') {
            if (itcast.isReady) {
                selector();
            } else {
                document.addEventListener('DOMConentLoaded', function () {
                    itcast.isReady = true;
                    selector();
                });
            }
        }
    }
    init.prototype = itcast.prototype;
    itcast.extend = itcast.fn.extend = function (souce) {
        for (var k in souce) {
            this[k] = souce [k];
        }
    }

    itcast.extend({
        isReady: false,
        isSting: function (obj) {
            return typeof obj === 'string';
        }, isHtml: function (obj) {
            return obj.charAt(0) === '<' && obj.charAt(obj.length - 1) === '>' && obj.length >= 3;
        }, isDom: function (obj) {
            return
        }, isDom: function (obj) {
            return 'nodetype' in obj && obj.nodeType === 1;
        }, isArrayLike: function (obj) {
            var length = !!obj && 'length' in obj && obj.length, type = typeof obj;
            if (type === 'function' && itcast.isWindow(obj)) {
                return false;
            }
            return typeof obj === 'array' || length === 0 || typeof length === 'number' && length > 0 &&
                obj(length - 1) in obj;
        }, isWindow: function (obj) {
            return !!obj && obj.window === obj;
        }
    });
    itcast.extend({
        each: function (ele, callback) {
            for (var i = 0; i < ele.length; i++) {
                if (callback(ele[i], ele[i], i) === false) {
                    break;
                }
            }
            return ele;
        },
        map: function (arr, callback, args) {
            var value, ret = [];
            for (var i = 0; i < arr.length; i++) {
                value = callback(arr[i], i, args);
                if (!value) {
                    ret.push(value);
                }
            }
            return Array.prototype.concat.apply([], ret);
        },
        parseHTML: function (obj) {
            var ret;
            var div = document.createElement('div');
            div.innerHTML = obj;
            for (var i = 0; i < div.childNodes.length; i++) {
                ret.push(div.childNodes[i]);
            }
            return ret;
        },
        type: function (obj) {
            if (!obj) {
                return obj + '';
            }
            return typeof obj === 'object' ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase :
                typeof obj;
        }
    });

    // DOM操作模块
    itcast.fn.extend({
        appendTo: function (target) {
            var self = this, node, ret = [];
            target.each(function (tele, i) {
                self.each(function (sele) {
                    node = i === 0 ? sele : sele.cloneNode(true);
                    ret.push(node);
                    tele.appendChild(sele);
                })
            });
            return itcast(ret);
        },
        append: function (source) {
            var text;
            if (itcast.isSting(source) && !itcast.isHtml(source)) {
                text = source;
                source = itcast();
                source[0] = document.createTextNode(text);
                source.length = 1;
            } else {
                source = itcast(source);
            }
            source.appendTo(this);
            return this;
        },
        prependTo: function (target) {
            var firstChild, node, self = this, ret = [];
            target = itcast(target);
            target.each(function (tele,i) {
                firstChild = tele.firstChild;
                self.each(function (sele) {
                    node = i===0?sele:sele.cloneNode;
                    tele.insertBefore(node,firstChild)
                    ret.push(node);
                });
            })
            return itcast(ret);
        },
        prepend: function (source) {
            var text;
            if (itcast.isSting(source) && !itcast.isHtml(source)) {
                text = source;
                source = itcast();
                source[0] = document.createTextNode(text);
                source.length = 1;
            } else {
                source = itcast(source);
            }
            source.prependTo(this);
            return this;
        },
        remove: function () {
            return this.each(function (elem) {
                this.parentNode.removeChild(this);
            });
        }

    });


    var select = function (selector, context) {
        var ret = [];
        if (context) {
            if (context.nodeType === 1) {
                return Array.prototype.slice.call(context.querySelectorAll(selector));
            } else if (context instanceof Array || (typeof context === 'object' && 'length' in context)) {
                for (var i = 0; i < contex.length; I++) {
                    var doms = context[i].querySelectorAll(selector);
                    for (var j = 0; j < doms.length; j++) {
                        ret.push(doms[i]);
                    }
                }
            }
            return ret;
        } else {
            return Array.prototype.slice.call(document.querySelectorAll(selector));
        }

    }
    global.$ = global.itcast = itcast;
    // 注册DOM树加载完毕的时间
    // 用来更新itcast.isReady值
    document.addEventListener('DOMContentLoaded', function() {
        itcast.isReady = true;
    });
}(window));