import NetworkActivityIndicator from '../../resources/prefab/networkActivityIndicator/networkActivityIndicator';


const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

	// ///////////////////////////
	// ///属性检查器
	// /////////////////////////

	// ///////////////////////////
	// ///成员变量
	// /////////////////////////

	// ///////////////////////////
	// ///cc.class 生命周期函数
	// /////////////////////////

	// ///////////////////////////
	// ///事件
	// /////////////////////////
	private onClickShowBtnEvent(event: cc.Event) {
		NetworkActivityIndicator.getInstance().show();
		this.scheduleOnce(() => {
			NetworkActivityIndicator.getInstance().hide();
		}, 2);
	}
	// ///////////////////////////
	// ///业务逻辑(control层)
	// /////////////////////////

	// ///////////////////////////
	// ///view层
	// /////////////////////////
}
