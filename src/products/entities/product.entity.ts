import { ProductImage } from './product-image.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  title: string;

  /* number no es soportado en postgres */
  @ApiProperty()
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  slug: string;
  @ApiProperty()
  @Column('int', { default: 0 })
  stock: number;

  /* arreglo de string */
  @ApiProperty()
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty()
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    nullable: true,
    default: [],
  })
  tags: string[];

  /* images */
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    /* esto ayuda a cargar los datos como query de otra tabla */
    eager: true,
  })
  images?: ProductImage[];

  /* eager para que cargue automaticamente la relacion con user y se vea ese campo en la consulta */
  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
