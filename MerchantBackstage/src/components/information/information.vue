<template>
    <div class="information-box">
      <el-row class="edioright">
        <el-button size="mini" type="primary" round>编辑</el-button>
      </el-row>
      <div class="content-box">
        <div class="content-ul">
          <span class="content-name">产品图片</span>
          <img class="content-img content-right" src="../../image/mc.jpg" alt="">
        </div>
        <div class="content-ul">
          <span class="content-name">产品名称</span>
          <span class="content-right">饿温热微软</span>
        </div>
        <div class="content-ul">
          <span class="content-name">审核状态</span>
          <span class="content-right">审核通过</span>
        </div>
        <div class="content-ul">
          <span class="content-name">产品品类</span>
          <span class="content-right">智能手环</span>
        </div>
        <div class="content-ul">
          <span class="content-name">产品标签</span>
          <span class="content-right">天猫专供</span>
        </div>
        <div class="content-ul">
          <span class="content-name">规格型号</span>
         <div class="content-right">
           <div class="content-right-box">
             <span class="content-spec">红色</span>
             <img class="content-spec-img" src="../../image/mc.jpg" alt="">
           </div>
           <div style="margin-top: 10px;" class="content-right-box">
             <span class="content-spec">蓝色</span>
             <img class="content-spec-img" src="../../image/mc.jpg" alt="">
           </div>
         </div>
        </div>
        <div class="content-ul">
          <span class="content-name">产品产地</span>
          <span class="content-right">深圳市南山区</span>
        </div>
        <div class="content-ul">
          <span class="content-name">产品简介</span>
          <span class="content-right">如果你无法表达想象就说明你还不够了解他。</span>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        name: "information"
    }
</script>

<style scoped>
  @import "./information.css";
</style>
