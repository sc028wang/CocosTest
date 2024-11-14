// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BasePanel from "./BasePanel";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Q2 extends BasePanel {
    @property({
        type: cc.EditBox,
        tooltip: "用于保存整型数组a，以英文逗号分隔",
    })
    list_a: cc.EditBox = null;

    @property({
        type: cc.EditBox,
        tooltip: "用于保存整型数组b，以英文逗号分隔",
    })
    list_b: cc.EditBox = null;

    @property({
        type: cc.EditBox,
        tooltip: "用于保存整型v",
    })
    sumValueV: cc.EditBox = null;

    @property({
        type: cc.Label,
        tooltip: "用于展示结果提示",
    })
    tipsLabel: cc.Label = null;

    /**
     * @description 判断是否可以从 a 中选择⼀个数，从 b 中选择⼀个数，⼆者相加等于 v，如可以返回 true，否则返回 false
     *              该函数的主要性能消耗是在a和b的遍历上，所以该函数的时间复杂度为O(n)，具体值和a,b长度有关，为O（a.length + b.length）
     * @returns boolean
     */
    private hasValue(): boolean {
        const valueV = utils.safeString2Int(this.sumValueV.string);
        if (valueV === null) {
            return false;
        }

        const list_a_temp = utils.parseString2IntArray(this.list_a.string);
        const list_b_temp = utils.parseString2IntArray(this.list_b.string);
        const requireValues = new Set<number>();
        //使用一个差值set来保存目标和与b里每一个数据的差值
        list_b_temp.forEach((valueInB) => requireValues.add(valueV - valueInB));

        let hasValue: boolean = false;
        for (const valueInA of list_a_temp) {
            if (requireValues.has(valueInA)) {
                //a中存在一个可以和b中数据相加和为valueV的数
                hasValue = true;
                break;
            }
        }

        return hasValue;
    }

    /**
     * @description 点击查找是否有匹配数据
     * @returns
     */
    private clickFindTarget() {
        const hasValue = this.hasValue();
        this.tipsLabel.string = `整型数组a和整型数组b中${hasValue ? "" : "不"}存在两数之和为${this.sumValueV.string}`;
        this.tipsLabel.node.color = hasValue ? cc.Color.WHITE : cc.Color.RED;
        return hasValue;
    }
}
