import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StarknetController } from './starknet/starknet.controller';
import { StarknetService } from './starknet/starknet.service';

@Module({
  imports: [],
  controllers: [AppController, StarknetController],
  providers: [AppService, StarknetService],
})
export class AppModule {}
