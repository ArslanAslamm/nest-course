import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Brewed Coffee',
            brand: 'Buddy Brew',
            flavors: ['vanilla', 'chocolate'],
        },
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        const coffee = this.coffees.find(item => item.id === +id);
        if (!coffee)
        {
        throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        }
        return coffee;
    }

    create(createCoffeeDto: any) {
        const newCoffee = this.coffees.push(createCoffeeDto);
        if (newCoffee)
            throw new HttpException(`Coffee #${createCoffeeDto.id} created`, HttpStatus.CREATED);
        else
            throw new HttpException(`Coffee #${createCoffeeDto.id} not created`, HttpStatus.NOT_FOUND);
    }

    update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
            const updatedCoffee = Object.assign(existingCoffee, updateCoffeeDto);
            return updatedCoffee;
        }
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1);
        }
        throw new HttpException(`Coffee #${id} Deleted`, HttpStatus.FOUND);
    }

}
