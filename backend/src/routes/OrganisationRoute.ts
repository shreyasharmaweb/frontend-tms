// import express from 'express';
// import {Response,Request} from 'express';
// const app=express.Router();
// import Organisation from '../models/Organisation';

// app.post('/signup',
  
//    //  require(sign);
// );
// app.post('/orguser',async(req:Request,res:Response)=>{
//    const {org_name,name}=req.body;
//    const Org=new Organisation({org_name,name});
//    await Org.save();
//    res.status(201).json(Org);
// });
// app.get('/Allorg',async(req,res)=>{
//      try{
        
//         const org=await Organisation.find();
//         res.json(org);

//      }catch(error){
//         console.log('error',error);
//         res.status(500).json({error:'internal server error'});
//      }

// });
// app.delete(('/delete/:org_name'),async(req,res)=>{
//    const {org_name}=req.params;
//    console.log(org_name)
//    const deleteorg=await Organisation.findByIdAndDelete(org_name);
//    if(deleteorg){
//       res.status(200).json({message:'Data deleted'});
//    } else {
//       res.status(404).json({ error: 'Data not found' });
//   }
// })
// export default app;


import express from 'express';
const app=express.Router();
import organisationVal from '../validators/organisation.validator'
import Validation from '../middleware/validateMiddleware';
import Org from '../controller/OrganisationController'
app.post('/signup',Validation.validate(organisationVal),Org.sign);
app.post('/orguser',Org.orguser);
app.get('/Allorg',Org.allorg);
app.delete(('/delete/:org_name'),Org.delete);
export default app;
//http://localhost:8001/org/signup





