import {Toast} from 'mint-ui';
import axios from 'axios';
var plus = {};
// plus.path = 'http://192.168.31.156:3000';
// plus.path = 'http://localhost:3000';
plus.path = 'http://www.3zsd.com';


plus.back = function () {
    document.querySelector('.menu').classList.remove('show');
    document.getElementById('main').style.webkitTransform = "translate3d(0px, 0px, 0px) scale(1)";
    document.querySelector('.mask').style.display = 'none';
}
plus.set_font = function (num) {

    // 计算、转换布局单位
    var html = document.getElementsByTagName('html')[0];
    var designFontSize = 100;
    var designWidth = 640;
    if (num) {
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
plus.backLogin = function (_this) {
    Toast('请重新登录');
    _this.$router.replace({path: '/login', query: {url: _this.$route.path, query: JSON.stringify(_this.$route.query)}});
}

plus.laji = function () {
    axios.post(plus.path + '/host/uplaji')
        .then(function (res) {
            if (res.data.state == 1) {
                Toast({
                    message: '博主辣鸡值+1',
                    position: 'bottom',
                });
            }
        })
}
export default plus;