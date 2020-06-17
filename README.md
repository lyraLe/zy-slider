# zy-slider
薪资滑杆
<img src="https://github.com/lyraLe/zy-slider/blob/master/shot.jpg" />

一个选择数值范围的slider，双向可以滑动

先在要使用的地方的json文件中引入该组件
```
{
  "usingComponents": {
      "zy-slider": "../../component/zyslider"
  },
  "navigationBarTitleText": "zy-slider"
}
```

然后在wxml中使用
```
<view class="zy-slider">
    <zy-slider minValue="0" maxValue="100" min="0" max="100" bind:lowValueChange="lowValueChangeAction"
                bind:heighValueChange="heighValueChangeAction" />
</view>
```

###### 参数说明：
```
min: Number/String slider 最小值
max: Number/String slider 最大值
minValue: Number/String slider 左边滑块初始位置
maxValue: Number/String slider 右边滑块初始位置
bind:lowValueChange : function 左边滑块回调 {lowValue：lowValue}
bind:heighValueChange : function  右边滑块回调 {heighValue：heighValue}
blockColor : String slider 圆形滑块颜色（默认 #19896f）
backgroundColor : String slider 背景条的颜色（默认 #ddd）
selectedColor : String slider 已选择部分的颜色（默认 #19896f）
```

