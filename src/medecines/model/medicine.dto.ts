import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsEmail } from "class-validator";
import { GenderEnum } from "../../common/gender.enum";
import { RoleEnum } from "../../common/role.enum";

export class MedicineDto {
    @ApiModelProperty()
    @IsNumber()
    id: number;

    @ApiModelProperty()
    @IsString()
    name: string;

    @ApiModelProperty()
    @IsString()
    description: string;

    @ApiModelProperty()
    @IsString()
    image: string;

    @ApiModelProperty()
    @IsString()
    price: number;



    

    // @ApiModelProperty({type: Number, isArray: true, required: false})
    // doctors?: number[];
}