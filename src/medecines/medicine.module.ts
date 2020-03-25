import { Module } from '@nestjs/common';
import { MedicinesService } from './medicine.service';
import { MedicinesController } from './medicine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { MedicineDtoConverter } from './converter/medicineDto.converter';
import { CreateMedicineDtoConverter } from './converter/createMedicineDto.converter';
import { UpdateMedicineDtoConverter } from './converter/updateMedicineDto.converter';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine])],
  providers: [
    MedicinesService, 
    MedicineDtoConverter,
    CreateMedicineDtoConverter,
    UpdateMedicineDtoConverter
  ],
  controllers: [MedicinesController],
  exports: [
    MedicinesService,
    MedicineDtoConverter,
    CreateMedicineDtoConverter,
  ]
})
export class MedicineModule {}
