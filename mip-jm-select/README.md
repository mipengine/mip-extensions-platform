# mip-jm-select

mip-jm-select 组件说明
此组件用于页面中3步轻松实现加盟；当选择好所要加盟的分类，点击查看后，进入第二个步奏弹框，并把值放入对应的类目中。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jm-select/mip-jm-select.js

## 示例

### 基本用法
```html
<mip-jm-select>
	<div class="dialog_relaxed">
		<div class="relaxed_content">
			<mip-img class="relaxed_banner" src="__MOBILE__/img/relaxed_banner.jpg" alt=""></mip-img>
			<div class="relaxed_text relaxed_text1">
				<div class="relaxed_step relaxed_step1">
					<mip-img class="step" src="__MOBILE__/img/step1.png" alt=""></mip-img>
					<div class="relaxed_step_option">
						<div class="for-select">
							<mip-img class="turn_down" src="__MOBILE__/img/turn_down.png" alt=""></mip-img>
							<p class="select-text">请选择加盟行业</p>
							<div class="for-option">
								<p class="select-red">请选择加盟行业
									<mip-img class="turn_up" src="__MOBILE__/img/turn_up.png" alt=""></mip-img>
								</p>
								<ul>
									<li class="L_display">请选择</li>
									<volist name="allCateList" id="val">
										<li data-id="{$val.id}">{$val.name|subtext=8}</li>
									</volist>
									<!--<li>招商综合</li>-->
								</ul>
							</div>
						</div>
						
					</div>
				</div>
				<div class="relaxed_step relaxed_step2">
					<mip-img class="step" src="__MOBILE__/img/step2.png" alt=""></mip-img>
					<div class="relaxed_step_option">
						<div class="for-select">
							<mip-img class="turn_down" src="__MOBILE__/img/turn_down.png" alt=""></mip-img>
							<p class="select-text">请选择加盟品牌</p>
							<div class="for-option">
								<p class="select-red">请选择加盟品牌
									<mip-img class="turn_up" src="__MOBILE__/img/turn_up.png" alt=""></mip-img>
								</p>
								<ul class="get_pinpai">
									
								</ul>
							</div>
						</div>
						
					</div>
				</div>
				<div class="relaxed_step relaxed_step3">
					<mip-img class="step" src="__MOBILE__/img/step3.png" alt=""></mip-img>
					<div class="relaxed_step_option">
						<div class="for-select">
							<mip-img class="turn_down" src="__MOBILE__/img/turn_down.png" alt=""></mip-img>
							<p class="select-text">请选择加盟费用</p>
							<div class="for-option">
								<p class="select-red">请选择加盟费用
									<mip-img class="turn_up" src="__MOBILE__/img/turn_up.png" alt=""></mip-img>
								</p>
								<ul>
									<li class="L_display">请选择</li>
									<li>5W</li>
									<li>10W</li>
									<li>20W</li>
									<li>30W</li>
									<li>50W</li>
									<li>80W</li>
									<li>100W</li>
									<li>200W</li>
									<li>300W</li>
									<li>500W</li>
								</ul>
							</div>
						</div>
						
					</div>
				</div>
				<span class="on_look Immediatelycheck">立即查看</span>
			</div>
			
			<mip-img class="delete" src="__MOBILE__/img/delete.png" alt=""></<mip-img>
		</div>
	</div>
</mip-jm-select>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

