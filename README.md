BREWTIQUE ECOMMERCE PLATFORM BACKEND

Collaborators:
Shireen Kheradpey
Matt Buffardi
Arielle Bressler Lopez
Jon Janulewicz

Technologies:
Express.js
MongoDB
Mongooose
Herokuapp


# brewtiq-api

A simple API for an ecommerce platform.


## Structure

`brewtiq-api` follows the standard project structure for Express.js.

User authentication is built-in.
Admin authentication mirrors user authentication.

`curl` command scripts are stored in [`curl_requests.sh`] some pointing to a localhost,
some pointing to the deployed herokuapp.

## API

### products

| Verb   |   URI Pattern   |   Controller#Action  |
|:-------|:----------------|:---------------------|
| GET    | `/products`     | `products#index`     |
| GET    | `/products/:id` | `products#show`      |
| POST   | `/products`     | `products#create`    |
| PATCH  | `/products/:id` | `products#update`    |
| DELETE | `/products/:id` | `products#destroy`   |

### orders

| Verb   |    URI Pattern      | Controller#Action  |
|:-------|:--------------------|:-------------------|
| GET    | `/orders`           | `orders#index`     |
| GET    | `/orders/:id`       | `orders#show`      |
| GET    | `/owner-orders/:id` | `orders#show`      |
| POST   | `/orders`           | `orders#create`    |
| PATCH  | `/orders/:id`       | `orders#update`    |
| DELETE | `/orders/:id`       | `orders#destroy`   |


### profiles

| Verb   |   URI Pattern   |   Controller#Action  |
|:-------|:----------------|:---------------------|
| GET    | `/profiles`     | `profiles#index`     |
| GET    | `/profiles/:id` | `profiles#show`      |
| POST   | `/profiles`     | `profiles#create`    |
| PATCH  | `/profiles/:id` | `profiles#update`    |
| DELETE | `/profiles/:id` | `profiles#destroy`   |


### User Authentication

| Verb   | URI Pattern            | Controller#Action |
|:-------|:-----------------------|:------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| DELETE | `/sign-out/:id`        | `users#signout`   |

### User Authentication

| Verb   | URI Pattern            | Controller#Action |
|:-------|:-----------------------|:------------------|
| POST   | `/admin-sign-in`       | `admins#signin`    |
| DELETE | `/admin-sign-out/:id`  | `admins#signout`   |


Request:

```sh
curl --include --request POST https://brewtiq-api.herokuapp.com/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

#### POST /sign-in

Request:

```sh
curl --include --request POST https://brewtiq-api.herokuapp.com/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
```


Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

#### PATCH /change-password/:id

Request:

```sh
curl --include --request PATCH https://brewtiq-api.herokuapp.com/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
```


Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out/:id

Request:

```sh
curl --include --request DELETE https://brewtiq-api.herokuapp.com/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
```

Response:

```md
HTTP/1.1 204 No Content
```

### Users

| Verb | URI Pattern | Controller#Action |
|:-----|:------------|:------------------|
| GET  | `/users`    | `users#index`     |
| GET  | `/users/1`  | `users#show`      |

#### GET /users

Request:

```sh
curl --include --request GET https://brewtiq-api.herokuapp.com/users \
  --header "Authorization: Token token=$TOKEN"
```


Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "users": [
    {
      "id": 2,
      "email": "another@example.email"
    },
    {
      "id": 1,
      "email": "an@example.email"
    }
  ]
}
```

#### GET /users/:id

Request:

```sh
curl --include --request GET http://localhost:3000/users/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=2 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/user.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 2,
    "email": "another@example.email"
  }
}
```

#### POST /products
note: only currentAdmin is allowed to perform

```sh
curl --include --request POST 'https://brewtiq-api.herokuapp.com/products' \
--header "Content-Type: application/json" \
--header "Authorization: Token token=$TOKEN" \
--data '{
  "product": {
    "name": "Pacifico Lager",
    "description": "One taste of Pacifico beer will have you tearing down walls for this unique Mexican lager. Versatile and made from grass­fed, free­range, organic, cruelty-free hops, yeast, and barley, this year­round favorite is a go­to for any meal.",
    "category": "beer",
    "image": "https://www.gianteagle.com/ProductImages/PRODUCT_NODE_59/80660000060.jpg",
    "price": 15
  }
}'
```

#### PATCH /products

note: only currentAdmin is allowed to perform

```sh
curl --include --request PATCH 'https://brewtiq-api.herokuapp.com/products' \
--header "Content-Type: application/json" \
--header "Authorization: Token token=$TOKEN" \
--data '{
  "product": {
    "name": "Pacifico Lager",
    "category": "beer",
    "price": 16
  }
}'
```

#### PATCH /products
note: only currentAdmin is allowed to perform

```sh
curl --include --request PATCH 'https://brewtiq-api.herokuapp.com/products/ <INSERT PRODUCT ID HERE>
--header "Authorization: Token token=$TOKEN" \
--header "Content-Type: application/json" \
--data '{
  "product": {
    "name": "Pacifico Lager",
    "category": "beer",
    "price": 16
  }
}'
```


#### POST /orders

```sh
curl --include --request POST 'http://localhost:3000/orders' \
--header "Content-Type: application/json" \
--header "Authorization: Token \
token=OuK4I04EIpwaKGLKllN6XQHs8RvZMJwdcZUBxrBhrGU=--VJYQ89sAj04HwKTF7oDZXZLWSTho8K4gHjtWOdjKEfI=" \
--header "Authorization: Token token=$TOKEN" \
--data '{
"cart": {
 "_owner": "5786a2ff2c29d3120029b418",
 "items": [
   {
     "product_id": "578680a6775cb41200ac3589",
     "name":"The Skinny Vine",
     "price": 18,
     "quantity": 1
   },
   {
     "product_id": "5786814a775cb41200ac358a",
     "price": 38,
     "name":"2011 Shake Ridge Ranch Syrah",
     "quantity": 1
   }],
 "total": 56
}
}'
```
