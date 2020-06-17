var util = require('../utils/util')
// component/zyslider/zyslider.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /** slider 最小值 */
    min: {
      type: Number
    },
    /** slider 最大值 */
    max: {
      type: Number
    },
    /** 步进 （没做，有时间再说，项目里没用到撒） */
    step: {
      type: Number
    },
    /** 预选选择的小值*/
    minValue: {
      type: Number
    },
    /** 预选选择的大值 */
    maxValue: {
      type: Number
    },
    /** 滑块颜色 */
    blockColor: {
      type: String
    },
    /** 未选择进度条颜色 */
    backgroundColor: {
      type: String
    },
    /** 已选择进度条颜色 */
    selectedColor: {
      type: String
    }
  },
  observers: {
    'maxValue': function (numberA, numberB) {
      this._propertyRightValueChange()
    },
    'minValue': function (numberA, numberB) {
      this._propertyLeftValueChange()
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    min: 0,
    max: 100,
    leftValue: 0,
    rightValue: 100,
    totalLength: 0,
    bigLength: 0,
    ratio: 0.5,
    sliderLength: 40,
    containerLeft: 0, //标识整个组件，距离屏幕左边的距离
    hideOption: '', //初始状态为显示组件
    timer: null,
    previous: 0,
    lowValue: 0,
    highValue: 100,
    minZ: 2,
    maxZ: 2
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 设置左边滑块的值
     */
    _propertyLeftValueChange: function () {
      let minValue = this.data.minValue / this.data.max * this.data.bigLength;
      let min = this.data.min / this.data.max * this.data.bigLength;
      this.setData({
        leftValue: minValue - min
      })
    },

    /**
     * 设置右边滑块的值
     */
    _propertyRightValueChange: function () {
      let right = this.data.maxValue / this.data.max * this.data.bigLength + this.data.sliderLength;
      this.setData({
        rightValue: right,
        lowValue: this.data.minValue,
        highValue: this.data.maxValue
      })
    },
    /**
     * 左边滑块滑动
     */
    _minMove: function (e) {
      this.debounce(this.minMoveEvent(e, false), 100);
    },
    minMoveEvent(e, flag) {
      if (this.data.minValue === this.data.maxValue) {
        this.setData({
          maxZ: 1,
          minZ: 2
        })
      }
      let pagex = e.changedTouches[0].pageX / this.data.ratio - this.data.containerLeft - this.data.sliderLength / 2;
      if (pagex >= this.data.rightValue) {
        pagex = this.data.rightValue;
        this.setData({
          maxZ: 1,
          minZ: 2
        })
      } else if (pagex <= 0) {
        pagex = 0;
      }
      this.setData({
        leftValue: pagex
      })
      let lowValue = parseInt(pagex / this.data.totalLength * parseInt(this.data.max - this.data.min) + this.data.min)
      var myEventDetail = {
        lowValue,
        flag
      }
      this.setData({
        leftValue: pagex,
        lowValue
      })
      if (flag) {
        this.triggerEvent('lowValueChange', myEventDetail)
      }
    },
    _minMoveEnd(e, flag) {
      this.minMoveEvent(e, true);
    },
    maxMoveEvent(e, flag) {
      if (this.data.minValue === this.data.maxValue) {
        this.setData({
          maxZ: 2,
          minZ: 1
        })
      }
      let pagex = e.changedTouches[0].pageX / this.data.ratio - this.data.containerLeft - this.data.sliderLength / 2;
      if (pagex <= this.data.leftValue) {
        pagex = this.data.leftValue;// + this.data.sliderLength
        this.setData({
          maxZ: 2,
          minZ: 1
        })
      } else if (pagex >= this.data.totalLength) {
        pagex = this.data.totalLength
      }
      let highValue = parseInt(pagex / this.data.totalLength * (this.data.max - this.data.min) + this.data.min)
      var myEventDetail = {
        highValue,
        flag
      }
      this.setData({
        rightValue: pagex,
        highValue
      })
      if (flag) {
        this.triggerEvent('highValueChange', myEventDetail)
      }
    },
    _maxMoveEnd(e) {
      this.maxMoveEvent(e, true);
    },
    debounce: function (fn, interval) {
      var timer;
      var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
      return function () {
        clearTimeout(timer);
        var context = this;
        var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
        timer = setTimeout(function () {
          fn.call(context, args);
        }, gapTime);
      };
    },
    throttleMin: function (e) {
      let current = Date.now();
      if (current - this.data.previous > 50) {
        this.minMoveEvent(e, false);
        this.data.previous = Date.now();
      }
    },
    throttleMax: function (e) {
      let current = Date.now();
      if (current - this.data.previous > 50) {
        this.maxMoveEvent(e, false);
        this.data.previous = Date.now();
      }
    },
    /**
     * 隐藏组件
     */
    hide: function () {
      this.setData({
        hideOption: 'hide',
      })
    },
    /**
     * 显示组件
     */
    show: function () {
      this.setData({
        hideOption: '',
      })
    },
    /**
     * 重置
     */
    reset: function () {
      this.setData({
        rightValue: this.data.totalLength,
        leftValue: 0,
      })
    },

  },

  ready: function () {
    const that = this;
    util.wxPromisify(wx.getSystemInfo)()
      .then(res => {
        let ratio = res.windowWidth / 750
        that.setData({
          ratio: ratio,
        })
      })
      .then(() => {
        var query = wx.createSelectorQuery().in(this)
        query.select(".container").boundingClientRect(function (res) {
          that.setData({
            totalLength: res.width / that.data.ratio - that.data.sliderLength,
            bigLength: res.width / that.data.ratio - that.data.sliderLength * 2,
            rightValue: res.width / that.data.ratio - that.data.sliderLength,
            containerLeft: res.left / that.data.ratio,
          })
          /**
           * 设置初始滑块位置
           */
          that._propertyLeftValueChange();
          that._propertyRightValueChange();
        }).exec()
      })
  }
})