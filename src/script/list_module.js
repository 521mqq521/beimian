define(['pagination', 'jlazyload'], function() {
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



            //渲染
            let array_default = []; //排序前的li数组，默认数组
            let array = []; //排序中的数组
            let prev = null; //前一个价格
            let next = null; //后一个价格
            const $list = $('.list');
            $.ajax({
                url: 'http://192.168.13.48/beimian/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '<ul>';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}" target="_blank">
                                <img class="lazy" data-original="${value.img}" width="200" height="200"/>
                                <p>${value.sid}${value.title}</p>
                                <span class="price">￥${value.pic}</span>
                            </a>
                        </li>
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);

                //重置数组
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面的li元素追加到两个数组中。
                $('.list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });

                //懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            });




            $('.page').pagination({
                pageCount: 5, //总的页数 - 后端传入的。
                jump: true, //是否开启跳转到指定的页数，布尔值。
                coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取的页码给后端
                    $.ajax({
                        url: 'http://192.168.13.48/beimian/php/listdata.php',
                        data: {
                            page: api.getCurrent() //传输页面
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        console.log(1);
                        let $strhtml = '<ul>';
                        $.each(data, function(index, value) {
                            $strhtml += `
                                <li>
                                    <a href="detail.html?sid=${value.sid}" target="_blank">
                                        <img class="lazy" data-original="${value.img}" width="200" height="200"/>
                                        <p>${value.sid}${value.title}</p>
                                        <span class="price">￥${value.pic}</span>
                                    </a>
                                </li>
                            `;
                        });
                        $strhtml += '</ul>';
                        $list.html($strhtml);

                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });

                        //重置数组
                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;
                        //将页面的li元素追加到两个数组中。
                        $('.list li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    });
                }
            });

            //默认排序
            $('button').eq(0).on('click', function() {
                //array_default = [li,li,li,li......]
                $.each(array_default, function(index, value) {
                    $('.list ul').append(value);
                });
                return;
            });

            // 升序
            $('button').eq(1).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1)); //获取上一个价格
                        next = parseFloat(array[j + 1].find('.price').html().substring(1)); //获取下一个价格
                        //通过价格的判断，改变的是li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function(index, value) {
                    $('.list ul').append(value);
                });
            });

            //降序

            $('button').eq(2).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev1 = parseFloat(array[j].find('.price').html().substring(1)); //获取上一个价格
                        next1 = parseFloat(array[j + 1].find('.price').html().substring(1)); //获取下一个价格
                        //通过价格的判断，改变的是li的位置。
                        if (prev1 < next1) {
                            let temp1 = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp1;
                        }
                    }
                }
                $.each(array, function(index, value) {
                    $('.list ul').append(value);
                });
            });



        }
    }
})