import TMSTicket from "../models/TMSTicket";
class TmsDao{
    
    public static async tmsdao(type:string,key:string,summary:string,description:string,assignee:string,reporter:any,status:any,created_date:any,updated_date:any,due_date:any):Promise<any>{
        let newTMSTicket=new TMSTicket({type,key,summary,description,assignee,reporter,status,created_date,updated_date,due_date});
        await newTMSTicket.save();
        console.log(newTMSTicket);
        return newTMSTicket;
    }
}
export default TmsDao;