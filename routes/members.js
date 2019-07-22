const express = require('express');
const memberController = require('../controllers/member')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

router.get('', checkAuth, memberController.getMembers);
router.get('/:id', checkAuth, memberController.getMember);
router.post('', checkAuth, memberController.setMember);
router.delete('/:id', checkAuth, memberController.deleteMember);
router.put('/:id', checkAuth, memberController.updateMember);

module.exports = router;