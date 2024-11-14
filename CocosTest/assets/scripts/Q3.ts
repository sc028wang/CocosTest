// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BasePanel from "./BasePanel";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

const FRAME_TIME = 0.033;
/**
 * 请仔细观察附件中知名消除类游戏 Candy Crush 或 Candy Crush Saga 中选关界⾯对话框 Play 按钮的
 * 动画效果，包括按钮出现，按钮按下，以及按钮弹起效果，使⽤ Cocos Creator 复制这⼀效果，使⽤代
 * 码实现或者 Animation 编辑均可。
 */
@ccclass
export default class Q3 extends BasePanel {
    @property({
        type: cc.Node,
        tooltip: "按钮节点",
    })
    buttonNode: cc.Node = null;

    protected start(): void {
        this.buttonNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.buttonNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this);
        this.buttonNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCanceled, this);

        this.showInitAni();
    }

    protected onDestroy(): void {
        this.buttonNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.buttonNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this);
        this.buttonNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCanceled, this);
    }

    public showInitAni() {
        cc.Tween.stopAllByTarget(this.buttonNode);
        this.buttonNode.angle = -3;
        cc.tween(this.buttonNode)
            .parallel(
                cc
                    .tween()
                    .to(FRAME_TIME * 8, { scaleX: 1.2, scaleY: 0.5 })
                    .to(FRAME_TIME * 3, { scaleX: 1, scaleY: 1 })
                    .to(FRAME_TIME * 3, { scaleX: 1.2, scaleY: 0.5 })
                    .to(FRAME_TIME * 3, { scaleX: 1.05, scaleY: 1 })
                    .to(FRAME_TIME * 3, { scaleX: 1, scaleY: 1 }),
                cc
                    .tween()
                    .to(FRAME_TIME * 8, { angle: 3 })
                    .to(FRAME_TIME * 6, { angle: -3 })
                    .to(FRAME_TIME * 3, { angle: 1.5 })
                    .to(FRAME_TIME * 3, { angle: 1 })
                    .to(FRAME_TIME * 1, { angle: 0 })
            )
            .start();
    }

    private showTouchFree() {
        this.buttonNode.angle = 0;
        this.buttonNode.scale = 1;
        this.buttonNode.children[0].active = false;
        cc.Tween.stopAllByTarget(this.buttonNode);
        cc.tween(this.buttonNode)
            .to(FRAME_TIME * 4, { scaleX: 0.85, scaleY: 0.5 })
            .delay(FRAME_TIME)
            .sequence(
                cc.tween().to(FRAME_TIME * 4, { scaleX: 0.9, scaleY: 0.7 }),
                cc.tween().to(FRAME_TIME * 4, { scaleX: 0.85, scaleY: 0.7 })
            )
            .repeat(2)
            .start();
    }

    onTouchStart() {
        this.buttonNode.children[0].active = true;
        cc.Tween.stopAllByTarget(this.buttonNode);
        cc.tween(this.buttonNode)
            .to(FRAME_TIME * 5, { scale: 0.65 })
            .delay(FRAME_TIME)
            .sequence(cc.tween().to(FRAME_TIME * 4, { scale: 0.78 }), cc.tween().to(FRAME_TIME * 4, { scale: 0.8 }))
            .repeat(3)
            .start();
    }

    onTouchEnded() {
        this.showTouchFree();
    }

    onTouchCanceled() {
        this.showTouchFree();
    }
}
