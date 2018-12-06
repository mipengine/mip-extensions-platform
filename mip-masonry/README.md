# mip-masonry

mip-masonry 是一款支持响应式静态瀑布流的MIP组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-masonry/mip-masonry.js

## 示例

### 基本用法
```html
<mip-masonry>
            <div class="item" id="brand-a">
                <p class="margin-clear"><label class="text-color-bg1"> MAC：</label><label>880</label></p>
                <p class="margin-clear"><label class="text-color-bg1">传感器类型：</label><label>多功能数据采集传输系统</label></p>
                <p class="margin-clear"><label class="text-color-bg1">安装地址：</label><label>测试</label></p>
            </div>
            <div class="item" id="brand-b">
                <h3>B</h3>
                <p><a href="#">HERBORIST/佰草集</a></p>
                <p><a href="#">BURBERRY/巴宝莉/博柏利</a></p>
                <p><a href="#">BIOTHERM/碧欧泉</a></p>
                <p><a href="#">benefit/贝玲妃</a></p>
                <p><a href="#">Bavii/柏羽</a></p>
                <p><a href="#">PaulSmith/保罗史密夫</a></p>
                <p><a href="#">Bobbi Brown/芭比布朗</a></p>
                <p><a href="#">BVLGARI/宝格丽</a></p>
                <p><a href="#">PURE&MILD/泊美</a></p>
                <p><a href="#">baviphat/芭比菲特</a></p>
                <p><a href="#">Peter Thomas Roth/彼得罗夫</a></p>
                <p><a href="#">BeDOOK/比度克</a></p>
                <p><a href="#">BIODERMA/贝德玛</a></p>
                <p><a href="#">BKBarry-MBlistex/碧唇</a></p>
            </div>
            <div class="item" id="brand-c">
                <h3>C</h3>
                <p><a href="#">Fenix/长生鸟</a></p>
                <p><a href="#">For Beloved One/宠爱之名</a></p>
                <p><a href="#">CHARMZONE/婵真</a></p>
            </div>
            <div class="item" id="brand-d">
                <h3>D</h3>
                <p><a href="#">Dr.Jart+Dr.MJDior/迪奥</a></p>
                <p><a href="#">dodo</a></p>
                <p><a href="#">Dior/迪奥</a></p>
                <p><a href="#">Dove/多芬</a></p>
                <p><a href="#">DHC/蝶翠诗</a></p>
                <p><a href="#">Davidoff/大卫杜夫</a></p>
            </div>
            <div class="item" id="brand-e">
                <h3>E</h3>
                <p><a href="#">N-Dorphin/恩朵娉</a></p>
                <p><a href="#">OPERA/娥佩兰</a></p>
                <p><a href="#">ELF</a></p>
                <p><a href="#">eos</a></p>
            </div>
            <div class="item" id="brand-f">
                <h3>F</h3>
                <p><a href="#">芳草集</a></p>
                <p><a href="#">THEFACESHOP/菲诗小铺</a></p>
                <p><a href="#">Fanxishop/凡茜</a></p>
                <p><a href="#">FANCL/芳珂（芳凯尔）</a></p>
                <p><a href="#">VERSACE/范思哲</a></p>
            </div>
            <div class="item" id="brand-g">
                <h3>G</h3>
                <p><a href="#">ARDELL/艾黛尔</a></p>
                <p><a href="#">ANNASUI/安娜苏</a></p>
                <p><a href="#">ETUDEHOUSE/爱丽小屋</a></p>
                <p><a href="#">abeeco</a></p>
                <p><a href="#">AFU/阿芙</a></p>
                <p><a href="#">Egyptian-Magic-Cream/埃及魔法膏</a></p>
                <p><a href="#">adidas/阿迪达斯</a></p>
            </div>
            <div class="item" id="brand-h">
                <h3>H</h3>
                <p><a href="#">LAMER/海蓝之谜</a></p>
                <p><a href="#">BOCOTON/海诺丝丽</a></p>
                <p><a href="#">CO.E/韩伊</a></p>
                <p><a href="#">Herbacin/贺本清</a></p>
                <p><a href="#">花瑶花</a></p>
                <p><a href="#">花漾美姬</a></p>
                <p><a href="#">HEY NATURE/韩彩妮</a></p>
                <p><a href="#">Hipitch/黑龙堂</a></p>
            </div>
            <div class="item" id="brand-l">
                <h3>L</h3>
                <p><a href="#">LAMER/海蓝之谜</a></p>
                <p><a href="#">BOCOTON/海诺丝丽</a></p>
                <p><a href="#">CO.E/韩伊</a></p>
                <p><a href="#">CO.E/韩伊</a></p>
                <p><a href="#">CO.E/韩伊</a></p>
                <p><a href="#">Herbacin/贺本清</a></p>
                <p><a href="#">花瑶花</a></p>
                <p><a href="#">花漾美姬</a></p>
                <p><a href="#">HEY NATURE/韩彩妮</a></p>
                <p><a href="#">Hipitch/黑龙堂</a></p>
            </div>
            <div class="item" id="brand-m">
                <h3>M</h3>
                <p><a href="#">LAMER/海蓝之谜</a></p>
                <p><a href="#">BOCOTON/海诺丝丽</a></p>
                <p><a href="#">CO.E/韩伊</a></p>
                <p><a href="#">Herbacin/贺本清</a></p>
                <p><a href="#">花瑶花</a></p>
                <p><a href="#">花漾美姬</a></p>
                <p><a href="#">HEY NATURE/韩彩妮</a></p>
                <p><a href="#">Hipitch/黑龙堂</a></p>
            </div>
            <div class="item" id="brand-n">
                <h3>N</h3>
                <p><a href="#">LAMER/海蓝之谜</a></p>
                <p><a href="#">LAMER/海蓝之谜</a></p>
                <p><a href="#">LAMER/海蓝之谜</a></p>
                <p><a href="#">BOCOTON/海诺丝丽</a></p>
                <p><a href="#">CO.E/韩伊</a></p>
                <p><a href="#">Herbacin/贺本清</a></p>
                <p><a href="#">花瑶花</a></p>
                <p><a href="#">花漾美姬</a></p>
                <p><a href="#">HEY NATURE/韩彩妮</a></p>
                <p><a href="#">Hipitch/黑龙堂</a></p>
            </div>
            <div class="item" id="brand-o">
                <h3>O</h3>
                <p><a href="#">OAMER/海蓝之谜</a></p>
                <p><a href="#">OAMER/海蓝之谜</a></p>
                <p><a href="#">OAMER/海蓝之谜</a></p>
                <p><a href="#">OOCOTON/海诺丝丽</a></p>
                <p><a href="#">OO.E/韩伊</a></p>
                <p><a href="#">Oerbacin/贺本清</a></p>
                <p><a href="#">O花瑶花</a></p>
                <p><a href="#">O花漾美姬</a></p>
                <p><a href="#">OEY NATURE/韩彩妮</a></p>
                <p><a href="#">Oipitch/黑龙堂</a></p>
            </div>
</mip-masonry>
```

