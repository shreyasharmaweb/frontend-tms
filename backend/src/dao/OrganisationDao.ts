import Organisation from "../models/Organisation";

class Orgdao {
    public static async neworg(org_name: string, name: string): Promise<any> {
        const org = new Organisation({ org_name, name });
        console.log(org);
        await org.save(); //create
        return org; 
    }
    public static async signO(org_name: string, name: string): Promise<any>{
        
        const org=new Organisation({org_name,name});
        await org.save(); //create
        return org;
    }

    public static async allorgDao(): Promise<any>{
        
         return await Organisation.find(); 
      
    }
    public static async delete(org_name:string){
              
        const deleteorg=await Organisation.findOneAndDelete({org_name});
        console.log(deleteorg) 
        return {success:true} 

    }
}

export default Orgdao;


