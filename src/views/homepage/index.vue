<template>
  <div class="block">
    <div class="head" style="text-align: center">
      <!--<el-image src="../../icons/svg/head.png" style="width: 100px; height: 100px" fit="fill">-->
      <!--<div slot="placeholder" class="image-slot">-->
      <!--加载中<span class="dot">...</span>-->
      <!--</div>-->
      <!--</el-image>-->
      <img src="../../icons/svg/head.png" style="width: 80px; height: 80px; margin-top: 15px"><br>
      <span>{{ name }}</span>
    </div>
    <!--<el-button type="text">修改</el-button>-->
    <div class="message">
      <el-card class="messagebox" shadow="hover">
        <span class="p">性别：{{sex}}</span>

      </el-card>
      <el-card class="messagebox" shadow="hover">
        <span class="p">年龄：{{age}}</span>
        <el-popover
          placement="bottom">
          <div style="text-align: right; margin: 0">
            <el-input v-model="ageChange" placeholder="请输入内容"/>
            <el-button type="primary" size="mini" @click="agechange" style="margin-top: 5px">确定修改</el-button>
          </div>
          <el-button slot="reference" type="text" style="padding: unset;float: right">修改</el-button>
        </el-popover>
      </el-card>
      <el-card class="messagebox" shadow="hover">
        <span class="p">电话：{{phone}}</span>
        <el-popover
          placement="bottom">
          <div style="text-align: right; margin: 0">
            <el-input v-model="phoneChange" placeholder="请输入内容"/>
            <el-button type="primary" size="mini" @click="phonechange">确定修改</el-button>
          </div>
          <el-button slot="reference" type="text" style="padding: unset;float: right">修改</el-button>
        </el-popover>
      </el-card>
      <el-card class="messagebox" shadow="hover">
        <span class="p">邮箱：{{mail}}</span>
        <el-popover
          placement="bottom">
          <div style="text-align: right; margin: 0">
            <el-input v-model="mailChange" placeholder="请输入内容"/>
            <el-button type="primary" size="mini" @click="mailchange">确定修改</el-button>
          </div>
          <el-button slot="reference" type="text" style="padding: unset; float: right">修改</el-button>
        </el-popover>
      </el-card>
      <el-row :gutter="40" style="width: 43%; margin-left: auto;margin-right: auto;margin-top: 30px">
        <el-col :span="12">
          <el-card class="halfmessagebox" shadow="hover">
            <el-button type="text" style="padding: unset;" @click="passchange">修改密码</el-button>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="halfmessagebox" shadow="hover">
            <el-button type="text" style="padding: unset;" @click="logout">注册新账号</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose">
      <span slot="title">修改密码</span>
      <h4>请输入原始密码</h4>
      <el-input v-model="originPass" type="password"/>
      <h4>请输入修改后的密码</h4>
      <el-input v-model="changePass" type="password"/>
      <h4>请再次输入</h4>
      <el-input v-model="changePass2" type="password"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="sendPass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Homepage',
    computed: {
      ...mapGetters([
        'name',
        'mail',
        'phone',
        'age',
        'sex'
      ])
    },
    data() {
      return {
        ageChange: '',
        mailChange: '',
        phoneChange: '',
        originPass: '',
        changePass: '',
        changePass2: '',
        dialogVisible: false
      }
    },
    methods: {
      agechange() {
        sessionStorage.setItem('age', this.ageChange)
        this.$router.go(0)
      },
      mailchange() {
        sessionStorage.setItem('mail', this.mailChange)
        this.$router.go(0)
      },
      phonechange() {
        sessionStorage.setItem('phone', this.phoneChange)
        this.$router.go(0)
      },
      passchange() {
        this.dialogVisible = true
      },
      sendPass() {
        this.$confirm('确认修改密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.dialogVisible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style scoped>
  .messagebox {
    border-radius: 20px;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    padding: 0px;
    background: #f4f4f5;
  }

  .halfmessagebox {
    border-radius: 20px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    padding: 0px;
    background: #bfcbd9;
  }

  .block {
    background-color: #DCDFE6;
    height: 800px;
  }

  .message {
    margin-top: 40px;
  }

  .p {
    font-size: 17px;
    margin-top: -10px;
    margin-bottom: -10px;
    margin-left: 20%;
    color: #263445;
    white-space: nowrap;
  }
</style>
