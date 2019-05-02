<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>我的关注</span>
    </div>

    <div>
      <transition name="el-zoom-in-center">
        <div v-show="show">
          <el-card class="box-card-single">
            <!--头像-->
            <div class="avatar">头像</div>

            <!--简介-->
            <div class="content">
              <h2>名称</h2>
              <h3>等级</h3>
              <el-button size="mini" round>主页</el-button>
            </div>
          </el-card>
          <el-card class="box-card-single">
            <!--头像-->
            <div class="avatar">头像</div>

            <!--简介-->
            <div class="content">
              <h2>名称</h2>
              <h3>等级</h3>
              <el-button size="mini" round>主页</el-button>
            </div>
          </el-card>
          <el-card class="box-card-single">
            <!--头像-->
            <div class="avatar">头像</div>

            <!--简介-->
            <div class="content">
              <h2>名称</h2>
              <h3>等级</h3>
              <el-button size="mini" round>主页</el-button>
            </div>
          </el-card>
          <el-card class="box-card-single">
            <!--头像-->
            <div class="avatar">头像</div>

            <!--简介-->
            <div class="content">
              <h2>名称</h2>
              <h3>等级</h3>
              <el-button size="mini" round>主页</el-button>
            </div>
          </el-card>
          <el-card class="box-card-single">
            <!--头像-->
            <div class="avatar">头像</div>

            <!--简介-->
            <div class="content">
              <h2>名称</h2>
              <h3>等级</h3>
              <el-button size="mini" round>主页</el-button>
            </div>
          </el-card>
        </div>
      </transition>
    </div>

    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "MyFocus",
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
  border-radius: 50px !important;
}
.clearfix {
  font-size: 20px;
}
.box-card-single {
  width: 19%;
  height: 300px;
  margin-top: 10px;
  margin-bottom: 50px;
  float: left;
  margin-left: 10px;
}
.page {
  clear: both;
}
.avatar {
  width: 80%;
  margin: 0 auto;
  height: 150px;
  background-color: gray;
}
.content {
  margin: 0 auto;
  height: 80px;
  background-color: lightgrey;
  width: 80%;
  margin-top: 20px;
}
</style>
