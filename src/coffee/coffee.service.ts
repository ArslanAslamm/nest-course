import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Injectable, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CoffeeService {
    constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,

    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    ){}
    findAll(paginationQuery: PaginationQueryDto) {
        let { limit, page } = paginationQuery;
        if (limit && limit > 100)
        {
            throw new HttpException('Limit too large', HttpStatus.BAD_REQUEST);
        }
        limit = limit || 10;
        page = page || 1;
        const offset = (page - 1) * limit;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            take: limit,
            skip: offset,
        },
        );
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

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        );
        const newCoffee = this.coffeeRepository.create({...createCoffeeDto, flavors});
        return this.coffeeRepository.save(newCoffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors && (await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        ));
        const existingCoffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors,
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

    async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ where: { name } });    
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }

}
