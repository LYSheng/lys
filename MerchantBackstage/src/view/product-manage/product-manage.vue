<template>
    <div>
      <div class="search-box">
        <div class="search-top">
          <div class="search-top-left">
            <el-input
              size="medium"
              placeholder="交易号"
              suffix-icon="el-icon-search"
              >
            </el-input>
            <el-button @click="showToggle" size="medium" type="primary" class="btn-radius">高级
              <i v-if="isShow==true" class="el-icon-caret-top el-icon--right"></i>
              <i v-else class="el-icon-caret-bottom el-icon--right"></i>

              <!--<i class="el-icon-caret-top el-icon-right" :class="{rotate:isShow==true}"></i>-->
            </el-button>

          </div>
          <div class="search-top-right">
            <span class="time-search " :class="{activeTime:active==index}" v-for="(item,index) in timeList" @click="timeClick(index,item.id)">{{item.name}}</span>
            <el-date-picker style="width: 280px"
              v-model="value6"
              type="daterange"
              size="medium"
              range-separator="~"
              :picker-options="pickerOptions"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <p style="text-align: right;font-size: 12px;margin-top: 8px;">时间跨度最多支持62天，每日11点更新数据</p>
          </div>
        </div>
        <transition name='fade'>
          <div class="search-bottom" v-show="isShow">
            <div class="deal-box">
              交易币种：
              <span class="deal-li " :class="{activeColor:biactive==index}" v-for="(item,index) in bitype" @click="biClick(index,item.id)">{{item.name}}</span>
            </div>
            <div class="deal-box" style="margin-top: 15px">
              交易类型：
              <span class="deal-li " :class="{activeColor:jyactive==index}" v-for="(item,index) in jytype" @click="jyClick(index,item.id)">{{item.name}}</span>
            </div>
          </div>
        </transition>

      </div>
      <div class="medium-box">
        <div class="medium-top">
          <ul class="medium-ul">
              <li class="medium-li">
                <span class="medium-title">订单总额</span>
                <el-tooltip content="Top center" placement="top">
                  <span class="el-icon-question tooltip-icon"></span>
                </el-tooltip>
              </li>
              <li class="medium-li medium-padding">
                <span class="medium-money">925,788,56</span>
                UEDT
              </li>
              <li class="medium-li medium-bi">
                15笔
              </li>
            </ul>
          <ul class="medium-ul">
            <li class="medium-li">
              <span class="medium-title">成交订单总额</span>
              <el-tooltip content="Top center" placement="top">
                <span class="el-icon-question tooltip-icon"></span>
              </el-tooltip>
            </li>
            <li class="medium-li medium-padding">
              <span class="medium-money">825,388,56</span>
              UEDT
            </li>
            <li class="medium-li medium-bi">
              10笔
            </li>
          </ul>
          <ul class="medium-ul">
            <li class="medium-li">
              <span class="medium-title">商家实收</span>
              <el-tooltip content="Top center" placement="top">
                <span class="el-icon-question tooltip-icon"></span>
              </el-tooltip>
            </li>
            <li class="medium-li medium-padding medium-green">
              <span class="medium-money medium-money-green">+ 678,788,56</span>
              UEDT
            </li>
            <li class="medium-li medium-bi">

            </li>
          </ul>
          <ul class="medium-ul">
            <li class="medium-li">
              <span class="medium-title">退款金额</span>
              <el-tooltip content="Top center" placement="top">
                <span class="el-icon-question tooltip-icon"></span>
              </el-tooltip>
            </li>
            <li class="medium-li medium-padding medium-red">
              <span class="medium-money medium-money-red">- 925,788,56</span>
              UEDT
            </li>
            <li class="medium-li medium-bi">
              15笔
            </li>
          </ul>
        </div>
        <transition name='fade'>
          <div class="medium-bottom" v-show="ismediumShow">
            <ul class="medium-ul">
              <li class="medium-li">
                <span class="medium-title">交易关闭订单总额</span>
                <el-tooltip content="Top center" placement="top">
                  <span class="el-icon-question tooltip-icon"></span>
                </el-tooltip>
              </li>
              <li class="medium-li medium-padding">
                <span class="medium-money">925,788,56</span>
                UEDT
              </li>
              <li class="medium-li medium-bi">
                15笔
              </li>
            </ul>
            <ul class="medium-ul">
              <li class="medium-li">
                <span class="medium-title">成交订单总额</span>
                <el-tooltip content="Top center" placement="top">
                  <span class="el-icon-question tooltip-icon"></span>
                </el-tooltip>
              </li>
              <li class="medium-li medium-padding">
                <span class="medium-money">925,788,56</span>
                UEDT
              </li>
              <li class="medium-li medium-bi">
                15笔
              </li>
            </ul>
          </div>
        </transition>
        <div class="medium-down-box"  >
          <i v-if="ismediumShow==true" @click="mediumShowToggle" class="el-icon-sort-down medium-aboust"></i>
          <i v-else class="el-icon-sort-up medium-aboust" @click="mediumShowToggle"></i>
        </div>
      </div>
      <div class="table-box" style="margin-top: 20px">
        <div class="tab-box">
          <template>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="全部交易" name="first"></el-tab-pane>
              <el-tab-pane label="收款成功" name="third"></el-tab-pane>
              <el-tab-pane label="已退款" name="fourth"></el-tab-pane>
              <el-tab-pane label="收款失败" name="wu"></el-tab-pane>
              <el-tab-pane label="退款失败" name="sex"></el-tab-pane>
            </el-tabs>
          </template>
          <i @click="exportExcel" class="el-icon-download download-icon"></i>
        </div>
        <div class="table-content">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              property="date"
              label="交易时间"
              height="33"
            >
            </el-table-column>
            <el-table-column
              label="交易类型"
              height="33"
              property="type"
            >
            </el-table-column>
            <el-table-column
              property="liushui"
              label="交易流水号"
              height="33"
            >
            </el-table-column>
            <el-table-column
              property="bitype"
              label="币种"
              height="33"
            >
            </el-table-column>
            <el-table-column
              label="交易金额"
              height="33"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.jymoney<0" class="amount huang" :class="{hui:scope.row.flagwhy !=''}">{{ scope.row.jymoney }}</span>
                <span v-else class="amount hei" :class="{hui:scope.row.flagwhy !=''}">+{{ scope.row.jymoney }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="服务费"
              height="33"
            >
              <template slot-scope="scope">
                <span class="amount" :class="{hui:scope.row.flagwhy !=''}">{{ scope.row.fwf }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="客户付款方式"
              height="33"
            >
              <template slot-scope="scope">
                <span  style="word-wrap:break-word">{{ scope.row.fktype }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商户收款终端"
              height="33"
            >
              <template slot-scope="scope">
                <p v-for="item in scope.row.zd">{{ item}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="当前状态"
              height="33"
            >
              <template slot-scope="scope">
                <span style="color: #3467b5;cursor: pointer;" @click="dialog(scope.row.flag,scope.row.id)">{{ scope.row.flag }}</span>
                <p v-if="scope.row.tuiMoney !=''" style="color: orangered" >{{ scope.row.tuiMoney }}</p>
                <p v-if="scope.row.flagwhy !=''" style="color: #dfdfdf" >{{ scope.row.flagwhy }}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-box">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
        </div>
      </div>

      <!--退款详情处理页面-->
      <el-dialog title="退款详情" :visible.sync="dialogFormVisible">
        <div class="details-top">
          <div class="details-list">
            <span class="list-name f14">收款金额：</span>
            <span class="list-money f16" style="color: orangered">+50.12345
              <span class="f12">USDT</span>
            </span>
          </div>
          <div class="details-list" style="margin-bottom: 0px">
            <span class="list-name f14">服务费：</span>
            <span class="list-money f16">-0.12345
              <span class="f12">USDT</span>
            </span>
          </div>
        </div>
        <ul class="details-content">
          <li class="details-list">
            <span class="detail-name">当前状态：</span>
            <span class="detail-data">已退款</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">退款流水号：</span>
            <span class="detail-data f12">123242536363773</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">退回路径：</span>
            <span class="detail-data f12">推到钱包</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">退款终端：</span>
            <span class="detail-data f12">pos</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">退款终端信息：</span>
            <span class="detail-data f12"></span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">用户名：</span>
            <span class="detail-data f12">1212ds</span>
          </li>
          <li class="details-list f12">
            <span class="detail-name">序列号：</span>
            <span class="detail-data">636382723682367236</span>
          </li>
        </ul>
        <p class="See f14" @click="seeClick(id)">
          {{id}}
          查看订单详情
          <i class="el-icon-arrow-right"></i>
        </p>
      </el-dialog>
      <!--交易详情-->
      <el-dialog title="交易详情" :visible.sync="dialogjyVisible">
        <div class="details-top">
          <div class="details-list">
            <span class="list-name f14">收款金额：</span>
            <span class="list-money f16" style="color: #000">+50.12345
              <span class="f12">USDT</span>
            </span>
          </div>
          <div class="details-list" style="margin-bottom: 0px">
            <span class="list-name f14">服务费：</span>
            <span class="list-money f16">-0.12345
              <span class="f12">USDT</span>
            </span>
          </div>
        </div>
        <ul class="details-content">
          <li class="details-list f12" style="margin-bottom: 3px">
            <span class="detail-name">当前状态：</span>
            <span class="detail-data">收款成功</span>
          </li>
          <li class="details-list f12">
            <span class="detail-name"></span>
            <span @click="tuiDetail(id)" class="detail-data" style="color: orangered">已退款：-242.33 <i style="cursor: pointer;" class="el-icon-arrow-right"></i> </span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">交易时间：</span>
            <span class="detail-data f12">123242536363773</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">交易流水号：</span>
            <span class="detail-data f12">推到钱包</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">客户支付方式：</span>
            <span class="detail-data f12">pos</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">客户支付账号：</span>
            <span class="detail-data f12">pos</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">商户订单号：</span>
            <span class="detail-data f12">pos</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">商户收款终端：</span>
            <span class="detail-data f12">pos</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">商户终端信息：</span>
            <span class="detail-data f12"></span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">用户名：</span>
            <span class="detail-data f12">1212ds</span>
          </li>
          <li class="details-list f12">
            <span class="detail-name">序列号：</span>
            <span class="detail-data">636382723682367236</span>
          </li>
        </ul>
      </el-dialog>
      <!--退款流水明细-->
      <el-dialog title="退款流水明细" :visible.sync="dialogtklsVisible">
        <!--<div class="block" style="text-align: center">-->
          <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--layout="prev, pager, next"-->
            <!--:pager-count="5"-->
            <!--:total="100">-->
          <!--</el-pagination>-->
        <!--</div>-->
        <div class="page-box" style="text-align: center">
          <i @click="pageLeft" class="chgepin el-icon-arrow-left"></i>
          第{{activePage}}笔/共{{lastPage}}笔
          <i @click="pageRight" class="chgepin el-icon-arrow-right"></i>
        </div>
        <div class="details-top">
          <div class="details-list">
            <span class="list-name f14">收款金额：</span>
            <span class="list-money f16" style="color: orangered">+50.12345
              <span class="f12">USDT</span>
            </span>
          </div>
          <div class="details-list" style="margin-bottom: 0px">
            <span class="list-name f14">服务费：</span>
            <span class="list-money f16">-0.12345
              <span class="f12">USDT</span>
            </span>
          </div>
        </div>
        <ul class="details-content">
          <li class="details-list">
            <span class="detail-name">当前状态：</span>
            <span class="detail-data">已退款</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">退款流水号：</span>
            <span class="detail-data f12">123242536363773</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">退回路径：</span>
            <span class="detail-data f12">推到钱包</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">退款终端：</span>
            <span class="detail-data f12">pos</span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">退款终端信息：</span>
            <span class="detail-data f12"></span>
          </li>
          <li class="details-list">
            <span class="detail-name f12">用户名：</span>
            <span class="detail-data f12">1212ds</span>
          </li>
          <li class="details-list f12">
            <span class="detail-name">序列号：</span>
            <span class="detail-data">636382723682367236</span>
          </li>
        </ul>
      </el-dialog>
    </div>
</template>
<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    data() {
      return {
        lastPage:10,
        activePage:1,
        pickerOptions: {
          disabledDate(time) {
            let curDate = (new Date()).getTime();
            let three = 62 * 24 * 3600 * 1000;
            let threeMonths = curDate - three;
            return time.getTime() > Date.now() || time.getTime() < threeMonths;;
          }
        },
        active:0,
        biactive:0,
        jyactive:0,
        isShow:false,   //高级判断
        ismediumShow:false,//订单判断
        value6:'',
        activeName: 'first',
        value5: 3.7,
        id:'',
        dialogFormVisible: false, //退款详情
        dialogjyVisible: false, //交易详情
        dialogtklsVisible: false, //退款流水明细
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        tableData: [
          {
          id:1,
          date: '2016-05-02 08：00：00',
          type:'收款',
          liushui: '12455666.8989',
          bitype: 'USDT',
          jymoney:+111234.9876,
          fwf:-989898.00,
            fktype:'now wallet  253562356****233',
            zd:['pos扫码','pos序列号'] ,
            flag:'收款成功',
            tuiMoney:'已退款  -123.99',
            flagwhy:''
      },{
            id:2,
          date: '2016-05-02 08：00：00',
          type:'收款',
          liushui: '12455666.8989',
          bitype: 'USDT',
          jymoney:-111234.9876,
          fwf:1999.00,
          fktype:'now wallet  253562356****233',
          zd:['POS'] ,
          flag:'已退款',
          tuiMoney:'',
          flagwhy:''
        },{
            id:3,
          date: '2016-05-02 08：00：00',
          type:'收款',
          liushui: '12455666.8989',
          bitype: 'USDT',
          jymoney:+111234.9876,
          fwf:-989898.00,
          fktype:'now wallet  253562356****233',
          zd:['SDK(app)','SDK序列号'] ,
          flag:'退款失败',
          flagwhy:'用户余额不足',
          tuiMoney:''
        },{
            id:4,
          date: '2016-05-02 08：00：00',
          type:'收款',
          liushui: '12455666.8989',
          bitype: 'USDT',
          jymoney:+111234.9876,
          fwf:0.00,
          fktype:'now wallet  253562356****233',
          zd:['商家序列号'] ,
          flag:'收款失败',
          flagwhy:'商户余额不足',
          tuiMoney:''
        },{
            id:5,
          date: '2016-05-02 08：00：00',
          type:'收款',
          liushui: '12455666.8989',
          bitype: 'USDT',
          jymoney:-111234.9876,
          fwf:-989898.00,
          fktype:'now wallet  253562356****233',
          zd:['sdk','sdk（订单二维码）'] ,
          flag:'交易关闭',
          flagwhy:'用户超时未支付',
          tuiMoney:''
        },{
            id:6,
            date: '2016-05-02 08：00：00',
            type:'收款',
            liushui: '12455666.8989',
            bitype: 'USDT',
            jymoney:+111234.9876,
            fwf:-989898.00,
            fktype:'now wallet  253562356****233',
            zd:['pos扫码','pos序列号'] ,
            flag:'收款成功',
            tuiMoney:'已退款  -123.99',
            flagwhy:''
          },{
            id:7,
            date: '2016-05-02 08：00：00',
            type:'收款',
            liushui: '12455666.8989',
            bitype: 'USDT',
            jymoney:-111234.9876,
            fwf:1999.00,
            fktype:'now wallet  253562356****233',
            zd:['POS'] ,
            flag:'已退款',
            tuiMoney:'',
            flagwhy:''
          }
        ],   //充值总额饼图data
        timeList:[
          {
            name:"今日",
            id:1
          },{
            name:"昨日",
            id:2
          },{
            name:"最近7天",
            id:3
          },{
            name:"最近30天",
            id:4
          }
        ],
        bitype:[
          {
            name:"全部类型",
            id:0
          },{
            name:"UEDT",
            id:1
          },{
            name:"DCNY",
            id:2
          }
        ],
        jytype:[
          {
            name:"全部类型",
            id:0
          },{
            name:"POS扫码",
            id:1
          },{
            name:"收款码",
            id:2
          },{
            name:"SDK",
            id:3
          },{
            name:"静态二维码",
            id:4
          }
        ]
      }
    },
    components: {
      // 'v-productList': productList,
      // 'v-add':add,
      // 'v-information':information
    },
    methods:{
      pageLeft(){
        if(this.activePage==1){
          this.$message('已经是第一页了');
          return ;
        }else{
          this.activePage=this.activePage-1;
        }
      },
      pageRight(){
        if(this.activePage==this.lastPage){
          this.$message('已经是最后了');
          return ;
        }else{
          this.activePage=this.activePage+1;
        }
      },
      exportExcel () {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('.table-box'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '运营报表.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
      timeClick(i,id){
        this.active=i;
      },
      biClick(i,id){
        this.biactive=i;
      },
      jyClick(i,id){
       this.jyactive=i;
      },
      showToggle:function(){
        this.isShow = !this.isShow
        if(this.isShow){
          // this.btnText = "隐藏"
        }else{
          // this.btnText = "显示"
        }
      },
      mediumShowToggle(){
        this.ismediumShow=!this.ismediumShow;
      },
      handleClick(tab, event) {
        console.log(this.activeName)
        console.log(tab, event);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      dialog(type,id){
        console.log(id)
        this.id=id;
        if(type=="已退款"){
          this.dialogFormVisible = true
        };
        if(type=="收款成功"){
          this.dialogjyVisible = true
        }
      },
      seeClick(id){
        this.dialogFormVisible = false;
        this.dialogjyVisible = true
      },
      tuiDetail(id){
        this.dialogjyVisible = false;
        this.dialogtklsVisible=true;
      }
    }
  };
</script>
<style scoped>
  @import "./index.css";
</style>

