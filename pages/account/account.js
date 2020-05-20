// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    user_type: null,
    isMaskWindowShow: false,
    old_pwd: ""
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
      user: user,  //设置页面data的user
      isMaskWindowShow: false
    });
    if (user == null) {//判断是否登录过
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
    if (user.password == 'default') { //修改默认密码
      wx.navigateTo({
        url: '/pages/account/site_pwd/site_pwd',
      })
    }
    var user_type = wx.getStorageSync('user_type');
    that.setData({
      user_type: user_type  //设置页面data的user_type
    });

  },

  logout: function () { //登出
    wx.setStorage({
      key: 'user',
      data: null,
    });
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },

  to_edit_info: function () { //修改账号信息
    wx.navigateTo({
      url: 'edit/edit_info',
    })
  },

  to_edit_pwd: function () { //修改密码
    this.setData({
      isMaskWindowShow: true
    })
  },

  // 弹框以外区域点击
  maskWindowBgClick: function (e) {
    this.dismissMaskWindow();
  },

  //弹窗区域点击事件
  clickTap: function (e) {

  },


  //输入框输入绑定事件
  //获得输入的旧密码
  maskWindowInput: function (e) {
    var value = e.detail.value;
    this.setData({
      old_pwd: value
    })
  },

//验证用户旧密码
  maskWindowOk: function (e) {
  //  console.log(this.data.old_pwd);
   var user = wx.getStorageSync('user');
    if (this.data.old_pwd == user.password){
      wx.navigateTo({
        url: 'edit/edit_pwd',
      })
      // console.log('ok');
   }else{
      wx.showToast({
        title: '验证未通过\n请输入正确的密码',
        icon: 'none'
      })
   }
    
  },

  maskWindowCancel: function (e) {
    this.dismissMaskWindow();
  },

  // 显示蒙版弹窗
  showMaskWindow: function () {
    this.setData({
      isMaskWindowShow: true,
      old_pwd: ""
    })
  },

  // 隐藏蒙版窗体
  dismissMaskWindow: function () {
    this.setData({
      isMaskWindowShow: false,
      old_pwd: ""
    })
  }
})