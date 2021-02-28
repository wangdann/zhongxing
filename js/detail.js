let reg = /id=(\d+)/;
if (!reg.test(location.search)) {
    location.href = '../html/list.html'
}
let id = reg.exec(location.search)[1];
let main = document.querySelector('.main');
// 根据id获取数据
pAjax({
    url: '../api/getdetail.php',
    data: {
        id
    }
}).then(res => {
    res = JSON.parse(res);
    renderHtml(res.detail);
    class Enlarge {
        constructor(str) {
            this.str = str;
            this.init();
        }
        init() {
            this.box = document.querySelector(this.str);
            this.left = this.box.querySelector('.left');
            this.img = this.left.querySelector('img');
            this.mask = this.left.querySelector('.mask');
            this.enlarge = this.box.querySelector('.enlarge');
            this.left.onmouseover = () => {
                this.mask.style.display = this.enlarge.style.display = 'block';
                this.setStyle();
            }

            this.left.onmouseout = () => {
                this.mask.style.display = this.enlarge.style.display = 'none';
            }

            this.left.onmousemove = (e) => {
                this.move(e);
            }
        }
        setStyle() {
            let style = getStyle(this.enlarge, 'backgroundSize');
            this.bgX = parseInt(style.split(' ')[0])
            this.bgY = parseInt(style.split(' ')[1]);

            let maskW = this.mask.offsetWidth;
            let maskH = this.mask.offsetHeight;

            this.leftW = this.left.offsetWidth;
            this.leftH = this.left.offsetHeight;

            let enlargeW = this.bgX * maskW / this.leftW;
            let enlargeH = this.bgY * maskH / this.leftH;

            this.enlarge.style.width = enlargeW + 'px';
            this.enlarge.style.height = enlargeH + 'px';
        }
        move(e) {

            let left = e.clientX - this.box.offsetLeft - this.mask.offsetWidth / 2;
            let top = e.pageY - this.box.offsetTop - this.mask.offsetHeight / 2;

            if (left <= 0) {
                left = 0;
            }
            if (top <= 0) {
                top = 0;
            }

            if (left >= this.left.offsetWidth - this.mask.offsetWidth) {
                left = this.left.offsetWidth - this.mask.offsetWidth
            }

            if (top >= this.left.offsetHeight - this.mask.offsetHeight) {
                top = this.left.offsetHeight - this.mask.offsetHeight;
            }

            this.mask.style.left = left + 'px';
            this.mask.style.top = top + 'px';
            let x = left * this.bgX / this.leftW;
            let y = top * this.bgY / this.leftH;

            this.enlarge.style.backgroundPosition = `${-x}px  ${-y}px`;
        }
    }
    new Enlarge('.box');
    let input = document.querySelector(".input");
    let reduct = document.querySelector(".reduct");
    let add = document.querySelector(".add");


    add.onclick = function () {
        input.value = input.value * 1 + 1;
        if (input.value > 5) {
            input.value = 5;
            alert('商品数量最大为5')
            return
        }
    }
    reduct.onclick = function () {
        input.value = input.value * 1 - 1;
        input.value = 1;
        if (input.value <= 1) {
            alert('商品数量最小为1')
            return
        }
    }
   


    main.onclick = function () {
        let e = window.event;
        if (e.target.id == 'goCar') {
            location.href = '../html/car.html'
        }
        if (e.target.id == 'addCar') {

            let login = getCookie('denlu');

            if (!login) {
                alert('没有登录请到登录页面进行登录');
                localStorage.setItem('url', location.href);
                location.href = '../html/denlu.html';
                return
            }

            console.log(login);
            console.log(input.value);

            pAjax({
                url: '../api/addcar.php',
                type: 'post',
                data: {
                    'id': id,
                    'username': login,
                    'num': input.value
                }

            }).then(function (res) {
                console.log(res);

            })
          
        }
    }
})

function renderHtml(data) {
    main.innerHTML = `
<h3>${data.name}</h3>
<div class="media">
<div class="box">
    <div class="left">
        <img src="${data.logo}"
            alt="">
         <div class="mask"></div>
    </div>
    <div class="enlarge" style="background-image: url(${data.logo})"></div>
</div>
    <div class="media-right">
        <h1>${data.name}</h1>
        <p>${data.introduce}</p>
        <div class="price">
            <div class="qrcode">
                <span>手机购买</span><br>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABI0lEQVQ4jc3TsW6DMBAG4EMevFTNymCJV0g2T/hVIvECqbqiQMUD8AI8jDvxGid56Eo2R7K4mqiiqoAeY277Buv8+84Az1SGfO+dEkR2oSNokwrR1Amn06ilDFC0tx0CmZHbJZ26rFlT7C49QjHfZVNTotSp4jfflmL15OA8P82m8lwbIPeT/a8MWe8DdeUVGCV36lFhNVw4TUc9OhQflpPxGpUqhmSpo7FAWahaYgXay+Ca4Y3TiXoDDkRglYwGJAgUNSz0moNPlcOXK6fk7g2F+NiPtP/q02qZZV01ACNIvE8dVjSuKM79i9T5UHOKu6SR4u6yeuwnxUTAKe68TafP2NpVIanyctghEyfWlRWn2J0QQb3fOMVEVgaBc/ZNPU99A6SdqbKN00sIAAAAAElFTkSuQmCC"
                    alt="">
            </div>
            <span class="action">${data.price}</span>
            <div class="sh">
                <div class="dt">
                    优惠信息：
                </div>
                <div class="dd">
                    <span>赠品</span>
                    （购满1件即赠，赠完为止）
                </div>
            </div>
        </div>
        <div class="choose">
            <div class="spec">
                <span>颜色</span>
                <div class="item">
                    <img src="${data.logo}"
                        alt="">
                </div>
            </div>
            <div class="md">
                <span>数量</span>
                <div class="item">
                    <a class="reduct">-</a>
                    <input type="text" value="1" class="input">
                    <a class="add">+</a>
                </div>
            </div>
            <div>
            <button class="btn btn-warning btn-lg" id="goCar">立即购买</button>
            <button class="btn btn-danger btn-lg" id="addCar">加入购物车</button>
            </div>
        </div>
    </div>
</div> 
<div class="panel">
       <ul>
           <li>产品介绍</li>
           <li>规格参数</li>
           <li>商品咨询</li>
           <li>用户评价</li>
       </ul>
         <img src="${data.big_logo}" alt="">
</div>
`
}



// main.onclick = function () {
//     let e = window.event;
//     if (e.target.id == 'goCar') {
//         location.href = '../html/car.html'
//     }
//     if (e.target.id == 'addCar') {

//         let login = getCookie('denlu');

//         if (!login) {
//             alert('没有登录请到登录页面进行登录');
//             localStorage.setItem('url', location.href);
//             location.href = '../html/denlu.html';
//             return
//         }

//         console.log(login);


//         pAjax({
//             url: '../api/addcar.php',
//             type: 'post',
//             data: {
//                 'id': id,
//                 'username': login,
//                 'num': input.value input.value = 5;
//             }
//         }).then(function (res) {
//             console.log(res);

//         })
//     }
// }
let ul = document.querySelector(".cate ul");
let cate = document.querySelector(".cate");
cate.onmouseover = function () {
    ul.style.display = "block";
}
cate.onmouseout = function () {
    ul.style.display = "none";
}