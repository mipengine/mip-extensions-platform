/**
 * @file mip-zol-echart 组件
 * @author
 */

define(function (require) {
    'use strict';

    // 获取图表公用JS
    var echarts = require('./echarts.min');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var chartType = element.getAttribute('type');
        var chartVal = element.getAttribute('data-val');
        var maxFlage = true;
        var count = 0;

        // console.log(chartVal);

        // 获取图表容器元素
        var myChart = echarts.init(element.querySelector('.chart-con'));

        // console.log(element.getAttribute('type'));
        if (chartType === 'radar') {
            // 雷达图参数定义
            var data = [
                {
                    text: '外观',
                    max: 10
                },
                {
                    text: '屏幕',
                    max: 10
                },
                {
                    text: '性能',
                    max: 10
                },
                {
                    text: '续航',
                    max: 10
                },
                {
                    text: '拍照',
                    max: 10
                }
            ];
            var dataVal = chartVal.split(',');

            for (var i = 0; i < dataVal.length; i++) {
                data[i].num = dataVal[i];
            }

            // 指定图表的配置项和数据
            var option = {
                grid: {
                    left: '3%',
                    right: '9%',
                    top: '10%',
                    containLabel: true
                },
                radar: [{
                    nameGap: 5,
                    center: ['50%', '57%'],
                    radius: '75%',
                    splitArea: {
                        areaStyle: {
                            color: ['#fff', '#fff', '#fff', '#fff']
                        }
                    },
                    indicator: data,
                    name: {
                        formatter: function (value, indicator) {
                            var npercent = indicator.num;
                            var maxNum = dataVal[0];
                            var maxNumIndex = 0;
                            var minNumIndex = [];
                            var minNum = dataVal[0];
                            count ++;

                            // console.log(count);
                            // console.log(indicator);
                            // console.log(value);
                            for (var i = 0; i < dataVal.length; i++) {
                                if (maxNum <= dataVal[i]) {
                                    maxNum = dataVal[i];
                                };
                                if (minNum > dataVal[i]) {
                                    minNum = dataVal[i];
                                };
                            }

                            if (maxNum === dataVal[2]) {
                                maxNumIndex = 2;
                            } else if (maxNum === dataVal[3]) {
                                maxNumIndex = 3;
                            } else if (maxNum === dataVal[4]) {
                                maxNumIndex = 4;
                            } else if (maxNum === dataVal[0]) {
                                maxNumIndex = 0;
                            } else if (maxNum === dataVal[1]) {
                                maxNumIndex = 1;
                            }

                            if (minNum === dataVal[1]) {
                                minNumIndex = 1;
                            } else if (minNum === dataVal[0]) {
                                minNumIndex = 0;
                            } else if (minNum === dataVal[4]) {
                                minNumIndex = 4;
                            } else if (minNum === dataVal[3]) {
                                minNumIndex = 3;
                            } else if (minNum === dataVal[2]) {
                                minNumIndex = 2;
                            }

                            // console.log(maxNumIndex);
                            // console.log(npercent);
                            // 判断最大值最小值放置位置
                            if (maxNum === npercent) {
                                if (maxNumIndex === (count - 1)) {
                                    if (maxNumIndex > 2 || maxNumIndex === 0) {
                                        return ' {a|' + value + '} {c|最优} {g|\n' + npercent + '} ';
                                    } else {
                                        return ' {c|最优} {a|' + value + '} {e|\n' + npercent + '} ';
                                    }
                                } else {
                                    return '{a|' + value + '} {e|\n' + npercent + '} ';
                                }
                            } else if (minNum === npercent) {
                                if (minNumIndex === (count - 1)) {
                                    if (minNumIndex > 2 || minNumIndex === 0) {
                                        return ' {a|' + value + '} {d|有点菜} {f|\n' + npercent + '} ';
                                    } else {
                                        return ' {d|有点菜} {a|' + value + '} {h|\n' + npercent + '} ';
                                    }
                                } else {
                                    return '{a|' + value + '} {e|\n' + npercent + '} ';
                                }
                            } else {
                                return ' {a|' + value + '} {b|\n' + npercent + '} ';
                            }
                        },
                        rich: {
                            a: {
                                color: '#555',
                                fontSize: 14,
                                fontFamily: 'PingFangSC-Regular',
                                lineHeight: 19
                            },
                            b: {
                                fontSize: 14,
                                color: '#3388FF',
                                align: 'center',
                                fontFamily: 'PingFangSC-Regular',
                                lineHeight: 19
                            },
                            c: {
                                fontSize: 10,
                                color: '#65B12C',
                                align: 'center',
                                fontFamily: 'PingFangSC-Regular',
                                lineHeight: 10,
                                borderWidth: 1,
                                borderColor: '#65B12C',
                                borderRadius: 2,
                                verticalAlign: 'middle',
                                align: 'center',
                                padding: [2, 2, 2, 2]
                            },
                            d: {
                                fontSize: 10,
                                color: '#999999',
                                align: 'center',
                                borderColor: '#999999',
                                borderWidth: 1,
                                fontFamily: 'PingFangSC-Regular',
                                lineHeight: 10,
                                borderRadius: 2,
                                verticalAlign: 'middle',
                                align: 'center',
                                padding: [2, 2, 2, 2]
                            },
                            e: {
                                fontSize: 14,
                                color: '#3388FF',
                                align: 'center',
                                fontFamily: 'PingFangSC-Regular',
                                lineHeight: 19,
                                padding: [0, 0, 0, 30]
                            },
                            g: {
                                fontSize: 14,
                                color: '#3388FF',
                                align: 'center',
                                fontFamily: 'PingFangSC-Regular',
                                lineHeight: 19,
                                padding: [0, 30, 0, 0]
                            },
                            f: {
                                fontSize: 14,
                                color: '#3388FF',
                                align: 'center',
                                fontFamily: 'PingFangSC-Regular',
                                lineHeight: 19,
                                padding: [0, 45, 0, 0]
                            },
                            h: {
                                fontSize: 14,
                                color: '#3388FF',
                                align: 'center',
                                fontFamily: 'PingFangSC-Regular',
                                lineHeight: 19,
                                padding: [0, 0, 0, 45]
                            }
                        },
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }],
                series: [{
                    name: '',
                    type: 'radar',
                    radius: 85,
                    lineStyle: {
                        width: 0
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.7,
                            color: new echarts.graphic.RadialGradient(0, 0, 1, [
                                {
                                    color: '#71F6A1',
                                    offset: 0
                                },
                                {
                                    color: '#0791FB',
                                    offset: 1
                                }
                            ])
                        }
                    },
                    data: [{
                        value: dataVal,
                        symbolSize: 0,
                        label: {
                            show: false
                        }
                    }]
                }]
            };
        } else if (chartType === 'line') {

            // 折线图参数定义
            var data = [
                {
                    name: '拍照',
                    text: '30min'
                },
                {
                    name: '视频',
                    text: '60min'
                },
                {
                    name: '社交',
                    text: '30min'
                },
                {
                    name: '通讯',
                    text: '30min'
                },
                {
                    name: '网页',
                    text: '30min'
                },
                {
                    name: '游戏',
                    text: '30min'
                },
                {
                    name: '音乐',
                    text: '30min'
                },
                {
                    name: '电子书',
                    text: '30min'
                }
            ];
            var dataVal = chartVal.split(',');
            var option = {
                grid: {
                    left: '12.5%',
                    right: '9%',
                    top: '10%'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: false,
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    data: data,
                    axisLabel: {
                        interval: 0,
                        color: '#555',
                        margin: 12,
                        formatter: function (a, b) {

                            // console.log(a);
                            return '{a|' + data[b].name + '}{b|\n' + data[b].text + '}';
                        },
                        rich: {
                            a: {
                                color: '#555',
                                lineHeight: 20
                            },
                            b: {
                                color: '#999999'
                            }
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: false,
                    minInterval: 25,
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: false,
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    axisLabel: {
                        color: '#555',
                        margin: 8,
                        fontSize: 14,
                        padding: [0, 0, 10, 0]
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee'
                        }
                    }
                },
                series: [{
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 8,
                    label: {
                        show: true,
                        color: '#3388FF',
                        padding: [0, 0, 3, 15],
                        formatter: '{@score}%'
                    },
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#0791FB'

                                    // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#71F6A1'

                                    // 100% 处的颜色
                                }
                            ],
                            globalCoord: false

                            // 缺省为 false
                        }
                    },
                    lineStyle: {
                        color: '#73D9ED',
                        width: 3
                    },
                    markLine: {
                        lineStyle: {
                            color: '#eee',
                            width: 3
                        }
                    },
                    data: dataVal
                }]
            };
        }
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        });
    };

    return customElement;
});
