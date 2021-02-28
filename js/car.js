let login = getCookie('denlu');
if (!login) {
    localStorage.setItem('url', location.href);
    location.href = '../html/denlu.html';
}
class Car {
    constructor(ele, userName) {
        this.ele = document.querySelector(ele);
        this.username = userName;
        this.info = {
            number: 0,
            totalPrice: 0
        };

        this.init();
    }

    init() {
        // 获取元素
        this.body = this.ele.querySelector('.panel-body');
        this.species = this.ele.querySelector('.species');
        this.number = this.ele.querySelector('.number');
        this.total = this.ele.querySelector('.total');
        this.allChecked = this.ele.querySelector('.allChecked');
        this.getData();

        //事件委托形式的绑定点击事件
        this.ele.onclick = (e) => {
            let target = e.target;
            this.id = target.getAttribute('idx');
            if (target.classList.contains('checked')) {
                // 要把当前点击选择框的这个元素的is_select改为true
                this.data.forEach(item => {
                    if (item.id == this.id) {
                        item.is_select = target.checked;
                    }
                })
                this.calculation();
            }
            if (target.classList.contains('allChecked')) {
                // 如果是勾上的时候就 把勾去掉，下面所有商品的勾都要去掉，表示is_select = false
                // 如果没有勾上，就把勾勾上，下面所有的商品都勾上 表示素有数据的is_select = true
                this.data.forEach(item => {
                    item.is_select = target.checked;
                })

                this.render();
            }

            if (target.classList.contains('reduce')) {
              
                this.reduce();
            }

            if (target.classList.contains('add')) {
                this.add();
            }
            if (target.classList.contains('del')) {
                this.remove(this.id);
            }


            if (target.classList.contains('settlement')) {
               

                let deleteData = this.data.filter(item => {
                    return item.is_select == true;
                })

                deleteData.forEach(item => {
                    this.remove(item.id)
                })
            }
        }
    }

 
    async getData() {
        let data = await pAjax({
            url: '../api/getcardata.php',
            data: {
                username: this.username
            }
        });
        this.data = JSON.parse(data);
        console.log(this.data);

        
        this.data.forEach(item => {
            item.is_select = false;
        })
        this.render()
    }

    render() {
        this.calculation();
        let str = '';

        this.data.forEach(item => {

            let price = item.price.split('￥')[1];
            let total = item.num * price;
            str += `<div class="media">
                    <div class="media-left">
                        <a href="#" class="media_left">
                            <input type="checkbox" ${item.is_select ? "checked" :''} class="checked" idx="${item.id}">
                            <img class="media-object" style="width: 100px;"
                                src="${item.logo}"
                                alt="...">
                        </a>
                    </div>
                    <div class="media-body">
                        <div class="media_body_left">
                            <h4 class="media-heading">${item.name}</h4>
                            <div class="price">
                                <i class="glyphicon glyphicon-yen"></i>
                                <span>${price}</span>
                            </div>
                        </div>
                        <div class="media_body_center">
                            <div class="btn-group" role="group" aria-label="...">
                                <button type="button" class="btn btn-default reduce" idx="${item.id}">-</button>
                                <button type="button" class="btn btn-default">${item.num}</button>
                                <button type="button" class="btn btn-default add" idx="${item.id}">+</button>
                            </div>
                        </div>
                        <div class="media_body_right">
                            <span class="item_total">小计:￥${total.toFixed(2)}</span>
                            <span idx="${item.id}" class="glyphicon glyphicon-remove del"></span>
                        </div>
                    </div>
                </div>`;
        });
        this.body.innerHTML = str;
    }

    // 计算所选择的商品的总价格 和 数量
    calculation() {
        

        this.selectData = this.data.filter(item => {
            return item.is_select == true;
        });

        this.info.number = this.selectData.reduce((pre, cur) => {
            return pre + cur.num * 1;
        }, 0);

        this.info.totalPrice = this.selectData.reduce((pre, cur) => {
            return pre + cur.num * cur.price.split('￥')[1];
        }, 0)

        let res = this.data.every(item => {
            return item.is_select == true
        })

        this.species.innerHTML = this.data.length;
        this.number.innerHTML = this.info.number;
        this.total.innerHTML = this.info.totalPrice;
        this.allChecked.checked = res;
    }

    reduce() {
        let num = this.data.find(item => {
            return item.id == this.id;
        }).num

        if (num <= 1) {
            alert('商品数量最小为1')
            return
        }

        pAjax({
            url: '../api/updatacar.php',
            data: {
                'id': this.id,
                'num': --num,
                'username': this.username
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                this.data.forEach(item => {
                    if (item.id == this.id) {
                        item.num = num;
                        this.render();
                    }
                })
            }
        })
    }

    // 加数量的函数
    add() {
        let num = this.data.find(item => {
            return item.id == this.id;
        }).num;
        pAjax({
            url: '../api/updataCar.php',
            data: {
                'id': this.id,
                'num': ++num,
                'username': this.username
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                this.data.forEach(item => {
                    if (item.id == this.id) {
                        item.num = num;
                        this.render();
                    }
                })
            }
        })
    }

    // 删除的函数
    remove(id) {
        
        pAjax({
            url: '../api/deleteCar.php',
            data: {
                'username': this.username,
                'id': id
            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code) {
                this.data = this.data.filter(item => {
                    return item.id != id;
                })
                this.render();
            }
        })
    }
}

new Car('.container', login);
let ul = document.querySelector(".cate ul");
let cate = document.querySelector(".cate");
cate.onmouseover = function () {
    ul.style.display = "block";
}
cate.onmouseout = function () {
    ul.style.display = "none";
}