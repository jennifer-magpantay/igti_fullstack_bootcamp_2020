import mongoose from 'mongoose'

const schemaGrade = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    },
    lastModified: {
        type: Date,
    },
}, { timestamps: { updatedAt: 'lastModified' } }
);
// adding a new object following this new schema
mongoose.model("grades", schemaGrade);
const Grade = mongoose.model("grades");

export { Grade }

// The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema. The type assigned is Date.

// src available on: 
// https://mongoosejs.com/docs/guide.html#timestamps