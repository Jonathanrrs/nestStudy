import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'How many rows do you need?',
  })
  @IsOptional()
  @IsPositive()
  /* transformar data */
  @Type(() => Number) /* esto es otra manera a enableimplicitconversion: true */
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'How many rows do you want to skip?',
  })
  @IsOptional()
  @Type(() => Number) /* esto es otra manera a enableimplicitconversion: true */
  @Min(0)
  offset?: number;
}
