// src/models/Category.ts
import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { SubCategory } from './SubCategory';  // Ensure this path is correct

@Table({
  tableName: 'categories'
})
export class Category extends Model<Category> {
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

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description?: string;

  @ForeignKey(() => SubCategory)
  @Column
  subCategoryId!: number;

  @BelongsTo(() => SubCategory)
  subCategory!: SubCategory;
}
