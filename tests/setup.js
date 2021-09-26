jest.setTimeout(50000)
require('../models/User')

const mongoose = require('mongoose');
const keys = require('../config/keys')

// mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI)

// Jest should implement this file before other tests first, we
// have to tell it jest directly. In package.json write the instruction
// "jest" : "setupTestFramework..."