<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>我的消息</span>
    </div>

    <div v-loading="loading">
      <transition name="el-zoom-in-top">
        <div v-show="showCard">
          <MessageList :message="message" v-for="(message,index) in messagePages" :key="index"></MessageList>
        </div>
      </transition>
    </div>

    <Tip :tip="tip" v-on:refresh="getMessage()"></Tip>

    <!--分页-->
    <div class="page" v-show="showPage">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="messages.length"
        :page-size="5"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import MessageList from "@/components/main/public/MessageList";
import Tip from "@/components/main/public/Tip";
export default {
  name: "MyFocus",
  components: { MessageList, Tip },
  data() {
    return {
      showCard: false,
      loading: false,
      showPage: false,
      currentPage: 1,
      messages: [],
      messagePages: [],
      tip: {
        show: false,
        netError: false,
        businessError: false,
        errorMessage: "",
        emptyBlog: false,
        emptyRemark: false
      }
    };
  },
  methods: {
    getMessage() {
      this.loading = true;
      this.showPage = false;
      this.blogs = [];
      this.blogPages = [];
      this.tip.show = false;
      this.tip.netError = false;
      this.tip.businessError = false;
      this.tip.errorMessage = "";
      this.tip.emptyBlog = false;
      this.tip.emptyRemark = false;

      let data = {
        userId: getCookie("userId"),
        type: 2
      };
      this.$http.get(this.globalApi.RetrieveBlogListApi, { params: data }).then(
        response => {
          // console.log(response.data);
          if (response.data.status != 200) {
            //failed
            this.loading = false;
            this.tip.show = true;
            this.businessError = true;
            this.errorMessage = response.data.message;
          } else {
            //success
            this.loading = false;
            if (response.data.data.length == 0) {
              this.tip.show = true;
              this.tip.emptyBlog = true;
            } else {
              this.blogs = response.data.data;
              this.showPage = true;
              this.blogPages = this.blogs.slice(
                (this.currentPage - 1) * 5,
                this.currentPage * 5
              );
            }
          }
        },
        err => {
          this.loading = false;
          this.tip.show = true;
          this.tip.netError = true;
        }
      );
    }
  },
  mounted() {
    //显示动画
    this.showCard = true;
    // this.getMessage();
    this.messagePages = [1];
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
</style>

