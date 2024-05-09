import express from 'express';
const app = express.Router();
import OrganisationUser from '../models/OrganisationUser';
import OrgUserControll from '../controller/OrgUserControll';
app.post("/signup", OrgUserControll.OrgUser);


app.get("/Allusers",OrgUserControll.alluser);
export default app;

