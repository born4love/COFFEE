#### 30天自制操作系统


##### 在线阅读地址

http://www.ituring.com.cn/book/miniarticle/33574

##### 注意事项

运行书中的例子时，windows会报错 如：

* copy 命令提示找不到指定文件
* del 命令找不到

这些问题是因为在windows下 make 寻找命令的顺序是先找 PATH 中包含的 sh.exe 然后再找系统命令，如果当前 PATH 正好包含 sh.exe ，
就会导致无法找到系统中对应的命令，应该将 PATH 中的对应路径删掉，才可以正确执行



