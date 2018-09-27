### Incorrect string value: '\xF0\x9F\x92\x83' for column 'content' at row 1

最近项目中遭遇了这个MySQL的报错信息，具体情境是这样的：

  1. MySQL数据表charset=utf8，content字段类型 longtext
  2. 插入数据如下（简化版）: INSERT INTO tb_article(content) VALUES ('💃');
  3. 这个奇怪的符号是从网上爬取的文章内容中的一个emoji，然后插入到mysql文章信息表中

网上查到的资料给的解决方案是将 mysql 表的编码调整为 utf8-mb4，这样使mysql能够存储长度为4个字节的字符，再次执行类似的插入操作就不会报错了。
然后就产生了几个问题：

  1. mysql为什么不支持4字节字符？
  2. mysql中的utf8和utf8-mb4分别是什么？
  3. utf-8编码是怎么处理多字节字符的？

对于问题1和2下面有一段简短的解释，摘抄自网络：

---------
>MySQL数据库的 “utf8”并不是真正概念里的 UTF-8。
MySQL中的“utf8”编码只支持最大3字节每字符。真正的大家正在使用的UTF-8编码是应该能支持4字节每个字符。
MySQL的开发者没有修复这个bug。他们在2010年增加了一个变通的方法：一个新的字符集“utf8mb4”
当然，他们并没有对外公布（可能因为这个bug有点尴尬）。现在很多指南推荐用户使用“utf8”其实都错了。

>简单的说:
MySQL中的 “utf8mb4” 才是 真正意义上的“UTF-8”。
MySQL的“utf8”是个“特殊的字符编码”。这种编码很多Unicode字符保存不了。

[原文地址](https://www.jianshu.com/p/ab9aa8d4df7d?openInApp=1)
---------
