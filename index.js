'use strict';
var amphtmlValidator = require('amphtml-validator');
var walk    = require('walk');
var fs    = require('fs');
var files   = [];

// Walker options
var walker  = walk.walk('./_site/amp/ideas', { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
});

walker.on('end', function() {
    files.forEach(function (result) {
        fs.readFile(result, function (err, data) {
            if (err) {
                throw err;
            }

            amphtmlValidator.getInstance().then(function (validator) {
                var validationResult = validator.validateString( data.toString());
                console.log(validationResult.status + ": " + result);
                if (validationResult.status !== 'PASS') {
                    process.exit(1);
                }
            });
        });
    });
});