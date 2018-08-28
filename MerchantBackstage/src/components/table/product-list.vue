
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        height="50"
       >
      </el-table-column>
      <el-table-column
        label="日期"
        height="50"
      >
        <!--通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。-->
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="address"
        label="产品名称"
        height="50"
     >
      </el-table-column>
      <el-table-column
        property="name"
        label="产品品类"
        height="50"
       >
      </el-table-column>
      <el-table-column
        label="产品图片"
        height="50"
      >
        <template slot-scope="scope">
          <img style="height: 40px" :src="scope.row.imgUrl"  alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="标签"
        height="50"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        property="date"
        label="申请时间"
        height="50"
      >
      </el-table-column>
      <el-table-column
        property="flagText"
        label="状态"
        height="50"
      >
      </el-table-column>
      <el-table-column
        property="address"
        label="操作"
        height="50"
      >
        <template slot-scope="scope">
          <span style="color: #00a2d4" v-if="scope.row.type==1 ||scope.row.type==2"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">查看
          </span>
          <span style="color: #00a2d4" v-if="scope.row.type==3 "
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">失效
          </span>
          <span style="color: #00a2d4" v-if="scope.row.type==4"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">下载
          </span>
          <span style="color: #00a2d4"  v-if="scope.row.type==2"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    data() {
      return {
          Headerattr:['a','b','c','d']
      }
    },
    props:{
      tableData:Array,//表data
    },
    mounted(){
      this.NewData()
    },
    methods:{
      NewData(){
        console.log(this.tableData)
      }
    }

  }
</script>
<style>
  @import "./product-list.css";
</style>
