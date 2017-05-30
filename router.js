//定义路由模块
define("router",["backbone"],function(Backbone){
	console.log()
	var Router = Backbone.Router.extend({
		routes:{
			"":"home",
			"home":"home",
			"market":"market",
			"cart":"cart",
			"mine":"mine"
		},
		"home":function(){
			require(["home"],function(homeMode){
				homeMode.init();
			})
		},
		"market":function(){
			require(["market"],function(marketMode){
				marketMode.init();
			})
			
		},
		"cart":function(){
			require(["cart"],function(cartMode){
				cartMode.init();
			})
		},
		"mine":function(){
			require(["mine"],function(mineMode){
				mineMode.init();
			})
		}
	});
	return new Router();
});