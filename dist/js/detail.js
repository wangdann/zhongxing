"use strict";var _createClass=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var reg=/id=(\d+)/;reg.test(location.search)||(location.href="../html/list.html");var id=reg.exec(location.search)[1],main=document.querySelector(".main");function renderHtml(t){main.innerHTML="\n<h3>"+t.name+'</h3>\n<div class="media">\n<div class="box">\n    <div class="left">\n        <img src="'+t.logo+'"\n            alt="">\n         <div class="mask"></div>\n    </div>\n    <div class="enlarge" style="background-image: url('+t.logo+')"></div>\n</div>\n    <div class="media-right">\n        <h1>'+t.name+"</h1>\n        <p>"+t.introduce+'</p>\n        <div class="price">\n            <div class="qrcode">\n                <span>手机购买</span><br>\n                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABI0lEQVQ4jc3TsW6DMBAG4EMevFTNymCJV0g2T/hVIvECqbqiQMUD8AI8jDvxGid56Eo2R7K4mqiiqoAeY277Buv8+84Az1SGfO+dEkR2oSNokwrR1Amn06ilDFC0tx0CmZHbJZ26rFlT7C49QjHfZVNTotSp4jfflmL15OA8P82m8lwbIPeT/a8MWe8DdeUVGCV36lFhNVw4TUc9OhQflpPxGpUqhmSpo7FAWahaYgXay+Ca4Y3TiXoDDkRglYwGJAgUNSz0moNPlcOXK6fk7g2F+NiPtP/q02qZZV01ACNIvE8dVjSuKM79i9T5UHOKu6SR4u6yeuwnxUTAKe68TafP2NpVIanyctghEyfWlRWn2J0QQb3fOMVEVgaBc/ZNPU99A6SdqbKN00sIAAAAAElFTkSuQmCC"\n                    alt="">\n            </div>\n            <span class="action">'+t.price+'</span>\n            <div class="sh">\n                <div class="dt">\n                    优惠信息：\n                </div>\n                <div class="dd">\n                    <span>赠品</span>\n                    （购满1件即赠，赠完为止）\n                </div>\n            </div>\n        </div>\n        <div class="choose">\n            <div class="spec">\n                <span>颜色</span>\n                <div class="item">\n                    <img src="'+t.logo+'"\n                        alt="">\n                </div>\n            </div>\n            <div class="md">\n                <span>数量</span>\n                <div class="item">\n                    <a class="reduct">-</a>\n                    <input type="text" value="1" class="input">\n                    <a class="add">+</a>\n                </div>\n            </div>\n            <div>\n            <button class="btn btn-warning btn-lg" id="goCar">立即购买</button>\n            <button class="btn btn-danger btn-lg" id="addCar">加入购物车</button>\n            </div>\n        </div>\n    </div>\n</div> \n<div class="panel">\n       <ul>\n           <li>产品介绍</li>\n           <li>规格参数</li>\n           <li>商品咨询</li>\n           <li>用户评价</li>\n       </ul>\n         <img src="'+t.big_logo+'" alt="">\n</div>\n'}pAjax({url:"../api/getdetail.php",data:{id:id}}).then(function(t){function e(t){_classCallCheck(this,e),this.str=t,this.init()}renderHtml((t=JSON.parse(t)).detail),new(_createClass(e,[{key:"init",value:function(){var e=this;this.box=document.querySelector(this.str),this.left=this.box.querySelector(".left"),this.img=this.left.querySelector("img"),this.mask=this.left.querySelector(".mask"),this.enlarge=this.box.querySelector(".enlarge"),this.left.onmouseover=function(){e.mask.style.display=e.enlarge.style.display="block",e.setStyle()},this.left.onmouseout=function(){e.mask.style.display=e.enlarge.style.display="none"},this.left.onmousemove=function(t){e.move(t)}}},{key:"setStyle",value:function(){var t=getStyle(this.enlarge,"backgroundSize");this.bgX=parseInt(t.split(" ")[0]),this.bgY=parseInt(t.split(" ")[1]);var e=this.mask.offsetWidth,t=this.mask.offsetHeight;this.leftW=this.left.offsetWidth,this.leftH=this.left.offsetHeight;e=this.bgX*e/this.leftW,t=this.bgY*t/this.leftH;this.enlarge.style.width=e+"px",this.enlarge.style.height=t+"px"}},{key:"move",value:function(t){var e=t.clientX-this.box.offsetLeft-this.mask.offsetWidth/2,t=t.pageY-this.box.offsetTop-this.mask.offsetHeight/2;t<=0&&(t=0),(e=e<=0?0:e)>=this.left.offsetWidth-this.mask.offsetWidth&&(e=this.left.offsetWidth-this.mask.offsetWidth),t>=this.left.offsetHeight-this.mask.offsetHeight&&(t=this.left.offsetHeight-this.mask.offsetHeight),this.mask.style.left=e+"px",this.mask.style.top=t+"px";e=e*this.bgX/this.leftW,t=t*this.bgY/this.leftH;this.enlarge.style.backgroundPosition=-e+"px  "+-t+"px"}}]),e)(".box");var i=document.querySelector(".input"),t=document.querySelector(".reduct");document.querySelector(".add").onclick=function(){i.value=+i.value+1,5<i.value&&(i.value=5,alert("商品数量最大为5"))},t.onclick=function(){i.value=+i.value-1,i.value=1,i.value<=1&&alert("商品数量最小为1")},main.onclick=function(){var t=window.event;if("goCar"==t.target.id&&(location.href="../html/car.html"),"addCar"==t.target.id){t=getCookie("denlu");if(!t)return alert("没有登录请到登录页面进行登录"),localStorage.setItem("url",location.href),void(location.href="../html/denlu.html");console.log(t),console.log(i.value),pAjax({url:"../api/addcar.php",type:"post",data:{id:id,username:t,num:i.value}}).then(function(t){console.log(t)})}}});var ul=document.querySelector(".cate ul"),cate=document.querySelector(".cate");cate.onmouseover=function(){ul.style.display="block"},cate.onmouseout=function(){ul.style.display="none"};