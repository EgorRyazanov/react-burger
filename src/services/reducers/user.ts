import { TUserAction, TInitialState } from '../actions/user';
import {
    CLEAR_USER,
    FETCH_USER_FAILED,
    FETCH_USER_LOADING,
    FETCH_USER_SUCCESS,
    RESET_ERROR_STATUS,
    UPDATE_USER,
} from '../constants/user';

export const initialState: TInitialState = {
    user: null,
    status: {
        isLoading: false,
        fetchUserFailed: false,
    },
};

const userReducer = (state = initialState, action: TUserAction) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS: {
            return {
                ...state,
                user: { ...action.payload },
                status: {
                    ...state.status,
                    isLoading: false,
                },
            };
        }
        case FETCH_USER_LOADING: {
            return {
                ...state,
                status: {
                    ...state.status,
                    isLoading: true,
                },
            };
        }
        case FETCH_USER_FAILED: {
            return {
                ...state,
                status: {
                    fetchUserFailed: true,
                    isLoading: false,
                },
            };
        }
        case RESET_ERROR_STATUS: {
            return {
                ...state,
                status: {
                    ...state.status,
                    fetchUserFailed: false,
                },
            };
        }
        case UPDATE_USER: {
            return {
                ...state,
                user: { ...action.payload },
            };
        }
        case CLEAR_USER: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
