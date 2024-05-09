import OrganisationUser from '../models/OrganisationUser';
// email_id: { type: String, required: true }, 
// first_name: { type: String, required: true }, 
// last_name: { type: String, required: true }, 
// organisation: { type: String,  required: true }, 
// dob: { type: Date, required: true }, 
// org_join_date: { type: Date, required: true }
class OrgDao{
    public static async OrgUserDao(id:any,email_id:string,first_name:string,last_name:string,organisation:string,dob:any,org_join_date:any): Promise<any> {
        const newOrgUser=new OrganisationUser({id,email_id,organisation,first_name,last_name,dob,org_join_date});
        await newOrgUser.save();
        
    }
    public static async OrgAllUser():Promise<any>{
        console.log("Inside The Dao");
        const org=await OrganisationUser.find();
        console.log(org);
        
        return org;
    }
}
export default OrgDao;