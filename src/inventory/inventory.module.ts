import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from 'src/activity/activity.entity';
import { InventoryController } from './inventory.controller';
import { InventoryEntity } from './inventory.entity';
import { InventoryService } from './inventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryEntity, ActivityEntity])],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
