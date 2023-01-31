import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Injectable, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CoffeeService {
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>;

    

    findAll() {
        return this.coffeeRepository.find({
            relations:['flavors']
        });
    }

    // find One data
    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne({ where: { id: parseInt(id) }, relations: ['flavors']  });
        if (!coffee)
        {
            throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const newCoffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(newCoffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const existingCoffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
        });
        if (existingCoffee) {
            this.coffeeRepository.save(existingCoffee);
            return existingCoffee;
        }
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        this.coffeeRepository.remove(coffee);
        throw new HttpException(`Coffee #${id} deleted `, HttpStatus.OK);
        
    }

}
