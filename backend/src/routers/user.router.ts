import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constant/http_status';
import bcrypt from 'bcryptjs';
const router = Router();

router.get('/seed', asyncHandler(async (req, res) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send('Seed is already done!');
    return;
  }

  await UserModel.create(sample_users);
  res.send('Seed Is Done!');
}));


router.put('/update/:id', asyncHandler(async (req, res, next) => {
  console.log("Inside /update/:id route with ID:", req.params.id);

  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) {
    res.status(HTTP_BAD_REQUEST).send("No user with that ID found");
    return;
  }
  res.send(user);
  return;
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(HTTP_BAD_REQUEST).send('Username or password is invalid!');
  }
}));

router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(HTTP_BAD_REQUEST).send('User already exists. Please login!');
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  
  
  const newUser: User = {
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false
};

  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenResponse(dbUser));
}));

const generateTokenResponse = (user: User) => {
  const token = jwt.sign(
    { id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '30d'
    }
  );

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token
  };
};

export default router;
