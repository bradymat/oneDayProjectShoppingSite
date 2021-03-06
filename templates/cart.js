const html = require('yo-yo')

const header = require('./header')
const footer = require('./footer')

module.exports = (state, dispatch) => {
  const { cart } = state
  return html`
  <div>
    ${header(state, dispatch)}
    <div id='cart'>
    <table>
    ${checkCartEmpty()}
    </table>
    </div>
    <div class='total'>
    ${total()}
    </div>
    ${footer()}
  </div>
  `
  function total () {
    if(cart.length !=0){
    const arr = cart.map((product) => {
      if (!product.deal){
        return product.price * product.quantity
      }
      return product.price * product.quantity * 0.8
    })
    const total = arr.reduce((a, b) => {
      return a+b
    })
    return html`<h3> Total is $${total}</h3>`
  }
  }
  function checkIfDeal (product) {
    return product.deal ? html`<div><br><p>$${0.8 * product.price} from </p><p class='bargain'>$${product.price}</p></div>` : html`<div><br><p>$${product.price}</p></div>`
  }
  function checkCartEmpty () {
    if(cart.length !=0){
      return html`
      ${cart.map((product) => html`
        <tr>
          <td><img src=${product.poster} /></td>
          <td><h4>${product.name}</h4></td>
          <td>${checkIfDeal(product)}</td>
          <td><p>${product.quantity}</p></td>
          <button onclick=${() => dispatch({type: 'ADD_PRODUCT_TO_CART', payload: product.name})}>Add</button>
          <button onclick=${() => dispatch({type: 'REMOVE_PRODUCT_FROM_CART', payload: product})}>Remove</button>
        </tr>
      `)}
      `
    }
    else return html`
    <div class='empty'>
    <h3>Not much of a rind in your cart</h3>
    </div>
    `
  }
}
