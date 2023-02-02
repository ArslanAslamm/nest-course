import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/event/entities/event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeeController],
    providers: [CoffeeService] 
})
export class CoffeeModule {}
