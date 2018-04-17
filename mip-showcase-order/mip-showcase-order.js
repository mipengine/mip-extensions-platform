/**
 * @file mip-showcase-order 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var util = require('util');
    var templates = require('templates');

    function Order(element) {
    	this.element = element;
    	this.src = this.element.getAttribute('src') || '';
    }
    
    Order.prototype.start = function () {
    	this.getData();	
    };
    
    Order.prototype.render = function (res) {
    	var self = this;
    	var TPL = [
    		'<div>',
	    		'<template type="mip-mustache">',
		    		'<div class="area">',
		    			'<ul class="list">',
							'<li>',
								'<span>品名</span>',
								'<span>单价</span>',
								'<span>数量</span>',
								'<span>金额</span>',
								'<span>取消</span>',
							'</li>',
							'{{#data.products}}',
								'<li class="item">',
									'<span class="desc">',
										'<span>{{title}}</span>',
										'<span>{{etitle}}</span>',
										'<span>{{desc}}</span>',
									'</span>',
									'<span>',
										'<span class="price">{{price}}</span>',
										' X ',
									'</span>',								
									'<span>',
										'<input class="num" type="text" value={{num}}>',
									'</span>',
									'<span class="prices"></span>',
									'<span class="btn-outer">',
										'<button class="cancel">取消</button>',
									'</span>',								
								'</li>',
							'{{/data.products}}',
						'</ul>',
						'<div class="deal">',
							'<button class="clear-all">清空</button>',
							'<span class="total">合计：￥<span class="total-price"></span></span>',
						'</div>',
		    		'</div>',
					'<mip-form method="get" url="" class="info area">',
						'<div class="cart-item">',
							'<span>所属区域</span>',
							'<select class="cartitem-right">',
								'{{#data.info.region}}',
									'<option>{{.}}</option>',
								'{{/data.info.region}}',
							'</select>',
						'</div>',
						'<div class="cart-item">',
							'<span>姓名</span>',
							'<input class="cartitem-right" type="text" placeholder="请填入姓名姓名" value="{{data.info.name}}">',
						'</div>',
						'<div class="cart-item">',
							'<span>手机号码</span>',
							'<input class="cartitem-right" type="text" placeholder="请填入手机号码" value="{{data.info.phone}}">',
						'</div>',
					    '<div class="cart-item">',
					    	'<span>详细地址</span>',
						    '<input class="cartitem-right" type="text" placeholder="请填入详细地址" value="{{data.info.detail}}">',
						'</div>',						
					'</mip-form>',
				'<template>',
			'</div>'].join('');
		var dom = util.dom.create(TPL);
		templates.render(dom, res).then(function (html) {
			this.element.innerHTML = html;
			this.bindEvent();
			this.calculate();
        }.bind(this));
    };
    
    Order.prototype.bindEvent = function () {
    	var list = document.querySelector('.list');    	
    	util.event.delegate(list, 'input', 'input', this.calculate);
    	util.event.delegate(list, 'button[class="cancel"]', 'click', this.remove.bind(this));    	
    	var cancel = document.querySelector('[class="clear-all"]');
    	cancel.addEventListener('click', this.clear.bind(this));
    };
    
    Order.prototype.clear = function () {    	
    	var list = document.querySelectorAll('.list .item');
    	for (var i = 0; i < list.length; i++) {
    		list[i].remove();
    	};
    	this.calculate();
    };
    
    Order.prototype.remove = function (e) {
    	var parent = e.target.parentNode.parentNode;
		parent.remove();
		this.calculate();
    };
    
    Order.prototype.calculate = function () {
    	var list = document.querySelectorAll('.item');
    	var totalEle = document.querySelector('.total-price');
    	var totalPrice = 0;
    	for (var i = 0; i < list.length; i++) {
    		var ele = list[i];
    		var num = ele.querySelector('.num');
    		var price = ele.querySelector('.price');
    		var prices = ele.querySelector('.prices');
    		var total = num.value * price.innerText;
    		prices.innerText = isNaN(total) ? 0 : total;
    		totalPrice += total;
    	}
    	totalEle.innerText = totalPrice;
    }
    
    Order.prototype.getData = function () {
    	var self = this;
    	fetch(self.src, {
            // credentials: 'include',
            method: 'POST'
        }).then(function (res) {
            if (res.ok) {
            	res.json().then(function (data) {
                    if (data.errno === 0) {
                    	self.render(data);
                    }
                    else {
                    	console.error(data.errmsg);
                    }
                });                
            }
            else {
                console.error('Fetch rquest failed!');
            }
        }).catch(function (e) {
            console.error(e);
        });
    };

    customElement.prototype.firstInviewCallback = function () {
        new Order(this.element).start();
    };

    return customElement;
});
