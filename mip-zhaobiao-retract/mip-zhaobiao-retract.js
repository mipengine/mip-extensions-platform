/**
 * @file mip-retract 组件
 */
define(function (require) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var changehide = document.getElementById('changehide');
    window.onresize = function () {
        if (w > window.innerWidth || h > window.innerHeight) {
            changehide.style.display = 'none';
        } else {
            changehide.style.display = 'block';
        };
    };
});

