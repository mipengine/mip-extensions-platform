/**
 * @file mip-qinbao-count 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var count = {
        tongji: function () {
            if ($('#tj-pindao').length) {
                var bjn = $('#tj-pindao').val();
                bjn = bjn.replace(/(^\s*)|(\s*$)/g, '');
                var token = '';
                if (bjn !== '') {
                    switch (bjn) {
                        case '5':
                            token = 'e599183b58a2bc16f9d1bb0b5d2cde29';
                        case '4':
                            token = '4ba23929a20904dd1920a6e67b6258d3';
                        case '145':
                            token = '737061585d6c6e470e11cd586ab001a5';
                        case '320':
                            token = '9a062054b8b85381da65632c71304230';
                        case '1307':
                            token = '8de43dc4388854565f132cb38eb47b37';
                        case '688':
                            token = '3d6ad242452d18202aea940e01a657cc';
                        case '687':
                            token = '3d6ad242452d18202aea940e01a657cc';
                        case '209':
                            token = '3d6ad242452d18202aea940e01a657cc';
                        case '685':
                            token = '3d6ad242452d18202aea940e01a657cc';
                        case '1213':
                            token = '3d6ad242452d18202aea940e01a657cc';
                        case '686':
                            token = '3d6ad242452d18202aea940e01a657cc';
                        case '392':
                            token = 'e599183b58a2bc16f9d1bb0b5d2cde29';
                    }
                    if (token !== '') {
                        $('body').append('<mip-stats-baidu token="' + token + '">');
                    }
                }
            }
            var bjname1 = $('#tj-user').val();
            var token1 = '';
            if (bjname1 !== '') {
                switch (bjname1) {
                    case '66':
                        token1 = '67ee0be58f01c6b6cd9cccf67af92513';
                    case '65':
                        token1 = 'd5e3dda5a279b3852db30823bde6266d';
                    case '67':
                        token1 = 'b13718a10a1d62d49145d7979710ba2b';
                    case '72':
                        token1 = 'bd368f7f51b9f7606867a916bf64c27b';
                    case '40':
                        token1 = 'b952b47d138a724bcda8dc52d3a7d139';
                    case '53':
                        token1 = '4b754179e6d6071661cb024f250ac89d';
                    case '69':
                        token1 = '52be0350204c9f7d030a6a233cc200c8';
                    case '77':
                        token1 = '13f895a92ba95478cc80a856d139b86d';
                    case '79':
                        token1 = '8656569078bacf6a0b5206e3df6c1c2b';
                    case '80':
                        token1 = '75e01e5cc768020cad469b23aca39fb5';
                    case '81':
                        token1 = 'bf5a2afc4a62f2d101a0b718f43d684b';
                    case '82':
                        token1 = '6891380b2d931f5a86c46e9faca45d9b';
                    case '83':
                        token1 = '90f5390d52559687ed0ea6b8603e7018';
                    case '84':
                        token1 = '25c7168b969a2b30b3a638792c875b04';
                    case '85':
                        token1 = 'b3b7cbe98bfd6ded57ac3787f86ab3af';
                    case '86':
                        token1 = 'd79f0df6562f2b24a361fce202a0c883';
                    case '91':
                        token1 = 'f0f834bdfc926891cecbec39bfb45fee';
                    case '90':
                        token1 = '18ffa37f55a66079d6dd45e94ba43073';
                    case '92':
                        token1 = '25cf5551f42ea36987f7f2797591499e';
                    case '102':
                        token1 = '2a59ab6cb73c391455b7ca6464e88a37';
                    case '93':
                        token1 = '81a24676fd25c47c94da8525cd37f7c0';
                    case '94':
                        token1 = 'f1a2d84ac259da6dc3ae1810400f5ec7';
                    case '95':
                        token1 = 'f1bb17f4ecab78db3bd843c886f5f28a';
                    case '96':
                        token1 = '738c8790517d83258fe266bfc2c0a21f';
                    case '97':
                        token1 = '7b160f6d9024bface47a022197b7bd11';
                    case '98':
                        token1 = '1e09254282af3e9777e259d81fe5350d';
                    case '99':
                        token1 = 'bee5f07fd0b9c959b8f54f7d0270b8d1';
                    case '100':
                        token1 = '6813e3b3de1191c6d182ff531d326470';
                    case '101':
                        token1 = '4767046390ec5102deda119c991a90fd';
                    case '103':
                        token1 = '26a6b5049a60320c233efdf9486d350e';
                    case '104':
                        token1 = 'bccaf3f06c86898f5b072ecf91987835';
                    case '106':
                        token1 = '2c4b5481d2e529a7eeaa19adff9ce572';
                    case '107':
                        token1 = 'b88c8ea9996f8cbc6a8dd1c765eecc77';
                    case '108':
                        token1 = '96bfac03922b0fedcdf9e97521f1a568';
                    case '109':
                        token1 = 'ef2b0bfc04ec545c4400cff67dbb94dd';
                    case '110':
                        token1 = '5d10481f78ab015d307afb510703ba6a';
                    case '111':
                        token1 = 'c06798b54f0b9b03be25998bedd44259';
                    case '112':
                        token1 = '98455e47f30b797fc8f4d37873c1b724';
                    case '113':
                        token1 = '4a16c6007e2802cc0a415b4d607e2050';
                    case '114':
                        token1 = 'afa2735503857cac81d08fe6f13abc46';
                    case '115':
                        token1 = 'eb51ef718a0098a9bbcfac66062d3f0e';
                    case '116':
                        token1 = 'ee94d772a4cbd23a5137bd5e50ecaf34';
                    case '117':
                        token1 = 'fa7843dbb151eda30e6850b2a5d5006f';
                    case '118':
                        token1 = '52c1153f23cf30b1614bd56f83d62036';
                    case '120':
                        token1 = 'fcc57f687ae77f2b8ad6d0938978bce0';
                    default:
                        token1 = '3d8ae083091c839222c62a3e4ab746ee';
                }
                if (token1 !== '') {
                    $('body').append('<mip-stats-baidu token="' + token1 + '">');
                }
            }
            var token2 = '5d233086de1ffd4c51e2e4ce4ed5dfd1';
            $('body').append('<mip-stats-baidu token="' + token2 + '">');
            var token3 = '3d8ae083091c839222c62a3e4ab746ee';
            $('body').append('<mip-stats-baidu token="' + token3 + '">');
        },
        views: function () {
            if ($('#doc-id').length > 0) {
                var id = $('#doc-id').val();
                var model = 'Document';
                $.ajax({
                    type: 'post',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'statAjaxView',
                    url: 'https://dynamic.qbaobei.com/dynamic.php?s=Qbaobeimobile/view',
                    data: {id: id, model: model}
                });
            }
        },
        autoTask: function () {
            var url = 'https://m.qbaobei.com/index.php?s=/Dynamic/autoTask/push';
            var pm = 'm';
            var req = '';
            if (window.XMLHttpRequest) {
                req = new XMLHttpRequest();
            }
            else if (window.ActiveXObject) {
                req = new ActiveXObject('Microsoft.XMLHttp');
            }
            if (req) {
                var link = window.location.pathname;
                req.open('GET', url + '&url=' + encodeURIComponent(link) + '&pm=' + pm, true);
                req.send(null);
            }
        },
        init: function () {
            this.tongji(), this.views(), this.autoTask();
        }
    };
    customElement.prototype.build = function () {
        count.init();
    };
    return customElement;
});
