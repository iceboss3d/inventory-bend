import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntity } from 'src/inventory/inventory.entity';
import { ActivityController } from './activity.controller';
import { ActivityEntity } from './activity.entity';
import { ActivityService } from './activity.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity, InventoryEntity])],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
