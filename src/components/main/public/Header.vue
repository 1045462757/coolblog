<template>
  <div v-if="showHeader">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#696969"
      active-text-color="#FF0000"
    >
      <el-menu-item index="1" class="tip el-icon-star-on">主页</el-menu-item>

      <el-menu-item index="2" class="tip el-icon-star-on">发表</el-menu-item>

      <el-menu-item index="3" class="tip el-icon-star-on">关于</el-menu-item>

      <el-submenu index="4" class="tip">
        <template slot="title" class="tip">
          <span class="title-tip el-icon-star-on">{{account}}</span>
        </template>
        <el-menu-item index="4-1" class="el-icon-star-off small-tip">个人中心</el-menu-item>
        <br>
        <el-menu-item index="4-2" class="el-icon-star-off small-tip">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import EventVue from "@/util/EventVue.js";
import { getCookie, delCookie } from "@/util/cookie.js";
export default {
  data() {
    return {
      activeIndex: "1",
      showHeader: true,
      account: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      if (key == "1") {
        this.activeIndex = "1";
        this.$router.push("/main");
      } else if (key == "2") {
        this.activeIndex = "2";
        this.$router.push("/writeBlog");
      } else if (key == "3") {
        this.activeIndex = "3";
        this.$router.push("/about");
      } else if (key == "4-1") {
        this.activeIndex = "4-1";
        this.$router.push("/user");
      } else if (key == "4-2") {
        this.$confirm("确定退出吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          delCookie("account");
          delCookie("userId");
          this.$router.push("/login");
          this.$message({
            message: "退出成功",
            type: "success",
            centet: true,
            duration: 2000
          });
          this.showHeader = false;
          localStorage.removeItem("activeIndex");
          this.activeIndex = "1";
        });
      }
      localStorage.setItem("activeIndex", this.activeIndex);
    }
  },
  mounted() {
    this.activeIndex = localStorage.getItem("activeIndex");
    //登录后显示导航栏
    EventVue.$on("showHeader", message => {
      this.showHeader = true;
    });
    //接收参数
    EventVue.$on("account", message => {
      this.account = message;
    });
    //activeIndex改变
    EventVue.$on("activeIndex", message => {
      this.activeIndex = message;
    });
    /*页面挂载获取保存的cookie值*/
    let uname = getCookie("account");
    this.account = uname;
    /*如果cookie不存在，则隐藏导航栏*/
    if (uname == "") {
      this.showHeader = false;
    }
  }
};
</script>

<style scoped>
.el-menu-demo {
  width: 50%;
  margin: 0 auto;
  /* top: 0; */
  /* position: fixed; */
}
.tip {
  font-size: 24px;
  width: 25%;
}
.title-tip {
  font-size: 24px;
}
.small-tip {
  font-size: 18px;
}
</style>




