import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository, UpdateResult } from 'typeorm';
import { Medicine } from './medicine.entity';
import { RoleEnum } from '../common/role.enum';

@Injectable()
export class MedicinesService {

    constructor(@InjectRepository(Medicine) private medicinesRepository: Repository<Medicine>) { }

    async getMedicines(): Promise<Medicine[]> {
        return await this.medicinesRepository.find({
          
        });
    }

    async getMedicineById(id: number): Promise<Medicine> {
        const medicine: Medicine | undefined = await this.medicinesRepository.findOne({
            where: [{ id }]
        });
        
        if (!medicine) {
            throw new NotFoundException("Ce medicament n'existe pas");
        }
        return medicine;
    }

    // async getByMail(email: string): Promise<User> {
    //     return await this.usersRepository.findOne({
    //         where: [{ email }],
    //         relations: ['doctors']
    //     });
    // }

    // async emailExists(email: string): Promise<boolean> {
    //     return !!await this.getUserByMail(email);
    // }

    async createMedicine(medicine: Partial<Medicine>): Promise<Medicine> {
      
          const medicineCreated: Medicine = this.medicinesRepository.create(medicine);
        return this.medicinesRepository.save(medicineCreated);
    }

   
    async updateMedicine(id: number, medicine: Partial<Medicine>): Promise<Medicine> {
       

        const result: UpdateResult = await this.medicinesRepository.update(id, medicine);

        if (result.raw.affectedRows <= 0) {
            throw new NotFoundException("Cet utilisateur n'existe pas.");
        }
        return await this.getMedicineById(id);
    }

    async deleteMedicine(id: number): Promise<void> {
        const medicine: Medicine | undefined = await this.getMedicineById(id);
        if (!medicine) {
            throw new NotFoundException("Cet utilisateur n'existe pas.");
        }
        await this.medicinesRepository.delete(medicine.id);
    }

    // async getPatients(): Promise<User[]>{
    //     return await this.usersRepository.find({
    //         where: [{ role: 'patient' }]
    //     })
    // }

    // async getDoctors(): Promise<User[]>{
    //     return await this.usersRepository.find({
    //         where: [{ role: 'doctor' }]
    //     })
    // }

    // async getPatientFromId(userId: number): Promise<User>{
    //     const patient: User = await this.getUserById(userId);
    //     const isUserPatient: boolean = patient.role === RoleEnum.Patient;
    //     if (!isUserPatient) {
    //         throw new ForbiddenException("Cet utilisateur n'a pas le rôle patient.");
    //     }
    //     return patient;
    // }

    // async getDoctorFromId(userId: number): Promise<User>{
    //     const doctor: User = await this.getUserById(userId);
    //     const isUserDoctor: boolean = doctor.role === RoleEnum.Doctor;
    //     if (!isUserDoctor) {
    //         throw new ForbiddenException("Cet utilisateur n'a pas le rôle médecin.");
    //     }
    //     return doctor;
    // }

    // private userTokenIdMatchPatientId(userTokenId: number, patientId: number): void {
    //     if (userTokenId !== patientId) {
    //         throw new UnauthorizedException("Le token de cet utilisateur ne correspond pas à un patient.");
    //     }
    // }

    // async addDoctorToPatient(userTokenId: number, patientId: number, doctorId: number): Promise<User> {
    //     this.userTokenIdMatchPatientId(userTokenId, patientId);
    //     const patient: User = await this.getPatientFromId(patientId);
    //     const doctor: User = await this.getDoctorFromId(doctorId);
    //     if (patient.doctors.find(d => d.id === doctor.id)) {
    //         throw new ForbiddenException("Ce médecin est déjà attaché à ce patient.");
    //     }

    //     patient.doctors = patient.doctors.concat(doctor);
    //     return await this.usersRepository.save(patient);
    // }

    // async removeDoctorToPatient(userTokenId: number, patientId: number, doctorId: number): Promise<User> {
    //     this.userTokenIdMatchPatientId(userTokenId, patientId);
    //     const patient: User = await this.getPatientFromId(patientId);
    //     const doctor: User = await this.getDoctorFromId(doctorId);

    //     if (!patient.doctors.find(d => d.id === doctor.id)) {
    //         throw new ForbiddenException("Ce médecin n'est pas attaché à ce patient.");
    //     }

    //     patient.doctors = patient.doctors.filter(d => d.id !== doctor.id);
    //     return await this.usersRepository.save(patient);
    // }

    // async getAllDoctorPatients(doctorTokenId: number): Promise<User[]> {
    //     await this.getDoctorFromId(doctorTokenId)
    //     const patients: User[] = await this.getPatients();
    //     return patients.filter((p) => p.doctors.find(d => d.id === doctorTokenId));
    // }
}
