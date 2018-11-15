
#### 问题: echo floor(19.9 * 100) = 189

起初遇到这个问题的时候，总觉得是PHP内核的问题，后来使用 python 和 C 语言测试过，原来都有问题，问题抽象为：

>当对一个浮点数执行隐式/显示的数值类型转换时，会出现精度丢失的可能性。

为什么是可能性呢，因为这个不是必然的，比如

```php

echo floor(1.25 * 100); // 输出： 125

echo intval(19.9 * 100);  // 输出 1989

var_dump (0.1 + 0.2 == 0.3) // 输出 bool(false)

```

#### 从机器角度看问题

为了弄清楚这个问题，我们首先来看一下计算机怎么存储浮点数

一个8位的二进制空间表示一个字节，可以表示从0到255的数字，但是这只能表示整数，不包括实数（小数如：0.5,20.456等）















相关阅读

* 浮点数和二进制相互转换： https://blog.penjee.com/binary-numbers-floating-point-conversion/
* 浮点数二进制存储工具: https://www.h-schmidt.net/FloatConverter/IEEE754.html
* PHP文档浮点数解释： http://php.net/manual/zh/language.types.float.php
