(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0e9d54"],{"8ee6":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{staticClass:"q-pa-sm"},[s("q-form",{staticClass:"q-py-lg",on:{submit:e.onSubmit}},[s("div",{staticClass:"row justify-center q-mt-lg"},[s("div",{staticClass:"col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4"},[s("q-toolbar",{staticClass:"bg-primary text-white shadow-2"},[s("q-toolbar-title",[e._v("Add User")])],1),s("div",{staticClass:"row items-start content-start q-col-gutter-x-sm q-col-gutter-y-sm q-pt-lg"},[s("div",{staticClass:"col-xs-12 col-sm-12 col-md-6"},[s("q-input",{attrs:{outlined:"",label:"First Name",type:"text",filled:"","no-error-icon":"",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.firstName,callback:function(t){e.firstName=t},expression:"firstName"}})],1),s("div",{staticClass:"col-xs-12 col-sm-12 col-md-6"},[s("q-input",{attrs:{outlined:"",label:"Last Name",type:"text",filled:"","no-error-icon":"",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.lastName,callback:function(t){e.lastName=t},expression:"lastName"}})],1),s("div",{staticClass:"col-xs-12 col-sm-12 col-md-6"},[s("q-input",{attrs:{outlined:"",label:"Username",type:"text",filled:"","no-error-icon":"",rules:[function(e){return e.length>4||"Username must be at least 5 characters."}]},on:{keyup:e.resetUsernameStatus},scopedSlots:e._u([!0===e.usernameUnique?{key:"prepend",fn:function(){return[s("q-icon",{attrs:{color:"green",name:"check"}})]},proxy:!0}:!0===e.usernameError?{key:"prepend",fn:function(){return[s("q-icon",{attrs:{color:"red",name:"close"}})]},proxy:!0}:null],null,!0),model:{value:e.username,callback:function(t){e.username=t},expression:"username"}})],1),s("div",{staticClass:"col-12 col-md-6 q-pb-lg"},[s("q-btn",{staticStyle:{padding:"10px"},attrs:{disable:e.username.length<5,label:"Check Username Availability",color:"primary"},on:{click:e.checkUsername}})],1),s("div",{staticClass:"col-12 col-md-6"},[s("q-input",{attrs:{outlined:"",label:"Email",type:"text",filled:"","no-error-icon":"",rules:[function(t){return t.match(e.emailRegEx)||"Not a Valid Email"}]},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),s("div",{staticClass:"col-12 col-md-6"},[s("q-input",{attrs:{outlined:"",label:"Password",type:"password",filled:"","no-error-icon":"",rules:[function(t){return t.length>0||t.match(e.passwordRegEx)||"At least: Length 8, 2 Capitals, 1 ! @ # $ &, 3 Lowercase"}]},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),s("div",{staticClass:"col-12"},[s("q-toggle",{attrs:{label:"Admin",color:"green"},model:{value:e.admin,callback:function(t){e.admin=t},expression:"admin"}})],1),e.usernameUnique?e._e():s("div",{staticClass:"col-12 q-mt-lg text-red"},[e._v("\n            Check username availability before this new user can be added.\n          ")]),s("div",{staticClass:"col-12"},[s("q-btn",{staticClass:"q-mt-lg",attrs:{disable:!e.usernameUnique,type:"submit",color:"primary",label:"Add"}})],1)])],1)])])],1)},a=[],n=(s("8e6e"),s("8a81"),s("ac6a"),s("cadf"),s("06db"),s("456d"),s("c47a")),i=s.n(n),l=s("2f62");function o(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,r)}return s}function c(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?o(Object(s),!0).forEach((function(t){i()(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):o(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var u={name:"AddUserPage",data:function(){return{firstName:"",lastName:"",email:"",username:"",password:"",admin:!1,emailRegEx:"",passwordRegEx:"",usernameUnique:!1,usernameError:!1}},computed:c({},Object(l["b"])({users:"users/getUsers",usersLoaded:"users/usersLoaded",usersById:"users/usersById"})),methods:{onSubmit:function(){var e=this,t={firstName:this.firstName,lastName:this.lastName,username:this.username,email:this.email,password:this.password};this.admin?t["admin"]="Y":t["admin"]="N",this.$store.dispatch("users/addUser",t).then((function(t){e.$store.commit("users/clearUsers"),e.$router.push("/users/")}))},checkUsername:function(){var e=this;this.$store.dispatch("users/checkUsername",{username:this.username}).then((function(t){t.data.hasOwnProperty("usernameUnique")&&(!0===t.data.usernameUnique?(console.log("got here"),e.usernameUnique=!0,e.usernameError=!1):(e.usernameUnique=!1,e.usernameError=!0))}))},resetUsernameStatus:function(){this.username.length<5&&(this.usernameUnique=!1,this.usernameError=!1),1==this.usernameUnique&&(this.usernameUnique=!1,this.usernameError=!1),!0===this.usernameError&&(this.usernameError=!1)}},created:function(){var e=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;this.emailRegEx=e;var t=/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;this.passwordRegEx=t}},m=u,d=s("2877"),p=s("eebe"),f=s.n(p),b=s("9989"),h=s("0378"),g=s("65c6"),q=s("6ac5"),y=s("27f9"),v=s("0016"),w=s("9c40"),x=s("9564"),U=Object(d["a"])(m,r,a,!1,null,null,null);t["default"]=U.exports;f()(U,"components",{QPage:b["a"],QForm:h["a"],QToolbar:g["a"],QToolbarTitle:q["a"],QInput:y["a"],QIcon:v["a"],QBtn:w["a"],QToggle:x["a"]})}}]);