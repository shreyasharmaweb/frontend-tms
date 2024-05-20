import express from 'express';
var app = express.Router();
import TmsControl from '../controller/TmsController'
app.post('/addticket',TmsControl.tms);
app.get('/getticketUser',TmsControl.allTickets)
app.put('/update',TmsControl.update)
app.get('/alltickets',TmsControl.OrgnisationTickets)
export default app;
