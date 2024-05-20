import TMSTicket from "../models/TMSTicket";
class TmsDao{
    
    public static async tmsdao(organisation:string,type:string,summary:string,description:string,assignee:string,reporter:any,status:any,due_date:any):Promise<any>{
        const created_date=new Date();
        const updated_date=new Date();
        let newTMSTicket=new TMSTicket({organisation,type,summary,description,assignee,reporter,status,created_date,updated_date,due_date});
        await newTMSTicket.save();
        console.log(newTMSTicket);
        return newTMSTicket;
    }
}
export default TmsDao;