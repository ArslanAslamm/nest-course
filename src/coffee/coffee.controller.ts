import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeeService } from './coffee.service';
import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, Res, Patch, Delete, Query } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {

    constructor(private readonly coffeeService: CoffeeService){}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.coffeeService.findAll(paginationQuery);
    }

    @Get(':id')
    getData(@Param('id') id : string) {
       return this.coffeeService.findOne(id);
    }

    @Get('recommend/:id')
    async recommend(@Param('id') id : string) {
        const coffeeFound = await this.coffeeService.findOne(id);
        if (coffeeFound)
        {
            this.coffeeService.recommendCoffee(coffeeFound);
            return `Recommending this coffee ${coffeeFound.name}`
        }
    }

    @Post()
    saveData(@Body() createCoffeeDto: CreateCoffeeDto)
    {
        return this.coffeeService.create(createCoffeeDto);
    }

    @Patch(':id')
    updateData(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto)
    {
        return this.coffeeService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    removeData(@Param('id') id: string)
    {
        return this.coffeeService.remove(id);
    }

    // @Get()
    // findSpecific(@Query() paginationQuery)
    // {
    //     // const { limit, offset } = paginationQuery
    //     // const data = JSON.stringify(paginationQuery)
    //     return this.coffeeService.findAll();
    //     // return `This will return all coffees. Limit: ${limit}, Offset ${offset} `
    // }
}
