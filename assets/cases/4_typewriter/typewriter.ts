
const { ccclass, property } = cc._decorator;

@ccclass
export default class Typewriter extends cc.Component {

	// ///////////////////////////
	// ///属性检查器
	// /////////////////////////
	@property(cc.Label)
	private label: cc.Label = null;
	// ///////////////////////////
	// ///成员变量
	// /////////////////////////

	// ///////////////////////////
	// ///cc.class 生命周期函数
	// /////////////////////////
	protected onLoad() {
		this.writerWord(this.label.string, 0.1);
		this.label.string = '';
	}
	// ///////////////////////////
	// ///事件
	// /////////////////////////

	// ///////////////////////////
	// ///业务逻辑(control层)
	// /////////////////////////

	/**
	 * @description 打字效果
	 * @param {string} str
	 * @param {number} time 单位：s
	 */
	private writerWord(str: string, time: number) {
		const specialChar = '|';
		let index = 0;
		const length = str.length;

		let timeOut = setInterval( ()=> {
			if (index >= length) {
				clearInterval(timeOut);
				return;
			}
			// 字符串裁切
			this.label.string = str.slice(0, index) + specialChar;
			index += 1;
		}, time * 1000);
	}
	// ///////////////////////////
	// ///view层
	// /////////////////////////
}
