const deleteProductButtonElements = document.querySelectorAll(
  ".product-item button"
);

for (const deleteProductButtonElement of deleteProductButtonElements) {
  deleteProductButtonElement.addEventListener("click", deleteProduct);
}

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  // Sending data to the server using fetch()
  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    alert("Something went wrong");
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}
