import NetworkActivityIndicator from "../../resources/prefab/networkActivityIndicator/networkActivityIndicator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

	// ///////////////////////////
	// ///属性检查器
	// /////////////////////////
	@property(cc.Prefab)
	private prefab_networkActivity: cc.Prefab = null;
	// ///////////////////////////
	// ///成员变量
	// /////////////////////////
	private network: NetworkActivityIndicator;
	// ///////////////////////////
	// ///cc.class 生命周期函数
	// /////////////////////////
	protected onLoad() {
		let node = cc.instantiate(this.prefab_networkActivity);
		this.network = node.getComponent(NetworkActivityIndicator);
		this.node.addChild(node);
	}
	// ///////////////////////////
	// ///事件
	// /////////////////////////
	private onClick() {
		this.network.show();
		setTimeout(() => {
			this.network.hide();
		},3000);
	}
	// ///////////////////////////
	// ///业务逻辑(control层)
	// /////////////////////////

	// ///////////////////////////
	// ///view层
	// /////////////////////////
}
