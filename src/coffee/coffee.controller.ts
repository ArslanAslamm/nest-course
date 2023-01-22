import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, Res, Patch, Delete, Query } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {
    @Post('working')
    findAll(@Res() response) {
        return response.send('All coffee data is coming fine.')
    }

    @Get(':id')
    getData(@Param('id') id : string) {
        return `Hello Bhai ${id}`
    }

    @Post()
    // @HttpCode(HttpStatus.GONE)
    saveData(@Body() body)
    {
        return body
    }

    @Patch(':id')
    updateData(@Param('id') id: string, @Body() body)
    {
        return `This record will be updated with ID ${id}`
    }

    @Delete(':id')
    removeData(@Param('id') id: string)
    {
        return  `record with ID ${id} has been removed`
    }

    @Get()
    findSpecific(@Query() paginationQuery)
    {
        const { limit, offset } = paginationQuery
        const data = JSON.stringify(paginationQuery)
        return `This will return all coffees. Limit: ${limit}, Offset ${offset} `
    }
}
