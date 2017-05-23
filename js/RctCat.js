/**
 * Created by sunflower on 2017/5/23.
 */

var session,stream;
var apikey = "91af9be9-7bac-40df-962d-f141eebe9d43",
    secret="ce8df259-1f7a-4aa4-9e4e-862af9f6c24d",
    p2p_session="073df4a9-e9ef-4f45-a2b0-e14c778bcd86";

var token_url = "https://api.realtimecat.com/v0.3/sessions/"+p2p_session+'/tokens';


$.ajax({
    'url':token_url,
    'method':'POST',
    'headers':{
        'X-RTCAT-APIKEY':apikey,
        'X-RTCAT-SECRET':secret
    },
    'data':{
        'session_id':p2p_session,
        'type':'pub'
    }
}).done(function(msg){
    var token = msg.uuid;
    stream = new RTCat.Stream();
    //获取摄像头
    stream.on("accepted", function () {
        stream.play("local");

        session = new RTCat.Session(token);
        session.on("connected", function () {
            session.on('remote', function (receiver) {
                receiver.on('stream',function(stream){
                    remote_stream = stream;
                    //显示图像
                    //var div = document.createElement('div');
                    //div.setAttribute('id','video-'+receiver.getId());
                    //document.querySelector('.wait_content').appendChild(div);
                    stream.play('video-'+receiver.getId());
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
