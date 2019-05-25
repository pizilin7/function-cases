
const { ccclass, property } = cc._decorator;

@ccclass
export default class NetworkActivityIndicator extends cc.Component {

	// ///////////////////////////
	// ///属性检查器
	// /////////////////////////
	@property([cc.Node])
	private nodeIndiatorS: cc.Node[] = [];
	// ///////////////////////////
	// ///成员变量
	// /////////////////////////
	private opacity = [255, 229, 204, 178, 153, 127, 102, 76];
	private scale = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3];
	private index = 0;
	private dotMax = 8;
	private timeOut = null;

	// ///////////////////////////
	// ///cc.class 生命周期函数
	// /////////////////////////
	protected onLoad() {
		cc.game.addPersistRootNode(this.node);
		this.node.active = false;
	}

	protected onDestroy() {
		cc.game.removePersistRootNode(this.node);
		this.clearTimeOut();
	}
	// ///////////////////////////
	// ///事件
	// /////////////////////////

	// ///////////////////////////
	// ///业务逻辑(control层)
	// /////////////////////////

	public show() {
		this.node.active = true;
		this.init();
		this.runAction();
	}

	public hide() {
		this.clearTimeOut();
		this.node.active = false;
	}

	private init() {
		this.index = 0;
		for (let index = 0; index < this.dotMax; index ++) {
			let node = this.nodeIndiatorS[index];
			if (node) {
				node.scale = this.scale[index];
				node.scale = this.opacity[index];
			}
		}
	}

	private runAction() {
		let time = 100;
		this.timeOut = setInterval(() => {
			for (let index = 0; index < this.dotMax; index ++) {
				let node = this.nodeIndiatorS[index];
				let i = (this.index + index) % this.dotMax;
				if (node) {
					node.scale = this.scale[i];
					node.opacity = this.opacity[i];
				}
			}
			this.index += 1;
			if (this.index >= this.dotMax) {
				this.index = 0;
			}
		}, 100);
	}

	private clearTimeOut() {
		if (this.timeOut) {
			clearInterval(this.timeOut);
			this.timeOut = null;
		}
	}
	// ///////////////////////////
	// ///view层
	// /////////////////////////
}