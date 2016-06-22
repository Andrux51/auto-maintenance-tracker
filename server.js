'use strict';

const hapi = require('hapi');
const path = require('path');
const fs = require('fs');

const server = new hapi.Server();

var hapiPlugins = [
    require('inert'),
    require('vision')
];

server.connection({
    host: 'localhost',
    port: 80
});

server.register(hapiPlugins, (err) => {
    if (err) throw err;

    server.route([{
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            res.file('./dist/index.html');
        }
    }, {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './dist',
                index: false
            }
        }
    }]);

    server.route(require('./api/routes/main.routes')(fs));
});

server.ext('onPreResponse', (req, res) => {
    if (req.response.isBoom && req.response.output.statusCode == 404) {
        console.log(`Hapi routing to ${req.url.path} failed, defer to Angular`);
        return res.file('./dist/index.html');
    }

    return res.continue();
});

server.start((err) => {
    if (err) throw err;

    console.log('Server running at:', server.info.uri);
});
