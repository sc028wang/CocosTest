const { ccclass, property } = cc._decorator;

@ccclass
export default class BasePanel extends cc.Component {
    /**
     * @description 关闭UI
     */
    clickClose(): void {
        this.node.destroy();
    }
}
