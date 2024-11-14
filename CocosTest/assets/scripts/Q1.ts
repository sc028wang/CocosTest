// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BasePanel from "./BasePanel";
import Q1ColorSelector from "./Q1ColorSelector";
import { PRESET_COLORS } from "./Q1Defines";
import Q1MetrixItem from "./Q1MetrixItem";
import { utils } from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export class Q1 extends BasePanel {
    @property({
        type: cc.EditBox,
        tooltip: "用于保存概率x",
    })
    rate_x: cc.EditBox = null;

    @property({
        type: cc.EditBox,
        tooltip: "用于保存概率y",
    })
    rate_y: cc.EditBox = null;

    @property({
        type: cc.Node,
        tooltip: "用于展示颜色矩阵",
    })
    content: cc.Node = null;

    @property({
        type: cc.Node,
        tooltip: "用于展示颜色矩阵",
    })
    prefabNode: cc.Node = null;

    getCellColorIndex(row: number, col: number): number | null {
        const cell = this.content.children[row * 10 + col];
        if (cell) {
            return cell.getComponent(Q1MetrixItem).colorId;
        }
        return null;
    }

    getRandomColor(m, n, colorMatrix, X, Y): number {
        // 如果是第一个点，直接随机选择一种颜色
        if (m === 0 && n === 0) {
            return Math.floor(Math.random() * PRESET_COLORS.length);
        }

        // 初始化颜色概率
        let colorProbabilities = PRESET_COLORS.map(() => 1 / PRESET_COLORS.length);

        // 获取左侧和上方颜色
        let leftColor = n > 0 ? colorMatrix[m][n - 1] : null;
        let topColor = m > 0 ? colorMatrix[m - 1][n] : null;

        // 增加概率规则
        PRESET_COLORS.forEach((color, index) => {
            if (color === leftColor && color === topColor) {
                colorProbabilities[index] += Y;
            } else if (color === leftColor || color === topColor) {
                colorProbabilities[index] += X;
            }
        });

        // 归一化概率
        let total = colorProbabilities.reduce((acc, prob) => acc + prob, 0);
        colorProbabilities = colorProbabilities.map((prob) => prob / total);

        // 按照概率选择颜色
        let random = Math.random();
        let cumulative = 0;
        for (let i = 0; i < colorProbabilities.length; i++) {
            cumulative += colorProbabilities[i];
            if (random < cumulative) {
                return i;
            }
        }

        return 0; // 默认返回第一种颜色，防止未命中情况
    }

    createCell(colorId: number) {
        const cellNode = cc.instantiate(this.prefabNode);
        cellNode.parent = this.content;
        cellNode.active = true;

        const component = cellNode.getComponent(Q1MetrixItem);
        component.setNewColor(PRESET_COLORS[colorId]);
        component.colorId = colorId;
    }

    /**
     * @description 点击生成矩阵
     * @returns
     */
    private clickGenerateMetrix(): void {
        const matrixSize = 10;
        const x = utils.safeString2Int(this.rate_x.string) / 100;
        const y = utils.safeString2Int(this.rate_y.string) / 100;

        this.content.removeAllChildren();
        // 存储颜色矩阵
        const colorMatrix = [];
        // 初始化矩阵生成
        for (let i = 0; i < matrixSize; i++) {
            colorMatrix[i] = [];
            for (let j = 0; j < matrixSize; j++) {
                const color = this.getRandomColor(i, j, colorMatrix, x, y);
                colorMatrix[i][j] = color;
                this.createCell(color);
            }
        }
    }

    /**
     * @description 点击矩阵节点切换颜色
     * @param event
     */
    private async clickGridItem(event: cc.Event): Promise<void> {
        const prefab = await utils.loadPanel("Q1ColorSelector");
        const panel = cc.instantiate(prefab);
        panel.parent = this.node;
        panel.getComponent(Q1ColorSelector).onSelect = (id) => {
            const item: Q1MetrixItem = event.target.getComponent(Q1MetrixItem);
            item.colorId = id;
            item.setNewColor(PRESET_COLORS[item.colorId]);
        };
    }

    /**
     * @description 点击矩阵节点切换颜色
     * @param event
     */
    private async clickSetColor() {
        const prefab = await utils.loadPanel("Q1ColorSelector");
        const panel = cc.instantiate(prefab);
        panel.parent = this.node;
    }
}
