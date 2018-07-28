/**
 * @file mip-st-lazy-tab 组件模板
 * @author li-yinan
 */

define(function (require) {
    return '<template type="mip-etpl">                                               '
    + '    <section>                                                                 '
    + '        {% for: {{spu_cate}} as {{type}}, {{index}}%}                         '
    + '            <li key="{{type.spu_name}}">{{type.spu_name}}</li>                '
    + '        {% /for %}                                                            '
    + '    </section>                                                                '
    + '    {% for: {{spu_cate}} as {{type}}, {{index}}%}                             '
    + '    <div>                                                                     '
    + '        <template type="mip-etpl">                                            '
    + '            <mip-st-detail url="{{ajaxUrl}}"                              '
    + '                on="dataloaded:select{{index}}.dataloaded">                   '
    + '            </mip-st-detail>                                                  '
    + '            <mip-st-select id="select{{index}}" value="all"                   '
    + '                on="tagchange:scroller{{index}}.tagchange">                   '
    + '            </mip-st-select>                                                  '
    + '            <mip-st-scroll id="scroller{{index}}" on="showslide:picslide.open"'
    + '                url="{{jsonpUrl}}">                                  '
    + '            </mip-st-scroll>                                                  '
    + '        </template>                                                           '
    + '    </div>                                                                    '
    + '    {% /for %}                                                                '
    + '    <script type="application/json">                                          '
    + '        {% if: {{spu_cate}}.length <= 4 %}                                    '
    + '        {                                                                     '
    + '            "allow-scroll": false,                                            '
    + '            "toggle-more": false,                                             '
    + '            "toggle-label": ""                                                '
    + '        }                                                                     '
    + '        {% else %}                                                            '
    + '        {                                                                     '
    + '            "allow-scroll": true,                                             '
    + '            "toggle-more": true,                                              '
    + '            "toggle-label": "请选择分类"                                      '
    + '        }                                                                     '
    + '        {% /if %}                                                             '
    + '    </script>                                                                 '
    + '</template>                                                                   ';
});
