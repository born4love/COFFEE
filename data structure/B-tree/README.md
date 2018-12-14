
#### B Tree 简介

>In B-trees, internal (non-leaf) nodes can have a variable number of child nodes within some pre-defined range. 
>When data is inserted or removed from a node, its number of child nodes changes. 
>In order to maintain the pre-defined range, internal nodes may be joined or split. 
>Because a range of child nodes is permitted, B-trees do not need re-balancing as frequently as other self-balancing search trees, 
>but may waste some space, since nodes are not entirely full. 
>The lower and upper bounds on the number of child nodes are typically fixed for a particular implementation. 
>For example, in a 2-3 B-tree (often simply referred to as a 2-3 tree), each internal node may have only 2 or 3 child nodes.

>https://en.wikipedia.org/wiki/B-tree#Overview

在B-树中，非叶子节点可以有不定数量的子节点，只要子节点的数量在规定的范围内。
当从B树中增加或移除节点时，子节点的数量也会发生变化。
为了使子节点的数量维持在限定的数量内，非叶子节点就会产生重组。
因为允许子节点的数量在一定的范围内，B-树不需要像其他的自平衡树搜索树一样频繁的重新平衡，但是会浪费空间，因为有写节点未被填满。
子节点的最大和最小数量会根据不同的实现方式而有所区别，比如2-3 B树（通常简称为2-3树）每个非叶子节点只可以有2个或3个子节点。

>Each internal node of a B-tree contains a number of keys. 
>The keys act as separation values which divide its subtrees. 
>For example, if an internal node has 3 child nodes (or subtrees) then it must have 2 keys: a1 and a2. 
>All values in the leftmost subtree will be less than a1, all values in the middle subtree will be between a1 and a2, 
>and all values in the rightmost subtree will be greater than a2.

每个非叶子节点可以保存多余1个值（或者说指针）。
这些值同时也担当者把这个节点的子树分隔开来的角色。
例如：如果一个非叶子节点有3个子节点（或者说子树）那么它必须保存2个值：a1和a2。
在最左侧的子树中的所有值都会比a1小，在中间子树中的所有值将会介于a1和a2之间，最右侧的子树中的所有值会大于a2.

>Usually, the number of keys is chosen to vary between {\displaystyle d} d and {\displaystyle 2d} 2d, 
>where {\displaystyle d} d is the minimum number of keys, 
>and {\displaystyle d+1} d+1 is the minimum degree or branching factor of the tree. 
>In practice, the keys take up the most space in a node. The factor of 2 will guarantee that nodes can be split or combined. 

通常，非叶子节点包含值的数量控制在 d 到 2d 之间，所以 d 是非叶子节点拥有值的最小数量，而 d+1 表示树的最小度（也就是非叶子节点子节点数量的最少值）
事实上，非叶子节点包含值的数量如果超过了 2d 限制，则这个节点会被分割并重组。

>If an internal node has {\displaystyle 2d} 2d keys, 
>then adding a key to that node can be accomplished by splitting the hypothetical {\displaystyle 2d+1} 2d+1 key node into two 
>{\displaystyle d} d key nodes and moving the key that would have been in the middle to the parent node. 
>Each split node has the required minimum number of keys. 

如果一个内部节点已经有 2d 个值，再往这个节点增加一个值会如此完成：首先假设这个值已经被加入到该节点，那它已经有 2d+1 个值，然后把这个 2d+1 个值
的最中间的那个值取出来放到父节点中，然后剩下两个部分各有 d 个值并且各自成为父节点的一个子节点。

>Similarly, if an internal node and its neighbor each have {\displaystyle d} d keys, 
>then a key may be deleted from the internal node by combining it with its neighbor. 
>Deleting the key would make the internal node have {\displaystyle d-1} d-1 keys; 
>joining the neighbor would add {\displaystyle d} d keys plus one more key brought down from the neighbor's parent. 
>The result is an entirely full node of {\displaystyle 2d} 2d keys.

同样的，如果一个内部节点和它的相邻节点各自包含 d 个值，此时从该节点删除一个值会通过将其相邻的节点和该节点合并来完成。
删除这个值会使这个节点只有 d-1 个值，合并相邻节点会添加 d 个值同时包含一个从相邻节点父节点取下来的值。结果就会使该节点拥有 2d 个值。

>The number of branches (or child nodes) from a node will be one more than the number of keys stored in the node. 
>In a 2-3 B-tree, the internal nodes will store either one key (with two child nodes) or two keys (with three child nodes).

一个节点拥有的子节点的个数等于它拥有的值的个数加1.
在 2-3 B树中，内部节点会保存一个值（两个子节点）或者两个值（三个子节点）。

>A B-tree is sometimes described with the parameters {\displaystyle (d+1)} (d+1) — {\displaystyle (2d+1)} (2d+1) or simply with the >highest branching order, {\displaystyle (2d+1)} (2d+1).
>A B-tree is kept balanced by requiring that all leaf nodes be at the same depth. 

一个B树有时候被描述为 (d+1) - (2d+1) 树，也可以直接用最大子节点个数 （2d+1）来描述。
一个B树通过使所有的叶子节点存储在相同的深度来保持平衡。

>This depth will increase slowly as elements are added to the tree, but an increase in the overall depth is infrequent, 
>and results in all leaf nodes being one more node farther away from the root.

在向树中新增元素时树的深度只会缓慢增加，但是所有节点的深度之和增加的是很快的，这就会导致所有叶子节点到根节点的距离远了一个节点的距离。

>B-trees have substantial advantages over alternative implementations when the time to access the data of a node greatly exceeds 
>the time spent processing that data, 
>because then the cost of accessing the node may be amortized over multiple operations within the node. 
>This usually occurs when the node data are in secondary storage such as disk drives. 

如果数据的查找时间远远超过了对数据进行处理的时间，那么对于其他实现方式来说，B树有本质上的优势。
因为访问节点的时间消耗被均摊到节点内部的多次操作上。通常的情况是这些节点存储在想硬盘一样的二级存储里。

>By maximizing the number of keys within each internal node, 
>the height of the tree decreases and the number of expensive node accesses is reduced. 
>In addition, rebalancing of the tree occurs less often. 

通过最大化每个内部节点存储的值，使树的高度降低了而且减少访问节点的时间消耗。而且，树的重新平衡操作被减少了。

>The maximum number of child nodes depends on the information that must be stored for each child node and 
>the size of a full disk block or an analogous size in secondary storage. 
>While 2-3 B-trees are easier to explain, practical B-trees using secondary storage need a large number of 
>child nodes to improve performance.

节点的最大子节点数量取决于每个节点必须存储的最大信息量和一个磁盘块的空间大小或者二级存储的存储块的大小。
尽管2-3树更容易理解，但是更实用的使用二级存储的B树需要很大的子节点数量来提高性能。
