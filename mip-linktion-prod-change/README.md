# mip-linktion-prod-change

mip-linktion-prod-change ajax多次拉去列表数据

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linktion-prod-change/mip-linktion-prod-change.js

## 示例

### 基本用法
```html
<mip-linktion-prod-change >
   <div class="module">
      <div class="col-lg-12">
          <div class="recommend-bar">
              <div class="recommend-bar-head">
                  <h2>猜你喜欢</h2>
              </div>
              <div class="recommend-more">
                  <button type="button" id="searchChange" data-src="http://www.caifu.org/search/more" data-type="保险" data-query="保险">
                      <mip-img src="/img/icon/refresh.png"></mip-img>
                      <p>换一批</p>
                  </button>
              </div>
          </div>
          <div class="card-module">
              <div class="row" id="productBox">
                  <div class="col-lg-4 col-sm-4" th:each="product : ${products}">
                      <a href="" th:href="'/product/product/' + ${product.id}">
                          <div class="card-module-box">
                              <div class="module-img">
                                  <mip-img src="/img/index-card.png" th:src="${product.image}"></mip-img>
                                  <p class="module-img-txt" th:text="${product.name}">国寿康宁终身重大疾</p>
                              </div>
                              <div class="module-txt" th:if="${product.planners != null}">
                                  <div class="module-portrait">
                                      <div class="module-portrait-icon" th:each="planner : ${product.planners}">
                                          <mip-img src="/img/head.jpg" th:src="${planner != null} ? ${planner.avatar} : '/img/head.jpg'"></mip-img>
                                      </div>
                                  </div>
                                  <div class="module-total">
                                      <p class="module-total-nub" th:text="${product.plannerTotal}">123</p><span>位</span>
                                      <p class="module-total-assistant">理财师为您提供免费咨询</p>
                                  </div>
                              </div>
                          </div>
                      </a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</mip-linktion-prod-change>
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

