//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  goToRepair: function() {
    wx.navigateTo({
      url: '../repair/login/login',
    })
  },
  goToMainTainer: function() {
    wx.navigateTo({
      url: '../maintainer/login/login',
    })
  },

  

})