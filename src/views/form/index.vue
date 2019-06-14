<template>
  <div style="background: #f4f4f5; height: 1000px">
    <span style="margin-bottom: 20px">.</span>
    <el-card class="userCard">
      <h3 style="margin: 10px; text-align: center;">机票订单</h3>
      <el-divider></el-divider>
      <h4>
        <svg-icon icon-class="yonghu" style="width: 25px; height: 25px"/>
        {{name}}已登录
        <el-button style="float: right" type="text" @click="logout">切换 ></el-button>
      </h4>
    </el-card>
    <el-card class="userCard" style="height: 650px">
      <el-collapse-transition>
        <div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1">
          </el-pagination>
          <el-card
            v-for="(ticket, index) in ticketList"
            :key="index"
            shadow="never"
            style="background: #dde9ff; margin-top: 20px"
          >
            <div slot="header">
              <h4 style="margin: 0px;color: #409EFF">
                {{ ticket.startcity }}
                <svg-icon icon-class="danxiangjiantou"/>
                {{ ticket.endcity }}
                <span style="color: #1d1d29; margin-left: 10px">{{ ticket.ID }}</span>
                <span style="color: #74db6b; float: right; font-size: 12px">订票成功</span>
              </h4>
            </div>
            <div style="font-size: 14px; padding-bottom: 20px">
              <p style="margin-top: 0px">{{ ticket.buytime }}</p>
              <span v-for="(item, index) in ticketList[index].buyusers" :key="index">{{item.name}} </span><br>
              <el-button style="float: right" type="danger" plain size="mini" @click="deForm(index)">取消订单</el-button>
            </div>
          </el-card>
        </div>
      </el-collapse-transition>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getform, deleteform } from '../../api/user'
  export default {
    mounted() {
      // getform (sessionStorage.getItem('id')).then(response => {
      //   this.ticketList = response
      // })
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        ticketList: [
          {
            startcity: '上海',
            endcity: '北京',
            starttime: '19:45',
            endtime: '21:30',
            price: '443',
            company: '南方航空',
            ID: 'MU3366',
            buytime: '04月07日 19：53',
            buyusers: [{ name: 'harry' }]
          }
        ]
      }
    },
    methods: {
      deForm(index) {
        this.$confirm('此操作将永久删除订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // deleteform().then(response => {
            this.ticketList.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      async logout(){
        await this.$store.dispatch('user/logout')
        this.$router.push('/login?redirect=${this.$route.fullPath}')
      }
    }
  }
</script>

<style scoped>
  .userCard {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
</style>

