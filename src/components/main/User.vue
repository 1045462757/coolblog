<template>
  <el-card class="main-card">
    <div class="user-left">
      <Menu></Menu>
    </div>

    <div class="user-right">
      <router-view></router-view>
    </div>
  </el-card>
</template>

<script>
import Menu from "@/components/main/user/Menu";
export default {
  name: "User",
  components: { Menu },
  mounted() {}
};
</script>

<style scoped>
.user-left {
  width: 20%;
  margin-top: 20px;
  float: left;
}
.user-right {
  width: 80%;
  float: right;
}
</style>