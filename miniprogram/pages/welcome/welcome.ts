import {
  getSession as apiGetSession,
  getPhoneNumber as apiGetPhoneNumber,
} from "./service";

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  handleLogin(phoneNumberCode?: string) {
    wx.login({
      success: async (res: { code: string; errMsg: string }) => {
        if (res.errMsg !== "login:ok" || !res.code) return;

        try {
          wx.showLoading({ title: "" });

          const sessionRes = await apiGetSession({ jsCode: res.code });

          if (phoneNumberCode) {
            const phoneNumberRes = await apiGetPhoneNumber({
              openId: sessionRes.openid,
              code: phoneNumberCode,
            });
            console.log("phoneNumber", phoneNumberRes);
            // TODO: ⬇️
            // 保存用户手机号
          }

          wx.setStorageSync("session", sessionRes);

          /** 登录成功跳转首页 */
          wx.navigateTo({ url: "/pages/guide/index/index" });
        } catch (error) {
          wx.showToast({
            title: error,
            icon: "none",
            duration: 3000,
          });

          /** TODO: 开发测试用 */
          wx.navigateTo({ url: "/pages/guide/index/index" });
        } finally {
          wx.hideLoading();
        }
      },
      fail: (err) => {
        wx.showToast({
          title: err.errMsg,
          icon: "none",
          duration: 3000,
        });
      },
    });
  },

  /**
   * 获取手机号回调
   * 用户同意隐私协议后才会触发
   */
  handleGetPhoneNumber(e: {
    detail: {
      /** 动态令牌 */
      code: string;
      /** 回调信息（成功失败都会返回） */
      errMsg: string;
      /** 错误码（失败时返回） */
      errno: number;
    };
  }) {
    console.log("getphonenumber", e);
    /** 手机号为可选 不允许获取也能登录*/
    this.handleLogin(e.detail.code);
  },

  /**
   * 用户同意隐私协议事件回调
   * 用户点击了同意，之后所有已声明过的隐私接口和组件都可以调用了
   * wx.getUserProfile()
   * wx.chooseMedia()
   * wx.getClipboardData()
   * wx.startRecord()
   * ...
   */
  handleAgreePrivacyAuthorization(e: {
    detail: {
      code: string;
      errMsg: string;
      errno: number;
    };
  }) {
    console.log("agreeprivacyauthorization", e);
  },
});
