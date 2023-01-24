import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { Module } from '@nestjs/common';

@Module({ controllers: [CoffeeController], providers: [CoffeeService] })
export class CoffeeModule {}
