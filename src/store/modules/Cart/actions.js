export function addToCartRequest(id){
    return {
        type:'ADD_TO_CART_REQUEST',
        id
      }
}

export function addToCartSucess(product){
  return {
      type:'ADD_TO_CART_SUCESS',
      product
    }
}

export function removeFromCart(id){
    return {
        type:'REMOVE_FROM_CART',
        id
      }
}
export function updateAmountRequest(id, amount){
  return {
    type:'UPDATE_AMOUNT_REQUEST',
    id,
    amount
  }
}

export function updateAmountSucess(id, amount){
  return {
    type:'UPDATE_AMOUNT_SUCESS',
    id,
    amount
  }
}