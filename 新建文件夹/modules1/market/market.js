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
// ==============点击出弹出框===============
$(".right_hed").find("a").on("click",function(){
	$(".all_show").toggle();
})
// =========================模版部分============================
// ========================超市左边的模版=============================
$("#leftmb").load("marketmodel1.html",function(){
	$.getJSON("../../data/market.josn",function(data){
		//当点击左侧按钮时，右侧加载出现
		$("#leftmb").on("click","li",function(){
			$(this).addClass("liborder").siblings("li").removeClass("liborder");			
			//有全局变量接受自定义的id属性值传入右侧加载模版中
			window.data_id=$(this).attr("data_id");
			//当点击时 加载右边
			$("#rightmb").load("marketmodel2.html",function(){
				$.getJSON("../../data/market.josn",function(data){
					//传入id值
					var htmlStr1= baidu.template("marketright",{result:data.data.products[data_id]});
					$("#rightmb").html(htmlStr1);
					//购物车
					$(function() { 
					    var offset = $("#end").offset();
					    $(".add").click(function(event){ 
					        var addcar = $(this); 
					        var img = addcar.attr('data-img'); 
					        console.log(img)
					        var flyer = $('<img class="u-flyer"  src="'+img+'">'); 
					        flyer.fly({ 
					            start: { 
					                left: event.pageX-250, //开始位置（必填）#fly元素会被设置成position: fixed 
					                top: event.pageY-120 //开始位置（必填） 
					            }, 
					            end: { 
					                left: offset.left+10, //结束位置（必填） 
					                top: offset.top+10, //结束位置（必填） 
					                width: 0, //结束时宽度 
					                height: 0 //结束时高度 
					            }, 
					            onEnd: function(){ //结束回调 
					                // $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000); //提示信息 
					                // addcar.css("cursor","default").removeClass('orange').unbind('click'); 
					                this.destory(); //移除dom 
					            } 
					        }); 
					    }); 
					}); 
				});
			});
		})
		//左侧模版
		var htmlStr= baidu.template("marketleft",data);
		$("#leftmb").html(htmlStr);
	})
});
//========================超市右边的模版=============================
$("#rightmb").load("marketmodel2.html",function(){
	$.getJSON("../../data/market.josn",function(data){
		var htmlStr1= baidu.template("marketright",{result:data.data.products[104749]});
		$("#rightmb").html(htmlStr1);

		window.count = 0;
		$("#rightmb").on("click",".add",function(){
			$(this).siblings(".red").show();
			count=Number($(this).siblings(".num1")[0].innerHTML);
			count++;
			$(this).siblings(".num1").text(count);
		});
		$("#rightmb").on("click",".red",function(){
			count=Number($(this).siblings(".num1")[0].innerHTML);
			count--;
			$(this).siblings(".num1").text(count);
			if(count==0){
				$(this).hide();
				$(this).siblings(".num1").text(" ");
			}
		});

		//购物的动画效果
		$(function() { 
		    var offset = $("#end").offset(); 
		    $(".add").click(function(event){ 
		    	console.log("rtyui1");
		        var addcar = $(this); 
		        var img = addcar.attr('data-img'); 
		        console.log(img)
		        var flyer = $('<img class="u-flyer"  src="'+img+'">'); 
		        flyer.fly({ 
		            start: { 
		                left: event.pageX-250, //开始位置（必填）#fly元素会被设置成position: fixed 
		                top: event.pageY-120 //开始位置（必填） 
		            }, 
		            end: { 
		                left: offset.left+10, //结束位置（必填） 
		                top: offset.top+10, //结束位置（必填） 
		                width: 0, //结束时宽度 
		                height: 0 //结束时高度 
		            }, 
		            onEnd: function(){ //结束回调 
		                // $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000); //提示信息 
		                // addcar.css("cursor","default").removeClass('orange').unbind('click'); 
		                this.destory(); //移除dom 
		            } 
		        }); 
		    }); 
		}); 
	});
});
// =================底部的菜单点击发生图片变化======================
$(".end2").on("click",function(){
	$(this).find("div").css({"background-image":"url(image/xiazei2.png)"})
	console.log($(this).find("div"))
})
// =================点击购物车数字增加========================================

// document.getElementsByClassName('red')[0].onclick =function(){
// 	count--;
// 	$(".num1").text(count);
// 	if(count=0){
// 		$(".red").hide();
// 		$(".num1").text(" ");
// 	}
// }
// var count = 0;
// document.getElementsByClassName('add')[0].onclick=function(e){
// 	e =e ||window.event
// 	switch(e.target.attribute.data_id){
// 		case ""
// 	}
// 		count++;
// 	$(".num1").text(count);
// 	$(".red").show();
// }