const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  // Define your Mentor schema fields here
  name: { type: String, required: true },
  // ... other fields
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
