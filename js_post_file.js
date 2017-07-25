        // 表单校验/提交
        body.on('submit', '#form1', function () {
            var formData = new FormData($(this)[0]);
//            var values = $(this).serializeArray();
            var action = "__URL__/insert/";
            hideAlert();
            $.ajax({
                url: action,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                dataType: 'json'
            }).done(function (data) {
                if (data) {
                    if (data.status === 0) {
                        showAlert(data.info);
                    } else {
                        alert(data.info);
                        location.reload();
                    }
                } else {
                    console.log('请求失败');
                }
            }).fail(function (data) {});

            return false;
        });
    });
