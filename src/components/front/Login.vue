<template>
  <transition name="el-zoom-in-center">
    <el-card class="login-card" v-show="showLoginCard"  shadow="hover">
      <!--头部-->
      <div slot="header">
        <span id="login-title">登录</span>
        <br>
        <br>
        <span id="login-tip">感谢您使用CoolBlog</span>
      </div>

      <!--表单-->
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="loginForm">
        <el-form-item label="账号" prop="account">
          <el-input
            v-model="loginForm.account"
            clearable
            placeholder="请输入账号"
            @keyup.enter.native="login('loginForm')"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            clearable
            show-password
            @keyup.enter.native="login('loginForm')"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login('loginForm')" round>登录</el-button>
          <br>
          <el-button type="text" class="login-btn">
            <router-link to="/register">没有账号?</router-link>
          </el-button>
          <el-button type="text" class="login-btn">
            <router-link to="/forgetPassword">忘记密码?</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </transition>
</template>

<script>
import { setCookie, getCookie } from "@/util/cookie.js";
import EventVue from "@/util/EventVue.js";
export default {
  data() {
    //校验账号
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (value.length < 8) {
        return callback(new Error("账号不能小于8位"));
      } else {
        callback();
      }
    };
    //校验密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        return callback(new Error("密码不能小于8位"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      showLoginCard: false
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Loading.start();

          let data = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };

          this.$http.post(this.globalApi.LoginApi, data).then(
            response => {
              this.$Loading.finish();

              // console.log(response.data);
              if (response.data.status != 200) {
                console.log(response.data.message);
                this.$message({
                  message: response.data.message,
                  type: "error",
                  center: true,
                  duration: 2000
                });
                this.loginForm.password = "";
              } else {
                setCookie("account", data.account, 1000 * 60);
                setCookie("userId", response.data.data, 1000 * 60);
                this.$router.push("/main");
                this.$message({
                  message: "登录成功",
                  type: "success",
                  center: true,
                  duration: 2000
                });
                //显示导航栏
                EventVue.$emit("showHeader");
                //传递数据
                EventVue.$emit("account", data.account);
              }
            },
            err => {
              this.$Loading.error();
              this.$message({
                message: "登录失败:服务器异常",
                type: "error",
                center: true,
                duration: 2000
              });
              this.loginForm.password = "";

              //开发时使用，取消服务器验证
              // setCookie("account", data.account, 1000 * 60);
              // EventVue.$emit("account", data.account);
              // this.$router.push("/main");
              // EventVue.$emit("showHeader", true);
            }
          );
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.showLoginCard = true;
    /*页面挂载获取cookie，如果存在account的cookie，则跳转到主页，不需登录*/
    if (getCookie("account")) {
      this.$router.push("/main");
    }
  }
};
</script>