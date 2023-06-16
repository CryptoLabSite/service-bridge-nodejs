import { Body, Controller, Post } from '@nestjs/common';
import { StarknetService } from './starknet.service';
import { ReadContractReq, WriteContractReq } from './starknet.type';
import { Response } from '../common.type';

@Controller('starknet')
export class StarknetController {
  constructor(private readonly starknetService: StarknetService) {}

  @Post('read_contract')
  async readContract(@Body() req: ReadContractReq): Promise<Response<string>> {
    return this.starknetService.readContract(req);
  }

  @Post('write_contract')
  async writeContract(
    @Body() req: WriteContractReq,
  ): Promise<Response<string>> {
    return this.starknetService.writeContract(req);
  }
}
