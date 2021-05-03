/*
ajax请求函数模块
返回值：promise对象 (异步返回的数据是：response.data)
 */
import axios from 'axios'
export default function ajax (url,data={},type='GET') {
  return new Promise( (resolve,reject) => {
    let promise
    if (type==="GET") {
      //准备url query参数数据
      let dataStr = ''
      // ?pageNum=1&pageSize=2&productName=i data拼成的数据,对象就是
      /*
        {
          pageNum: 1,
          pageSize: 2,
          productName: i
        }
       */
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'  //生成的就是  pageNum=1&
      })
      //如果 dataStr 不为空，说明传入了query参数数据
      if (dataStr !== '') {
        //先去掉 dataStr 的最后一个&
        dataStr = dataStr.substring(0,dataStr.length-1)
        url = url + '?' + dataStr
      }
      //发送get请求
      promise = axios.get(url)
    }else {
      //发送post请求
      promise = axios.post(url,data)
    }
    promise.then(response => {
      resolve(response.data)  //成功调用resolve
    }).catch(error => {
      reject(error)   //失败调用reject
    })
  })
}
