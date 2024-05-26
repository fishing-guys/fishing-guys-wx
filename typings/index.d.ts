interface AppSystemInfo {
  /**
   * 系统信息
   */
  systemInfo?: WechatMiniprogram.SystemInfo;
  /**
   * 胶囊大小/边界信息
   */
  menuButtonRectInfo?: WechatMiniprogram.ClientRect;
  /**
   * 状态栏高度
   */
  statusBarHeight: number;
  /**
   * 安全区信息
   */
  safeArea?: WechatMiniprogram.SafeArea;
  /**
   * 自定义导航条应该设置的高度
   */
  navBarHeight: number;
  /**
   * 顶部导航已占用高度
   *
   * 顶部已占用高度 = 状态栏高度 + 自定义导航条应该设置的高度
   *
   * 如果存在安全区，则安全区高度就是状态栏高度
   */
  topOccupiedHeight: number;
  /**
   * 设备方向 默认: 竖屏(portrait)
   *
   * landscape: 横屏
   *
   * portrait: 竖屏
   */
  deviceOrientation: "landscape" | "portrait";
  /**
   * 左侧安全区宽度
   */
  leftSafetyAreaWidth: number;
  /**
   * 顶部安全区高度
   */
  topSafetyAreaHeight: number;
  /**
   * 右侧安全区宽度
   */
  rightSafetyAreaWidth: number;
  /**
   * 胶囊占用的宽度
   */
  menuButtonOccupiedWidth: number;
}

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
    systemInfo: AppSystemInfo;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
