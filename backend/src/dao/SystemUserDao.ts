import SystemUser from "../models/SystemUser";

class SystemUserDao {
    public static async syssign(email: string): Promise<any> {
        const Sys = new SystemUser({ email }); 
        await Sys.save();
        return Sys;
    }
    public static async otp(email:string):Promise<any>{
        const user = await SystemUser.findOne({ email });
        return user;
    }
}

export default SystemUserDao;
