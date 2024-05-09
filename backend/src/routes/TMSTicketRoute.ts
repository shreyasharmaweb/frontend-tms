import express from 'express';
var app = express.Router();
import TmsControl from '../controller/TmsController'
app.post('/addticket',TmsControl.tms);

export default app;