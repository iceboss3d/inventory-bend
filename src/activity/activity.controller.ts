import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';
import { IUser } from 'src/user/user.dto';
import { ActivityDTO } from './activity.dto';
import { ActivityService } from './activity.service';

@Controller('api/activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post('log')
  @UseGuards(new AuthGuard())
  logActivity(@Body() data: ActivityDTO, @User() user: IUser) {
    return this.activityService.recordActivity(data, user);
  }

  @Get()
  @UseGuards(new AuthGuard())
  getActivities() {
    return this.activityService.getActivities();
  }
}
