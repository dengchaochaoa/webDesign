$(function () {
    //主页轮播效果
    turnPic();
    var $imgLi = $(".wrap .content .pics .first-page .turn-pic li");
    var from = 0,to = 1;
    function turnPic(){
        function play(from, to){
            $imgLi.eq(from).fadeOut(1000);
            $imgLi.eq(to).fadeIn(1000);
        }
        var currentIndex = 0;  //表示当前正在显示的图片的下标
        var id;
        function autoPlay(){
            id = setInterval(function (){
                play(currentIndex, (currentIndex + 1) % 2);
                currentIndex++;
                currentIndex = currentIndex == 2 ? 0 : currentIndex
            }, 3000)
        }
        autoPlay()
    }

    //中间图片墙
    // 初始化图片的位置
    var arr1 = [{w: 200, tx:800, ty:20,tz:-200},
        {w: 200, tx: 50, ty: 170,tz:-200},
        {w: 200, tx: 350, ty: 220,tz:-200},
        {w: 200, tx: 650, ty: 170,tz:-200},
        {w: 200, tx: 200, ty: 370,tz:-200},
        {w: 300, tx: 500, ty: 370,tz:-200},
        {w: 200, tx:500, ty:30,tz:200},
        {w: 200, tx: 800, ty: 300,tz:200}];
    // var $back = $(".wrap .content .pics .second-page .center .back");
    var $img = $(".wrap .content .pics .second-page .center .back li");
    console.log($img);
    for (var i = 0; i < arr1.length; i++) {
        $img[i].style.width = arr1[i].w + "px";
        $img[i].style.transform = "translate3d("+arr1[i].tx+"px,"+arr1[i].ty+"px,"+arr1[i].tz+"px)";
    }
    //所搜关键字时,提示栏出现;
    search();
    function search() {
        var searchInp = $(".search_part .search");
        searchInp.on("keyup focus", function () {
            if ($(this).val().trim().length > 0) {
                $(this).parent().css("border", "1px solid #d7c492");
                $("#search_help").slideDown(500);
            }
        }).blur(function () {
            $("#search_help").slideUp(500);
            $(this).parent().css("border", "1px solid #000");
        });
    }

    //当点击提示栏中的内容时,会自动更新到搜索框中
    helpSearch();
    function helpSearch() {
        $("#search_help").on("click", "p", function (e) {
            var val = $(this).text();
            $(this).parent().prev().val(val);
            $(this).parent().slideUp(500);
        })
    }
    //设置鼠标移入搜索框周围时,搜索框发生3d旋转
    searchRotate();
    function searchRotate(){
      var obj = $(".search_part")[0].getBoundingClientRect();
      var left = obj.left;
      var top = obj.top;
      var bottom = obj.bottom;
      var right = obj.right;
      $(".header").mousemove(function (event){
         if(event.clientX > (left - 100) && event.clientX < left
             && event.clientY < this.offsetHeight){
             $(".search_part").css("transform","rotateY(-30deg)");
         }else{
             $(".search_part").css("transform","rotateY(0deg)");
         }
          if(event.clientX < (right + 100) && event.clientX > right
              && event.clientY < this.offsetHeight){
              $(".search_part").css("transform","rotateY(30deg)");
          }else if(event.clientX > right + 100
              && event.clientY > this.offsetHeight){
              $(".search_part").css("transform","rotateY(0deg)");
          }
      })
    }

    //设置搜索框的3d效果
    //针对IE和Chrome
    var timer = null; //防止滚动滚轮时多次滑动,设置延时;
    document.onmousewheel = function (event){
        clearTimeout(timer);
        timer = setTimeout(function () {
            callBack(event);
        },300)
    };

    // 针对火狐(并兼容ie8不报错的问题)
    if(document.addEventListener){
        document.addEventListener("DOMMouseScroll",function (event){
            clearTimeout(timer);
            timer = setTimeout(function () {
                callBack(event);
            },300)
        });
    }
    var minTx = - parseInt($(".content").css("width"))*2;
    var count = 2; //设置左右翻页按钮最多可点击的次数;
    var initWidth = parseInt($(".content").css("width"));
    var tx = 0;
    var $pics = $(".wrap .content .pics");
    function callBack(event){
        event = event || window.event;
        var flag = "";
        if(event.wheelDelta){
            if(event.wheelDelta > 0){
                flag = "left";
            }else{
                flag = "right";
            }
        }else  if(event.detail){
            if(event.detail < 0){
                flag = "left";
            }else{
                flag = "right";
            }
        }
        $(".wrap .footer").css("display","none");
        // 判断Flag的值
        switch(flag){
            case "left":
                tx = +$pics.css("transform").split(",")[4] + initWidth;
                tx = tx > 0 ? 0 : tx;
                if(tx == 0){
                    $(".wrap .footer").css("display","block");
                }
                $pics.css("transform","translate("+tx+"px)");
                $(".page-change .next").show(1000);
                progressBind(tx);
                break;
            case "right":
                //限定tx大于0时让pics的translateX等于0;
                tx = +$pics.css("transform").split(",")[4] - initWidth;
                tx = tx < minTx ? minTx : tx;
                $pics.css("transform","translate("+tx+"px)");
                $(".page-change .prev").show(1000);
                progressBind(tx);
                break;
        }
        //取消dom2的默认行为并兼容IE8;
        event.preventDefault && event.preventDefault;
        //dom0取消浏览器滚动条默认行为;
        return false;
    }

    //进度条的逻辑
    var proWidth = parseInt($(".content").css("width"))**2 /(parseInt($(".content").css("width"))- minTx);
    var $proSpan = $(".wrap .progress span");
    $proSpan.css("width",""+proWidth+"px");
    var maxWidth = parseInt($(".content").css("width")) - parseInt( $proSpan.css("width"));
    function progressBind(){
        var proTr = (tx / minTx)* maxWidth;
        $proSpan.css("transform","translate("+proTr+"px)");
    }

    //给左右箭头增加点击事件
    var step =  - minTx / count;
    $(".page-change .prev").click(function (){
        tx = +$pics.css("transform").split(",")[4] + step;
        $(".page-change .next").show(1000);
        $(".wrap .footer").css("display","none");
        tx = tx > 0 ? 0 : tx;
        if(tx == 0){
            $(this).hide(1000);
            $(".wrap .footer").css("display","block");
        }
        $pics.css("transform","translate("+tx+"px)");
        progressBind(tx);
    });
    $(".page-change .next").click(function (){
        tx = +$pics.css("transform").split(",")[4] - step;
        $(".page-change .prev").show(1000);
        tx = tx < minTx ? minTx : tx;
        $(".wrap .footer").css("display","none");
        if(tx == minTx){
            $(this).hide(1000);
        }
        $pics.css("transform","translate("+tx+"px)");
        progressBind(tx);
    });

    //设置点击了解更多按钮的逻辑
    $(".wrap .content .pics .more")[0].onclick = function (){
        tx = -initWidth;
        $pics.css("transform","translate("+tx+"px)");
        $(".wrap .footer").css("display","none");
        $(".page-change .prev").show(1000);
        progressBind(tx);
    };

    //设置底部导航条的动画效果
    bottomNav();
    function bottomNav() {
        var $nav = $(".footer .sub-nav");
        $nav.on("mouseenter",".mask", function () {
            $(this).parent().prev().css("transform", "scale(1.5)");
        });
        $nav.on("mouseleave",".mask", function () {
            $(this).parent().prev().css("transform","scale(1)");
        })
    }

    //改变第三页Li的样式
    changeSeverBC();
    function changeSeverBC() {
        var $col = $(".wrap .content .third-page .service [class^=col]");
        $col.hover(function () {
            $col.eq(0).removeClass("hover");
            $(this).css("z-index", 100).siblings().css("z-index", 0);
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover").css("z-index", 0);
            $col.eq(0).addClass("hover").css("z-index",100);
        });
    }

});