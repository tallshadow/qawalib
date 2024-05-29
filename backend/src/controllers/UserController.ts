// // UserController.ts
// import { Request, Response } from 'express';
// import { UserRepository } from '../repository/UserRepository';

// export class UserController {
//   private userRepository: UserRepository;

//   constructor(userRepository: UserRepository) {
//     this.userRepository = userRepository;
//   }

//   /**
//    * Handle the request to create a new user.
//    */
//   createUser = async (req: Request, res: Response) => {
//     try {
//       const user = await this.userRepository.createUser(req.body);
//       res.status(201).json(user);
//     } catch (error:any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   /**
//    * Handle the request to get a user by ID.
//    */
//   getUserById = async (req: Request, res: Response) => {
//     try {
//       const user = await this.userRepository.findUserById(+req.params.id);
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error:any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   /**
//    * Handle the request to update a user.
//    */
//   updateUser = async (req: Request, res: Response) => {
//     try {
//       const updatedUser = await this.userRepository.updateUser(+req.params.id, req.body);
//       if (updatedUser) {
//         res.json(updatedUser);
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error:any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   /**
//    * Handle the request to delete a user.
//    */
//   deleteUser = async (req: Request, res: Response) => {
//     try {
//       await this.userRepository.deleteUser(+req.params.id);
//       res.status(204).send();
//     } catch (error:any) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }
