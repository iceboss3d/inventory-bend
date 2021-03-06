import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { apiResponse } from 'src/helpers/apiResponse';
import { IUser } from 'src/user/user.dto';
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

    async updateInventory(id: number, data: Partial<InventoryDTO>, user: IUser){
        if(user.role !== 'admin') {
            return apiResponse.unauthorizedResponse('Unauthorised');
        }

        const inventory = this.inventoryRepository.findOne(id);

        if(!inventory){
            return apiResponse.notFoundResponse('Inventory not Found');
        }

        await this.inventoryRepository.update({id}, data);

        return apiResponse.successResponse('Inventory Updated');
    }

    async deleteInventory(id: number, user: IUser){
        if(user.role !== 'admin') {
            return apiResponse.unauthorizedResponse('Unauthorised');
        }

        const inventory = this.inventoryRepository.findOne(id);

        if(!inventory){
            return apiResponse.notFoundResponse('Inventory not Found');
        }

        await this.inventoryRepository.delete({id});

        return apiResponse.successResponse('Inventory Deleted');
    }

    async getInventories(){
        const inventories = await this.inventoryRepository.find();

        return apiResponse.successResponseWithData('Inventories Fetched', inventories);
    }
}
