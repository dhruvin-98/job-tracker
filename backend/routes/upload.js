const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Only allow PDFs
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Upload resume and attach to job
router.post('/:id/resume', auth, upload.single('resume'), async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { resume: req.file.filename },
      { new: true }
    );
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;