
/*
对移动范围的判断 
传入三个值  内容每块的宽，块的数量，起始横坐标
*/
class ReadyMove1 {

    constructor(width, length, init) {
        this.width = width;
        this.length = length;
        this.init = init;
        //截至点的坐标绝对值
        this.left_end = (length - (init / width) - 1) * width;
    }

    //判断范围，超出使拖拽困难
    checkDrag(distance) {
        //判断当前坐标是否超过了开始和截至点
        //里面的20可以更改（进行多余距离的把控，不宜过小）
        if (distance > this.init) {
            distance = (distance - this.init) / 20 + this.init;
        } else if (distance < -this.left_end) {
            distance = (distance + this.left_end) / 20 - this.left_end;
        }
        //把最后的坐标返回出去
        return distance;
    }

}

/**
 * 对移动结束后的位判断
 * 多输入一个移动的元素
 */
class MoveStop extends ReadyMove1 {
    constructor(width, length, init, dom) {
        super(width, length, init);
        this.dom = dom;
    }
    // 判断最后的横坐标是否脱离范围，并调整图片坐标
    checkfanl(fanl) {
        let info = fanl;
        let differ = this.init % this.width;
        //左端位置判断
        if (fanl > this.init) {
            info = this.init;
        } else if (fanl < -this.left_end) {//右端位置判断
            info = -this.left_end;
        }
        // 对最后的坐标进行更改，保证坐标是整数位
        info = Math.round((info - differ) / this.width) * this.width + differ;

        this.dom.style.left = `${info}px`;
        return info;
    }

    // 判断第几张图片
    judgeIndex(fanl){
        let info = Math.abs(((fanl- (this.init % this.width)) / this.width) - 1 - (this.init / this.width)) - (this.init % this.width);
        return info;
    }
}




/**
 * 新增加：  滚动条移动影响内容的坐标
 */

class AllMove extends MoveStop {
    //需要多传下方的滚动块的宽度以及滚动条的长度
    constructor(width, length, init, dom, scrollX, scrollWidth) {
        super(width, length, init, dom);
        this.coord = scrollWidth - scrollX;
    }
    //传进来的是下方滚动条的横坐标
    convers(off) {
        if (off > this.coord) {
            off = this.coord;
        } else if (off < 0) {
            off = 0;
        }
        //info代表的是 通过滚动条滚动距离的比例 来判断 上方内容最终的横坐标-->info 为内容横坐标
        let info = -((off / this.coord) * (this.length - 1) * this.width) + this.init;
        let out = this.checkfanl(info);
        return out;
    }
    // 由内容的横坐标转化为滚动条的横坐标
    scrollBottom(ulLeft) {
        let info = -(ulLeft - this.init) / this.width / (this.length - 1) * this.coord;
        return info;
    }
}




//根据鼠标滑动速度，判断距离
function handMove(newT, old, disa) {
    let time = old - newT;
    let info = 0;
    if (time < 300 && Math.abs(disa) > 50) {
        //这个500可以调节,调整灵敏度的
        info = disa / time * 500;
    }
    return info;
}





//阻止浏览器默认行为
function stopBow(evt) {
    if (evt && evt.preventDefault) {
        evt.preventDefault();
    } else {
        window.event.returnValue = false;
    }
}

//阻止冒泡
function stopMao(evt) {
    if (evt && evt.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

/** 
*观察者模式
*  通过内容坐标的变化发送信息
*/
class Subject {
    constructor() {
        this.state = 0;
        this.observers = [];
    }

    // 更新主体内容,并通知各观察者
    setState(state) {
        this.state = state;
        this.notifyAllobservers();
    }
    // 确定观察者
    attach(observer) {
        this.observers.push(observer);
    }
    //把得到的数据发给接收者
    notifyAllobservers() {
        this.observers.forEach(observer => {
            observer.update();
        })
    }
}

// 观察者声明
class Observer {
    constructor(dom, subject) {
        this.dom = dom;
        this.subject = subject;
        this.subject.attach(this);
    }
}

