# E-Commerce : Vesellistt

**Installation and Getting Started**

```markdown
$ npm init -y (inside root server folder)
$ npm install (inside root server folder)
$ npm run dev or nodemon app.js (on terminal inside root server folder)
$ npm run serve (on terminal inside root client folder)
```

## User Routes

|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/register  |POST  |none|firstName:String(**required**)<br />lastName:String(**required**)<br/>email:String(**required**)<br/>password:String(**required**)|****Success****: Register a user, ****Error****: Internal server error (Validation)|Register a user|
|/users/webLogin  |POST  |none|email:String(**required**)<br/>password:String(**required**) |****Success****: Login as a user, ****Error****: Internal server error (Validation)|Login as a user|


## Product Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/products  |GET  |token|none |****Success****: Get all products available on the market, ****Error****: Internal server error (Validation)|List all Products|
|/products  |POST  |token|name:String(**required**)<br />image:String<br/>price:String(**required**)<br/>stock:String(**required**) |****Success****: List Ship to the website ****Error****: Internal server error (Validation)|Post a product|
|/products/:id |DELETE |token|Params: ProductId(**required**) |****Success****: Success Delete a product ****Error****: Internal server error (Validation)|Delete a product|
|/products/:id |PUT |token|name:String(**required**)<br />image:String<br/>price:String(**required**)<br/>stock:String(**required**)</br><br /><br />Params: ProductId |****Success****: Update a product ****Error****: Internal server error (Validation)|Update a product|



## Cart Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/carts |GET  |token|none |****Success****: Get User cart ****Error****: Internal server error (Validation)|Get User cart with list of products|
|/carts  |POST  |token|productId:String(**required**)<br />image:String<br/>price:String(**required**)<br/>stock:String(**required**)|****Success****: Add a new cart, ****Error****: Internal server error (Validation)|Add Product to Cart|
|/carts  |DELETE  |token|none|****Success****: Delete a cart, ****Error****: Internal server error (Validation)|Delete user Cart|
|/carts/:id |DELETE |token|Params: ProductId(**required**)|****Success****: Delete a product from user cart, ****Error****: Internal server error (Validation)|Delete product from user Cart|
|/carts/:id |PUT |token|Params: ProductId(**required**)|****Success****: Update product Quantity from User Cart, ****Error****: Internal server error (Validation)|Update product quantity from user cart|
