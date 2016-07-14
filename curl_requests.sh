# sign up

curl --include --request POST https://brewtiq-api.herokuapp.com/admin-sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "matt",
      "password": "p",
      "password_confirmation": "p"
    }
  }'

#sign in

curl --include --request POST https://brewtiq-api.herokuapp.com/admin-sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "shireen",
      "password": "shireen"
    }
  }'


--header "Authorization: Token token=OuK4I04EIpwaKGLKllN6XQHs8RvZMJwdcZUBxrBhrGU=--VJYQ89sAj04HwKTF7oDZXZLWSTho8K4gHjtWOdjKEfI=" \

#create product
curl --include --request POST https://brewtiq-api.herokuapp.com/products \
--header "Content-Type: application/json" \
--data '{
  "product": {
    "name": "The Skinny Vine",
    "description": "Thin Chardonnay",
    "category": "wine",
    "image": "http://www.theskinnyvine.com/images/bottles/slim-chardonnay.png",
    "price": 18.00
  }
}'

curl --include --request POST https://brewtiq-api.herokuapp.com/products \
--header "Content-Type: application/json" \
--data '{
  "product": {
    "name": "Pacifico Lager",
    "description": "One taste of Pacifico beer will have you tearing down walls for this unique Mexican lager. Versatile and made from grass­fed, free­range, organic, cruelty-free hops, yeast, and barley, this year­round favorite is a go­to for any meal.",
    "category": "beer",
    "image": "https://www.gianteagle.com/ProductImages/PRODUCT_NODE_59/80660000060.jpg",
    "price": 14.99
  }
}'

curl --include --request PATCH https://brewtiq-api.herokuapp.com/products/5786876f775cb41200ac3590 \
--header "Content-Type: application/json" \
--data '{
  "product": {
    "price": 15
  }
}'


"_owner": 5784661aeded3c13412fe4a5
"items": [ { "product_id": 578496f937f3cb1e4f3b59d4, "quantity": 1, "price": 15.00}, { "product_id": 5784961b37f3cb1e4f3b59d3, "quantity": 2, "price": 25.00} ],

# create valid order

curl --include --request POST https://brewtiq-api.herokuapp.com/orders \
--header "Content-Type: application/json" \
--data '{
"order": {
 "_owner": "57868056775cb41200ac3587",
 "items": [
   {
     "product_id": "578680a6775cb41200ac3589",
     "name":"The Skinny Vine",
     "price": 18,
     "quantity": 1
   }],
 "total": 18
}
}'


curl --include --request POST http://localhost:3000/carts \
--header "Content-Type: application/json" \
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


# create an invalid order:

curl --include --request POST http://localhost:3000/orders \
--header "Content-Type: application/json" \
--data '{
"order": {
  "items": [
    {
      "product_id": "578496f937f3cb1e4f3b59d4",
      "price": 10,
      "quantity": 1
    },
    {
      "product_id": "5784961b37f3cb1e4f3b59d3",
      "price": 20,
      "quantity": 3
    }],
  "total": 50.00
}
}'

# delete order

curl --include --request DELETE http://localhost:3000/orders/578544c6cbfe29b083850394


# create profile
curl --include --request POST http://localhost:3000/profiles \
  --header "Content-Type: application/json" \
  --data '{
    "profile": {
      "name": {
        "given": "Shireen",
        "surname": "Kheradpey"
        },
      "addresses": [
        {
          "street": "260 Brookline St",
          "apt": "Apt 1",
          "city/state": "Cambridge, MA"
        },
        {
          "street": "45 Stuart St",
          "apt": "Apt 1803",
          "city/state": "Boston, MA"
        }]
    }
  }'

  # create admin (deactivate after creation)

  curl --include --request POST http://localhost:3000/admin-sign-up \
    --header "Content-Type: application/json" \
    --data '{
      "credentials": {
        "email": "admin",
        "password": "adpass",
        "password_confirmation": "adpass"
      }
    }'

    # admin sign in

    curl --include --request POST http://localhost:3000/admin-sign-in \
      --header "Content-Type: application/json" \
      --data '{
        "credentials": {
          "email": "shireen_admin",
          "password": "p"
        }
      }'
