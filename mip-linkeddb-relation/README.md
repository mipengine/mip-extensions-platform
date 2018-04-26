# mip-linkeddb-relation

mip-linkeddb-relation  Base64解析{{graph}}生成图谱

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linkeddb-relation/mip-linkeddb-relation.js

## 示例

### 基本用法
```html
<mip-linkeddb-relation>
    <div class="role-map-cont mip-full-box" data-graph="eyJub2RlcyI6IFt7ImlkIjogNDQsICJvaWQiOiAiNWE1NmUyMjg5M2NjMmI0MmE2YmYwMDIyIiwgInR5cGUiOiAicm9sZSIsICJuYW1lIjogIlx1OGQ3NVx1NzY3ZFx1NzdmMyIsICJhdmF0YXIiOiAiaHR0cHM6Ly9pLmxpbmtlZGRiLmNvbS91cGxvYWQvaW1hZ2UvMjAxNzkyMC8xNDExNTIxMjQ3NTQuanBnIiwgInVybCI6ICIvdHYvNTljMjA0NWU5ZjE2MjUwMDE0MmJhODAzL3JvbGUvNDQvIiwgImV4ZGF0YSI6IHsiaWQiOiA3NzU1OCwgIm9pZCI6ICI1OWZhNzJhYTE4NTIxNTY5YjY2MzdkYjkiLCAibmFtZSI6ICJcdTRlZmJcdTkxY2QiLCAiYXZhdGFyIjogImh0dHBzOi8vaS5saW5rZWRkYi5jb20vcGVyc29uMi9mMDMzLzE0M2UvZmQyNWZmMDFjNTEyZTU2OGJlZGIxMzlmLmpwZyIsICJ1cmwiOiAiL3BlcnNvbi81OWZhNzJhYTE4NTIxNTY5YjY2MzdkYjkvIn19LCB7ImlkIjogNDYsICJvaWQiOiAiNWE1NmUyMjg5M2NjMmI0MmE2YmYwMDI0IiwgInR5cGUiOiAicm9sZSIsICJuYW1lIjogIlx1Njc1Y1x1NjYwZVx1NzkzYyIsICJhdmF0YXIiOiAiaHR0cHM6Ly9pLmxpbmtlZGRiLmNvbS91cGxvYWQvaW1hZ2UvMjAxNzkyMC8xNDE2MTE0NzEyMjQuanBnIiwgInVybCI6ICIvdHYvNTljMjA0NWU5ZjE2MjUwMDE0MmJhODAzL3JvbGUvNDYvIiwgImV4ZGF0YSI6IHsiaWQiOiAxMDUxODMsICJvaWQiOiAiNTlmYTc1MTYxODUyMTU2OWI2NjVlOGEyIiwgIm5hbWUiOiAiXHU0ZmRlXHU3MDRmXHU2NjBlIiwgImF2YXRhciI6ICJodHRwczovL2kubGlua2VkZGIuY29tL3VwbG9hZC8yYzMzLzc2ZGUvOTIzZWZjZmFkNWY3MGIyNzU1NjAxNTMwLnBuZyIsICJ1cmwiOiAiL3BlcnNvbi81OWZhNzUxNjE4NTIxNTY5YjY2NWU4YTIvIn19LCB7ImlkIjogNTYsICJvaWQiOiAiNWE1NmUyMjg5M2NjMmI0MmE2YmYwMDJlIiwgInR5cGUiOiAicm9sZSIsICJuYW1lIjogIlx1NTQzNFx1NmNmZCIsICJhdmF0YXIiOiAiaHR0cHM6Ly9pLmxpbmtlZGRiLmNvbS91cGxvYWQvaW1hZ2UvMjAxNzkyMC8xNjU5MjY4OTM5MDIuanBnIiwgInVybCI6ICIvdHYvNTljMjA0NWU5ZjE2MjUwMDE0MmJhODAzL3JvbGUvNTYvIiwgImV4ZGF0YSI6IHsiaWQiOiAxNTY4NDQsICJvaWQiOiAiNTlmYTdhZjQxODUyMTU2OWI2NmI0NGUxIiwgIm5hbWUiOiAiXHU1ZjIwXHU1OTI5XHU5NjMzIiwgImF2YXRhciI6ICJodHRwczovL2kubGlua2VkZGIuY29tL3BlcnNvbjIvNzVmNi9mNjgyLzJkYmRiMjM0NDNkMzc3OTNjNWI0NDI1MC5qcGciLCAidXJsIjogIi9wZXJzb24vNTlmYTdhZjQxODUyMTU2OWI2NmI0NGUxLyJ9fV0sICJsaW5rcyI6IFt7InNvdXJjZSI6IDAsICJ0YXJnZXQiOiAxLCAidHlwZSI6ICJcdTU0MDhcdTRmNWMiLCAiY29sb3IiOiAiIn0sIHsic291cmNlIjogMCwgInRhcmdldCI6IDIsICJ0eXBlIjogIlx1NTQwY1x1N2E5NyIsICJjb2xvciI6ICIifV19" id="roleMap"></div>
</mip-linkeddb-relation>
```
## 注意事项
高度是100% 需要设置高度 才能生成图片
## 属性

说明：数据格式 
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
通过 Base64生成data-graph="{{graph}}"  