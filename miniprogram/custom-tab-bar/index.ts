/**
 * 底部tab组件
 */
Component({
  data: {
    bgTextStyle: "dark",
    scrollTop: "200rpx",
    bgColor: "#ff0000",
    bgColorTop: "#00ff00",
    bgColorBottom: "#0000ff",
    nbTitle: "标题",
    nbLoading: false,
    nbFrontColor: "#000000",
    nbBackgroundColor: "#ffffff",

    hidden: false,
    selected: 0,
    color: "#000000",
    selectedColor: "#3e62ed",
    list: [
      {
        pagePath: "/pages/home/home",
        iconName: "wap-home-o",
        text: "主页",
      },
      {
        pagePath: "/pages/home/home",
        iconName: "user-o",
        text: "专家",
      },
    ],
  },

  lifetimes: {
    attached() {
      this.init();
    },
  },

  methods: {
    init() {
      const page = getCurrentPages().pop();
      if (page) {
        let curPageRoute = page.route;
        curPageRoute = curPageRoute.startsWith("/")
          ? curPageRoute
          : `/${curPageRoute}`;
        const idx = this.data.list.findIndex(
          (item) => item.pagePath === curPageRoute
        );
        if (idx >= 0) {
          this.setData({ selected: idx });
        }
      }
    },

    switchTab(e: WechatMiniprogram.CustomEvent) {
      const selectedIndex = (e.detail as unknown) as number;
      const tabInfo = this.data.list[selectedIndex];
      if (tabInfo) {
        const url = `${tabInfo.pagePath}`;
        wx.switchTab({ url });
      }
      this.setData({ selected: selectedIndex });
    },

    /**
     * 隐藏 tabBar
     */
    hideTabBar() {
      this.setData({ hidden: true });
    },

    /**
     * 显示 tabBar
     */
    showTabBar() {
      this.setData({ hidden: false });
    },
  },
});
