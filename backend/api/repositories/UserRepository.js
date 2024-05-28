"use strict";
// import { User } from '../models/User';
// import { Op } from 'sequelize';
// export class UserRepository {
//   // Assume User.create accepts Partial<User> for simplicity
//   async createUser(userData: Partial<User>): Promise<User> {
//     try {
//       const user = await User.create(userData);
//       return user;
//     } catch (error) {
//       throw new Error(`Error creating user: ${error}`);
//     }
//   }
//   async findUserById(userId: number): Promise<User | null> {
//     try {
//       const user = await User.findByPk(userId);
//       return user;
//     } catch (error) {
//       throw new Error(`Error finding user: ${error}`);
//     }
//   }
//   async updateUser(userId: number, updates: Partial<User>): Promise<User | null> {
//     try {
//       const user = await User.findByPk(userId);
//       if (user) {
//         await user.update(updates);
//         return user;
//       }
//       return null;
//     } catch (error) {
//       throw new Error(`Error updating user: ${error}`);
//     }
//   }
//   async deleteUser(userId: number): Promise<void> {
//     try {
//       const user = await User.findByPk(userId);
//       if (user) {
//         await user.destroy();
//       }
//     } catch (error) {
//       throw new Error(`Error deleting user: ${error}`);
//     }
//   }
//   async findUsersByName(name: string): Promise<User[]> {
//     try {
//       const users = await User.findAll({
//         where: {
//           name: {
//             [Op.like]: `%${name}%`
//           }
//         }
//       });
//       return users;
//     } catch (error) {
//       throw new Error(`Error finding users: ${error}`);
//     }
//   }
// }
