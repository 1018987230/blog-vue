<template>

  <div style="width: 80%; height:80px;background-color: rgb(110,110,110); margin: 0 auto ;display: flex;">

    <div style="width:70%;height: 80px;background-color:;display:flex;align-items: center;justify-content: center;margin-left: 15%;">
      <!-- 文章类型 -->
      <el-select v-model="articleType" placeholder="Java" size="large" style="width: 100px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="articleTitle" maxlength="30" placeholder="[title]" show-word-limit type="text"
        style="width:500px;height: 40px;font-size: 20px;margin-left:5px"/>
      
      <!-- 发布按键 -->
      <el-button type="primary" plain
        style="height: 40px;margin-left: 20px"
        @click="change">修改
      </el-button>

    </div>
   
  </div>
   <!-- 富文本编辑器 -->
    <div style="width: 80%;height:90vh;margin: 0 auto ;">
      <v-md-editor v-model="articleContent" height="100%" width="100%"></v-md-editor>
    </div>
</template>

<script setup>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { textChange } from "../../utils/api.js";
import { ElMessage } from "element-plus";

const router = useRouter();

let form = reactive({
  articleId: "",
  articleTitle: "",
  articleContent: "",
  articleType: "Java",
  articleEmail: "",
});
onMounted(() => {
  var msg = router.currentRoute.value.params;
  console.log(msg);
  form.articleId = msg.articleId;
  form.articleTitle = msg.articleTitle;
  form.articleType = msg.articleType;
  form.articleContent = msg.articleContent;
  form.articleEmail = msg.articleEmail;
});

const { articleTitle, articleContent, articleType } = toRefs(form);

//根据articleId进行匹配，修改(只允许修改文章内容)
const change = () => {
  console.log(form.articleId);
  var data = {
    articleId: form.articleId,
    articleTitle: form.articleTitle,
    articleContent: form.articleContent,
    articleEmail: form.articleEmail,
  };
  textChange(data).then((res) => {
    if (res.data.code == 200) {
      router.push("/");
      ElMessage({
        message: "修改成功！",
        type: "success",
      });
    }
  });
};
</script>
