export type Response<T> = {
  code: number;
  msg: string;
  data: T;
};

export enum ResponseCode {
  SUCCESS = 0,
  FAILED = -1,
}

export class ResponseFactory {
  static success<T>(data: T): Response<T> {
    return {
      code: ResponseCode.SUCCESS,
      msg: 'Success',
      data: data,
    };
  }

  static failed<T>(code: number, msg: string): Response<T> {
    return {
      code: code,
      msg: msg,
      data: null as any,
    };
  }
}
