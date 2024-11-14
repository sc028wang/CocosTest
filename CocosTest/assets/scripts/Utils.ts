class Utils {
    public safeString2Int(value: string): number | null {
        const result = parseInt(value, 10); // 使用10进制转换

        // 检查结果是否为 NaN，如果是则返回 null
        if (isNaN(result)) {
            return null;
        }

        return result;
    }

    /**
     * @description 将字符串转换为整形数组
     * @param value
     * @param spliter
     */
    public parseString2IntArray(value: string, spliter?: string): Array<number> {
        const intArray = new Array<number>();
        const stringArray = value.split(spliter ?? ",");
        stringArray.forEach((str) => {
            const newInt = this.safeString2Int(str);
            if (null === newInt) {
                return;
            }
            intArray.push(newInt);
        });

        return intArray;
    }

    /**
     * @description 加载界面预制体
     * @param url prefab 路径
     * @returns
     */
    public loadPanel(url: string): Promise<cc.Prefab> {
        return new Promise<cc.Prefab>((resolve) => {
            cc.assetManager.resources.load(url, cc.Prefab, (err: Error, prefab: cc.Prefab) => {
                resolve(prefab ?? null);
            });
        });
    }
}

export const utils: Utils = new Utils();
