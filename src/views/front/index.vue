<template>


    <div style="width:80%;height:auto;max-width: 1200px;margin: 0 auto ;background-color:rgb(110, 110, 110);z-index:999">
        <!-- 导航头 -->
        <Header></Header>

        <!-- main -->
        <div style="width:100%; height:auto;margin-top: ;">
            <!--  -->
            <div style="position: relative;width:100%; height:40px; ;background-color: rgb(110, 110, 110);display: flex;">
                    <!-- 搜索框 -->
                    <el-input
                    v-model="currentTitle"
                    placeholder="Please input"
                    class="input-with-select"
                    style="height: 40px;width:60%;margin-left: 20%;"
                    >
                        <template #prepend>
                            <el-select v-model="currentType" placeholder="Select" style="width: 115px;display: inline-block;" size="large">
                                <el-option label="Java" value="Java"  />
                                <el-option label="Vue" value="Vue" />
                                <el-option label="Web3" value="Web3" />
                            </el-select>
                        </template>
                        <template #append>
                            <el-button :icon="Search" @click="findBtn" />
                        </template>
                    </el-input>
                    <el-button style="height:40px;width:80px" @click="toEdit" type="primary">发布</el-button>
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
                                    <div class="_title" style="" prop="title" >{{data.articleTitle}}</div>
                                    <div class="_time" prop="create_time" > {{data.createTime}}</div>
                                </div>
                                <!-- 文章内容 -->
                                <div class="_content">
                                    {{data.articleContent}}
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
                               
                                <div class="_infoDiv" @click="handleClick2(data)" >
                                    <div class="_title" style="" prop="title" >{{data.articleTitle}}</div>
                                    <div class="_time" prop="create_time" > {{data.createTime}}</div>
                                </div>
                                
                                <div class="_content">
                                    {{data.articleContent}}
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
                                    <div class="_title" style="" prop="title" >{{data.articleTitle}}</div>
                                    <div class="_time" prop="create_time" > {{data.createTime}}</div>
                                </div>
                                <!-- 文章内容 -->
                                <div class="_content">
                                    {{data.articleContent}}
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


// const components = Header

const router  = useRouter()

const activeName = ref('Java')


// 渲染返回数据
const info = reactive({
    tableData:[],
    total:20,
    pageSize:10,
    currentPage:1,
    currentType: "Java",
    currentTitle:""
})

onMounted(() =>{
    var data = {
      "articleTitle":"",
      "articleType": "Java",
      "currentPage": info.currentPage
    }
    find(data)
})

//tab点击事件
const handleClick = (tab: TabsPaneContext) => {
  info.currentType = tab.paneName
  var data = {
      "articleTitle":"",
      "articleType": tab.paneName,
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
}


// 封装根据类型查找文章 or 直接点击tab查找
const find = (data)=>{
    console.log(data)
    textFind(data).then((res)=>{
        info.total = parseInt(res.data.data.sum)
        info.tableData = res.data.data.info
        console.log(info.tableData)
    })
} 

// 分页和获取当前类型article总数
const pageNum = (data) =>{
    info.currentPage = data
    var data = {
        "articleTitle": info.currentTitle,
        "articleType": info.currentType,
        "currentPage": info.currentPage
    }
    find(data)
}


const {tableData,total,pageSize,currentPage,currentTitle, currentType} = toRefs(info)

// 
const findBtn = () =>{
    var data= {
        "articleTitle": info.currentTitle,
        "articleType": info.currentType,
        "currentPage": info.currentPage
    }
    activeName.value = info.currentType
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
    background-color: #fafffc; 
    width: 100%;
    height: 130px;
    border-bottom:solid 1px black;
}
._infoDiv{
    cursor: pointer;
    position: relative;
    width: 100%; 
    height: 50px;
    background-color: #cfcccc66;
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
    margin: 11px 10px;
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