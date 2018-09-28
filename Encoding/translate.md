### 每一个开发者绝对必须至少需要了解unicode和字符集（没有例外）


#### 回顾历史

  想弄明白字符集最好的方式就是按照年代的顺序去了解它的发展历程
  
  在半导体盛行的那个年代，那时候Unix被发明出来，K&R开发了C语言，所有的一切都很简单。对于那时的计算机和程序员来说，唯一有意义的字符集合就是英文字符，当时有一套编码规范叫ASCII，这个规范可以用32到127之间的数字表示所有的英文字符。32表示空格，65表示大写字母A。这套规则可以很方便的用7个二进制位来存储。此时大多数计算机都是使用8个二进制位作为一个字节，所以一个字节就足以保存所有的ASCII字符，并且还有一个完整的二进制位没有被用到。ASCII编码中数值小于32的被称为不可打印字符，他们主要是用来念咒语诅咒别人，可惜这是一个玩笑，他们真正的目的是作为控制字符，比如7代表的字符会使你的计算机发出beep的声音，12代表的控制字符会控制打印机换纸。
  
  一切都很美好，如果你是一个英语的使用者。
  
  正是因为一个字节有8个二进制位，很多人开始想“嗯，我们可以使用128-255之间的字符来表达我们自己的编码”，问题是很多人在同一时间有了这个想法，但是如何填充128-255之间的空间他们的想法又不一样，



>译至:
[The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets (No Excuses!)](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)
