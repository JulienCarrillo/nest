import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEmail, IsNumber } from "class-validator";

export class UpdateMedicineDto {
    @ApiModelProperty({required: false})
    @IsEmail()
    @IsOptional()
    name?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    image?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    price?: number;

}