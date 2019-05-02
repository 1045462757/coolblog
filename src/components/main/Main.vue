<template>
  <el-card class="main-card" shadow="never">
    <!--菜单-->
    <div slot="header">
      <el-menu
        :default-active="activeIndex"
        class="main-menu"
        mode="horizontal"
        @select="handleSelect"
        text-color="#696969"
        active-text-color="#7A378B"
      >
        <el-menu-item index="1" class="main-tip el-icon-star-on">我的博客</el-menu-item>
        <el-menu-item index="2" class="main-tip el-icon-star-on">精彩博客</el-menu-item>
        <el-menu-item index="3" class="main-tip el-icon-star-on">搜索博客</el-menu-item>
      </el-menu>
    </div>

    <!--首页-->
    <div v-loading="loading">
      <div v-if="loadingSuccess">
        <Tip v-if="tip.show" :tip="tip" v-on:refresh="getBlog()"></Tip>
        <!--博客-->
        <transition name="el-zoom-in-top">
          <div v-show="showBlogCard">
            <BlogList :blog="blog" v-for="(blog,index) in blogPages" :key="index"></BlogList>
          </div>
        </transition>

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
      </div>

      <Tip v-else="loadingSuccess" :tip="tip" v-on:refresh="getBlog()"></Tip>
    </div>

    <BackTop></BackTop>
  </el-card>
</template>

<script>
import { getCookie } from "@/util/cookie.js";
import EventVue from "@/util/EventVue.js";
import BlogList from "@/components/main/public/BlogList";
import Tip from "@/components/main/public/Tip";
import store from "@/vuex/store.js";
export default {
  name: "MyBlog",
  store,
  components: { BlogList, Tip },
  data() {
    return {
      loading: true,
      loadingSuccess: false,

      tip: {
        show: false,
        netError: false,
        businessError: false,
        errorMessage: "",
        emptyBlog: false
      },

      showBlogCard: false,
      blogPage: {
        showBlogPage: false,
        currentPage: 1
      },

      activeIndex: "1",

      blogs: [],
      blogPages: []
    };
  },
  methods: {
    //菜单
    handleSelect(key, keyPath) {
      if (key == "1") {
        this.activeIndex = "1";
        this.getBlog();
        this.blogPage.currentPage = localStorage.getItem("main_myBlog_page");
      } else if (key == "2") {
        this.activeIndex = "2";
        this.getBlog();
        this.blogPage.currentPage = localStorage.getItem("main_hotBlog_page");
      }
      localStorage.setItem("activeIndex-main", this.activeIndex);
    },

    //获取博客
    getBlog() {
      if (this.$store.state.myBlogs.length != 0 && this.activeIndex == "1") {
        this.loading = false;
        this.loadingSuccess = true;
        this.showBlogCard = true;
        this.blogs = this.$store.state.myBlogs;
        this.blogPage.showBlogPage = true;
        this.blogPages = this.blogs.slice(
          (this.blogPage.currentPage - 1) * 10,
          this.blogPage.currentPage * 10
        );
      } else if (
        this.$store.state.hotBlogs.length != 0 &&
        this.activeIndex == "2"
      ) {
        this.loading = false;
        this.loadingSuccess = true;
        this.showBlogCard = true;
        this.blogs = this.$store.state.hotBlogs;
        this.blogPage.showBlogPage = true;
        this.blogPages = this.blogs.slice(
          (this.blogPage.currentPage - 1) * 10,
          this.blogPage.currentPage * 10
        );
      } else {
        //vuex无数据
        this.loading = true;
        this.loadingSuccess = false;
        this.showBlogCard = false;
        this.blogPage.showBlogPage = false;
        this.blogs = [];
        this.blogPages = [];
        this.tip.show = false;
        this.tip.netError = false;
        this.tip.businessError = false;
        this.tip.errorMessage = "";
        this.tip.emptyBlog = false;

        //typeNum:1，我的博客，3：精彩博客
        let typeNum;
        if (this.activeIndex == "1") {
          typeNum = 1;
        } else {
          typeNum = 3;
        }

        let data = {
          userId: getCookie("userId"),
          type: typeNum
        };
        this.$http
          .get(this.globalApi.RetrieveBlogListApi, { params: data })
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
                if (response.data.data.length == 0) {
                  this.tip.show = true;
                  this.tip.emptyBlog = true;
                } else {
                  this.showBlogCard = true;
                  this.blogs = response.data.data;
                  this.blogPage.showBlogPage = true;
                  this.blogPages = this.blogs.slice(
                    (this.blogPage.currentPage - 1) * 10,
                    this.blogPage.currentPage * 10
                  );
                  //存入vuex
                  if (this.activeIndex == "1") {
                    this.$store.commit("addMyBlogs", response.data.data);
                  } else {
                    this.$store.commit("addHotBlogs", response.data.data);
                  }
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
      }
    },

    //分页
    handleCurrentChange(currentPage) {
      this.blogPage.currentPage = currentPage;
      if (localStorage.getItem("activeIndex-main") == "1") {
        localStorage.setItem("main_myBlog_page", this.blogPage.currentPage);
      } else if (localStorage.getItem("activeIndex-main") == "2") {
        localStorage.setItem("main_hotBlog_page", this.blogPage.currentPage);
      }
      this.blogPages = this.blogs.slice(
        (this.blogPage.currentPage - 1) * 10,
        this.blogPage.currentPage * 10
      );
    }
  },
  mounted() {
    this.activeIndex = localStorage.getItem("activeIndex-main");
    if (localStorage.getItem("activeIndex-main") == "1") {
      this.blogPage.currentPage = localStorage.getItem("main_myBlog_page");
    } else if (localStorage.getItem("activeIndex-main") == "2") {
      this.blogPage.currentPage = localStorage.getItem("main_hotBlog_page");
    }
    this.getBlog();
  }
};
</script>