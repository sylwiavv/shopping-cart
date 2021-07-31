const body = document.body;
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const productList = document.querySelectorAll('.products-list-container');
const cartArray = [];

// ADD CLICK
addToCartButtons.forEach(addButton => {
  addButton.addEventListener('click', (event) => {
    const addButtonClicked = event.target;
    const parentButtonClicked = addButtonClicked.parentElement.parentElement.parentElement;
    let productId = parentButtonClicked.dataset.productId;
    let productQty = parentButtonClicked.querySelector('.product-information__qty').value;
    productQty = parseInt(productQty);

    if (isNaN(productQty) || productQty <= 0 || typeof productQty === 'string') {
      productQty = 1;
    } else {
      productQty = productQty;
    }

    const cartItem = cartArray.filter(item => {
        return item.Id === productId;
    })

    if (!cartItem.length) {
      cartArray.push({
        Id: productId,
        Qty: productQty
      });

    } else {
      cartItem[0].Qty = productQty + cartItem[0].Qty;
    }

    renderCart();
    updateNumberInCart();
  })
})

// Render products in cart
const renderCart = () => {
  let products = cartArray.map((cartItem) => {
    let product = productsArray.filter(obj => {
      return cartItem.Id === obj.Sku;
    })[0];
    product.Qty = cartItem.Qty;
    return product;
  });

  renderCartProducts(products);
  removeCartProduct();
  totalCartPrice();
}

const removeCartProduct = () => {
  const removeButtons = document.querySelectorAll('.remove-from-cart');
  removeButtons.forEach(removeButton => {
    removeButton.addEventListener('click', (event) => {
      const parentButtonClicked = removeButton.parentElement.parentElement;
      let productId = parentButtonClicked.dataset.productId;

      let productCart = cartArray.filter(item => {
          return item.Id === productId;
      });

      cartArray.pop(productCart);

      renderCart();
      updateNumberInCart();
    })
  });
}

const updateNumberInCart = () => {
  const amountCart = document.querySelector('#cart-product-number');
  amountCart.innerHTML = cartArray.length;
}

//Total cart price
const totalCartPrice = () => {
  const cartItems = document.querySelectorAll('#main-products-cart-list > .product');
  if ( cartItems.length ) {
    let total = 0;
     for ( var i = 0; i < cartItems.length; i++) {
       let prodCart = cartItems[i];
       let prodCartPrice = prodCart.querySelectorAll('.product-information__price')[0];
       let price = parseFloat(prodCartPrice.innerText.replace('$', ''));
       let prodCartQty = prodCart.querySelectorAll('.product-information__qty')[0];
       let qty = prodCartQty.value;
       qty = parseInt(qty, 10);
       total = total + (price * qty);
     }
     document.querySelectorAll('#total-price')[0].innerHTML = '$' + total;

   } else if (cartItems.length === 0) {
     document.querySelectorAll('#total-price')[0].innerHTML = '$' + 0;
   }
}

const minicartWrapper = document.querySelector('.minicart-wrapper');
const cartListWrapper = document.querySelector('#cart-list');
console.log(minicartWrapper);

minicartWrapper.addEventListener('click', (event) => {
  minicartWrapper.classList.toggle('active');
  body.classList.toggle('not-scroll');

  if (minicartWrapper.classList.contains("active")) {
    cartListWrapper.classList.add("active");
    console.log('test');

  } else  {
    cartListWrapper.classList.remove("active");
    console.log('test3');
  }
});
