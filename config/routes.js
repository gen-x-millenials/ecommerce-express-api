'use strict';

module.exports = require('../lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

//added routes
.resources('orders')
.resources('products')
.resources('profiles')

//admin panel
.post('/admin-sign-up', 'admins#signup')
.post('/admin-sign-in', 'admins#signin')
.delete('/admin-sign-out/:id', 'admins#signout')
.resources('admins', { only: ['index', 'show'] })

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
;
