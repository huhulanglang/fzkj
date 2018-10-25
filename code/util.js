define('util',['apicloud'],function($api){
    var _u = {};
    var headerH;
    var footerH
    // _u.origin = 'http://192.168.31.137/';
    _u.origin = 'http://yxx.fuyangjiankang.com/';
    _u.apiOrigin = _u.origin + 'index.php/';
    // _u.auth = 'Basic_Ivj6eZRxMTx2yiyunZvnG8R67';

    // _u.user = $api.getStorage('user');
    // _u.token = $api.getStorage('token');
    _u.themeColor = '#358cff'

    //重新修复页面（头部尾部）
    _u.fixPage = function() {
        //状态栏颜色
        api.setStatusBarStyle({
            style: 'dark'
        });
        api.parseTapmode();

        var header = $api.byId('header');
        header && $api.fixStatusBar(header);
        headerH = header ? $api.offset(header).h : 0;

        var footer = $api.byId('footer');
        footer && $api.fixTabBar(footer);
        footerH = footer ? $api.offset(footer).h : 0;
    }

    // ajax请求
    _u.ajax = function(method, router, params, fun, headers) {
        var token = $api.getStorage('token');
        var uiLoading = api.require("UILoading");
        headers = headers || {};
        if (token) {
            headers.token = token;
        }
        headers['client-type'] = 'app';
        headers['Content-Type'] = 'application/json';
        // headers.auth = $util.auth;
        uiLoading.flower({
            size: 30,
            fixed: true
        }, function(ret) {
            var uiId = ret.id;
            api.ajax({
                url: _u.origin + router,
                method: method,
                data: {
                    body: params
                },
                timeout: 15,
                headers: headers,
            }, function(ret, err) {
                uiLoading.closeFlower({
                    id: uiId
                });
                api.refreshHeaderLoadDone();
                if (ret) {
                    if (ret.code == 0) {
                        _u.toast(ret.msg);
                        console.log(JSON.stringify(ret) + ' 路由: ' +router);
                    } else if (ret.code == 1) {
                        fun(ret);
                    } else {
                        // $util.toast(ret.msg)
                        _u.toast('服务器繁忙，请稍后再试');
                        console.log(JSON.stringify(ret) + ' 路由: ' +router);
                    }
                } else {
                    console.log(err.msg)
                    console.log('错误路由: ' + router)
                    // alert('哎呀,网络走神了~')
                }
            });
        });
    }

    //需要登录的窗口集合
    _u.needLoginWinList = [
        'add_article',
        "article_detail",
        'data_count_win',
        'cheng_mobile_win',
        'edit_advert',
        'edit_mycard_win',
        'bind_third_setting_win',
        'edit_setting',
        'my_advert',
        'my_article_win',
        'my_draft',
        'my_head_img_frame',
        'my_settings_frame',
        'my_Wallet_win',
        'pay_out_frame',
        'preview_article',
        'idcard_auth_win',
        'idcard_info_win',
        'red_packet_user_win',
        'regist_user_win',
        'set_article',
        'upload_card_win',
        'help_and_option_win',
        'my_center_win',
        'search_frame'
    ];
    //三个主页，不需要动画
    _u.indexWinList = [
        'home_win'
    ];
    //打开新窗口
    _u.openWindow = function(winName, params) {
      // var token={"id":364,"user_account_id":59,"user_id":59,"client_type":"app","token":"user&app@dcc0631e4f7a91fdfe9739a937a46cd8","refresh_token":"user&app@05170893ed88c8b06d9bd519cee80b21","expire_time":0,"create_time":"2018-08-15 14:43:59","create_time":"2018-08-15 14:43:59"};
      // var user={"id":59,"mobile":"13681445572","nick_name":"","avatar":"","gender":0,"wechat":null,"province":"北京市","province_code":"110000","city":"市辖区","city_code":"110100","area":"东城区","area_code":"110101","position":null,"enterpr_id":0,"status":1,"birthday":"2018-02-02 00:00:00","wechat_qrcode":null,"user_assets":"0.00","user_spread_money":"0","guid":"13681445572"};
      // $api.setStorage('user', user);
      // $api.setStorage('token', token);
        var userName = $api.getStorage('userName');
        if (_u.needLoginWinList.indexOf(winName) != -1 && !userName) {
            winName = 'login_win'
        }
        // 打开window参数
        var pageConfig = {
            name: winName,
            url: './' + winName + '.html',
            pageParam: params,
            slidBackEnabled: false, //滑动返回
            overScrollMode: 'always',
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            // reload: true
        }
        if (_u.indexWinList.indexOf(winName) != '-1') {
            pageConfig.animation = {
                type: 'none'
            }
        }

        api.openWin(pageConfig);
    };
    // 打开新frame
    _u.openFrame = function(frmName, params, rect, bgColor) {
        var frameH = api.winHeight - footerH - headerH;
        // 打开Frame参数
        var pageConfig = {
            name: frmName,
            url: './' + frmName + '.html',
            rect: {
                x: 0,
                y: headerH,
                w: 'auto',
                h: frameH
            },
            bounces: false,
            bgColor: 'rgba(0,0,0,0)',
            vScrollBarEnabled: false,
            hScrollBarEnabled: false
        }
        if (rect) {
            pageConfig.rect = rect;
        }
        if (params) {
            pageConfig.pageParam = params;
        }
        if (bgColor) {
            pageConfig.bgColor = bgColor;
        }
        api.openFrame(pageConfig);
    };
    //吐丝弹窗
    _u.toast = function(msg) {
        api.toast({
            msg: msg,
            duration: 2000,
            location: 'middle'
        });
    };

    //校验手机号码
    _u.variMobile = function(mobile) {
        console.log(mobile)
        return /^1\d{10}$/.test(mobile);
    };
    //校验密码
    _u.variPassword = function(pwd) {
        return /^[A-Za-z0-9]{6,20}$/.test(pwd);
    };
    // 打印日志
    _u.log = function(data) {
        console.log(JSON.stringify(data));
    };
    // 判断是否为空对象
    _u.isEmptyObject = function(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }
    //带两个按钮的对话框
    _u.public_confirm = function(msg, callbackFunc) {
        api.confirm({
            title: '提示信息',
            msg: msg,
            buttons: ['取消','确定']
        }, function (ret, err) {
            if (ret.buttonIndex == 2) {
                //如果定义了回调函数
                if (typeof(callbackFunc) != "undefined") {
                    callbackFunc(ret, err);
                }
            }else{
                return false;
            }
        });
    }
    function _addEventListener(eventName, _call, extra) {
        var _extra = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? {} : arguments[2];
        api.addEventListener({
            name: eventName,
            extra: _extra
        }, function (ret, err) {
            if (typeof _call == "function") {
                _call(ret);
            }
        });
    }
    // 返回键双击退出
     _u.fnInitEvent = function() {
        //定义个时间戳
        var mkeyTime = new Date().getTime();
        _addEventListener('keyback', function (ret) {
            //如果当前时间减去标志时间大于2秒，说明是第一次点击返回键，反之为2秒内点了2次，则退出。
            if ((new Date().getTime() - mkeyTime) > 2000) {
                mkeyTime = new Date().getTime();
                api.toast({
                    msg: '再按一次返回键退出' + api.appName,
                    duration: 2000,
                    location: 'bottom'
                });
            } else {
                // 静默关闭,不弹出关闭提示窗口
                api.closeWidget({
                    silent: true
                });
            }
        }, {});
    };
    return _u;
})
