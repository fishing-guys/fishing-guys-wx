import { getAppGlobalData } from "@/utils/globalAppData";

const backgroundImageSrcMap: Record<string, string> = {
  none: "",
  primary: "/assets/images/common/navigation-bar-bg.png",
};

/**
 * 顶部导航组件
 */
Component<
  {
    displayStyle: string;
    displayCustomStyle: string;
    backgroundImageSrc: string;
  },
  {
    back: {
      type: BooleanConstructor;
      value: false;
    };
    fixed: {
      type: BooleanConstructor;
      value: true;
    };
    menuButtonOccupied: {
      type: BooleanConstructor;
      value: false;
    };
    backgroundImageType: {
      type: StringConstructor;
      value: "none";
      observer: () => void;
    };
    background: {
      type: StringConstructor;
      value: "#f3f3f3";
      observer: () => void;
    };
    style: {
      type: StringConstructor;
      value: "";
      observer: () => void;
    };
    title: {
      type: StringConstructor;
      value: "";
    };
  },
  {
    onBack(): void;
    handleClickRight(): void;
    buildDisplayStyle(): void;
    buildDisplayCustomStyle(): void;
    updateBackgroundImage(): void;
  },
  {
    statusBarHeight: number;
    navBarHeight: number;
    menuButtonHeight: number;
    menuButtonOccupiedWidth: number;
  }
>({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 是否显示后退按钮. 默认:false
     */
    back: {
      type: Boolean,
      value: false,
    },
    fixed: {
      type: Boolean,
      value: true,
    },
    title: {
      type: String,
      value: "",
    },
    /**
     * 导航右侧预留胶囊占位
     */
    menuButtonOccupied: {
      type: Boolean,
      value: false,
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
    background: {
      type: String,
      value: "#f3f3f3",
      observer() {
        wx.nextTick(() => {
          this.buildDisplayCustomStyle();
        });
      },
    },
    style: {
      type: String,
      value: "",
      observer() {
        wx.nextTick(() => {
          this.buildDisplayCustomStyle();
        });
      },
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: "",
    displayCustomStyle: "",
    backgroundImageSrc: "",
  },
  lifetimes: {
    attached() {
      const { systemInfo } = getAppGlobalData();
      this.statusBarHeight = systemInfo.statusBarHeight;
      this.navBarHeight = systemInfo.navBarHeight;
      this.menuButtonHeight =
        systemInfo.menuButtonRectInfo?.height || systemInfo.statusBarHeight;
      this.menuButtonOccupiedWidth = systemInfo.menuButtonOccupiedWidth;

      this.buildDisplayStyle();
      this.buildDisplayCustomStyle();
      this.updateBackgroundImage();
    },
    ready() {
      wx.nextTick(() => {
        this.triggerEvent("mounted");
      });
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onBack() {
      wx.navigateBack({ delta: 1 });
    },

    handleClickRight() {
      this.triggerEvent("click-right");
    },

    buildDisplayStyle() {
      const displayStyleList = [];

      displayStyleList.push(`--nav-bar-height: ${this.navBarHeight}px`);
      displayStyleList.push(`--status-bar-height: ${this.statusBarHeight}px`);
      displayStyleList.push(`--menu-button-height: ${this.menuButtonHeight}px`);
      displayStyleList.push(
        `--menu-button-occupied-width:${this.menuButtonOccupiedWidth}px`
      );

      this.setData({ displayStyle: `${displayStyleList.join("; ")}` });
    },

    buildDisplayCustomStyle() {
      let displayCustomStyle = "background-color: transparent;";

      if (this.properties.style) {
        displayCustomStyle += this.properties.style;
      }

      if (
        this.properties.backgroundImageType === "none" &&
        this.properties.background
      ) {
        displayCustomStyle += `background:${this.properties.background};`;
      }

      this.setData({ displayCustomStyle });
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
