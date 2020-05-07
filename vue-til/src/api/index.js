import axios from 'axios';
import { setInterceptors } from './common/interceptors';

// createInstance는 단순하게 baseURL만 생성해주는 기본 인스턴스값이다.
function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

// url을 받을 수 있는 인자를 이용해서 baseURL에 같이 넣어서 생성하게끔
// Rest API 규칙에 의해서 같은 URL을 쓴다.
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const posts = createInstanceWithAuth('posts');
