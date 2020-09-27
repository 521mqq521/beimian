define(['jquery'], function() {
    return {
        init: function() {
            //table切换
            const $yiru = $('.yiru');
            const $project = $(".project");
            $yiru.on('mousemove', function() {
                $(this).addClass('active').siblings('.yiru').removeClass('active');
                $project.eq($(this).index()).show().siblings('.project').hide();
            });
            $yiru.mouseout(function() {
                $project.css("display", "none");
                $yiru.removeClass('active');
            });
        }

    }


});