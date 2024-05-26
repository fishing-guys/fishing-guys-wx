var gulp = require("gulp");
var postcss = require("gulp-postcss");
var pxtounits = require("postcss-px2units");

// 将vant的wxss中的px单位,全部转为rpx单位
gulp.task("css", function () {
  return gulp
    .src(["miniprogram/miniprogram_npm/@vant/weapp/**/*.wxss"])
    .pipe(
      postcss([
        pxtounits({
          multiple: 2,
          targetUnits: "rpx",
        }),
      ])
    )
    .pipe(gulp.dest("miniprogram/miniprogram_npm/@vant/weapp/"));
});
