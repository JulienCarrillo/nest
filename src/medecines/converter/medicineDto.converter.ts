import { MedicineDto } from '../model/medicine.dto';
import { Medicine } from '../medicine.entity';
import { Converter } from '../../common/converter';
import { RoleEnum } from '../../common/role.enum';
import { GenderEnum } from '../../common/gender.enum';

export class MedicineDtoConverter implements Converter<MedicineDto, Medicine>{
    constructor() {}

    convertOutbound(medicine: Medicine): MedicineDto {
        let medicineDto: MedicineDto = {
            id:medicine.id,
            name: medicine.name,
            description: medicine.description,
            image: medicine.image,
            price: medicine.price,
        };

       

        return medicineDto;
    }

    convertOutboundCollection(medicines: Medicine[]): MedicineDto[] {
        return medicines.map((medicine) => this.convertOutbound(medicine));
    }
}