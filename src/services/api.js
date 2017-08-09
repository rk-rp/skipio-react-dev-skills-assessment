import token from './token';

export function url(part) {
  return `https://stage.skipio.com/api/v2/${part}`;
}

export function params(toExtend = {}) {
  return {
    params: {
      ...toExtend,
      token,
    },
  };
}
