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

    };
    init = itcast.fn.init = function (selector, context) {
        if (!selector) {
            return this;
        }
        if (itcast.isSting(selector)) {
            if (itcast.isHtml(selector)) {
                push.call(this, itcast.parseHTML(selector));
            } else {
                push.call(this,select(selector,context));
            }
        }else if(isDom(selector)){
            this[0] = selector;
            this.length = 1;
        }else if(itcast.isArrayLike(selector)){
            push.call(this,selector);
        }else if(){

        }
    }
    init.prototype = itcast.prototype;
    itcast.extend = itcast.fn.extend = function (souce) {
        for (var k in souce) {
            this[k] = souce [k];
        }
    }

    itcast.extend({
        isSting: function (obj) {
            return typeof obj === 'string';
        }, isHtml: function (obj) {
            return obj.charAt(0) === '<' && obj.charAt(obj.length - 1) === '>' && obj.length >= 3;
        },isDom: function (obj) {
            return
        },isDom: function (obj) {
            return 'nodetype' in obj && obj.nodeType ===1;
        },isArrayLike: function (obj) {
            var length =  !!obj && 'length' in obj && obj.length,type = typeof obj;
            if(type==='function' && itcast.isWindow(obj)){
                return false;
            }
            return typeof obj ==='array' ||length ===0 ||typeof length ==='number'&&length>0&&
                    obj(length-1) in obj;
        },isWindow: function (obj) {
            return !! obj && obj.window === obj;
        }
    });
    itcast.extend({
        each: function (ele, callback) {
            for (var i = 0; i < ele.length; i++) {
                if(callback(ele[i],ele[i],i)===false){
                    break;
                }
            }
            return ele;
        },
        parseHTML: function (obj) {
            var ret;
            var div = document.createElement('div');
            div.innerHTML = obj;
            for (var i = 0; i < div.childNodes.length; i++) {
                ret.push(div.childNodes[i]);
            }
            return ret;
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
}(window));