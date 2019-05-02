<template>
  <div id="app">
    <!--头部导航栏-->
    <Header></Header>

    <router-view/>

    <!--底部-->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/main/public/Header";
import Footer from "@/components/main/public/Footer";
import "@/assets/css/login.css";
import "@/assets/css/main.css";
export default {
  name: "App",
  components: { Header, Footer }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0 auto;
}
body {
  /* background: url(https://img.xjh.me/desktop/bg/nature/65144542_p0.jpg) repeat
    0px 0px !important; */
  background: #e0e0e0;
}
</style>
