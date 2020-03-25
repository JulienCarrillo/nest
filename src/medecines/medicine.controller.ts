import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { MedicineDtoConverter } from './converter/medicineDto.converter';
import { MedicineDto } from './model/medicine.dto';
import { Medicine } from './medicine.entity';
import { MedicinesService } from './medicine.service';
import { CreateMedicineDtoConverter } from './converter/createMedicineDto.converter';
import { CreateMedicineDto } from './model/createMedicine.dto';
import { UpdateMedicineDtoConverter } from './converter/updateMedicineDto.converter';
import { UpdateMedicineDto } from './model/updateMedicine.Dto';

@ApiUseTags('medicine')
@Controller('medicine')
export class MedicinesController {

    constructor(
        private readonly service: MedicinesService, 
        private readonly medicineDtoConverter: MedicineDtoConverter,
        private readonly createMedicineDtoConverter: CreateMedicineDtoConverter,
        private readonly updateMedicineDtoConverter: UpdateMedicineDtoConverter
    ) { }

    
    @Get('')
    @ApiResponse({ status: 201, description: 'All medicines', type: MedicineDto, isArray: true})
    @ApiResponse({ status: 401, description: 'Medicines not authentificated'})
    async getAll(): Promise<MedicineDto[]> {
        const medicines: Medicine[] = await this.service.getMedicines();
        return this.medicineDtoConverter.convertOutboundCollection(medicines);
    }

    // @UseGuards(AuthGuard('auth'))
    // @Get('me')
    // @ApiResponse({ status: 201, description: 'User found', type: UserDto})
    // @ApiResponse({ status: 401, description: 'User not authentificated'})
    // async getProfile(@Request() req: any): Promise<UserDto> {
    //     return this.userDtoConverter.convertOutbound(req.user);
    // }

    // @UseGuards(AuthGuard('auth'))
    // @Get('patients')
    // @ApiResponse({ status: 201, description: 'Patients found', type: UserDto, isArray: true})
    // @ApiResponse({ status: 401, description: 'User not authentificated'})
    // async getPatients(): Promise<UserDto[]> {
    //     const patients: User[] = await this.service.getPatients();
    //     return this.userDtoConverter.convertOutboundCollection(patients);
    // }

    // @UseGuards(AuthGuard('auth'))
    // @Get('doctors')
    // @ApiResponse({ status: 201, description: 'Doctors found', type: UserDto, isArray: true})
    // @ApiResponse({ status: 401, description: 'User not authentificated'})
    // async getDoctors(): Promise<UserDto[]> {
    //     const doctors: User[] = await this.service.getDoctors();
    //     return this.userDtoConverter.convertOutboundCollection(doctors);
    // }

    @UseGuards(AuthGuard('auth'))
    @Get(':id')
    @ApiImplicitParam({name: 'id', description: 'User id to retrieve', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'User found', type: MedicineDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async get(@Param('id', new ParseIntPipe()) id: number): Promise<MedicineDto> {
        const medicine: Medicine = await this.service.getMedicineById(id);
        return this.medicineDtoConverter.convertOutbound(medicine);
    }
//cree 
    @Put()
    @ApiImplicitBody({name: 'CreateMedicineDto', description: 'Medicine to create', type: CreateMedicineDto})
    @ApiResponse({ status: 201, description: 'User found', type: MedicineDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    async create(@Body() medicine: CreateMedicineDto): Promise<MedicineDto> {
        const medicineToCreate: Partial<Medicine> = this.createMedicineDtoConverter.convertInbound(medicine);
        const createdMedicine: Medicine = await this.service.createMedicine(medicineToCreate);
        return this.medicineDtoConverter.convertOutbound(createdMedicine);
    }

    @UseGuards(AuthGuard('auth'))
    @Post(':id')
    @ApiImplicitParam({name: 'id', description: 'User id to update', required: true, type: Number})
    @ApiImplicitBody({name: 'UpdateUserDto', description: 'User information to update', type: UpdateMedicineDto})
    @ApiResponse({ status: 201, description: 'User updated', type: MedicineDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() medicine: UpdateMedicineDto): Promise<MedicineDto> {
        const medicineToUpdate: Partial<Medicine> = this.updateMedicineDtoConverter.convertInbound(medicine);
        const medicineUpdated: Medicine = await this.service.updateMedicine(id, medicineToUpdate);
        return this.medicineDtoConverter.convertOutbound(medicineUpdated);
    }

    @UseGuards(AuthGuard('auth'))
    @Delete(':id')
    @ApiImplicitParam({name: 'id', description: 'User id to delete', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'User deleted'})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async deleteMedicine(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return await this.service.deleteMedicine(id);
    }
}
