<template>
  <el-card class="box-card-main" v-loading="loading">
    <div v-if="loadingSuccess">
      <Tip :tip="tip" v-on:refresh="getBlog()" v-if="tip.businessError"></Tip>
      <div v-else="tip.businessError">
        <!--头部-->
        <div slot="header" class="clearfix">
          <!--标题-->
          <span id="title">{{blog.title}}</span>

          <br>
          <!--简介-->
          <span id="summary">简介 : {{blog.summary}}</span>
          <br>
          <br>

          <!--作者-->
          <span id="author-name">
            作者 :
            <router-link :to="{path:'/userDetails',query: {userId: blog.author.userId}}">
              <span id="name">{{blog.author.name}}</span>
            </router-link>
          </span>

          <!--发表时间-->
          <span id="createTime">
            发表 :
            <Time :time="blog.createTime"></Time>
          </span>

          <!--最后修改时间-->
          <span id="lastModifyTime">
            修改 :
            <Time :time="blog.lastModifyTime"></Time>
          </span>

          <!--浏览数-->
          <span id="browse">浏览 : {{blog.browse}}</span>

          <!--点赞数-->
          <span id="approve">点赞 : {{blog.approve}}</span>

          <!--收藏数-->
          <span id="collect">收藏 : {{blog.collect}}</span>
          <br>
          <br>
          <div v-if="!permissions">
            <el-switch v-model="blog.isCollect" active-text="收藏" @change="collectionBlog()"></el-switch>
            <el-switch v-model="blog.isApprove" active-text="点赞" @change="approveBlog()"></el-switch>
          </div>
        </div>

        <transition name="el-zoom-in-top">
          <el-card class="box-card-content" v-show="showCard" v-html="blog.content"></el-card>
        </transition>

        <br>
        <div v-if="permissions">
          <el-button type="primary" round @click="updateBlog()">修改</el-button>
          <el-button type="danger" round @click="deleteBlog()">删除</el-button>
        </div>

        <!--写评论-->
        <div class="newRemark">
          <el-input type="textarea" :rows="3" placeholder="写个评论吧" v-model="newRemark"></el-input>
          <br>
          <br>
          <el-button type="primary" round @click="submitRemark()">提交</el-button>
          <br>
          <br>
        </div>

        <!--评论-->
        <el-card class="box-card-remark">
          <div slot="header" class="clearfix">
            <span>评论</span>
          </div>

          <Tip :tip="tip"></Tip>
          <RemarkList :remark="remark" v-for="(remark,index) in remarkPages" :key="index"></RemarkList>

          <br>
          <!--评论分页-->
          <div class="page" v-show="showPage">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="blog.remarks.length"
              :page-size="10"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
            ></el-pagination>
          </div>
        </el-card>
      </div>
    </div>
    <Tip :tip="tip" v-on:refresh="getBlog()" v-else="loadingSuccess"></Tip>
    <BackTop></BackTop>
  </el-card>
</template>

<script>
import { getCookie } from "@/util/cookie.js";
import RemarkList from "@/components/main/public/RemarkList";
import Tip from "@/components/main/public/Tip";
import { setTimeout } from "timers";
import store from "@/vuex/store.js";
export default {
  name: "BlogDetails",
  store,
  components: { RemarkList, Tip },
  data() {
    return {
      loading: true,
      loadingSuccess: false,
      showCard: false,
      permissions: false,
      blog: {
        // blogId: 1,
        // author: {
        //   name: "",
        //   userId: 1
        // },
        // title: "",
        // content: "",
        // summary: "",
        // createTime: "",
        // lastModifyTime: "",
        // approve: 0,
        // browse: 0,
        // collect: 0,
        // remarks: [
        //   {
        //     remarkId: 1,
        //     author: {
        //       name: "",
        //       userId: 1
        //     },
        //     creatTime: "",
        //     createTime: "",
        //     lastModifyTime: "",
        //     content: "",
        //     approve: 0
        //   }
        // ],
        // isCollect: false,
        // isApprove: false
      },
      remarkPages: [],
      newRemark: "",
      showPage: false,
      currentPage: 1,
      tip: {
        show: false,
        netError: false,
        businessError: false,
        errorMessage: "",
        emptyBlog: false,
        emptyRemark: false
      }
    };
  },
  methods: {
    //获取博客
    getBlog() {
      this.loading = true;
      this.loadingSuccess = false;

      this.tip.show = false;
      this.tip.netError = false;
      this.tip.businessError = false;
      this.tip.errorMessage = "";
      this.tip.emptyBlog = false;
      this.tip.emptyRemark = false;

      let data = {
        userId: parseInt(getCookie("userId")),
        blogId: this.$route.query.blogId
      };
      this.$http.get(this.globalApi.RetrieBlogApi, { params: data }).then(
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

            //判断是否有权限
            let userId = getCookie("userId");
            if (userId == this.blog.author.userId) {
              this.permissions = true;
            }

            if (this.blog.remarks.length == 0) {
              this.tip.show = true;
              this.tip.emptyRemark = true;
            } else {
              this.showPage = true;
              this.remarkPages = this.blog.remarks.slice(
                (this.currentPage - 1) * 10,
                this.currentPage * 10
              );
            }
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

    //修改博客
    updateBlog() {
      //判断权限
      if (this.blog.author.userId == getCookie("userId")) {
        this.$router.push("/writeBlog");
        //传递参数
        localStorage.setItem("blogId", this.blog.blogId);
        localStorage.setItem("title", this.blog.title);
        localStorage.setItem("content", this.blog.content);
        localStorage.setItem("summary", this.blog.summary);
        localStorage.setItem("permission", true);
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 1000
        });
      }
    },

    //删除博客
    deleteBlog() {
      //判断权限
      // console.log(this.blog.author.userId);
      // console.log(getCookie("userId"));
      if (this.blog.author.userId == getCookie("userId")) {
        this.$confirm("确认删除该博客吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          //加载条开始
          this.$Loading.start();
          let data = {
            userId: getCookie("userId"),
            blogId: this.blog.blogId
          };
          this.$http
            .delete(this.globalApi.DeleteBlogApi, { params: data })
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
                    duration: 1000
                  });
                } else {
                  //success
                  this.$message({
                    message: "删除成功",
                    type: "success",
                    center: true,
                    duration: 1000
                  });
                  //删除vuex存储
                  this.$store.state.myBlogs = [];
                  this.$router.push("/main");
                }
              },
              err => {
                this.$Loading.error();
                this.$message({
                  message: "删除博客失败:服务器异常",
                  type: "error",
                  center: true,
                  duration: 1000
                });
              }
            );
        });
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 1000
        });
      }
    },

    //点赞博客
    approveBlog() {
      //权限判断
      if (this.blog.author.userId != getCookie("userId")) {
        if (this.blog.isApprove == true) {
          this.$message({
            message: "点赞成功",
            type: "success",
            center: true,
            duration: 2000
          });
        } else {
          this.$message({
            message: "取消点赞成功",
            type: "success",
            center: true,
            duration: 2000
          });
        }
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 2000
        });
      }
    },

    //收藏博客
    collectionBlog() {
      //权限判断
      if (this.blog.author.userId != getCookie("userId")) {
        //收藏博客
        if (this.blog.isCollect == true) {
          this.$Loading.start();
          let data = {
            userId: parseInt(getCookie("userId")),
            blogId: this.blog.blogId
          };
          // console.log(data);

          this.$http
            .post(this.globalApi.CreateBlogCollectionApi, data, {
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
                      this.blog.isCollect = false;
                    }.bind(this),
                    2000
                  );
                } else {
                  //success
                  this.$message({
                    message: "收藏成功",
                    type: "success",
                    center: true,
                    duration: 2000
                  });
                }
              },
              err => {
                this.$Loading.error();
                // this.isCollect = false;
                this.$message({
                  message: "收藏博客失败,服务器异常",
                  type: "error",
                  center: true,
                  duration: 2000
                });
                setTimeout(
                  function() {
                    this.blog.isCollect = false;
                  }.bind(this),
                  2000
                );
              }
            );
        } else {
          //取消收藏
          this.$confirm("确认取消收藏吗", "提示", {
            confirmButtonText: "真滴",
            cancelButtonText: "手滑啦",
            type: "warning"
          }).then(
            () => {
              //加载条开始
              this.$Loading.start();
              let data = {
                userId: parseInt(getCookie("userId")),
                blogId: this.blog.blogId
              };
              this.$http
                .delete(this.globalApi.DeleteBlogCollectionApi, {
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
                          this.blog.isCollect = true;
                        }.bind(this),
                        2000
                      );
                    } else {
                      //success
                      this.$message({
                        message: "取消收藏成功",
                        type: "success",
                        center: true,
                        duration: 2000
                      });
                    }
                  },
                  err => {
                    this.$Loading.error();
                    this.$message({
                      message: "取消收藏博客失败:服务器异常",
                      type: "error",
                      center: true,
                      duration: 1000
                    });
                    setTimeout(
                      function() {
                        this.blog.isCollect = true;
                      }.bind(this),
                      2000
                    );
                  }
                );
            },
            () => {
              this.blog.isCollect = true;
            }
          );
        }
      } else {
        this.$message({
          message: "没有权限",
          type: "warning",
          center: true,
          duration: 2000
        });
      }
    },

    //发表评论
    submitRemark() {
      if (this.newRemark == "") {
        this.$message({
          message: "请输入评论",
          type: "warning",
          center: true,
          duration: 1000
        });
      } else {
        this.$Loading.start();
        let data = {
          userId: parseInt(getCookie("userId")),
          blogId: this.blog.blogId,
          content: this.newRemark
        };
        this.$http
          .post(this.globalApi.CreateRemarkApi, data, { emulateJSON: true })
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
              } else {
                //success
                this.$message({
                  message: "发表成功",
                  type: "success",
                  center: true,
                  duration: 2000
                });
                this.newRemark = "";
                // console.log(response.data.data);
                this.remarkPages.unshift(response.data.data);
                this.blog.remarks.unshift(response.data.data);
                this.tip.show = false;
                this.tip.emptyRemark = false;
                this.showPage = true;
              }
            },
            err => {
              this.$Loading.error();
              this.$message({
                message: "发表评论失败:服务器异常",
                type: "error",
                center: true,
                duration: 2000
              });
            }
          );
      }
    },

    //评论分页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.remarkPages = this.blog.remarks.slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10
      );
    }
  },
  mounted() {
    this.getBlog();
  }
};
</script>

<style scoped>
.box-card-main {
  width: 95%;
  margin: 20px auto;
  border-radius: 50px;
}
.box-card-content {
  clear: both;
  border-radius: 30px;
  padding: 30px;
  margin: 20px auto;
  margin-top: 80px;
}
.clearfix {
  font-size: 20px;
}

#title {
  font-size: 35px;
}
.box-card-remark {
  border-radius: 30px;
  width: 80%;
  margin: 10px auto;
}

#remark {
  font-size: 18px;
}

.newRemark {
  margin: 50px auto;
  width: 50%;
}

#summary {
  font-size: 20px;
}

#title:hover,
#name:hover {
  color: brown;
  text-decoration: underline;
}

#author-name,
#createTime,
#lastModifyTime,
#browse,
#approve,
#collect {
  float: left;
  font-size: 20px;
  width: 16.6%;
}
</style>
