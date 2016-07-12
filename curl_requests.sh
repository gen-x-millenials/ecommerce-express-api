# sign up

curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "shireen@bean.com",
      "password": "p",
      "password_confirmation": "p"
    }
  }'

#sign in

curl --include --request POST http://localhost:3000/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "shireen@bean.com",
      "password": "p"
    }
  }'


--header "Authorization: Token token=OuK4I04EIpwaKGLKllN6XQHs8RvZMJwdcZUBxrBhrGU=--VJYQ89sAj04HwKTF7oDZXZLWSTho8K4gHjtWOdjKEfI=" \

#create product
  curl --include --request POST http://localhost:3000/products \
--header "Content-Type: application/json" \
--data '{
  "product": {
    "name": "The Skinny Vine",
    "description": "Thin Chardonnay",
    "category": "wine",
    "image": "http://www.theskinnyvine.com/images/bottles/slim-chardonnay.png",
    "price": 1800
  }
}'

curl --include --request POST http://localhost:3000/products \
--header "Content-Type: application/json" \
--data '{
"product": {
  "name": "Hawaiian Cider Co",
  "description": "Currently crowdfunding. Invest now!",
  "category": "cider",
  "image": "http://adoboloco.com/wp-content/uploads/2013/08/040414-hawaiian-back-adoboloco-maui-hawaii-hotsauce-510x652.jpg",
  "price": 16.00
}
}'

"_owner": 5784661aeded3c13412fe4a5
"items": [ { "product_id": 578496f937f3cb1e4f3b59d4, "quantity": 1, "price": 15.00}, { "product_id": 5784961b37f3cb1e4f3b59d3, "quantity": 2, "price": 25.00} ],

# create order
curl --include --request POST http://localhost:3000/orders \
--header "Content-Type: application/json" \
--data '{
"order": {
  "items": [
    {
      "product_id": "578496f937f3cb1e4f3b59d4",
      "price": 15,
      "quantity": 1
    },
    {
      "product_id": "5784961b37f3cb1e4f3b59d3",
      "price": 25,
      "quantity": 2
    }],
  "total": 65.00
}
}'
