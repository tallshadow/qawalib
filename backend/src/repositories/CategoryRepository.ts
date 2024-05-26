import { Category } from "../models/Category";
import { Repository } from 'sequelize-typescript';

export class CategoryRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = Category;
  }

  // Create a new category
  async createCategory(name: string): Promise<Category> {
    try {
      // Directly pass an object with properties that match the Category model attributes.
      const category = await Category.create({ name });
      return category;
    } catch (error: any) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  // Get a category by ID
  async getCategoryById(id: number): Promise<Category | null> {
    const category = await this.repository.findByPk(id);
    return category;
  }

  // Update a category by ID
  async updateCategory(id: number, name: string): Promise<Category | null> {
    const category = await this.repository.findByPk(id);
    if (category) {
      category.name = name;
      await category.save();
    }
    return category;
  }

  // Delete a category by ID
  async deleteCategory(id: number): Promise<void> {
    const category = await this.repository.findByPk(id);
    if (category) {
      await category.destroy();
    }
  }

  // List all categories
  async listCategories(): Promise<Category[]> {
    const categories = await this.repository.findAll();
    return categories;
  }
}
