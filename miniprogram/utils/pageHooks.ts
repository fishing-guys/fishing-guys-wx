/**
 * 更新tabBar选中状态
 * @param pageInstance tabBar页面
 */
export function updateCustomTabBarSelected(
  pageInstance: WechatMiniprogram.Page.Instance<
    WechatMiniprogram.IAnyObject,
    WechatMiniprogram.IAnyObject
  >
) {
  if (typeof pageInstance.getTabBar === "function") {
    pageInstance.getTabBar()?.init();
  }
}
