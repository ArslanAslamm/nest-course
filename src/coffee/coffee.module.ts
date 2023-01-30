import { Coffee } from './entities/coffee.entity';
import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee])],
    controllers: [CoffeeController],
    providers: [CoffeeService] 
})
export class CoffeeModule {}
