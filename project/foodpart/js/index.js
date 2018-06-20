$(function (){
    addEvent();
    autoPlay();
    /*注册一些事件*/
    function addEvent(){
        $("#lbt").mouseenter(function (){
            clearInterval(id);
        }).mouseleave(function (){
            autoPlay();
        })
        $("#indicator span").click(function (){
            currentIndex = $(this).index() + 1;

            play()

            $("#indicator span").eq(currentIndex - 1).css("backgroundColor", "red")
                .siblings().css("backgroundColor", "white");
        })
        // 左右箭头按钮
        $("#preNext span:eq(1)").click(function (){
            if($("#imgs:animated").length != 0) return;
            currentIndex++;
            play();
        })
        $("#preNext span:eq(0)").click(function (){
            // 查看是否在执行动画
            if($("#imgs:animated").length != 0) return;
            currentIndex--;
            play();
        })
    }
    // 播放
    function play(){
        $("#imgs").animate({
            left : -currentIndex * $("#imgs img").width()
        }, 400, function(){
            if(currentIndex == 7){
                currentIndex = 1;
            }else if(currentIndex == 0){
                currentIndex = 6;
            }
            $(this).css("left", -currentIndex * $("#imgs img").width());
            $("#indicator span").eq(currentIndex - 1).css("backgroundColor", "red")
                .siblings().css("backgroundColor", "white");
        })
    }

    var currentIndex = 1;  //表示当前正在显示的图片的下标
    var id;  // 定时器的id
    // 自动播放
    function autoPlay(){
        id = setInterval(function (){
            currentIndex++;

            play();
        }, 2000)
    }
})