/**
 * Created by sunflower on 2017/5/17.
 */
var coverOthers=$('#poster,.icon_video,.cover');
    myVideo=document.getElementById("adv_video"),
    icon=document.getElementsByClassName('icon_video'),
    cover=document.getElementsByClassName('cover');

var currentTime,total;
$('.video_box').click(function(e){
    console.log('click video box')
    coverOthers.css('display',"none");
    myVideo.style.display="block";
    play();
    e.stopPropagation();
})
myVideo.onclick=function(e){
    console.log('come in video')
    if(myVideo.paused){

        console.log('pause in video')
        play();
    }else{
        console.log('play in video')
        pause();
    }
    e.stopPropagation();
}
//播放
function play(){
    myVideo.play();
}

//暂停
function pause(){
    console.log('set pause');
    $('.cover').css('display','block');
    $('.icon_video').css('display','block');
    myVideo.pause();

}
myVideo.addEventListener("loadedmetadata", function(){
    total = myVideo.duration;//获取总时长
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



