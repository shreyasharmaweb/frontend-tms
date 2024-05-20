import express from 'express';
const app = express.Router();
import OrgUserControll from '../controller/OrgUserControll';
import Validation from '../middleware/validateMiddleware';
import formSchema from '../validators/auth.validator'
app.post("/signup",Validation.validate(formSchema), OrgUserControll.OrgUser);

app.post("/otpSend",OrgUserControll.otpSendUser );
app.get("/Allusers",OrgUserControll.alluser);
app.post("/loginuser",OrgUserControll.UserLogin);
export default app;


