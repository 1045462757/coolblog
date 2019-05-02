<template>
  <transition name="el-zoom-in-center">
    <el-card class="login-card" v-show="showLoginCard"  shadow="hover">
      <!--头部-->
      <div slot="header">
        <span id="login-title">找回密码</span>
        <br>
        <br>
        <span id="login-tip">使用注册时绑定的邮箱来找回密码</span>
      </div>

      <!--表单-->
      <el-form
        :model="findPasswordForm"
        status-icon
        :rules="registerRules"
        ref="findPasswordForm"
        class="loginForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="email"
            v-model="findPasswordForm.email"
            autocomplete="off"
            clearable
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="findPassword('findPasswordForm')" round>确定</el-button>
          <br>
          <el-button type="text" class="login-btn">
            <router-link to="/login">想起密码</router-link>
          </el-button>
        </el-form-item>
      </el-form>

      <el-dialog
        title="正在重置密码"
        :visible.sync="centerDialogVisible"
        width="30%"
        :close-on-click-modal="false"
        center
        :show-close="false"
      >
        <span slot="footer" class="dialog-footer" v-loading="true"></span>
      </el-dialog>
    </el-card>
  </transition>
</template>

<script>
export default {
  name: "ForgetPassword",
  data() {
    return {
      showLoginCard: false,
      centerDialogVisible: false,
      findPasswordForm: {
        email: ""
      },
      registerRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    findPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Loading.start();

          this.centerDialogVisible = true;

          let data = {
            email: this.findPasswordForm.email
          };

          this.$http
            .put(this.globalApi.UpdatePasswordByEmailApi, data, {
              emulateJSON: true
            })
            .then(
              response => {
                this.$Loading.finish();

                this.centerDialogVisible = false;

                // console.log(response.data);

                if (response.data.status != 200) {
                  console.log(response.data.message);
                  this.$message({
                    message: response.data.message,
                    type: "error",
                    center: true,
                    duration: 2000
                  });
                  this.findPasswordForm.email = "";
                } else {
                  this.$notify({
                    title: "重置密码成功",
                    message: "新密码已发送至邮箱",
                    type: "success",
                    duration: 5000
                  });
                  this.$router.push({ path: "/login" });
                }
              },
              err => {
                this.$Loading.error();

                this.centerDialogVisible = false;

                this.$message({
                  message: "重置密码失败:服务器异常",
                  type: "error",
                  center: true,
                  duration: 2000
                });
                this.findPasswordForm.email = "";
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
  }
};
</script>