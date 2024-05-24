import { Request, Response } from "express";
import SystemUser from "../models/SystemUser";
import { sendEmail } from "../services/SystemUser";
import SystemUserDao from "../dao/SystemUserDao";
import TMSTicket from "../models/TMSTicket";
import jwtService from "../helper/jwt.helper";
import AdminAuthorizer from "../helper/auth-admin";
import { FilterQuery } from "mongoose";
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
     // console.log(token);
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

//   public static async ticketUsers(req: Request, res: Response) {
//     const { authorized } = await AdminAuthorizer.authorizeAdmin(req, res);
//     if (!authorized) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized: Only authenticated users can view tickets",
//       });
//     }
//     const users = await TMSTicket.find();

//     if (!users) {
//       return res
//         .status(404)
//         .json({ valid: false, message: "Tickets not found" });
//     } else {
//       return res.status(202).json({ users });
//     }
//   }
// }

public static async ticketUsers(req: Request, res: Response) {
  const { authorized } = await AdminAuthorizer.authorizeAdmin(req, res);
  if (!authorized) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized: Only authenticated users can view tickets",
    });
  }

  const type: string | undefined = req.query.type as string;
  const status: string | undefined = req.query.status as string;
  const due_date: string | undefined = req.query.due_date as string;
  const created_date: string | undefined = req.query.created_date as string;
  const updated_date: string | undefined = req.query.updated_date as string;
  const assignee:string|undefined=req.query.assignee as string;

 // console.log(req.query.type,req.query.status,req.query.due_date);
      
  const filter: FilterQuery<typeof TMSTicket> = {};
  if (type) {
    filter.type = type;
  }
  if (status) {
    filter.status = status;
  }
  if (due_date) {
    const parsedDueDate = new Date(due_date);
    filter.dueDate = {
      $gte: new Date(parsedDueDate.setHours(0, 0, 0, 0)),
      $lt: new Date(parsedDueDate.setHours(23, 59, 59, 999))
    };
  }
  if(created_date){
    const parsedcreated=new Date(created_date);
    filter.created_date={
      $gte: new Date(parsedcreated.setHours(0, 0, 0, 0)),
      $lt: new Date(parsedcreated.setHours(23, 59, 59, 999))
    }
  }
  if(updated_date){
    const parsedupdated=new Date(updated_date);
    filter.updated_date={
      $gte: new Date(parsedupdated.setHours(0, 0, 0, 0)),
      $lt: new Date(parsedupdated.setHours(23, 59, 59, 999))
    }
  }
  if(assignee){
     filter.assignee=assignee;
  }

 // console.log(req.query.type, req.query.status, req.query.due_date);

  const users = await TMSTicket.find(filter);

  // const users = await TMSTicket.find();

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

