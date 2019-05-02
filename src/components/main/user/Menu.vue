<template>
  <el-col :span="20">
    <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect">
      <el-submenu index="1" class="menu-mainItem">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span class="menu-item">用户</span>
        </template>
        <el-menu-item-group title="我">
          <el-menu-item index="1-1" class="menu-minItem">个人信息</el-menu-item>
          <el-menu-item index="1-2" class="menu-minItem">修改密码</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="其他">
          <el-menu-item index="1-3" class="menu-minItem">我的关注</el-menu-item>
          <el-menu-item index="1-4" class="menu-minItem">我的粉丝</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2" class="menu-mainItem">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span class="menu-item">博客</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" class="menu-minItem">我的收藏</el-menu-item>
          <el-menu-item index="2-2" class="menu-minItem">我的草稿</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3" class="menu-mainItem">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span class="menu-item">评论</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" class="menu-minItem">我的评论</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4" class="menu-mainItem">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span class="menu-item">消息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" class="menu-minItem">我的消息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: "Menu",
  methods: {
    handleSelect(key, keyPath) {
      //  console.log(key, keyPath);
      if (key == "1-1") {
        this.$router.push("/user/information");
      } else if (key == "1-2") {
        this.$router.push("/user/modifyPassword");
      } else if (key == "1-3") {
        this.$router.push("/user/myFocus");
      } else if (key == "1-4") {
        this.$router.push("/user/myFans");
      } else if (key == "2-1") {
        this.$router.push("/user/myCollection");
      } else if (key == "3-1") {
        this.$router.push("/user/myRemark");
      } else if (key == "4-1") {
        this.$router.push("/user/message");
      }
    }
  }
};
</script>

<style>
.menu-mainItem {
  margin-bottom: 100px;
}
.menu-item {
  font-size: 24px;
  color: purple;
}
.menu-minItem {
  font-size: 20px;
}
</style>

