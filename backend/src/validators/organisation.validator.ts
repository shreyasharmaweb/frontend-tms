import exp from 'constants'
import {z} from 'zod'
// org_name: {type:String},
// name: {type:String},

const organisationVal=z.object({
    
    org_name:z.
    string({required_error:"Organisation is required "})
    .trim().min(3,{message:"minimum 3 are required"})
    .max(20,{message:"maximum 10 are required"}),
    name:z.
    string({required_error:"name is required"})
    .trim().min(3,{message:"minimum 3 are required"})
    .max(20,{message:"maximum 10 are required"})
})
export default organisationVal;