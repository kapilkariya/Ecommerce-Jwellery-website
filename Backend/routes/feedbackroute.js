import express from 'express';
import { submitFeedback, checkFeedback, getAllFeedback } from '../controlers/feedbackcontroller.js';
import authuser from '../middleware/auth.js';
import adminauth from '../middleware/adminauth.js';

const feedbackRouter = express.Router();

// User routes
feedbackRouter.post('/submit', authuser, submitFeedback);
feedbackRouter.post('/check', authuser, checkFeedback);

// Admin route
feedbackRouter.post('/list', adminauth, getAllFeedback);

export default feedbackRouter;
