const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  dateApplied: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  },
  deadline: {
    type: Date,
    default: null
  },
  source: { 
    type: String, 
    default: '' 
    
  },
  sourceLink: { 
    type: String, 
    default: ''
   },
     resume: {
    type: String, 
    default: '' 
   },
});

module.exports = mongoose.model('Job', jobSchema);