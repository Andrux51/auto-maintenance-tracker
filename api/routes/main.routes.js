'use strict';

module.exports = (fs) => {
    return [
        {
            method: 'GET',
            path: '/api',
            handler: (req, rep) => {
                rep.file('./api/views/api.html');
            }
        },
        {
            method: 'GET',
            path: '/api/test',
            handler: (req, rep) => {
                fs.readFile('./api/json/test.json', (err, data) => {
                    rep(JSON.parse(data));
                });
            }
        }
    ]
};
