
/**
 * Created by sunflower on 2017/5/17.
 */
//播放视频
var coverOthers=$('#poster,.icon_video,.cover');
var myVideo=document.getElementById("adv_video");
var currentTime,total;
$(".video_box").click(function(e){
    console.log('click video box');
    coverOthers.css('display',"none");
    myVideo.style.display="block";
    play();
    e.stopPropagation();
});

myVideo.onclick=function(e){
    console.log('come in video');
    if(myVideo.paused){
        console.log('pause in video');
        play();
    }else{
        console.log('play in video');
        pause();
    }
    e.stopPropagation();
};
//播放
function play(){
    myVideo.play();
};

//暂停
function pause(){
    console.log('set pause');
    $('.cover').css('display','block');
    $('.icon_video').css('display','block');
    myVideo.pause();

}
//获取总时长
myVideo.addEventListener("loadedmetadata", function(){
    total = myVideo.duration;
});

//播放时间点更新时
myVideo.addEventListener("timeupdate", function(){
    currentTime = myVideo.currentTime;//获取当前播放时间
    //console.log('get time',currentTime,total);//在调试器中打印
    if(currentTime==total){
        coverOthers.css('display',"block");
        myVideo.style.display="none";
    }
});


var sock,
    isOnline=true;//客服是否在线

function sendWbsocket() {
    window.location.href="wait-video.html";
    sock = new SockJS('https://api.callcloud.com.cn/alerm');
    sock.onopen = function (e) {
        console.log('open1');
        myOpenHandler(e)
    };
    //返回事件
    sock.onmessage = function (e) {
        myMessageHandler(e)
    };
    sock.onclose = function (e) {
        console.log('close');
        myCloseHandler(e)
    };
}
//发送
function myOpenHandler(e){
    sock.send('test');
}
//返回事件
function myMessageHandler(e){
    console.log('message', e.data);
    if(isOnline){
        window.location.href="wait-video.html";
    }else{
        alert('客服不再线')
    }
    sock.close();
}
function  myCloseHandler(e){
    console.log("On close event has been called: " ,e);
}


