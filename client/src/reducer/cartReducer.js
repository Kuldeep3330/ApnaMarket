export const cartReducer = (state, action) => {
    switch (action.type) {
      case 'SET_CART':
        return action.payload;
  
      case 'ADD_ITEM':
        const itemExists = state.find(item => item.productId._id === action.payload.productId._id);
        if (itemExists) {
          return state.map(item =>
            item.productId._id === action.payload.productId._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
        } else {
          return [...state, action.payload];
        }
  
      case 'REMOVE_ITEM':
        return state.filter(item => item._id !== action.payload);
  
      case 'CLEAR_CART':
        return [];
  
      default:
        return state;
    }
  };
  