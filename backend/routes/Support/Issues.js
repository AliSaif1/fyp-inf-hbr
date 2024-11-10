import express from 'express';
import multer from 'multer';
import path from 'path';
import { Issue } from '../../models/Support/Issues.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import IssueStatistics from '../../models/Support/OverView.js';

const router = express.Router();


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/Issues'); // Store files in the 'uploads/Issues' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
    },
});

const upload = multer({ storage });

router.get('/',(req,res) => { 
    res.status(200).json({ message: 'ok to create issue' });
 })


// Route to handle creating a new issue
router.post('/new', upload.single('attachment'), async (req, res) => {
    console.log("Creating a new issue");

    try {
        const { issue, description, contractLink, userId } = req.body;

        // Create a new issue document
        const newIssue = new Issue({
            userId,
            issue,
            description,
            status: 'Pending', // Set default status
            attachment: req.file ? `/uploads/Issues/${req.file.filename}` : null,
            contractLink,
        });

        // Save the new issue to the database
        await newIssue.save();

        // Determine the field to increment based on the issue type
        const updateFields = { Pending: 1 }; // Increment pending count
        if (issue === 'Contract') {
            updateFields.Contract = 1;
        } else if (issue === 'Payment') {
            updateFields.Payment = 1;
        } else if (issue === 'Account') {
            updateFields.Account = 1;
        } else {
            updateFields.Others = 1;
        }

        // Update the IssueStatistics document
        await IssueStatistics.findOneAndUpdate(
            {}, // You can add a filter here if there are multiple IssueStatistics documents
            { $inc: updateFields },
            { upsert: true, new: true }
        );

        res.status(201).json({ message: 'Issue created successfully', newIssue });
    } catch (error) {
        console.error('Error creating issue:', error);
        res.status(500).json({ message: 'Failed to create issue' });
    }
});
export default  router;
