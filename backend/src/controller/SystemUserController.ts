import { Request, Response } from "express";
import SystemUser from "../models/SystemUser";
import { sendEmail } from "../services/SystemUser";
import SystemUserDao from "../dao/SystemUserDao";
import TMSTicket from "../models/TMSTicket";
import jwtService from "../helper/jwt.helper";
import AdminAuthorizer from "../helper/auth-admin";
class SysUser {
  public static async Sys(
    req: Request<{}, {}, { email: string }>,
    res: Response
  ): Promise<any> {
    try {
      const { email } = req.body;
      const validateEmail = (email: string) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      if (!validateEmail(email)) throw new Error("not a valid email");
      const user = await SystemUser.findOne({ email });

      if (user) {
        await sendEmail(email);
        return res.status(200).json({ valid: true, message: "OTP is send" });
      } else {
        return res
          .status(402)
          .json({ valid: false, message: "User Not Found" });
      }
    } catch (err) {
      return res.status(400).json({ valid: false, message: "otp is not send" });
    }
  }

  public static async otpUser(
    req: Request<{}, {}, { email: string; otp: string }>,
    res: Response
  ) {
    const { email, otp } = req.body;
    const user = await SystemUserDao.otp(email);

    if (!user) {
      return res.status(404).json({ valid: false, message: "User not found" });
    }
    if (user.otp == otp) {
      const token = jwtService.signToken({ email: email, role: "admin" });
      console.log(token);
      return res
        .status(200)
        .send({ success: "true", message: "Login Successfully ", token });
    } else
      return res
        .status(400)
        .json({
          valid: false,
          message: "Invalid or expired OTP",
          success: true,
        });
  }

  public static async ticketUsers(req: Request, res: Response) {
    const { authorized } = await AdminAuthorizer.authorizeAdmin(req, res);
    if (!authorized) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Only authenticated users can view tickets",
      });
    }
    const users = await TMSTicket.find();

    if (!users) {
      return res
        .status(404)
        .json({ valid: false, message: "Tickets not found" });
    } else {
      return res.status(202).json({ users });
    }
  }
}

export default SysUser;
