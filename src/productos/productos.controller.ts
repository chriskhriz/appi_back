import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { productosDTO } from './dto/productos.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly _deptoService: ProductosService) {}

  @Post()
  async create(@Body() dto: productosDTO) {
    return await this._deptoService.create(dto);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this._deptoService.getByCode(id);
  }

  @Get()
  async getAll() {
    return await this._deptoService.getAll();
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return await this._deptoService.update(id, dto);
  }



  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this._deptoService.delete(id);
  }
}
