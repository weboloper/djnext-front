const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: true,
};

export default function AuthReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    case "LOAD_USER":
      return {
        ...state,
        user: payload,
        error: null,
        isLoading: false,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: { ...state.user, profile: { ...state.user.profile, ...payload } },
        error: null,
        isLoading: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...payload },
        error: null,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: payload,
        isAuthenticated: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: payload,
      };
    case "LOADING_FALSE":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
