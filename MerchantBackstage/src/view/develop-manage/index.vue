<template>
    <div class="develop-box">
        <div class="develop-tab">
             <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane class="f18" label="应用管理" name="first"></el-tab-pane>
                <el-tab-pane class="f18" label="SDK&API" name="second"></el-tab-pane>
            </el-tabs>
        </div>
        <div v-if="tabFlag" class="develop-new">
            <div class="router-box">
                 <el-button @click="dialogFormVisible=!dialogFormVisible" size="mini" type="primary">创建应用</el-button>
                  <el-button size="mini" type="primary" class="btn-help">帮助文档</el-button>
            </div>
            <div class="table-content">
                <el-table
                    :slot="aa"
                    :data="clockInfoList"
                    style="width: 100%">
                    <el-table-column
                    property="sdkId"
                    label="SDK APPID"
                    height="48"
                    >
                    </el-table-column>
                    <el-table-column
                    label="应用名称"
                    height="48"
                    property="sdkName"
                    >
                    </el-table-column>
                    <el-table-column
                    property="isUse"
                    label="应用状态"
                    height="48"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.isUse==false" class="">停用中</span>
                        <span v-else class="">运行中</span> 
                      </template>
                    </el-table-column>
                    <el-table-column
                    property="createTime"
                    label="创建时间"
                    height="48"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    height="48"
                    >
                    <template slot-scope="scope">
                        <span class="cz-list" @click="devconfig(scope.row.sdkId,scope.row.isUse)">应用配置</span>
                        <span v-if="scope.row.isUse==true" class="cz-list" @click="stop(scope.row.sdkId,scope.row.type)">停用</span> 
                        <span v-else class="cz-list" @click="enable(scope.row.sdkId,scope.row.type)">启动</span> 
                        <span class="cz-list" @click="delList(scope.$index,clockInfoList,scope.row.sdkId)">删除</span>  
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-box">
              <el-pagination
                v-if="paginationShow"
                background
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :current-page="pageNo"
                layout="prev, pager, next"
                :total="totalCount">
              </el-pagination>
            </div>
        </div>
        <div v-else class="sdk-box">
          <div class="sdk-content-box">
            <span class="sdk-type f14">
              服务器
            </span>
            <div class="flex-box">
                <div class="download-box">
                  <div class="download-list">
                    <div class="download-left">
                      <div class="down-img-box">
                          <img src="../../assets/image/java(2).png" alt="" class="download-icon">
                      </div>
                      
                      <div class="download-text">
                        <span class="download-name f12">Java</span>
                        <p class="download-xh f12">V1.0 2017-09-09</p>
                        <div class="download-zn">
                          <span class="download-jrzn download-color f12">接入指南</span>
                          |
                          <span class="download-kfzn download-color f12">开发指南</span>
                        </div>
                      </div>
                    </div>
                    <div class="download-right">
                      <a href="https://github.com/LYSheng/sdk" target="_blank" class="sdk-down">下载</a>
                    </div>
                  </div>
                </div>
                <div class="download-box">
                  <div class="download-list">
                    <div class="download-left">
                      <div class="down-img-box">
                          <img src="../../assets/image/php.png" alt="" class="download-icon">
                      </div>
                      
                      <div class="download-text">
                        <span class="download-name f12">PHP</span>
                        <p class="download-xh f12">V1.0 2017-09-09</p>
                        <div class="download-zn">
                          <span class="download-jrzn download-color f12">接入指南</span>
                          |
                          <span class="download-kfzn download-color f12">开发指南</span>
                        </div>
                      </div>
                    </div>
                    <div class="download-right">
                      <a href="https://github.com/LYSheng/sdk" target="_blank" class="sdk-down">下载</a>
                    </div>
                  </div>
                </div>
                <div class="download-box">
                  <div class="download-list">
                    <div class="download-left">
                      <div class="down-img-box">
                          <img src="../../assets/image/C#.png" alt="" class="download-icon">
                      </div>
                      
                      <div class="download-text">
                        <span class="download-name f12">C++</span>
                        <p class="download-xh f12">V1.0 2017-09-09</p>
                        <div class="download-zn">
                          <span class="download-jrzn download-color f12">接入指南</span>
                          |
                          <span class="download-kfzn download-color f12">开发指南</span>
                        </div>
                      </div>
                    </div>
                    <div class="download-right">
                      <a href="https://github.com/LYSheng/sdk" target="_blank" class="sdk-down">下载</a>
                    </div>
                  </div>
                </div>
                <div class="download-box">
                  <div class="download-list">
                    <div class="download-left">
                      <div class="down-img-box">
                          <img src="../../assets/image/js(1).png" alt="" class="download-icon">
                      </div>
                      
                      <div class="download-text">
                        <span class="download-name f12">Node.js</span>
                        <p class="download-xh f12">V1.0 2017-09-09</p>
                        <div class="download-zn">
                          <a class="download-jrzn download-color f12" target="_blank" href="https://github.com/LYSheng/sdk/blob/master/README.md">接入指南</a>
                          |
                          <span class="download-kfzn download-color f12">开发指南</span>
                        </div>
                      </div>
                    </div>
                    <div class="download-right">
                      <!-- <el-button type="primary" size="mini" >下载</el-button> -->
                      <a href="https://github.com/LYSheng/sdk" target="_blank" class="sdk-down">下载</a>
                    </div>
                  </div>
                </div>
                <div class="download-box">
                  <div class="download-list">
                    <div class="download-left">
                      <div class="down-img-box">
                          <img src="../../assets/image/python.png" alt="" class="download-icon">
                      </div>
                      
                      <div class="download-text">
                        <span class="download-name f12">Python</span>
                        <p class="download-xh f12">V1.0 2017-09-09</p>
                        <div class="download-zn">
                          <span class="download-jrzn download-color f12">接入指南</span>
                          |
                          <span class="download-kfzn download-color f12">开发指南</span>
                        </div>
                      </div>
                    </div>
                    <div class="download-right">
                      <a href="https://github.com/LYSheng/sdk" target="_blank" class="sdk-down">下载</a>
                    </div>
                  </div>
                </div>
            </div>
            
          </div>
          <div class="sdk-content-box">
            <span class="sdk-type f14">
              移动端
            </span>
            <div class="flex-box">
                <div class="download-box">
                  <div class="download-list">
                    <div class="download-left">
                      <div class="down-img-box">
                          <img src="../../assets/image/android.png" alt="" class="download-icon">
                      </div>
                      
                      <div class="download-text">
                        <span class="download-name f12">Android</span>
                        <p class="download-xh f12">V1.0 2017-09-09</p>
                        <div class="download-zn">
                          <span class="download-jrzn download-color f12">接入指南</span>
                          |
                          <span class="download-kfzn download-color f12">开发指南</span>
                        </div>
                      </div>
                    </div>
                    <div class="download-right">
                      <a href="https://github.com/LYSheng/sdk" target="_blank" class="sdk-down">下载</a>
                    </div>
                  </div>
                </div>
                <div class="download-box">
                  <div class="download-list">
                    <div class="download-left">
                      <div class="down-img-box">
                          <img src="../../assets/image/iOS.png" alt="" class="download-icon">
                      </div>
                      
                      <div class="download-text">
                        <span class="download-name f12">Ios</span>
                        <p class="download-xh f12">V1.0 2017-09-09</p>
                        <div class="download-zn">
                          <span class="download-jrzn download-color f12">接入指南</span>
                          |
                          <span class="download-kfzn download-color f12">开发指南</span>
                        </div>
                      </div>
                    </div>
                    <div class="download-right">
                      <a href="https://github.com/LYSheng/sdk" target="_blank" class="sdk-down">下载</a>
                    </div>
                  </div>
                </div>
            </div>
            
          </div>
        </div>
        <!-- 创建应用 -->
      <el-dialog title="创建应用" :visible.sync="dialogFormVisible">
       <el-form :rules="rules" :model="form" label-width="100px" ref="ruleForm">
          <el-form-item label="应用名称" prop="name">
            <el-input placeholder="请输入应用名称" size="small" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="所属行业" prop="region">
            <el-select  size="small" v-model="form.region" @change="getSelectObj(form.region)" placeholder="请选择所属行业">
              <el-option  v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
              ></el-option>
            </el-select>
            <span class="cz-list f10">查看相关费率</span>
          </el-form-item>
          <el-form-item label="应用类型" prop="regionType">
            <el-select  size="small" v-model="form.regionType" @change="getSelectType(form.regionType)" placeholder="请选择应用类型">
              <el-option  v-for="item in optionType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用简介">
            <el-input placeholder="选填" size="small" type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  size="small" type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
          </el-form-item>
        </el-form>  
      </el-dialog>
      <!-- 启用弹窗 -->
      <el-dialog title="启用" :visible.sync="tableFlagEnable" center>
        <span>是否启用{{tableName}}应用，启用后可以正常使用nowpay支付</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EnableDialogVisible()">取 消</el-button>
          <el-button type="primary" @click="EnableDialogyes()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 停用弹窗 -->
       <el-dialog title="停用" :visible.sync="tableFlagStop" center>
        <span>是否停用{{tableName}}应用，停用后应用的now pay支付将无法使用</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="StopDialogVisible()">取 消</el-button>
          <el-button type="primary" @click="StopDialogyes()">确 定</el-button>
        </span>
      </el-dialog>
        <!-- 删除弹窗 -->
       <el-dialog title="删除" :visible.sync="delFlag" center>
        <span>是否删除{{tableName}}应用，删除后应用的now pay支付将无法使用</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible()">取 消</el-button>
          <el-button type="primary" @click="delDialogyes()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<style scoped>
    @import "./index.css";
</style>
<script>
      import * as types from '../../store/types'
      import http from '../../utils/http'   //ajax引入
      import api from '../../utils/api'     //接口名字
      import common from '../../utils/common'     //公共js
export default {
    data() {
      return {
        activeName: 'first',
        aa:"关机",
        ID:'',
        pageNo:1,
        pageSize:10,
        paginationShow: false,//是否显示分页
        totalCount: 0,//总条数
        totalPage: 0,//总页数
        clockInfoList:[],
        form: {
          name: '',
          region: '',
          regionType:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入应用名称', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选所属行业', trigger: 'change' }
          ],
           regionType: [
            { required: true, message: '请选所属应用类型', trigger: 'change' }
          ],
        },
        tabFlag:true,
        dialogFormVisible:false,
        tableFlagStop:false, //停用状态
        tableFlagEnable:false, //启用状态
        delFlag:false,        //删除
        tableName:"",
        tableData1:[],
        options:[
         "游戏", "食品","服装","电子产品"],
        optionType:[
          {
          value: 1,
          label: 'Android'
        }, {
          value: 2,
          label: 'ios'
        }, {
          value: 3,
          label: 'H5'
        },
        ]
      };
    },
    created(){
        this.getPageData(this.pageNo,this.pageSize)
    },
     methods: {
      handleClick(tab, event) {
        console.log(this.activeName);
        if(this.activeName=="second"){
            this.tabFlag=false;
            
        }else{
          //  this.getPageData(1,this.pageSize);
          this.tabFlag=true;
          console.log(this.pageNo)
          // this.currentPage = this.pageNo;
        }
        
      },
      // 获取数据列表
      getPageData:async function(pageNo,pageSize){
        let datas={
          cpage:pageNo,
          pageSize:pageSize
        }
         const res = await http.Newpost(api.SelectSdk,datas);
         this.totalCount=res.data.totalRow
         this.clockInfoList=res.data.list
        //  for (var i=0;i<res.data.length;i++){
        //       this.clockInfoList.push(res.data[i]);
        //   }
        console.log(res.data.list)
        for (var i=0;i<res.data.list.length;i++){
          res.data.list[i].createTime=common.formatDateTime(res.data.list[i].createTime)
        }
        console.log(res.data.totalPage)
         if (res.data.totalRow >this.pageSize) {//总页数大于pagesize的时候
            this.paginationShow = true;
          }
      },
      // 获取行业列表
      SelectIndustry:async function(){
        const data = await http.Newpost(api.SelectIndustry);
        console.log()
        if(data.success=="true"){
          this.options=data.data;
        }else{
           this.$message.error(data.message);
        }
      },
       //点击下一页和点击页码时执行
      handleCurrentChange(val) {
        console.log(val)
       this.pageNo=val;
       this.getPageData(this.pageNo,this.pageSize)
      },
      newMask(){

      },
      getSelectObj(obj){
        console.log(obj)
        this.form.regio=obj
      },
      getSelectType(obj){
          console.log(obj)
        this.form.regionType=obj
      },
      // 创建接口
      addSdk:async function(){
        console.log(this.form.regionType)
        let datas={
          "sdkName":this.form.name,
          "sdkIndustry":this.form.regio,
          "sdkSynopsis":this.form.desc,
          "sdkType": this.form.regionType
        }
        const data = await http.Newpost(api.AddSdk,datas);
        console.log(data)
        if(data.success=="true"){
          this.dialogFormVisible=!this.dialogFormVisible;
          this.getPageData(this.pageNo,this.pageSize)
          this.$message({
          message: data.message,
          type: 'success'
        });
        }else{
           this.$message.error(data.message);
        }
      },
      // 创建按钮
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
            this.addSdk()
            } else {
              console.log('error submit!!');
              return false;
            }
          }) 
      },
      devconfig(id,flag){
        console.log(flag)
          this.$router.push({
          path: '/developManage/content',
          query: {
           Id: id,
           Flag:flag
          }
        })
      },
      // 删除
      delList(i,table,id){
        console.log(id)
        this.ID=id;
        this.delFlag=!this.delFlag;
      },
      // 删除确定
      delDialogyes:async function(i,table,id){
         let _this=this;
         this.delFlag=!this.delFlag;
          let datas={
              "sdkId":this.ID
           }
           const data = await http.Newpost(api.RemoveSdk,datas);
            console.log(data)
            if(data.success=="true"){
              // table.splice(i, 1)
              _this.getPageData(_this.pageNo,_this.pageSize)
            _this.$message({
            message: data.message,
            type: 'success'
            });
            }else{
            _this.$message.error(data.message);
            }
      },
      // 删除取消
      delVisible(){
         this.delFlag=!this.delFlag;
      },
      // 启用
      enable(id,name){
         this.ID=id;
          this.tableFlagEnable=!this.tableFlagEnable;
          this.tableName=name
      },
      //取消
      EnableDialogVisible(){
          this.tableFlagEnable=!this.tableFlagEnable;
      },
      // 确定
      EnableDialogyes:async function(){
         let _this=this;
          let datas={
              "sdkId":_this.ID
           }
           const data = await http.Newpost(api.StartSdk,datas);
            console.log(data)
            if(data.success=="true"){
               _this.tableFlagEnable=!_this.tableFlagEnable;
               _this.getPageData(_this.pageNo,_this.pageSize)
            _this.$message({
            message: data.message,
            type: 'success'
            });
            }else{
            _this.$message.error(data.message);
            }
      },
      // 停用
      stop(id,name){
          this.ID=id;
          this.tableFlagStop=!this.tableFlagStop;
          this.tableName=name
      },
        //取消
      StopDialogVisible(){
           this.tableFlagStop=!this.tableFlagStop;
      },
      // 确定
      StopDialogyes:async function(){
          let _this=this;
          let datas={
              "sdkId":_this.ID
           }
           const data = await http.Newpost(api.StopSdk,datas);
            console.log(data)
            if(data.success=="true"){
               _this.tableFlagStop=!_this.tableFlagStop;
               _this.getPageData(_this.pageNo,_this.pageSize)
            _this.$message({
            message: data.message,
            type: 'success'
            });
            }else{
            _this.$message.error(data.message);
            }
      },
    }
}
</script>


