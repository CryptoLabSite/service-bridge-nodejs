import { Injectable } from '@nestjs/common';
import { ReadContractReq, WriteContractReq } from './starknet.type';
import { ENV, getProvider } from '../env.config';
import { Account, Contract, ec, RpcProvider, uint256 } from 'starknet';
import { Response, ResponseCode, ResponseFactory } from "../common.type";
import { extractCallResult } from "./abi.utils";
@Injectable()
export class StarknetService {
  async readContract(req: ReadContractReq): Promise<Response<string>> {
    const address = req.address;
    const method = req.method;
    const args = req.args;

    const provider = new RpcProvider({ nodeUrl: ENV.nodeUrl });

    let abi;
    try {
      const contractClass = await provider.getClassAt(address);
      abi = contractClass.abi;
    } catch (e) {
      //   todo log and return error
      return ResponseFactory.failed(ResponseCode.FAILED, 'contract not found');
    }

    // abi check
    if (abi === undefined) {
      return ResponseFactory.failed(ResponseCode.FAILED, 'abi not found');
    }

    // CONTRACT_ABI_ENTRY
    let methodABI;
    for (const abiElement of abi) {
      if (abiElement.name === method && abiElement.type === 'function') {
        methodABI = abiElement;
        break;
      }
    }

    if (methodABI === undefined) {
      return ResponseFactory.failed(ResponseCode.FAILED, 'method not found');
    }

    const contract = new Contract(abi, address, provider);
    // such as: contract.totalSupply()
    const callResult = await contract[method](args);

    return ResponseFactory.success(extractCallResult(callResult, methodABI));
  }

  async writeContract(req: WriteContractReq): Promise<Response<string>> {
    return null;
  }
}
