import { ApiProperty } from "@nestjs/swagger";

export class TransactionHistoryDTO {
    @ApiProperty()
    senderAccountNumber: number;

    @ApiProperty()
    receiverAccountNumber: number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    transactionTimestamp: Date;

}