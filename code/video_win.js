define('home_win',['fastclick','util','apicloud','zepto','vue'],function(FastClick,$util,$api,$,Vue){
  window.addEventListener('load', function() {
      FastClick.attach(document.body);
  }, false);
  apiready = function() {
    $util.fixPage();
    var alivcLivePlayer = api.require('alivcLivePlayer');
    alivcLivePlayer.initPlayer(function(ret){
        alert(JSON.stringify(ret));
    })
    var id = api.pageParam.id;
    // var open_red_packet = api.pageParam.open_red_packet;
    // var open_enroll = api.pageParam.open_enroll;
    var app = new Vue({
      el:'#app',
      data:{

      },
      methods:{

      },
      mounted:function(){

      }
    })
  }
})
