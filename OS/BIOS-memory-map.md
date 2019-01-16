####  概述

计算机开机后的第一件事是读取ROM芯片中的bios，此时系统工作在实模式（兼容8086 20根地址总线 16根数据总线）下，寻址范围只有1MB（0x00000 ~ 0xFFFFF)。 

####  内存分布

* 0x00000 ~ 0x9FFFF: 基本内存（640KB）

* 0x00000 ~ 0x003FF: 中断向量表（1024B）
* 0x00400 ~ 0x004FF: bios数据区（256B）
* 0x00500 ~ 0x07BFF: 自由内存区
* 0x07C00 ~ 0x07DFF: 引导程序加载区（512B）
* 0x07E00 ~ 0x9FFFF: 自由内存区
* 0xA0000 ~ 0xBFFFF: 显存（128KB）

* 0xA0000 ~ 0xAFFFF: EGA/VGA/XGA/XVGA图形视频缓冲区（64KB）
* 0xB0000 ~ 0xB7FFF: Mono text video buffer（32KB）
* 0xB8000 ~ 0xBFFFF: CGA/EGA+ chroma text video buffer（32KB）
* 0xC0000 ~ 0xFFFFF: bios自己使用（256KB）

* 0xC0000 ~ 0xC7FFFF: 显卡bios使用（32KB）
* 0xC8000 ~ 0xCBFFFF: ide控制器bios使用（16KB）
* 0xCC000 ~ 0xEFFFFF: 
* 0xF0000 ~ 0xFFFFFF: 系统bios使用（64KB）
