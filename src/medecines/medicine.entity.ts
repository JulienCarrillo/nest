import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
//type orm permet de créer nos table dans la base de donnée
import { GenderEnum } from '../common/gender.enum';
import { RoleEnum } from '../common/role.enum';
@Entity()
export class Medicine {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    
   @Column({ type: String })
    @IsString()
    name = '';

    @Column({ type: String })
    @IsString()
    description = '';

    @Column({ type: String })
    @IsString()
    image = '';

    @Column({type: Number})
    @IsNumber()
    price: number;


}