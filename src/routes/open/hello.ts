// express is the framework we're going to use to handle requests
import express, { NextFunction, Request, Response, Router } from 'express';

// retrieve the router object from express
const helloRouter: Router = express.Router();

/**
 * @api {get} /hello Request a Hello World message
 * @apiName GetHello
 * @apiGroup Hello
 *
 * @apiDescription TL;DR Use the HTTP GET methods when requesting a resource from
 * an http server/service. The HTTP GET maps to the (R - read) in the acronym CRUD for the
 * common operations performed on a database.
 *
 * @apiSuccess {String} message the String: "Hello, you sent a GET request"
 */

interface FullName {
    first: string;
    last: string;
}

interface NamedRequest extends Request {
    // because when we create a obj we has no access to Request
    name: FullName;
}

function middleware(request: Request, response: Response, next: NextFunction) {
    if (Math.random() > 0.5) {
        console.log('You shall pass!');
        next();
        return;
    } else {
        response.status(400).send({ message: 'You shall not pass!' });
        return; // make sure outside that branch nothing happen
    }
    // console.log("middleware");
    // next();
}

helloRouter.get(
    '/',
    middleware,
    (request: NamedRequest, response: Response, next: NextFunction) => {
        const user: FullName = {
            first: 'Huy',
            last: 'Huynh',
        };
        request.name = user;
        console.log('Middleware 1');
        next();
    },
    (request: NamedRequest, response: Response) => {
        console.log('Middleware 2');
        console.dir(request.name);
        response.send({
            message: 'Hello, you sent a GET request',
        });
    }
);

/**
 * @api {post} /hello Request a Hello World message
 * @apiName PostHello
 * @apiGroup Hello
 *
 * @apiDescription TL;DR Use the HTTP POST methods when creating a new resource on
 * an http server/service. The HTTP POST maps to the (C - create) in the acronym CRUD for the
 * common operations performed on a database.
 *
 * @apiSuccess {String} message the String: "Hello, you sent a POST request"
 */
helloRouter.post('/', (request: Request, response: Response) => {
    response.send({
        message: 'Hello, you sent a POST request',
    });
});

/**
 * @api {put} /hello Request a Hello World message
 * @apiName PutHello
 * @apiGroup Hello
 *
 * @apiDescription TL;DR Use the HTTP PUT methods when altering/changing aa exsisting resource on
 * an http server/service. The HTTP PUT maps to the (U - update) in the acronym CRUD for the
 * common operations performed on a database.
 *
 * @apiSuccess {String} message the String: "Hello, you sent a PUT request"
 */
helloRouter.put('/', (request: Request, response: Response) => {
    response.send({
        message: 'Hello, you sent a PUT request',
    });
});

/**
 * @api {delete} /hello Request a Hello World message
 * @apiName DeleteHello
 * @apiGroup Hello
 *
 * @apiDescription TL;DR Use the HTTP DELETE methods when delteing an exsiting resource on
 * an http server/service. The HTTP DELETE maps to the (D - delete) in the acronym CRUD for the
 * common operations performed on a database.
 *
 * @apiSuccess {String} message the String: "Hello, you sent a DELETE request"
 */
helloRouter.delete('/', (request: Request, response: Response) => {
    response.send({
        message: 'Hello, you sent a DELETE request',
    });
});

// Make the router object visible to outside modules
export { helloRouter };
