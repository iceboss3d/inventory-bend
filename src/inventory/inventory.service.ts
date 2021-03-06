import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { apiResponse } from 'src/helpers/apiResponse';
import { Repository } from 'typeorm';
import { InventoryDTO } from './inventory.dto';
import { InventoryEntity } from './inventory.entity';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryEntity)
        private inventoryRepository: Repository<InventoryEntity>
    ) { }

    async addInventory(data: InventoryDTO){
        const checkName = await this.inventoryRepository.findOne({where: {name: data.name}});

        if(checkName) {
            return apiResponse.existingResponse('Invesntory already Exists');
        }

        const inventory = this.inventoryRepository.create(data);

        await this.inventoryRepository.save(inventory);

        return apiResponse.successResponseWithData('Inventory Added', inventory);
    }
}
