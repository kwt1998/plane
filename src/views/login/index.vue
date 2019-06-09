<template>
  <div class="login-container">
    <div v-if="!ifSign">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
               label-position="left">

        <div class="title-container">
          <h3 class="title">xx航空票务系统</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user"/>
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:45%;margin-bottom:30px;"
                   @click.native.prevent="handleLogin">登陆
        </el-button>
        <el-button :loading="loading" type="primary" style="width:45%;margin-bottom:30px; float:right"
                   @click.native.prevent="handleSign">注册
        </el-button>

      </el-form>
    </div>
    <div v-if="ifSign" class="login-form">
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>
      <el-form  label-position="left" status-icon ref="signForm" :rules="signRules" :model="signUser">
        <h4>用户名：</h4>
        <el-form-item prop="name">
          <el-input  v-model="signUser.name" placeholder="请输入内容"  clearable ></el-input>
        </el-form-item>
        <h4>密码：</h4>
        <el-form-item  prop="code">
          <el-input v-model="signUser.code" placeholder="请输入内容"  show-password></el-input>
        </el-form-item>
        <h4>确认密码：</h4>
        <el-form-item  prop="code2">
          <el-input v-model="signUser.code2" placeholder="请输入内容"  show-password></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit('signForm')">提交</el-button>
        <el-button @click="resetForm('signForm')">返回</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { validUsername } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Login',
    computed: {
      ...mapGetters([
        'type'
      ])
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不得低于3位'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.signUser.code !== '') {
            this.$refs.signForm.validateField('code2')
          }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.signUser.code) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ifSign: false,
        loginForm: {
          username: 'admin',
          password: '111111'
        },
        loginRules: {
          // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        signUser: {
          name: '',
          code: '',
          code2: ''
        },
        signRules: {
          name: [
            { required: true,message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          code: [
            { validator: validatePass, trigger: 'blur' }
          ],
          code2: [
            {  validator: validatePass2, trigger: 'blur' }
          ]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    }
    ,
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        }
        ,
        immediate: true
      }
    }
    ,
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleSign() {
        this.ifSign = true
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '恭喜你，注册成功',
              type: 'success'
            })
            return true
          } else {
            this.$message({
              message: '注册失败，请检查你的输入',
              type: 'error'
            })
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.ifSign = false
      }
    }
  }
</script>

<style lang="scss">

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 92%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    h4 {
      margin-bottom: 5px;
      color: #181818;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

  }
</style>
