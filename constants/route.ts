export const API_ROUTES = {
  checkUserExist: {
    path: 'auth/checkUserExist',
    getPath: () => 'auth/checkUserExist'
  },
  checkUserNameExist: {
    path: 'auth/checkUserNameExist',
    getPath: () => 'auth/checkUserNameExist'
  },
  createUser: {
    path: 'auth/createUser',
    getPath: () => 'auth/createUser'
  },
  currentBalance: {
    path: 'balance/currentBalance',
    getPath: () => 'balance/currentBalance'
  },
  getCurrentUser: {
    path: 'user/currentUser',
    getPath: () => 'user/currentUser'
  },
  getAllCategories: {
    path: 'category/',
    getPath: () => 'category/'
  },
  getAggregatedExpenses: {
    path: 'category/aggregatedExpenses',
    getPath: () => 'category/aggregatedExpenses'
  },
  addNewExpense: {
    path: 'expense/create',
    getPath: () => 'expense/create'
  },
  getTransactionHistory: {
    path: 'expense/history',
    getPath: () => 'expense/history'
  }
};
