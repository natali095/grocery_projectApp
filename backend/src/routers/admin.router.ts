// admin.router.ts

import { Router } from 'express';
import { sample_admins } from '../data';
import jwt from 'jsonwebtoken';

export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZED = 401;

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

export default router;
