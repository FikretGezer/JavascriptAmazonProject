import {cart, removeFromCart, saveToStorage} from '../data/cart.js';
import {products} from '../data/products.js';

let ultimateTotal = JSON.parse(localStorage.getItem('totalItems')) || 0;
let cartSummaryHTML = '';
createCheckout();
function createCheckout()
{
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
    
        let currentItem;
        products.forEach(product => {
            if(productId === product.id)
                currentItem = product;
        });
        cartSummaryHTML += `    
            <div class="cart-item-container js-cart-item-${currentItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>
        
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${currentItem.image}">
        
              <div class="cart-item-details">
                <div class="product-name">
                  ${currentItem.name}
                </div>
                <div class="product-price">
                  $${(currentItem.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-${currentItem.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${currentItem.id}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${currentItem.id}">
                    Delete
                  </span>
                </div>
              </div>
        
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${currentItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${currentItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${currentItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
    });
}
const orders = document.querySelector('.order-summary');
orders.innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId; 
            const container = document.querySelector(`.js-cart-item-${productId}`);
            removeFromCart(productId); 
            container.remove();        
            calculateCount();
        });
    });

const checkoutCountEl = document.querySelector('.js-item-count');
checkoutCountEl.innerHTML = `${ultimateTotal} items`;

function calculateCount()
{
  ultimateTotal = 0;

  cart.forEach((item) => {
    ultimateTotal += Number(item.quantity);
  });

  checkoutCountEl.innerHTML = `${Number(ultimateTotal)} items`;
  localStorage.setItem('totalItems', JSON.stringify(Number(ultimateTotal)));
}
document.querySelectorAll('.js-update-link').forEach((updateLink) => {
  updateLink.addEventListener('click', () => {

    let inside = updateLink.innerHTML;
    updateLink.innerHTML = inside == 'Select' ? 'Update' : 'Select'; 

    const productId = updateLink.dataset.productId;
    const qtty = document.querySelector(`.js-quantity-${productId}`);

    let selectedItem;
    cart.forEach(item => {
            if(productId === item.productId)
            {
              selectedItem = item;              
            }
        });
    if(selectedItem != null)
    {
      if(updateLink.innerHTML === 'Select')
      {
        qtty.innerHTML = `<input class="quantity-value js-input-${selectedItem.productId}" type="number">`;
      }
      else {
        const selectedValue = document.querySelector(`.js-input-${selectedItem.productId}`);
        selectedItem.quantity = Number(selectedValue.value);
        qtty.innerHTML = `${selectedItem.quantity}`;
        calculateCount();          
      }
    }
  });
});
