
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
