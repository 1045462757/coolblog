<template>
  <!--提示信息-->
  <div v-if="tip.show">
    <!--网络错误-->
    <div v-if="tip.netError" class="error">
      <span>呀,服务器出错了</span>
      <br>
      <span>┭┮﹏┭┮</span>
      <br>
      <br>
      <el-button type="primary" @click="refresh()" round icon="el-icon-refresh">刷新试试</el-button>
    </div>

    <!--业务错误-->
    <div v-if="tip.businessError" class="error">
      <span>呀,好像失败了啊</span>
      <br>
      <span>{{tip.errorMessage}}</span>
    </div>

    <!--空数据(博客)-->
    <div v-if="tip.emptyBlog" class="error">
      <span>咦,没有博客呀</span>
      <br>
      <span>^_^</span>
      <br>
      <br>
      <el-button type="primary" @click="writeBlog()" round icon="el-icon-edit">去写一个?</el-button>
    </div>

    <!--空数据(评论)-->
    <div v-if="tip.emptyRemark" class="error">
      <span>咦,没有评论呀</span>
      <br>
      <span>^_^</span>
      <br>
      <br>
      <!-- <el-button type="primary" @click="writeRemark()" round icon="el-icon-edit">去写一个?</el-button> -->
    </div>
  </div>
</template>

<script>
import EventVue from "@/util/EventVue.js";
export default {
  name: "Tip",
  data() {
    return {
      // tip: {
      //   //是否显示提示
      //   show: false,
      //   //是否网络错误
      //   netError: false,
      //   //业务是否成功
      //   businessError: false,
      //   //业务失败消息
      //   errorMessage: "",
      //   //无数据(博客)
      //   emptyBlog: false,
      //   //无数据(评论)
      //   emptyRemark: false
      // }
    };
  },
  props: {
    tip: Object
  },
  methods: {
    refresh() {
      this.$emit("refresh");
    },
    writeBlog() {
      this.$router.push("/writeBlog");
      EventVue.$emit("activeIndex", 2);
    }
  }
};
</script>

<style scoped>
.error {
  font-size: 40px;
  color: crimson;
  margin: 50px;
}
</style>
