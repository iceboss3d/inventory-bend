import { IsNegative, IsNumber, IsString } from "class-validator";

export class ActivityDTO {
    @IsNumber()
    inventory: number;

    @IsString()
    description: string;

    @IsNumber()
    noOfUnits: number;
}