import { Router } from 'express';
import { sample_admins } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constant/http_status';
import { User, UserModel } from '../models/user.model';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const admin = sample_admins.find(
    admin => admin.email === email && admin.password === password
  );

  if (admin) {
    res.send(generateTokenResponse(admin));
    return;
  }
  res.status(HTTP_BAD_REQUEST).send('Name or password is invalid!');
});

const generateTokenResponse = (admin: {
  id: any;
  name: any;
  email: any;
  password?: string;
  address: any;
  isAdmin: any;
}) => {
  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      isAdmin: admin.isAdmin,
    },
    'Some random text',
    { expiresIn: '30d' }
  );

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    address: admin.address,
    isAdmin: admin.isAdmin,
    token,
  };
};

router.get('/', asyncHandler(async (req, res, next) => {
  const users = await UserModel.find({});
  res.send(users);
  return;
}));

router.post('/', asyncHandler(async (req, res, next) => {
  const user = new UserModel(req.body);
  await user.save();
  res.send(user);
  return;
}));


router.put('/update/:id', asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) {
    res.status(HTTP_BAD_REQUEST).send("No user with that ID found");
    return;
  }
  res.send(user);
  return;
}));

router.delete('/delete/:id', asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(HTTP_BAD_REQUEST).send("No user with that ID found");
    return;
  }
  res.send(user);
  return;
}));



export default router;
