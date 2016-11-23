const html = require('yo-yo')

module.exports = (dispatch) => {
  return html`
  <div id='header'>
    <div id='innerHeader'>
      <div id='logo'>
        <img onclick=${() => dispatch({type: 'GO_PAGE', payload: '/'})} src='https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png'/>
      </div>
      <div id='block'></div>
      <div id='searchAndCart'>
        <input onclick=${(e) => e.target.value = ''} onkeyup=${(e) => {
          dispatch({type: 'SEARCH_FOR_PRODUCTS', payload: e.target.value})
        }} placeholder='Search products'/>
        <button onclick=${() => dispatch({type: 'GO_PAGE', payload: '/cart'})}>Cart</button>
      </div>
    </div>
  </div>
  `
}
