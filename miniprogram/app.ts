import { calcAppSystemInfo } from "./utils/appSystemInfo";

// app.ts
App<IAppOption>({
  globalData: {
    systemInfo: {
      statusBarHeight: 0,
      navBarHeight: 0,
      topOccupiedHeight: 0,
      deviceOrientation: "portrait",
      leftSafetyAreaWidth: 0,
      rightSafetyAreaWidth: 0,
      topSafetyAreaHeight: 0,
      menuButtonOccupiedWidth: 0,
    },
  },
  onLaunch() {
    this.globalData.systemInfo = calcAppSystemInfo();

    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    wx.login({
      success: (res) => {
        console.log("用户登录凭证（有效期五分钟）:", res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
});
