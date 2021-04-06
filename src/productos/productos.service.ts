import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
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

    const depto = this._productoRepository.create(dto);
    await this._productoRepository.save(depto);
    return new MessageDto('depto creado');
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
    const depto = await this._productoRepository.findOne(id);
    if (!depto) {
      throw new NotFoundException({ message: 'No existe' });
    }
    return depto;
  }

  // async update(id: number, dto: productosDTO): Promise<any> {
  //   const depto = await this.findById(id);

  //   if (!depto) throw new BadRequestException({ message: 'NoExiste!' });

  //   // const exist = await this.findByNombre(dto.nombres);
  //   // if (exist && exist.id !== id)
  //   //     throw new BadRequestException({ message: 'Nombre ya existe' });

  //   dto.nombre ? (depto.nombre = dto.nombre) : (depto.nombre = depto.nombre);
  //   dto.descripcion
  //     ? (depto.descripcion = dto.descripcion)
  //     : (depto.descripcion = depto.descripcion);
  //   dto.nivel ? (depto.nivel = dto.nivel) : (depto.nivel = depto.nivel);
  //   dto.detalleAsignatura
  //     ? (depto.detalleAsignatura = dto.detalleAsignatura)
  //     : (depto.detalleAsignatura = depto.detalleAsignatura);
  //   dto.rutaDocAdjuntos
  //     ? (depto.rutaDocAdjuntos = dto.rutaDocAdjuntos)
  //     : (depto.rutaDocAdjuntos = depto.rutaDocAdjuntos);
  //   dto.coordinarDeptoNombre
  //     ? (depto.coordinarDeptoNombre = dto.coordinarDeptoNombre)
  //     : (depto.coordinarDeptoNombre = depto.coordinarDeptoNombre);
  //   dto.coordinarDeptoId
  //     ? (depto.coordinarDeptoId = dto.coordinarDeptoId)
  //     : (depto.coordinarDeptoId = depto.coordinarDeptoId);
  //   dto.encargadoCurso
  //     ? (depto.encargadoCurso = dto.encargadoCurso)
  //     : (depto.encargadoCurso = depto.encargadoCurso);

  //   await this._productoRepository.save(depto);
  //   return { message: 'Actualizado' };
  // }

  async delete(id: number): Promise<any> {
    const depto = await this.findById(id);
    await this._productoRepository.delete(depto.id);
    return { message: 'Eliminado' };
  }

  async getByCode(id: number): Promise<ProductosEntity[]> {
    const producto = await this._productoRepository.find({
      where: { codigo: id },
    });

    return producto;
  }

  // async getUsers(): Promise<ProductosEntity[]> {
  //   return await this._productoRepository.find();
  // }

  // async getUser(_id: number): Promise<User[]> {
  //   return await this._productoRepository.find({
  //     select: ["fullName", "birthday", "isActive"],
  //     where: [{ "id": _id }]
  //   });
  // }

  // async updateUser(user: User) {
  //   this._productoRepository.save(user)
  // }

  // async deleteUser(user: User) {
  //   this._productoRepository.delete(user);
  // }
}
