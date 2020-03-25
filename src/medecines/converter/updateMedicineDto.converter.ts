import { Converter } from "src/common/converter";
import { UpdateMedicineDto } from "../model/updateMedicine.Dto";
import { Medicine } from "../medicine.entity";

export class UpdateMedicineDtoConverter implements Converter<UpdateMedicineDto, Partial<Medicine>>{
    constructor() {}

    convertInbound(medicine: UpdateMedicineDto): Partial<Medicine> {
        return medicine as Partial<Medicine>;
    }
}