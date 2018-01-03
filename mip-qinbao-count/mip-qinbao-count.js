/**
 * @file mip-qinbao-count 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        if (document.getElementById('tj-pindao')) {
            var bjname = document.getElementById('tj-pindao').value;
            bjname = bjname.replace(/(^\s*)|(\s*$)/g, '');
            var hm = document.createElement('script');
            if (bjname !== '') {
                switch (bjname) {
                    case '5':
                        hm.src = 'https://hm.baidu.com/hm.js?e599183b58a2bc16f9d1bb0b5d2cde29';
                    case '4':
                        hm.src = 'https://hm.baidu.com/hm.js?4ba23929a20904dd1920a6e67b6258d3';
                    case '145':
                        hm.src = 'https://hm.baidu.com/hm.js?737061585d6c6e470e11cd586ab001a5';
                    case '320':
                        hm.src = 'https://hm.baidu.com/hm.js?9a062054b8b85381da65632c71304230';
                    case '1307':
                        hm.src = 'https://hm.baidu.com/hm.js?8de43dc4388854565f132cb38eb47b37';
                    case '688':
                        hm.src = 'https://hm.baidu.com/hm.js?3d6ad242452d18202aea940e01a657cc';
                    case '687':
                        hm.src = 'https://hm.baidu.com/hm.js?3d6ad242452d18202aea940e01a657cc';
                    case '209':
                        hm.src = 'https://hm.baidu.com/hm.js?3d6ad242452d18202aea940e01a657cc';
                    case '685':
                        hm.src = 'https://hm.baidu.com/hm.js?3d6ad242452d18202aea940e01a657cc';
                    case '1213':
                        hm.src = 'https://hm.baidu.com/hm.js?3d6ad242452d18202aea940e01a657cc';
                    case '686':
                        hm.src = 'https://hm.baidu.com/hm.js?3d6ad242452d18202aea940e01a657cc';
                    case '392':
                        hm.src = 'https://hm.baidu.com/hm.js?e599183b58a2bc16f9d1bb0b5d2cde29';
                }
                if (hm.src !== '') {
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(hm, s);
                }
            }
        }
        else {
            var bjname1 = $('#tj-user').val();
            var hm1 = document.createElement('script');
            if (bjname1 !== '') {
                switch (bjname1) {
                    case '66':
                        hm1.src = 'https://hm.baidu.com/hm.js?67ee0be58f01c6b6cd9cccf67af92513';
                    case '65':
                        hm1.src = 'https://hm.baidu.com/hm.js?d5e3dda5a279b3852db30823bde6266d';
                    case '67':
                        hm1.src = 'https://hm.baidu.com/hm.js?b13718a10a1d62d49145d7979710ba2b';
                    case '72':
                        hm1.src = 'https://hm.baidu.com/hm.js?bd368f7f51b9f7606867a916bf64c27b';
                    case '40':
                        hm1.src = 'https://hm.baidu.com/hm.js?b952b47d138a724bcda8dc52d3a7d139';
                    case '53':
                        hm1.src = 'https://hm.baidu.com/hm.js?4b754179e6d6071661cb024f250ac89d';
                    case '69':
                        hm1.src = 'https://hm.baidu.com/hm.js?52be0350204c9f7d030a6a233cc200c8';
                    case '77':
                        hm1.src = 'https://hm.baidu.com/hm.js?13f895a92ba95478cc80a856d139b86d';
                    case '79':
                        hm1.src = 'https://hm.baidu.com/hm.js?8656569078bacf6a0b5206e3df6c1c2b';
                    case '80':
                        hm1.src = 'https://hm.baidu.com/hm.js?75e01e5cc768020cad469b23aca39fb5';
                    case '81':
                        hm1.src = 'https://hm.baidu.com/hm.js?bf5a2afc4a62f2d101a0b718f43d684b';
                    case '82':
                        hm1.src = 'https://hm.baidu.com/hm.js?6891380b2d931f5a86c46e9faca45d9b';
                    case '83':
                        hm1.src = 'https://hm.baidu.com/hm.js?90f5390d52559687ed0ea6b8603e7018';
                    case '84':
                        hm1.src = 'https://hm.baidu.com/hm.js?25c7168b969a2b30b3a638792c875b04';
                    case '85':
                        hm1.src = 'https://hm.baidu.com/hm.js?b3b7cbe98bfd6ded57ac3787f86ab3af';
                    case '86':
                        hm1.src = 'https://hm.baidu.com/hm.js?d79f0df6562f2b24a361fce202a0c883';
                    case '91':
                        hm1.src = 'https://hm.baidu.com/hm.js?f0f834bdfc926891cecbec39bfb45fee';
                    case '90':
                        hm1.src = 'https://hm.baidu.com/hm.js?18ffa37f55a66079d6dd45e94ba43073';
                    case '92':
                        hm1.src = 'https://hm.baidu.com/hm.js?25cf5551f42ea36987f7f2797591499e';
                    case '102':
                        hm1.src = 'https://hm.baidu.com/hm.js?2a59ab6cb73c391455b7ca6464e88a37';
                    case '93':
                        hm1.src = 'https://hm.baidu.com/hm.js?81a24676fd25c47c94da8525cd37f7c0';
                    case '94':
                        hm1.src = 'https://hm.baidu.com/hm.js?f1a2d84ac259da6dc3ae1810400f5ec7';
                    case '95':
                        hm1.src = 'https://hm.baidu.com/hm.js?f1bb17f4ecab78db3bd843c886f5f28a';
                    case '96':
                        hm1.src = 'https://hm.baidu.com/hm.js?738c8790517d83258fe266bfc2c0a21f';
                    case '97':
                        hm1.src = 'https://hm.baidu.com/hm.js?7b160f6d9024bface47a022197b7bd11';
                    case '98':
                        hm1.src = 'https://hm.baidu.com/hm.js?1e09254282af3e9777e259d81fe5350d';
                    case '99':
                        hm1.src = 'https://hm.baidu.com/hm.js?bee5f07fd0b9c959b8f54f7d0270b8d1';
                    case '100':
                        hm1.src = 'https://hm.baidu.com/hm.js?6813e3b3de1191c6d182ff531d326470';
                    case '101':
                        hm1.src = 'https://hm.baidu.com/hm.js?4767046390ec5102deda119c991a90fd';
                    case '103':
                        hm1.src = 'https://hm.baidu.com/hm.js?26a6b5049a60320c233efdf9486d350e';
                    case '104':
                        hm1.src = 'https://hm.baidu.com/hm.js?bccaf3f06c86898f5b072ecf91987835';
                    case '106':
                        hm1.src = 'https://hm.baidu.com/hm.js?2c4b5481d2e529a7eeaa19adff9ce572';
                    case '107':
                        hm1.src = 'https://hm.baidu.com/hm.js?b88c8ea9996f8cbc6a8dd1c765eecc77';
                    case '108':
                        hm1.src = 'https://hm.baidu.com/hm.js?96bfac03922b0fedcdf9e97521f1a568';
                    case '109':
                        hm1.src = 'https://hm.baidu.com/hm.js?ef2b0bfc04ec545c4400cff67dbb94dd';
                    case '110':
                        hm1.src = 'https://hm.baidu.com/hm.js?5d10481f78ab015d307afb510703ba6a';
                    case '111':
                        hm1.src = 'https://hm.baidu.com/hm.js?c06798b54f0b9b03be25998bedd44259';
                    case '112':
                        hm1.src = 'https://hm.baidu.com/hm.js?98455e47f30b797fc8f4d37873c1b724';
                    case '113':
                        hm1.src = 'https://hm.baidu.com/hm.js?4a16c6007e2802cc0a415b4d607e2050';
                    case '114':
                        hm1.src = 'https://hm.baidu.com/hm.js?afa2735503857cac81d08fe6f13abc46';
                    case '115':
                        hm1.src = 'https://hm.baidu.com/hm.js?eb51ef718a0098a9bbcfac66062d3f0e';
                    case '116':
                        hm1.src = 'https://hm.baidu.com/hm.js?ee94d772a4cbd23a5137bd5e50ecaf34';
                    case '117':
                        hm1.src = 'https://hm.baidu.com/hm.js?fa7843dbb151eda30e6850b2a5d5006f';
                    case '118':
                        hm1.src = 'https://hm.baidu.com/hm.js?52c1153f23cf30b1614bd56f83d62036';
                    case '120':
                        hm1.src = 'https://hm.baidu.com/hm.js?fcc57f687ae77f2b8ad6d0938978bce0';
                    default:
                        hm1.src = 'https://hm.baidu.com/hm.js?3d8ae083091c839222c62a3e4ab746ee';
                }
                if (hm1.src !== '') {
                    s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(hm1, s);
                }
            }
        }
    };
    return customElement;
});
