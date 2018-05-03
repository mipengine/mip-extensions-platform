# mip-jia-tab-ajax

tab切换及ajax请求内容

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-tab-ajax/mip-jia-tab-ajax.js

## 示例

### 基本用法
```html
<div class="tag_list">
    <mip-jia-tab-ajax tab-element=".ideas_res" tab-current="cur" tab-contain=".img_show_list" tab-con-show="show" tab-con-hide="hide" tab-url="//test.m.jia.com/index/getTukuByTag" tab-template="1" tab-items="" swiper-params='{"slidesPerView": 2.5,"spaceBetween": 10}'>
        <div templateparent id="template_img_show_list">
            <template type="mip-mustache">
                <ul class="swiper-wrapper">
                    {{#default}}
                    <li class="swiper-slide">
                        <a href="/tuku/tag/list1-{{id}}/">
                            <mip-img layout="responsive" width="210" height="250" src="{{img}}"></mip-img>
                            <p>{{key}}</p><span><em>{{total}}</em>0套</span>
                        </a>
                    </li>
                    {{/default}}
                </ul>
            </template>
        </div>
        <ul>
            <li class="ideas_res cur" data-tuku_tag="fengge" trigger-click>风格</li>
            <li class="ideas_res" data-tuku_tag="huxing">户型</li>
            <li class="ideas_res" data-tuku_tag="kongjian">空间</li>
            <li class="ideas_res" data-tuku_tag="jubu">局部</li>
        </ul>
    </mip-jia-tab-ajax>
</div>
<div class="img_show_list fengge_part show loading"></div>
<div class="img_show_list huxing_part hide"></div>
<div class="img_show_list kongjian_part hide"></div>
<div class="img_show_list jubu_part hide"></div>
```

## 属性

### {tab-element}

说明：{点击元素class}
必选项：{是}
类型：{string}

### {tab-current}

说明：{当前元素class}
必选项：{否}
类型：{string}
默认值: {cur}

### {tab-contain}

说明：{切换元素class}
必选项：{是}
类型：{string}

### {tab-con-show}

说明：{当前切换元素class}
必选项：{否}
类型：{string}
默认值: {show}

### {tab-con-hide}

说明：{其他切换元素class}
必选项：{否}
类型：{string}
默认值: {hide}

### {tab-url}

说明：{请求url}
必选项：{否}
类型：{string}

### {tab-template}

说明：{模板类型}
必选项：{是}
类型：{string}
取值范围: {0|1|2}

### {tab-items}

说明：{接口参数}
必选项：{否}
类型：{string}

### {swiper-params}

说明：{swiper参数}
必选项：{否}
类型：{json}


## 注意事项
1: 只有一个容器,则请求ajax、容器替换html;
   存在将数据分别放入多个内容容器,tab-contain = 'jc_company_list,jc_ticket_list'
   这种情况对应swiper-params写法为 swiper-params = '[{"slidesPerView": 2.5,"spaceBetween": 10},{"slidesPerView": 2.5,"spaceBetween": 10}]',如果params的length为1,则所有容器按照第一个参数集来定义swiper
2: 多个容器,则多个容器切换class,并替换html;
3: 切换class（目标元素及容器元素）,目标元素有指定class,则不请求数据;
4: 页面第一次如果有选中元素,则直接请求数据;
5: 请求数据参数标识,以'data-'开头属性为参数,写在目标元素上;
6: 组件元素参数: tab-element(tab切换元素class),tab-current(选中状态class),tab-contain(内容容器class),tab-con-show(当前内容容器class),tab-con-hide(其他内容容器class),tab-url(请求url),如果没有url则只做切换;
7: 通过template模板渲染数据;多个模板的时候,template模板id为tab-contain的值加上前缀'template_',单个的时候默认为组件内的template模板;
   请求数据参数为template元素的data-items属性,如没有则直接为返回的reponse,没有模板时使用组件参数tab-items;
   templateFlag:0-不需要模板渲染,接口直接返回html,必须要tab-items参数配合;1-共用同一个模板;2-分别用多个模板渲染
8: 兼容swiper动画,如果有动画,则更新,如果没有动画,则new swiper,swiper参数以swiper-params为属性key,以json字符串为value
   如: swiper-params = '{"slidesPerView": 2.5,"spaceBetween": 10}'
       swiper-params = '[{"slidesPerView": 2.5,"spaceBetween": 10},{"slidesPerView": 2.5,"spaceBetween": 10}]'
   默认给接收请求数据的容器添加swiper动画,如果有swiper-contain参数,则给此参数的值添加swiper
   注：swiper效果需引入<mip-jia-swiper>组件