let btn = $('.right-top li')
btn.click(function () {
    $(this).addClass('active').siblings().removeClass('active');;
    let index = $(this).index();
    $('.denlu .a').eq(index).addClass('active').siblings().removeClass('active');

})
let username = $('#username');
let password = $('#password');

// btn2.click(function () {
//     let e = window.event;
//     e.preventDefault();
//     pAjax({
//         type: 'post',
//         url: '../api/denlu.php',
//         data: {
//             username: username.val(),
//             password: password.val()

//         }
//     }).then(res => {
//         res = JSON.parse(res);
//         if (res.code == 1) {
//             setCookie('denlu', username.val());
//             let url = localStorage.getItem('url');
//             if (url) {
//                 location.href = url;
//                 localStorage.removeItem('url');
//             } else {
//                 location.href = '../index.html';
//             }
//         }

//     })
// })

$('.denlu').validate({

    rules: {
        username: {
            required: true,
            rangelength: [2, 4]
        },
        password: {
            required: true,
            rangelength: [6, 24]
        },
        code: {
            required: true,
        },
    },
    messages: {
        username: {
            required: "用户名不能为空",
            rangelength: "用户名格式不正确"
        },
        password: {
            required: "密码不能为空",
            rangelength: "密码格式不正确"
        },
        code: {
            required: "必须填写"
        },
    },
    submitHandler: function () {
        let e = window.event;
        e.preventDefault();
        pAjax({
            type: 'post',
            url: '../api/denlu.php',
            data: {
                username: username.val(),
                password: password.val()

            }
        }).then(res => {
            res = JSON.parse(res);
            if (res.code == 1) {
                setCookie('denlu', username.val());
                let url = localStorage.getItem('url');
                if (url) {
                    location.href = url;
                    localStorage.removeItem('url');
                } else {
                    location.href = '../index.html';
                }
            }

        })
    }
})