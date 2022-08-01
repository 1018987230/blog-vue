<template>

  <div style="width: 100%; height:100px;background-color: antiquewhite; display: flex;">
    <el-input v-model="blogTitle" maxlength="30" placeholder="[title]" show-word-limit type="text"
      style="height: 80px;margin-top: 9px;margin-left: 50px;font-size: 25px;" />
    <!-- 文章类型 -->
    <el-select v-model="blogType" placeholder="Java" size="large" style="margin-top:30px;width: 100px;">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <!-- 发布按键 -->
    <el-button type="primary" plain
      style="float: right;margin-top: 18px;margin-right: 20px;margin-left: 50px;width:120px;height:60px;font-size:30px"
      @click="save">发布
    </el-button>
  </div>
  <!-- 富文本编辑器 -->
  <div>
    <v-md-editor v-model="blogContent" height="800px"></v-md-editor>
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
  blogId:"",
  blogTitle: "",
  blogContent: "",
  blogType: "Java"
})
// 能显示但是爆红



import { ElMessage } from 'element-plus'
//博客发布
const save = () => {
  var data = {
    "blogId":form.blogId,
    "blogEmail": "1018987230@qq.com",
    "blogAuthor":"wangyixiong",
    "blogTitle": form.blogTitle,
    "blogContent": form.blogContent,
    "blogType": form.blogType,
  }
  console.log(data)
  textSave(data).then((res) => {
    if(res.data.resultCode == 200){
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


const { blogTitle, blogContent,blogType } = toRefs(form)
</script>