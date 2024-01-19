const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./utils/config');
const{info,error} = require('./utils/logger');
const cors = require('cors');
const Mentor = require('./models/Mentor');
const Student = require('./models/Student');




app.use(cors());
app.use(express.json());

info('connecting to',config.MOGODB_URI)

mongoose.connect(config.MOGODB_URI)
    .then(() => {
       info('Connection to MongoDB successful');
    })
    .catch((err) => {
        error('Error connecting to MongoDB:', err);
    });


    // API to create Mentor

    app.post('/api/mentor', async (req, res) => {
        try {
          const mentor = new Mentor(req.body);
          await mentor.save();
          info('Mentor created successfully:', mentor);
          res.json({ message: 'Mentor created successfully', mentor });
        } catch (error) {
          error('Error creating Mentor:', error);
          res.status(500).json({ error: 'Error creating Mentor' });
        }
      });



      // API to create Student
app.post('/api/student', async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      info('Student created successfully:', student);
      res.json({ message: 'Student created successfully', student });
    } catch (error) {
      error('Error creating Student:', error);
      res.status(500).json({ error: 'Error creating Student' });
    }
  });
  // API to Assign a student to Mentor
  app.post('/api/assign-mentor/:mentorId/:studentId', async (req, res) => {
    const { mentorId, studentId } = req.params;
  
    try {
      const mentor = await Mentor.findById(mentorId);
      const student = await Student.findById(studentId);
  
      if (mentor && student && !student.mentor) {
        student.mentor = mentorId;
        await student.save();
        info('Student assigned to mentor successfully:', student, mentor);
        res.json({ message: 'Student assigned to mentor successfully', student, mentor });
      } else {
        res.status(404).json({ error: 'Mentor not found or student already assigned or mentor not available' });
      }
    } catch (error) {
      error('Error assigning mentor to student:', error);
      res.status(500).json({ error: 'Error assigning mentor to student' });
    }
  });
  
  // API to show all students for a particular mentor
  app.get('/api/mentor/:mentorId/students', async (req, res) => {
    const { mentorId } = req.params;
  
    try {
      const students = await Student.find({ mentor: mentorId });
      res.json({ mentorId, students });
    } catch (error) {
      error('Error fetching students for mentor:', error);
      res.status(500).json({ error: 'Error fetching students for mentor' });
    }
  });
  
  // API to show the previously assigned mentor for a particular student
  app.get('/api/student/:studentId/mentor', async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const student = await Student.findById(studentId);
      if (student && student.mentor) {
        const assignedMentor = await Mentor.findById(student.mentor);
        res.json({ studentId, assignedMentor });
      } else {
        res.status(404).json({ error: 'Student not found or not assigned to any mentor' });
      }
    } catch (error) {
      error('Error fetching previously assigned mentor for student:', error);
      res.status(500).json({ error: 'Error fetching previously assigned mentor for student' });
    }
  });
  
  // API to assign or change mentor for a particular student
  app.put('/api/student/:studentId/assign-mentor/:newMentorId', async (req, res) => {
    const { studentId, newMentorId } = req.params;
  
    try {
      const student = await Student.findById(studentId);
      const newMentor = await Mentor.findById(newMentorId);
  
      if (student && newMentor) {
        student.mentor = newMentorId;
        await student.save();
        info('Mentor assigned to student successfully:', student, newMentor);
        res.json({ message: 'Mentor assigned to student successfully', student, newMentor });
      } else {
        res.status(404).json({ error: 'Student not found or new mentor not available' });
      }
    } catch (error) {
      error('Error assigning mentor to student:', error);
      res.status(500).json({ error: 'Error assigning mentor to student' });
    }
  });


  module.exports = app;