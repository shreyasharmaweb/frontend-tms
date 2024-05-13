import express from 'express';
const app = express.Router();
import OrgUserControll from '../controller/OrgUserControll';
import Validation from '../middleware/validateMiddleware';
import formSchema from '../validators/auth.validator'
app.post("/signup",Validation.validate(formSchema), OrgUserControll.OrgUser);


app.get("/Allusers",OrgUserControll.alluser);
export default app;

