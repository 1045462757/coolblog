<template>
  <el-card class="remark-list" shadow="hover">
    <!--作者-->
    <span id="author-name">
      作者 :
      <router-link :to="{path:'/userDetails',query: {userId: remark.author.userId}}">
        <span id="name">{{remark.author.name}}</span>
      </router-link>
    </span>

    <!--发表时间-->
    <span id="createTime">
      发表 :
      <Time :time="remark.createTime"></Time>
    </span>

    <!--点赞数-->
    <span id="approve">点赞 : {{remark.approve}}</span>

    <div v-if="permissions" class="action">
      <el-button type="primary" round @click="deleteRemark()">点赞</el-button>
      <el-button type="danger" round @click="deleteRemark()">删除</el-button>
    </div>

    <!--内容-->
    <span id="content">{{remark.content}}</span>
  </el-card>
</template>

<script>
export default {
  name: "RemarkList",
  data() {
    return {
      permissions: true
    };
  },
  props: {
    remark: Object
  },
  methods: {
    deleteRemark() {}
  }
};
</script>

<style scoped>
.remark-list {
  width: 80%;
  margin: 50px auto;
  border-radius: 30px;
}

#title {
  font-size: 30px;
}

#summary {
  font-size: 20px;
}

#title:hover,
#name:hover {
  color: brown;
}

#author-name,
#createTime,
#approve {
  float: left;
  font-size: 20px;
  width: 33%;
}

#content {
  font-size: 18px;
  padding: 20px;
  float: left;
}
</style>
