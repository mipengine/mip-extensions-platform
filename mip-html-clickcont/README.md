# mip-html-clickcont

mip-html-clickcont 获取li数量添加数字

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-html-number/mip-html-clickcont.js

## 示例

### 基本用法
```html
<style mip-custom>
.f-btns{position: fixed;z-index:999;bottom: 0;height: 60px;width: 100%;border-top: 1px solid #ddd;background: #f2f2f2; text-align: center;}
.f-btns span{display: inline-block;text-align: center;height: 37px;line-height: 37px;margin: 11px auto 0 auto;background: #19b5fe;border-radius: 4px;font-size: 15px;color: #fff;padding: 0px 18px;}
.f-btns span em{display: inline-block; font-style: normal;float: left;}
.f-btns span i{display: inline-block;width: 20px;height: 20px;margin-left: 5px;background: url(../images/wx-ico.png) no-repeat;background-size: 20px;float: left;margin-top: 7.5px;}
.g-fix-cont{ display: none;position: relative;transform:none !important;}
.g-fix-contbg{position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,.8);top: 0px;left: 0px; z-index: 99;}
.g-bd-box{background: #fff;position: fixed;bottom: 0;z-index: 100;max-width: 750px;height: 320px;margin: 0 auto;text-align: center;width: 100%; z-index: 99999;}
.rktit {height: 55px;}
.rklogo {display: inline-block;width: 30px;height: 30px;position: relative;top: 12px;left: 18px;float: left;}
.rkbt {color: #222;font-size: 15px;position: relative;left: 26px;float: left;line-height: 55px;}
.rkclose {display: inline-block;width: 55px;height: 55px;background-image: url(../images/close.png);background-size: 20px;position: relative;float: right;background-repeat: no-repeat;background-position: center;cursor: pointer;}
#rkewm, .rkewm {height: 185px;color: #999;}
#rkewm img, .rkewm img {width: 160px;height: 160px;display: block;margin: 0 auto 5px auto; }
#rkewm em, .rkewm em {font-size: 14px;display: block;width: 170px;height: 22px;line-height: 22px;padding-left: 20px;background: url(../images/xcxicon.png) 2px 4px no-repeat;margin: 0 auto 6px;position: relative;left: -10px;font-style: normal; color: #999}
#rkewm i, .rkewm i {font-size: 14px;font-style: normal; display:block;}
#rkewm span{ display:block; font-weight: bold; color: red; margin-top: 10px;font-size: 14px;}
.rktip {margin-top: 37px;}
.cnameBtn {font-size: 14px;background: #19b5fe;border-radius: 5px;color: #fff;line-height: 35px;margin: 0 auto;border: 0px;padding: 0px 12px;width: 140px;}
#g-xcx-name{ display: none; }
.g-padding{ padding-top:60px; overflow: hidden;  }
#errormsg{display: none;position: fixed;z-index: 9999;background: rgba(0,0,0,0.8);width: 90px;height: 90px;top: 50%;left: 50%;border-radius: 14px;margin: -40px 0px 0px -40px;color: #fff;font-size: 14px;}
#errormsg i{ display: inline-block;background: url(../images/success.png) no-repeat; width: 35px;height: 35px; background-size: 35px;margin-top: 16px;  }
#rkewm, .rkewm {height: 185px;color: #999;}
#rkewm img, .rkewm img {width: 160px;height: 160px;display: block;margin: 0 auto 5px auto; }
#rkewm em, .rkewm em {font-size: 14px;display: block;width: 148px;height: 22px;line-height: 22px;padding-left: 20px;background: url(../images/xcxicon.png) 2px 4px no-repeat;margin: 0 auto 6px;position: relative;left: -10px;font-style: normal; color: #999}
#rkewm i, .rkewm i {font-size: 12px;font-style: normal;}
.rktip {margin-top: 37px;}
.cnameBtn {font-size: 14px;background: #19b5fe;border-radius: 5px;color: #fff;line-height: 35px;margin: 0 auto;border: 0px;padding: 0px 12px;width: 140px;}
#g-xcx-name{ display: none; }
#rkewm img, .rkewm img {
    width: 160px;
    height: 160px;
    display: block;
    margin: 0 auto 5px auto;
}
</style>


<mip-html-clickcont>
<section class="f-btns"><span><em>爱奇艺视频入口</em><i></i></span></section>
<section class="g-fix-cont" >
    <div class="g-fix-contbg"></div>
    <div class="g-bd-box">
        <p class="rktit">
            <mip-img class="rklogo" src="https://pic.qqtn.com/up/2017-2/2017281142482957.png" alt=""></mip-img>
            <span class="rkbt">爱奇艺视频</span>
            <span class="rkclose"></span>
        </p>
        <p id="rkewm" class="rkewm">
            <mip-img src="https://pic.qqtn.com/up/2017-2/2017291520575068.png" width=160 height=160 alt=""></mip-img>
            <em>长按识别小程序码打开</em>
            <i>如无法识别，请复制下方小程序名称搜索</i>
            <span>爱奇艺视频</span>
        </p>
    </div>
</section>
</mip-html-clickcont>