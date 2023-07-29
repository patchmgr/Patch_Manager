const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');  // Import dotenv package

dotenv.config({ path: "../../../.env" });


const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());


mongoose
    .connect(process.env.REACT_APP_Mongolink, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })




const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});







const downloadSchema = new mongoose.Schema(
    {
        patchname: String,
        software: String,

        downloaddetails: [
            {
                username: String,
                downloadedtime: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    { versionKey: false } // Exclude the version key (__v)
);

const downloaded = mongoose.model('downloads', downloadSchema);

app.post('/api/downloads', (req, res) => {
    const { patchname, software, username } = req.body;

    downloaded.findOne({ patchname, software })
        .then((result) => {
            if (!result) {
                const newItem = new downloaded({
                    patchname,
                    software,
                    downloaddetails: [{ username }]
                });

                newItem.save()
                    .then(() => {
                        console.log('Saved item:', newItem);
                        res.sendStatus(200);
                    })
                    .catch((error) => {
                        console.error('Error saving item:', error);
                        res.sendStatus(500);
                    });
            } else {
                const existingDownload = result.downloaddetails.find((item) => item.username === username);

                if (existingDownload) {
                    existingDownload.downloadedtime = new Date();
                } else {
                    result.downloaddetails.push({ username });
                }

                result.save()
                    .then(() => {
                        console.log('Updated item:', result);
                        res.sendStatus(200);
                    })
                    .catch((error) => {
                        console.error('Error updating item:', error);
                        res.sendStatus(500);
                    });
            }
        })
        .catch((error) => {
            console.error('Error finding item:', error);
            res.sendStatus(500);
        });
});

app.get('/api/downloads', (req, res) => {
    downloaded.find({})
        .then((items) => {
            res.status(200).json(items);
        })
        .catch((error) => {
            console.error('Error retrieving items:', error);
            res.sendStatus(500);
        });
});




const reportSchema = new mongoose.Schema(
    {
        username: String,
        software: String,
        bugs_reported: [String],
        requested_features: [String],
        status: {
            type: String,
            default: "notused"
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




const transactionschema = new mongoose.Schema(
    {
        department: String,
        transactionhashes: [
            {
                name: String,
                hash: String
            }
        ]
    },
    { versionKey: false }
);

const transactiondata = mongoose.model('transactionhistory', transactionschema);

app.post('/api/transactionhistory', (req, res) => {
    const department = req.body.rolename;
    const transactionName = req.body.transactionName;
    const transactionHash = req.body.txhash;

    transactiondata.findOne({ department })
        .then((item) => {
            if (item) {
                // Department exists, append transaction object to the array
                item.transactionhashes.push({ name: transactionName, hash: transactionHash });
                return item.save();
            } else {
                // Department doesn't exist, create a new entry
                const newItem = new transactiondata({
                    department,
                    transactionhashes: [{ name: transactionName, hash: transactionHash }]
                });
                return newItem.save();
            }
        })
        .then((result) => {
            console.log('Saved item:', result);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error('Error saving item:', error);
            res.sendStatus(500);
        });
});


app.get('/api/transactionhistory', (req, res) => {
    transactiondata.find({})
        .then((items) => {
            res.status(200).json(items);
        })
        .catch((error) => {
            console.error('Error retrieving items:', error);
            res.sendStatus(500);
        });
});








const signupschema = new mongoose.Schema(
    {
        role: {
            type: String,
            default: "user"
        },
        username: {
            type: String,
            unique: true,
        },
        email: String,
        password: String
    },
    { versionKey: false }
);

signupschema.pre("save", function (next) {
    const user = this;

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError);
                    }

                    user.password = hash;
                    next();
                });
            }
        });
    } else {
        return next();
    }
});

const signupdata = mongoose.model('signupdetail', signupschema);

app.post('/api/signupdetail', (req, res) => {
    const newItem1 = new signupdata({ username: req.body.uname, email: req.body.mail, password: req.body.key });
    newItem1
        .save()
        .then((result) => {
            console.log('Saved item:', result);
            res.sendStatus(200);
        })

});


const maxAge = 3 * 24 * 60 * 60 * 1000;


app.get('/api/signupdetail', async (req, res) => {
    const { identifier, password } = req.query;

    try {
        const user = await signupdata.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        });

        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    const token = jwt.sign({ username: user.username, role: user.role }, 'secret_key is blash');

                    res.cookie("jwt", token, {
                        withCredentials: true,
                        httpOnly: false,
                        maxAge: maxAge,
                    })

                    res.json({ status: 'success', token, created: true, role: user.role, user: user.username });

                    console.log(token);
                } else {
                    res.send('failure'); // Incorrect password
                }
            });
        } else {
            res.send('failure'); // User not found
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/api/profile', (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret_key is blash');
            const { role, username } = decoded;
            res.json({ role, username });
        } catch (err) {
            res.sendStatus(401); // Invalid token
        }
    } else {
        res.sendStatus(401); // No token found
    }
});

