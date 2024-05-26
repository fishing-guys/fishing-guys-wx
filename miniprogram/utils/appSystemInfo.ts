import { getAppGlobalData } from "./globalAppData";

/**
 * 计算系统各类信息
 */
export function calcAppSystemInfo(): AppSystemInfo {
  const systemInfo = wx.getSystemInfoSync();
  const { safeArea, statusBarHeight, windowWidth } = systemInfo;

  const menuButtonRectInfo = wx.getMenuButtonBoundingClientRect();
  const {
    width: menuButtonWidth,
    height: menuButtonHeight,
    top: menuButtonTop,
    right: menuButtonRight,
  } = menuButtonRectInfo;

  const menuButtonMarginTop = menuButtonTop - statusBarHeight;

  const navBarHeight = menuButtonHeight + menuButtonMarginTop * 2;

  const topOccupiedHeight = navBarHeight + statusBarHeight;

  const menuButtonMarginRight = windowWidth - menuButtonRight;

  const menuButtonOccupiedWidth = menuButtonWidth + menuButtonMarginRight * 2;

  return {
    systemInfo,
    menuButtonRectInfo,
    safeArea,
    statusBarHeight,
    navBarHeight,
    topOccupiedHeight,
    menuButtonOccupiedWidth,
    leftSafetyAreaWidth: safeArea.left,
    rightSafetyAreaWidth: safeArea.right,
    topSafetyAreaHeight: safeArea.top,
    deviceOrientation: systemInfo.deviceOrientation,
  };
}

/**
 * 更新系统各类信息(安全区信息以及屏幕旋转方向)
 */
export function updateAppSystemInfo() {
  getAppGlobalData().systemInfo = calcAppSystemInfo();
}
