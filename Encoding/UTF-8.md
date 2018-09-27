### Incorrect string value: '\xF0\x9F\x92\x83' for column 'content' at row 1

最近项目中遭遇了这个MySQL的报错信息，具体情境是这样的：

  1. MySQL数据表charset=utf8
  2. 插入数据如下（简化版）: INSERT INTO tb_article(content) VALUES ('💃');
  3. 这个奇怪的符号是从网上爬取的文章内容中的一个emoji，然后插入到mysql文章信息表中

网上查到的资料给的解决方案是将mysql表的编码调整为utf8-mb4，这样使mysql能够存储长度为4个字节的字符。
