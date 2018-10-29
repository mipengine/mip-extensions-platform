/**
 * @file mip-yunshi datashuju
 * @author zuixingzuo
 */


define(function (require) {
    'use strict';

    var data = {
        baiyang: [
            {
                star: '3',
                description:
                    '出现一点小差错，也不要太慌张，心情放开怀一些，把错误改过来接下来才能恢复正常的步调。对情人...',
                url: '/yunshi/baiyang/'
            },
            {
                star: '5',
                description:
                    '邀几个好友一起去郊外野餐，良好的爱情运势易在这种场合显露出来哦！谁说纸上谈兵欠妥？今天的你...',
                url: '/yunshi/baiyang/mingri.html'
            },
            {
                star: '3',
                description:
                    '本周你常常扮演一位情绪失控者，幼稚的举动会让你的形象大打折扣。凡事尽量避免感情用事，以免和...',
                url: '/yunshi/baiyang/benzhou.html'
            },
            {
                star: '3',
                description:
                    '整个11月份里，白羊的守护星火星状态都很差，所以你要悠着点了，多替他人着想，顾及他人利益，...',
                url: '/yunshi/baiyang/benyue.html'
            },
            {
                star: '3',
                description:
                    '对白羊座来说，未来一年将是终于超越自我，找到实现梦想阶梯的一年。很多白羊座在过去一年一直被...',
                url: '/yunshi/baiyang/2017.html'
            }
        ],
        jinniu: [
            {
                star: '4',
                description:
                    '恋爱者今天受他人影响而情绪有所波动，平心静气才更彰显你的风度；工作上有机会接触同行的资历较...',
                url: '/yunshi/jinniu/'
            },
            {
                star: '4',
                description:
                    '工作的事情可以先放一边，会休息才能更好地工作。今天沉静下来后会想清楚很多事情，以往与朋友、...',
                url: '/yunshi/jinniu/mingri.html'
            },
            {
                star: '2',
                description:
                    '好运将被云雾所遮盖，你的光芒本周也无法被人发现，随之产生的最不利也是最为直接的影响便是人气...',
                url: '/yunshi/jinniu/benzhou.html'
            },
            {
                star: '3',
                description:
                    '上个月，牛牛度过了工作生活忙碌的时光，部分人在工作方面会接手不少琐碎零散的项目，却难以有明...',
                url: '/yunshi/jinniu/benyue.html'
            },
            {
                star: '4',
                description:
                    '对很多金牛座而言，这将是命运之轮向前推动，再也难以逃离改变，不如勇敢面对的一年。天王星已经...',
                url: '/yunshi/jinniu/2017.html'
            }
        ],
        shuangzi: [
            {
                star: '3',
                description:
                    '上班族在今天就别想要逞能独挑大梁，勉强地孤军奋斗只会让事情更糟糕，还是跟着团体行动比较安全...',
                url: '/yunshi/shuangzi/'
            },
            {
                star: '4',
                description:
                    '出门会有好运，窝在家里会错过许多机会。今天多参加集体活动可交到许多朋友，而且身心放松后会让...',
                url: '/yunshi/shuangzi/mingri.html'
            },
            {
                star: '3',
                description:
                    '不能按照自己完美的计划做事令你感到有些郁闷，但你又无法逃避那些突如其来的事情。被迫取消约会...',
                url: '/yunshi/shuangzi/benzhou.html'
            },
            {
                star: '3',
                description:
                    '你可能很少遇到这样的状况，机会已经眷顾你，道路也打开了，但是当你去做的时候，却发现之前你以...',
                url: '/yunshi/shuangzi/benyue.html'
            },
            {
                star: '4',
                description:
                    '对双子座来说，未来一年将是格局初定轮廓，勇敢表现自我的一年。土星已经在双子座的人际合作宫位...',
                url: '/yunshi/shuangzi/2017.html'
            }
        ],
        juxie: [
            {
                star: '2',
                description:
                    '今天你有点心神不定，工作提不起劲来，得尽快调整好心态。单身者与异性接触较少，需要积极向外活...',
                url: '/yunshi/juxie/'
            },
            {
                star: '4',
                description:
                    '易遇到能彼此欣赏的异性知己，虽未擦出爱情火花，但这种超越爱情存在的友谊更让你感动不已；与人...',
                url: '/yunshi/juxie/mingri.html'
            },
            {
                star: '4',
                description:
                    '整体运势还算乐观，爱情进展比较缓慢，可以在平淡中体会相处时的那份真实；事业发展空间大，但需...',
                url: '/yunshi/juxie/benzhou.html'
            },
            {
                star: '3',
                description:
                    '回首今年一年，你都经历了哪些颠覆？到了这个月，你依然要试错前行。随着本月的展开，你会发现很...',
                url: '/yunshi/juxie/benyue.html'
            },
            {
                star: '5',
                description:
                    '对大多数巨蟹座而言，未来一年将是厚积薄发，蓄力崛起的一年。过去几年，大多数巨蟹座都过着充满...',
                url: '/yunshi/juxie/2017.html'
            }
        ],
        shizi: [
            {
                star: '2',
                description:
                    '今天还沉浸在玩乐当中，难以收心投入工作，若不能及时调整情绪，工作将会频频出错，给上司留下不...',
                url: '/yunshi/shizi/'
            },
            {
                star: '4',
                description:
                    '今天与人群接触可为你带来好运。容易看到他人身上的优点，与朋友相处愉快，而且，你很想见到的人...',
                url: '/yunshi/shizi/mingri.html'
            },
            {
                star: '1',
                description:
                    '本周让你感到阴魂不散的不是衰神，而是冲动这个魔鬼。偶然的不顺很快就会过去；而冲动会让你总是...',
                url: '/yunshi/shizi/benzhou.html'
            },
            {
                star: '4',
                description:
                    '从上个月开始，你就更加关注自己的个人、家庭生活了，事业上反而没出多少力。幸亏，你周围的同事...',
                url: '/yunshi/shizi/benyue.html'
            },
            {
                star: '3',
                description:
                    '对大多数狮子座而言，未来一年将是梦想成真，终于扬眉吐气自由放飞的一年。过去两年，很多狮子座...',
                url: '/yunshi/shizi/2017.html'
            }
        ],
        chunv: [
            {
                star: '5',
                description:
                    '另一半时髦的打扮，让你有眼前一亮的感觉，让你不由自主地重新审阅对方。有机会参加朋友的Par...',
                url: '/yunshi/chunv/'
            },
            {
                star: '4',
                description:
                    '积极向上的生活态度，让你赢得家人及朋友的肯定。有机会在众人面前展现才华，让异性对你刮目相看...',
                url: '/yunshi/chunv/mingri.html'
            },
            {
                star: '2',
                description:
                    '坑爹的事情时有发生，只是本周事发频率比较高。不靠谱的人往往是带给你那些麻烦事的主要原因，做...',
                url: '/yunshi/chunv/benzhou.html'
            },
            {
                star: '3',
                description:
                    '11月的来临也标志着今年将要进入尾声。月初，处处在工作方面能够展现出自己真实能力和才干，一...',
                url: '/yunshi/chunv/benyue.html'
            },
            {
                star: '4',
                description:
                    '对很多处女座来说，这将是表面平淡，其实却收获颇丰的一年。过去一年，木星在你们的命宫徘徊，也...',
                url: '/yunshi/chunv/2017.html'
            }
        ],
        tiancheng: [
            {
                star: '4',
                description:
                    '心情好坏对方一看便知，别把心事藏在心里，说出来问题才更好解决；与合作伙伴配合再紧密些，财运...',
                url: '/yunshi/tiancheng/'
            },
            {
                star: '4',
                description:
                    '感情平淡无奇，可适当的减少两人在一起的时间，给对方一点空间，过度干预对方，容易引起对方的不...',
                url: '/yunshi/tiancheng/mingri.html'
            },
            {
                star: '4',
                description:
                    '整体运势良好，暧昧恋情将渐渐褪去它朦胧的纱巾，转变成正式的恋爱关系；事业方面，工作中方法得...',
                url: '/yunshi/tiancheng/benzhou.html'
            },
            {
                star: '3',
                description:
                    '有大佬欣赏你，秤子在本月初甚至有可能提升地位，到达一个你一直期待的位置上。可是随之而来的复...',
                url: '/yunshi/tiancheng/benyue.html'
            },
            {
                star: '5',
                description:
                    '对天秤座来说，未来一年将是需要把握机会，尝试从小做起，颠覆过往的一年。从2010年开始，很...',
                url: '/yunshi/tiancheng/2017.html'
            }
        ],
        tianxie: [
            {
                star: '3',
                description:
                    '相信一见钟情的人今天特别得异性欢心，桃花大有开放之势。财运欠佳，必要时不妨为自己找个军师。...',
                url: '/yunshi/tianxie/'
            },
            {
                star: '5',
                description:
                    '情绪极佳，能尽享亲友间交流与共处之无穷乐趣；今天你似乎如一座财物丰富的“宝藏”，让情人不时...',
                url: '/yunshi/tianxie/mingri.html'
            },
            {
                star: '3',
                description:
                    '心血来潮的想法总是会操控着你的行动，让你以不计后果的方式做出令自己得不到好处的事情。倘若是...',
                url: '/yunshi/tianxie/benzhou.html'
            },
            {
                star: '4',
                description:
                    '现在还是天蝎月，祝这个月生日的蝎子们生日快乐~4号前后，满月降临，与天蝎息息相关，特别是4...',
                url: '/yunshi/tianxie/benyue.html'
            },
            {
                star: '5',
                description:
                    '对天蝎座来说，未来一年将是需要坚定心智，耐心等待，才能最终化茧成蝶的一年。木星会在天秤座呆...',
                url: '/yunshi/tianxie/2017.html'
            }
        ],
        sheshou: [
            {
                star: '2',
                description:
                    '感情上会有一些小摩擦，让你难以开怀，应把心思从感情上移开。工作上受到外界因素影响有点分心，...',
                url: '/yunshi/sheshou/'
            },
            {
                star: '4',
                description:
                    '单身者会有种不是冤家不聚头的感觉，不论本人是男是女，女孩的泪水都会成为单身者获得爱情的催化...',
                url: '/yunshi/sheshou/mingri.html'
            },
            {
                star: '2',
                description:
                    '本周你会有不少新颖的想法，但还无法构成创意。还不够成熟的想法此时说出来，别人只会把它当成玩...',
                url: '/yunshi/sheshou/benzhou.html'
            },
            {
                star: '3',
                description:
                    '这个月中上旬时候，最好还是低调一些。这次的满月是在月初4号，会涉及到工作、家庭、健康等方面...',
                url: '/yunshi/sheshou/benyue.html'
            },
            {
                star: '3',
                description:
                    '对大多数射手座而言，未来一年将是在痛苦历练之后终于学会取舍，压力之下重塑人生的一年。过去两...',
                url: '/yunshi/sheshou/2017.html'
            }
        ],
        mojie: [
            {
                star: '1',
                description:
                    '今天很喜欢独处，享受独自承受自己的喜悦忧愁，但时间一长也会有空虚的感觉，找他分享吧，快乐会...',
                url: '/yunshi/mojie/'
            },
            {
                star: '3',
                description:
                    '周旋于两个异性之间的你在最终与谁确立正式关系的问题上摇摆不定，对于你举棋不定的态度让他们感...',
                url: '/yunshi/mojie/mingri.html'
            },
            {
                star: '4',
                description:
                    '孤单的情歌不会成为你的主题曲，甜蜜才是你本周的主旋律；事业上的障碍还得花时间慢慢清除；投资...',
                url: '/yunshi/mojie/benzhou.html'
            },
            {
                star: '4',
                description:
                    '相比10月，这个月摩羯在事业工作方面会更加忙碌。月初，你可能会接手一些琐碎繁杂的项目和任务...',
                url: '/yunshi/mojie/benyue.html'
            },
            {
                star: '2',
                description:
                    '对大多数摩羯座而言，未来一年将是数年隐忍之后，终究修成神功的一年。在明年，摩羯座的命主星土...',
                url: '/yunshi/mojie/2017.html'
            }
        ],
        shuiping: [
            {
                star: '3',
                description:
                    '和另一半相处平淡，不会有什么矛盾产生，一些平时的小事都能在双方的沟通中得以化解。对投资方面...',
                url: '/yunshi/shuiping/'
            },
            {
                star: '5',
                description:
                    '单身者今天不妨约心仪对象出去走走，能增进彼此的了解，还有机会博得心仪对象的好感；找一个场地...',
                url: '/yunshi/shuiping/mingri.html'
            },
            {
                star: '5',
                description:
                    '好运在唱歌的一周，专守为攻的爱情模式在这段时间对你会更有助益；工作学习激情高扬，易有收获；...',
                url: '/yunshi/shuiping/benzhou.html'
            },
            {
                star: '3',
                description:
                    '未来已经打开，本月初，水瓶们能够抓住了属于你最重要的上升机会。你有满满的干劲，有很多想法。...',
                url: '/yunshi/shuiping/benyue.html'
            },
            {
                star: '4',
                description:
                    '对大多数水瓶座而言，未来一年是不缺风光，却需要自己放平心态，为未来做出选择的一年。命主星土...',
                url: '/yunshi/shuiping/2017.html'
            }
        ],
        shuangyu: [
            {
                star: '4',
                description:
                    '人际关系不错，通过与他人交流，建立广阔的人脉；工作上也有遇到最佳拍档的机会，有问题就开口请...',
                url: '/yunshi/shuangyu/'
            },
            {
                star: '3',
                description:
                    '爱情起伏不断，徘徊在对方的好与坏之间，难以抉择。赚钱的欲望不强，可以安排时间休闲，以此积聚...',
                url: '/yunshi/shuangyu/mingri.html'
            },
            {
                star: '3',
                description:
                    '这周是你实施计划的关键时刻，一切行动按照以前制定的方案抓紧进行，有利于快速推动事情的发展，...',
                url: '/yunshi/shuangyu/benzhou.html'
            },
            {
                star: '3',
                description:
                    '这个月，你应该多去学习、探索，增长见闻，拓宽眼界。而这些对你的事业非常有帮助。对于学生而言...',
                url: '/yunshi/shuangyu/benyue.html'
            },
            {
                star: '4',
                description:
                    '对大多数双鱼座而言，未来一年将是忙碌却充实，磕磕碰碰中触碰天际的一年。土星在双鱼座的事业宫...',
                url: '/yunshi/shuangyu/2017.html'
            }
        ]
    };

    return data;
});
