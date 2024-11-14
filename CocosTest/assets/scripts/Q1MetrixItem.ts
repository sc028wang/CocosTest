import BasePanel from "./BasePanel";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Q1MetrixItem extends cc.Component {
    @property({
        type: cc.Label,
        tooltip: "用于保存概率y",
    })
    label_color: cc.Label = null;

    @property({
        type: cc.Sprite,
        tooltip: "用于保存概率y",
    })
    sprite_color: cc.Sprite = null;

    private _colorId: number;

    public set colorId(value: number) {
        if (this._colorId === value) {
            return;
        }
        this._colorId = value;
    }

    public get colorId(): number {
        return this._colorId;
    }

    public setNewColor(color: cc.Color): void {
        this.label_color.string = color.toHEX();
        this.sprite_color.node.color = color;
    }
}
