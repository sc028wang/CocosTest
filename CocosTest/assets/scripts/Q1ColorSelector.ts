import BasePanel from "./BasePanel";
import Q1ColorItem from "./Q1ColorItem";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Q1ColorSelector extends BasePanel {
    @property({
        type: cc.Node,
        tooltip: "用于展示颜色矩阵",
    })
    content: cc.Node = null;

    //选择颜色回调
    onSelect: Function = null;

    protected start(): void {
        this.content.children.forEach((child, i) => (child.getComponent(Q1ColorItem).colorId = i));
    }

    /**
     * @description 选择一个颜色设置当前节点
     * @param id
     */
    public select(id) {
        this.clickClose();
        this.onSelect?.(id);
    }

    /**
     * @description 关闭UI
     */
    clickClose(): void {
        super.clickClose();
    }
}
