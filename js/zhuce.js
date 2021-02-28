let username = $('#username');
let password = $('#password');

jQuery.validator.addMethod('testTel', function (value) {
    let reg = /^1[345789]\d{9}$/;
    if (reg.test(value)) {
        return true
    }
    return false
});
jQuery.validator.addMethod('testConfirm', function (value) {
    if (value == password.val()) {
        return true
    }
    return false
});
$('#box').validate({

    rules: {
        username: {
            required: true,
            rangelength: [2, 4]
        },
        tel: {
            required: true,
            testTel: true
        },
        password: {
            required: true,
            rangelength: [6, 24]
        },

        confirm: {
            required: true,
            testConfirm: true
        },
        code: {
            required: true,
        },
        check: {
            required: true
        }
    },
    messages: {
        username: {
            required: "用户名不能为空",
            rangelength: "用户名格式不正确"
        },
        tel: {
            required: "手机号不能为空",
            testTel: "手机号格式不正确"
        },
        password: {
            required: "密码不能为空",
            rangelength: "密码格式不正确"
        },

        confirm: {
            required: "必须填写",
            testConfirm: "与密码不一样"
        },
        code: {
            required: "必须填写"
        },
        check: {
            required: "必须选择"
        }
    },
    submitHandler: function () {
        let e = window.event;
        e.preventDefault();
        pAjax({
            type: 'post',
            url: '../api/zhuce.php',
            data: {
                username: username.val(),
                password: password.val()
            }
        }).then(res => {

            console.log(res);
            res = JSON.parse(res);


            if (res.code == 1) {
                alert('注册成功');
                location.href = 'denlu.html';
            } else {
                alert('用户已存在')
            }
        })
    }
})