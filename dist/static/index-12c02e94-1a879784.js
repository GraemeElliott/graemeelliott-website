import{r as l,f as o,bs as re,ab as U,bU as oe,bt as ie,dh as ae,aU as G,aW as ce,a_ as ue,bC as le,j as v,aO as de,di as me,b5 as pe,dj as fe,dk as he,dl as ye,bG as ge,c9 as Te,a$ as H,h as F,bn as $,k as Ie,cE as Le,T as _,o as x,bp as Se,F as be,S as Re,dm as Pe,C as k,aP as ve,u as Ce,aT as _e,c3 as O,dn as Ee,dp as je,dq as xe,dr as we,b_ as M,aE as De,ds as Fe,d8 as Oe,d9 as Ae,c1 as $e,dt as ke,du as Me,cG as N,cI as Ne,dv as qe,cz as We,c4 as Be,ch as Ue,dw as Ge,dx as He,dy as Ve,cA as Ye}from"./desk-257f76bb-645a6df6.js";import{useDeskTool as ze,useDeskToolSetting as q,Delay as Ke}from"./index-9e58f0f1-6a554c1d.js";import{P as Xe}from"./PaneItem-baaea00f-004cb26f.js";import"./json-inspector-d09c18b8.js";const W=100,A=2e3,V={by:[{field:"_updatedAt",direction:"desc"}]},Qe={};function Je(e,s){return e._id?H(e._id):"item-".concat(s)}function Ze(e){return xe(e).map(s=>({...s.draft||s.published,hasPublished:!!s.published,hasDraft:!!s.draft}))}const et=/\b_type\s*==\s*(['"].*?['"]|\$.*?(?:\s|$))|\B(['"].*?['"]|\$.*?(?:\s|$))\s*==\s*_type\b/;function tt(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const n=e.match(et);if(!n)return null;const t=(n[1]||n[2]).trim().replace(/^["']|["']$/g,"");if(t[0]==="$"){const a=t.slice(1),c=s[a];return typeof c=="string"?c:null}return t}function nt(e){return/^_type\s*==\s*['"$]\w+['"]?\s*$/.test(e.trim())}function st(e){return e.map(s=>[rt(s),(s.direction||"").toLowerCase()].map(n=>n.trim()).filter(Boolean).join(" ")).join(",")}function rt(e){return e.mapWith?"".concat(e.mapWith,"(").concat(e.field,")"):e.field}function ot(e,s){const n=e.by.map(t=>{if(t.mapWith)return t;const a=it(s,t.field);return a?ct(a,"datetime")?{...t,mapWith:"dateTime"}:a.jsonType==="string"?{...t,mapWith:"lower"}:t:t});return n.every((t,a)=>t===e.by[a])?e:{...e,by:n}}function it(e,s){const n=pe(s);let t=e;for(const a of n){if(!t)return;if(typeof a=="string"){t=at(t,a);continue}if(!(fe(a)||he(a))||t.jsonType!=="array")return;const[r,i]=t.of||[];if(i||!r)return;if(!ye(r)){t=r;continue}const[f,h]=r.to||[];if(h||!f)return;t=f}return t}function at(e,s){if(!("fields"in e))return;const n=e.fields.find(t=>t.name===s);return n?n.type:void 0}function ct(e,s){let n=e.type;for(;n;){if(n.name===s||!n.type&&n.jsonType===s)return!0;n=n.type}return!1}function ut(e){const{childItemId:s,error:n,filterIsSimpleTypeContraint:t,fullList:a,isActive:c,isLoading:r,items:i,layout:f,onListChange:h,onRetry:u,showIcons:y}=e,b=G(),{collapsed:S}=ge(),{collapsed:L,index:g}=Te(),[R,P]=l.useState(!1);l.useEffect(()=>{if(L)return;const d=setTimeout(()=>{P(!0)},0);return()=>{clearTimeout(d)}},[L]);const T=l.useCallback(d=>{const I=H(d._id),m=s===I;return o(Xe,{icon:y===!1?!1:void 0,id:I,pressed:!c&&m,selected:c&&m,layout:f,schemaType:b.get(d._type),value:d})},[s,c,f,b,y]),p=l.useMemo(()=>{if(!R)return null;if(n)return o(F,{align:"center",direction:"column",height:"fill",justify:"center",children:o($,{width:1,children:v(Ie,{paddingX:4,paddingY:5,space:4,children:[o(Le,{as:"h3",children:"Could not fetch list items"}),v(_,{as:"p",children:["Error: ",o("code",{children:n.message})]}),u&&o(x,{children:o(U,{icon:Se,onClick:u,text:"Retry",tone:"primary"})})]})})});if(i===null)return o(F,{align:"center",direction:"column",height:"fill",justify:"center",children:o(Ke,{ms:300,children:v(be,{children:[o(Re,{muted:!0}),o(x,{marginTop:3,children:o(_,{align:"center",muted:!0,size:1,children:"Loading documents…"})})]})})});if(!r&&i.length===0)return o(F,{align:"center",direction:"column",height:"fill",justify:"center",children:o($,{width:1,children:o(x,{paddingX:4,paddingY:5,children:o(_,{align:"center",muted:!0,size:2,children:t?"No documents of this type":"No matching documents"})})})});const d=a&&i.length===A;return v(x,{padding:2,children:[i.length>0&&o(Pe,{gap:1,getItemKey:Je,items:i,renderItem:T,onChange:h},"".concat(g,"-").concat(L)),r&&o(k,{borderTop:!0,marginTop:1,paddingX:3,paddingY:4,children:o(_,{align:"center",muted:!0,size:1,children:"Loading…"})}),d&&o(k,{marginTop:1,paddingX:3,paddingY:4,radius:2,tone:"transparent",children:v(_,{align:"center",muted:!0,size:1,children:["Displaying a maximum of ",A," documents"]})})]})},[n,t,a,h,r,i,u,T,R,L,g]);return o(ve,{overflow:S?void 0:"auto",children:p})}const Y=l.memo(e=>{let{index:s,initialValueTemplates:n=[],menuItems:t=[],menuItemGroups:a=[],setLayout:c,setSortOrder:r,title:i}=e;const{features:f}=ze(),h=l.useMemo(()=>({setLayout:u=>{let{layout:y}=u;c(y)},setSortOrder:u=>{r(u)}}),[c,r]);return o(re,{backButton:f.backButton&&s>0&&o(U,{as:oe,"data-as":"a",icon:ie,mode:"bleed"}),title:i,actions:o(ae,{initialValueTemplateItems:n,actionHandlers:h,menuItemGroups:a,menuItems:t})})});Y.displayName="DocumentListPaneHeader";const lt={result:null,error:!1},dt=e=>({result:{documents:e},loading:!1,error:!1}),mt=e=>({result:null,loading:!1,error:e}),pt=function(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const n=new we,t=n.next.bind(n);return e.pipe(M(r=>({client:r.client,query:r.query,params:r.params})),De(Fe),Oe(1),Ae()).pipe($e(r=>{const i=ke(r.client,r.query,r.params,s).pipe(M(dt),Me());return N(O({loading:!0}).pipe(Ne(400),qe(i)),i)})).pipe(We(lt),Be((r,i)=>Ue(O(mt(r)),N(Ge(window,"online"),n).pipe(He(1),Ve(i)))),Ye((r,i)=>({...r,...i,onRetry:t})))};function ft(e){var s;const{apiVersion:n,filter:t,params:a,sortOrder:c}=e,r=Ce(_e),[i,f]=l.useState(!1),h=l.useRef(i),[u,y]=l.useState(null),b=(u==null?void 0:u.error)||null,S=(u==null?void 0:u.loading)||u===null,L=u==null?void 0:u.onRetry,g=(s=u==null?void 0:u.result)==null?void 0:s.documents,R=l.useMemo(()=>g?Ze(g):null,[g]),P=l.useMemo(()=>{const p=c==null?void 0:c.extendedProjection,d=["_id","_type"],I=d.join(","),m=(c==null?void 0:c.by)||[],C=i?A:W,E=m.length>0?m:V.by,j=st(E);if(p){const w=d.concat(p).join(",");return["*[".concat(t,"] {").concat(w,"}"),"order(".concat(j,") [0...").concat(C,"]"),"{".concat(I,"}")].join("|")}return"*[".concat(t,"]|order(").concat(j,")[0...").concat(C,"]{").concat(I,"}")},[t,i,c]),T=l.useCallback(p=>{let{toIndex:d}=p;S||h.current||d>=W/2&&(f(!0),h.current=!0)},[S]);return l.useEffect(()=>{const p=i?m=>Boolean(m.result):()=>!0;y(m=>m?{...m,loading:!0}:null);const I=pt(O({client:r,query:P,params:a}),{apiVersion:n,tag:"desk.document-list"}).pipe(Ee(p)).subscribe(y);return()=>I.unsubscribe()},[n,r,i,P,a]),l.useEffect(()=>{y(null),f(!1),h.current=!1},[t,a,c,n]),{error:b,fullList:i,handleListChange:T,isLoading:S,items:R,onRetry:L}}const B=[];function ht(e){const s=l.useRef(e);return je(s.current,e)||(s.current=e),s.current}const Lt=l.memo(function(s){const{childItemId:n,index:t,isActive:a,isSelected:c,pane:r,paneKey:i}=s,f=G(),{name:h}=ce(),{defaultLayout:u="default",displayOptions:y,initialValueTemplates:b=B,menuItems:S,menuItemGroups:L,options:g,title:R}=r,{apiVersion:P,defaultOrdering:T=B,filter:p}=g,d=ht(g.params||Qe),I=r.source,m=l.useMemo(()=>tt(p,d),[p,d]),C=(y==null?void 0:y.showIcons)!==!1,[E,j]=q(m,"layout",u),w=l.useMemo(()=>(T==null?void 0:T.length)>0?{by:T}:V,[T]),[D,z]=q(m,"sortOrder",w),K=m&&D?ot(D,f.get(m)):D,X=ue(K),Q=nt(p),{error:J,fullList:Z,handleListChange:ee,isLoading:te,items:ne,onRetry:se}=ft({filter:p,params:d,sortOrder:X,apiVersion:P});return o(le,{name:I||h,children:v(de,{currentMaxWidth:350,id:i,maxWidth:640,minWidth:320,selected:c,children:[me,o(Y,{index:t,initialValueTemplates:b,menuItems:S,menuItemGroups:L,setLayout:j,setSortOrder:z,title:R}),o(ut,{childItemId:n,error:J,filterIsSimpleTypeContraint:Q,fullList:Z,isActive:a,isLoading:te,items:ne,layout:E,onListChange:ee,onRetry:se,showIcons:C})]})})});export{Lt as default};
