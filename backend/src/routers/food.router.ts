import { Router, Request, Response, NextFunction } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from 'express-async-handler';
import { Food, FoodModel } from "../models/food.model";
import { HTTP_BAD_REQUEST } from '../constant/http_status';

const router = Router();

router.get("/seed", asyncHandler(async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
        res.send("Seed is already done!");
        return;
    }

    await FoodModel.create(sample_foods);
    res.send("Seed Is Done!");
}));

router.get("/", async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
});

router.get("/search/:searchTerm", asyncHandler(
     async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const foods = await FoodModel.find({name: {$regex:searchRegex}});
    res.send(foods);
}));

router.get("/tags", asyncHandler (
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            {
                $unwind:'$tags'
            },
            {
                $group:{

                    _id:'$tags',
                    count: {$sum:1}
                }
            },
            {
                $project:{
                    _id:0,
                    name:'$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1});

        const all = {
            name : 'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
));

router.get("/tag/:tagName",asyncHandler(
    async(req, res) => {
    const foods = await FoodModel.find({tags: req.params.tagName});
    res.send(foods);
    }
));

router.get("/:foodId", asyncHandler(
async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
}));

router.put('/update/:id', asyncHandler(async (req, res, next) => {
    const food = await FoodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) {
      res.status(HTTP_BAD_REQUEST).send("No food with that ID found");
      return;
    }
    res.send(food);
    return;
}));

router.post('/', asyncHandler(async (req: Request, res: Response) => {
    const foodItem = new FoodModel(req.body);
    await foodItem.save();
    res.status(201).json(foodItem);
}));


// router.delete('/delete/:id', asyncHandler(async (req, res, next) => {
//     const food = await FoodModel.findByIdAndDelete(req.params.id);
//     if (!food) {
//       res.status(HTTP_BAD_REQUEST).send("No food with that ID found");
//       return;
//     }
//     res.send(food);
//     return;
// }));
router.delete('/delete/:id', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Attempting to delete food with ID: ${req.params.id}`);
    // The original functionality of this endpoint
    const food = await FoodModel.findByIdAndDelete(req.params.id);

    if (!food) {
        console.log(`No food found with ID: ${req.params.id}`);
        res.status(HTTP_BAD_REQUEST).send("No food with that ID found");
        return;
    }
    console.log(`Successfully deleted food with ID: ${req.params.id}`);
    res.send(food);
}));


export default router;
