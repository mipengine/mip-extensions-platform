# mip-diy-adsense

mip-diy-adsense 用来添加谷歌新型广告，原来的mip-adsense只能使用基本代码 

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|

## 示例

MIP提供谷歌广告的扩展组件，代码示例：

```
	<mip-diy-adsense 
        ad-format="fluid"
        ad-layout="image-side" 
        ad-layout-key="-fd+6a+11-fw+q1" 
        ad-client="ca-pub-2743127670892157" 
        ad-slot="9108369654" 
    >
	</mip-diy-adsense>
```

## 属性

### ad-client

说明：用户
必选项：是
类型：字符串

### ad-slot

说明：位置
必选项：是
类型：字符串

### ad-format

说明：格式
必选项：否
类型：字符串(fluid|auto|autorelaxed)

### ad-width

说明：宽度
必选项：否
类型：字符串

### ad-height

说明：高度
必选项：否
类型：字符串

### ad-align

说明：居中
必选项：否
类型：字符串

### ad-layout-key

说明：组合layout
必选项：否
类型：字符串