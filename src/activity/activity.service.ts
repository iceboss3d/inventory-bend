import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { apiResponse } from 'src/helpers/apiResponse';
import { InventoryEntity } from 'src/inventory/inventory.entity';
import { IUser } from 'src/user/user.dto';
import { Repository } from 'typeorm';
import { ActivityDTO } from './activity.dto';
import { ActivityEntity } from './activity.entity';

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(ActivityEntity)
        private activityRepository: Repository<ActivityEntity>,
        @InjectRepository(InventoryEntity)
        private inventoryRepository: Repository<InventoryEntity>,
    ) {}

    async recordActivity(data: ActivityDTO, user: IUser){
        const inventory = await this.inventoryRepository.findOne(data.inventory);

        if(!inventory){
            return apiResponse.notFoundResponse('No Inventory Found');
        }

        if(data.noOfUnits > inventory.noOfUnits){
            return apiResponse.errorResponse('Insufficient Quantity in Store');
        }

        const activity = this.activityRepository.create({...data, inventory});

        await this.activityRepository.save(activity);

        return apiResponse.successResponseWithData('Activity Logged', activity)
    }
}
