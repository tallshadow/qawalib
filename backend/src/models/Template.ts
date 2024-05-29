// src/models/Template.ts
import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'templates'  // Ensure the table name matches your DB schema
})
export class Template extends Model<Template> {
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
    type: DataType.STRING(255),
    allowNull: true
  })
  category!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  subcategory!: string;  // Add subcategory field

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description?: string;

  @Column({
    type: DataType.STRING(1024),
    allowNull: true
  })
  templateFile!: string; // URL to the file, e.g., S3 URL
}
