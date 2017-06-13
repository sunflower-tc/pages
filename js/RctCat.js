/**
 * Created by sunflower on 2017/5/23.
 */


//var apikey = "91af9be9-7bac-40df-962d-f141eebe9d43",
//    secret="ce8df259-1f7a-4aa4-9e4e-862af9f6c24d",
//    p2p_session="073df4a9-e9ef-4f45-a2b0-e14c778bcd86";
//
//var token_url = "https://api.realtimecat.com/v0.3/sessions/"+p2p_session+'/tokens';
var session,stream;
var token_url="https://api.callcloud.com.cn/callback/getTestToken";
$.ajax({
    'url':token_url,
    'method':'get'
}).done(function(msg){
    var token = msg;
    var width = "100%";
    var height = "75%";

    console.log('get token',token);
    stream = new RTCat.Stream({size:{maxWidth:1600,maxHeight:1200}});
    //获取摄像头
    stream.on("accepted", function () {
        stream.play("customer_video",{size:{width:100,height:75}});//当前的的video图像
        stream.mirror();//反转视频
        //$('#customer_video>video').attr('x5-video-player-type','h5');
        //$('#customer_video>video').attr('x5-video-player-fullscree','true');
        //$('#customer_video>video').attr('webkit-playsinline','true');
        //$('#customer_video>video').attr('playsinline','true');
        session = new RTCat.Session(token);
        session.on("connected", function () {
            session.on('remote', function (receiver) {
                receiver.on('stream',function(stream){
                    remote_stream = stream;
                    //显示图像 显示的是对方的图像，
                    var div = document.createElement('div');
                    div.setAttribute('id','video-'+receiver.getId());
                    div.setAttribute('class','cs_video');
                    document.querySelector('.wait_content').appendChild(div);
                    stream.play('video-'+receiver.getId(),{size:{width:width,height:height}});
                    stream.mirror();//反转视频

                });
            }).on('in', function (token) {
                // 建立连接成功后,发送 stream
                session.sendTo({to:token,stream:stream})
            });
            // 建立连接成功后,发送 stream
            session.send({stream:stream});
        });
        session.connect();
    }).init();
}).error(function(error){
    console.log(error)
});
