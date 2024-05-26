/**
 * 获取全局数据
 */
export function getAppGlobalData() {
  const app = getApp<IAppOption>();
  return app.globalData;
}

/**
 * 顶部导航已占用高度
 */
export function getTopOccupiedHeight() {
  return getAppGlobalData().systemInfo.topOccupiedHeight;
}
