<template>
  <el-card class="box-card" v-show="show">
    <div slot="header" class="clearfix">
      <span>修改密码</span>
    </div>

    <transition name="el-zoom-in-center">
      <!--表单-->
      <el-form
        :model="modifyPasswordForm"
        status-icon
        :rules="modifyPasswordRules"
        ref="modifyPasswordForm"
        class="loginForm"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            type="password"
            v-model="modifyPasswordForm.oldPassword"
            autocomplete="off"
            clearable
            show-password
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword">
          <el-input
            type="password"
            v-model="modifyPasswordForm.newPassword"
            autocomplete="off"
            clearable
            show-password
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认新密码" prop="checkNewPassword">
          <el-input
            type="password"
            v-model="modifyPasswordForm.checkNewPassword"
            autocomplete="off"
            clearable
            show-password
            @keyup.enter.native="submit('modifyPasswordForm')"
            placeholder="请确认新密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit('modifyPasswordForm')" round>确认</el-button>
        </el-form-item>
      </el-form>
    </transition>
  </el-card>
</template>

<script>
import { getCookie } from "@/util/cookie.js";
export default {
  name: "ModifyPassword",
  data() {
    //旧密码校验
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else if (value.length < 8) {
        return callback(new Error("密码不能小于8位"));
      } else {
        if (this.modifyPasswordForm.oldPassword !== "") {
          this.$refs.modifyPasswordForm.validateField("checkPass");
        }
        callback();
      }
    };

    //新密码校验
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        return callback(new Error("密码不能小于8位"));
      } else {
        if (this.modifyPasswordForm.checkPass !== "") {
          this.$refs.modifyPasswordForm.validateField("checkPass");
        }
        callback();
      }
    };

    //再次新密码校验
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value.length < 8) {
        return callback(new Error("密码不能小于8位"));
      } else if (value !== this.modifyPasswordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      modifyPasswordForm: {
        oldPassword: "",
        newPassword: "",
        checkNewPassword: ""
      },
      modifyPasswordRules: {
        oldPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: validatePass1, trigger: "blur" }
        ],
        checkNewPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Loading.start();

          let data = {
            userId: getCookie("userId"),
            oldPassword: this.modifyPasswordForm.oldPassword,
            newPassword: this.modifyPasswordForm.newPassword
          };

          this.$http
            .put(this.globalApi.UpdatePasswordApi, data, { emulateJSON: true })
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
                  this.modifyPasswordForm.oldPassword = "";
                  this.modifyPasswordForm.newPassword = "";
                  this.modifyPasswordForm.checkNewPassword = "";
                } else {
                  this.$message({
                    message: "修改密码成功",
                    type: "success",
                    center: true,
                    duration: 2000
                  });
                }
              },
              err => {
                this.$Loading.error();

                this.$message({
                  message: "修改密码失败:服务器异常",
                  type: "error",
                  center: true,
                  duration: 2000
                });
                this.modifyPasswordForm.oldPassword = "";
                this.modifyPasswordForm.newPassword = "";
                this.modifyPasswordForm.checkNewPassword = "";
              }
            );
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.show = true;
  }
};
</script>

<style scoped>
.box-card {
  width: 95%;
  margin: 20px auto;
  border-radius: 50px;
}
.clearfix {
  font-size: 20px;
}
</style>
