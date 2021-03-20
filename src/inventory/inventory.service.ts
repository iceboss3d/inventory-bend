import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityDTO } from 'src/activity/activity.dto';
import { ActivityEntity } from 'src/activity/activity.entity';
import { apiResponse } from 'src/helpers/apiResponse';
import { IUser } from 'src/user/user.dto';
import { Not, Repository } from 'typeorm';
import { InventoryDTO } from './inventory.dto';
import { InventoryEntity } from './inventory.entity';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryEntity)
        private inventoryRepository: Repository<InventoryEntity>,
        @InjectRepository(ActivityEntity)
        private activityRepository: Repository<ActivityEntity>
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

        const inventory = await this.inventoryRepository.findOne(id);

        console.log(inventory);
        

        if(!inventory){
            return apiResponse.notFoundResponse('Inventory not Found');
        }

        const checkName = await this.inventoryRepository.findOne({where: {name: data.name, id: Not(id)}});

        if(checkName){
            return apiResponse.existingResponse('Inventory with such name already exist');
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

    async getInventory(id: number){
        const inventory = await this.inventoryRepository.findOne(id);

        return apiResponse.successResponseWithData('Inventories Fetched', inventory);
    }

    async removeItem(data: ActivityDTO, user: IUser){
        const inventory = await this.inventoryRepository.findOne({where: {id: data.inventory}});
        if(!inventory){
            return apiResponse.notFoundResponse('Inventory not Found');
        }

        if(data.noOfUnits > inventory.noOfUnits){
            return apiResponse.errorResponse("Insufficient Units");
        }

        const unitsLeft = inventory.noOfUnits - data.noOfUnits;

        await this.inventoryRepository.update({id: data.inventory}, {noOfUnits: unitsLeft});

        const activity = this.activityRepository.create({...data, inventory, user: user.username});

        await this.activityRepository.save(activity);

        return apiResponse.successResponse('Inventory Updated');
    }
}
