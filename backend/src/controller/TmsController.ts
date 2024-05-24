import { Request, Response } from "express";
import TmsDao from "../dao/TmsDao";
import TMSTicket from "../models/TMSTicket";
import { UserAuthorizer } from "../helper/auth-user";
import OrgUser from "../models/OrganisationUser";
import { FilterQuery } from "mongoose";

class TmsControl {
  //create
  public static async tms(req: Request, res: Response) {
    const {
      type,
      key,
      summary,
      description,
      assignee,
      status,
      due_date,
    } = req.body;
   // console.log("Key ", key);
    try {
      const { authorized, organisation, email } =
        await UserAuthorizer.authorizeUser(req, res);
      if (!authorized || !organisation) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Only authenticated users can view tickets",
        });
      }
      const isUser = await OrgUser.find({
        $and: [{ email_id: assignee }, { organisation }],
      });

      if (isUser.length == 0) {
        return res
          .status(401)
          .send({ success: false, message: "User does not exist" });
      } else {
        let newTMSTicket = await TmsDao.tmsdao(
          organisation,
          type,
          summary,
          description,
          assignee,
          email,
          status,
          due_date
        );
        return res.status(201).json({ success: true, newTMSTicket });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Ticket not created", error: error.message });
    }
  }
 

  public static async allTickets(req: Request, res: Response) {
    try {
      const { authorized, organisation, email } =
        await UserAuthorizer.authorizeUser(req, res);
      if (!authorized) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Only authenticated users can view tickets",
        });
      }
      
      const page: number = parseInt(req.query.page as string) || 1;
      const limit: number = parseInt(req.query.limit as string)||10;
      const type: string | undefined = req.query.type as string;
      const status: string | undefined = req.query.status as string;
      const due_date: string | undefined = req.query.due_date as string;
      const created_date: string | undefined = req.query.created_date as string;
      const updated_date: string | undefined = req.query.updated_date as string;
      
      const filter: FilterQuery<typeof TMSTicket> = { organisation, assignee: email };
      if (type) {
        filter.type = type;
      }
      if (status) {
        filter.status = status;
      }
      if (due_date) {
        const parsedDueDate = new Date(due_date);
        filter.due_date = {
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
        filter.created_date={
          $gte: new Date(parsedupdated.setHours(0, 0, 0, 0)),
          $lt: new Date(parsedupdated.setHours(23, 59, 59, 999))
        }
      }
      
      const skip: number = (page - 1) * limit;
      const tickets = await TMSTicket.find(filter)
        .skip(skip)
        .limit(limit);
      const totalTickets = await TMSTicket.countDocuments(filter);


      
          
      const organisationOfUser = await OrgUser.find({organisation});
      
       
      res.status(200).json({ tickets,currentPage: page,totalPages: Math.ceil(totalTickets/limit),organisationOfUser});  

    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to fetch tickets", error: error.message });
    }
  }
  public static async update(req: Request, res: Response) {
    const { _id, type, status, due_date } = req.body;
    let historyLogs = []; 
  
    try {
      const { authorized, organisation, email } =
        await UserAuthorizer.authorizeUser(req, res);
      if (!authorized) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Only authenticated users can view tickets",
        });
      }
  
      const ticket = await TMSTicket.findOne({ _id });
      if (!ticket) {
        return res.send("failed to update");
      } else {
        if (ticket.type !== type) {
          historyLogs.push({ userName: email, fieldName: 'Type', oldValue: ticket.type, newValue: type });
          ticket.type = type;
        }
  
        if (ticket.dueDate !== due_date) {
          const formattedOldDueDate = ticket.dueDate ? TmsControl.formatDate(ticket.dueDate.toString()) : null;
          const formattedNewDueDate = due_date ? TmsControl.formatDate(due_date) : null;
          historyLogs.push({ userName: email, fieldName: 'Due Date', oldValue: formattedOldDueDate, newValue: formattedNewDueDate });
          ticket.dueDate = due_date;
        }
        if (ticket.status !== status) {
          historyLogs.push({ userName: email, fieldName: 'Status', oldValue: ticket.status, newValue: status });
          ticket.status = status;
        }
      }

      //console.log(historyLogs);
  
      const Response = await TMSTicket.updateOne(
        { _id: _id },
        { $set: { type, status, due_date, updated_date: new Date() } ,History:historyLogs}
      );
      //console.log(Response);
      
      return res.send(Response);
    } catch (err) {
      return res.status(500).json({ message: "Failed to fetch tickets" });
    }
  }
  
  static  formatDate = (date: string): string => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  //Fetching the tickets of particular organisation
  public static async OrgnisationTickets(req: Request, res: Response) {
    try {
      const { authorized, organisation, email } =
        await UserAuthorizer.authorizeUser(req, res);
      if (!authorized) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Only authenticated users can view tickets",
        });
      }
      const tickets = await TMSTicket.find({ organisation, reporter: email });
      const organisationOfUser = await TMSTicket.find({organisation});
     // console.log(organisationOfUser);
      res.status(200).json({ tickets,organisationOfUser });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to fetch tickets", error: error.message });
    }
  }
}
export default TmsControl;
