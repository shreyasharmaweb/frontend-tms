import express from 'express';
const app=express.Router();
import SysUser from "../controller/SystemUserController"

app.post('/signup',SysUser.Sys);

app.post('/otp',SysUser.otpUser);

app.get('/getAllTickets',SysUser.ticketUsers)

export default app;
