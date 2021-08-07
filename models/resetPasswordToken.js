const mongoose = require('mongoose');

const resetPasswordTokenSchema = new mongoose.Schema(
    {
        accessToken: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        isValid: {
            type: Boolean
        }
    }, {
        timestamps: true
    }
);

const ResetPasswordToken = mongoose.model('ResetPasswordToken', resetPasswordTokenSchema);
module.exports = ResetPasswordToken;