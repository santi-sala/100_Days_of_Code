class Cart {
  constructor(items = []) {
    this.items = items;
  }

  //   Storing in users (log in or not) session not in database
  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    // Checking if the product already exists in cart
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      //   If theres a match, increment the quantity and total price
      if (item.product.id === product.id) {
        cartItem.quantity = cartItem.product + 1;
        cartItem.totalPrice = cartItem.totalPrice + product.price;
        this.items[i] = cartItem;
        return;
      }
    }
    // If theres no match in the current cart, we add the product to the cart using the predefined cartItem
    this.items.push(cartItem);
  }
}
