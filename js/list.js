let list = document.querySelector(".list");
let page = document.querySelector('.page');
let ul = document.querySelector(".cate ul");
let cate = document.querySelector(".cate");
cate.onmouseover = function () {
    ul.style.display = "block";
}
cate.onmouseout = function () {
    ul.style.display = "none";
}
let defaultInfo = {
    len: 12,
    num: 1
}
pAjax({
    url: '../api/getdata.php',
    data: {
        start: defaultInfo.num,
        len: defaultInfo.len
    }
}).then((res) => {
    res = JSON.parse(res);
    new Pagination(page, {
        pageInfo: {
            pagenum: 1,
            pagesize: defaultInfo.len,
            total: res.total,
            totalpage: Math.ceil(res.total / defaultInfo.len)
        },
        textInfo: {
            first: '首页',
            prev: '上一页',
            list: '',
            next: '下一页',
            last: '最后一页'
        },
        change: function (num) {
            defaultInfo.num = num;
            getData();
            scrollTo(0, 0)
        }
    });
})

async function getData() {
    let res = await pAjax({
        url: '../api/getdata.php',
        data: {
            start: defaultInfo.num,
            len: defaultInfo.len
        }
    });
    res = JSON.parse(res)
    renderHtml(res.list);
    console.log(res.list);

}

function renderHtml(data) {
    let str = '';
    data.forEach((item, index) => {
        str += `<li>
        <a href="detail.html?id=${item.id}">
    <div>
        <img src="${item.logo}" alt="">
        <h3>${item.name}</h3>
        <p>${item.introduce}</p>
        <span>${item.price}</span>
    </div>
</a>   
       </li> `
    })
    list.innerHTML = str;
}