const queue = require('../config/kue');

const resetPasswordMailer = require('../mailers/reset_password_mailer');

queue.process('emails', function(job, done) {
    console.log('Email worker is processing the job', job.data);

    resetPasswordMailer.resetPassword(job.data);
    done();
});