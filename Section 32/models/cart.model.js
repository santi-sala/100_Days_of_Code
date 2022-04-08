class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
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
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }
    // If theres no match in the current cart, we add the product to the cart using the predefined cartItem
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }

  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      //   If theres a match, increment the quantity and total price
      if (item.product.id === product.id && newQuantity > 0) {
        // Making a copy of the found --> item {...item}
        const cartItem = { ...item };
        const quantityChange = newQuantity - item.quantity;
        cartItem.quantity = newQuantity;
        cartItem.totalPrice = newQuantity * product.price;
        this.items[i] = cartItem;

        this.totalQuantity = this.totalQuantity + quantityChange;
        this.totalPrice += quantityChange * product.price;
        return { updatedItemPrice: cartItem.totalPrice };
      } else if (item.product.id === product.id && newQuantity <= 0) {
        // .splaice is to remove a number of items (in this case 1) from an array starting from the provided index (i)
        this.items.splice(i, 1);
        this.totalQuantity = this.totalQuantity - item.quantity;
        this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0 };
      }
    }
  }
}

module.exports = Cart;
