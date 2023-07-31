import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { Food, FoodModel } from '../models/food.model';

const router = express.Router();

// CRUD endpoints for users
router.get('/users', asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.find();
  res.json(users);
}));

router.post('/users', asyncHandler(async (req: Request, res: Response) => {
  const user = new UserModel(req.body);
  await user.save();
  res.json(user);
}));

router.put('/users/:id', asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
}));

router.delete('/users/:id', asyncHandler(async (req: Request, res: Response) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted successfully' });
}));

// CRUD endpoints for food items
router.get('/food', asyncHandler(async (req: Request, res: Response) => {
  const foodItems = await FoodModel.find();
  res.json(foodItems);
}));

router.post('/food', asyncHandler(async (req: Request, res: Response) => {
  const foodItem = new FoodModel(req.body);
  await foodItem.save();
  res.json(foodItem);
}));

router.put('/food/:id', asyncHandler(async (req: Request, res: Response) => {
  const foodItem = await FoodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(foodItem);
}));

router.delete('/food/:id', asyncHandler(async (req: Request, res: Response) => {
  await FoodModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Food item deleted successfully' });
}));

export default router;
