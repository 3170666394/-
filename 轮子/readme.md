**这里有五个类** **三个功能函数**

前三个类为**链式关系**

后两个则是**观察者模式**的类写法


第一个类为**ReadyMove1**内含三种属性和一种方法

    使用时需传值

    1. width ：内容中小块的宽

    2. length : 内容中小块的个数

    3. init : 内容的初始横坐标位置

    方法：

    checkDrag : 判断若超出边界，小块则会拖拽困难，
    并且返回最终推拽结束的坐标

    需要传值： distance 当前内容的位置（需要在调用方法前面接收当前内容的坐标）

第二个类为**MoveStop**，他继承了第一个类，并增加了一个属性和两种方法
（注：**如若只有一个可拖动的内容，那么调用第二个类就可以全部解决**）

    增加属性

    dom：内容（获取的元素）

    增加的方法

    1.checkfanl：判断推拽结束后的内容位置是否超过边界，并且调整图片的最后位置，是内容坐标为整百数。

    传递参数：fanl ：获取当前内容横坐标位置

    使内容确定位置 并 返回最后的坐标值

    2. judgeIndex：用来判断这是第几个小块（通常用于后面的观察者数据更新）

    传递参数：fanl：获取主体事件（即内容横坐标）

第三个类为**AllMove**，他继承上一个，增加了两条属性，和两种方法

    增加属性

    scrollX: 下方的滚动块的宽度

    scrollWidth：滚动条的长度

    增加方法

    1. convers  ：判断下方滚动条的横坐标是否到达边界，并通过比例换算出内容的横坐标。并返回内容的横坐标。

    传递参数：off 滚动条的横坐标

    2. scrollBottom : 将内容的横坐标转化为滚动条的横坐标，并返回滚动条横坐标

    传递形参：ulLeft：内容的横坐标

第四个类与第五个类相关连**Subject,Observer**

    就会使用到Subject的setState方法

    setState：为每次数据的更新传入更新的内容横坐标

    传入参数：state 为最新的内容横坐标

    Observer是为与内容相关的所有元素进行绑定

    每个观察者事件由自己的需求来决定。 

例子：
```js
let s = new Subject();
let p1 = new Observer(dom,s);
//通过给p1添加更新方法
//此方法为判断滚动条的新坐标
p1.update = function(){
    let info = ready.scrollBottom(this.subject.state);
    this.dom.style.left = info + 'px';
}
```


**功能函数**

1. handMove ： 

    三个形参：
    newT : 开始时间
    old：结束时间

    disa：移动的距离

    根据你鼠标的滑动速度判断内容移动距离

    返回值为内容移动距离

2. stopBow：
    
    阻止浏览器默认行为
    
3. stopMao：

    阻止冒泡
    