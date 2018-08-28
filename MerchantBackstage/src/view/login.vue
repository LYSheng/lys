<template>
  <div class="login-box">
    <div id="login">
      <div class="loginMess">
        <div class="inputBox">
          <input class="message f14" type="text" name="name" placeholder="请输入你的账号" v-model="form.name">
        </div>
        <div class="warn f14" v-show="issubmit && !form.name">账号不能为空</div>
        <div class="inputBox TwoPass">
          <input class="message f14" type="password" name="pass" placeholder="请输入你的密码" v-model="form.qq">
        </div>
        <div class="warn f14" v-show="issubmit && !form.qq">密码不能为空</div>
        <div class="button f14" @click="toSubmit">
          登录
        </div>
      </div>
    </div>
    <div class="video-box">
      <video autoplay loop class="fillWidth" >
        <source src="../assets/image/The-mirage.mp4" type="video/mp4"/>
      </video>
    </div>

  </div>

</template>

<script>
  import * as types from '../store/types'
  import http from '../utils/http'   //ajax引入
  import api from '../utils/api'     //接口名字
  import Base from '../utils/base64'    //base64
  import common from '../utils/common'     //公共js
   import store from '../store/store';

  export default{
    name:'login',
    data(){
      return{
        issubmit: false,
        token: '',
        form: {
          name: '',
          qq: '',
          hasLogin: false
        }
      }
    },
    mounted(){
      this.$store.commit(types.TITLE, 'Login');
    },
    methods: {
      toSubmit:async function() {
        let _this=this;
        _this.issubmit = true;
        if(!_this.form.qq || !_this.form.name) return;
        _this.form.hasLogin = true;
        let params={
          LoginName:_this.form.name,
          PassWord:_this.form.qq
        };
//        登录获取token
        let aas={
          uName:_this.form.name,
          pWord:_this.form.qq,
        }
        const res = await http.post(api.Bailogin,aas);
        console.log(res)
        if(res.success=="false"){
          _this.$message({
            message: '登陆失败',
            type: 'warning'
          });
          return
        }else if (res.success=="true") {
          if (res.token) {
            console.log(res.token)
            store.commit(types.LOGOUT);
            _this.$store.commit(types.LOGIN, res.token);
            console.log(_this.$route.query.redirect)
            let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
            _this.$router.push({
              path: redirect
            })
          }
          localStorage.setItem("Personal",JSON.stringify(res));
        };
      }
    }
  }
</script>
<style scoped>
  .video-box{
    width: 100%;
    height: 100%;
    z-index: 3;
    position: absolute;
    overflow: hidden;

  }
  .video-box video{
    z-index: 0;
    width: 100%;
    position: absolute;
  }
  #login{
    position: absolute;
   width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
  }
  .loginMess{
    width: 200px;
    margin:  0 auto;
    margin-top: 300px
  }
</style>



