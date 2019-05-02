<template>
  <div>
    <transition name="el-zoom-in-top">
      <el-card class="box-card" v-show="show">
        <div slot="header" class="clearfix">
          <span>写下最近的感悟</span>
        </div>

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题" prop="title" class="title">
            <el-input
              v-model="ruleForm.title"
              placeholder="请输入标题"
              maxlength="50"
              minlength="2"
              clearable
            ></el-input>
          </el-form-item>
          <br>
          <br>
          <el-form-item label="简介" prop="summary" class="summary">
            <el-input
              v-model="ruleForm.summary"
              placeholder="请输入简介"
              maxlength="80"
              minlength="10"
              clearable
            ></el-input>
          </el-form-item>
          <br>
          <br>
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            name="img"
            :headers="header"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload"
          ></el-upload>
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
            id="editor"
          ></quill-editor>

          <div class="btn">
            <div v-if="permission">
              <el-button type="primary" round @click="submitForm('ruleForm',2)">修改</el-button>
            </div>
            <div v-else="permission">
              <el-button
                type="primary"
                round
                @click="submitForm('ruleForm',1)"
                icon="el-icon-edit"
              >发表</el-button>
              <el-button
                type="warning"
                round
                @click="submitForm('ruleForm',3)"
                icon="el-icon-edit"
              >草稿</el-button>
            </div>
          </div>
        </el-form>
      </el-card>
    </transition>
  </div>
</template>

<script>
import { getCookie } from "@/util/cookie.js";
import EventVue from "@/util/EventVue.js";
import store from "@/vuex/store.js";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"]
];
export default {
  name: "WriteBlog",
  store,
  data() {
    return {
      show: false,
      permission: false,
      blogId: "",
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      content: null,
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      serverUrl: this.globalApi.CreateBlogImageApi, // 这里写你要上传的图片服务器地址
      header: {
        // token: sessionStorage.token
      }, // 有的图片服务器要求请求头需要有token
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        summary: [{ required: true, message: "请输入简介", trigger: "blur" }]
      },
      ruleForm: {
        title: "",
        summary: ""
      }
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      //内容改变事件
      // console.log("---内容改变事件---");
      this.content = html;
      // console.log(html);
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
    },

    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      // console.log(res);
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.status == 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.data为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.data);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },

    submitForm(formName, typeNum) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (typeNum == 1) {
            this.submit();
          } else if (typeNum == 2) {
            this.modifyBlog();
          } else {
            this.draft();
          }
        } else {
          return false;
        }
      });
    },

    //发表博客
    submit() {
      if (
        this.content == null ||
        this.content == undefined ||
        this.content == ""
      ) {
        this.$message({
          message: "请输入内容",
          type: "warning",
          center: true,
          duration: 1000
        });
      } else {
        this.$Loading.start();
        let data = {
          userId: parseInt(getCookie("userId")),
          title: this.ruleForm.title,
          summary: this.ruleForm.summary,
          content: this.content
        };
        // console.log(data);

        this.$http
          .post(this.globalApi.CreateBlogApi, data, { emulateJSON: true })
          .then(
            response => {
              this.$Loading.finish();
              // console.log(response.data);
              if (response.data.status != 200) {
                //failed
                this.$message({
                  message: response.data.message,
                  type: "error",
                  center: true,
                  duration: 1000
                });
              } else {
                //success
                this.$message({
                  message: "发表成功",
                  type: "success",
                  center: true,
                  duration: 1000
                });
                this.title = "";
                this.summary = "";
                this.content = "";
                this.$router.push("/main");
                //删除vuex存储
                this.$store.state.myBlogs = [];
                EventVue.$emit("activeIndex", 1);
              }
            },
            err => {
              this.$Loading.error();
              this.$message({
                message: "发表博客失败:服务器异常",
                type: "error",
                center: true,
                duration: 2000
              });
            }
          );
      }
    },

    //修改博客
    modifyBlog() {
      this.$confirm("确认修改吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.content == null) {
          this.$message({
            message: "请输入内容",
            type: "warning",
            center: true,
            duration: 1000
          });
        } else {
          //开始修改
          this.$Loading.start();
          let data = {
            userId: parseInt(getCookie("userId")),
            blogId: parseInt(this.blogId),
            title: this.ruleForm.title,
            summary: this.ruleForm.summary,
            content: this.content
          };

          this.$http
            .put(this.globalApi.UpdateBlogApi, data, { emulateJSON: true })
            .then(
              response => {
                this.$Loading.finish();
                // console.log(response.data);
                if (response.data.status == 500) {
                  //failed
                  this.$message({
                    message: response.data.message,
                    type: "error",
                    center: true,
                    duration: 1000
                  });
                } else {
                  //success
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    center: true,
                    duration: 2000
                  });
                  this.$router.push("/main");
                  EventVue.$emit("activeIndex", 1);
                }
              },
              err => {
                this.$Loading.error();
                this.$message({
                  message: "修改博客失败:服务器异常",
                  type: "error",
                  center: true,
                  duration: 2000
                });
              }
            );
        }
      });
    },

    //加入草稿
    draft() {
      this.$message({
        message: "尚在开发",
        type: "info",
        center: true,
        duration: 2000
      });
    }
  },
  mounted() {
    this.show = true;

    //接收参数
    this.blogId = localStorage.getItem("blogId");
    this.ruleForm.title = localStorage.getItem("title");
    this.ruleForm.summary = localStorage.getItem("summary");
    this.content = localStorage.getItem("content");
    this.permission = localStorage.getItem("permission");
    localStorage.removeItem("blogId");
    localStorage.removeItem("title");
    localStorage.removeItem("content");
    localStorage.removeItem("summary");
    localStorage.removeItem("permission");
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
.ql-editor.ql-blank,
.ql-editor {
  height: 350px;
}
.title {
  width: 35%;
  margin: 0 auto;
}
.summary {
  width: 65%;
  margin: 0 auto;
}

#editor {
  height: 500px;
  width: 90%;
  margin: 0 auto;
}

.btn {
  margin-top: 50px;
}
.demo-ruleForm {
  width: 95%;
  margin: 0 auto;
}
</style>
