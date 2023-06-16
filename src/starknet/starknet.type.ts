export type ReadContractReq = {
  address: string;
  method: string;
  args: Array<any> | undefined;
};

export type WriteContractReq = {
  callerAddress: string;
  callerPrivateKey: string;
  contractAddress: string;
  method: string;
  args: Array<any>;
};
