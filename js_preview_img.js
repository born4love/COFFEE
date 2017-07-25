    $(document).ready(function(){
        // 图片预览
        body.on("change", "input#rule_img", function(){
            var err_msg = $('span#upload_img_err');
            var preview = $('div#img_preview');
            err_msg.hide();
            preview.html('');
            var file = this.files[0];
            // 只支持上传一个文件
            var imageType = /^image\//;
            if(!imageType.test(file.type)){
                err_msg.show();
                return false;
            }

            var img = document.createElement('img');
            img.classList.add('obj');
            img.file = file;
            preview.html(img);

            var reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);
        });
    });

// 参考 ： https://developer.mozilla.org/en-US/docs/Web/API/FileReader
