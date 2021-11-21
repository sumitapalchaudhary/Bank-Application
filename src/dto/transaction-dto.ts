import { ApiProperty } from "@nestjs/swagger";

export class TransactionDTO {
    @ApiProperty()
    senderAccountNumber: number;

    @ApiProperty()
    receiverAccountNumber: number;

    @ApiProperty()
    amount: number;
}