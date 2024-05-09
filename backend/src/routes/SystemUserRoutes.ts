import express from 'express';
const app=express.Router();
import SystemUser from '../models/SystemUser';

import SysUser from "../controller/SystemUserController"

app.post('/signup',SysUser.Sys);

app.post('/otp',SysUser.otpUser);

export default app;

  //http://localhost:8001/org/signup