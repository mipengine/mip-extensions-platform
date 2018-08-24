# mip-blog-tgb

      mip-blog-tgb 组件说明
     个人博客页面组件
    标题|内容
     ----|----
    类型|通用
    支持布局|responsive,fixed-height,fill,container,fixed
    所需脚本|https://c.mipcdn.com/static/v1/mip-blog-tgb/mip-blog-tgb.js

## 示例

### 基本用法
     ```html
          <mip-blog-tgb>
                  <div class="Mboke_content hotContent  hotContent_div">
			     <div class="hotContentItems"></div>
                 </div>		
	        <span class="Mboke_username"></span>
              <div class="div_head_data" ></div>
              <div class="focusBox"></div>
             <div id="message"></div>
            <div class="yzBox" id="sendInfo"></div>
           <mip-img  layout="responsive" width="100" height="100"
							src="https://image.taoguba.com.cn/img/aa.png"
		 class="Mboke_userimg" ></mip-img>
          <div class="Mboke_userHead"></div>
         <div class="indexContentItems2"></div>
         <div class="Mboke_content geguContent  geguContent_div  ">
                <div class="geguContentItems"></div>
               <div class="indexContentItems"></div>
        </div>
        <div class="Mboke_content hotContent  hotContent_div">
			<div class="hotContentItems"></div>
	</div>
       <div class="Mboke_titles">
			<span class="Mboke_title Mboke_title_active left">博客首页</span> <span
				class="Mboke_title left">近期讨论个股</span> <span
				class="Mboke_title left">热文推荐</span>
       </div>
</mip-blog-tgb>


## 属性

### userID
    说明：用户id
    必选项：否
    类型：字符串
    取值范围：无
    单位：无
    默认值：空
### ssoPath
    说明：页面路径
    必选项：否
    类型：字符串
    取值范围：无
    单位：无
    默认值：空
### sessionScope
    说明：存在session的值
    必选项：否
    类型：字符串
    取值范围：无
    单位：无
    默认值：空
### blogerName
    说明：博客名
    必选项：否
    类型：字符串
    取值范围：无
    单位：无
    默认值：空
## 注意事项

