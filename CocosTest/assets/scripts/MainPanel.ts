// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainPanel extends cc.Component {
    private loading: boolean = false;

    /**
     * @description 点击选择函数
     * @param event
     * @param p1
     */
    async clickQuestion(event: cc.Touch, url: string): Promise<void> {
        if (this.loading) {
            return;
        }
        this.loading = true;
        const prefab = await utils.loadPanel(url);
        if (!prefab) {
            return;
        }
        const panel = cc.instantiate(prefab);
        panel.parent = this.node.parent;
        this.loading = false;
    }
}
