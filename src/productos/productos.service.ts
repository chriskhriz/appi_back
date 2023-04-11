import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from '../common/message.dto';
import { productosDTO } from './dto/productos.dto';
import { ProductosEntity } from './productos.entity';
import { ProductosRepository } from './productos.repository';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(ProductosEntity)
    private _productoRepository: ProductosRepository,
  ) {}

  async create(dto: productosDTO): Promise<any> {
    const exist = await this._productoRepository.findOne({
      codigo: dto.codigo,
    });
    if (exist) return { message: 'Existe' };
    console.log(dto.codigo);
    const depto = this._productoRepository.create(dto);
    await this._productoRepository.save(depto);
    return new MessageDto('producto creado');
  }

  async findByNombre(descripcion: string): Promise<ProductosEntity> {
    const depto = await this._productoRepository.findOne({
      descripcion: descripcion,
    });
    return depto;
  }

  async getAll(): Promise<ProductosEntity[]> {
    const list = await this._productoRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'Lista vacia' });
    }
    return list;
  }

  async findById(id: number): Promise<ProductosEntity> {
    const depto = await this._productoRepository.findOne({
      where: { codigo: id },
    });
    if (!depto) {
      throw new NotFoundException({ message: 'No existe' });
    }
    return depto;
  }

  async update(id: number, dto: productosDTO): Promise<any> {
    const depto = await this.findById(id);

    if (!depto) throw new BadRequestException({ message: 'NoExiste!' });

    dto.descripcion
      ? (depto.descripcion = dto.descripcion)
      : (depto.descripcion = depto.descripcion);

    dto.cantidad
      ? (depto.cantidad = dto.cantidad)
      : (depto.cantidad = depto.cantidad);

    dto.precio_ven
      ? (depto.precio_ven = dto.precio_ven)
      : (depto.precio_ven = depto.precio_ven);

    await this._productoRepository.save(depto);
    return { message: 'Actualizado' };
  }

  async delete(id: number): Promise<any> {
    const depto = await this.findById(id);
    await this._productoRepository.delete(depto.id);
    return { message: 'Eliminado' };
  }

  async getByCode(id: number): Promise<ProductosEntity[]> {
    console.log(id);
    const producto = await this._productoRepository.find({
      where: { codigo: id },
    });

    return producto;
  }
}
