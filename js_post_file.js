/**
 * 使用js提交表单
 */

// 使用form元素初始化formData对象
        body.on('submit', '#form1', function () {
            var formData = new FormData($(this)[0]);
//            var values = $(this).serializeArray(); 这个方法不会把上传的文件包括在其中，所以不实用
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


// 初始化空formData对象然后append元素，支持append上传的文件

// 表单校验/提交
        body.on('submit', '#form1', function(){
            var formData = new FormData();

            formData.append('pos_id' , $("input[name='position_id']").val());
            formData.append('name' , $("input[name='name']").val());
            formData.append('rule_type' , $("input[name='rule_type']").filter(":checked").val());
            formData.append('rule_title_1' , $("input[name='rule_title_1']").val());
            formData.append('rule_title_2' , $("input[name='rule_title_2']").val());
            formData.append('rule_text' , editor.html());
            formData.append('charge_type' , $("input[name='charge_type']").filter(":checked").val());
            formData.append('old_rule_img' , $("input#old_rule_img").val());
            formData.append('sort' , $("input[name='sort']").val());
            formData.append('state' , $("select[name='state']").find("option:selected").val());
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
