import{_ as d,d as f,P as N,r as h,o as c,c as l,a as e,g as n,M as g,N as C,Q as F,k as u,f as p,R as b,A as x,B as $,w as k,F as w,I as E,e as S,l as j,v as A,x as P}from"./index.c2be3de6.js";import{_ as L,P as T,l as M}from"./PreviewImage.39e0eb70.js";const R=o=>(g("data-v-6d6d8a1e"),o=o(),C(),o),V={class:"nav-bar-box"},q=R(()=>e("div",{class:"logo"},[e("img",{src:L,alt:"logo",srcset:""}),e("span",null,"\u5316\u7B80")],-1)),z={class:"right"},H={href:"https://github.com/Hacker233/resume-design",target:"_blank",rel:"noopener noreferrer"},J=f({props:{bgColor:{default:""},fontColor:{default:""},iconColor:{default:"#fff"}},setup(o){return N(a=>({a87524a2:o.bgColor,"492e43a5":o.fontColor})),(a,s)=>{const t=h("svg-icon");return c(),l("div",V,[q,e("div",z,[e("a",H,[n(t,{iconName:"icon-github-fill",color:o.iconColor},null,8,["color"])])])])}}});var O=d(J,[["__scopeId","data-v-6d6d8a1e"]]);const Q={},y=o=>(g("data-v-fab69abc"),o=o(),C(),o),U={class:"project-introduce-box"},G=y(()=>e("div",{class:"left"},[e("h1",null,"\u4E00\u6B3E\u5F00\u6E90\u7684\u3001\u514D\u8D39\u7684\u7B80\u5386\u8BBE\u8BA1\u795E\u5668"),e("p",null,"\u5FEB\u901F\u8BBE\u8BA1\u3001\u65E0\u540E\u53F0\u3001\u786E\u4FDD\u6570\u636E\u4E0D\u4F1A\u6CC4\u9732\uFF0C\u652F\u6301\u4E00\u952E\u5BFC\u51FAPDF\u3001JSON\u6570\u636E\u3002")],-1)),K=y(()=>e("div",{class:"right"},[e("img",{class:"bgc-img",src:F,alt:""})],-1)),W=[G,K];function X(o,a){return c(),l("div",U,W)}var Y=d(Q,[["render",X],["__scopeId","data-v-fab69abc"]]);const Z=[{id:"1",name:"template1",preview:"template1.png"},{id:"2",name:"template2",preview:"template2.png"}];const ee=["src"],oe={class:"mask-layer"},te=["src"],se=f({props:{cardData:null},emits:["toDesign"],setup(o,{emit:a}){const s=o;let t=u(!1);const r=()=>{t.value=!0},i=()=>{t.value=!1},m=()=>{a("toDesign",s.cardData)},v=u(!1),B=()=>{v.value=!0},D=()=>{v.value=!1};return(xe,$e)=>{const I=h("svg-icon");return c(),l(w,null,[e("div",{class:"template-card-box",onMouseover:r,onMouseleave:i},[e("img",{src:p(b)(o.cardData.preview),alt:"",srcset:""},null,8,ee),x(e("div",oe,[e("div",{class:"preview-icon",title:"\u9884\u89C8",onClick:B},[n(I,{iconName:"icon-yulan",className:"yulan"})]),e("div",{class:"design-button",onClick:m},"\u7ACB\u5373\u514D\u8D39\u5236\u4F5C")],512),[[$,p(t)]])],32),x(n(T,{onClose:D},{default:k(()=>[e("img",{class:"previewImg",src:p(b)(o.cardData.preview),alt:"",srcset:""},null,8,te)]),_:1},512),[[$,v.value]])],64)}}});var ae=d(se,[["__scopeId","data-v-42f130d2"]]);const ne={class:"template-select-box"},ce=e("div",{class:"title"},[e("h1",null,"\u514D\u8D39\u6A21\u677F + \u7528\u5FC3\u8BBE\u8BA1"),e("p",null,"\u7528\u5FC3\u8BBE\u8BA1\u6BCF\u4E00\u5957\u6A21\u677F\uFF0C\u9002\u5408\u5404\u884C\u5404\u4E1A\u4ECE\u4E1A\u8005")],-1),le={class:"card-list"},re=f({setup(o){const a=E(),s=t=>{a.push({path:"/designer",query:{id:t.id,name:t.name}})};return(t,r)=>(c(),l("div",ne,[ce,e("div",le,[(c(!0),l(w,null,S(p(Z),(i,m)=>(c(),j(ae,{cardData:i,onToDesign:s},null,8,["cardData"]))),256))])]))}});const ie={},_=o=>(g("data-v-60ed557d"),o=o(),C(),o),_e={class:"footer-box"},ue=_(()=>e("a",{href:"https://space.bilibili.com/493520625?spm_id_from=333.1007.0.0",target:"_blank",rel:"noopener noreferrer"},"\u5C0F\u732A\u8BFE\u5802",-1)),de=_(()=>e("div",{class:"lines"},null,-1)),ve=_(()=>e("a",{href:"https://juejin.cn/user/3034307822112798",target:"_blank",rel:"noopener noreferrer"},"\u6398\u91D1",-1)),pe=_(()=>e("div",{class:"lines"},null,-1)),fe=_(()=>e("a",{href:"https://www.zhihu.com/people/luhongquan",target:"_blank",rel:"noopener noreferrer"},"\u4F1A\u98DE\u7684\u732A",-1)),me=_(()=>e("div",{class:"visit"},null,-1));function he(o,a){const s=h("svg-icon");return c(),l("div",_e,[e("ul",null,[e("li",null,[n(s,{iconName:"icon-bilibili-copy",className:"bilibili"}),ue]),de,e("li",null,[n(s,{iconName:"icon-juejin-logo",className:"juejin"}),ve]),pe,e("li",null,[n(s,{iconName:"icon-shejiaotubiao-10",className:"zhihu"}),fe])]),me])}var ge=d(ie,[["render",he],["__scopeId","data-v-60ed557d"]]);const Ce={ref:"introduceRef"},be=f({setup(o){A(()=>{window.addEventListener("scroll",a)}),P(()=>{window.removeEventListener("scroll",a)});const a=M.exports.throttle(()=>{i()},300),s=u(""),t=u("#fff"),r=u("#fff"),i=()=>{document.documentElement.scrollTop>0?(s.value="#fff",t.value="green",r.value="green"):(s.value="",r.value="#fff",t.value="#fff")};return(m,v)=>(c(),l("div",{class:"index-box",ref:"indexRef",onScroll:i},[n(O,{bgColor:s.value,fontColor:t.value,"icon-color":r.value},null,8,["bgColor","fontColor","icon-color"]),e("div",Ce,[n(Y)],512),n(re),n(ge)],544))}});var Be=d(be,[["__scopeId","data-v-f2ae2c68"]]);export{Be as default};