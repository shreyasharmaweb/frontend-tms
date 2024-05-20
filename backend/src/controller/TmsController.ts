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
    console.log("Key ", key);
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
 
  // all tickets of Organisation and email
  // public static async allTickets(req: Request, res: Response) {
  //   try {
  //     const { authorized, organisation, email } =
  //       await UserAuthorizer.authorizeUser(req, res);
  //     if (!authorized) {
  //       return res.status(403).json({
  //         success: false,
  //         message: "Unauthorized: Only authenticated users can view tickets",
  //       });
  //     }
  //     const type: string | undefined = req.query.type as string;
  //     const status: string | undefined = req.query.status as string;
  //     const dueDate: string | undefined = req.query.dueDate as string;

  //     const tickets = await TMSTicket.find({ organisation, assignee: email });
      
  //     const filter: FilterQuery<typeof TMSTicket> = { organisation, assignee: email };
  //     if (type) {
  //       filter.type = type;
  //     }
  //     if (status) {
  //       filter.status = status;
  //     }
  //     if (dueDate) {
  //       const parsedDueDate = new Date(dueDate);
  //       filter.dueDate = {
  //         $gte: new Date(parsedDueDate.setHours(0, 0, 0, 0)),
  //         $lt: new Date(parsedDueDate.setHours(23, 59, 59, 999))
  //       };
  //     }
      
  //     const organisationOfUser = await OrgUser.find({organisation});
  //     console.log(organisationOfUser);
       
  //     res.status(200).json({ tickets,organisationOfUser});  

  //   } catch (error: any) {
  //     res
  //       .status(500)
  //       .json({ message: "Failed to fetch tickets", error: error.message });
  //   }
  // }


  public static async allTickets(req: Request, res: Response) {
    // console.log("*************************************************************");
    
    console.log(req.query.type,req.query.status,req.query.due_date);

    try {
      const { authorized, organisation, email } =
        await UserAuthorizer.authorizeUser(req, res);
      if (!authorized) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Only authenticated users can view tickets",
        });
      }
      const type: string | undefined = req.query.type as string;
      const status: string | undefined = req.query.status as string;
      const due_date: string | undefined = req.query.due_date as string;

      console.log(req.query.type,req.query.status,req.query.due_date);
      

      
      const filter: FilterQuery<typeof TMSTicket> = { organisation, assignee: email };
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

      const tickets = await TMSTicket.find(filter);

     // console.log(tickets)

      
      const organisationOfUser = await OrgUser.find({organisation});
      //console.log(organisationOfUser);
       
      res.status(200).json({ tickets,organisationOfUser});  

    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to fetch tickets", error: error.message });
    }
  }

  //Updating the tickets
  public static async update(req: Request, res: Response) {
    const { _id, type, status, due_date } = req.body;
    try {
      const { authorized, organisation, email } =
        await UserAuthorizer.authorizeUser(req, res);
      if (!authorized) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Only authenticated users can view tickets",
        });
      }

      // console.log("waefsvzdwefdewfdg");
      const Response = await TMSTicket.updateOne(
        { _id: _id },
        { $set: { type, status, due_date,updated_date:new Date() } }
      );
      // console.log(Response);
      return res.send(Response);
    } catch (err) {
      return res.status(500).json({ message: "Failed to fetch tickets" });
    }
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
