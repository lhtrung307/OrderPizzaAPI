# OrderPizzaAPI

Hapi ReST API for ordering pizza

Pizza list page:
GET /products : Get all products  
POST /products : Create new product

Pizza detail page:  
GET /products/{id} : Get product detail by id  
GET /products/{id}/rates : Get all rates of product by id  
Customer rates pizza:  
POST /products/{id}/rates : Create new rate for product with product id

Login page:
POST /login

Sign up page:
POST /customers : Create new customer

Change user info:
PUT /customers/{id} : Update customer by id

Check out:
POST /orders : Create new order

Show list of categories in menu:
GET /categories : Get all categories

GET /product-pricing-rules : Get all product pricing rules  
POST /product-pricing-rules : Create new product pricing rule
