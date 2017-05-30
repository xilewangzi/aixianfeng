
//使用define定义模块
define(["jquery","text!modules/market/market.html","css!modules/market/market.css","baiduTemplate","jqueryfly"],function($,homePage){
	return{
		init:function(){
			//加载模块
			$("#main").html(homePage);
			//获取数据
			$.getJSON("data/market.josn",function(data){
				//左边模块的数据写入
				var htmlStr= baidu.template("marketleft",data);
				$("#leftmb").html(htmlStr);
				//右边模版的数据写入
				var htmlStr1= baidu.template("marketright",{result:data.data.products[104749]});
				$("#rightmb").html(htmlStr1);
				//购物车使用动画
				goodscar();
				//左边的列表点击时，右边刷新出现新的商品
				$("#leftmb").on("click","li",function(){
					//样式
					$(this).addClass("liborder").siblings("li").removeClass("liborder");			
					//有全局变量接受自定义的id属性值传入右侧加载模版中
					window.data_id=$(this).attr("data_id");
					//当点击时 加载右边
					$("#rightmb").load("modules/market/market.html",function(){
						$.getJSON("data/market.josn",function(data){
							//传入id值
							var htmlStr1= baidu.template("marketright",{result:data.data.products[data_id]});							//购物车使用动画
							goodscar();
							$("#rightmb").html(htmlStr1);
						});
					});
				});//onclick
				window.count = 0;
				//addShoppingCart();
				//购物车的加减数量
				$("#rightmb").on("click",".add_market",function(){

					var dataId=$(this).attr("data-id"),
						dataName = $(this).attr("data-name"),
						dataImg = $(this).attr("data-img"),					
						dataPrice = $(this).attr("data-price"),
						className = $(this);
						console.log(dataId+"名字"+dataName+"图片"+dataImg+"价格"+dataPrice+"className"+className)
						//传入本地存储
					addShoppingCart(dataName,dataId,dataPrice,dataImg,className);

					    //减号显示
						$(this).siblings(".red_market").show();
						//购物数字显示
						$(".num_good").show();

						//
						if($(this).siblings(".num1_market").text()>=0){
							//减号显示
							$(this).siblings(".red_market").show();
						}else{
							//减号
							$(this).siblings(".red_market").hide();
						}
						var goods = JSON.parse(localStorage.goods);
						for(var i = 0;i<goods.good.length;i++){
							//数量写入
							$(this).siblings(".num1_market").text(goods.good[i].num);
						}
						//总数
						$(".num_good").text((goods.total_data.total));
				});
				// function 



				if($(".num_good").text()>=1){
					//购物数字显示
					$(".num_good").show();
				}else{
					//购物数字显示
					$(".num_good").hide();
				}



				//点击减号
				// $("#rightmb").on("click",".red_market",function(){
				// 	var dataId=$(this).attr("data-id");
				// 	delGoodFromCart(dataId);
				// 	$(".num_good").text((goods.total_data.total));





				// 	// count=Number($(this).siblings(".num1_market")[0].innerHTML);
				// 	// count--;
				// 	// $(this).siblings(".num1_market").text(count);
				// 	// $(".num_good").text(count);
				// 	// if(count==0){
				// 	// 	$(this).hide();
				// 	// 	$(this).siblings(".num1_market").text(" ");
				// 	// 	$(".num_good").hide();
				// 	// 	$(".num_good").text(" ");
				// 	// }
				// });
				//顶部的弹出框
				$(".right_hed").find("a").on("click",function(){
					$(".all_show").toggle();
				});
			});
		}
	}
});

//==================购物车动画====================
function goodscar(){ 
    var offset = $("#end").offset();
    $(".right_list_ul").on("click",".add_market",function(event){ 
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
}
//================================本地存储购物车===============
//加数量
function addShoppingCart(name,id,price,pic,className){
	var isSave=false;
	//取回goods变量
	var goods = localStorage.getItem("goods");
	//把字符串转换成JSON对象
		goods = JSON.parse(goods);
	//如果不为空，则判断购物车中是否包含了当前购买的商品
		if(goods!=null&&goods!="undefined"){
			var objs = goods.good;
			//购物总计
			var sums=goods.total_data;
			//
			for(var i = 0; i<objs.length; i++){
				isSave=false;
				//说明该商品已在购物车，则数量加1
				if(objs[i].id == id){
					objs[i].num+=1;
					sums.total+=1;
					isSave=true;
					break;
				}
			}
			if(!isSave){
			objs[objs.length] = {id:id,name:name,price:price,pic:pic,num:1};
			sums.total+=1;
			}
		}else{
			//要存储的JSON对象
			var goods = {
				good:[{id:id,name:name,price:price,pic:pic,num:1}],
				total_data:{total: 1}
			}
		}
		$(".num_good").text((goods.total_data.total));
		//将JSON对象转化成字符串
		goods = JSON.stringify(goods);
		//用localStorage保存转化好的的字符串
		localStorage.setItem("goods",goods);			
}


//减少数量
// function delShoppingCart(id){
// 	var isSave=false;
// 	//取回goods变量
// 	var goods = localStorage.getItem("goods");
// 	//把字符串转换成JSON对象
// 		goods = JSON.parse(goods);
// 	//如果不为空，则判断购物车中是否包含了当前购买的商品
// 		if(goods!=null&&goods!="undefined"){
// 			var objs = goods.good;
// 			//购物总计
// 			var sums=goods.total_data;
// 			//
// 			for(var i = 0; i<objs.length; i++){
// 				isSave=false;
// 				//说明该商品已在购物车，则数量加1
// 				if(objs[i].id == id){
// 					objs.splice(i, 1);
// 					sums.total-=1;
// 					isSave=true;
// 					break;
// 				}else{
// 					objs[i].num-=1;
// 					sums.total-=1;
// 					break;
// 				}
// 			}
// 		}
// 		$(".num_good").text((goods.total_data.total));
// 		//将JSON对象转化成字符串
// 		goods = JSON.stringify(goods);
// 		//用localStorage保存转化好的的字符串
// 		localStorage.setItem("goods",goods);			
// }






// function delShoppingCart(id, show){
// 	if(localStorage.goods!=null&&localStorage.goods!="undefined"){
// 		var goods = localStorage.getItem("goods");//取回goods变量
// 		goods = JSON.parse(goods);//把字符串转换成JSON对象
// 		var objs=goods.good;//商品数组
// 		var nums=goods.total_count;//商品总数量
// 		for(var i=0;i<objs.length;i++){
// 			if(objs[i].id==id){ //说明该商品已在购物车，则数量减1
// 				if(objs[i].num==1){
// 					objs.splice(i, 1);
// 					show.text(0);//显示单个商品数量
// 					nums.total-=1;
// 				}else{
// 					objs[i].num-=1;
// 					show.text(objs[i].num);
// 					nums.total-=1;
// 					break;
// 				}		
// 			}
// 		}
// 		goods = JSON.stringify(goods);
// 		localStorage.setItem("goods", goods);
// 	}else{
// 		return
// 	}
			
// }





// ====================视口字体的设置=========================
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

// // // =================底部的菜单点击发生图片变化======================
// $(".end2").on("click",function(){
// 	$(this).find("div").css({"background-image":"url(image/xiazei2.png)"})
// 	console.log($(this).find("div"))
// })
// // =================点击购物车数字增加========================================

