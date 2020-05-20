// pages/repair/orderform/create/create.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: null,
    sortArray: null, //用于展示的种类数组
    sortIndex: null, //用于展示的种类数组索引
    location: null,
    locationArray: null, //用于展示的地区数组
    locationIndex: null, //用于展示的地区数组索引
    tempFilePath: null,
    repair_image: null,
    index: 0,
    filepath: "",
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var get_data = require('../../../getData/orderform/get_data.js');
    var location_data = get_data.get_locations_data();
    var sort_data = get_data.get_sorts_data();
    // console.log(sort_data);
    this.setData({
      sort: sort_data[0][0],
      sortArray: [sort_data[0], sort_data[1][0]],
      sortIndex: [0, 0],
      location: location_data[0][0] + " " + location_data[1][0][0],
      locationArray: [location_data[0], location_data[1][0]],
      locationIndex: [0, 0]
    })
    // console.log(this.data.locationArray);
  },

  //地区选择发生改变
  bindLocationChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      locationIndex: e.detail.value,
      location: this.data.locationArray[0][e.detail.value[0]] + this.data.locationArray[1][e.detail.value[1]]
    })

  },
  //地区选择查询
  bindLocationColumnChange: function(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      locationArray: this.data.locationArray,
      locationIndex: this.data.locationIndex
    };
    data.locationIndex[e.detail.column] = e.detail.value;

    var get_data = require('../../../getData/orderform/get_data.js');
    var location_data = get_data.get_locations_data();
    if (e.detail.column + 1 < location_data.length) {
      data.locationArray[e.detail.column + 1] = location_data[1][e.detail.value];
    }


    this.setData(data);
  },


  //维修种类选择发生改变
  bindSortChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.sortArray[1][e.detail.value[1]])
    this.setData({
      sortIndex: e.detail.value,
      sort: this.data.sortArray[1][e.detail.value[1]]
    })
    console.log(this.data.sort)
  },
  //维修种类选择查询
  bindSortColumnChange: function(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      sortArray: this.data.sortArray,
      sortIndex: this.data.sortIndex
    };
    data.sortIndex[e.detail.column] = e.detail.value;

    var get_data = require('../../../getData/orderform/get_data.js');
    var sort_data = get_data.get_sorts_data();
    if (e.detail.column + 1 < sort_data.length) {
      data.sortArray[e.detail.column + 1] = sort_data[1][e.detail.value];
    }

    // console.log(e.detail.column);

    this.setData(data);
  },



  onLoad: function (options) {
    this.ctx = wx.createCameraContext()
  },




/**
 * 上传图片
 */
  uploadIMG: function() {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizesort: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourcesort: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths[0];
        that.setData({
          tempFilePath: tempFilePath
        });

        /**
         * 上传完成后把文件上传到服务器
         */

        //上传文件
        wx.uploadFile({
          url: wx.getStorageSync('UploadUrl'),
          filePath: tempFilePath,
          name: 'uploadIMG',
          header: {
            "Content-sort": "multipart/form-data"
          },
          success: function (res) {
            that.setData({ 'repair_image': JSON.parse(res.data).data });
            wx.hideToast();
          },
          fail: function (res) {
            wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
              success: function (res) { }
            })
          }
        });


      }
    })
  },

 

  /**
   * 提交维修工单
   */
  formSubmit: function(e) {
   
    var form = e.detail.value;
    // console.log(form);
    let that = this;
    var location = this.data.location;
    var sort = this.data.sort;
    console.log(sort)
    if (location == null) {
      wx.showToast({
        title: '请选择维修地区!',
        icon: 'none'
      });
      return false;
    }
    if (sort == null) {
      wx.showToast({
        title: '请选择维修种类!',
        icon: 'none'
      })
      return false;
    }
    console.log(sort)
    var SID = sort.ID;
    var user = wx.getStorageSync('user');
    var description = form.description;
    var remarks = form.remarks==""?'无':form.remarks;
    var contact_person = form.contact_person;
    var contact_number = form.contact_number;
    var locationDetail = form.locationDetail;
    var orderform = {
      'rid': user.id,
      'sid': SID,
      'location': location + locationDetail,
      'description': description,
      'remarks': remarks,
      'contact_person': contact_person,
      'contact_number': contact_number,
      'repair_image': this.data.repair_image
    }


    //向后端发送请求
    wx.request({  //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/create", //url
      method: 'POST', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: orderform,
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '提交成功!',
            icon: 'success',
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/orderform/orderform'
                })
              }, 1000)
            }
          });

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }

      },
      fail: function () {
        app.consoleLog("请求数据失败");
      },
      complete: function () {
        // complete 
      }
    })
  },


  check_contact_person: function(e) { //验证联系人
    // console.log(e.detail.value);
    var username = e.detail.value;
    if (username == '' || username == null) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none'
      })
      return false;
    }
    return true;
  },

  check_contact_number: function(e) { //验证联系方式
    // console.log(e.detail.value);
    var phone = e.detail.value;
    if (phone == '' || phone == null) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return true;
  },


})