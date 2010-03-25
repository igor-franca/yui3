YUI.add("loader-base",function(A){(function(){var O=A.version,N=A.config,I="/build/",J=O+I,H=A.Env.base,D=N.gallery||"gallery-2010.03.24-20-12",L=D+I,G="2in3",E=N[G]||"1",C=N.yui2||"2.8.0",F=G+"."+E+"/"+C+I,K=H+"combo?",M={version:O,root:J,base:A.Env,comboBase:K,skin:{defaultSkin:"sam",base:"assets/skins/",path:"skin.css",after:["cssreset","cssfonts","cssreset-context","cssfonts-context"]},groups:{},modules:{},patterns:{}},B=M.groups;B[O]={};B.gallery={base:H+L,ext:false,combine:true,root:L,comboBase:K,patterns:{"gallery-":{}}};B.yui2={base:H+F,combine:true,ext:false,root:F,comboBase:K,patterns:{"yui2-":{configFn:function(P){if(/-skin|reset|fonts|grids|base/.test(P.name)){P.type="css";P.path=P.path.replace(/\.js/,".css");P.path=P.path.replace(/\/yui2-skin/,"/assets/skins/sam/yui2-skin");}}}}};YUI.Env[O]=M;}());(function(){var P={},D=[],E=(A.UA.ie)?2048:8192,C=YUI.Env,F=C._loaded,B="css",H="js",Q=A.version,G="",K=A.Object,N=A.Array,J=YUI.Env._loaderQueue,O=C[Q],I=A.Lang,M=A.cached(function(R,S,T,L){var U=R+"/"+S;if(!L){U+="-min";}U+="."+(T||B);return U;});A.Env.meta=O;A.Loader=function(U){var T=A.Env.meta.modules,R,S=C.mods,L=this;L.context=A;L.base=A.Env.meta.base;L.comboBase=A.Env.meta.comboBase;L.combine=U.base&&(U.base.indexOf(L.comboBase.substr(0,20))>-1);L.maxURLLength=E;L.root=A.Env.meta.root;L.timeout=0;L.forceMap={};L.allowRollup=true;L.filters={};L.required={};L.patterns={};L.moduleInfo={};L.groups=A.merge(A.Env.meta.groups);L.skin=A.merge(A.Env.meta.skin);L.config=U;L._config(U);L._internal=true;for(R in T){if(T.hasOwnProperty(R)){L.addModule(T[R],R);}}for(R in S){if(!L.moduleInfo[R]&&S[R].details){L.addModule(S[R].details,R);}}L._internal=false;L.sorted=[];L.loaded=F[Q];L.dirty=true;L.inserted={};L.skipped={};};A.Loader.prototype={FILTER_DEFS:{RAW:{"searchExp":"-min\\.js","replaceStr":".js"},DEBUG:{"searchExp":"-min\\.js","replaceStr":"-debug.js"}},SKIN_PREFIX:"skin-",_config:function(W){var S,R,V,T,U,X,L=this;if(W){for(S in W){if(W.hasOwnProperty(S)){V=W[S];if(S=="require"){L.require(V);}else{if(S=="skin"){A.mix(L.skin,W[S],true);}else{if(S=="groups"){for(R in V){if(V.hasOwnProperty(R)){X=R;U=V[R];L.addGroup(U,X);}}}else{if(S=="modules"){K.each(V,L.addModule,L);}else{if(S=="maxURLLength"){L[S]=Math.min(E,V);}else{L[S]=V;}}}}}}}}T=L.filter;if(I.isString(T)){T=T.toUpperCase();L.filterName=T;L.filter=L.FILTER_DEFS[T];if(T=="DEBUG"){L.require("yui-log","dump");}}},formatSkin:function(S,L){var R=this.SKIN_PREFIX+S;if(L){R=R+"-"+L;}return R;},_addSkin:function(Y,W,X){var V,U,L=this.formatSkin(Y),T=this.moduleInfo,R=this.skin,S=T[W]&&T[W].ext;if(W){L=this.formatSkin(Y,W);if(!T[L]){V=T[W];U=V.pkg||W;this.addModule({name:L,group:V.group,type:"css",after:R.after,path:(X||U)+"/"+R.base+Y+"/"+W+".css",ext:S});}}return L;},addGroup:function(T,R){var S=T.modules,L=this;R=R||T.name;T.name=R;L.groups[R]=T;if(T.patterns){K.each(T.patterns,function(V,U){V.group=R;L.patterns[U]=V;});}if(S){K.each(S,function(V,U){V.group=R;L.addModule(V,U);},L);}},addModule:function(c,m){m=m||c.name;c.name=m;if(!c||!c.name){return false;}if(!c.type){c.type=H;}if(!c.path&&!c.fullpath){c.path=M(m,m,c.type);}c.ext=("ext" in c)?c.ext:(this._internal)?false:true;c.requires=c.requires||[];this.moduleInfo[m]=c;var g=c.submodules,f,d,L,Z,S,b,R,e,a,X,W,U,T,k,h,Y,V;if(g){L=c.supersedes||[];d=0;for(f in g){if(g.hasOwnProperty(f)){Z=g[f];Z.path=Z.path||M(m,f,c.type);Z.pkg=m;Z.group=c.group;if(Z.supersedes){L=L.concat(Z.supersedes);}S=this.addModule(Z,f);L.push(f);if(S.skinnable){c.skinnable=true;Y=this.skin.overrides;if(Y&&Y[f]){for(e=0;e<Y[f].length;e++){V=this._addSkin(Y[f][e],f,m);L.push(V);}}V=this._addSkin(this.skin.defaultSkin,f,m);L.push(V);}if(Z.lang&&Z.lang.length){a=N(Z.lang);for(e=0;e<a.length;e++){k=a[e];X=this.getLangPackName(k,m);W=this.getLangPackName(k,f);S=this.moduleInfo[X];if(!S){S=this._addLangPack(k,c,X);}U=U||N.hash(S.supersedes);if(!(W in U)){S.supersedes.push(W);}c.lang=c.lang||[];T=T||N.hash(c.lang);if(!(k in T)){c.lang.push(k);}}}d++;}}c.supersedes=K.keys(N.hash(L));c.rollup=(d<4)?d:Math.min(d-1,4);}b=c.plugins;if(b){for(f in b){if(b.hasOwnProperty(f)){R=b[f];R.path=R.path||M(m,f,c.type);R.requires=R.requires||[];R.group=c.group;this.addModule(R,f);if(c.skinnable){this._addSkin(this.skin.defaultSkin,f,m);}}}}this.dirty=true;if(c.configFn){h=c.configFn(c);if(h===false){delete this.moduleInfo[m];c=null;}}return c;},require:function(R){var L=(typeof R==="string")?arguments:R;this.dirty=true;A.mix(this.required,N.hash(L));},getRequires:function(a){if(!a||a._parsed){return D;}if(!this.dirty&&a.expanded&&(!a.langCache||a.langCache==this.lang)){return a.expanded;}a._parsed=true;var X,V,W,b,R,T,Z=[],L=a.requires,S=a.optional,Y=a.lang||a.intl,U=this.moduleInfo;for(X=0;X<L.length;X++){Z.push(L[X]);V=this.getModule(L[X]);b=this.getRequires(V);Y=Y||N.indexOf(b,"intl")>-1;for(W=0;W<b.length;W++){Z.push(b[W]);}}L=a.supersedes;if(L){for(X=0;X<L.length;X++){Z.push(L[X]);V=this.getModule(L[X]);b=this.getRequires(V);Y=Y||N.indexOf(b,"intl")>-1;for(W=0;W<b.length;W++){Z.push(b[W]);}}}if(S&&this.loadOptional){for(X=0;X<S.length;X++){Z.push(S[X]);b=this.getRequires(U[S[X]]);Y=Y||N.indexOf(b,"intl")>-1;for(W=0;W<b.length;W++){Z.push(b[W]);}}}a._parsed=false;if(Y){if(a.lang&&!a.langPack&&A.Intl){T=A.Intl.lookupBestLang(this.lang||G,a.lang);a.langCache=this.lang;R=this.getLangPackName(T,a.name);if(R){Z.unshift(R);}}Z.unshift("intl");}a.expanded=K.keys(N.hash(Z));return a.expanded;},getProvides:function(R){var L=this.getModule(R),T,S;if(!L){return P;}if(L&&!L.provides){T={};S=L.supersedes;if(S){N.each(S,function(U){A.mix(T,this.getProvides(U));},this);}T[R]=true;L.provides=T;}return L.provides;},calculate:function(R,L){if(R||L||this.dirty){this._config(R);this._setup();this._explode();if(this.allowRollup){this._rollup();}this._reduce();this._sort();}},_addLangPack:function(U,L,T){var S=L.name,R=M((L.pkg||S),T,H,true);this.addModule({path:R,intl:true,langPack:true,ext:L.ext,group:L.group,supersedes:[]},T,true);if(U){A.Env.lang=A.Env.lang||{};
A.Env.lang[U]=A.Env.lang[U]||{};A.Env.lang[U][S]=true;}return this.moduleInfo[T];},_setup:function(){var U=this.moduleInfo,R,Z,Y,V,T,W,a,X,S,L;for(R in U){if(U.hasOwnProperty(R)){V=U[R];if(V&&V.skinnable){T=this.skin.overrides;if(T&&T[R]){for(Z=0;Z<T[R].length;Z=Z+1){a=this._addSkin(T[R][Z],R);if(N.indexOf(V.requires,a)==-1){V.requires.push(a);}}}else{a=this._addSkin(this.skin.defaultSkin,R);if(N.indexOf(V.requires,a)==-1){V.requires.push(a);}}}if(V&&V.lang&&V.lang.length){X=N(V.lang);for(Z=0;Z<X.length;Z=Z+1){S=X[Z];L=this.getLangPackName(S,R);this._addLangPack(S,V,L);}L=this.getLangPackName(G,R);this._addLangPack(null,V,L);}}}W=A.merge(this.inserted);if(!this.ignoreRegistered){A.mix(W,C.mods);}if(this.ignore){A.mix(W,N.hash(this.ignore));}for(Y in W){if(W.hasOwnProperty(Y)){A.mix(W,this.getProvides(Y));}}if(this.force){for(Z=0;Z<this.force.length;Z=Z+1){if(this.force[Z] in W){delete W[this.force[Z]];}}}A.mix(this.loaded,W);},getLangPackName:A.cached(function(R,L){return("lang/"+L+((R)?"_"+R:""));}),_explode:function(){var S=this.required,L,R;this.dirty=false;K.each(S,function(T,U){L=this.getModule(U);if(L){var V=L.expound;if(V){S[V]=this.getModule(V);R=this.getRequires(S[V]);A.mix(S,N.hash(R));}R=this.getRequires(L);A.mix(S,N.hash(R));}},this);},getModule:function(W){if(!W){return null;}var V,T,U,R,L=this.moduleInfo[W],S=this.patterns;if(!L){for(R in S){if(S.hasOwnProperty(R)){V=S[R];T=V.type;if(W.indexOf(R)>-1){U=V;break;}}}if(U){if(V.action){V.action.call(this,W,R);}else{L=this.addModule(A.merge(U),W);}}}return L;},_rollup:function(){},_reduce:function(){var S,R,U,L,V=this.required,T=this.loadType;for(S in V){if(V.hasOwnProperty(S)){L=this.getModule(S);if((this.loaded[S]&&(!this.forceMap[S])&&!this.ignoreRegistered)||(T&&L&&L.type!=T)){delete V[S];}else{U=L&&L.supersedes;if(U){for(R=0;R<U.length;R=R+1){if(U[R] in V){delete V[U[R]];}}}}}}},_finish:function(S,R){J.running=false;var L=this.onEnd;if(L){L.call(this.context,{msg:S,data:this.data,success:R});}this._continue();},_onSuccess:function(){var L=A.merge(this.skipped),R;K.each(L,function(S){delete this.inserted[S];},this);this.skipped={};R=this.onSuccess;if(R){R.call(this.context,{msg:"success",data:this.data,success:true,skipped:L});}this._finish("success",true);},_onFailure:function(S){var L=this.onFailure,R="failure: "+S.msg;if(L){L.call(this.context,{msg:R,data:this.data,success:false});}this._finish(R,false);},_onTimeout:function(){var L=this.onTimeout;if(L){L.call(this.context,{msg:"timeout",data:this.data,success:false});}this._finish("timeout",false);},_sort:function(){var e=K.keys(this.required),S=this.moduleInfo,X=this.loaded,W={},L=0,T,c,Z,V,U,Y,R,d=A.cached(function(k,h){var b=S[k],f,j,l,a=S[h],g;if(X[h]||!b||!a){return false;}j=b.expanded;l=b.after;if(j&&N.indexOf(j,h)>-1){return true;}if(l&&N.indexOf(l,h)>-1){return true;}g=S[h]&&S[h].supersedes;if(g){for(f=0;f<g.length;f=f+1){if(d(k,g[f])){return true;}}}if(b.ext&&b.type==B&&!a.ext&&a.type==B){return true;}return false;});for(;;){T=e.length;Y=false;for(V=L;V<T;V=V+1){c=e[V];for(U=V+1;U<T;U=U+1){R=c+e[U];if(!W[R]&&d(c,e[U])){Z=e.splice(U,1);e.splice(V,0,Z[0]);W[R]=true;Y=true;break;}}if(Y){break;}else{L=L+1;}}if(!Y){break;}}this.sorted=e;},_insert:function(S,T,R){if(S){this._config(S);}this.calculate(T);this.loadType=R;if(!R){var L=this;this._internalCallback=function(){var V=L.onCSS,X,W,U;if(this.insertBefore&&A.UA.ie){X=A.config.doc.getElementById(this.insertBefore);W=X.parentNode;U=X.nextSibling;W.removeChild(X);if(U){W.insertBefore(X,U);}else{W.appendChild(X);}}if(V){V.call(L.context,A);}L._internalCallback=null;L._insert(null,null,H);};this._insert(null,null,B);return;}this._loading=true;this._combineComplete={};this.loadNext();},_continue:function(){if(!(J.running)&&J.size()>0){J.running=true;J.next()();}},insert:function(S,R){var L=this,T=A.merge(this,true);delete T.require;delete T.dirty;J.add(function(){L._insert(T,S,R);});this._continue();},loadNext:function(U){if(!this._loading){return;}var b,l,k,g,T,Y,V,f,X,a,h,L,W,e,S,Z,n,o,R=this.loadType,d=this,p=function(i){d.loadNext(i.data);},c=function(q){d._combineComplete[R]=true;var m,j=Z.length;for(m=0;m<j;m++){d.loaded[Z[m]]=true;d.inserted[Z[m]]=true;}p(q);};if(this.combine&&(!this._combineComplete[R])){Z=[];this._combining=Z;b=this.sorted;l=b.length;o=this.comboBase;T=o;n=[];e={};for(k=0;k<l;k++){W=o;g=this.getModule(b[k]);a=g&&g.group;if(a){X=this.groups[a];if(!X.combine){g.combine=false;continue;}g.combine=true;if(X.comboBase){W=X.comboBase;}if(X.root){g.root=X.root;}}e[W]=e[W]||[];e[W].push(g);}for(h in e){if(e.hasOwnProperty(h)){T=h;S=e[h];l=S.length;for(k=0;k<l;k++){g=S[k];if(g&&(g.type===R)&&(g.combine||!g.ext)){L=(g.root||this.root)+g.path;if((T!==h)&&(k<(l-1))&&((L.length+T.length)>this.maxURLLength)){n.push(this._filter(T));T=h;}T+=L;if(k<(l-1)){T+="&";}Z.push(g.name);}}if(Z.length&&(T!=h)){n.push(this._filter(T));}}}if(Z.length){if(R===B){Y=A.Get.css;f=this.cssAttributes;}else{Y=A.Get.script;f=this.jsAttributes;}Y(n,{data:this._loading,onSuccess:c,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,attributes:f,timeout:this.timeout,autopurge:false,context:this});return;}else{this._combineComplete[R]=true;}}if(U){if(U!==this._loading){return;}this.inserted[U]=true;this.loaded[U]=true;if(this.onProgress){this.onProgress.call(this.context,{name:U,data:this.data});}}b=this.sorted;l=b.length;for(k=0;k<l;k=k+1){if(b[k] in this.inserted){continue;}if(b[k]===this._loading){return;}g=this.getModule(b[k]);if(!g){V="Undefined module "+b[k]+" skipped";this.inserted[b[k]]=true;this.skipped[b[k]]=true;continue;}X=(g.group&&this.groups[g.group])||P;if(!R||R===g.type){this._loading=b[k];if(g.type===B){Y=A.Get.css;f=this.cssAttributes;}else{Y=A.Get.script;f=this.jsAttributes;}T=(g.fullpath)?this._filter(g.fullpath,b[k]):this._url(g.path,b[k],X.base||g.base);Y(T,{data:b[k],onSuccess:p,insertBefore:this.insertBefore,charset:this.charset,attributes:f,onFailure:this._onFailure,onTimeout:this._onTimeout,timeout:this.timeout,autopurge:false,context:d});
return;}}this._loading=null;Y=this._internalCallback;if(Y){this._internalCallback=null;Y.call(this);}else{this._onSuccess();}},_filter:function(S,R){var U=this.filter,L=R&&(R in this.filters),T=L&&this.filters[R];if(S){if(L){U=(I.isString(T))?this.FILTER_DEFS[T.toUpperCase()]||null:T;}if(U){S=S.replace(new RegExp(U.searchExp,"g"),U.replaceStr);}}return S;},_url:function(S,L,R){return this._filter((R||this.base||"")+S,L);}};})();},"@VERSION@",{requires:["get"]});