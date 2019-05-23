// 图片资源使用 https://github.com/chenxianqi/XCX-Luckdraw
// 在UI编辑器上旋转转盘，配取数据
const LuckConfig = {
	7: {name: '第二等奖', reward: '优惠劵礼包'},
	6: {name: '第二等奖', reward: '优惠劵礼包'},
	5: {name: '第二等奖', reward: '优惠劵礼包'},
	4: {name: '第二等奖', reward: '优惠劵礼包'},
	3: {name: '第二等奖', reward: '优惠劵礼包'},
	2: {name: '第三等奖', reward: '5元红包'},
	1: {name: '第四等奖', reward: '1元红包'},
	0: {name: '第一等奖', reward: '100元优惠劵'}
};
const { ccclass, property } = cc._decorator;
@ccclass
export default class LuckDraw extends cc.Component {

	// ///////////////////////////
	// ///属性检查器
	// /////////////////////////
	@property(cc.Node)
	private nodeLuckdraw: cc.Node = null;
	@property(cc.Label)
	private labReward: cc.Label = null;
	// ///////////////////////////
	// ///成员变量
	// /////////////////////////
	/** 每格的角度 */
	private singleAngle = 0;
	/** 位移偏差 */
	private offsetAngle = 0;
	/** 是否可点击 */
	private isCanClick = true;
	/** 转动时间 */
	private runTime = 0;
	/** 转盘格子数 */
	private luckdrawItemCount = 8;
	// ///////////////////////////
	// ///cc.class 生命周期函数
	// /////////////////////////
	protected onLoad() {
		this.singleAngle = 360 / this.luckdrawItemCount;
		this.offsetAngle = 5;
		this.isCanClick = true;
		this.runTime = 6;
	}
	// ///////////////////////////
	// ///事件
	// /////////////////////////
	private onClickStarBtnEvent(event: cc.Event, type: any) {
		if (this.isCanClick) {
			this.isCanClick = false;
			this.labReward.string = '';
			// 0~7内的随机数
			let luckid = Math.floor(Math.random() * this.luckdrawItemCount);
			// let luckid = 1;
			this.runLuckdrawAction(luckid);
		}
	}
	// ///////////////////////////e
	// ///业务逻辑(control层)
	// /////////////////////////
	private runLuckdrawAction(luckid: number) {
		let angleMin = luckid * this.singleAngle;
		let roundCountMin = 5;  // 转动最小圈数
		let roundCountMax = 9;  // 转动最大圈数
		let confine = Math.floor(Math.random() * (this.singleAngle - this.offsetAngle * 2) + this.offsetAngle);
		let roundCount = Math.floor(Math.random() * (roundCountMax - roundCountMin + 1) + roundCountMin);
		let angleTotal = 360 * roundCount + angleMin + confine;

		this.nodeLuckdraw.rotation = 0;
		this.nodeLuckdraw.runAction(
			cc.sequence(
				// 顺时钟旋转
				cc.rotateBy(15, angleTotal).easing(cc.easeExponentialOut()),
				cc.callFunc(() => {
					this.isCanClick = true;
					let value = LuckConfig[luckid];
					this.labReward.string = `恭喜您获得${value.name},奖励${value.reward}`;
				})
			)
		);
	}
	// ///////////////////////////
	// ///view层
	// /////////////////////////
}
