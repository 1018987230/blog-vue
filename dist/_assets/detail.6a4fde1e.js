import{u as l,f as e,m as a,t,g as o,h as n,a as i,i as u,j as p,w as s,F as g,e as d,o as r,k as m,b,c as h}from"./index.b3183b79.js";const x={style:{width:"100%",height:"100px","background-color":"antiquewhite",display:"flex"}},c=b("修改 ");var v={__name:"detail",setup(b){const v=l();let y=e({blogId:"",blogTitle:"",blogContent:"",blogType:"Java"});a((()=>{var l=v.currentRoute.value.params;console.log(l),y.blogId=l.blogId,y.blogTitle=l.blogTitle,y.blogType=l.blogType,y.blogContent=l.blogContent}));const{blogTitle:f,blogContent:V,blogType:T}=t(y);return(l,e)=>{const a=d("el-input"),t=d("el-option"),b=d("el-select"),v=d("el-button"),y=d("v-md-editor");return r(),o(g,null,[n("div",x,[i(a,{modelValue:u(f),"onUpdate:modelValue":e[0]||(e[0]=l=>p(f)?f.value=l:null),maxlength:"30",placeholder:"[title]","show-word-limit":"",type:"text",style:{height:"80px","margin-top":"9px","margin-left":"50px","font-size":"25px"}},null,8,["modelValue"]),i(b,{modelValue:u(T),"onUpdate:modelValue":e[1]||(e[1]=l=>p(T)?T.value=l:null),placeholder:"Java",size:"large",style:{"margin-top":"30px",width:"100px"}},{default:s((()=>[(r(!0),o(g,null,m(l.options,(l=>(r(),h(t,{key:l.value,label:l.label,value:l.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),i(v,{type:"primary",plain:"",style:{float:"right","margin-top":"18px","margin-right":"20px","margin-left":"50px",width:"120px",height:"60px","font-size":"30px"},onClick:l.change},{default:s((()=>[c])),_:1},8,["onClick"])]),n("div",null,[i(y,{modelValue:u(V),"onUpdate:modelValue":e[2]||(e[2]=l=>p(V)?V.value=l:null),height:"800px"},null,8,["modelValue"])])],64)}}};export{v as default};
