import axios from "axios";
import {REQUEST_TIMEOUT, BASE_API} from '../const/settings';

const instance = axios.create({
  baseURL: BASE_API,
  // timeout: REQUEST_TIMEOUT,
});


const message = url => console.log(`Request ${url} was canceled`)
const getSource = () => {
  return  new AbortController()
}

class Api {
  get({url, config}) {
    const controller = getSource()

    return [
      instance.get(url, {...config, signal: controller.signal}),
      () => {message(url); controller.abort();}
    ]
  }

  post({url, data, config}) {
    const controller = getSource()

    return [
      instance.post(url, data, {...config, signal: controller.signal}),
      () => {message(url); controller.abort();}
    ]
  }

  delete({url, config}) {
    const controller = getSource()

    return [
      instance.delete(url, {...config, signal: controller.signal}),
      () => {message(url); controller.abort();}
    ]
  }

  put({url, data, config}) {
    const controller = getSource()

    return [
      instance.put(url, data, {...config, signal: controller.signal}),
      () => {message(url); controller.abort();}
    ]
  }
  patch({url, data, config}) {
    const controller = getSource()

    return [
      instance.patch(url, data, {...config, signal: controller.signal}),
      () => {message(url); controller.abort();}
    ]
  }
}

export default new Api()