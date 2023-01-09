import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  /* number no es soportado en postgres */
  @Column('numeric', { default: 0 })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('int', { default: 0 })
  stock: number;

  /* arreglo de string */
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;
  /* tags */
  /* images */
}
