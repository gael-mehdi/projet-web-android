import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import type { Monument } from './Monument';
import { MonumentService } from './monument.service';

@Controller('/monuments')
export class MonumentController {
  constructor(private readonly monumentService: MonumentService) {}

  @Post()
  createMonument(@Body() monument: Monument): Monument {
    this.monumentService.addMonument(monument);
    return this.monumentService.getMonument(monument.ref);
  }

  @Get()
  getMonuments(@Query('dep_current_code') dep_current_code: string): Monument[] { // À changer
    if (dep_current_code) {
      return this.monumentService.getMonumentsOf(dep_current_code);
    }
    return this.monumentService.getAllMonuments();
  }

  @Get(':ref')
  getMonument(@Param('ref') ref: string): Monument {
    return this.monumentService.getMonument(ref);
  }

  @Delete(':ref')
  deleteMonument(@Param('ref') ref: string): void {
    this.monumentService.remove(ref);
  }

  @Post('search')
  @HttpCode(200)
  searchMonuments(@Body() { term }: { term: string }): Monument[] {
    return this.monumentService.search(term);
  }

  @Put(':ref/favorite')
  favoriteMonument(@Param('ref') ref: string): Monument {
    return this.monumentService.updateFavoriteStatus(ref);
  }

}
