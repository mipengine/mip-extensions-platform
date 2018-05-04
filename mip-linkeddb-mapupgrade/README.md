# mip-linkeddb-mapupgrade

mip-linkeddb-mapupgrade 点击人物 可以查看一度人脉

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linkeddb-mapupgrade/mip-linkeddb-mapupgrade.js

## 示例

### 基本用法
```html
<mip-linkeddb-mapupgrade>
    <div class="role-map-cont mip-full-box" data-graph="{{grah}}" id="roleMap"></div>
</mip-linkeddb-mapupgrade>
```

## 属性

### {{grah}}

说明：{{grah}} 是后台传输的数据 

数据格式
{
    links:[
        {source: 0, target: 1, type: "合作", color: "734646"}
        {source: 0, target: 1, type: "朋友", color: "734646"}
        {source: 0, target: 1, type: "合作", color: "734646"}
    ],
    nodes: [
        {
            id: 41,
            oid: "5a56e22893cc2b42a6bf001f",
            exdata: {
                avatar: "https://i.linkeddb.com/person2/070d/d9c3/0fe9aa40e9c3014d23fadcce.jpg",
                id: 67864, name: "孙俪",
                oid: "59fa71e218521569b662b81e", 
                url: "/person/59fa71e218521569b662b81e/"
            }, 
            type: "role",
            name: "周莹", 
            avatar: "https://i.linkeddb.com/upload/image/2017920/140646844806.jpg"
        },
        {
            id: 41,
            oid: "5a56e22893cc2b42a6bf001f",
            exdata: {
                avatar: "https://i.linkeddb.com/person2/070d/d9c3/0fe9aa40e9c3014d23fadcce.jpg",
                id: 67864, name: "孙俪",
                oid: "59fa71e218521569b662b81e", 
                url: "/person/59fa71e218521569b662b81e/"
            }, 
            type: "role",
            name: "周莹", 
            avatar: "https://i.linkeddb.com/upload/image/2017920/140646844806.jpg"
        },
        {
            id: 41,
            oid: "5a56e22893cc2b42a6bf001f",
            exdata: {
                avatar: "https://i.linkeddb.com/person2/070d/d9c3/0fe9aa40e9c3014d23fadcce.jpg",
                id: 67864, name: "孙俪",
                oid: "59fa71e218521569b662b81e", 
                url: "/person/59fa71e218521569b662b81e/"
            }, 
            type: "role",
            name: "周莹", 
            avatar: "https://i.linkeddb.com/upload/image/2017920/140646844806.jpg"
        }
    ]
}
