const express = require('express');
const memberController = require('../controllers/member')
const router = express.Router();

router.get((''), memberController.getMembers);
router.get('/:id', memberController.getMember);
router.post('', memberController.setMember);
router.delete('/:id', memberController.deleteMember);
router.put('/:id', memberController.updateMember);

module.exports = router;