const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB

// mongoose
// .connect('mongodb://127.0.0.1:27017/patch', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log('Connected to MongoDB');
// })

mongoose
    .connect('mongodb+srv://vishnudath710:vishnudath@patch-management.0uewar4.mongodb.net/patch?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })


const itemSchema = new mongoose.Schema(
    {
        username: String,
        dateAdded: {
            type: Date,
            default: Date.now
        }

    },
    { versionKey: false } // Exclude the version key (__v)
);

// const patchDb = mongoose.connection.useDb('patch'); // Connect to the 'patch' database
// const Item = patchDb.model('userlos', itemSchema); // Use the 'patch' database for the Item model

const Item = mongoose.model('userlos', itemSchema);

// const Item = mongoose.model('Item', itemSchema);

app.post('/api/items', (req, res) => {
    const newItem = new Item({ username: req.body.filler });

    newItem
        .save()
        .then((result) => {
            console.log('Saved item:', result);
            res.sendStatus(200);
        })

});



app.get('/api/items', (req, res) => {
    Item.find({})
        .then((items) => {
            res.status(200).json(items);
        })

});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});







const downloadSchema = new mongoose.Schema(
    {
        filename: String,
        username: String,
        software: String,
        downloadedtime: {
            type: Date,
            default: Date.now
        }

    },
    { versionKey: false } // Exclude the version key (__v)
);

const downloaded = mongoose.model('downloads', downloadSchema);

app.post('/api/downloads', (req, res) => {
    const newItem1 = new downloaded({ filename: req.body.fname, username: req.body.uname ,software :req.body.softer});
    newItem1
        .save()
        .then((result) => {
            console.log('Saved item:', result);
            res.sendStatus(200);
        })

});

app.get('/api/downloads', (req, res) => {
    downloaded.find({})
        .then((items) => {
            res.status(200).json(items);
        })

});




const reportSchema = new mongoose.Schema(
    {
        username: String,
        software: String,
        bugs_reported: [String],
        requested_features: [String],
        status: {
            type: String,
            default: "notused" // Set default value to "notused"
        }
    },
    { versionKey: false } // Exclude the version key (__v)
);

const reporteddata = mongoose.model('reporteddetails', reportSchema);

app.post('/api/reporteddetails', (req, res) => {
    const newItem1 = new reporteddata({ username: req.body.uname, software: req.body.soft, bugs_reported: req.body.bugarray, requested_features: req.body.ftarray });
    newItem1
        .save()
        .then((result) => {
            console.log('Saved item:', result);
            res.sendStatus(200);
        })

});

app.get('/api/reporteddetails', (req, res) => {
    reporteddata.find({})
        .then((items) => {
            res.status(200).json(items);
        })

});



app.put('/api/reporteddetails/:reportId', (req, res) => {
    const reportId = req.params.reportId;
    const { status } = req.body;

    reporteddata
        .findByIdAndUpdate(
            reportId,
            { status },
            { new: true } // Return the updated document
        )
        .then((updatedReport) => {
            if (!updatedReport) {
                return res.status(404).json({ error: 'Report not found' });
            }
            res.status(200).json(updatedReport);
        })
        .catch((error) => {
            console.error('Error updating status:', error);
            res.status(500).json({ error: 'An error occurred while updating status' });
        });
});