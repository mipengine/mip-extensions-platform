# mip-otto-scrollnews

mip-otto-scrollnews 网校新闻滚动组件

| 标题     | 内容                                                        |
| -------- | ----------------------------------------------------------- |
| 类型     | 通用                                                        |
| 支持布局 | responsive,fixed-height,fill,container,fixed                |
| 所需脚本 | https://c.mipcdn.com/static/v1/mip-otto-scrollnews/mip-otto-scrollnews.js |

## 示例

### 基本用法

```html
<mip-otto-scrollnews>
    <div class="scrollNews">
        <div class="scrollNews__head">
            <span id="newsType--1" class="scrollNews__type scrollNews__type--hover">最近更新</span>
            <span id="newsType--2" class="scrollNews__type">动态</span>
            <span id="newsType--3" class="scrollNews__type">试题</span>
            <span id="newsType--4" class="scrollNews__type">真题</span>
            <span id="newsType--5" class="scrollNews__type">大纲</span>
        </div>
        <div class="scrollNews__box">
            <div class="scrollNews__wrap">
                <ul id="newsCon--1">
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">1新！2018一建各科教材目录变动详情汇总目录变化对比变化如下</p>
                            <p>
                                <span class="scrollNews__class">考试大纲</span>
                                <span class="scrollNews__date">2018-05-16</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">1新！2018一建各科教材目录变动详情汇总目录变化对比变化如下</p>
                            <p>
                                <span class="scrollNews__class">考试大纲</span>
                                <span class="scrollNews__date">2018-05-16</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">1新！2018一建各科教材目录变动详情汇总目录变化对比变化如下</p>
                            <p>
                                <span class="scrollNews__class">考试大纲</span>
                                <span class="scrollNews__date">2018-05-16</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">1新！2018一建各科教材目录变动详情汇总目录变化对比变化如下</p>
                            <p>
                                <span class="scrollNews__class">考试大纲</span>
                                <span class="scrollNews__date">2018-05-16</span>
                            </p>
                        </a>
                    </li>
                </ul>
                <!-- 考试动态 -->
                <ul id="newsCon--2">
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">2怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">2怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">2怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">2怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                </ul>
                <!-- 考试试题 -->
                <ul id="newsCon--3">
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">3怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">3怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">3怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">3怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                </ul>
                <!-- 历年真题 -->
                <ul id="newsCon--4">
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">4怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">4怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">4怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">4怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">4怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">4怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">4怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">4怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                </ul>
                <!-- 考试大纲 -->
                <ul id="newsCon--5">
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">5怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">5怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">5怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">5怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">5怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">5怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">5怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                    <li class="scrollNews__item">
                        <a href="/n/d/2172072936958.html">
                            <p class="scrollNews__title">5怀化2017一级建造师相应专业资格考试合格证书发放通知</p>
                            <p>
                                <span class="scrollNews__class">考试动态</span>
                                <span class="scrollNews__date"> 18-7-30</span>
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</mip-otto-scrollnews>
```

## 注意事项

1. 网校定制。
