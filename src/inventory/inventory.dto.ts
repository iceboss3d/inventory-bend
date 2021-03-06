import { IsNumber, IsString } from "class-validator";

export class InventoryDTO {
    @IsString()
    name: string;

    description?: string;

    @IsNumber()
    noOfUnits: number;

    @IsNumber()
    warningUnits: number;
}