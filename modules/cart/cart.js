//定义路由模块
define(["jquery","text!modules/cart/cart.html","css!modules/cart/cart.css","baiduTemplate"],function($, cartPage){
	return{
		init:function(){
			$("#main").html(cartPage);
			var goods = JSON.parse(localStorage.goods);
			var htmlStr = baidu.template("catr_tablemb",{data:goods.good});
			$("#catr_table").html(htmlStr);
		}
	}
});
// =============================================
;(function(window){
	//取得当前浏览器窗口宽度client
	var winW = document.documentElement.clientWidth||document.body.clientWidth;
	//将根节点fontsize设置为宽度的十分之一
	document.documentElement.style.fontSize = winW/375*100+"px";
	//当页面大小发生改变，重新修正rem为新窗口尺寸的十分之一。
	window.onresize =function(){
		document.documentElement.style.fontSize =(document.documentElement.clientWidth||document.body.clientWidth)/375*100+"px";
	}
})(window);

//