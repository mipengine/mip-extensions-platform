/**
 * @file 菜单显示隐藏切换
 * @author yw
*/
define(function (require) {
    var $ = require('jquery');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var mipElement = this.element;
        mipElement.isRender = true;
        var position = mipElement.getAttribute('position') || '';
        var author = mipElement.getAttribute('author') || '';
        var sec = mipElement.getAttribute('sec') || '';
        var callbackysoptions = mipElement.getAttribute('cboptions') || [];
        var callbackdata = [];
        if (callbackysoptions)
        {
            try {
                callbackdata = new Function('return ' + callbackysoptions)();
            } catch (e) {}
        }
        if (author !== '' && sec !== '' && position !== '')
        {
            var getdata = {'author': author, 'sec': sec, 'position': position};
            $.ajax({
                    type: 'GET',
                    url: '//m.120ask.com/vipbdmip',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    data: getdata,
                    success: function (json) {
                        if (json.code === 200)
                        {
                            $(mipElement).append(json.data);
                            if (json.data !== '')
                            {
                                if (callbackdata && callbackdata.length > 0)
                                {
                                    renderCallback(callbackdata);
                                }
                            }
                        } else {
                            return false;
                        }
                    }
                }
            );
        }
    };
    function renderCallback(callbackdata)
    {
        var index = 0;
        for (index = 0; index < callbackdata.length; index++)
        {
            if (callbackdata[index].type === 'show') {
                $(callbackdata[index].target).show();
            } else if (callbackdata[index].type === 'hide') {
                $(callbackdata[index].target).hide();
            } else if (callbackdata[index].type === 'remove') {
                $(callbackdata[index].target).remove();
            }
        }
    }
    return customElem;
});
