import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  /* transformar data */
  @Type(() => Number) /* esto es otra manera a enableimplicitconversion: true */
  limit?: number;
  @IsOptional()
  @Type(() => Number) /* esto es otra manera a enableimplicitconversion: true */
  @Min(0)
  offset?: number;
}
