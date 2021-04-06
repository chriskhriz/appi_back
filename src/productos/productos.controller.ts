import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { productosDTO } from './dto/productos.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly _deptoService: ProductosService) { }

  @Post()
  async create(@Body() dto: productosDTO) {
    return await this._deptoService.create(dto);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return await this._deptoService.getByCode(id);
    // return await this._deptoService.findById(id);
  }

  @Get()
  async getAll() {
    // if(user.roles.indexOf('admin')< 0) throw new UnauthorizedException(new MessageDto('Solo Admin'));
    return await this._deptoService.getAll();
    //   .then((data) => {
    //     response.status(HttpStatus.OK).json(data);
    //   })
    //   .catch(() => {
    //     response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error' });
    //   });
  }

  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // @Put(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() dto: productosDTO,
  // ) {
  //   return await this._deptoService.update(id, dto);
  // }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this._deptoService.delete(id);
  }
}
