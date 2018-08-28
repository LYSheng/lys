<template>
  <el-container >
    <el-aside width="190px">
      <div class="logo-box">
        <img src="../assets/image/logo.png" alt="">
      </div>
      <div class="menu-ul">
        <div class="menu-item ">
          <router-link to="/productManage" class="router-name f12 list-flex" active-class=" active-list">
            <i class="icon-rig el-icon-date"></i>
            <span>运营报表</span>
            </router-link>
        </div>
        <div class="menu-item ">

          <router-link to="/codeManage" class="router-name f12 list-flex" active-class=" active-list">
            <i class="icon-rig el-icon-printer"></i>
            <span>交易流水查询</span>
            </router-link>
        </div>
        <div class="menu-item ">

          <router-link to="/userManage" class="router-name f12 list-flex" active-class=" active-list">
            <i class="icon-rig el-icon-mobile-phone"></i>
            <span>账户管理</span>
            </router-link>
        </div>
        <div class="menu-item ">
          <router-link to="/developManage" class="router-name f12 list-flex" active-class=" active-list">
            <i class="icon-rig el-icon-edit-outline"></i>
            <span>开发管理</span>
            </router-link>
        </div>
        <div class="menu-item ">
          <router-link to="/4" class="router-name f12 list-flex" active-class=" active-list">
            <i class="icon-rig el-icon-message"></i>
            <span>建议反馈</span>
            </router-link>
        </div>

      </div>
    </el-aside>
    <el-container>
      <el-header>
        <header class="header-box">
          <div class="header-left">
            <i class="el-icon-tickets name-icon"></i>
            <span class="name">{{merchantName}}</span>
          </div>
          <div class="header-right">
            <span class="merchant-id">商户Id:{{merchantId}}</span>
            <span class="admin">管理员：{{name}}</span>
            <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              <i class="el-icon-setting"></i>
              <i class="el-icon-caret-bottom"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>切换账号</el-dropdown-item>
                <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </header>
      </el-header>
      <el-main>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import store from '../store/store';
  import * as types from '../store/types'
  import router from '../router'
  import http from '../utils/http'   //ajax引入
  import api from '../utils/api'     //接口名字
  export default {
  name: 'index',
    data () {
    return {
      // isLogin: true,
      merchantName:"",
      name:"",
      merchantId:"",
    }
  },
  created(){
    let Personal=JSON.parse(localStorage.getItem("Personal"));
    this.merchantId=Personal.merchantId;
    this.merchantName=Personal.merchantName;
    this.name=Personal.name;
  },
    methods:{
      loginOut(){
        this.out()
        // console.log(111111111)

      },
        // 获取行业列表
      out:async function(){
        // const data = await http.Newpost(api.loginOut);
        // console.log(data)
        // if(data.success=="true"){
        //    this.$message({
        //   message: data.message,
        //   type: 'success'
        // });
                // //403 清除token信息并跳转到登录页面 还有缓冲
        store.commit(types.LOGOUT);
        localStorage.removeItem('Personal');
        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })
        // }else{
        //    this.$message.error(data.message);
        // }
      },
    }
  }
</script>
<style scoped>
  .logo-box{width: 100%;background-color: #002140;text-align: center;
    height: 40px;line-height: 45px;}
  .logo-box img{height: 20px;}
  .menu-ul{
    margin-top: 30px;

  }
  .menu-item{
    line-height: 45px;
    text-align: center;
  }
  .icon-rig{
    margin-right: 8px;
    color: #fff;
    font-size: 14px;
  }
  .router-name{
    text-decoration:none;
    color: #fff;
    font-size: 14px;
    display: block;
    width: 100%;
    transition: background .5s ease, border .8s ease;
  }
  .active-list{
    border-left: 6px solid #F9DA4C;
    background-color: #3467b5;
    color: #fff;
  }
  .header-box{
    padding: 10px 20px;
    background-color: #fff;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .name{
    margin-left: 10px;
    font-weight: bold;
  }
  .name-icon{
    font-weight: bold;
  }
  .el-dropdown-link i{
    color: #1890FF;
    font-size: 20px;
    cursor: pointer;
  }
  .header-left{
    font-size: 14px;
  }
  .header-right{
    font-size: 14px;
  }
  .admin{
    margin: 0px 20px;
  }
  .el-button--primary {
    color: #fff;
    background-color: #3467b5;
    border-color: #3467b5;
  }
  .list-flex{
    display: flex;
  }
  .list-flex i{
    width: 50px;
    text-align: center;
    line-height: 50px;
  }
  .list-flex span{
    text-align: left;
  }
</style>
