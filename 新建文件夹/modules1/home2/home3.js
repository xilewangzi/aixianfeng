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
// ==================模版==========================
$("#milk_list").load("home3model.html",function(){
	$.getJSON("../../data/market.josn",function(data){
		var htmlStr1 = baidu.template("milk",data);
		$("#milk_list").html(htmlStr1);
	})
})

