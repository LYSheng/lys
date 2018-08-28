<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- <router-view v-else name="login"/> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  }
}
</script>

<style>
html,
body,
#app,
#app > .el-container,
.el-aside {
  height: 100%!important;
}
body {
  margin: 0px;
}
body * {
  box-sizing: border-box;
  font-family: "微软雅黑";
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
.el-header {
   padding: 0px !important;
  height: 40px!important;
  box-shadow: 0px 3px 8px 0px rgba(139, 139, 139, 0.14);
  z-index: 999;
  }
  .el-aside {
    position: relative;
    background-color: #00152A;
    color: #333;
    box-shadow: 0px 3px 8px 0px
    rgba(139, 139, 139, 0.14);
  }

  .el-main {
    color: #333;
    text-align: left;
    /*background-color: #EFF7FE;*/
    background-color: #fff;

  }
  .el-aside .el-menu {
    font-size: 16px;
    font-weight: 700;
    background-color: #00152A;
  }
  .el-menu-item > li {
    /* text-align: left; */
  }
ul,li{ padding:0;margin:0;list-style:none}
.cell{
  font-weight: normal!important;
}
.el-table th{
  padding: 0px;
  height: 33px;
  line-height: 33px;
  color: #6E6F70;
  /*background-color: #E1F0FD;*/
  background-color: #f3f3f3;
}
  .el-table__header-wrapper{
    background-color: #E1F0FD;
  }
  .el-table .cell, .el-table th div{
    text-align: center;
  }
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  margin: 0 5px;
  color: #606266;
  min-width: 30px;
  border-radius: 4px;
  border: 1px solid #f4f4f5;
  background-color: #fff;
}
.el-pager li{
  line-height: 26px;
}
  p{
    margin: 0;
  }
.el-table--enable-row-transition .el-table__body td{
  font-size: 12px;
}
  .el-dialog{
    border-radius: 15px;
    width: 30%;
  }
.el-dialog__header {
  padding: 20px 20px 10px;
  text-align: center;
}
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  padding-top: 5px;
}
  .f12{font-size: 12px;}
.f10{font-size: 10px;}
.f14{font-size: 14px;}
.f16{font-size: 16px;}
.f18{font-size: 18px;}
.el-tabs__item.is-active{
  color: #3467b5;
}
.el-tabs__item:hover {
  color: #3467b5;
  cursor: pointer;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #3467b5;
  color: #fff;
}


.slide-fade-enter-active {
  transition: all .3s ease;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -ms-transition: all .5s ease;
  -o-transition: all .5s ease;
}
.slide-fade-enter{
  transform: translateX(20px);
  -webkit-transform: translateX(20px);
  -moz-transform: translateX(20px);
  -ms-transform: translateX(20px);
  -o-transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-active {
  opacity: 0;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  border-bottom: 2px solid #fff;
}
.el-form-item__label{
  color: #333;
}
h5,h4,h3,h2,h1{
  margin: 0;
}
.input-sr{
  border: none;
  width: 30%;
}
.input-sr:focus{
  outline:none;
  border: none;
  border-bottom:1px solid #3467b5;
  }
</style>
