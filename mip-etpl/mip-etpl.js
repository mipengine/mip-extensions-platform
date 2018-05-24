/**
 * @file mip-etpl 组件
 * @author
 */

define(function (require) {
    var etpl = require('./etpl.min');
    var etplEngine = new etpl.Engine({
        commandOpen: '{%',
        commandClose: '%}',
        variableOpen: '{{',
        variableClose: '}}'
    });
    var templates = require('templates');
    var Etpl = templates.inheritTemplate();
    Etpl.prototype.cache = function (templateHTML) {
        return etplEngine.compile(templateHTML);
    };

    Etpl.prototype.render = function (templateHTML, data) {
        var render = etplEngine.compile(templateHTML);
        return render(data);
    };
    return Etpl;
});
