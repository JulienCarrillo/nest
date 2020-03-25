import { CreateMedicineDto } from "../model/createMedicine.dto";
import { Medicine } from "../medicine.entity";
import { Converter } from "../../common/converter";
import { privateEncrypt } from "crypto";


export class CreateMedicineDtoConverter implements Converter<CreateMedicineDto, Partial<Medicine>>{
    
    constructor() {}

    convertInbound(medicine: CreateMedicineDto): Partial<Medicine> {
        let medicineToCreate = {
            name: medicine.name,
            description: medicine.description,
            image:medicine.image,
            price:medicine.price,
        }

        

        return medicineToCreate;
    }
}