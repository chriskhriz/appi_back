import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
