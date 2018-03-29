# mip-jia-stylexam

mip-jia-stylexam 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-stylexam/mip-jia-stylexam.js

## 示例

### 基本用法
```html
<mip-jia-stylexam>
    <script type="application/json">
            {
                "dataImageList": [
                    "http://imgmall.tg.com.cn/group2/M00/44/F1/CgooeFkZQyr7OBa-AAczzjQw9o0462_900x600.jpg",
                    "http://imgmall.tg.com.cn/group2/M00/23/D8/CgooeVf7R_HwbLb6AA5wiJDiqBo755_900x600.jpg",
                    "http://imgmall.tg.com.cn/group2/M00/20/D7/CgooeFe6ooSvSydNAAdozxa7_g8772_900x600.jpg",
                    "http://imgmall.tg.com.cn/group2/M00/40/56/CgooeVkYEDLcCXVvAAcVLrsyOqs811_900x600.jpg"
                ],
                "styleMapping": {
                    "美式": 1,
                    "中式": 2,
                    "田园": 3,
                    "地中海": 4,
                    "简约": 5,
                    "欧式": 6
                },
                "resultlink":"/style-exam/result111"
            }
        </script>
        <div class="guide-section">
            <div class="test-btn">开始测试</div>
         </div>
        <div class="love-section">
          <div class="page-first">
            <div class="imgWrap">
                <mip-jia-swiper></mip-jia-swiper>
                <div class="style-swiper-container">
                    <div class="swiper-pagination progress"></div>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide imgGroup"></div>
                    </div>
                </div>
            </div>
           </div>
           <div class="page-second">
                <div class="form-button disable" id="freeGetDecoration">马上看测试结果</div>
           </div>
       </div>
</mip-jia-stylexam>
```

### dataImageList
说明：图片地址
必选项：是

### styleMapping
说明：测试风格类型
必选项：是

### resultlink
说明：跳转成功链接
必选项：是



## 注意事项
需要配合mip-jia-swiper组件实现

