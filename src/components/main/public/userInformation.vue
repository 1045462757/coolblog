<template>
  <el-card class="userInformation-card">
    <!--头部-->
    <div slot="header" class="clearfix">
      <span>用户信息</span>
    </div>

    <!--头像-->
    <el-card class="left">
      <!-- <div>
        <el-upload
          class="avatar-uploader"
          :action="avatarUrl"
          :data="data"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarFailed"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.headPortrait" :src="form.headPortrait" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>-->
    </el-card>

    <!--信息-->
    <!-- <el-card class="right box-card-main">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="form.name"
            maxlength="10"
            placeholder="请输入姓名"
            clearable
            @blur="validSubmit()"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别" @blur="validSubmit()">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="保密" value="保密"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-col :span="21">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birthday"
              style="width: 100%;"
              @blur="validSubmit()"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="form.email"
            maxlength="20"
            placeholder="请输入邮箱"
            clearable
            @blur="validSubmit()"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            v-model="form.phone"
            maxlength="15"
            placeholder="请输入手机号码"
            clearable
            @blur="validSubmit()"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input
            v-model="form.qq"
            maxlength="15"
            placeholder="请输入QQ"
            clearable
            @blur="validSubmit()"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="weChat">
          <el-input
            v-model="form.weChat"
            maxlength="15"
            placeholder="请输入微信"
            clearable
            @blur="validSubmit()"
          ></el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input
            v-model="form.hobby"
            maxlength="20"
            placeholder="请输入爱好"
            clearable
            @blur="validSubmit()"
          ></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input
            v-model="form.profession"
            maxlength="10"
            placeholder="请输入职业"
            clearable
            @blur="validSubmit()"
          ></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input
            v-model="form.address"
            maxlength="10"
            placeholder="请输入住址"
            clearable
            @blur="validSubmit()"
          ></el-input>
        </el-form-item>
        <el-form-item label="学校">
          <el-input
            v-model="form.school"
            maxlength="10"
            placeholder="请输入学校"
            clearable
            @blur="validSubmit()"
          ></el-input>
        </el-form-item>
        <br>
        <el-form-item label="个人简介">
          <el-input
            type="textarea"
            v-model="form.introduction"
            maxlength="300"
            placeholder="请输入简介"
            clearable
            @blur="validSubmit()"
          ></el-input>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :disabled="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>-->
  </el-card>
</template>

<script>
export default {
  name: "UserInformation",
  data() {
    return {};
  },
  props: {}
};
</script>

<style scoped>
.userInformation-card {
  width: 90%;
  margin: 50px auto;
  border-radius: 50px;
}

.clearfix {
  font-size: 24px;
}

.left {
  width: 30%;
  float: left;
}
.right {
  width: 70%;
  float: right;
}
</style>
