<template>
  <el-card class="message-list">
    <h1>这是消息列表</h1>
  </el-card>
</template>

<script>
export default {
  name: "MessageList",
  data() {
    return {};
  },
  props: {
    message: Object
  }
};
</script>

<style scoped>
.message-list {
  width: 90%;
  margin: 50px auto;
  padding: 30px;
  border-radius: 30px;
}
</style>
