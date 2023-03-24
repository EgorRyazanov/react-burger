import {
    TUserAction,
    EnumUserActionsTypes,
    TInitialState,
} from '../../utils/types/actions-types/user-types';

const initialState: TInitialState = {
    user: null,
    status: {
        isLoading: false,
        fetchUserFailed: false,
    },
};

const userReducer = (state = initialState, action: TUserAction) => {
    switch (action.type) {
        case EnumUserActionsTypes.FETCH_USER_SUCCESS: {
            return {
                ...state,
                user: { ...action.payload },
                status: {
                    ...state.status,
                    isLoading: false,
                },
            };
        }
        case EnumUserActionsTypes.FETCH_USER_LOADING: {
            return {
                ...state,
                status: {
                    ...state.status,
                    isLoading: true,
                },
            };
        }
        case EnumUserActionsTypes.FETCH_USER_FAILED: {
            return {
                ...state,
                status: {
                    fetchUserFailed: true,
                    isLoading: false,
                },
            };
        }
        case EnumUserActionsTypes.RESET_ERROR_STATUS: {
            return {
                ...state,
                status: {
                    ...state.status,
                    fetchUserFailed: false,
                },
            };
        }
        case EnumUserActionsTypes.UPDATE_USER: {
            return {
                ...state,
                user: { ...action.payload },
            };
        }
        case EnumUserActionsTypes.CLEAR_USER: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
