/**
 * @file mip-tubatu-tender 组件
 * @author
 */

define(function (require) {
    'use strict';
    // var zepto = require('zepto');
    var customElement = require('customElement').create();
    var mipUtil = require('util');
    var $ = require('jquery');

    // 防重复提交标识
    var repeatFlag = false;

    var util = {
        // used multiple times
        containReg: function (txt) {
            return new RegExp('(\\s+|^)' + txt + '(\\s+|$)');
        },
        // check if dom has certain class
        hasClass: function (ele, cls) {
            return ele.className.match(this.containReg(cls));
        },
        // add certain class to dom
        addClass: function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                return;
            }
            ele.className = (ele.className + ' ' + cls).trim();
        },
        // remove certain class from dom
        removeClass: function (ele, cls) {
            if (!this.hasClass(ele, cls)) {
                return;
            }
            ele.className = ele.className.replace(this.containReg(cls), ' ').trim();
        },
        // toggle certain class of dom
        toggleClass: function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                this.removeClass(ele, cls);
            } else {
                this.addClass(ele, cls);
            }
        },
        query: function (objclass) {
            return document.querySelector(objclass);
        }
    };

    function build() {
        var GP_EN = [
            'A 安徽',
            'B 北京',
            'C 重庆',
            'F 福建',
            'G 广西',
            'G 贵州',
            'G 广东',
            'G 甘肃',
            'H 海南',
            'H 湖北',
            'H 黑龙江',
            'H 河南',
            'H 河北',
            'H 湖南',
            'J 江苏',
            'J 吉林',
            'J 江西',
            'L 辽宁',
            'N 内蒙古',
            'N 宁夏',
            'Q 青海',
            'S 四川',
            'S 陕西',
            'S 上海',
            'S 山东',
            'S 山西',
            'T 天津',
            'X 西藏',
            'X 新疆',
            'Y 云南',
            'Z 浙江'];
        var GC1 = [];
        GC1['A 安徽'] = ['合肥', '阜阳', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵',
        '安庆', '黄山', '滁州', '宿州', '六安', '亳州', '池州', '宣城'];
        GC1['B 北京'] = ['北京'];
        GC1['C 重庆'] = ['重庆'];
        GC1['F 福建'] = ['福州', '厦门', '三明', '莆田', '泉州', '漳州', '南平', '龙岩', '宁德'];
        GC1['G 广西'] = ['南宁', '百色', '柳州', '桂林', '梧州', '北海', '防城港',
        '钦州', '贵港', '玉林', '贺州', '河池', '来宾', '崇左'];
        GC1['G 贵州'] = ['贵阳', '六盘水', '遵义', '安顺', '铜仁', '毕节',
        '黔东南苗族侗族自治州', '黔西南布依族苗族自治州', '黔南布依族苗族自治州'];
        GC1['G 广东'] = ['广州', '深圳', '珠海', '汕头', '韶关', '河源', '梅州',
        '惠州', '汕尾', '东莞', '中山', '江门', '佛山', '阳江',
        '云浮', '湛江', '茂名', '肇庆', '清远', '潮州', '揭阳'];
        GC1['G 甘肃'] = ['兰州', '金昌', '白银', '天水', '嘉峪关', '武威', '张掖',
        '平凉', '酒泉', '庆阳', '定西', '陇南', '甘南藏族自治州', '临夏回族自治州'];
        GC1['H 海南'] = ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县',
        '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县',
        '琼中黎族苗族自治县', '保亭黎族苗族自治县', '南沙群岛', '西沙群岛', '中沙群岛的岛礁及其海域'];
        GC1['H 湖北'] = ['武汉', '黄石', '襄阳', '十堰', '荆州', '宜昌', '荆门',
        '鄂州', '孝感', '黄冈', '咸宁', '随州', '仙桃', '天门', '潜江', '神农架林区', '恩施土家族苗族自治州'];
        GC1['H 黑龙江'] = ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆',
        '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭'];
        GC1['H 河南'] = ['郑州', '鹤壁', '开封', '洛阳', '平顶山', '焦作', '新乡',
        '安阳', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'];
        GC1['H 河北'] = ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台',
        '保定', '张家口', '承德', '沧州', '廊坊', '衡水'];
        GC1['H 湖南'] = ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德',
        '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'];
        GC1['J 江苏'] = ['南京', '徐州', '连云港', '淮安', '宿迁', '太仓', '盐城',
        '扬州', '泰州', '南通', '镇江', '常州', '无锡', '苏州', '昆山', '江阴', '张家港', '常熟'];
        GC1['J 吉林'] = ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'];
        GC1['J 江西'] = ['南昌', '景德镇', '萍乡', '新余', '九江', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'];
        GC1['L 辽宁'] = ['沈阳', '大连', '本溪', '鞍山', '抚顺', '丹东',
        '锦州', '葫芦岛', '营口', '盘锦', '阜新', '辽阳', '铁岭', '朝阳'];
        GC1['N 内蒙古'] = ['呼和浩特', '乌兰察布', '锡林郭勒盟', '巴彦淖尔',
        '阿拉善盟', '兴安盟', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔'];
        GC1['N 宁夏'] = ['银川', '石嘴山', '吴忠', '中卫', '固原'];
        GC1['Q 青海'] = ['西宁', '海东', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州',
        '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'];
        GC1['S 四川'] = ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江',
        '乐山', '南充', '宜宾', '广安', '达州', '巴中', '眉山',
        '资阳', '雅安', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'];
        GC1['S 陕西'] = ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'];
        GC1['S 上海'] = ['上海'];
        GC1['S 山东'] = ['济南', '青岛', '聊城', '滨州', '菏泽', '潍坊', '日照', '淄博',
        '枣庄', '东营', '烟台', '威海', '济宁', '泰安', '莱芜', '德州', '临沂'];
        GC1['S 山西'] = ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '忻州', '临汾', '运城', '吕梁'];
        GC1['T 天津'] = ['天津'];
        GC1['X 西藏'] = ['拉萨', '那曲', '昌都', '山南', '日喀则', '阿里', '林芝'];
        GC1['X 新疆'] = ['乌鲁木齐', '克拉玛依', '石河子', '阿拉尔', '图木舒克', '五家渠',
        '吐鲁番', '哈密', '和田', '喀什', '阿克苏', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州',
        '昌吉回族自治州', '博尔塔拉蒙古自治州', '伊犁哈萨克自治州', '阿勒泰地区', '塔城地区'];
        GC1['Y 云南'] = ['昆明', '曲靖', '玉溪', '保山', '昭通', '普洱', '临沧', '丽江',
        '文山壮族苗族自治州', '红河哈尼族彝族自治州', '西双版纳傣族自治州', '楚雄彝族自治州',
        '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈傈族自治州', '迪庆藏族自治州'];
        GC1['Z 浙江'] = ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴',
        '金华', '舟山', '台州', '丽水', '衢州', '义乌'];

        var Select = function () {
            /* 初始化组件,并将配置参数option传入 */
            this.initialize = function (option) {
                var self = this;
                // 配置默认参数
                this.config = $.extend({
                    targetDom: '#area', // 绑定的目标表单
                    data: [{'province': GP_EN}, {'city': GC1}], // 下拉里面的所需要的参数,以key-value形式传入,key可作为对应value的class
                    forDom: '#froms', // 当前表单form
                    markClass: 'on', // 控制选择到的下拉选项
                    dataHandle: null, // 自定义组装数据
                    hideBox: null, // 自定义隐藏动画或逻辑
                    callback: function () {
                    }
                }, option);

                var self = this;
                var moveMark = false; // 判断是点击还是触摸移动
                var inputParent = $(this.config.targetDom).parent();
                self.areaMove = false;
                inputParent.on('touchstart', function (e) {
                    self.areaMove = false;
                });
                inputParent.on('touchmove', function (e) {
                    self.areaMove = true;
                });
                inputParent.on('touchend', function (e) {
                    var id = $(e.target).attr('id');
                    if (!self.areaMove) {
                        self.createBox();// 创建节点
                        self.event();// 给节点绑定事件
                        self.areaMove = false;
                        // $(self.config.targetDom).focus();
                        self.animate = true;
                        var box = self.config.$dom;
                        $(self.config.forDom).find('input,select').blur();
                        $('#mfyy_phone').blur();
                        self.selectFill();
                        box.show();
                        setTimeout(function () {
                            self.config.$dom.find('.area-select-obj').removeClass('area-mark');
                        }, 0);// 节点显示完毕后才移除class确保css动画执行
                        setTimeout(function () {
                            self.animate = false;
                        }, 400);
                    }
                });
            };
            /* 给select绑定事件 */
            this.event = function () {
                var self = this;
                var moveMark = false; // 判断是点击还是触摸移动
                var animate = false; // 用于判断动画

                $(this.config.targetDom).prop('readonly', true);

                this.config.$dom.on('touchstart', function (e) {
                    e.preventDefault();
                });

                // 点击灰色背景关闭select
                this.config.$dom.find('.area-select-background').on('touchstart', function (e) {
                    e.preventDefault();
                    if (!self.animate) {
                        self.animate = true;
                        self.hideBox();
                    }
                });

                // 点击获取触摸点
                var startY = -1;
                var originY = -1;
                var time = 0;
                var stopTime = 0;
                var li;
                this.config.$dom.find('.area-select').on('touchstart', function (e) {
                    var targetDom = $(e.target);
                    e.preventDefault();
                    startY = e.originalEvent.touches[0].pageY;
                    originY = e.originalEvent.touches[0].pageY;
                    // 如果点到的是li下的div
                    if (targetDom.hasClass('area-select-option')) {
                        li = targetDom.parent();
                    } else if (targetDom.parent().hasClass('area-select-option')) {
                        li = targetDom.parent().parent();
                    } else {
                        li = targetDom;
                    }
                    stopTime = setInterval(function () {
                        time++;
                        if (time > 20 && !li.hasClass('area-background-tab')) {
                            li.addClass('area-background-tab');
                        }
                    }, 10);
                });

                // 下拉选项里面如果是上下滑动不触发点击
                this.config.$dom.find('.area-select').on('touchmove', function (e) {
                    var select = $(e.currentTarget); // 当前触发事件的元素
                    var ul = $(e.currentTarget).find('ul'); // 触发元素下的ul
                    var moveY = e.originalEvent.touches[0].pageY; // 移动后的Y坐标
                    var move = startY - moveY; // 移动的位置 ++↑  --↓
                    var heightSelect = select.height(); // 当前作为窗口的高度
                    var heightUl = ul.height(); // 窗口里面内容的高度
                    var height = heightSelect - heightUl; // 两个容器高度差就是ul最大移动距离
                    var top = parseInt(ul.data('top') || 0, 10); // 获取当前元素的top 之前没有移动则为undefined
                    if (moveY !== startY) {
                        moveMark = true;
                        startY = moveY; // 将当前移动的坐标覆盖开始值
                    }
                    if (Math.abs(startY - originY) >= 4) {
                        clearInterval(stopTime);
                        ul.find('.area-background-tab').removeClass('area-background-tab');
                    }
                    if (height < 0) { // 高度差大于0则说明窗口里面内容不用移动
                        if (e.originalEvent.touches[0].clientY <= -1 && top <= height) {
                            ul.addClass('transition-select');
                            ul.css('-webkit-transform', 'translateY(' + height + 'px)');
                            ul.data('top', height);
                            setTimeout(function () {
                                ul.removeClass('transition-select');
                            }, 500);
                            return;
                        }
                        // 如果移动后top大于0则为0   移动后top小于高度差说明移动到最大距离
                        var m = (top - move) >= 86 ? 86 : (top - move) <= (height - 86) ? (height - 86) : (top - move);
                        ul.data('top', m);
                        ul.css('-webkit-transform', 'translateY(' + m + 'px)');
                    }
                });

                // 触摸离开
                this.config.$dom.find('.area-select').on('touchend', function (e) {
                    // 如果是上下滑动不执行后续动作
                    time = 0;
                    clearInterval(stopTime);
                    var ul = $(e.currentTarget).find('ul');
                    var height = $(this).height() - ul.height();
                    ul.addClass('transition-select');
                    if (ul.data('top') >= 0) {
                        ul.css('-webkit-transform', 'translateY(0px)');
                        ul.data('top', '0');
                    } else if (ul.data('top') <= height) {
                        ul.css('-webkit-transform', 'translateY(' + height + 'px)');
                        ul.data('top', height);
                    }
                    setTimeout(function () {
                        ul.removeClass('transition-select');
                    }, 500);
                    $(e.currentTarget).find('.area-background-tab').removeClass('area-background-tab');
                    if (moveMark && Math.abs(startY - originY) >= 4) {
                        moveMark = false;
                        return;
                    }
                    var targetDom = $(e.target); // 当前点击的元素
                    var dataFont = ''; // area-select-province里面text
                    var city = ''; // area-select-city里面的text
                    var li = ''; // 当前点击的li

                    // 如果点到的是li下的div
                    if (targetDom.hasClass('area-select-option')) {
                        li = targetDom.parent();
                    } else if (targetDom.parent().hasClass('area-select-option')) {
                        li = targetDom.parent().parent();
                    } else {
                        li = targetDom;
                    }
                    // 如果点击的是第一行选项 给第二行填充对应数据
                    if (li.parent().hasClass('area-select-province')) {
                        dataFont = li.data('handle');
                        self.fillCity(dataFont, city);
                    }
                    if (li.hasClass('area-select')) {
                        return;
                    }
                    li.parent().find('.' + self.config.markClass).removeClass(self.config.markClass);
                    li.addClass(self.config.markClass);
                    // 如果点击的是第二行 则关闭select
                    if (li.parent().hasClass('area-select-city')) {
                        // 将之前的选择标记干掉 给点击的li加上标记
                        // 拿到两个选择的text 填充到目标表单 然后执行关闭动画
                        var province = self.config.$dom.find('.area-select-province')
                        .find('.' + self.config.markClass + ' .area-select-option').text();
                        var city = self.config.$dom.find('.area-select-city')
                        .find('.' + self.config.markClass + ' .area-select-option').text();
                        $(self.config.targetDom).val(province.substring(2) + ' ' + city);
                        animate = true;
                        self.config.callback();
                        self.hideBox();
                    }
                });
            };
            // 如果输入框里面有值,则展示出来
            this.selectFill = function () {
                var cityArr = $(this.config.targetDom).val().split(' ');
                var ul = this.config.$dom.find('.area-select-province');
                var onHandle = '';
                if ($(this.config.targetDom).val()) {
                    var liDom = ul.find('li');
                    for (var i = 0; i < liDom.length; i++) {
                        var handle = $(liDom[i]).data('handle');
                        if (cityArr[0] === handle.substring(2)) {
                            ul.find('.on').removeClass('on');
                            $(liDom[i]).addClass('on');
                            onHandle = handle;
                        }
                    }
                    this.fillCity(onHandle, '', cityArr[1]);
                }
            };
            // 填充第二行数据
            this.fillCity = function (dataFont, city, cityText) {
                var self = this;
                var str = '<ul class="area-select-city">';

                for (var key in self.config.data[1]['city'][dataFont]) {
                    city += '<li class=\"'
                    + (self.config.data[1]['city'][dataFont][key] === cityText ? self.config.markClass : '')
                    + '\">'
                    + '<div class="area-select-option">' + self.config.data[1]['city'][dataFont][key] + '</div>'
                    + '</li>';
                }
                ;
                str += city + '</ul>';
                this.config.$dom.find('.area-city').html(str);
            };
            // 用于返回判断动画的事件名
            this.whichTransitionEvent = function () {
                var el = document.createElement('fakeelement');
                var transitions = {
                    'transition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'MozTransition': 'transitionend',
                    'WebkitTransition': 'webkitTransitionEnd'
                };
                for (var t in transitions) {
                    if (el.style[t] !== undefined) {
                        return transitions[t];
                    }
                }
            };
            /* 关闭select */
            this.hideBox = function () {
                // 如果存在自定义关闭函数则执行自定义函数
                if (typeof this.config.hideBox === 'function') {
                    this.config.hideBox();
                    return;
                }

                // 接触事件绑定
                this.config.$dom.off('touchstart');

                // 点击灰色背景关闭select
                this.config.$dom.find('.area-select-background').off('touchstart');

                // 点击获取触摸点
                this.config.$dom.find('.area-select').off('touchstart');

                // 下拉选项里面如果是上下滑动不触发点击
                this.config.$dom.find('.area-select').off('touchmove');

                // 触摸离开
                this.config.$dom.find('.area-select').off('touchend');

                // $(document.body).removeAttr('style');
                this.config.$dom.find('.area-select-obj').addClass('area-mark');
                var self = this;
                var clearT = setTimeout(function () {
                    clearTimeout(clearT);
                    // 然后干掉节点
                    self.config.$dom.remove();
                }, 400);
            };
            /* 将数据组装成节点 */
            this.dataHandle = function () {
                var areaSelect = '';// 组件的select
                for (var data in this.config.data) {
                    for (var key in this.config.data[data]) {
                        var li = '';
                        var arr = [];
                        var select = '<div class="area-select area-' + key + '">'
                            + '<ul class="area-select-' + key + '">'; // 将key加上area-select前缀class

                        if ('city' === key) {
                            arr = this.config.data[data][key]['A 安徽'];
                        } else {
                            arr = this.config.data[data][key];
                        }

                        for (var k in arr) {
                            var str = '';
                            if ('city' === key) {
                                str = arr[k];
                            } else {
                                str = '<span>' + arr[k].substring(2, -1) + '</span>' + arr[k].substring(2);
                            }
                            li += '<li data-handle="' + arr[k]
                                + '" class=\"' + ('city' === key ? '' : (parseInt(k, 10)
                                === 0 ? this.config.markClass : '')) + '\">'
                                + '<div class="area-select-option">' + str + '</div>'
                                + '</li>';
                        }

                        li += '</ul></div>';
                        select += li;
                        areaSelect += select;
                    };
                }
                return areaSelect;
            };
            /* 创建select */
            this.createBox = function () {
                // 如果有自定义组装函数就执行自定义组装函数
                var areaSelect
                    = typeof this.config.dataHandle
                    === 'function' ? this.config.dataHandle() : this.dataHandle();

                var str = '<div class="area-select-box">'
                    + '<div class="area-select-background"></div>'
                    + '<div class="area-select-obj area-mark">'
                    + areaSelect
                    + '</div>'
                    + '</div>';
                this.config.$dom = $(str);
                $(document.body).append(this.config.$dom);
            };
        };

        window.ProvincesSelect = {
            initialize: function (option) {
                new Select().initialize(option);
            }
        };

        var str = '<mip-bottom-footerlayer class="mip-layout-container">'
                + '<div class="layerout"></div>'
                + '<mip-fixed type="bottom" class="fixed-footer">'
                + '<div class="bottom-form-btn-box">'
                + '<ul class="clearfix">'
                + '<li class="btn-mfsj-list">'
                + '<span class="btn-mfsj" data-pg="2_3_3_6475"><i></i>免费设计</span>'
                + '</li>'
                + '<li class="btn-zxbj-list">'
                + '<span class="btn-zxbj" data-pg="2_3_3_6476"><i></i>免费报价</span>'
                + '</li>'
                + '</ul>'
                + '</div>'
                + '<div class="tab-bottom-form-box">'
                + '<div class="mfsj-form-box result-box">'
                + '<mip-img src="https://img.to8to.com/decorate_learning/banner_mfsj.png" alt=""></mip-img>'
                + '<mip-form action="" id="mfsj_form" url="//to8tozb.to8to.com/zb/zb-index-get.php">'
                + '<div class="mfsj-form tab-form-box">'
                + '<div class="element-line">'
                + '<input type="text" id="uname" name="name" placeholder="请输入您的称呼">'
                + '</div>'
                + '<div class="element-line clearfix">'
                + '<div>'
                + '<input type="tel" id="uphone" name="phone" placeholder="请输入手机号" maxlength="11">'
                + '</div>'
                + '<div class="fr area-box download-arrow1">'
                + '<input type="text" id="city" placeholder="选择城市" readonly="">'
                + '</div>'
                + '</div>'
                + '<div class="element-line order_serve_check">'
                + '<span class="check_box">'
                + '<mip-img class="checked" src="https://img.to8to.com/decorate_learning//checked.png" alt=""></mip-img>'
                + '<mip-img class="unchecked" src="https://img.to8to.com/decorate_learning//unchecked.png" alt=""></mip-img>'
                + '</span>'
                + '我已阅读并接受 <a href="https://m.to8to.com/question.html">《装修常见问题条款》</a>'
                + '</div>'
                + '<input type="hidden" id="mfsj_pg" name="ptag" value="">'
                + '<span id="sub_mfsj" class="sub-mfsj-form" data-pg="">立即申请</span>'
                + '</div>'
                + '</mip-form>'
                + '<span class="close-box"><em></em></span>'
                + '</div>'
                + '<div class="zxbj-form-box result-box">'
                + '<mip-img src="https://img.to8to.com/decorate_learning/banner_zxbj.png" alt=""></mip-img>'
                + '<mip-form action="" id="zxbj_form" url="//to8tozb.to8to.com/zb/zb.php">'
                + '<div class="mfsj-form tab-form-box">'
                + '<div class="element-line clearfix">'
                + '<div class="area-box">'
                + '<input type="text" id="newcity" placeholder="选择城市" readonly="">'
                + '</div>'
                + '<div class="fr">'
                + '<input type="number" id="quare" name="quare" placeholder="面积">'
                + '<span>㎡</span>'
                + '</div>'
                + '</div>'
                + '<div class="element-line">'
                + '<div class="yusuan-jishi download-arrow2" id="huxingInput_test">'
                + '<em id="testshi">1</em>室'
                + '<em id="testting">1</em>厅'
                + '<em id="testwei">1</em>卫'
                + '<em id="testyangtai">1</em>阳台'
                + '</div>'
                + '</div>'
                + '<div class="element-line">'
                + '<input type="tel" id="newphone" name="phone" placeholder="请输入手机，短信获取报价结果" maxlength="11">'
                + '<input type="hidden" id="zxbj_pg" name="ptag" value="">'
                + '</div>'
                + '<span id="sub_zxjb" class="sub-mfsj-form" data-pg="">立即申请</span>'
                + '<input type="hidden" name="fang" id="secshi" value="1">'
                + '<input type="hidden" name="ting" id="secting" value="1">'
                + '<input type="hidden" name="wei" id="secwei" value="1">'
                + '<input type="hidden" name="yangtai" id="secyangtai" value="1">'
                + '<input type="hidden" name="chu" id="secchu" value="1">'
                + '</div>'
                + '</mip-form>'
                + '<span class="close-box"><em></em></span>'
                + '</div>'
                + '</div>'
                + '</mip-fixed>'
                + '</mip-bottom-footerlayer>';

        $('body').append(str);

        window.ProvincesSelect.initialize({
            targetDom: '#city',
            forDom: '#mfsj_form'
        });

        window.ProvincesSelect.initialize({
            targetDom: '#newcity',
            forDom: '#zxbj_form'
        });

        var footerlayer = new FooterLayer();
        footerlayer.init();
    }

    function FooterLayer(art) {

        this.init = function () {

            // 当出现键盘时，触碰屏幕取消键盘
            $(document).on('touchstart', function () {
                $('input').blur();
            });

            // 获取ptag
            $('.btn-mfsj').attr('data-pg', $('#mfsj_btn_ptag').attr('data-ptagg'));
            $('#mfsj_pg').val($('#msfj_crm_ptag').attr('data-ptagg'));

            $('.btn-zxbj').attr('data-pg', $('#zxbj_btn_ptag').attr('data-ptagg'));
            $('#zxbj_pg').val($('#zxbj_crm_ptag').attr('data-ptagg'));

            $('.bottom-form-btn-box li').on('touchstart', function () {
                var Tthis = $(this);
                var index = Tthis.index();
                Tthis.addClass('active').siblings().removeClass('active');
                $('.tab-bottom-form-box').show();
                $('.layerout').show();
                $('body').css({'overflow-y': 'hidden'});

                var isActive = Tthis.hasClass('active');
                if (isActive) {
                    Tthis.siblings().removeClass('active');
                    Tthis.addClass('active');

                    var $resultBox = $('.result-box');
                    $resultBox.eq(index).siblings('.result-box').hide();
                    $resultBox.eq(index).show();
                }
            });

            $('.close-box').on('click', function () {
                closeBox();
            });

            var btnDisabled = false;
            $('.check_box').on('touchstart', function () {

                if ($(this).hasClass('checkon')) {
                    $(this).removeClass('checkon');
                } else {
                    $(this).addClass('checkon');
                }
                var show = $('.check_box .checked').css('display');
                if (show === 'block') {
                    btnDisabled = false;
                    $('#sub_mfsj').removeAttr('disabled');
                    $('#sub_mfsj').removeClass('disabled');
                } else {
                    btnDisabled = true;
                    $('#sub_mfsj').attr('disabled', true);
                    $('#sub_mfsj').addClass('disabled');
                }
            });

            $('#sub_mfsj').on('click', function () {
                if (!$('#sub_mfsj').hasClass('disabled')) {
                    mfsjCheckform();
                }
            });

            $('.layerout,.tab-bottom-form-box').on('touchmove', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });

            $('body').on('click', '.mfsj-close-box', function () {
                $('.layerout').removeClass('layerout-z');
                $('.mfsj-layer-box').remove();
                closeBox();
            });

            $('#sub_zxjb').on('click', function () {
                zxbjCheckform();
            });

            $('#quare').on('keyup', function () {
                selectDoorModle($(this).val(), this);
            });

            // 关闭报价弹框
            $('body').on('click', '.t8s-alert-close i', function (e) {
                $('.t8s-alert-box').remove();
                closeBox();
            });

            $('#huxingInput_test').on('click', function () {
                // if (!clickFlag) {
                var shi = $('#testshi').html();
                var ting = $('#testting').html();
                var wei = $('#testwei').html();
                var yangtai = $('#testyangtai').html();

                var arr = ['室', '厅', '卫', '阳台'];
                var html = '<div class="layer-huxing">'
                    + '<div class="layer-content">'
                    + '<span class="column">选择你家的户型</span>'
                    + '<i class="cut-line"></i>'
                    + '<div class="huxing-option">';
                for (var i = 0; i < 4; i++) {
                    html += '<ul class="option' + i + '">';
                    for (var j = 0; j < 5; j++) {
                        if ((i === 0 && j === shi - 1)
                        || (i === 1 && j === ting - 1)
                        || (i === 2 && j === wei - 1)
                        || (i === 3 && j === yangtai - 1)) {
                            html += '<li class="on">' + (j + 1) + arr[i] + '</li>';
                        }
                        else {
                            html += '<li>' + (j + 1) + arr[i] + '</li>';
                        }
                    }
                    html += '</ul>';
                }
                html += '</div>'
                    + '<input type="button" value="确定" id="submitHuxing_test"/>'
                    + '</div>'
                    + '</div>';
                $('body').append(html);
                // }
            });

            $('body').on('click', '#submitHuxing_test', function (e) {

                var shi = $('.option0 .on').index() + 1;
                var ting = $('.option1 .on').index() + 1;
                var wei = $('.option2 .on').index() + 1;
                var yangtai = $('.option3 .on').index() + 1;

                $('#testshi').html(shi);
                $('#testting').html(ting);
                $('#testwei').html(wei);
                $('#testyangtai').html(yangtai);

                $('#secshi').val(shi);
                $('#secting').val(ting);
                $('#secwei').val(wei);
                $('#secyangtai').val(yangtai);
                $('.layer-huxing').remove();
                e.preventDefault();
            });

            $('body').on('touchstart', '.huxing-option li', function (event) {
                $(event.target).addClass('on').siblings().removeClass('on');
            });

            $(document.body).on('touchstart', function () {
                $('#quare').blur();
            });
        };
    }

    function closeBox() {
        $('body').css({'overflow-y': 'initial'});
        $('.tab-bottom-form-box').hide();
        $('.mfsj-form-box').hide();
        $('.zxbj-form-box').hide();
        $('.layerout').hide();
        $('.bottom-form-btn-box li').removeClass('active');
    }

    function mfsjCheckform() {
        var mfsjNmae = $('#uname').val();
        var mfsjPhone = $('#uphone').val();
        var mfsjCity = $('#city').val();
        var addArr = mfsjCity.split(' ');
        var uuid = createGuid();

        if (mfsjNmae.length === 0) {
            errorLayer('请输入用户名');
            return false;
        }
        if (mfsjPhone.length === 0) {
            errorLayer('请输入号码');
            return false;
        }
        if (!(/^(1[3|4|5|6|7|8|9])[\d]{9}$/.test(mfsjPhone))) {
            errorLayer('请输入正确的手机号码');
            return false;
        }
        if (mfsjCity.length === 0) {
            errorLayer('请输入城市');
            return false;
        }

        var sendData = 'shen='
            + addArr[0]
            + '&city='
            + addArr[1]
            + '&chenghu='
            + mfsjNmae
            + '&phone='
            + mfsjPhone
            + '&ptag='
            + $('#mfsj_pg').val()
            + '&modeltype=6&not_send_mobile_msg=1'
            + '&uuid='
            + uuid;

        if (!repeatFlag) {
            // repeatFlag = true;
            $.ajax({
                type: 'get',
                url: '//to8tozb.to8to.com/zb/zb-index-get.php',
                dataType: 'jsonp', // 数据类型为jsonp
                jsonpCallback: 'jsonpCallback',
                data: sendData,
                processData: false,
                success: function (res) {

                    repeatFlag = false;
                    if (res.status === 1) {

                        $('#uname').val('');
                        $('#uphone').val('');
                        $('#city').val('');

                        var html = '<div class="mfsj-layer-box">'
                            + '<img src="//img.to8to.com/wap/service_assurance/success.png">'
                            + '<h2>预约成功！</h2>'
                            + '<p style="color: #fe8e20; font-size: 14px;">稍后客服管家将会致电您和你确认预定信息</p>'
                            + '<a href="javascript:void(0);" class="mfsj-close-box" data-pg=""><em data-pg=""></em></a>'
                            + '</div>';
                        $('.layerout').addClass('layerout-z');
                        $('body').append(html);
                    }
                    if (res.status === 5) {
                        // errorLayer('非常抱歉，您当前的城市' + addArr[1] + '尚未开通免费设计服务，敬请期待！');
                        alert('当前城市未开通');
                    }
                    if (res.status === 3) {
                        errorLayer('您的手机号码已重复申请超过5次');
                    }
                }
            });
        }
    }

    function zxbjCheckform() {
        var quare = $('#quare').val();
        var phone = $('#newphone').val();
        var address = $('#newcity').val();
        var phone = $('#newphone').val();
        var addArr = address.split(' ');
        var ptag = $('#zxbj_pg').val();
        var fang = $('#secshi').val();
        var ting = $('#secting').val();
        var wei = $('#secwei').val();
        var chu = $('#secchu').val();
        var yangtai = $('#secyangtai').val();
        var oreafloat = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
        var uuid = createGuid();

        if (address.length < 2) {
            errorLayer('请选择您所在的城市');
            return false;
        }
        if (quare === '') {
            errorLayer('请输入您的房屋面积');
            return false;
        }
        if (!oreafloat.test(quare)) {
            errorLayer('房屋面积不能超过两位小数');
            return false;
        }
        if ((quare < 5 && quare >= 0) || (quare > 1000)) {
            errorLayer('房屋面积必须在5-1000范围');
            return false;
        }
        if (phone === '' || phone === undefined) {
            errorLayer('请输入您的手机号码');
            return false;
        }
        var telRegexp = /^(1[3|4|5|6|7|8|9])[\d]{9}$/;
        if (!telRegexp.test(phone)) {
            errorLayer('请输入正确的手机号码!');
            return false;
        }

        var sendData = {
            ptag: ptag,
            square: quare,
            shen: addArr[0],
            city: addArr[1],
            shi: fang,
            ting: ting,
            phone: phone,
            wei: wei,
            yangtai: yangtai,
            chu: chu,
            modeltype: 8,
            uuid: uuid,
            method: 'baojiaZb'
        };

        if (!repeatFlag) {
            repeatFlag = true;
            $.ajax({
                type: 'GET',
                url: '//to8tozb.to8to.com/zb/zb-index-get.php',
                dataType: 'jsonp',
                jsonpCallback: 'jsonpCallback',
                data: sendData,
                success: function (data) {
                    resultZbBox(data);
                    $('#quare').val('');
                    $('#newphone').val('');
                    $('#newcity').val('');

                    $('#testshi').html(1);
                    $('#testting').html(1);
                    $('#testwei').html(1);
                    $('#testyangtai').html(1);
                    repeatFlag = false;
                }
            });
        }
    }

    function resultZbBox(data) {
        var fruitHtml = '<div class="t8s-alert-box">'
            + '<div class="t8s-box">'
            + '<div class="alert-lay" >'
            + '<div class="overlay-bd">'
            + '<a href="javascript:void(0);" class="t8s-alert-close" data-pg="">'
            + '<i class="t8s-alert-i" data-pg=""></i></a>'
            + '<div class="t8s-content-box">'
            + '<div class="t8s-fruit-price">'
            + '<p class="column">您家的装修预算为</p>'
            + '<p class="price-text-one">'
            + '<span>' + (data.to8to_totle_price / 10000).toFixed(1) + '</span>'
            + '<i>万元</i>'
            + '</p>'
            + '</div>'
            + '<div class="t8s-price-list">'
            + '<ul>'
            + '<li class="clearfix"><span class="t8s-budget-span">材料费：</span>'
            + '<span><em>' + data.to8to_cl_price + '</em>元</span></li>'
            + '<li class="clearfix"><span class="t8s-budget-span">人工费：</span>'
            + '<span><em>' + data.to8to_rg_price + '</em>元</span></li>'
            + '<li class="clearfix"><span class="t8s-budget-span">设计费：</span>'
            + '<span><em>0</em>元<del class="to8to_zj">' + data.normal_sj_price + '元</del></li>'
            + '<li class="clearfix"><span class="t8s-budget-span">质检费：</span>'
            + '<span><em>0</em>元<del class="to8to_zj">' + data.normal_zj_price + '元</del></li>'
            + '</ul>'
            + '</div>'
            + '<div class="holiday-text-t6s">'
            + '<p>*报价有疑问？稍后土巴兔将致电为您解答。</p>'
            + '<p>*报价为毛坯半包价，实际以量房实测为准。</p>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        $('body').append(fruitHtml);
    }

    // 报错提示
    function errorLayer(text) {
        var errorTime;
        $('.error-layer').remove();
        var errstr = '<div class="error-layer">' + text + '</div>';
        $(errstr).appendTo('body');
        $('.errorTips').show();

        window.clearInterval(errorTime);
        errorTime = setTimeout(
            function () {
                $('.error-layer').remove();
            }, 2000);
    }

    // 根据面积显示户型
    function selectDoorModle(square, squareEle) {
        var square = Number(square);
        if (square + '' === 'NaN' || $(squareEle).val() === '') {
            return;
        }
        if (90 > square && square >= 60) {
            $('#secshi').val(2);
            $('#secting').val(1);
            $('#secchu').val(1);
            $('#secwei').val(1);
            $('#secyangtai').val(1);

            $('#testshi').html(2);
            $('#testting').html(1);
            $('#testchu').html(1);
            $('#testwei').html(1);
            $('#testyangtai').html(1);
        } else if (150 > square && square >= 90) {
            $('#secshi').val(3);
            $('#secting').val(2);
            $('#secchu').val(1);
            $('#secwei').val(2);
            $('#secyangtai').val(1);

            $('#testshi').html(3);
            $('#testting').html(2);
            $('#testchu').html(1);
            $('#testwei').html(2);
            $('#testyangtai').html(1);
        }
        else if (150 <= square) {
            $('#secshi').val(4);
            $('#secting').val(2);
            $('#secchu').val(1);
            $('#secwei').val(2);
            $('#secyangtai').val(2);

            $('#testshi').html(4);
            $('#testting').html(2);
            $('#testchu').html(1);
            $('#testwei').html(2);
            $('#testyangtai').html(2);
        }
        else {
            $('#secshi').val(1);
            $('#secting').val(1);
            $('#secchu').val(1);
            $('#secwei').val(1);
            $('#secyangtai').val(1);

            $('#testshi').html(1);
            $('#testting').html(1);
            $('#testchu').html(1);
            $('#testwei').html(1);
            $('#testyangtai').html(1);
        }
    }

    function createGuid() {
        for (var a = '', c = 1; 32 >= c; c++) {
            var b = Math.floor(16 * Math.random()).toString(16);
            a = a + b;
            if (8 === c || 12 === c || 16 === c || 20 === c) {
                a += '';
            }
        }
        return a += Math.ceil(1E6 * Math.random());
    }

    customElement.prototype.build = build;
    return customElement;
});
