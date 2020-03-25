import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString,IsNumber} from "class-validator";
import { GenderEnum } from "../../common/gender.enum";
import { RoleEnum } from "../../common/role.enum";

export class CreateMedicineDto {


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

}