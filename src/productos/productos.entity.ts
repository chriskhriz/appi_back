import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'productos' })
export class ProductosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: number;

  @Column({ type: 'varchar', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', nullable: true })
  UnidadMedida: string;

  @Column()
  precio_com: number;

  @Column()
  precio_ven: number;

  @Column()
  cantidad: number;

  @Column({ type: 'varchar', nullable: true })
  cod_item: string;

  @Column()
  utilidad: number;

  @Column()
  stock_critico: number;

  @Column({ type: 'varchar', nullable: true })
  Distribuidor: string;
}
