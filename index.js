// =============================================
(function(window){
	//取得当前浏览器窗口宽度client
	var winW = document.documentElement.clientWidth||document.body.clientWidth;
	//将根节点fontsize设置为宽度的十分之一
	document.documentElement.style.fontSize = winW/375*100+"px";
	//当页面大小发生改变，重新修正rem为新窗口尺寸的十分之一。
	window.onresize =function(){
		document.documentElement.style.fontSize =(document.documentElement.clientWidth||document.body.clientWidth)/375*100+"px";
	}
})(window);
// =========================================================
//require配置路径//配置路径信息
require.config({
	paths:{
	"jquery":"./lib/jquery-1.11.2",
	"text":"./lib/text",
	"css":"./lib/css",
	"underscore":"./lib/underscore",
	"backbone":"./lib/backbone",
	"baiduTemplate":"./lib/baiduTemplate",
	"home":"modules/home/home",
	"market":"modules/market/market",
	"cart":"modules/cart/cart",
	"mine":"modules/mine/mine",
	"jqueryfly":"./lib/jquery.fly.min"
	}
});
//开启路由监听
require(["backbone","router","underscore"],function(Backbone){
	Backbone.history.start();
});
