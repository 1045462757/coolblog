<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>404页面不存在</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
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
</style>
