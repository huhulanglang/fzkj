define('home_win',['fastclick','util','api','zepto'],function(FastClick,$util,$api,$){
    window.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);
    apiready = function() {
        console.log(123)
        $util.fixPage();
        $util.fnInitEvent();
        var $body = $api.dom('body');
        var $footer = $api.byId('footer');
        var body_h = $api.offset($body).h;
        var footer_h = $api.offset($footer).h;
        var rect_h = body_h- footer_h;
        api.openFrameGroup({
            name: 'group',
            scrollEnabled: true,
            rect: {x: 0, y: 0, w: 'auto', h: rect_h},
            index: 0,
            preload:0,
            frames: [
                {
                    name: 'home_frame',
                    url: 'home_frame.html',
                    bounces:false
                },
                {
                    name: 'home_frame',
                    url: 'home_frame.html',
                    bounces:false
                },{
                    name: 'home_frame',
                    url: 'home_frame.html',
                    bounces:false
                },{
                    name: 'home_frame',
                    url: 'home_frame.html',
                    bounces:false
                }
            ],
            bounces:true
        }, function (ret, err) {

        });

        // 随意切换按钮
        function randomSwitchBtn(obj, index) {
            //指定打开页面openPageNum
            if($api.getStorage('user')){
                api.setFrameGroupIndex({
                    name: 'group',
                    index: index
                });
                $(obj).addClass('aui-active').siblings().removeClass('aui-active');
            }else{
                $util.openWindow('login_win');
            }

        }
        // 事件绑定
        (function bindEvent(){
            $("#footer").on("click",".aui-bar-tab-item",function(){
                randomSwitchBtn($(this).get(0),$(this).attr('data-id'))
            });
        }());
    };
})
