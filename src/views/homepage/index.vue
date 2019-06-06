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
        <span class="p">性别：</span>
        <el-radio-group v-model="sex" disabled size="mini">
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
        </el-radio-group>
      </el-card>
      <el-card class="messagebox" shadow="hover">
        <span class="p">年龄：18</span>
        <el-popover
          placement="bottom">
          <div style="text-align: right; margin: 0">
            <el-input v-model="input" placeholder="请输入内容"/>
            <el-button type="primary" size="mini" @click="visible2 = false">确定修改</el-button>
          </div>
          <el-button slot="reference" type="text" style="padding: unset;float: right">修改</el-button>
        </el-popover>
      </el-card>
      <el-card class="messagebox" shadow="hover">
        <span class="p">电话：18888888888</span>
        <el-popover
          placement="bottom">
          <div style="text-align: right; margin: 0">
            <el-input v-model="input" placeholder="请输入内容"/>
            <el-button type="primary" size="mini" @click="visible2 = false">确定修改</el-button>
          </div>
          <el-button slot="reference" type="text" style="padding: unset;float: right">修改</el-button>
        </el-popover>
      </el-card>
      <el-card class="messagebox" shadow="hover">
        <span class="p">邮箱：5556464894@qq.com</span>
        <el-popover
          placement="bottom">
          <div style="text-align: right; margin: 0">
            <el-input v-model="input" placeholder="请输入内容"/>
            <el-button type="primary" size="mini" @click="visible2 = false">确定修改</el-button>
          </div>
          <el-button slot="reference" type="text" style="padding: unset; float: right">修改</el-button>
        </el-popover>
      </el-card>
      <el-row :gutter="40" style="width: 43%; margin-left: auto;margin-right: auto;margin-top: 30px">
        <el-col :span="12">
          <el-card class="halfmessagebox" shadow="hover" >
            <el-button  type="text" style="padding: unset;">修改密码</el-button>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="halfmessagebox" shadow="hover">
            <el-button  type="text" style="padding: unset;">注册新账号</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Homepage',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data(){
      return{
        sex: '男'
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
