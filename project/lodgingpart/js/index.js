;(function () {
    $(function () {
        scrollBar();
        hotImageHandler();
        handelLi();

        //滚动条部分
        function scrollBar() {
            var inner = $(".inner");
            var wrap = $(".wrap");
            var content = $(".content");
            // 获得滚动条里面滑块的高度
            var scaleH = wrap.height() / content.height();
            var h = scaleH * $(".wrap").height();
            inner.css("height", h + "px");


            var eleY = 0;
            var startY = 0;
            var top;
            // 当鼠标拖动时候,滚动条滚动
            inner.mousedown(function (e) {
                e = e || window.e;
                eleY = inner.offset().top;
                startY = e.clientY;
                inner.setCapture && inner.setCapture();
                $(document).mousemove(function (e) {
                    e = e || window.e;
                    var disY = e.clientY - startY;
                    top = disY + eleY;
                    if (top < 0) {
                        top = 0
                    } else if (top > $(document).height() - inner.height()) {
                        top = $(document).height() - inner.height();
                    }
                    inner.css("top", top + "px");
                    content.css("top", (-top / scaleH + 100) + "px");

                    $(document).mouseup(function () {
                        $(document).off("mousemove");
                        $(document).off("mouseup");
                        document.releaseCapture && document.releaseCapture();
                    });

                    return false;

                })


            })
            //添加滚轮事件
            //滚轮
            //ie/chrome
            document.onmousewheel = fun;
            //firefox
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', fun);
            }

            function fun(e) {
                e = e || window.e;

                //是否向上还是是否向下
                var flag = '';
                var add = 0;
                if (e.wheelDelta) {
                    // ie/chrome
                    if (e.wheelDelta > 0) {
                        //向上
                        flag = 'up';
                        add = -5;
                    } else {
                        //向下
                        flag = 'down';
                        add = 5;
                    }


                } else if (e.detail) {
                    //firefox
                    if (e.detail < 0) {
                        //向上
                        flag = 'up';
                        add = -5;
                    } else {
                        //向下
                        flag = 'down';
                        add = 5;
                    }
                }
                var innerTop = inner.offset().top + add;
                if (innerTop < 0) {
                    innerTop = 0
                } else if (innerTop > $(document).height() - inner.height()) {
                    innerTop = $(document).height() - inner.height();
                }

                switch (flag) {
                    case 'up':
                        inner.css("top", innerTop + "px");
                        content.css("top", (-innerTop / scaleH + 100) + "px");
                        break;
                    case 'down':
                        inner.css("top", innerTop + "px");
                        content.css("top", (-innerTop / scaleH + 100) + "px");
                        break;
                }

                //取消默认行为
                event.preventDefault && event.preventDefault();
                return false;

            }


        }

        //热门部分滚动
        function hotImageHandler() {
            var lt = $(".hot .hot2 .more span.lt");
            var gt = $(".hot .hot2 .more span.gt");
            var hotList = $(".hot .hot2 .hot-list");
            var item = $(".hot .hot2 .hot-list li:eq(1)");
            var item1 = $(".hot .hot2 .hot-list li:eq(0)");
            var left = item.offset().left - item1.offset().left;
            var lastLeft = 0;

            gt.click(function () {
                var tx = lastLeft - left;
                if (tx == -1260) {
                    tx = -1260;
                    gt.css("display", "none");
                }
                hotList.css({
                    transition: "transform 1s",
                    transform: "translate(" + tx + "px)"
                });
                lastLeft -= left;
                lt.css("display", "block");
            });
            lt.click(function () {
                gt.css("display", "block");
                var tx = lastLeft + left;
                if (tx >= 0) {
                    tx = 0;
                    lt.css("display", "none");
                }
                hotList.css({
                    transition: "transform 1s",
                    transform: "translate(" + tx + "px)"
                });
                lastLeft += left;
            })


        }

        // 切换我们的故事变换
        function handelLi() {
            // var exBottom1 = $(".left .ex-bottom");
            // var exBottom2 = $(".right .ex-bottom");
            // var items1 = $(".experience .experience1 .ex-content .left .item");
            // var items2 = $(".experience .experience1 .ex-content .right .item");
            // exBottom1.on("mouseenter", "li", function (e) {
            //     if(e.target.toString() != "[object HTMLLIElement]") return;
            //     var index = $(this).index(".experience .experience1 .ex-content .left ul li");
            //     $(this).addClass("active").siblings().removeClass("active");
            //     items1.eq(index).addClass("active").siblings().removeClass("active");
            // });
            // exBottom2.on("mouseenter", "li", function (e) {
            //     if(e.target.toString() != "[object HTMLLIElement]") return;
            //     var index = $(this).index(".experience .experience1 .ex-content .right ul li");
            //     $(this).addClass("active").siblings().removeClass("active");
            //     items2.eq(index).addClass("active").siblings().removeClass("active");
            // })

            var exBottoms = $(".ex-bottom");
            var items = $(".experience .experience1 .ex-content .item");
            exBottoms.on("mouseenter", "li", function (e) {
                if(e.target.toString() != "[object HTMLLIElement]") return;
                var index = $(this).index(".experience .experience1 .ex-content ul li");
                $(this).addClass("active").siblings().removeClass("active");
                items.eq(index).addClass("active").siblings().removeClass("active");
            });

        }
    })


})();