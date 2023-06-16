import { Body, Controller, Post } from '@nestjs/common';
import { StarknetService } from './starknet.service';
import { ReadContractReq, TransactionInvokeV1DTO, WriteContractReq } from "./starknet.type";

@Controller('starknet')
export class StarknetController {
  constructor(private readonly starknetService: StarknetService) {}

  @Post('add_invoke_transaction_v1')
  async addInvokeTransactionV1(
    @Body() dto: TransactionInvokeV1DTO,
  ): Promise<string> {
    return this.starknetService.addInvokeTransactionV1(dto);
  }

  @Post('read_contract')
  async readContract(@Body() req: ReadContractReq): Promise<string> {
    return this.starknetService.readContract(req);
  }

  @Post('write_contract')
  async writeContract(@Body() req: WriteContractReq): Promise<string> {
    return this.starknetService.writeContract(req);
  }
}
