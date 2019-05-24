
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
	private static instance: NetworkActivityIndicator;
	// ///////////////////////////
	// ///cc.class 生命周期函数
	// /////////////////////////

	protected onLoad() {
		cc.game.addPersistRootNode(this.node);
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
	public static getInstance() {
		return new Promise()
		if (!this.instance) {
			let path = 'prefab/networkActivityIndicator/prefab_networkActivityIndicator';
			cc.loader.loadRes(path, cc.Prefab, (error, resource) => {
				if (error) {
					console.log('3_networkActivityIndicator.ts', error);
					return;
				}
				let node = cc.instantiate(resource);
				cc.director.getScene().getChildByName('Canvas').addChild(node);
				this.instance = node.getComponent(NetworkActivityIndicator);
			});
		}
		return this.instance;
	}

	public show() {
		this.node.active = true;
		this.init();
		this.runAction();
	}

	public hide() {
		this.node.active = false;
		this.clearTimeOut();
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
		this.timeOut = setTimeout(() => {
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
			this.timeOut.clearTimeout();
		}
	}
	// ///////////////////////////
	// ///view层
	// /////////////////////////
}

// export const NetworkActivityIndicator = M.getInstance();