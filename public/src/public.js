
var plus = {};
plus.path = 'http://localhost:3000';
plus.back = function () {
    document.querySelector('.menu').classList.remove('show');
    document.getElementById('main').style.webkitTransform = "translate3d(0px, 0px, 0px) scale(1)";
    document.querySelector('.mask').style.display = 'none';
}
plus.set_font=function (num) {

    // 计算、转换布局单位
    var html = document.getElementsByTagName('html')[0];
    var designFontSize = 100;
    var designWidth = 640;
    if(num){
        designWidth = num;
    }

    function setFontSize() {
        var winWidth = document.documentElement.getBoundingClientRect().width;
        var fontSize = winWidth / designWidth * designFontSize;

        html.style.fontSize = fontSize + 'px';
    }
    setFontSize();
    window.addEventListener('resize', function () {
        setFontSize();
    });

    return this;
}
plus.set_font(750);
plus.backLogin = function () {

}

window.Event = {};
plus.Event = {

    funcList: {}, //保存delegate所绑定的方法
    ieFuncList: {}, //由于保存在ie下绑定的方法


    on: function(obj, selector, type, fn) {
        if (!obj || !selector) return false;
        var fnNew = plus.Event.delegateHandle(obj, selector, fn);
        plus.Event.addEvent(obj, type, fnNew);
        /* 将绑定的方法存入Event.funcList，以便之后解绑操作 */
        if (!plus.Event.funcList[selector]) {
            plus.Event.funcList[selector] = {};
        }
        if (!plus.Event.funcList[selector][type]) {
            plus.Event.funcList[selector][type] = {};
        }

        plus.Event.funcList[selector][type][fn] = fnNew;
    },

    off: function(obj, selector, type, fn) {
        if (!obj || !selector || !plus.Event.funcList[selector]) {
            return false;
        }
        var fnNew = plus.Event.funcList[selector][type][fn];
        if (!fnNew) {
            return;
        }

        plus.Event.offEvent(obj, type, fnNew);
        plus.Event.funcList[selector][type][fn] = null;
    },

    delegateHandle: function(obj, selector, fn) {
        /* 实现delegate 的转换方法，事件冒泡上升时, 符合条件时才会执行回调函数 */
        var func = function(event) {
            var event = event || window.event;
            var target = event.srcElement || event.target;
            var parent = target;

            function contain(item, elmName) {
                if (elmName.split('#')[1]) { //by id
                    if (item.id && item.id === elmName.split('#')[1]) {
                        return true;
                    }
                }
                if (elmName.split('.')[1]) { //by class
                    if (hasClass(item, elmName.split('.')[1])) {
                        return true;
                    }
                }
                if (item.tagName == elmName.toUpperCase()) {
                    return true; //by tagname
                }
                return false;
            }
            while (parent) {
                /* 如果触发的元素，属于(selector)元素的子级。 */
                if (obj == parent) {
                    return false; //触发元素是自己
                }
                if (contain(parent, selector)) {

                    fn.call(obj, event);
                    return;
                }
                parent = parent.parentNode;
            }
        };
        return func;
    },
    addEvent: function(target, type, fn) {
        if (!target) return false;
        var add = function(obj) {
            if (obj.addEventListener) {

                obj.addEventListener(type, fn, false);

            } else {
                // for ie
                if (!plus.Event.ieFuncList[obj]) plus.Event.ieFuncList[obj] = {};
                if (!plus.Event.ieFuncList[obj][type]) plus.Event.ieFuncList[obj][type] = {};
                plus.Event.ieFuncList[obj][type][fn] = function() {
                    fn.apply(obj, arguments);
                };
                obj.attachEvent("on" + type, plus.Event.ieFuncList[obj][type][fn]);
            }
        }
        if (target.length >= 0 && target !== window && !target.tagName) {
            for (var i = 0, l = target.length; i < l; i++) {
                add(target[i])
            }
        } else {
            add(target);
        }
    },


    offEvent: function(target, type, fn) {
        if (!target) return false;
        var remove = function(obj) {
            if (obj.addEventListener) {
                obj.removeEventListener(type, fn, false);

            } else {
                //for ie
                if (!plus.Event.ieFuncList[obj] || !plus.Event.ieFuncList[obj][type] || !plus.Event.ieFuncList[obj][type][fn]) {
                    return;
                }
                obj.detachEvent("on" + type, plus.Event.ieFuncList[obj][type][fn], false);
                plus.Event.ieFuncList[obj][type][fn] = {};
            }
        }
        if (target.length >= 0 && target !== window && !target.tagName) {
            for (var i = 0, l = target.length; i < l; i++) {
                remove(target[i])
            }
        } else {
            remove(target);
        }
    },

};
export default plus;