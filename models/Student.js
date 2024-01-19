const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Define your Student schema fields here
  name: { type: String, required: true },
  // ... other fields
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' } // Assuming a reference to Mentor
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
