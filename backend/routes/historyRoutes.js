const express = require('express');
const router = express.Router();
const { getRevisions, deleteRevision } = require('../controllers/revisionController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all history/revisions (protected)
router.get('/', authMiddleware, getRevisions);

// Delete a revision (protected)
router.delete('/:id', authMiddleware, deleteRevision);

module.exports = router;
