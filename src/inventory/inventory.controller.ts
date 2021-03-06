import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
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

    @Put('update/:id')
    @UseGuards(new AuthGuard())
    updateInventory(@User() user: IUser, @Param('id') id: number, @Body() data: Partial<InventoryDTO>){
        return this.inventoryService.updateInventory(id, data, user);
    }

    @Delete('delete/:id')
    @UseGuards(new AuthGuard())
    deleteInventory(@User() user: IUser, @Param('id') id: number){
        return this.inventoryService.deleteInventory(id, user);
    }
}
