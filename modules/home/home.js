//===============================================
define(["jquery","text!modules/home/home.html","css!modules/home/home.css","baiduTemplate"],function($,homePage){
	return{
		init:function(){
			//获取数据
			//添加模版到页面
			$("#main").html(homePage);
			$.getJSON("data/home.json",function(data){
				//生成带数据的html片段
					var htmlStr = baidu.template("home2mb",data);
					$("#home1mb2").html(htmlStr);
					var htmlStr1 = baidu.template("home3mb",data);
					$("#home1mb3").html(htmlStr1);
					var htmlStr2 = baidu.template("home4mb",data);
					$("#home1mb4").html(htmlStr2);
					var htmlStr3 = baidu.template("home1mb",data);
					$("#home1mb1").html(htmlStr3);
				})
			}
		}	
});




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
// ==============home1模版 也可以为了好用使用下一个=======================
// $("#home1mb1").load("home1modle.html",function(){
// 	console.log("ertyui");
// 	$.getJSON("../../data/home.json",function(data){
// 		console.log(data);
// 		var htmlStr = baidu.template("home1mb",data);
// 		console.log(htmlStr);
// 		$("#home1mb1").html(htmlStr);
// 		console.log("hkj")
// 	})
// });

// $(function(){
// 	$.getJSON("../../data/home.json",function(data){
// // ===================home1模版=============================
// 		$("#home1mb1").load("home1modle.html",function(){
// 			var htmlStr = baidu.template("home1mb",data);
// 			// console.log(htmlStr);
// 			$("#home1mb1").html(htmlStr);
			
// 		});
// 	});
// });
// //===============6个大块home2模版==============================
// $("#home1mb2").load("home2modle.html",function(){
// 	$.getJSON("../../data/home.json",function(data){
// 		var htmlStr1 = baidu.template("home2mb",data);
// 		$("#home1mb2").html(htmlStr1);
// 	})
// });
// //=====================home3模版==============================
// $("#home1mb3").load("home3modle.html",function(){
// 	console.log("ertyui");
// 	$.getJSON("../../data/home.json",function(data){
// 		console.log(data);
// 		var htmlStr2 = baidu.template("home3mb",data);
// 		console.log(htmlStr2);
// 		$("#home1mb3").html(htmlStr2);
// 		console.log("hkj")
// 	})
// });
// //=====================home4模版==============================
// $("#home1mb4").load("home4modle.html",function(){
// 	console.log("3ui");
// 	$.getJSON("../../data/home.json",function(data){
// 		var htmlStr3 = baidu.template("home4mb",data);
// 		console.log(htmlStr3);
// 		$("#home1mb4").html(htmlStr3);
// 	})
// });



