import express from 'express';
import { authenticate } from '../middleWare/authMiddleware.js';
import {
    acceptMeetingRequest,
    cancelMeeting,
    createMeeting,
    deleteMeeting,
    getMeetings,
    rejectMeetingRequest,
    requestMeetingPublic,
    rescheduleMeeting,
} from '../controller/meetingController.js';
import { enforceLimits } from '../middleWare/enforceLimit.js';

const router = express.Router();

router.post('/', authenticate, enforceLimits("meetings"), createMeeting);
router.get('/', authenticate, getMeetings);
router.put('/reschedule/:meetingId', authenticate, rescheduleMeeting);
router.put('/cancel/:meetingId', authenticate, cancelMeeting);
router.delete('/:meetingId', authenticate, deleteMeeting);
router.post('/request', requestMeetingPublic); // No auth
router.put('/accept/:meetingId', authenticate, acceptMeetingRequest);
router.put('/reject/:meetingId', authenticate, rejectMeetingRequest);

export default router;
