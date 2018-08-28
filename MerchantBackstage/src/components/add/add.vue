<template>
  <div class="addBox">
    <el-form ref="form" :model="form" label-width="80px" >
      <el-form-item label="产品图片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">图片尺寸为100Px*100px；不可大于2M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品名称">
        <el-input style="width: 50%" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item  label="产品品类">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域三" value="shanghai"></el-option>
          <el-option label="区域四" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品标签">
        <el-input style="width: 50%" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-row>
          <el-button @click="open" size="small" type="primary" round>添加标签</el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="型号规格">
        <div style="display: flex;">
          <el-input style="width: 50%" v-model="form.name"></el-input>
          <el-upload style="margin-left: 20px"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">图片尺寸为100Px*100px；不可大于2M</div>
        </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-row>
          <el-button size="small" type="primary" round>添加型号规格</el-button>
        </el-row>
      </el-form-item>
      <el-form-item  label="产品产地">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域三" value="shanghai"></el-option>
          <el-option label="区域四" value="beijing"></el-option>
        </el-select>
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域三" value="shanghai"></el-option>
          <el-option label="区域四" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input style="width: 80%" type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 280px;">
        <el-button type="primary" size="small" round>立即创建</el-button>
        <el-button type="info" size="small" round>取消</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },
    methods: {
      open() {
        this.$message('添加标签成功');
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        // return isJPG && isLt2M;
        return isLt2M;
      }
    }
  }
</script>

<style scoped>
  @import "./add.css";
</style>
