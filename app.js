const express = require('express');
const app = express();
const db = require('./database/index');

class App {
    constructor() {
        this.app = app;
        this.routes = [
            {
                file: 'city', auth: true, info: [
                    {path: require('./routes/city-route'), name: '/city'}
                ],
            },
            {
                file: 'state', auth: true, info: [
                    {path: require('./routes/state-route'), name: '/state'}
                ],
            },
            {
                file: 'customer', auth: true, info: [
                    {path: require('./routes/customer-route'), name: '/customer'}
                ],
            }
        ];

        this.initApp();
    }

    initApp() {
        db.connection.once('open', () => {
            console.log('Connected to MongoDB');
        });
        
        db.connection.once('error', (err) => {
            console.log(err);
        });
        
        this.app.use(express.json());
        
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Header', 
                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            );
        
            if (req.method === 'OPTIONS') {
                res.hader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                return res.status(200).send({});
            }
        
            next();
        });
        
        this.routes.filter(routesCollection => {
            routesCollection.info.filter(data => {
                    this.app.use(data.name, data.path);
            });
        });
        
        this.app.use((req, res, next) => {
            const error = new Error('Not found');
            error.status = 404;
            next(error); 
        });
        
        this.app.use((error, req, res, next) => {
            const status = error.status || 500;
            res.status(status);
            return res.send({
                erro: {
                    message: error.message
                },
                status: status
            })
        });
    }
}

module.exports = new App().app;
/*
const routes = [
    {
        file: 'city', auth: true, info: [
            {path: require('./routes/city-route'), name: '/city'}
        ],
    }
];

db.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

db.connection.once('error', (err) => {
    console.log(err);
});

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.hader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

routes.filter(routesCollection => {
    routesCollection.info.filter(data => {
            app.use(data.name, data.path);
    });
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); 
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status);
    return res.send({
        erro: {
            message: error.message
        },
        status: status
    })
});

module.exports = app;
*/