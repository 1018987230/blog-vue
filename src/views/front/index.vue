<template>
    <!-- <Header></Header> -->
    <div style="width:80%; height:1000px;margin-left:10%;background-color:rgb(110, 110, 110)">
        <!-- 导航头 -->
        <Header></Header>

        <!-- main -->
        <div style="width:100%; height:2000px;margin-top: ;">
            <!-- 搜索框 -->
            <div style="position: relative;width:60%; height:60px;margin-left: 20%; ;background-color: blanchedalmond;">
                    <el-input
                    v-model="blogTitle"
                    placeholder="Please input"
                    class="input-with-select"
                    style="height:50px"
                    >
                        <template #prepend>
                            <el-select v-model="blogType" placeholder="Select" style="width: 115px;height:50px">
                            <el-option label="Java" value="Java" />
                            <el-option label="Vue" value="Vue" />
                            <el-option label="Web3" value="Web3" />
                            </el-select>
                        </template>
                        <template #append>
                            <el-button :icon="Search" @click="findBtn" />
                        </template>
                    </el-input>
            </div>

            <!-- 主体 -->
            <div style="width:100%; height:auto;background-color:aliceblue;">
                <el-tabs
                v-model="activeName"
                type="card"
                class="demo-tabs"
                @tab-click="handleClick"
                >
                    <el-tab-pane label="Java" name="Java">
                        <div style="position: relative; background-color: beige;width: 100%;height: auto;">

                            <div id="text" class="_textDiv" v-for="(data, index) in tableData" :key="index">
                                <!-- 文章信息 -->
                                <div class="_infoDiv" @click="handleClick2(data)" >
                                    <div class="_title" prop="title" >{{data.blogTitle}}</div>
                                    <div class="_time" prop="create_time" > {{data.createTime}}</div>
                                </div>
                                <!-- 文章内容 -->
                                <div class="_content">
                                    {{data.blogContent}}
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="Vue" name="Vue"></el-tab-pane>
                    <el-tab-pane label="Web3" name="Web3"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import Header  from '../../components/header.vue'
import type { TabsPaneContext } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import {textFind} from '../../utils/api.js'
import {useRouter} from 'vue-router'


const components = Header

const router  = useRouter()

const activeName = ref('first')

// 渲染返回数据
let info = reactive({
    tableData:[]
})

//tab点击事件
const handleClick = (tab: TabsPaneContext) => {
  console.log(tab.paneName)
  var data = {
      "blogType": tab.paneName
  }
  find(data)
}

//文章点击事件
const handleClick2 = (data) => {
  console.log("XX")
  console.log(data)

  router.push({
       name: "edit",
       params: data
  })
}



// 封装根据类型查找文章 or 直接点击tab查找
const find = (data)=>{
    console.log(data)
    textFind(data).then((res)=>{
        info.tableData = res.data.data
    })
} 

// 搜索
const form = reactive({
    "blogTitle": "",
    "blogType": ""
})
const { blogTitle, blogType} = toRefs(form)


const {tableData} = toRefs(info)

// 
const findBtn = () =>{
    var data= {
        "title": form.blogTitle,
        "type": form.blogType,
    }
    find(data)
}


</script>


<style lang="" scoped>

.el-input__wrapper > .el-input__inner{
    --el-input-inner-height: calc(var(--el-input-height, 38px) - -15px);
}

._textDiv{
    position: relative;
    background-color: white; 
    width: 100%;
    height: 150px;
    border-bottom:solid 1px black;
}
._infoDiv{
    cursor: pointer;
    position: relative;
    width: 100%; 
    height: 50px;
    background-color: white;
    border-bottom:1px solid #0000001f;
}
 ._title{
    font-size:22px;
    margin: 12px;
    float:left;
    height: 100%;
    margin-top: 10px;
}
._time{
    margin: 10px;
    float:right;
    margin-top: 14px;
}
._content{
    margin: 10px;
    font-size: 16px;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>