'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

//added routes
.resources('orders')
.resources('products')
.resources('profiles')
.resources('carts')

//custom routes
.get('/owner_orders/:owner', 'orders#showUserOrders')
.get('/owner_carts/:owner', 'carts#showUserCarts')
.post('/charge', 'orders#createCharge')

.get('/wine', 'products#showWine')
.get('/beer', 'products#showBeer')
.get('/cider', 'products#showCider')

//admin panel
// .post('/admin-sign-up', 'admins#signup')
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
