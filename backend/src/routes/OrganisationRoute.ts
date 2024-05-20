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






