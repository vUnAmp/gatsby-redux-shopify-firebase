import storeTypes from './store.types'

const INITIAL_STORE_STATE = {
  // products: {
  //   shopifyId: null,
  //   price: null,
  //   value: null,
  // },
  products:
    (typeof window !== 'undefined' &&
      JSON.parse(window.localStorage.getItem('oderItems'))) ||
    [],
}
const storeReducer = (state = INITIAL_STORE_STATE, action) => {
  switch (action.type) {
    case storeTypes.PLUS_ITEM:
      return {
        ...state,
        products: action.payload,
      }
    case storeTypes.CLEAR_CART:
      return {
        ...state,
        products: action.payload,
      }

    default:
      return state
  }
}
export default storeReducer
