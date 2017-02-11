/*commodity*/
$(function(){
	var timer=null;
	$("#commodity>ul>li").mouseover(function(){
		clearInterval(timer);//1，清除定时器
		var index=$("#commodity>ul>li").index($(this));//获取光标悬浮处索引值
		$(this).css("background-color","#0FF");//改变光标所在部分的背景样式
		$(".detal").eq(index).css("display","block");//显示索引值对应图片
		});
	$("#commodity>ul>li").mouseout(function(){
		var index=$("#commodity>ul>li").index($(this));
		$(this).css("background-color","#FFF");
		timer=setInterval(function(){
			$(".detal").eq(index).css({"display":"block","background":"#f00","border":"3px solid red"});
		},3000)
	});
	$(".detal").mouseover(function(){
		clearInterval(timer);//获取光标悬浮索引值
			}).mouseout(function(){
				$(this).css("display","none");//获取光标悬浮索引值
		});

/*轮播*/
	var images=["../images/banner1.png","../images/banner2.png","../images/banner3.png","../images/banner4.png"];
	var index=0;
	var oImg=$("#lb li a img")[0];//获取轮播图片
	function change(){//图片轮播函数
		index=(index+1)%4;
		oImg.src=images[index];
		$('#focus li').eq(index).css("border","3px solid red").siblings("li").css({"background":"#CCC","border":"none"});
	};
	var timer=setInterval(change,1500);
	oImg.onmouseover=function(){
		clearInterval(timer);
	};
	oImg.onmouseout=function(){
		timer=setInterval(change,1500);
	};
	$('#focus li').each(function(){
		$(this).mouseover(function(){
			clearInterval(timer);
			$(this).css("border","3px solid red").siblings("li").css({"background":"#CCC","border":"none"});
			var ind=$(this).index();//当前光标所在焦点索引
			oImg.src=images[ind];
		}).mouseout(function(){
			timer=setInterval(change,1500);
			var ind=$(this).index();//当前光标所在焦点索引
			oImg.src=images[ind];
		});
	});

});