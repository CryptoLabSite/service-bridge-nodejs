import { Injectable } from '@nestjs/common';
import { ReadContractReq, TransactionInvokeV1DTO, WriteContractReq } from "./starknet.type";
import { getProvider } from '../env.config';
import { Account, ec } from 'starknet';

@Injectable()
export class StarknetService {
  async addInvokeTransactionV1(dto: TransactionInvokeV1DTO): Promise<string> {
    const provider = getProvider();
    const account = new Account(
      provider,
      dto.callerAddress,
      dto.callerPrivateKey,
    );
    const { transaction_hash } = await account.execute({
      contractAddress: dto.contractAddress,
      entrypoint: dto.entrypoint,
      calldata: dto.calldata,
    });

    return transaction_hash;
  }

  async readContract(req: ReadContractReq): Promise<string> {
    return null;
  }

  async writeContract(req: WriteContractReq): Promise<string> {
    return null;
  }
}
