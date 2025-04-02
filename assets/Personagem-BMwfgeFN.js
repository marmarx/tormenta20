const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/carregar-D3u-DGCF.js","assets/index-CJ4xQOWJ.js","assets/index-hB2OTWev.css","assets/detalhes-_jA-RU8w.js","assets/erase-CcxxTUxU.js","assets/export-B7bTWLGN.js","assets/filtros-dmkW_ruM.js","assets/filtros-rKY27S6H.css","assets/import-C73Lory7.js","assets/lista-Bz5lbvEK.js","assets/pencil-CVtyaq_j.js","assets/pencil-DdAxflSu.css","assets/personagem-DGSfAdoW.js","assets/trash-ZoXU50QO.js"])))=>i.map(i=>d[i]);
import{t as L,u as O,b as P,f as J,a as Q,c as M,d as j,r as W,o as X,n as q,e as Y,g as Z,h as ee,i as te,j as F,l as oe}from"./selectInput-DUifFGXK.js";import{_ as y,r as S,s as se,w as ae,d as ne,c as l,o as a,a as i,b as k,e as r,n as G,f as A,g as x,h as le,i as C,j as u,T as ie,F as h,k as re,l as g,m as w,v as K,u as s,p as de,q as B,t as I,x as b,y as T,z as R,A as ue,B as z}from"./index-CJ4xQOWJ.js";const ce={class:"icon"},me={__name:"buttonImport",props:{icon:String,iconPos:String},emits:["clicked"],setup(n,{emit:t}){const d=n,e=S(null),o=se(null),f=()=>o.value=ne(()=>re(Object.assign({"../icons/buttonIcons/carregar.vue":()=>g(()=>import("./carregar-D3u-DGCF.js"),__vite__mapDeps([0,1,2])),"../icons/buttonIcons/detalhes.vue":()=>g(()=>import("./detalhes-_jA-RU8w.js"),__vite__mapDeps([3,1,2])),"../icons/buttonIcons/erase.vue":()=>g(()=>import("./erase-CcxxTUxU.js"),__vite__mapDeps([4,1,2])),"../icons/buttonIcons/export.vue":()=>g(()=>import("./export-B7bTWLGN.js"),__vite__mapDeps([5,1,2])),"../icons/buttonIcons/filtros.vue":()=>g(()=>import("./filtros-dmkW_ruM.js"),__vite__mapDeps([6,1,2,7])),"../icons/buttonIcons/import.vue":()=>g(()=>import("./import-C73Lory7.js"),__vite__mapDeps([8,1,2])),"../icons/buttonIcons/lista.vue":()=>g(()=>import("./lista-Bz5lbvEK.js"),__vite__mapDeps([9,1,2])),"../icons/buttonIcons/pencil.vue":()=>g(()=>import("./pencil-CVtyaq_j.js"),__vite__mapDeps([10,1,2,11])),"../icons/buttonIcons/personagem.vue":()=>g(()=>import("./personagem-DGSfAdoW.js"),__vite__mapDeps([12,1,2])),"../icons/buttonIcons/trash.vue":()=>g(()=>import("./trash-ZoXU50QO.js"),__vite__mapDeps([13,1,2]))}),`../icons/buttonIcons/${d.icon}.vue`,4));return ae(()=>d.icon,()=>f(),{immediate:!0}),(D,_)=>(a(),l(h,null,[i("input",{ref_key:"file",ref:e,type:"file",onChange:_[0]||(_[0]=E=>D.$emit("clicked")),style:{display:"none"}},null,544),k(ie,{name:"fade",tag:"div"},{default:r(()=>[(a(),l("button",{class:G(["iconButton",n.iconPos]),key:o.value,onClick:_[1]||(_[1]=E=>e.value.click())},[i("div",ce,[o.value?(a(),A(le(o.value),{key:0})):x("",!0)]),i("p",null,[C(D.$slots,"default",{},()=>[_[2]||(_[2]=u("Button Icon"))],!0)])],2))]),_:3})],64))}},pe=y(me,[["__scopeId","data-v-8373ff6f"]]),ve={class:"color-picker"},_e={__name:"t20color",setup(n){return(t,d)=>(a(),l("div",ve,[d[1]||(d[1]=i("p",null,"Escola uma cor:",-1)),w(i("input",{type:"color","onUpdate:modelValue":d[0]||(d[0]=e=>de(L)?L.value=e:null)},null,512),[[K,s(L)]])]))}},fe=y(_e,[["__scopeId","data-v-51e73cf8"]]),ke={key:0,class:"overflow",style:{"padding-top":"1.5em","min-height":"300px"}},$e=["name"],Ve=["onClick"],ge=["innerHTML"],he={class:"item-subtitle"},be={__name:"carregar",setup(n){const t=O(),d=B(()=>t.charData?t.charData.id:null);return(e,o)=>(a(),A(J,{class:"grow"},{default:r(()=>[o[6]||(o[6]=i("h2",null,"Personagens",-1)),s(t).charList?(a(),l("div",ke,[(a(!0),l(h,null,I(s(t).charList,f=>(a(),l("div",{class:"item-cont",key:`char-${f.name}`,name:f.name},[i("div",{class:G(["item",{selectedChar:f.id==d.value}]),onClick:D=>s(t).loadChar(f.id)},[i("p",{class:"item-title bold",innerHTML:f.name},null,8,ge),i("p",he,b(f.basic.filter(Boolean).join(" • ")),1)],10,Ve)],8,$e))),128))])):x("",!0),k(P,{onClicked:o[0]||(o[0]=f=>s(t).createChar("Personagem sem nome")),icon:"pencil"},{default:r(()=>o[1]||(o[1]=[u("Novo personagem")])),_:1}),k(P,{onClicked:s(t).deleteChar,icon:"erase"},{default:r(()=>o[2]||(o[2]=[u("Apagar personagem")])),_:1},8,["onClicked"]),k(pe,{onClicked:s(t).importChar,icon:"import"},{default:r(()=>o[3]||(o[3]=[u("Importar personagem")])),_:1},8,["onClicked"]),k(P,{onClicked:s(t).exportChar,icon:"export"},{default:r(()=>o[4]||(o[4]=[u("Exportar personagem")])),_:1},8,["onClicked"]),k(P,{onClicked:s(t).clearStorage,icon:"trash"},{default:r(()=>o[5]||(o[5]=[u("Apagar todos os dados")])),_:1},8,["onClicked"]),k(fe)]),_:1}))}},Ce=y(be,[["__scopeId","data-v-5bda9847"]]),ye={class:"input"},De={key:0},Ie=["min","max","placeholder","value"],xe={__name:"numberInput",props:{modelValue:String,placeholder:String,min:String,max:String},setup(n){return(t,d)=>(a(),l("div",ye,[t.$slots.default?(a(),l("p",De,[C(t.$slots,"default",{},void 0,!0)])):x("",!0),i("input",{type:"number",min:n.min,max:n.max,placeholder:n.placeholder,value:n.modelValue,onInput:d[0]||(d[0]=e=>t.$emit("update:modelValue",e.target.value)),autocomplete:"off",required:""},null,40,Ie)]))}},Ee=y(xe,[["__scopeId","data-v-d385feda"]]),we={class:"fakeoption"},Ae={key:0},Pe=["for"],Le=["id","value","checked"],Ue={__name:"fakeCheckbox",props:{checked:Boolean,option:String},setup(n){return(t,d)=>(a(),l("div",we,[t.$slots.default?(a(),l("p",Ae,[C(t.$slots,"default",{},void 0,!0)])):x("",!0),i("label",{for:`checkbox-${n.option}`},[u(b(n.option)+" ",1),i("input",{type:"checkbox",id:`checkbox-${n.option}`,value:n.option,checked:n.checked,onClick:d[0]||(d[0]=T(()=>{},["stop","prevent"]))},null,8,Le),d[1]||(d[1]=i("span",{class:"checkmark"},null,-1))],8,Pe)]))}},Se=y(Ue,[["__scopeId","data-v-4a6bac89"]]),Te={class:"input"},Re={key:0},Oe={class:"select"},Be={key:0},Ne={value:"",selected:"",disabled:""},Me=["value","disabled"],je={class:"selected-items overlayed"},qe=["onClick"],Fe={class:"selected-items"},ze=["onClick"],He={class:"dropdown"},Je={key:0,class:"group"},Ge={__name:"selectCheckbox",props:{modelValue:Array,options:Array},emits:["update:modelValue"],setup(n,{emit:t}){const d=n,e=t,o=/Mobi|iPhone|iPad|iPod|Android/i.test(navigator.userAgent),f=S(!1),D=S(null),_=B({get:()=>d.modelValue,set:c=>e("update:modelValue",c)}),E=c=>_.value.includes(c),v=c=>_.value=_.value.filter(m=>m!==c),$=c=>{E(c)?v(c):_.value.push(c)},V=c=>{D.value&&D.value.contains(c.relatedTarget)||(f.value=!1)};return(c,m)=>(a(),l("div",Te,[c.$slots.title?(a(),l("p",Re,[C(c.$slots,"title",{},void 0,!0)])):x("",!0),i("div",Oe,[s(o)?(a(),l("div",Be,[w(i("select",{"onUpdate:modelValue":m[0]||(m[0]=p=>_.value=p),size:"1",multiple:"",required:""},[i("option",Ne,[_.value.length?x("",!0):C(c.$slots,"default",{key:0},void 0,!0)]),(a(!0),l(h,null,I(n.options,p=>(a(),l("option",{key:p,value:p,disabled:p.includes("--")},b(p),9,Me))),128))],512),[[R,_.value]]),i("div",je,[(a(!0),l(h,null,I(_.value,p=>(a(),l("span",{key:p,onClick:T(N=>v(p),["stop"])},b(p)+" ✖",9,qe))),128))])])):(a(),l("div",{key:1,ref_key:"dropdownRef",ref:D,class:"fakeinput",tabindex:"0",onFocusin:m[1]||(m[1]=p=>f.value=!0),onFocusout:V},[_.value.length?x("",!0):C(c.$slots,"default",{key:0},void 0,!0),i("div",Fe,[(a(!0),l(h,null,I(_.value,p=>(a(),l("span",{key:p,onClick:T(N=>v(p),["stop"])},b(p)+" ✖",9,ze))),128))]),w(i("div",He,[(a(!0),l(h,null,I(n.options,p=>(a(),l("label",{key:p},[p.includes("--")?(a(),l("span",Je,b(p),1)):(a(),A(Se,{key:1,option:p,checked:E(p),onClick:N=>$(p)},null,8,["option","checked","onClick"]))]))),128))],512),[[ue,f.value]])],544))])]))}},H=y(Ge,[["__scopeId","data-v-1dceb0c4"]]),Ke={class:"input"},Qe={key:0},We={class:"select-group"},Xe=["onUpdate:modelValue","onChange"],Ye={value:"",disabled:"",selected:""},Ze=["value","disabled"],et=["onUpdate:modelValue","onChange"],tt={value:"",disabled:"",selected:""},ot=["value"],st=["onClick"],at={__name:"selectMulti",props:{modelValue:Array,select0:Array,select1:Array,properties:Array,widths:Array},emits:["update:modelValue"],setup(n,{emit:t}){const d=n,e=t,o=B({get:()=>d.modelValue,set:v=>e("update:modelValue",v)}),f=(v,$,V)=>{const c=[...o.value];c[v]={...c[v],[$]:V},o.value=c},D=()=>{const v=Object.fromEntries(d.properties.map($=>[$,""]));o.value=[...o.value,v]},_=v=>o.value=o.value.filter(($,V)=>V!==v),E=v=>d.properties[0]==="classe"||d.properties[0]==="distinção"?o.value.some($=>$[d.properties[0]]===v)||v.includes("--"):!1;return(v,$)=>(a(),l("div",Ke,[v.$slots.title?(a(),l("p",Qe,[C(v.$slots,"title",{},void 0,!0)])):x("",!0),i("div",We,[(a(!0),l(h,null,I(o.value,(V,c)=>(a(),l("div",{key:c,class:"item"},[w(i("select",{style:z({width:n.widths[0]}),"onUpdate:modelValue":m=>V[n.properties[0]]=m,onChange:m=>f(c,n.properties[0],m.target.value),required:""},[i("option",Ye,[C(v.$slots,"text0",{},void 0,!0)]),(a(!0),l(h,null,I(n.select0,m=>(a(),l("option",{key:m,value:m,disabled:E(m)},b(m),9,Ze))),128))],44,Xe),[[R,V[n.properties[0]]]]),w(i("select",{style:z({width:n.widths[1]}),"onUpdate:modelValue":m=>V[n.properties[1]]=m,onChange:m=>f(c,n.properties[1],m.target.value),required:""},[i("option",tt,[C(v.$slots,"text1",{},void 0,!0)]),(a(!0),l(h,null,I(n.select1,m=>(a(),l("option",{key:m,value:m},b(m),9,ot))),128))],44,et),[[R,V[n.properties[1]]]]),i("button",{onClick:m=>_(c)},"✖",8,st)]))),128)),i("button",{onClick:D},$[0]||($[0]=[i("div",{class:"cross"},null,-1),i("p",null," Adicionar",-1)]))])]))}},U=y(at,[["__scopeId","data-v-7f26db6c"]]),nt={},lt={class:"t20box"};function it(n,t){return a(),l("div",lt,[C(n.$slots,"default")])}const rt=y(nt,[["render",it]]),dt={class:"atributos"},ut=["onUpdate:modelValue"],ct={__name:"atributes",setup(n){const t=O();return(d,e)=>(a(),A(rt,null,{default:r(()=>[i("div",dt,[(a(!0),l(h,null,I(s(Q),o=>(a(),l("div",{class:"atributo",key:`atributo-${o}`},[i("p",null,b(o.slice(0,3).toUpperCase()),1),w(i("input",{type:"number","onUpdate:modelValue":f=>s(t).charData.stats.atributos[o.toLowerCase()]=f},null,8,ut),[[K,s(t).charData.stats.atributos[o.toLowerCase()]]])]))),128))])]),_:1}))}},mt=y(ct,[["__scopeId","data-v-120c7e32"]]),pt={class:"overflow",style:{"padding-top":"1.5em"}},vt={__name:"personagem",setup(n){const t=O();return t.charData||(t.charList.length==0?t.createChar("Novo personagem"):t.loadChar(t.charList[0].id)),(d,e)=>(a(),A(J,{class:"grow"},{default:r(()=>[i("h2",null,b(s(t).charData.name?s(t).charData.name:"Personagem"),1),i("div",pt,[k(M,{placeholder:"Nome do personagem",modelValue:s(t).charData.name,"onUpdate:modelValue":[e[0]||(e[0]=o=>s(t).charData.name=o),s(t).renameChar]},{default:r(()=>e[10]||(e[10]=[u("Nome")])),_:1},8,["modelValue","onUpdate:modelValue"]),k(M,{placeholder:"Jogador",modelValue:s(t).charData.stats.jogador,"onUpdate:modelValue":e[1]||(e[1]=o=>s(t).charData.stats.jogador=o)},{default:r(()=>e[11]||(e[11]=[u("Jogador")])),_:1},8,["modelValue"]),k(mt),k(j,{options:s(W),modelValue:s(t).charData.stats.raça,"onUpdate:modelValue":e[2]||(e[2]=o=>s(t).charData.stats.raça=o)},{title:r(()=>e[12]||(e[12]=[u("Raça")])),default:r(()=>e[13]||(e[13]=[u("Escolha uma raça...")])),_:1},8,["options","modelValue"]),k(H,{options:s(X),modelValue:s(t).charData.stats.origem,"onUpdate:modelValue":e[3]||(e[3]=o=>s(t).charData.stats.origem=o)},{title:r(()=>e[14]||(e[14]=[u("Origem")])),default:r(()=>e[15]||(e[15]=[u("Escolha uma ou mais origens...")])),_:1},8,["options","modelValue"]),k(U,{select0:s(Y),select1:s(q),properties:["classe","nível"],widths:["80%","20%"],modelValue:s(t).charData.stats.classes,"onUpdate:modelValue":e[4]||(e[4]=o=>s(t).charData.stats.classes=o)},{title:r(()=>e[16]||(e[16]=[u("Classe")])),text0:r(()=>e[17]||(e[17]=[u("Adicione uma classe...")])),text1:r(()=>e[18]||(e[18]=[u("Nível")])),_:1},8,["select0","select1","modelValue"]),k(U,{select0:s(Z),select1:s(q),properties:["distinção","nível"],widths:["80%","20%"],modelValue:s(t).charData.stats.distinção,"onUpdate:modelValue":e[5]||(e[5]=o=>s(t).charData.stats.distinção=o)},{title:r(()=>e[19]||(e[19]=[u("Distinção")])),text0:r(()=>e[20]||(e[20]=[u("Adicione uma distinção...")])),text1:r(()=>e[21]||(e[21]=[u("Nível")])),_:1},8,["select0","select1","modelValue"]),k(H,{options:s(ee),modelValue:s(t).charData.stats.divindade,"onUpdate:modelValue":e[6]||(e[6]=o=>s(t).charData.stats.divindade=o)},{title:r(()=>e[22]||(e[22]=[u("Divindade")])),default:r(()=>e[23]||(e[23]=[u("Escolha uma ou mais divindades...")])),_:1},8,["options","modelValue"]),k(j,{options:s(te),modelValue:s(t).charData.stats.tamanho,"onUpdate:modelValue":e[7]||(e[7]=o=>s(t).charData.stats.tamanho=o)},{title:r(()=>e[24]||(e[24]=[u("Tamanho")])),default:r(()=>e[25]||(e[25]=[u("Escolha um tamanho...")])),_:1},8,["options","modelValue"]),k(U,{select0:s(F).tipo,select1:s(F).velocidade,properties:["tipo","velocidade"],widths:["50%","50%"],modelValue:s(t).charData.stats.deslocamento,"onUpdate:modelValue":e[8]||(e[8]=o=>s(t).charData.stats.deslocamento=o)},{title:r(()=>e[26]||(e[26]=[u("Deslocamento")])),text0:r(()=>e[27]||(e[27]=[u("Tipo")])),text1:r(()=>e[28]||(e[28]=[u("Velocidade")])),_:1},8,["select0","select1","modelValue"]),k(Ee,{min:"0",max:"210000",placeholder:"Pontos de experiência",modelValue:s(t).charData.stats.experiência,"onUpdate:modelValue":e[9]||(e[9]=o=>s(t).charData.stats.experiência=o)},{default:r(()=>e[29]||(e[29]=[u("Experiência")])),_:1},8,["modelValue"])])]),_:1}))}},_t={};function ft(n,t){return null}const kt=y(_t,[["render",ft]]),gt={__name:"Personagem",setup(n){const t=[Ce,vt,kt];return(d,e)=>(a(),A(oe,{components:t,purpose:""}))}};export{gt as default};
