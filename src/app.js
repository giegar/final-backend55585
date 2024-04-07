import express from "express";
import session from "express-session";

import passport from "passport";
import { initializePassport } from "./config/passport.js";

import { Server } from "socket.io";
// import { engine } from "express-handlebars";

import MongoStore from "connect-mongo";
import { dbConnection } from "./config/config.js";

import * as path from "path";
import __dirname from "./utils.js";
import config from "./config/config.js";

import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import SessionRouter from "./routers/sessions.js";

import * as MessageRepository from "./repositories/messages.repository.js"
import * as ProductsRepository from "./repositories/products.repository.js"

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
    store: MongoStore.create({
        mongoUrl: `${config.MONGO_URL}/${config.DB_NAME}`,
        ttl: 3600,
    }),
    secret: config.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', path.resolve(__dirname + '/views'));

// app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('api/auth', SessionRouter);

await dbConnection();

const expressServer = app.listen(PORT, () => { console.log(`Running in port ${PORT}`) });
const io = new Server(expressServer);
/* 
io.on('connection', async (socket) => {
    
// real time products socket
    const limit = 10;
    const { payload } = await ProductsRepository.getProducts({ limit });
    const products = payload;
    socket.emit('products', payload)

    socket.on('newProduct', async(product) => {
        const newProduct = await ProductsRepository.addProduct({ ...product })

        if(newProduct) {
            products.push(newProduct)
            socket.emit('products', products)
        }
        
    })

// live chat socket

    const messages = await MessageRepository.getMessages();
    socket.emit('message', messages)

    socket.on('message', async (data) => {

        const newMsg = await MessageRepository.saveMessages({...data});
        if(newMsg){

            const messages = await MessageRepository.getMessages();
            io.emit('msgLogs', messages)
        }
    })

    socket.broadcast.emit('newUser')
}) */