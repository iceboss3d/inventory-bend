import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';
import { IUser } from 'src/user/user.dto';
import { InventoryDTO } from './inventory.dto';
import { InventoryService } from './inventory.service';

@Controller('api/inventory')
export class InventoryController {
    constructor(private inventoryService: InventoryService) {}

    @Post('add')
    @UseGuards(new AuthGuard())
    addInventory(@Body() data: InventoryDTO){
        return this.inventoryService.addInventory(data);
    }
}
