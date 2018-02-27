/**
 * @file mip-linkeddb-relmap 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var d3 = require('./d3.min');
    var echarts = require('./echarts.min');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var page = element.getAttribute('data-page');
        var pageType = element.getAttribute('data-pageType');
        var tvEpcount = element.getAttribute('data-tvEpcount');
        var episodesLast = element.getAttribute('data-episodesLast');
        var minep = element.getAttribute('data-minep');
        var currentEpno = element.getAttribute('data-currentEpno');

        var tvOid = element.getAttribute('data-tvOid');
        var mvOid = element.getAttribute('data-mvOid');
        var personOid = element.getAttribute('data-personOid');

        var roleId = element.getAttribute('data-roleId');
        var morenUrl = element.getAttribute('data-morenUrl');
        var echartId = element.getAttribute('data-echartId');
        var type = element.getAttribute('data-personType');
        var args = element.getAttribute('data-args');
        var letter = element.getAttribute('data-letter');
        var categoryId = element.getAttribute('data-categoryId');

        var body = document.getElementsByTagName('body')[0];

        // 不同分类执行不同逻辑
        switch (page) {
            case 'tv': getTvMap();
                break;
            case 'mv': getMvMap();
                break;
            case 'person': getPersonMap();
                break;
            case 'music': getMusic();
                break;
            case 'document': getDocument();
                break;
        }

        // 不同分类的不同页面执行不同逻辑 TV
        function getTvMap() {
            switch (pageType) {
                case 'index': tvIndex();
                    break;
                case 'rel': tvRel();
                    break;
                case 'role': tvRole();
                    break;
                case 'roleTrend': tvRoleTrend();
                    break;
            }
        }

        // 不同分类的不同页面执行不同逻辑 MV
        function getMvMap() {
            switch (pageType) {
                case 'index': mvIndex();
                    break;
            }
        }

        // 不同分类的不同页面执行不同逻辑 Person
        function getPersonMap() {
            switch (pageType) {
                case 'intro': personIntro();
                    break;
                case 'works': personWorks();
                    break;
                case 'interpersonal': personInterpersonal();
                    break;
            }
        }

        // 不同分类的不同页面执行不同逻辑 Document
        function getDocument() {
            switch (pageType) {
                case 'list': documentList();
                    break;
            }
        }

        // 不同分类的不同页面执行不同逻辑 Music
        function getMusic() {
            switch (pageType) {
                case 'index': musicIndex();
                    break;
            }
        }

        // tv index 页
        function tvIndex() {
            var pageNum = 1;
            $(element).parent().parent().find('#more-btn').on('click', function () {
                pageNum = pageNum + 1;
                $.post('https://mip.linkeddb.com/tv/list/' + args + '/p' + pageNum + '/', function (html) {
                    if (html) {
                        $(html).appendTo($(element).parent().parent().find('#tv-list'));
                    } else {
                        $(element).parent().parent().find('#more-btn').hide();
                    }
                });
            });
        }

        // tv rel 页
        function tvRel() {
            // 根据集数 更新人物列表ul | 更新svg图谱
            function iniRolesUl(nodes, epno) {
                var len = nodes.length;
                if (len < 1) {
                    return;
                }
                var ul = document.getElementById('nodesRoleList');
                // 清空
                ul.innerHTML = '';
                var fragment = document.createDocumentFragment();
                var li;
                for (var i = 0; i < len; i++) {
                    li = document.createElement('li');
                    li.innerHTML = '<a data-type="mip" href="###" data-roleId="' + nodes[i].id + '" '
                        + 'class="mui-inline ml10 mb10">'
                        + '<mip-img layout="responsive"'
                        + ' width="100"'
                        + ' height="135"'
                        + ' class="mb10"'
                        + ' src="' + nodes[i].avatar + '" >'
                        + '</mip-img>'
                        + '<span>' + nodes[i].name + '</span>'
                        + '</a>';
                    fragment.appendChild(li);
                }
                ul.appendChild(fragment);

                // 更新svg图谱
                initData('mainPersonRel',
                    'https://www.linkeddb.com/tv/' + tvOid + '-' + epno + '/rolegragh.json',
                    {roleid: nodes[0].id}, 'target');
            }

            // 获取最小集数的人物列表
            // updataPageFormEpno(minep);

            // 根据集数 更新角色列表和图谱
            function updataPageFormEpno(epno) {
                currentEpno = epno;
                $.post('https://www.linkeddb.com/tv/' + tvOid + '/roles', function (data) {
                    if (data.response === 'ok') {
                        iniRolesUl(data.data, epno);
                    }
                });
            }

            // 更换角色，更换svg图谱
            $(element).parent().parent().find('#nodesRoleList').on('click', 'li', function () {
                var $roleId = $(this).find('a').attr('data-roleId');
                // 更新svg图谱
                initData('mainPersonRel',
                    'https://www.linkeddb.com/tv/' + tvOid + '-' + currentEpno + '/rolegragh.json',
					{roleid: $roleId}, 'target');
            });

            updataPageFormEpno(10000);
        }

        // tv role 页
        function tvRole() {
            initData('mainPersonRel',
                'https://www.linkeddb.com/tv/' + tvOid + '-10000/rolegragh.json',
                {roleid: roleId}, 'target');
        }

        // tv roleTrend 页
        function tvRoleTrend() {
            makeRolesRel(morenUrl, episodesLast, echartId);
        }

        // mv index 页
        function mvIndex() {
            var pageNum = 1;
            $(element).parent().parent().find('#more-btn').on('click', function () {
                pageNum = pageNum + 1;
                $.post('https://mip.linkeddb.com/movie/list/' + args + '/p' + pageNum + '/',
                    function (html) {
                        if (html) {
                            $(html).appendTo($(element).parent().parent().find('#mv-list'));
                        } else {
                            $(element).parent().parent().find('#more-btn').hide();
                        }
                    });
                return false;
            });
        }

        // person intro 页
        function personIntro() {
            initData('mainPersonRel',
                'https://www.linkeddb.com/person/' + personOid + '/person_gragh.json', {},
                'source');
        }

        // person works 页
        function personWorks() {
            // 作品图谱分类
            $(element).parent().parent().find('#relMapClass').on('click', 'li', function () {
                $(this).addClass('active').siblings().removeClass('active');
                var relType = $(this).attr('data-type');
                initData('mainPersonWorks',
                    'https://www.linkeddb.com/person/' + personOid + '/work_gragh.json',
                    {type: relType}, 'target');
            });

            // 作品图谱
            initData('mainPersonWorks',
                'https://www.linkeddb.com/person/' + personOid + '/work_gragh.json', {},
                'target');

            // 柱状图
            function echartWorkNum(url, data) {
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.response === 'ok') {
                            echartsWorkNumPic(echartId, data.data);
                        } else {
                            console.log('作品数量获取失败');
                        }
                    }
                });
            }
            echartWorkNum('https://www.linkeddb.com/person/' + personOid + '/work_chart', {});
        }

        // person interpersonal 页
        function personInterpersonal() {
            initData('mainPersonRel',
                'https://www.linkeddb.com/person/' + personOid + '/person_gragh.json', {
                    type: type
                },
                'source');
        }

        // music index 页
        function musicIndex() {
            var pageNum = 1;
            $(element).parent().parent().find('#more-btn').on('click', function () {
                pageNum = pageNum + 1;
                $.get('https://mip.linkeddb.com/music/letter/' + letter + '/p' + pageNum + '/',
                    function (html) {
                        if (html) {
                            $(html).appendTo($(element).parent().parent().find('.itemsCont'));
                        } else {
                            $(element).parent().parent().find('#more-btn').hide();
                        }
                    });
            });
        }

        // document list 页
        function documentList() {
            var pageNum = 1;
            $(element).parent().parent().find('#more-btn').on('click', function () {
                pageNum = pageNum + 1;
                $.post('https://mip.linkeddb.com/document/category/' + categoryId + '/p' + pageNum + '/',
                    function (html) {
                        if (html) {
                            $(html).appendTo($(element).parent().parent().find('#news-list'));
                        } else {
                            $(element).parent().parent().find('#more-btn').hide();
                        }
                    });
                return false;
            });
        }

        // 制作折线图
        // url
        // epcount {number} 总集数
        // echartId {number} 总集数
        function makeRolesRel(url, epcount, echartId) {
            $.post(url, function (json) {

                var dataset = json.data;
                var len = epcount;
                // 自变量(横轴)
                var xArray = [];
                for (var i = 1; i <= len; i++) {
                    xArray.push('第' + i + '集');
                }

                // 因变量(y轴)
                var yArray = [];

                for (var j = 1; j <= len; j++) {
                    var num = 0;
                    if (dataset.length >= 1) {
                        num = findNum(dataset, j);
                    }
                    yArray.push(num);
                }

                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(echartId));
                var option;
                // 指定图表的配置项和数据
                option = {
                    title: {
                        text: '关系指数'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    color: ['#1E90FF', '#E8E8E8'],

                    // calculable : true,
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: xArray
                    }],
                    yAxis: [{
                        type: 'value',
                        max: 100
                        // min:-100
                    }],
                    series: [{
                        name: '关系指数',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#1E90FF'
                            }
                        },
                        data: yArray
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            });
        }

        function findNum(dataset, jishu) {
            var len = dataset.length;
            if (len === 1) {
                if (jishu >= dataset[0][0]) {
                    return dataset[0][1];
                }
                return 0;
            }
            for (var k = 0; k < len; k++) {
                if (jishu === dataset[k][0]) {
                    return dataset[k][1];
                }
                if ((k + 1) === dataset.length) {
                    return dataset[k][1];
                } else if (jishu > dataset[k][0] && jishu < dataset[k + 1][0]) {
                    return dataset[k][1];
                }
            }

        }

        // PC端-作品年份数量柱状图
        // url {string} 数据请求地址
        // echartId {string} 容器id
        function echartsWorkNumPic(echartId, data) {
            var dataset = data;

            // 自变量(横轴)
            var xArray = dataset.map(function (node) {
                return node[0];
            });
            // 因变量(y轴)
            var yArray = dataset.map(function (node) {
                return node[1].length;
            });

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(echartId));
            var option;
            // 指定图表的配置项和数据
            option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    name: '年份',
                    type: 'category',
                    data: xArray,
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    name: '数量',
                    type: 'value',
                    max: function (value) {
                        return value.max + 1;
                    },
                    minInterval: 1,
                    splitLine: {
                        show: true
                    }
                }],
                series: [{
                    name: '作品个数',
                    type: 'bar',
                    barWidth: '70%',
                    data: yArray
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }


        // 将对象元素转换成字符串以作比较
        function obj2key(obj, keys) {
            var n = keys.length;
            var key = [];
            while (n--) {
                key.push(obj[keys[n]]);
            }
            return key.join('|');
        }

        // 去重操作
        function uniqeByKeys(array, keys) {
            var arr = [];
            var hash = {};
            for (var i = 0, j = array.length; i < j; i++) {
                var k = obj2key(array[i], keys);
                if (!(k in hash)) {
                    hash[k] = true;
                    arr.push(array[i]);
                }
            }
            return arr;
        }

        // 求两点间的距离
        function getDis(s, t) {
            return Math.sqrt((s.cxy[0] - t.cxy[0]) * (s.cxy[0] - t.cxy[0])
                + (s.cxy[1] - t.cxy[1]) * (s.cxy[1] - t.cxy[1]));
        }

        // 求两点间的平移及旋转角度
        function getTransform(source, target, disFlag) {
            var r;
            if (target.cxy[0] > source.cxy[0]) {
                if (target.cxy[1] > source.cxy[1]) {
                    r = Math.asin((target.cxy[1] - source.cxy[1]) / disFlag);
                } else {
                    r = Math.asin((source.cxy[1] - target.cxy[1]) / disFlag);
                    r = -r;
                }

            } else {
                if (target.cxy[1] > source.cxy[1]) {
                    r = Math.asin((target.cxy[1] - source.cxy[1]) / disFlag);
                    r = Math.PI - r;
                } else {
                    r = Math.asin((source.cxy[1] - target.cxy[1]) / disFlag);
                    r -= Math.PI;
                }
            }
            r = r * (180 / Math.PI);
            return 'translate(' + source.cxy[0] + ',' + source.cxy[1] + ')rotate(' + r + ')';
        }

        //  生成静态svg图片的类
        //  id    {string}    图形生成在哪个
        //  config    {json Object}   配置对象
        function MakeSvgClass(id, config) {

            var defaultConfig = {
                nodes: [],
                links: [],
                svgWidth: window.innerWidth, // 画布的宽度
                nodeWidth: 120, // 每个node节点所占的宽度，正方形
                margin: 20, // node节点距离父亲div的margin
                r: 45, // 头像的半径
                strokeColor: '#ccf1fc', // 头像外围包裹的颜色
                strokeWidth: 5 // 头像外围包裹的颜色
            };
            $.extend(true, defaultConfig, config);



            // 画布的高度
            var svgHeight = defaultConfig.nodeWidth * (defaultConfig.nodes.length - 1);


            defaultConfig.nodes = defaultConfig.nodes.map(function (node, index) {
                if (index === 0) {
                    node.cxy = [defaultConfig.nodeWidth / 2 + defaultConfig.margin, parseInt(svgHeight, 10) / 2];
                } else {
                    // 每个点的坐标
                    var x = defaultConfig.svgWidth - defaultConfig.nodeWidth / 2 - defaultConfig.margin;
                    var y = index * defaultConfig.nodeWidth - defaultConfig.nodeWidth / 2;
                    node.cxy = [x, y];
                }

                return node;
            });


            this.SVG = d3.select('#' + id).append('svg:svg')
                .attr('width', defaultConfig.svgWidth)
                .attr('height', svgHeight);

            // 添加箭头
            this.SVG.append('svg:defs').selectAll('marker')
                .data(['end'])
                .enter().append('svg:marker')
                .attr('id', 'arrow')
                .attr('class', 'arrow')
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', defaultConfig.r + 20) // 箭头距离节点的x距离
                .attr('refY', 0)
                .attr('markerWidth', 9)
                .attr('markerHeight', 16)
                .attr('markerUnits', 'userSpaceOnUse')
                .attr('orient', 'auto')
                .append('svg:path')
                .attr('d', 'M0,-5L10,0L0,5')
                .attr('fill', '#666');


            // 添加一个容器g
            this.gAll = this.SVG.append('g').attr('svgWidth', 'all')
                .attr('width', defaultConfig.svgWidth)
                .attr('height', svgHeight);

            //  在<defs>标签内定义图案，<pattern>元素中的内容直到引用的时候才会显示。
            this.def = this.gAll.selectAll('defs.patternClass').data(defaultConfig.nodes);

            this.pattern = this.def.enter().append('svg:defs')
                .append('svg:pattern')
                .attr('class', 'patternClass')
                .attr('id', function (d, index) {
                    return 'avatar' + id + index;
                })
                // 两个取值userSpaceOnUse  objectBoundingBox
                .attr('patternUnits', 'objectBoundingBox')
                //  <pattern>，x、y值的改变决定图案的位置，宽度、高度默认为pattern图案占填充图形的百分比。
                .attr('x', '0')
                .attr('y', '0')
                .attr('width', '1')
                .attr('height', '1');

            // 头像
            this.pattern.append('svg:image')
                .attr('class', 'circle')
                .attr('xlink:href', function (d) {
                    return d.avatar; // 修改节点头像
                })
                .attr('height', defaultConfig.r * 2)
                .attr('width', defaultConfig.r * 2)
                .attr('preserveAspectRatio', 'xMidYMin slice');
            // 名字
            this.pattern.append('rect')
                .attr('x', '0')
                .attr('y', defaultConfig.r * 2 - 30)
                .attr('width', defaultConfig.r * 2)
                .attr('height', '30')
                .attr('fill', 'black')
                .attr('opacity', '0.5');
            this.pattern.append('text')
                .attr('class', 'nodetext')
                .style('linehight', 20)
                .attr('x', defaultConfig.r)
                .attr('y', defaultConfig.r * 2 - 10)
                .attr('text-anchor', 'middle')
                .attr('fill', '#fff')
                .text(function (d) {
                    return d.name;
                });

            // 绘制线
            // 创建连线
            var edgesG = this.gAll.selectAll('g.edges').data(defaultConfig.links)
                .enter().append('g').attr('class', 'edges');



            // 修改每条连线，添加备注
            edgesG.each(function (d) {

                d3.select(this).append('path').attr('class', 'links')
                    .attr('d',
                        'M' + defaultConfig.r + ',' + 0 + ' L' + getDis(defaultConfig.nodes[d.source],
                            defaultConfig.nodes[d.target]) + ',0')
                    .style('marker-end', 'url(#arrow)')
                    .attr('refX', defaultConfig.r + 20)
                    .attr('stroke', function () {
                        var str = '#bad4ed';
                        if (d.color) {
                            str = '#' + d.color;
                        }
                        return str;
                    });

                // 画矩形
                var rectG = d3.select(this).append('g').attr('class', 'rect_g');
                var textG = d3.select(this).append('g').attr('class', 'text_g');
                // 画文字
                var text = textG.append('text')
                    .attr('x', getDis(defaultConfig.nodes[d.source], defaultConfig.nodes[d.target]) / 2)
                    .attr('y', 0).attr('dy', '.3em').attr('text-anchor', 'middle').text(d.relation);

                var bbox = text.node().getBBox();

                rectG.append('rect').attr('x', bbox.x - 5)
                    .attr('y', bbox.y)
                    .attr('width', bbox.width + 10)
                    .attr('height', bbox.height)
                    .attr('fill', 'white')
                    .attr('stroke', function () {
                        var str = '#bad4ed';
                        if (d.color) {
                            str = '#' + d.color;
                        }
                        return str;
                    });

                edgesG.attr('transform', function (d) {
                    return getTransform(defaultConfig.nodes[d.source],
                        defaultConfig.nodes[d.target],
                        getDis(defaultConfig.nodes[d.source], defaultConfig.nodes[d.target]));
                });


            });

            // 文字旋转朝上
            d3.selectAll('g.edges').select('text').attr('transform', function (d) {
                if (defaultConfig.nodes[d.target].cxy[0] < defaultConfig.nodes[d.source].cxy[0]) {
                    var x = getDis(defaultConfig.nodes[d.source], defaultConfig.nodes[d.target]) / 2;
                    return 'rotate(180 ' + x + ' ' + 0 + ')';
                }
                return 'rotate(0)';
            });

            // 创建头像
            var circle = this.gAll
                .selectAll('circle').data(defaultConfig.nodes)
                .enter().append('circle')
                .attr('cx', function (d) {
                    return d.cxy[0];
                })
                .attr('cy', function (d) {
                    return d.cxy[1];
                })
                .attr('fill', function (d, index) {
                    return 'url(#avatar' + id + index + ')';
                })
                // .attr('fill', 'transparent')
                .attr('stroke', defaultConfig.strokeColor)
                .attr('stroke-width', defaultConfig.strokeWidth)
                .attr('r', defaultConfig.r)
                .on('click', function (d) {
                    if (d.link) {
                        window.location.href = d.link;
                    } else {
                        if (d.role_id) {
                            var url = $('.tv-oid').attr('data-oid');
                            window.location.href = 'https://mip.linkeddb.com/tv/'
                                + url + '/role/' + d.role_id + '/';
                        }
                    }
                });
        }

        //  业务逻辑
        var pageNum = 5;
        var pageIndex = 1;
        var pageTotal = 3;
        var allData = [];
        var nodesData = [];
        var linksData = [];

        //  初始化svg图谱
        //  @param id
        function initSVG(id) {
            $('body').find('#' + id).empty();
            if (nodesData.length <= (pageNum + 1)) {
                new MakeSvgClass(id, {
                    nodes: nodesData,
                    links: linksData,
                    svgWidth: $('#' + id).width()
                });
            } else {
                // 大于6个节点就要分批显示
                new MakeSvgClass(id, {
                    nodes: nodesData.slice(0, (pageNum * pageIndex + 1)),
                    links: linksData.slice(0, (pageNum * pageIndex)),
                    svgWidth: $('body').find('#' + id).width()
                });
                $('body').find('#' + id)
                    .append('<a href="###" class="showMoreData" data-container-id="' + id + '">查看更多关系</a>');
            }
        }

        //  获取关系数据，并初始化svg图谱
        //  @param id  父容器的id
        //  @param url   数据地址
        function initData(id, url, postData, sortField) {

            $.post(url, postData, function (data) {

                if (data.nodes.length < 1) {
                    return;
                }
                allData = data;

                nodesData = data.nodes;
                linksData = data.links;
                // 进行去重
                //  nodesData = uniqeByKeys(nodesData,['name']);
                // 进行去重
                linksData = uniqeByKeys(linksData, ['source', 'target']);
                // 线条排序
                linksData.sort(function (a, b) {
                    return (parseInt(a.target, 10)
                        + parseInt(a.source, 10)) - (parseInt(b.target, 10) + parseInt(b.source, 10));
                });

                // 初始化svg图谱
                initSVG(id);
            });
        }

        // 加载更多
        $('body').on('click', '.showMoreData', function () {
            var id = $(this).attr('data-container-id');
            $('body').find('#' + id).empty();
            new MakeSvgClass(id, {
                nodes: nodesData,
                links: linksData,
                svgWidth: $('body').find('#' + id).width()
            });
            $('body').find('#' + id)
                .append('<a href="###" class="hideMoreData" data-container-id="' + id + '">隐藏更多关系</a>');
        });

        // 隐藏更多
        $('body').on('click', '.hideMoreData', function () {
            var id = $(this).attr('data-container-id');
            $('body').find('#' + id).empty();
            initSVG(id);
        });

    };

    return customElement;
});
