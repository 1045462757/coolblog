<template>
  <transition name="el-zoom-in-center">
    <el-card class="login-card" v-show="showRegisterCard"  shadow="hover">
      <!--头部-->
      <div slot="header">
        <span id="login-title">注册</span>
        <br>
        <br>
        <span id="login-tip">感谢您使用CoolBlog</span>
      </div>

      <!--表单-->
      <el-form
        :model="registerForm"
        status-icon
        :rules="registerRules"
        ref="registerForm"
        class="loginForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="registerForm.account" clearable placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
            clearable
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registerForm.checkPass"
            autocomplete="off"
            clearable
            show-password
            @keyup.enter.native="register('registerForm')"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            type="email"
            v-model="registerForm.email"
            autocomplete="off"
            clearable
            @keyup.enter.native="register('registerForm')"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register('registerForm')" round>注册</el-button>
          <br>
          <el-button type="text" class="login-btn">
            <router-link to="/login">已有账号?</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </transition>
</template>

<script>
export default {
  data() {
    //账号校验
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (value.length < 8) {
        return callback(new Error("账号不能小于8位"));
      } else {
        callback();
      }
    };
    //密码校验
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        return callback(new Error("密码不能小于8位"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    //再次密码校验
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value.length < 8) {
        return callback(new Error("密码不能小于8位"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        account: "",
        password: "",
        checkPass: "",
        email: ""
      },
      registerRules: {
        account: [{ required: true, validator: checkAccount, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      showRegisterCard: false
    };
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Loading.start();

          let data = {
            account: this.registerForm.account,
            password: this.registerForm.password,
            email: this.registerForm.email
          };

          this.$http
            .post(this.globalApi.RegisterApi, data, { emulateJSON: true })
            .then(
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
                  this.registerForm.account = "";
                  this.registerForm.password = "";
                  this.registerForm.checkPass = "";
                  this.registerForm.email = "";
                } else {
                  this.$message({
                    message: "注册成功",
                    type: "success",
                    center: true,
                    duration: 2000
                  });
                  this.$router.push({ path: "/login" });
                }
              },
              err => {
                this.$Loading.error();

                this.$message({
                  message: "注册失败:服务器异常",
                  type: "error",
                  center: true,
                  duration: 2000
                });
                this.registerForm.account = "";
                this.registerForm.password = "";
                this.registerForm.checkPass = "";
                this.registerForm.email = "";
              }
            );
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.showRegisterCard = true;
  }
};
</script>