import { ApiProperty } from "@nestjs/swagger";

export class AccountCreationDTO {
    @ApiProperty()
    customerId: number;

    @ApiProperty()
    depositAmount: number;
}