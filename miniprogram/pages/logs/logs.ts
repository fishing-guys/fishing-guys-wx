import { formatTime } from "@/utils/format";

Component({
  data: {
    logs: [],
  },
  lifetimes: {
    attached() {
      this.setData({
        logs: (wx.getStorageSync("logs") || []).map((log: string) => {
          return {
            date: formatTime(new Date(log)),
            timeStamp: log,
          };
        }),
      });
    },
  },
});
