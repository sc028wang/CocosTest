import BasePanel from "./BasePanel";
import Q1ColorSelector from "./Q1ColorSelector";
import { PRESET_COLORS } from "./Q1Defines";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Q1ColorItem extends cc.Component {
    @property({
        type: cc.EditBox,
        tooltip: "用于保存概率y",
    })
    color_editbox: cc.EditBox = null;

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
        this.setNewColor(PRESET_COLORS[value]);
    }

    public get colorId(): number {
        return this._colorId;
    }

    public setNewColor(color: cc.Color): void {
        this.color_editbox.string = color.toHEX();
        this.sprite_color.node.color = color;
    }

    public onColorChanged() {
        if (this.color_editbox.string.length != 6) {
            return;
        }
        let outColor: cc.Color = new cc.Color(
            parseInt(this.color_editbox.string.substring(0, 1), 16),
            parseInt(this.color_editbox.string.substring(2, 3), 16),
            parseInt(this.color_editbox.string.substring(4, 5), 16)
        );
        cc.Color.fromHEX(outColor, this.color_editbox.string);
        this.setNewColor(outColor);
        PRESET_COLORS[this.colorId] = outColor;
    }

    private clickSelectColor() {
        this.node.parent.parent.getComponent(Q1ColorSelector).select(this.colorId);
    }
}
