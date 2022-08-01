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
      @click="change">修改
    </el-button>
  </div>
  <!-- 富文本编辑器 -->
  <div>
    <v-md-editor v-model="blogContent" height="800px"></v-md-editor>
  </div>
</template>

<script setup>
import {reactive, onMounted, toRefs} from 'vue'
import {useRouter} from "vue-router"
import {textChange} from '../../utils/api.js'
import { ElMessage } from 'element-plus'

const router  = useRouter()

let form = reactive({
  blogId:"",
  blogTitle: "",
  blogContent: "",
  blogType: "Java"
})
onMounted(() =>{
    var msg = router.currentRoute.value.params
    console.log(msg)
    form.blogId = msg.blogId
    form.blogTitle = msg.blogTitle
    form.blogType = msg.blogType
    form.blogContent = msg.blogContent
})

const { blogTitle, blogContent,blogType } = toRefs(form)

//根据blogId进行匹配，修改(只允许修改文章内容)
const change = () => {
    console.log(form.blogId)
    var data ={
      blogId: form.blogId,
      blogTitle: form.blogTitle,
      blogContent: form.blogContent
    }
    textChange(data).then((res)=>{
      if(res.data.resultCode == 200){
        router.push('/')
        ElMessage({
        message: "修改成功！",
        type: "success"
      })
      }
      
    })

}

</script>