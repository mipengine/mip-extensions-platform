/**
 * @file mip-jdd-sort 组件
 * @author yangtong
 */
/*使用说明  :
方法1:
new TableSorter("tb1");
效果:
id为tb1的table的第一行任意单元格都可以点击进行排序.
方法2:
new TableSorter("tb1", 0, 1, 3);
效果:
id为tb1的table的第一行0,1,3单元格可以进行点击排序.
*/
define(function (require) {
    var args;
    function TableSorter(table) {
        this.Table = table;
        if (this.Table.children.length <= 1) {
            return;
        }

        args = arguments;
        // this.Init(arguments);
    }
    // 以下样式针对表头的单元格.
    TableSorter.prototype.NormalCss = 'normal'; // 没有执行排序时的样式.
    TableSorter.prototype.SortAscCss = 'up'; // 升序排序时的样式.
    TableSorter.prototype.SortDescCss = 'down'; // 降序排序时的样式.
    TableSorter.prototype.notSort = 'notSort'; // 不排序字段的样式.
    // 初始化table的信息和操作.
    TableSorter.prototype.init = function (element) {
        this.ViewState = [];
        this.sortBtn = element;
        for (var x = 0; x < element.children.length; x++) {
            this.ViewState[x] = true;
        }
        if (args.length > 1) {
            for (var x = 1; x < args.length; x++) {
                if (args[x] > element.children.length) {
                    continue;
                }
                else if (!this.hasClass(element.children[args[x]], this.notSort)) {
                    element.children[args[x]].onclick = this.getFunction(this, 'Sort', args[x]);
                    // element.children[args[x]].style.cursor = "pointer";
                }

            }
        }
        else {
            for (var x = 0; x < element.children.length; x++) {
                if (!this.hasClass(element.children[x], this.notSort)) {
                    element.children[x].onclick = this.getFunction(this, 'Sort', x);
                }

                // element.children[x].style.cursor = "pointer";
            }
        }
    };
    // 取得指定对象的脱壳函数.
    TableSorter.prototype.getFunction = function (variable, method, param) {
        return function () {
            variable[method](param);
        };
    };
    // 执行排序.
    TableSorter.prototype.Sort = function (col) {
        var SortAsNumber = true;
        for (var x = 0; x < this.sortBtn.children.length; x++) {
            if (this.sortBtn.children[x].className !== this.notSort) {
                this.sortBtn.children[x].className = this.NormalCss;
            }

        }
        var Sorter = [];
        for (var x = 0; x < this.Table.children.length; x++) {
            var num = this.Table.children[x].children[col].getAttribute('title');
            Sorter[x] = [num || this.Table.children[x].children[col].innerHTML, x];
        }
        if (SortAsNumber) {
            for (var x = 0; x < Sorter.length; x++) {
                for (var y = x + 1; y < Sorter.length; y++) {
                    if (this.getNumber(Sorter[y][0]) < this.getNumber(Sorter[x][0])) {
                        var tmp = Sorter[x];
                        Sorter[x] = Sorter[y];
                        Sorter[y] = tmp;
                    }

                }
            }
        }
        else {
            Sorter.sort();
        }
        if (this.ViewState[col]) {
            Sorter.reverse();
            this.ViewState[col] = false;
            this.sortBtn.children[col].className = this.SortDescCss;
        }
        else {
            this.ViewState[col] = true;
            this.sortBtn.children[col].className = this.SortAscCss;
        }
        var Rank = [];
        for (var x = 0; x < Sorter.length; x++) {
            Rank[x] = this.getRowHtml(this.Table.children[Sorter[x][1]]);
        }
        for (var x = 0; x < this.Table.children.length; x++) {
            for (var y = 0; y < this.Table.children[x].children.length; y++) {
                this.Table.children[x].children[y].innerHTML = Rank[x][y];
                var title = Rank[x].title[y];
                if (title) {
                    this.Table.children[x].children[y].setAttribute('title', title);
                }

            }
        }
        this.onSorted(this.sortBtn.children[col], this.ViewState[col]);
    };
    // 取得指定行的内容.
    TableSorter.prototype.getRowHtml = function (row) {
        var result = [];
        result.title = [];
        for (var x = 0; x < row.children.length; x++) {
            result[x] = row.children[x].innerHTML;
            var title = row.children[x].getAttribute('title');
            if (title) {
                row.children[x].setAttribute('title', '');
                result.title[x] = title;
            }

        }
        return result;
    };
    TableSorter.prototype.isNumeric = function (num) {
        return /^\d+(\.\d+)?$/.test(num);
    };
    TableSorter.prototype.getNumber = function (str) {
        return parseFloat(str.replace(/[^0-9]/ig, ''));
    };
    // 可自行实现排序后的动作.
    TableSorter.prototype.onSorted = function (cell, IsAsc) {
        return;
    };
    TableSorter.prototype.hasClass = function (ele, className) {
        var className = ele.getAttribute('class');
        return className && className.indexOf(this.notSort) !== -1;
    };
    return TableSorter;
});
