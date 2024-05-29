// src/models/SubCategory.ts
import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'subcategories'
})
export class SubCategory extends Model<SubCategory> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  name!: string;
}
