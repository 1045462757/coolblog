<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>我的收藏</span>
    </div>

    <div v-loading="loading">
      <transition name="el-zoom-in-top">
        <div v-show="showCard">
          <BlogList :blog="blog" v-for="(blog,index) in blogPages" :key="index"></BlogList>
        </div>
      </transition>
    </div>

    <Tip :tip="tip" v-on:refresh="getBlog()"></Tip>

    <!--分页-->
    <div class="page" v-show="blogPage.showBlogPage">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="blogs.length"
        :page-size="10"
        @current-change="handleCurrentChange"
        :current-page="blogPage.currentPage"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import { getCookie } from "@/util/cookie.js";
import BlogList from "@/components/main/public/BlogList";
import Tip from "@/components/main/public/Tip";
import store from "@/vuex/store.js";
export default {
  name: "MyFocus",
  store,
  components: { BlogList, Tip },
  data() {
    return {
      showCard: false,
      loading: true,
      blogPage: {
        showBlogPage: false,
        currentPage: 1
      },
      blogs: [],
      blogPages: [],
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
    getBlog() {
      if (this.$store.state.collectBlogs.length != 0) {
        this.loading = false;
        this.blogs = this.$store.state.collectBlogs;
        this.blogPage.showBlogPage = true;
        this.blogPages = this.blogs.slice(
          (this.blogPage.currentPage - 1) * 10,
          this.blogPage.currentPage * 10
        );
      } else {
        this.loading = true;
        this.showPage = false;
        this.blogs = [];
        this.blogPages = [];
        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";
        this.tip.emptyBlog = false;
        this.tip.emptyRemark = false;

        let data = {
          userId: getCookie("userId"),
          type: 2
        };
        this.$http
          .get(this.globalApi.RetrieveBlogListApi, { params: data })
          .then(
            response => {
              // console.log(response.data);
              if (response.data.status != 200) {
                console.log(response.data.message);
                this.loading = false;
                this.tip.show = true;
                this.businessError = true;
                this.errorMessage = response.data.message;
              } else {
                this.loading = false;
                if (response.data.data.length == 0) {
                  this.tip.show = true;
                  this.tip.emptyBlog = true;
                } else {
                  this.blogs = response.data.data;
                  this.blogPage.showBlogPage = true;
                  this.blogPages = this.blogs.slice(
                    (this.blogPage.currentPage - 1) * 10,
                    this.blogPage.currentPage * 10
                  );
                  //存入vuex
                  this.$store.commit("addCollectBlogs", response.data.data);
                }
              }
            },
            err => {
              this.loading = false;
              this.tip.show = true;
              this.tip.netError = true;
            }
          );
      }
    },

    //分页
    handleCurrentChange(currentPage) {
      this.blogPage.currentPage = currentPage;
      this.blogPages = this.blogs.slice(
        (this.blogPage.currentPage - 1) * 10,
        this.blogPage.currentPage * 10
      );
    }
  },
  mounted() {
    //显示动画
    this.showCard = true;
    this.getBlog();
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

