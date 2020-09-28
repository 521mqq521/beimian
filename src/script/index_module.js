define([], function() {
    return {
        init: function() {
            //列表table切换
            (function() {
                const $yiru = $('.yiru');
                const $project = $(".project");
                $yiru.on('mouseover', function() {
                    $(this).addClass('active').siblings('.yiru').removeClass('active');
                    $project.eq($(this).index()).show().siblings('.project').hide();
                });
                $yiru.on('mouseout', function() {
                    $project.hide();
                    $yiru.removeClass('active');
                })
                $yiru.on('mousemove', function() {
                    $project.show();
                })
            })();





            //table切换1

            (function() {
                const $ull = $('.showbox .ul2');
                const $lii = $('.chose-nav ul li ');
                $lii.on('click', function() {

                    $(this).find('a').addClass('active')

                    $(this).siblings().find('a').removeClass('active')

                    $ull.eq($(this).index()).show().siblings('.showbox .ul2').hide();
                })



            })();

            //渲染
            (function() {
                const $list = $('.the-vipeak');
                $.ajax({
                    url: 'http://192.168.13.48/beimian/php/zuijia.php',
                    dataType: "json",
                }).done((data) => {
                    // console.log(1);
                    // console.log(data);
                    let $renderdata = data;
                    let $str = '';
                    $.each($renderdata, function(index, value) {
                        $str += `
                        <li>
                        <a>
                        <img class="img3" src="${value.url}"/>
                        </a>
                        </li> 
                  `
                    })
                    $list.html($str);
                })
            })();






            //置顶
            (function() {
                const $nav = $('.box1');
                $(window).on('scroll', function() {
                    let $top = $(window).scrollTop(); //获取滚动条的top值。
                    if ($top >= 80) {
                        $nav.stop(true).animate({
                            top: 0
                        });
                    } else {
                        $nav.stop(true).animate({
                            top: -100
                        });
                    }
                });
            })();


            //换灯片1
            // let $liwd = $('.slide ul li').first.width(); //获取第一个li的宽度
            // let index = 0;
            // $('.slide ul').width($('.slide ul li').length * $liwd + 'px');
            // $('.slide ol li').on('click', function() {
            //     index = $(this).index() - 1;
            //     move();
            // })
            // function move(){
            //     index++;
            //     if(index===$('.slide '))
            // }














            let $liW = $(' .slide ul li').first().width();
            let index = null;
            $('.slide ul').width($('.slide ul li').length * $liW + 'px');
            $(".slide ol li").click(function() { //小圆点切换图片
                index = $(this).index() - 1;
                move();
            });
            let $timer = setInterval(move, 3000); //自动轮播
            function move() { //右移
                index++;
                if (index === $(".slide ol li").length + 1) {
                    $('.slide ul').css({
                        left: 0
                    })
                    index = 1
                }
                if (index === $(".slide ol li").length) {
                    $(".slide ol li").eq(0).addClass("active").siblings().removeClass("active");
                }
                if (index === -1) {
                    $('.slide ul').css({
                        left: -($('.slide ul li').length - 1) * $liW + 'px'
                    })
                    index = $(".slide ol li").length - 1;
                }
                $(".slide ol li").eq(index).addClass("active").siblings().removeClass("active");
                $(".slide ul").stop(true).animate({ left: -$liW * index });
            };
            $('#left').click(function() { //点击左箭头
                index -= 2;
                move();
            });
            $('#right').click(function() { //点击右箭头
                move();
            });
            $(".slide").hover(function() { //鼠标移入暂停，移出继续
                    $('#left').css({
                        display: 'block'
                    });
                    $('#right').css({
                        display: 'block'
                    })
                    clearInterval($timer);
                },
                function() {
                    $('#left').css({
                        display: 'none'
                    });
                    $('#right').css({
                        display: 'none'
                    })
                    $timer = setInterval(move, 3000);
                });




            //换灯片2
               
        }

    }

})