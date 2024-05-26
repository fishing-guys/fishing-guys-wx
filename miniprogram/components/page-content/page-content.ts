import { getAppGlobalData } from "@/utils/globalAppData";

const backgroundImageSrcMap: Record<string, string> = {
  none: "",
  primary: "/assets/images/common/content-bg.png",
};

Component<
  {},
  {
    hasBottomTab: {
      type: BooleanConstructor;
      value: boolean;
      observer: () => void;
    };
    backgroundImageType: {
      type: StringConstructor;
      value: "none" | "primary";
      observer: () => void;
    };
  },
  {
    updateDispalyClass: () => void;
    updateBackgroundImage: () => void;
  }
>({
  options: {
    /**
     * 在组件定义时的选项中启用多slot支持
     */
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 当前页面是否包含底部tab组件
     * 默认 false
     * 当设置为false，则不计算底部导航条高度，也不计算底部安全区高度
     */
    hasBottomTab: {
      type: Boolean,
      value: false,
      observer() {
        wx.nextTick(() => {
          this.updateDispalyClass();
        });
      },
    },
    /**
     * page-content背景色
     * 默认 none 没有背景色
     */
    backgroundImageType: {
      type: String,
      value: "none",
      observer() {
        wx.nextTick(() => {
          this.updateBackgroundImage();
        });
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: "",
    dispalyClass: "page-content-height",
    backgroundImageSrc: "",
  },
  lifetimes: {
    attached() {
      const { systemInfo } = getAppGlobalData();
      const { topOccupiedHeight } = systemInfo;
      const displayStyle = `--top-occupied-height:${topOccupiedHeight}px;`;

      this.setData({
        displayStyle,
      });

      this.updateDispalyClass();

      this.updateBackgroundImage();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateDispalyClass() {
      this.setData({
        dispalyClass: this.properties.hasBottomTab
          ? "page-content-height-has-bottom-tab"
          : "page-content-height",
      });
    },
    updateBackgroundImage() {
      const backgroundImageSrc =
        backgroundImageSrcMap[this.properties.backgroundImageType] || "";

      this.setData({
        backgroundImageSrc,
      });
    },
  },
});
