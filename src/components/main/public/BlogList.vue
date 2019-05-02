<template>
  <el-card class="blog-list" shadow="hover">
    <!--标题-->
    <router-link :to="{path:'/blogDetails',query: {blogId: blog.blogId}}">
      <span id="title">{{blog.title}}</span>
    </router-link>

    <br>
    <!--简介-->
    <span id="summary">简介 : {{blog.summary}}</span>
    <br>
    <br>

    <!--作者-->
    <span id="author-name">
      作者 :
      <router-link :to="{path:'/userDetails',query: {userId: blog.author.userId}}">
        <span id="name">{{blog.author.name}}</span>
      </router-link>
    </span>

    <!--发表时间-->
    <span id="createTime">
      发表 :
      <Time :time="blog.createTime"></Time>
    </span>

    <!--浏览数-->
    <span id="browse">浏览 : {{blog.browse}}</span>

    <!--点赞数-->
    <span id="approve">点赞 : {{blog.approve}}</span>

    <!--收藏数-->
    <span id="collect">收藏 : {{blog.collect}}</span>
  </el-card>
</template>

<script>
export default {
  name: "BlogList",
  data() {
    return {
      // blogId: 0,
      // title: "",
      // summary: "",
      // createTime: "",
      // approve: 0,
      // browse: 0,
      // collect: 0,
      // author: {
      //   userId: 0,
      //   name: ""
      // }
    };
  },
  props: {
    blog: Object
  }
};
</script>

<style scoped>
.blog-list {
  width: 90%;
  margin: 50px auto;
  padding: 30px;
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
  text-decoration: underline;
}

#author-name,
#createTime,
#browse,
#approve,
#collect {
  float: left;
  font-size: 20px;
  width: 20%;
}
</style>
