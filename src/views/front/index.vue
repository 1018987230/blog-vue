<template>
    <!-- <Header></Header> -->
    <div style="width:80%; ;height:1000px;margin-left:10%;background-color:rgb(110, 110, 110)">
        <!-- 导航头 -->
        <Header></Header>

        <!-- main -->
        <div style="width:100%; height:2000px;margin-top: ;">
            <!--  -->
            <div style="position: relative;width:60%; height:60px;margin-left: 20%; ;background-color: blanchedalmond;display: flex;">
                    <!-- 搜索框 -->
                    <el-input
                    v-model="blogTitle"
                    placeholder="Please input"
                    class="input-with-select"
                    style="height:50px"
                    >
                        <template #prepend>
                            <el-select v-model="blogType" placeholder="Select" style="width: 115px;height:50px">
                            <el-option label="Java" value="Java"  />
                            <el-option label="Vue" value="Vue" />
                            <el-option label="Web3" value="Web3" />
                            </el-select>
                        </template>
                        <template #append>
                            <el-button :icon="Search" @click="findBtn" />
                        </template>
                    </el-input>
                    <el-button style="height:50px;width:80px" @click="toEdit" type="primary">发布</el-button>
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
                                    <div class="_title" style="" prop="title" >{{data.blogTitle}}</div>
                                    <div class="_time" prop="create_time" > {{data.createTime}}</div>
                                </div>
                                <!-- 文章内容 -->
                                <div class="_content">
                                    {{data.blogContent}}
                                </div>
                            </div>
                        </div>
                        <el-pagination  
                            background 
                            layout="prev, pager, next" 
                            :total="total" 
                            :page-size="pageSize"
                            :current-page="currentPage"
                            @current-change="pageNum" />

                    </el-tab-pane>

                    <el-tab-pane label="Vue" name="Vue">
                        <div style="position: relative; background-color: beige;width: 100%;height: auto;">
                            <div id="text" class="_textDiv" v-for="(data, index) in tableData" :key="index">
                                <!-- 文章信息 -->
                                <div class="_infoDiv" @click="handleClick2(data)" >
                                    <div class="_title" style="" prop="title" >{{data.blogTitle}}</div>
                                    <div class="_time" prop="create_time" > {{data.createTime}}</div>
                                </div>
                                <!-- 文章内容 -->
                                <div class="_content">
                                    {{data.blogContent}}
                                </div>
                            </div>
                        </div>
                        <el-pagination  
                            background 
                            layout="prev, pager, next" 
                            :total="total" 
                            :page-size="pageSize"
                            :current-page="currentPage"
                            @current-change="pageNum" />
                    </el-tab-pane>
                    <el-tab-pane label="Web3" name="Web3">
                        <div style="position: relative; background-color: beige;width: 100%;height: auto;">
                            <div id="text" class="_textDiv" v-for="(data, index) in tableData" :key="index">
                                <!-- 文章信息 -->
                                <div class="_infoDiv" @click="handleClick2(data)" >
                                    <div class="_title" style="" prop="title" >{{data.blogTitle}}</div>
                                    <div class="_time" prop="create_time" > {{data.createTime}}</div>
                                </div>
                                <!-- 文章内容 -->
                                <div class="_content">
                                    {{data.blogContent}}
                                </div>
                            </div>
                        </div>
                        <el-pagination  
                            background 
                            layout="prev, pager, next" 
                            :total="total" 
                            :page-size="pageSize"
                            :current-page="currentPage"
                            @current-change="pageNum" />
                    </el-tab-pane>
                    
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
    tableData:[],
    total:"",
    pageSize:10,
    currentPage:1,
    currentTab: "Java",
    
})

//tab点击事件
const handleClick = (tab: TabsPaneContext) => {
  console.log(tab.paneName)
  info.currentTab = tab.paneName
  var data = {
      "blogType": tab.paneName,
      "currentPage": info.currentPage
  }
  find(data)
  
}

//文章点击事件
const handleClick2 = (data) => {
  router.push({
       name: "detail",
       params: data
  })
  console.log(info.total)
}



// 封装根据类型查找文章 or 直接点击tab查找
const find = (data)=>{
    console.log(data)
    textFind(data).then((res)=>{
        info.total = parseInt(res.data.message)
        info.tableData = res.data.data
        console.log(info.total)
    })
} 

// 分页和获取当前类型blog总数
const pageNum = (data) =>{
    info.currentPage = data
    var data = {
        "blogType": info.currentTab,
        "currentPage": info.currentPage
    }
    find(data)
}


// 搜索
const form = reactive({
    "blogTitle": "",
    "blogType": ""
})
const { blogTitle, blogType} = toRefs(form)


const {tableData,total,pageSize,currentPage} = toRefs(info)

// 
const findBtn = () =>{
    var data= {
        "title": form.blogTitle,
        "type": form.blogType,
    }
    find(data)
}


// 页面跳转

const toEdit = () =>{
    router.push({
        path:"/edit"
    })
} 


</script>


<style lang="" scoped>

.el-input__wrapper > .el-input__inner{
    --el-input-inner-height: calc(var(--el-input-height, 38px) - -5px);
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
    font-size:25px;
    margin: 12px;
    float:left;
    height: 100%;
    margin-top: 10px;
    font-weight: bolder
}
._time{
    margin: 10px;
    float:right;
    margin-top: 14px;
}
._content{
    margin: 23px 10px;
    font-size: 16px;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: rgba(0, 0, 0, 0.64)
}
</style>