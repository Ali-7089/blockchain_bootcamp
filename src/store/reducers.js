export const provider = (state = {}, action) => {
  switch (action.type) {
    case "PROVIDER_LOADED":
      return {
        ...state,
        connection: action.connection,
      };
      case "NETWORK_LOADED":
      return {
        ...state,
        chainId: action.chainId,
      };
      case "ACCOUNT_LOADED":
      return {
        ...state,
        account: action.account,
      };

      case "ETHERS_LOADED":
      return {
        ...state,
        amount: action.amount,
      };
    default:
      return state;
  }
};

export const tokens = (state = {contracts:[], symbols:[],loaded:false}, action) => {
  switch (action.type) {
    case 'TOKEN_1_LOADED':
      return{
        ...state,
        loaded : true,
        symbols :[...state.symbols , action.symbols],
        contracts: [...state.contracts , action.contracts]
      }
      case 'TOKEN_2_LOADED':
      return{
        ...state,
        loaded : true,
        symbols :[...state.symbols , action.symbols],
        contracts: [...state.contracts , action.contracts]
      }
    default:
      return state;
  }
};

export const exchange = (state = {loaded:false}, action) => {
  switch (action.type) {
    case 'EXCHANGE_LOADED':
      return{
        ...state,
        loaded : true,
        exchange : action.exchange
      }
    default:
      return state;
  }
};

