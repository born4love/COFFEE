<?php
// 传入css文件地址http|https开头
$params = getopt("u:d:");
// 地址
$url = $params['u'];
// 保存本地的目录
$save_path = isset($params['d']) ? $params['d'] : "/var/www";
if(!is_dir($save_path)){
    exit("指定的保存目录不存在\n\r");
}
$save_path = rtrim($save_path, DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR.'bg_imgs'.DIRECTORY_SEPARATOR;
// 检查目录是否存在
if(!is_dir($save_path)){
    if(!@mkdir($save_path, 0755, true)){
        exit("当前用户没有权限创建目录".$save_path."\n\r");
    }
}
// 远程css文件目录
$base = dirname(preg_replace("/\?.*/", '', $url))."/";
// css文件全部内容
$contents = @file_get_contents($url);
if(!$contents){
    exit("指定的css文件不存在\n\r");
}
// 所有css背景图片
preg_match_all("/background:\s?url\(([^\)]+)/i", $contents, $matches);
$images = $matches[1];
if(empty($images)){
    exit("没有背景图片被检测到\n\r");
}
// 保存图片到指定目录
$count = 0;
foreach($images as $image){
    $count++;
    @file_put_contents($save_path.$image, @file_get_contents($base.$image));
}
echo "保存".$count."张图片到".$save_path."目录\n\r";
