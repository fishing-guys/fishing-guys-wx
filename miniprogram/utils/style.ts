/**
 * rpx转px
 * @param rpx rpx值
 * @returns px值
 */
export function rpx2px(rpx: number) {
  return (wx.getSystemInfoSync().windowWidth / 750) * rpx;
}

/**
 * px转rpx
 * @param px px值
 * @returns rpx值
 */
export function px2rpx(px: number) {
  return px * (750 / wx.getSystemInfoSync().windowWidth);
}
