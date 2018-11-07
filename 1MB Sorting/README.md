#### 1M内存排序问题

>You have a computer with 1M of RAM and no other local storage. 
>You must use it to accept 1 million 8-digit decimal numbers over a TCP connection, sort them, 
>and then send the sorted list out over another TCP connection. 
>The list of numbers may contain duplicates, which you may not discard. 
>Your code will be placed in ROM, so you need not subtract the size of your code from the 1M. 
>You have been given code to drive the Ethernet port and handle TCP/IP connections, and it requires 2k for its state data, 
>including a 1k buffer via which your code will read and write data.

假设有一台带有1M内存的计算机，并且没有其他的存储设备。你需要使用这台计算机通过TCP连接接收1百万个数字，每个数字都是由8个数组成，
对这1百万个数字进行排序，然后再通过TCP连接把排好序的数字发送出去。这些数字里如果包含重复的值，必须要保留。代码会被保存在ROM中，不会占用内存。
驱动以太网和TCP/IP连接的代码已经提供，需要占用2K内存，其中包含1K的缓存区，你的代码需要通过缓冲区读写数据。
