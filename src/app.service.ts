import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { productosDTO } from './productos/dto/productos.dto';
import { ProductosEntity } from './productos/productos.entity';
import { ProductosRepository } from './productos/productos.repository';

@Injectable()
export class AppService {
}
