// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

/* se hace la importacion de PartialType desde swagger, para eso extender lo que tiene el createProductDto, sin ella la importacion normal no lo toma */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
