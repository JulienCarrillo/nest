import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { configService } from './config/config.module';
import { MedicineModule } from './medecines/medicine.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
//c'est ici que nous avons la connexion avec la bdd grace a ORM (Mapping object-relational) 

const typeOrmConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'gsb',
  entities: ['src/**/**.entity{.ts,.js}'],
  logging: true,
  synchronize: true
}

@Module({
  imports: [    
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    PatientModule,
    MedicineModule,
    DoctorModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
