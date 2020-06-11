// pages/repair/orderform/edit/edit.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    before: true,  //是否展示修改前的图片
    after: false,  //是否展示修改后的图片
    orderform: null,
    oid: null,
    fileList:null,
    repair_image:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.ID);
    var oid = options.ID;
    let that = this;
    that.setData({oid: oid})
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/details/" + oid, //url
      method: 'GET', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: function (res) {
        if (res.data.status == 200) {
          // console.log(res.data.data)
          var image = res.data.data.repair_image;
          that.setData({
            orderform: res.data.data,
            fileList: [{url: image}]
          });

          var orderform_status = res.data.data.status;

          

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }

      },
      fail: function () {
      
      },
      complete: function () {
        // complete 
      }
    })



  },



  get_contact_person: function (event) {
    var contact_person = event.detail.value;
    if (contact_person == null || contact_person == '') {
      wx.showToast({
        title: '请填写联系人信息!',
        icon: 'none'
      })
    } else {
      this.setData({ contact_person: contact_person })
    }

  },

  get_contact_number: function (event) {
    var contact_number = event.detail.value;
    if (contact_number == null || contact_number == '') {
      wx.showToast({
        title: '请填写联系电话!',
        icon: 'none'
      })
      return
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(contact_number)) {
      wx.showToast({
        title: '请输入正确的联系电话！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }

    this.setData({ contact_number: contact_number })


  },

  get_description: function (event) {
    var description = event.detail.value;
    if (description == null || description == '') {
      wx.showToast({
        title: '请填写故障描述!',
        icon: 'none'
      })
    } else {
      this.setData({ description: description })
    }

  },

  get_remarks: function (event) {
    var remarks = event.detail.value;
    if (remarks == null || remarks == '') {
      this.setData({ remarks: '无' })
    } else {
      this.setData({ remarks: remarks })
    }

  },

  afterRead(event) {  //上传图片
    let that = this;

    const { file } = event.detail;


    /**
        * 上传完成后把文件上传到服务器
        */

    //上传文件
    wx.uploadFile({
      url: wx.getStorageSync('UploadUrl'),
      filePath: file.path,
      name: 'uploadIMG',
      header: {
        "Content-sort": "multipart/form-data"
      },
      success: function (res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: JSON.parse(res.data).data });
        that.setData({ fileList });
        that.setData({
          'repair_image': JSON.parse(res.data).data
        });

      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '上传图片失败',
          showCancel: false,
          success: function (res) { }
        })
      }
    });
  },


  deleteIMG: function(){
    this.setData({ fileList: []})
  },


  update: function () {
    let that = this;

    var description = this.data.description;
    var remarks = this.data.remarks == null ? '无' : this.data.remarks;
    var contact_person = this.data.contact_person;
    var contact_number = this.data.contact_number;
    var repair_image = this.data.repair_image;

    
    if (description == null || description == '') {
      description = this.data.orderform.description;
    }
    if (contact_person == null || contact_person == ''){
      contact_person = this.data.orderform.contact_person;
    }
    if (remarks == null || remarks == '') {
      remarks = this.data.orderform.remarks;
    }
    if (contact_number == null || contact_number == '') {
      contact_number = this.data.orderform.contact_number;
    }
    if (repair_image == null || repair_image == '') {
      repair_image = this.data.orderform.repair_image;
    }

    var orderform = {
      'description': description,
      'remarks': remarks,
      'contact_person': contact_person,
      'contact_number': contact_number,
      'repair_image': repair_image
    }

    //向后端发送请求
    wx.request({  //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/edit/" + that.data.oid, //url
      method: 'PUT', //请求方式
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
   
      },
      complete: function () {
        // complete 
      }
    })

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



  uploadIMG: function () {
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
            that.setData({ 
              'repair_image': JSON.parse(res.data).data,
              'before': false,
              'after': true
             });
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

  

  formSubmit: function (e) {
    var form = e.detail.value;
    // console.log(form);
    let that = this;



    var description = form.description;
    var remarks = form.remarks;
    var contact_person = form.contact_person;
    var contact_number = form.contact_number;

    var orderform = {
      'description': description,
      'remarks': remarks,
      'contact_person': contact_person,
      'contact_number': contact_number,
      'repair_image': this.data.repair_image
    }
    console.log(orderform);
   
    //向后端发送请求
    wx.request({  //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/edit/"+that.data.oid, //url
      method: 'PUT', //请求方式
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


  check_contact_person: function (e) { //验证联系人
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

  check_contact_number: function (e) { //验证联系方式
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