<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>关于</span>
    </div>
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2019/4/19" placement="top">
          <el-card class="card" shadow="hover">
            <h4>待完善功能</h4>
            <p>草稿,搜索,相册,我的评论,粉丝,关注</p>
            <p>tiga 提交于 2019年4月19日19:36:17</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2019/4/13" placement="top">
          <el-card class="card" shadow="hover">
            <h4>第一版</h4>
            <p>tiga 提交于 2019年4月13日17:36:00</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<script>
import store from "@/vuex/store.js";
export default {
  name: "About",
  store,
  components: { },
  data() {
    return {
    };
  },
  methods: {},
  mounted() {}
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

.block {
  width: 50%;
  margin: 0 auto;
}

.card {
  margin-top: 20px;
}
</style>
