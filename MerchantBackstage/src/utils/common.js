export default {
  //拼接登录账号密码
  merge:function (l,p) {
    return l+':'+p
  },
  //弹窗
  Toast:function (size,num) {
    let div = document.createElement('div'); //1、创建元素
    div.className='mask';
    div.innerHTML=size;
    let bodys=document.getElementsByTagName("body")[0];
    bodys.appendChild(div);
    setTimeout(function () {
      div.style.opacity=0;
      setTimeout(function () {
        div.style.display="none";
        bodys.removeChild(div);
      },500)
    },2000)
  },
        // 时间挫
      formatDateTime:function (timeStamp) { 
        var date = new Date();
        date.setTime(timeStamp);
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    
        m = m < 10 ? ('0' + m) : m;    
        var d = date.getDate();    
        d = d < 10 ? ('0' + d) : d;    
        var h = date.getHours();  
        h = h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        var second = date.getSeconds();  
        minute = minute < 10 ? ('0' + minute) : minute;    
        second = second < 10 ? ('0' + second) : second;   
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
      }
    
}
