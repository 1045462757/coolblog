<template>
  <el-card class="box-card-main" v-loading="loading">
    <div v-if="loadingSuccess">
      <Tip v-if="tip.businessError" :tip="tip" v-on:refresh="getUserInformation()"></Tip>
      <div v-else="tip.businessError">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <!--头像-->
        <div class="left">
          <transition name="el-zoom-in-center">
            <el-card class="box-card-header" v-show="showCard">
              <div slot="header" class="clearfix">
                <span>头像</span>
              </div>
              <div>
                <el-upload
                  class="avatar-uploader"
                  :action="avatarUrl"
                  :data="data"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleAvatarFailed"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="form.headPortrait" :src="form.headPortrait" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-card>
          </transition>
        </div>

        <!--信息-->
        <div class="right">
          <transition name="el-zoom-in-center">
            <el-card class="box-card-main" v-show="showCard">
              <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">
                <el-form-item label="姓名" prop="name">
                  <el-input
                    v-model="form.name"
                    maxlength="10"
                    placeholder="请输入姓名"
                    clearable
                    @blur="validSubmit()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-select v-model="form.sex" placeholder="请选择性别" @blur="validSubmit()">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                    <el-option label="保密" value="保密"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                  <el-col :span="21">
                    <el-date-picker
                      type="date"
                      value-format="yyyy-MM-dd"
                      format="yyyy 年 MM 月 dd 日"
                      placeholder="选择日期"
                      v-model="form.birthday"
                      style="width: 100%;"
                      @blur="validSubmit()"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    v-model="form.email"
                    maxlength="20"
                    placeholder="请输入邮箱"
                    clearable
                    @blur="validSubmit()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                  <el-input
                    v-model="form.phone"
                    maxlength="15"
                    placeholder="请输入手机号码"
                    clearable
                    @blur="validSubmit()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                  <el-input
                    v-model="form.qq"
                    maxlength="15"
                    placeholder="请输入QQ"
                    clearable
                    @blur="validSubmit()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="weChat">
                  <el-input
                    v-model="form.weChat"
                    maxlength="15"
                    placeholder="请输入微信"
                    clearable
                    @blur="validSubmit()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="爱好">
                  <el-input
                    v-model="form.hobby"
                    maxlength="20"
                    placeholder="请输入爱好"
                    clearable
                    @blur="validSubmit()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="职业">
                  <el-input
                    v-model="form.profession"
                    maxlength="10"
                    placeholder="请输入职业"
                    clearable
                    @blur="validSubmit()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="住址">
                  <el-input
                    v-model="form.address"
                    maxlength="10"
                    placeholder="请输入住址"
                    clearable
                    @blur="validSubmit()"
                  ></el-input>
                </el-form-item>
                <el-form-item label="学校">
                  <el-input
                    v-model="form.school"
                    maxlength="10"
                    placeholder="请输入学校"
                    clearable
                    @blur="validSubmit()"
                  ></el-input>
                </el-form-item>
                <br>
                <el-form-item label="个人简介">
                  <el-input
                    type="textarea"
                    v-model="form.introduction"
                    maxlength="300"
                    placeholder="请输入简介"
                    clearable
                    @blur="validSubmit()"
                  ></el-input>
                </el-form-item>
                <br>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('form')" :disabled="submit">提交</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </transition>
        </div>
      </div>
    </div>
    <Tip v-else="loadingSuccess" :tip="tip" v-on:refresh="getUserInformation()"></Tip>
  </el-card>
</template>

<script>
import { getCookie } from "@/util/cookie.js";
import EventVue from "@/util/EventVue.js";
import Tip from "@/components/main/public/Tip";
import store from "@/vuex/store.js";
export default {
  name: "Information",
  store,
  components: { Tip },
  data() {
    return {
      showCard: false,
      loading: true,
      loadingSuccess: false,
      submit: true,
      form: {},
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, message: "不少于2个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthday: [
          {
            required: true,
            message: "请选择生日",
            trigger: "change"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 10, message: "不少于10个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 10, message: "不少于10个字符", trigger: "blur" }
        ],
        qq: [
          { required: true, message: "请输入qq", trigger: "blur" },
          { min: 5, message: "不少于5个字符", trigger: "blur" }
        ],
        weChat: [
          { required: true, message: "请输入微信", trigger: "blur" },
          { min: 2, message: "不少于2个字符", trigger: "blur" }
        ]
      },
      tip: {
        show: false,
        netError: false,
        businessError: false,
        errorMessage: "",
        emptyBlog: false,
        emptyRemark: false
      },
      avatarUrl: this.globalApi.UpdateUserApi,
      data: {
        userId: getCookie("userId")
      }
    };
  },
  methods: {
    validSubmit() {
      this.submit = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认修改吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.modifyUserInformation();
              this.submit = true;
            })
            .catch(() => {
              this.submit = false;
            });
        } else {
          this.submit = true;
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      // this.form.headPortrait = URL.createObjectURL(file.raw);
      this.form.headPortrait = res.data;
      this.$message({
        message: "上传成功",
        type: "success",
        center: true,
        duration: 2000
      });
    },
    handleAvatarFailed(err) {
      this.$message({
        message: "上传失败，服务器异常",
        type: "error",
        center: true,
        duration: 2000
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //获取用户信息
    getUserInformation() {
      if (this.$store.state.information != "") {
        this.loading = false;
        this.loadingSuccess = true;
        this.showCard = true;
        this.form = this.$store.state.information;
      } else {
        this.loading = true;
        this.loadingSuccess = false;

        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";
        this.tip.emptyBlog = false;
        this.tip.emptyRemark = false;

        let data = {
          userId: getCookie("userId")
        };
        this.$http
          .get(this.globalApi.RetrieUserInformationApi, { params: data })
          .then(
            response => {
              // console.log(response.data);
              this.loading = false;
              this.loadingSuccess = true;
              if (response.data.status != 200) {
                console.log(response.data.message);
                this.tip.show = true;
                this.tip.businessError = true;
                this.tip.errorMessage = response.data.message;
              } else {
                //success
                // console.log(response.data.data);
                this.showCard = true;

                this.form = response.data.data;

                //存入vuex
                this.$store.commit("addInformation", response.data.data);

                EventVue.$emit("account", this.form.name);
              }
            },
            err => {
              this.loading = false;
              this.loadingSuccess = false;
              this.tip.show = true;
              this.tip.netError = true;
            }
          );
      }
    },

    //修改用户信息
    modifyUserInformation() {
      this.$Loading.start();

      let data = {
        userId: getCookie("userId"),
        name: this.form.name,
        birthday: this.form.birthday,
        hobby: this.form.hobby,
        email: this.form.email,
        phone: this.form.phone,
        qq: this.form.qq,
        weChat: this.form.weChat,
        home: this.form.address,
        work: this.form.profession,
        school: this.form.school,
        introduction: this.form.introduction,
        sex: this.form.sex
      };

      this.$http.put(this.globalApi.UpdateUserInformationApi, data).then(
        response => {
          this.$Loading.finish();
          // console.log(response.data);
          if (response.data.status != 200) {
            //failed
            this.$message({
              message: response.data.message,
              type: "error",
              center: true,
              duration: 2000
            });
          } else {
            //success
            this.$message({
              message: "修改成功",
              type: "success",
              center: true,
              duration: 2000
            });

            //删除vuex
            this.$store.state.information = "";
          }
        },
        err => {
          this.$Loading.error();
          this.$message({
            message: "修改用户信息失败:服务器异常",
            type: "error",
            center: true,
            duration: 2000
          });
        }
      );
    }
  },
  mounted() {
    this.getUserInformation();
  }
};
</script>

<style scoped>
.box-card-main {
  width: 95%;
  margin: 20px auto;
  border-radius: 50px;
}
.clearfix {
  font-size: 20px;
}
.left {
  width: 30%;
  float: left;
}
.right {
  width: 70%;
  float: right;
}
.box-card-header {
  height: 550px;
  width: 95%;
  margin: 20px auto;
  border-radius: 50px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 300px;
  line-height: 300px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 300px;
  display: block;
}
</style>
