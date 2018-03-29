# mip-cnkang-switch-display

mip-cnkang-switch-display 有来切换显示组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-cnkang-switch-display/mip-cnkang-switch-display.js


## 示例

### 基本用法
```html
<mip-cnkang-switch-display>
    <header>
        <div class="ylw_header_box">
            <div class="ylw_header">
                <span class="yl_logo"><a href="//m.youlai.cn/"><mip-img src="http://static.dev.cnkang.com/images/youlai/yl_logo_wap.png" alt=""></mip-img></a></span>
                <span class="yl_header_right icon_01"></span>
                <div class="searchBox">
                    <mip-form method="get" url="http://so.youlai.cn/cse/search">
                        <p>
                            <input  type="hidden" name="s" value="10239573868893973303">
                            <input type="hidden" name="entry" value="1">
                            <input class="shuru" type="text" placeholder="请输入医生姓名" class="text" name="q">
                            <input type="submit"  class="btn icon_01" >
                        </p>
                    </mip-form>
                </div>
             </div>
        </div>
    </header>
    <mip-fixed class="zhezhao"></mip-fixed>
    <mip-fixed class="siteMap">
        <div class="mapNav"><h3>导航</h3><span class="mapClick"><i></i></span></div>
        <div class="mapNavList clear">
            <a href="//m.youlai.cn/toutiao/" class="cur icon_03">有来头条</a>
            <a href="//m.youlai.cn/yyk/" class="icon_03">医院医生</a>
            <a href="//m.youlai.cn/dise/" class="icon_03">疾病百科</a>
            <a href="//m.youlai.cn/video/" class="icon_03">科普视频</a>
            <a href="//m.youlai.cn/kp/" class="icon_03">专家文章</a>
            <a href="//m.youlai.cn/ask/" class="icon_03">名医问答</a>
            <a href="//m.youlai.cn/super/" class="icon_03">签约医生</a>
            <a href="//m.youlai.cn/find/" class="icon_08">发现</a>
        </div>
    </mip-fixed>
    <div class="ylDocInfoBox2">
        <div class="doc_info2_one">
            <i class="icon_01"></i>
            <span class="stateDoc icon_01"></span>
            <h3>医生简历</h3>
            <div class="con conoverflow">
                <p>支修益，男，主任医师，教授现任首都医科大学肺癌诊疗中心主任兼宣武医院
                胸外科主任，首都医科大学肿瘤学系副主任兼肺癌学组组长和胸心血管外科学系胸外
                科学组组长。1978年考入首都医科大学医疗系，专门从事肺癌外科和多学科综合
                治疗近30年，完成各类肺癌手术5000余例，收拾来自全国各地和海内外肺癌患者20000余例
                。学术任职：北京医师协会副会长，北京医学会胸外科学会主任委员，中国医师协会胸外科医师分
                会常务副会长，中华医学会胸心血管外科学会常委兼肺癌学组组长，中国癌症基金会控
                烟与肺癌防治工作部主任，中国抗癌协会科普工作部部长，中国内镜医师协会胸外科专业
                委员会副主席，世界华人胸腔外科学会副会长，卫生部临床路径审核专家委员会委员兼胸
                外科专家组组长和卫生部《原发性肺癌诊疗规范》（2011年版）专家组组长，
                北京医学奖励基金会副理事长，任《肿瘤研究与临床》、《结核病与肺部疾病》《中国肺癌
                杂志》和《中国胸心血管外科临床杂志》等十余家核心期刊的副主编和常务编委。</p>
            </div>
        </div>
        <div class="doc_info2_one">
            <i class="icon_01"></i>
            <span class="stateDoc icon_01"></span>
            <h3>专家擅长</h3>
            <div class="con conoverflow">
                <p>肺癌早期诊断，早期和高龄肺癌微创外科手术，胸腔镜肺叶切除手术，CT引
                导下射频消融治疗肺癌和肺癌术后辅助化疗、辅助靶向治疗，晚期肺癌多学科综合治疗，肺内小结节
                的诊断及鉴别诊断以及基因监测指导下的肺癌个体化治疗。</p>
            </div>
        </div>
        <div class="doc_info2_one">
            <i class="icon_01"></i>
            <span class="stateDoc icon_01 stateUp"></span>
            <h3>出诊时间</h3>
            <div class="con">
                <p>出诊时间早知道，时刻掌握医生动态。</p>
                <div class="visitTime">
                    <div class="docVisitClick">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <th width:12.5%; class="td_1"></th>
                                    <th width:12.5%;>一</th>
                                    <th width:12.5%;>二</th>
                                    <th width:12.5%;>三</th>
                                    <th width:12.5%;>四</th>
                                    <th width:12.5%;>五</th>
                                    <th width:12.5%;>六</th>
                                    <th width:12.5%;>日</th>
                                </tr>
                                <tr>
                                    <td width:12.5%;="" class="td_1">上</td>                 
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                </tr>
                                <tr>
                                    <td class="td_1">下</td>                                
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                </tr>
                                <tr>
                                    <td class="td_1">夜</td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                    <td width:12.5%;=""></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="docVisitPrompt">
                        <p class="p1"><span>提醒：</span> 自本日起因故暂停门诊网上预约，可通过拨打
                        114、北京市统一挂号平台、京医通平台的预约挂号。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <mip-fixed class="visitTimeBigBox1">
        <div class="visitTimeBig">
            <h3 class="h_one">支修益医生的门诊时间</h3>
            <span class="docBigClose icon_02">关闭</span>
            <div class="visitTime docVisitBig">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <th width:9%;="" class="td_1"></th>
                            <th width:12.5%;="">一</th>
                            <th width:12.5%;="">二</th>
                            <th width:12.5%;="">三</th>
                            <th width:12.5%;="">四</th>
                            <th width:12.5%;="">五</th>
                            <th width:12.5%;="">六</th>
                            <th width:12.5%;="">日</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="docVisitPrompt">
                <p class="p1">
                    <span>出诊提示：</span>
                    自本日起因故暂停门诊网上预约，可通过拨打114、北京市统一挂号平台、京医通平台的预约挂号。
                </p>
            </div>
        </div>
    </mip-fixed>
</mip-cnkang-switch-display>
```

```style
        @charset "utf-8";
		body,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textarea,button,select{margin: 0;padding: 0; font-family: "Microsoft YaHei", Tahoma,Arial,sans-serif; font-weight:400;}
		html{font-size: 50px;}
		body{
			font-size: 24px;color: #222; background: #fff;
			-webkit-backface-visibility: hidden;
			-webkit-text-size-adjust: none;
			-moz-text-size-adjust:none;
			-ms-text-size-adjust: none;
			text-size-adjust: none;
		}
		div,ul,li,ol,dd,dl,dt,p,h1,h2,h3,h4,h5,h6,a,span,input,textarea,button,select,form{
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
		}
		ul,ol,dl,dt,dd,li{list-style: none;}
		em{font-style: normal;}
		a { color: #878787; text-decoration: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }
		a:hover { text-decoration: none; }
		table{border-collapse: collapse;}
		input,textarea,select{ border:none;resize: none;
		-webkit-appearance:none;outline:medium;-webkit-tap-highlight-color:rgba(0,0,0,0);}
		img{border: 0; width:100%; display:block;}
		
		/*设备分辨率调整*/
		@media screen and (min-width:320px){html{font-size:21.33px}}
		@media screen and (min-width:360px){html{font-size:24px}}
		@media screen and (min-width:375px){html{font-size:25px}}
		@media screen and (min-width:384px){html{font-size:25.6px}}
		@media screen and (min-width:400px){html{font-size:26.67px}}
		@media screen and (min-width:414px){html{font-size:27.6px}}
		@media screen and (min-width:424px){html{font-size:28.27px}}
		@media screen and (min-width:480px){html{font-size:32px}}
		@media screen and (min-width:540px){html{font-size:36px}}
		@media screen and (min-width:720px){html{font-size:48px}}
		@media screen and (min-width:750px){html{font-size:50px}}
		@media screen and (min-width:768px){html{font-size:51.2px}}
		.clear:after{clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
		.fl_left{ float: left;}
		.fl_right{ float:right;}
    	/* header */
		.ylw_header_box{ width:100%; background-color:#fff;}
		.ylw_header{ position: relative; width:100%; height:50px; padding-top: 8px;}
		.yl_logo{ position:absolute; top: 13px; left:10px; display:block; width:65px; height:24px;}
		.yl_header_right{ position:absolute; top: 15px; right:10px; width:22px; height:20px;}
		.searchBox{ width:235px; height:34px; padding-left:20px; margin:0 auto;}
		.searchBox mip-form{ display:block; width:100%;}
		.searchBox p{ position:relative; width:235px; height:34px; 
		background-color:#f5f5f5; border: 1px solid #e9e9e9; border-radius:34px;line-height: 23px;
         padding-left: 10px;}
		 .icon_01 {background-image: url(//static.youlai.cn/images/youlai/ylwap_icon_01.png);
		 background-size: 30px 500px; background-repeat: no-repeat;}
		.searchBox p input.text{ display:block; background:none; padding: 0 12px;
		 width:200px; height:32px; line-height:32px; font-size:15px; color:#222;}
		.searchBox p input.btn{ position:absolute; top:-1px; right:0;font-size: 0;
		width:35px; height:32px; background-color:initial; background-position:5px -48px;
		border-radius: 0px 34px 34px 0;}
		.searchBox p .shuru{border-radius: 34px 0 0 34px;background-color: #f5f5f5;margin-top: 4px;}
		.zhezhao{width: 100%;height: 100%;background-color: #333; top:0; z-index:100 !important;}
		/* 网站地图 */
		.maskBlack{ position:fixed; top:0; left:0; width:100%; height:100%; 
		background-color:rgba(0,0,0,0.8); z-index:10000; display:none;}
		.siteMap{ position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10001;display:none;}
		.siteMap .mapNav{ position: relative; padding-left: 35px; height: 50px; 
		border-bottom: 1px solid #ddd; background-color: #fff; }
		.siteMap .mapNav h3{ line-height: 50px; font-size: 20px; color: #222;}
		.siteMap .mapNav .mapClick{ position: absolute; top: 15px; right: 10px;}
		.siteMap .mapNav .mapClick i{ position: relative; display: block; width: 20px; height: 20px;}
		.siteMap .mapNav .mapClick i:after,.siteMap .mapNav .mapClick i:before{position: absolute; top: 8px; 
		left: -1px; content: ""; display: inline-block; width: 24px; height: 3px; background-color: #c7c7c7; }
		.siteMap .mapNav .mapClick i:after {transform: rotate(-45deg); -ms-transform: rotate(-45deg); 
		-webkit-transform: rotate(-45deg); -o-transform: rotate(-45deg); -moz-transform: rotate(-45deg); }
		.siteMap .mapNav .mapClick i:before {transform: rotate(45deg); -ms-transform: rotate(45deg); 
		-webkit-transform: rotate(45deg); -o-transform: rotate(45deg); -moz-transform: rotate(45deg); }
		.mapNavList { width: 185px; height: 100%; background-color: #f9f9f9;}
		.mapNavList a{ display: block; width: 100%; height: 44px; line-height: 44px; padding-left: 72px; 
		font-size: 17px; color: #3fb0c7;}
		.mapNavList a.cur{ background-color: #fff;}
		.mapNavList a:nth-child(2){ background-position: 35px -188px;}
		.mapNavList a:nth-child(3){ background-position: 35px -232px;}
		.mapNavList a:nth-child(4){ background-position: 35px -276px;}
		.mapNavList a:nth-child(5){ background-position: 35px -320px;}
		.mapNavList a:nth-child(6){ background-position: 35px -364px;}
		.mapNavList a:nth-child(7){ background-position: 35px -408px;}
		.mapNavList a:nth-child(1){ background-position: 35px -452px;}
		.mapNavList a:nth-child(8){ background-position: 34px 12px;}
		.ylDocInfoBox2{ padding: 18px 20px 0;}
		.ylDocInfoBox2 .doc_info2_one{ position:relative; padding-left:35px; margin-bottom:21px;}
		.ylDocInfoBox2 .doc_info2_one i{ display:block; width: 25px;height: 30px;  background-position:0 -400px;
		position: absolute;top: 0;left: 0;}
		.ylDocInfoBox2 .doc_info2_one:nth-child(2) i{background-position:0 -439px;}
		.ylDocInfoBox2 .doc_info2_one:nth-child(3) i{background-position:0 -466px;}
		.ylDocInfoBox2 .doc_info2_one .stateDoc{ position:absolute; top:0; right:0; 
		display:block; width: 22px;height: 22px;  background-position:0 -330px;}
		.ylDocInfoBox2 .doc_info2_one .stateDoc{
			-webkit-transition: 300ms;
			-moz-transition: 300ms;
			-o-transition: 300ms;
			transition: 300ms;
			-webkit-transform: rotate(0);
			-moz-transform: rotate(0);
			-ms-transform: rotate(0);
			-o-transform: rotate(0);
			transform: rotate(0);}
		.ylDocInfoBox2 .doc_info2_one span.stateUp {
			-webkit-transform: rotate(180deg);
			-moz-transform: rotate(180deg);
			-ms-transform: rotate(180deg);
			-o-transform: rotate(180deg);
			transform: rotate(180deg);
		}
		.ylDocInfoBox2 .doc_info2_one h3{ height:24px; font-size:16px; color:#000; font-weight:400;}
		.ylDocInfoBox2 .doc_info2_one .conoverflow{ height:20px; overflow:hidden;
		text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;}
		.ylDocInfoBox2 .doc_info2_one:nth-child(2) .conoverflow{ height:40px; -webkit-line-clamp: 2;}
		.ylDocInfoBox2 .doc_info2_one .con>p{ font-size:14px; color:#9c9c9c; 
		line-height:20px; margin-right: 10px;}
		
		/* 出诊时间表 */
		.visitTime{ position:relative; margin-top:6px; padding-right:35px;}
		.visitTime table{ border-top:1px solid #9adada; border-left:1px solid #9adada;}
		.docVisitClick{ cursor:pointer;}
		.visitTime th,.visitTime td{ border-right:1px solid #9adada; border-bottom:1px solid #9adada; 
		height:30px; text-align:center; font-size:14px; color:#fff; overflow:hidden;}
		.visitTime th,.visitTime td.td_1{ background:#9adada;}
		.visitTime th,.visitTime td strong{ font-weight:400;}
		.visitTime td{ width:87px; line-height:1.3;}
		.visitTime td.td_1{ width:75px; font-size: 13px;}
		.visitTime td strong{ font-size:14px; color:#ff8a00;width: 34px; display: block; 
		margin: 0 auto; line-height: 1.1;height: 16px; overflow: hidden;}
		.visitTime td span{ font-size:16px; color:#666;}
		.docVisitPrompt{ padding-top:9px; font-size:14px; line-height:20px;}
		.docVisitPrompt .p1{ font-size:14px; color:#222;}
		
		.visitTimeBigBox1{  top:10%; left:0; width:100%; z-index:10002; display:none;}
		.visitTimeBig{ position:relative; width:100%; background-color:#fff; overflow:hidden; 
		border-radius:5px; border-top:5px solid #66d6dd;}
		.visitTimeBig h3{ height:50px; background: #f4fafa; line-height:50px; font-size:21px; 
		color:#666; padding-left:12px; margin-bottom:15px;overflow: hidden; padding-right: 50px;}
		.visitTimeBig .docBigClose{ position:absolute; top:8px; right:8px; width:30px; height:30px; 
		text-indent:-99px; overflow:hidden; background-position:0 -470px;}
		.visitTimeBig .docVisitBig{ padding:0 10px;}
		.visitTimeBig th,.visitTimeBig td{ height:40px;}
		.visitTimeBig td strong{ font-size:11px; width:46px; line-height:1.4;}
		.visitTimeBig td span{ font-size:11px;}
		.visitTimeBig .docVisitPrompt{padding: 16px 10px 26px; font-size:14px;}
		.visitTimeBig .docVisitPrompt span{ color:#ff8a00;}
		@media screen and (min-width:320px) and (max-width:374px) {
			.visitTime{ padding-right:0;}
			.ylDocInfoBox2 .doc_info2_one .con>p{ margin-right:6px;}
		}
		.icon_02{ background-image: url(//static.youlai.cn/images/youlai/ylwap_icon_02.png);background-size: 30px 500px;background-repeat: no-repeat;}
```



