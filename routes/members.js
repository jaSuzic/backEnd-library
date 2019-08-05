const express = require('express');
const memberController = require('../controllers/member');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('../middleware/multer');
const removeConnected = require('../middleware/remove-connections');

router.get('', checkAuth, memberController.getMembers);
router.get('/:id', checkAuth, memberController.getMember);
router.post('', checkAuth, multer, memberController.setMember);
router.delete('/:id', checkAuth, removeConnected.deleteWhenRemovingMember, memberController.deleteMember);
router.put('/:id', checkAuth, memberController.updateMember);

module.exports = router;