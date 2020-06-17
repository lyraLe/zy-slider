// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    low: 0,
    high: 100,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  lowValueChangeAction: function (e) {
    this.setData({
      low: e.detail.lowValue
    })
  },

  highValueChangeAction: function (e) {
    this.setData({
      high: e.detail.highValue
    })
  },


  hideSlider: function (e) {
    this.selectComponent("#zy-slider").hide()
    this.selectComponent("#zy-slider1").hide()
  },

  showSlider: function (e){
    this.selectComponent("#zy-slider").show()
    this.selectComponent("#zy-slider1").show()
  },

  resetSlider: function (e){
    this.selectComponent("#zy-slider").reset()
    this.selectComponent("#zy-slider1").reset()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})