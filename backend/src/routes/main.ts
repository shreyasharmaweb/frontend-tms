import {Router} from 'express';
import Organisation from  './OrganisationRoute';
import  OrganisationUserRoute from './OrganisationUserRoute';
import SystemUserRoutes from './SystemUserRoutes';
import TMSTicketRoute from  './TMSTicketRoute';
const router = Router();

router.use("/org",Organisation);
router.use("/sys",SystemUserRoutes);
router.use("/orguser", OrganisationUserRoute);
router.use("/tms", TMSTicketRoute);

export default router;
