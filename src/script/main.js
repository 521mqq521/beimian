//模块的配置
require.config({
    paths: { //路径
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js',
        'jcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.0/jquery.cookie.min',
        'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min'
    },
    shim: { //让不支持AMD的模块，支持AMD模块
        'jcookie': {
            deps: ['jquery'], //依赖的模块
            exports: 'jcookie' //别名
        },
        'jlazyload': {
            deps: ['jquery'],
            exports: 'jlazyload'
        }
    }
});

// require(['index_module']);//加载模块的方式 

require(['jquery', 'jcookie', 'jlazyload'], function() {


    let pagemod = $('#currentpage').attr('data-page');
    require([pagemod], function(page) {

        page.init(); //:调用index_moudule模块的init()

    })
})