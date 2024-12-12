import { Module } from '@nestjs/common';
import { MonumentController } from './monument.controller';
import { MonumentService } from './monument.service';
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [MonumentController],
    providers: [MonumentService],
})
export class MonumentModule {}
