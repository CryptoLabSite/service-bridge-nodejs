export type ReadContractReq = {
  contractAddress: string;
  method: string;
  args: Array<any>;
};

export type WriteContractReq = {
  callerAddress: string;
  callerPrivateKey: string;
  contractAddress: string;
  method: string;
  args: Array<any>;
};

export type TransactionInvokeV1DTO = {
  callerAddress: string;
  callerPrivateKey: string;
  contractAddress: string;
  entrypoint: string;
  calldata?: Array<string>;
};
