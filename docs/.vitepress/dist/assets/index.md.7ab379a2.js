import{_ as c,c as r,a as n,w as o,b as e,d as t,r as a,o as l}from"./app.93ce5995.js";const N=JSON.parse('{"title":"AutoComplete \u81EA\u52A8\u586B\u5145","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u7528\u6CD5","slug":"\u57FA\u7840\u7528\u6CD5"}],"relativePath":"index.md"}'),p={name:"index.md"},d=e("h1",{id:"autocomplete-\u81EA\u52A8\u586B\u5145",tabindex:"-1"},[t("AutoComplete \u81EA\u52A8\u586B\u5145 "),e("a",{class:"header-anchor",href:"#autocomplete-\u81EA\u52A8\u586B\u5145","aria-hidden":"true"},"#")],-1),u=e("h2",{id:"\u57FA\u7840\u7528\u6CD5",tabindex:"-1"},[t("\u57FA\u7840\u7528\u6CD5 "),e("a",{class:"header-anchor",href:"#\u57FA\u7840\u7528\u6CD5","aria-hidden":"true"},"#")],-1),m=t(" column ");function f(_,h,x,v,V,b){const i=a("demo"),s=a("clientOnly");return l(),r("div",null,[d,u,n(s,null,{default:o(()=>[n(i,{"initial-value":`<template>
  <p-auto-complete
    v-model="inputValue"
    placeholder="\u8BF7\u8F93\u5165\u90AE\u7BB1"
    :options="options"
  />
</template>
<script setup>
import { ref, computed } from "vue";
const inputValue = ref("");
const options = computed(() =>
  ["@gmail.com", "@163.com", "@qq.com"].map((suffix) => {
    const prefix = inputValue.value.split("@")[0];
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    };
  })
);
<\/script>
`,direction:"column"},{default:o(()=>[m]),_:1})]),_:1})])}var $=c(p,[["render",f]]);export{N as __pageData,$ as default};
