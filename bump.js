'use strict';
var fs    = require('fs');

var configFiles = ['./_config.yml', './_config-amp.yml']

configFiles.forEach(function(element) {
    fs.readFile(element, 'utf-8', function(err, data) {
        if (err)
        {
            console.log(err);
            process.exit(1);
        }

         var result = data.replace(new RegExp("version: ([0-9]+)"), 'version: ' + new Date().getTime());

        fs.writeFile(element, result, function(err) {
            if(err) {
                console.log(err);
                process.exit(1);
            }
        });

    });
});