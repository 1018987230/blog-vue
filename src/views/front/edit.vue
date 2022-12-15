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
        @click="save">发布
      </el-button>

    </div>
   
  </div>
   <!-- 富文本编辑器 -->
    <div style="width: 80%;height:90vh;margin: 0 auto ;">
      <v-md-editor v-model="articleContent" height="100%" width="100%"></v-md-editor>
    </div>
</template>

<script lang="ts" setup>

import { reactive, toRefs, ref } from "vue"
import { textSave } from '../../utils/api.js'
import { useRouter, useRoute} from  'vue-router'

const router = useRouter()

const value = ref('')
const options = [
  {
    value: 'Java',
    label: 'Java',
  },
  {
    value: 'Vue',
    label: 'Vue',
  },
  {
    value: 'Web3',
    label: 'Web3',
  },
]

let form = reactive({
  articleId:"",
  articleTitle: "",
  articleContent: "",
  articleType: "Java"
})
// 能显示但是爆红



import { ElMessage } from 'element-plus'
//博客发布
const save = () => {
  var data = {
    "articleId":form.articleId,
    "articleEmail": "1018987230@qq.com",
    "articleAuthor":"wangyixiong",
    "articleTitle": form.articleTitle,
    "articleContent": form.articleContent,
    "articleType": form.articleType,
  }
  console.log(data)
  textSave(data).then((res) => {
    if(res.data.code == 200){
      ElMessage({
        message: '博客发布成功啦！',
        type: 'success'
      })
      router.push('/')
    }else{
      ElMessage({
        message: '似乎发生了什么错误！，F12',
        type: 'error'
      })
    }
  })
}


const { articleTitle, articleContent,articleType } = toRefs(form)
</script>