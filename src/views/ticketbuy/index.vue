<template>
  <div style="background-color: #DCDFE6; height: 1080px">
    <span style="background-color: #DCDFE6">.</span>
    <el-collapse-transition>
      <div v-if="check">
        <el-card class="card">
          <h3 style="margin-top: 0px; text-align: center">开始购票</h3>
          <el-divider></el-divider>
          <el-form ref="form" label-width="120px">
            <el-form-item label="地点">
              <el-select v-model="sortForm.source" placeholder="出发">
                <el-option-group
                  v-for="group in options"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-option-group>
              </el-select>
              -
              <el-select v-model="sortForm.destination" placeholder="到达">
                <el-option-group
                  v-for="group in options"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="日期">
              <el-col :span="11">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="sortForm.departuredate"
                  :picker-options="pickerOptions"
                  align="right"
                  placeholder="选择日期"
                  type="date"
                />
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 200px;" type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-collapse-transition>
    <el-card class="checkCard">
      <p v-if="check">查询结果</p>
      <el-button v-if="!check" type="text" @click="check=!check">
        < 返回
      </el-button>
      <el-divider/>
      <span v-if="first">
        <h2 style="height: 200px">暂无结果</h2>
      </span>
      <el-collapse-transition>
        <div v-show="show3">
          <el-pagination
            v-if="check"
            :current-page="1"
            :page-size="3"
            :total="page.page_total"
            layout="prev, pager, next"
            background
            @current-change="handleCurrentChange"
          />
          <el-card
            v-for="(ticket, index) in ticketList"
            v-if="((index == number && !check)||check) && ((index>=page.page_index*3-3)&&(index<=page.page_index*3-1))"
            :key="index"
            shadow="never"
            style="background: #fffdf5; margin-top: 20px"
          >
            <div slot="header">
              <h4 style="margin: 0px;color: #409EFF">
                {{ ticket.source }}
                <svg-icon icon-class="danxiangjiantou"/>
                {{ ticket.destination }}
                <span style="float: right"><svg-icon icon-class="renminbi"/>
                  <span style="color: #f30300">{{ ticket.price }}</span></span>
              </h4>
            </div>
            <h3 v-if="check" style="margin: 0px">
              {{ ticket.departuretime }}
              <svg-icon icon-class="jipiaodancheng" style="width: 50px"/>
              {{ ticket.landingtime }}
              <span v-if="check" style="float: right">
                <svg-icon icon-class="yuding"/>
                <el-button type="text" @click="reserve(index)">预定</el-button>
              </span>
            </h3>
            <el-timeline v-if="!check" :reverse="reverse">
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
            <p style="font-size: 10px; margin-top: 20px">{{ ticket.company.companyname }}{{ ticket.flightid }}</p>
          </el-card>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <el-card v-if="!check" style="background: #f5faff; margin-top: 10px">
          <el-radio-group v-model="payForm.seat">
            <el-radio :label="0">经济舱</el-radio>
            <el-radio :label="1">普通舱</el-radio>
            <el-radio :label="2">头等舱</el-radio>
          </el-radio-group>
          <!--<span style="float: right; font-size: 13px">剩余：{{ ticketList[number].price[payForm.seat] }}张</span>-->
          <h5>乘机人</h5>
          <el-button
            v-for="(item, index) in passengers"
            :key="index"
            size="medium"
            @click="passcheck(index)"
          >
            {{ item.name }}
          </el-button>
          <el-popover
            v-model="visible2"
            placement="right"
          >
            <p/>
            <div style="text-align: right; margin: 0">
              <el-form :model="newpassenger">
                <el-form-item label="姓名">
                  <el-input v-model="newpassenger.name"/>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input v-model="newpassenger.number"/>
                </el-form-item>
              </el-form>
              <el-button size="mini" type="text" @click="newcancel">取消</el-button>
              <el-button size="mini" type="primary" @click="addpassenger">确定</el-button>
            </div>
            <el-button slot="reference" size="medium" style="color: #409EFF"> + 新增</el-button>
          </el-popover>
          <br>
          <span
            v-for="(item, index) in passengers"
            v-if="passenger && index == passshow"
            :key="index"
          >
            <el-row>
              <el-col :span="1">
                <svg-icon icon-class="shanchu" style="margin-top: 34px" @click="depassenger(index)"/>
              </el-col>
              <el-col :span="23">
                <h4 style="margin-bottom: 4px">{{ item.name }}</h4>
                <p style="font-size: 13px">身份证 {{ item.number }}</p>
              </el-col>
            </el-row>
            <el-divider/>
          </span>
          <h5 style="margin-top: 30px">总金额：
            <svg-icon icon-class="renminbi"/>
            <span style="color: red">{{total}}</span></h5>
          <div style="margin-top: 40px">
            <h5>选择支付方式</h5>
            <el-radio-group v-model="pay">
              <el-radio :label="1">
                <svg-icon icon-class="yinhangqia" style="width: 20px; height: 20px"/>
              </el-radio>
              <el-radio :label="2">
                <svg-icon icon-class="weixin" style="width: 20px; height: 20px"/>
              </el-radio>
              <el-radio :label="3">
                <svg-icon icon-class="umidd17" style="width: 20px; height: 20px"/>
              </el-radio>
            </el-radio-group>
          </div>
          <el-button style="margin-top: 100px" @click="submit()">确认支付</el-button>
        </el-card>
      </el-collapse-transition>
    </el-card>
  </div>
</template>

<script>
  import { searchticket, buy } from '../../api/user'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        show3: false,
        first: true,
        check: true,
        number: '1',
        radio: '',
        pay: '',
        passenger: false,
        passshow: '',
        visible2: false,
        total: 0,
        page: {
          page_index: 1,
          page_total: 10,
        },
        sortForm: {
          departuredate: '',
          source: '',
          destination: ''
        },
        options: [{
          label: '热门城市',
          options: [{
            value: '上海',
            label: '上海'
          }, {
            value: '北京',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: '成都',
            label: '成都'
          }, {
            value: '深圳',
            label: '深圳'
          }, {
            value: '广州',
            label: '广州'
          }, {
            value: '大连',
            label: '大连'
          }]
        }],
        ticketList: [],
        activities: [{
          content: '虹桥机场',
          timestamp: ''
        }, {
          content: '北京机场',
          timestamp: ''
        }],
        passengers: [
          { name: sessionStorage.getItem('name'), number: '360481192839283' }
        ],
        newpassenger: { name: '', number: '' },
        payForm: {
          passengers: [],
          planeId: '',
          seat: ''
        }
      }
    },
    methods: {
      freshtotal() {
        this.total = this.passengers.length * this.ticketList[this.number].price
      },
      onSubmit() {
        if (this.sortForm.departuredate && this.sortForm.destination && this.sortForm.source) {
          if (!this.show3) {
            searchticket(this.sortForm).then(response => {
              this.ticketList = response
              this.page.page_total = this.ticketList.length
            })
            this.show3 = !this.show3
            this.first = false
          }
        } else {
          this.$message.error('请输入完整信息')
        }
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'error'
        })
      },
      reserve(index) {
        this.activities[0].timestamp = this.ticketList[this.number].departuretime
        this.activities[1].timestamp = this.ticketList[this.number].landingtime
        this.check = !this.check
        this.number = index
        freshtotal()
      },
      submit() {
        if (this.pay){
          this.payForm.passengers = this.passengers
          this.payForm.planeId = sessionStorage.getItem('id')
          this.$confirm(' 确认支付', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            buy(this.payForm).then(response => {
              if(response === 1) {
                this.$message({
                  type: 'success',
                  message: '支付成功!'
                })
              }
              else {
                this.$message({
                  type: 'success',
                  message: '剩余票数不足，支付失败'
                })
              }
            })
            // })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消支付'
            })
          })
        }
        else{
          this.$message({
            type: 'error',
            message: '请选择支付方式'
          })
        }
      },
      passcheck(index) {
        this.passenger = !this.passenger
        this.passshow = index
      },
      depassenger(index) {
        this.passengers.splice(index, 1)
        this.freshtotal()
      },
      addpassenger() {
        const name = this.newpassenger.name
        const number = this.newpassenger.number
        this.passengers.push({ name, number })
        this.newpassenger.name = null
        this.newpassenger.number = null
        this.visible2 = false
        this.freshtotal()
      },
      newcancel() {
        this.visible2 = false
        this.newpassenger.name = null
        this.newpassenger.number = null
      },
      handleCurrentChange(val) {
        this.page.page_index = val
      }
    }
  }
</script>

<style scoped>

  .card {
    width: 60%;
    height: 300px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
  }

  .checkCard {
    width: 60%;
    background: #eeefef;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
  }

</style>

