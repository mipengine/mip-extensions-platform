/**
 * @file mip-st-picslide 组件模板
 * @author li-yinan
 */

define(function (require) {
    return '<mip-fixed class="inner hide" type="top">                     '
        + '</mip-fixed>                                                   '
        + '<template type="mip-etpl">                                     '
        + '    <mip-st-slide>                                             '
        + '        <script type="application/json">                       '
        + '            {                                                  '
        + '                "slideCell": "#slideBox",                      '
        + '                "titCell": ".hd ul",                           '
        + '                "mainCell": ".bd ul",                          '
        + '                "effect": "leftLoop",                          '
        + '                "defaultIndex": {{currentIndex}},              '
        + '                "autoPage": true,                              '
        + '                "autoPlay": false                              '
        + '            }                                                  '
        + '        </script>                                              '
        + '        <div id="slideBox" class="slideBox">                   '
        + '            <div class="hd">                                   '
        + '                <ul></ul>                                      '
        + '            </div>                                             '
        + '            <div class="bd">                                   '
        + '                <ul>                                           '
        + '                    {% if: {{imgs.length}} != 0 %}             '
        + '                    {% for: {{imgs}} as {{image}}, {{index}} %}'
        + '                    <li>                                       '
        + '                        <img src="{{image}}"/>                 '
        + '                    </li>                                      '
        + '                    {% /for %}                                 '
        + '                    {% /if %}                                  '
        + '                </ul>                                          '
        + '            </div>                                             '
        + '        </div>                                                 '
        + '    </mip-st-slide>                                            '
        + '</template>                                                    ';
});
