/**
 * Created by sunflower on 2017/5/25.
 */
//wait-video page

//Hang up Handler
function hangUp(){
    console.log('come in hangup');
    window.location.href="comments.html"
}
//comments page
//提交留言
//form submit
$('#name').focus(function(){
  var $this=$(this);
  inputFocusIn($this);
});
$('#name').blur(function(){
  var $this=$(this);
  inputFocusOut($this);
});
$('#phone').focus(function(){
  var $this=$(this);
  inputFocusIn($this);
})
$('#phone').blur(function(){
  var $this=$(this);
  var phone=$("#phone").val();
  var phoneReg=/^1\d{10}$/;
    if(!phoneReg.test(phone)){
        $this.addClass('red-info');
        $('#phone').next().html('手机号码不符合规范')
    }
  inputFocusOut($this);

});
$('#email').focus(function(){
  var $this=$(this);
  inputFocusIn($this);
})
$('#email').blur(function(){
  var $this=$(this);
  var emailReg=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  var email=$("#email").val();
    if(!emailReg.test(email)){
        $this.addClass('red-info');
        $('#email').next().html('请输入正确的邮箱')
    }
  inputFocusOut($this);
});
$('#comment').focus(function(){
   var $this=$(this);
  inputFocusIn($this);
})
$('#comment').blur(function(){
  var $this=$(this);
  inputFocusOut($this);
});
//input框聚焦
function inputFocusIn($this){
    console.log('focus in')
    $this.addClass('input-shadow')
    $this.removeClass('red-info');
    var nextDom=$this.next();
    $(nextDom).html('');
}
//input框失焦
function inputFocusOut($this){
  console.log('focus out')
    $this.removeClass('input-shadow');
    if(!$this.val()){
      $this.addClass('red-info');
      var nextDom=$this.next();
      $(nextDom).html('不能为空');
    }
}
function submitForm(){
      //ajax 请求
      window.location.href="success-submit.html"
}
//跳过
function pass(){
  window.location.href="success-submit.html"
}
function callBack_index(){
    console.log('come in hangup');
    window.location.href="index.html"
}
