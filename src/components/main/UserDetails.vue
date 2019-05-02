<template>
  <el-card class="box-card-main" v-loading="loading">
    <div v-if="loadingSuccess">
      <Tip :tip="tip" v-on:refresh="getUserInformation()" v-if="tip.businessError"></Tip>
      <div v-else="tip.businessError">
        <div slot="header" class="clearfix">
          <span id="title">他人信息</span>
        </div>
        <br>
        <div id="focus">
          <el-switch v-model="form.isFocus" active-text="关注" @change="focus()"></el-switch>
        </div>
        <br>

        <!--头像-->
        <div class="left">
          <transition name="el-zoom-in-center">
            <el-card class="box-card-header" v-show="showCard">
              <div slot="header" class="clearfix">
                <span>头像</span>
              </div>
              <img v-if="form.headPortrait" :src="form.headPortrait" class="avatar">
            </el-card>
          </transition>
        </div>

        <!--信息-->
        <div class="right">
          <transition name="el-zoom-in-center">
            <el-card class="box-card-main" v-show="showCard">
              <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">
                <el-form-item label="姓名">
                  <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-input v-model="form.sex" disabled></el-input>
                </el-form-item>
                <el-form-item label="生日">
                  <el-col :span="21">
                    <el-date-picker v-model="form.birthday" style="width: 100%;" disabled></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="爱好">
                  <el-input v-model="form.hobby" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="form.email" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input v-model="form.phone" disabled></el-input>
                </el-form-item>
                <el-form-item label="qq">
                  <el-input v-model="form.qq" disabled></el-input>
                </el-form-item>
                <el-form-item label="微信">
                  <el-input v-model="form.weChat" disabled></el-input>
                </el-form-item>
                <el-form-item label="职业">
                  <el-input v-model="form.profession" disabled></el-input>
                </el-form-item>
                <el-form-item label="地址">
                  <el-input v-model="form.address" disabled></el-input>
                </el-form-item>
                <el-form-item label="学校">
                  <el-input v-model="form.school" disabled></el-input>
                </el-form-item>
                <br>
                <el-form-item label="个人简介">
                  <el-input type="textarea" v-model="form.introduction" disabled></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </transition>
        </div>
      </div>
    </div>
    <Tip :tip="tip" v-on:refresh="getUserInformation()" v-else="loadingSuccess"></Tip>
  </el-card>
</template>

<script>
import { getCookie } from "@/util/cookie.js";
import Tip from "@/components/main/public/Tip";
export default {
  name: "BlogDetails",
  components: { Tip },
  data() {
    return {
      loading: true,
      loadingSuccess: false,
      showCard: true,
      tip: {
        show: false,
        netError: false,
        businessError: false,
        errorMessage: "",
        emptyBlog: false,
        emptyRemark: false
      },
      form: {
        userId: 1,
        name: "1",
        sex: "2",
        birthday: "3",
        hobby: "4",
        email: "5",
        phone: "6",
        qq: "7",
        weChat: "8",
        profession: "9",
        address: "1",
        school: "1",
        introduction: "1",
        headPortrait: "1",
        isFocus: false
      }
    };
  },
  methods: {
    //获取用户信息
    getUserInformation() {
      this.loading = true;
      this.loadingSuccess = false;

      this.tip.show = false;
      this.tip.netError = false;
      this.tip.businessError = false;
      this.tip.errorMessage = "";
      this.tip.emptyBlog = false;
      this.tip.emptyRemark = false;

      let data = {
        focusId: this.$route.query.userId,
        fansId: parseInt(getCookie("userId"))
      };
      this.$http
        .get(this.globalApi.RetrieOtherUserInformationApi, { params: data })
        .then(
          response => {
            // console.log(response.data);
            this.loading = false;
            this.loadingSuccess = true;
            if (response.data.status != 200) {
              //failed
              this.tip.show = true;
              this.tip.businessError = true;
              this.tip.errorMessage = response.data.message;
            } else {
              //success
              // console.log(response.data.data);
              this.showCard = true;
              this.blog = response.data.data;

              this.form = response.data.data;
            }
          },
          err => {
            this.loading = false;
            this.loadingSuccess = false;
            this.tip.show = true;
            this.tip.netError = true;
          }
        );
    },

    //关注用户
    focus() {
      if (this.form.isFocus == true) {
        this.$Loading.start();
        let data = {
          fansId: parseInt(getCookie("userId")),
          focusId: this.form.userId
        };
        // console.log(data);

        this.$http
          .post(this.globalApi.CreateUserCollectionApi, data, {
            emulateJSON: true
          })
          .then(
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
                setTimeout(
                  function() {
                    this.form.isFocus = false;
                  }.bind(this),
                  2000
                );
              } else {
                //success
                this.$message({
                  message: "关注成功",
                  type: "success",
                  center: true,
                  duration: 2000
                });
              }
            },
            err => {
              this.$Loading.error();
              this.$message({
                message: "关注用户失败,服务器异常",
                type: "error",
                center: true,
                duration: 2000
              });
              setTimeout(
                function() {
                  this.form.isFocus = false;
                }.bind(this),
                2000
              );
            }
          );
      } else {
        //取消关注
        this.$confirm("确认不再关注TA吗", "提示", {
          confirmButtonText: "真滴",
          cancelButtonText: "手滑啦",
          type: "warning"
        }).then(
          () => {
            //加载条开始
            this.$Loading.start();
            let data = {
              fansId: parseInt(getCookie("userId")),
              focusId: this.form.userId
            };
            this.$http
              .delete(this.globalApi.DeleteUserCollectionApi, {
                params: data
              })
              .then(
                response => {
                  //加载条结束
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
                    setTimeout(
                      function() {
                        this.form.isFocus = true;
                      }.bind(this),
                      2000
                    );
                  } else {
                    //success
                    this.$message({
                      message: "取消关注成功",
                      type: "success",
                      center: true,
                      duration: 2000
                    });
                  }
                },
                err => {
                  this.$Loading.error();
                  this.$message({
                    message: "取消关注用户失败:服务器异常",
                    type: "error",
                    center: true,
                    duration: 2000
                  });
                  setTimeout(
                    function() {
                      this.form.isFocus = true;
                    }.bind(this),
                    2000
                  );
                }
              );
          },
          () => {
            this.form.isFocus = true;
          }
        );
      }
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

#title {
  font-size: 35px;
}
.tip {
  margin-left: 100px;
}
.box-card-header {
  height: 550px;
  width: 95%;
  margin: 20px auto;
  border-radius: 50px;
}
.left {
  width: 30%;
  float: left;
}
.right {
  width: 70%;
  float: right;
}
#focus {
  margin: 0 auto;
}

.avatar {
  width: 400px;
  height: 400px;
  display: block;
}
</style>
