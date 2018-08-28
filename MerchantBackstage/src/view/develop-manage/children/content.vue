<template>
    <div class="content-box">
        <div class="add-breadcrumb">
            <el-breadcrumb style="line-height: 55px;" separator="/">
                <el-breadcrumb-item :to="{ path: '/developManage' }">开发管理</el-breadcrumb-item>
                <el-breadcrumb-item>NOWPAY-TEST</el-breadcrumb-item>
            </el-breadcrumb>
            <span v-if="flag==true" @click="flagApply(1)" class="stopApplies f12">停用应用</span>
            <span v-else @click="flagApply(2)" class="stopApplies f12">启用应用</span>
        </div>
        <div class="applies-message">
            <div class="applies-list">
                <h5>应用信息</h5>
                <div class="applies-ul">
                    <div class="applies-li f12">
                        <div class="applies-left">
                            SDK AppID
                        </div>
                        <div class="applies-right ">
                            <p class="applies-txt ">{{dataBox.sdkId}}</p>
                            <p class="applies-zs">SDKAppID是NOWPAY应用唯一的标识，调用API时需要提供参数</p>
                        </div>
                    </div>
                    <div class="applies-li f12">
                        <div class="applies-left">
                             App Key
                        </div>
                        <div class="applies-right ">
                            <p class="applies-txt ">
                               <span v-if="typeText==true"> {{dataBox.appKey}}</span>
                                <span v-else>****************</span>
                                 <span class="lanColor" @click="showFocus">{{typeText==true?"隐藏":"显示"}}</span>
                                  <span class="lanColor" @click="Reset()">重置</span>
                            </p>
                            <p class="applies-zs">App Key 是用来校验商户发送请求合法性的密码，与SDK AppID 对应，需要商户高度保密，切勿把密码存储再客户端</p>
                        </div>
                    </div>
                    <div class="applies-li f12">
                        <div class="applies-left">
                            创建时间
                        </div>
                        <div class="applies-right ">
                            <p class="applies-txt ">{{createTime}}</p>
                        </div>
                    </div>
                    <div class="applies-li f12">
                        <div class="applies-left">
                            最近修改时间
                        </div>
                        <div class="applies-right ">
                            <p class="applies-txt ">{{updateTime}}</p>
                        </div>
                    </div>
                    <div class="applies-li f12">
                        <div class="applies-left">
                            应用状态
                        </div>
                        <div class="applies-right ">
                            <p v-if="dataBox.isUse==true" class="applies-txt greenTxt">运行中</p>
                            <p v-else>停用</p>
                        </div>
                    </div>
                    <div class="applies-li f12">
                        <div class="applies-left">
                            应用名称
                        </div>
                        <div class="applies-right ">
                            <p class="applies-txt ">
                                 <!-- {{appliseName}} -->
                                 {{dataBox.sdkName}}
                                <span class="lanColor" @click="dialogFormVisible=!dialogFormVisible">编辑</span>
                            </p>
                        </div>
                    </div>
                    <div class="applies-li f12">
                        <div class="applies-left">
                            所属行业
                        </div>
                        <div class="applies-right ">
                            <p class="applies-txt ">{{dataBox.sdkIndustry}}
                                <a href="#">查看相关费率</a>
                            </p>
                        </div>
                    </div>
                    <div class="applies-li f12">
                        <div class="applies-left">
                            应用简介
                        </div>
                        <div class="applies-right ">
                            <p class="applies-txt ">
                                 <!-- {{applisejj}} -->
                                 {{dataBox.sdkSynopsis}}
                                 <span class="lanColor" @click="abstractVisible=!abstractVisible">编辑</span>
                            </p>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div class="applies-list" style="margin-top:10px;">
                <h5>开发配置</h5>
                <div class="applies-ul">
                    <div class="applies-li f12">
                        <div class="applies-left">
                            回调地址
                        </div>
                        <div class="applies-right ">
                            <p class="applies-txt ">
                                <!-- {{backUrl}} -->
                                {{dataBox.callbackPath}}
                                <span class="lanColor" @click="backVisible=!backVisible">编辑</span>
                                <span class="lanColor" @click="csFlag()">测试有效性</span>
                                <span class="lanColor">帮助文档</span>   
                            </p>
                             <p class="applies-zs">SDKAppID是NOWPAY应用唯一的标识，调用API时需要提供参数</p>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>
          <!-- 编辑应用名称 -->
      <el-dialog title="应用名称" :visible.sync="dialogFormVisible">
       <el-form label-width="70px">
          <el-form-item label="应用名称">
            <el-input placeholder="请输入应用名称" size="small" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
            <el-button  size="small" type="primary" @click="nameSubmit()">确定</el-button>
          </el-form-item>
        </el-form>  
      </el-dialog>
          <!-- 编辑应用简介 -->
      <el-dialog title="应用简介" :visible.sync="abstractVisible">
       <el-form  label-width="70px">
          <el-form-item label="应用简介">
            <!-- <el-input placeholder="请输入应用简介" size="small" v-model="applisejj"></el-input> -->
            <el-input
            class="f12"
            type="textarea"
            :autosize="{ minRows: 4, maxRows:8}"
            placeholder="请输入内容"
            v-model="form.synopsis">
            </el-input>
          </el-form-item>
          <el-form-item>
              <el-button size="small" @click="abstractVisible = false">取 消</el-button>
            <el-button  size="small" type="primary" @click="abstractSubmit()">确定</el-button>
          </el-form-item>
        </el-form>  
      </el-dialog>
          <!-- 编辑回调地址 -->
      <el-dialog title="回调地址" :visible.sync="backVisible">
       <el-form  label-width="70px">
          <el-form-item label="回调地址">
            <el-input placeholder="请输入回调地址" size="small" v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button size="small" @click="backVisible = false">取 消</el-button>
            <el-button  size="small" type="primary" @click="backSubmit()">确定</el-button>
          </el-form-item>
        </el-form>  
      </el-dialog>
          <!-- 编辑回调地址 -->
      <el-dialog title="" :visible.sync="csVisible">
          <div v-if="backflag" class="cstg-box">
              <p class="el-icon-circle-check cg"></p>
              <p class="cgText">测试通过</p>
          </div>
          <div v-else class="cssb-box">
              <span class="el-icon-circle-close sb-icon"></span>
              <span style=" font-size: 16px; text-align: center;">测试失败</span>
              <p class="sbWhy">失败原因：00000000000，详情请查看帮助文档。</p>
              <div class="know">
              <el-button @click="csVisible=!csVisible"  size="small" type="primary" class="know">知道了</el-button>
              </div>
          </div>
      </el-dialog>
    </div>
</template>
<style scoped>
    @import "./index.css";
</style>
<script>
      import http from '../../../utils/http'   //ajax引入
      import api from '../../../utils/api'     //接口名字
       import common from '../../../utils/common'     //公共js
export default {
     data() {
        return {
            appkey:"6472347236423423745273542364",
            appliseName:"NOWPAY-TEST",
            applisejj:"NOWPAY-TESTNOWPAY-TEST NOWPAY-TEST NOWPAY-TEST NOWPAY-TEST NOWPAY-TEST NOWPAY-TEST NOWPAY-TEST NOWPAY-TESTNOWPAY-TEST NOWPAY-TEST NOWPAY-TEST NOWPAY-TEST NOWPAY-TEST NOWPAY-TEST NOWPAY-TEST NOWPAY-TEST",
            backUrl:"http://www.shanghu.com/nowpay_callback",
            ID:'',
            dataBox:{},
            createTime:'',
            updateTime:'',
            typeText:true,
            keyshow:true,
            dialogFormVisible:false,  //编辑应用名称弹窗状态
            abstractVisible:false,    //编辑应用简介状态
            backVisible:false,        //编辑回调地址状态
            csVisible:false,           //测试有效性
            backflag:true,            //测试成功还是失败
            nameType:"text",
            flag:"",
            form:{
                name:'',
                synopsis:'',
                url:''
            }
        }
      },
      created(){
          this.ID=this.$route.query.Id;
          this.flag=this.$route.query.Flag;
          console.log(this.$route.query.Id)
          this.sdkData()
      },
      methods: {
          sdkData:async function(){
                let datas={
                    sdkId:this.ID
                }
                const res = await http.Newpost(api.SelectSdkById,datas);
                console.log(res)
                if(res.success=="true"){
                console.log(res)
                this.dataBox=res.data
                this.createTime=common.formatDateTime(res.data.createTime)
                this.updateTime=common.formatDateTime(res.data.updateTime)
                console.log(this.dataBox)
                // this.$message({
                // message: res.message,
                // type: 'success'
                // });
                }else{
                this.$message.error(res.message);
                }
          },
          showFocus(){
            this.typeText=!this.typeText;
        //    if( this.typeText==true){
        //     this.appkey=this.appkey.replace(//g,"*")
        //    }else{
        //         this.appkey= this.appkey
        //    }
        //     console.log(this.typeInput)
          },
          Reset:async function(){
              let datas={
                  "sdkId":this.ID
              }
            const data = await http.Newpost(api.AppKey,datas);
            console.log(data)
            if(data.success=="true"){
            this.dataBox.appKey=data.data.appKey
            this.typeText=true
            this.$message({
            message: data.message,
            type: 'success'
            });
            }else{
            this.$message.error(data.message);
            }
          },
        //   appkey重置提交
          keyReset(id){
           
          },
        //   编辑queding应用名称
            nameSubmit:async function(){
            let datas={
                  "sdkId":this.ID,
                  "sdkName":this.form.name,
              }
            const data = await http.Newpost(api.UpdateSdk,datas);
            console.log(data)
            if(data.success=="true"){
                this.dialogFormVisible=!this.dialogFormVisible;
                this.$message({
                    message: data.message,
                    type: 'success'
                });
                 this.sdkData()
            }else{
            this.$message.error(data.message);
            }
            },
        // 编辑应用简介
            abstractSubmit:async function(){
                 let datas={
                  "sdkId":this.ID,
                  "sdkSynopsis":this.form.synopsis,
                    }
                const data = await http.Newpost(api.UpdateSdk,datas);
                console.log(data)
                if(data.success=="true"){
                    this.abstractVisible=!this.abstractVisible;
                    this.$message({
                    message: data.message,
                    type: 'success'
                    });
                     this.sdkData()
                }else{
                this.$message.error(data.message);
                }
            },
        // 编辑回调地址
        backSubmit:async function(){
                 let datas={
                  "sdkId":this.ID,
                  "callbackPath":this.form.url,
                    }
                const data = await http.Newpost(api.UpdateSdk,datas);
                console.log(data)
                if(data.success=="true"){
                    this.backVisible=!this.backVisible
                    this.$message({
                    message: data.message,
                    type: 'success'
                    });
                     this.sdkData()
                }else{
                this.$message.error(data.message);
                }
        },
        // 测试有效性
        csFlag:async function(){
            // this.csVisible=!this.csVisible;
             let datas={
                  "sdkId":this.ID,
                }
                const data = await http.Newpost(api.CallBackTest,datas);
                console.log(data)
                if(data.success=="true"){
                    this.$message({
                    message: data.message,
                    type: 'success'
                    });
                }else{
                this.$message.error(data.message);
                }

            // let aa=2;
            // if(aa==1){
            //     this.backflag=false
            // }else{
            //     this.backflag=true
            // }
        },
        // 停用   启用
        flagApply:async function(type){
            let _this=this;
            // 停运
            if(type===1){
              let datas={
              "sdkId":_this.ID
                }
                const data = await http.Newpost(api.StopSdk,datas);
                    console.log(data)
                    if(data.success=="true"){
                    // _this.tableFlagStop=!_this.tableFlagStop;
                    // _this.getPageData(_this.pageNo,_this.pageSize)
                    _this.flag=!_this.flag;
                    _this.$message({
                    message: data.message,
                    type: 'success'
                    });
                    }else{
                    _this.$message.error(data.message);
                    }  
            }else{
            // 启用
                let datas={
                    "sdkId":_this.ID
                }
                const data = await http.Newpost(api.StartSdk,datas);
                    console.log(data)
                    if(data.success=="true"){
                    _this.flag=!_this.flag;
                    _this.$message({
                    message: data.message,
                    type: 'success'
                    });
                    }else{
                    _this.$message.error(data.message);
                    }
            }
        }
      }
}
</script>


