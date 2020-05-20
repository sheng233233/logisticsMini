// pages/orderform/orderform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    user_type:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let that = this;
    var user = wx.getStorageSync('user');
    that.setData({
      user: user  //设置页面data的user
    });
    if (user == null) {//判断是否登录过
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
    if (user.password == 'default'){ //修改默认密码
      wx.navigateTo({
        url: '/pages/account/site_pwd/site_pwd',
      })
    }
    var user_type = wx.getStorageSync('user_type');
    that.setData({
      user_type: user_type  //设置页面data的user_type
    });
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

  },

  /**
   * 报修人员去往工单申请页面
   */
  to_create: function () {
    wx.navigateTo({ 
      url: '../repair/orderform/create/create',
    })
  },

  /**
   * 报修人员去往历史工单页面
   */
  to_history:function(){
    wx.navigateTo({
      url: '../repair/orderform/history/history',
    })
  },

  /**
   * 维修人员去往被分配工单页面
   */
  to_allocated:function(){
    wx.navigateTo({
      url: '../maintainer/orderform/list/list?status=allocated',
    })
  },

  /**
   * 维修人员去往已接受工单页面
   */
  to_accept: function () {
    wx.navigateTo({
      url: '../maintainer/orderform/list/list?status=accept',
    })
  },

  /**
   * 维修人员去往历史订单页面
   */
  to_all: function () {
    wx.navigateTo({
      url: '../maintainer/orderform/list/list?status=all',
    })
  }
})