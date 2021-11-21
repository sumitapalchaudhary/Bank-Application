import { ApiProperty } from "@nestjs/swagger";

export class AccountBalanceDTO {
    @ApiProperty()
    accountNumber: number;

    @ApiProperty()
    balance: number;
}