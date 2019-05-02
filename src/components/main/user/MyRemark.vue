<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>我的评论</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "MyRemark",
  data() {
    return {
      show: false
    };
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
.box-card-single {
  width: 100%;
  height: 200px;
  margin-top: 15px;
}
.page {
  clear: both;
}
</style>

