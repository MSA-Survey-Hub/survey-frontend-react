"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[1288],{81288:function(e,n,r){r.r(n);var t=r(42982),s=r(74165),a=r(1413),c=r(15861),i=r(70885),l=r(72791),o=r(78983),d=r(38876),u=r(82388),h=(r(66369),r(80184));n.default=function(){var e=decodeURI(window.location.href).split("?")[1],n=new URLSearchParams(e),r=n.get("page")?n.get("page"):1,x=(0,l.useState)(!1),j=(0,i.Z)(x,2),p=j[0],g=j[1],f=(0,l.useState)({totalPage:0,page:1,size:0,start:0,end:0,prev:!1,next:!1,pageList:[]}),C=(0,i.Z)(f,2),Z=C[0],b=C[1],m=(0,l.useState)([]),v=(0,i.Z)(m,2),y=v[0],_=v[1];(0,l.useState)((0,c.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.Z.get(d.Z.surveyCategoryList+"?page="+r).then((function(e){console.log(e.data),b((function(n){return(0,a.Z)((0,a.Z)((0,a.Z)({},n),e.data),{},{page:r})})),_(e.data.dtoList)}));case 2:case"end":return e.stop()}}),e)}))));var S=(0,l.useState)([]),k=(0,i.Z)(S,2),N=k[0],w=k[1],I=(0,l.useState)(""),R=(0,i.Z)(I,2),T=R[0],L=R[1],P=(0,l.useState)(!1),D=(0,i.Z)(P,2),E=D[0],O=D[1],U=(0,l.useState)(""),z=(0,i.Z)(U,2),F=z[0],G=z[1],H=(0,l.useState)(""),J=(0,i.Z)(H,2),V=J[0],Y=J[1];return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.Gc,{visible:E,color:F,dismissible:!0,onClose:function(){return O(!1)},children:V}),(0,h.jsx)(o.sl,{className:"text-end",children:(0,h.jsx)(o.u5,{className:"mb-3",onClick:function(){return g(!p)},children:"Register"})}),(0,h.jsxs)(o.Tk,{backdrop:"static",visible:p,onClose:function(){return g(!1)},children:[(0,h.jsx)(o.p0,{children:(0,h.jsx)(o.fl,{children:"\uc124\ubb38 \uce74\ud14c\uace0\ub9ac \ub4f1\ub85d\ud558\uae30"})}),(0,h.jsx)(o.sD,{children:(0,h.jsx)(o.jO,{label:"\uce74\ud14c\uace0\ub9ac\uba85",name:"content",onChange:function(e){L(e.target.value)}})}),(0,h.jsxs)(o.Ym,{children:[(0,h.jsx)(o.u5,{color:"secondary",onClick:function(){return g(!1)},children:"Cancel"}),(0,h.jsx)(o.u5,{color:"primary",onClick:function(){u.Z.post(d.Z.surveyCategoryRegister,{content:T},{headers:{"Content-Type":"application/json"}}).then((function(e){g(!1),G("success"),Y(e.data),O(!0)})).catch((function(e){g(!1),G("danger"),Y(e.response.data),O(!0)}))},children:"Register"})]})]}),(0,h.jsx)(o.rb,{children:(0,h.jsxs)(o.b7,{xs:12,children:[(0,h.jsx)("code",{}),(0,h.jsxs)(o.xH,{className:"mb-4",children:[(0,h.jsx)(o.bn,{children:(0,h.jsx)("strong",{children:"\uc124\ubb38 \uce74\ud14c\uace0\ub9ac \ub9ac\uc2a4\ud2b8"})}),(0,h.jsxs)(o.sl,{children:[(0,h.jsxs)(o.Sx,{children:[(0,h.jsx)(o.V,{children:(0,h.jsxs)(o.T6,{children:[(0,h.jsx)(o.is,{scope:"col",children:"\uc0ad\uc81c"}),(0,h.jsx)(o.is,{scope:"col",children:"#"}),(0,h.jsx)(o.is,{scope:"col",children:"\uce74\ud14c\uace0\ub9ac\uba85"}),(0,h.jsx)(o.is,{scope:"col",children:"\uce74\ud14c\uace0\ub9ac \ub4f1\ub85d \ub0a0\uc9dc"})]})}),(0,h.jsx)(o.NR,{children:y.map((function(e){return(0,h.jsxs)(o.T6,{children:[(0,h.jsx)(o.NN,{children:(0,h.jsx)(o.EC,{id:e.surCatId,onChange:function(n){var r,s;r=n.currentTarget.checked,s=e.surCatId,w(r?[].concat((0,t.Z)(N),[s]):N.filter((function(e){return e!==s})))},checked:!!N.includes(e.surCatId)})}),(0,h.jsx)(o.is,{scope:"row",children:e.surCatId}),(0,h.jsx)(o.NN,{children:e.content}),(0,h.jsx)(o.NN,{children:e.regDt})]},e)}))})]}),(0,h.jsx)(o.u5,{color:"danger",onClick:function(){u.Z.post(d.Z.surveyCategoryDelete,JSON.stringify(N),{headers:{"Content-Type":"application/json"}}).then((function(e){G("success"),Y(e.data),O(!0)})).catch((function(e){console.log(e),G("danger"),Y(e.response.data),O(!0)}))},children:"Delete"})]})]}),(0,h.jsxs)(o.E7,{"aria-label":"Page navigation example",align:"center",children:[Z.prev?(0,h.jsx)(o.tn,{"aria-label":"Previous",children:(0,h.jsx)("span",{"aria-hidden":"true",children:(0,h.jsx)("a",{href:"/#/category/category_list?page="+String(parseInt(Z.start)-1),children:"\xab"})})}):(0,h.jsx)(o.tn,{"aria-label":"Previous",disabled:!0,children:(0,h.jsx)("span",{"aria-hidden":"true",children:"\xab"})}),Z.pageList.map((function(e){return e===parseInt(Z.page)?(0,h.jsx)(o.tn,{active:!0,children:Z.page},e):(0,h.jsx)(o.tn,{children:(0,h.jsx)("a",{href:"/#/category/category_list?page="+e,children:e})},e)})),Z.next?(0,h.jsx)(o.tn,{"aria-label":"Next",children:(0,h.jsx)("span",{"aria-hidden":"true",children:(0,h.jsx)("a",{href:"/#/category/category_list?page="+String(parseInt(Z.end)+1),children:"\xbb"})})}):(0,h.jsx)(o.tn,{"aria-label":"Next",disabled:!0,children:(0,h.jsx)("span",{"aria-hidden":"true",children:"\xbb"})})]})]})})]})}}}]);
//# sourceMappingURL=1288.8b96935a.chunk.js.map