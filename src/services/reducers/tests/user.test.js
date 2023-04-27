import userReducer, { initialState } from '../user';
import {
    FETCH_USER_SUCCESS,
    CLEAR_USER,
    FETCH_USER_FAILED,
    FETCH_USER_LOADING,
} from '../../constants/user';
import { USER } from './constants';

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });
    it('should set loading when we trying to get data from server', () => {
        const state = userReducer(initialState, { type: FETCH_USER_LOADING });
        expect(state.status.isLoading).toBe(true);
    });
    it('should update user', () => {
        const state = userReducer(initialState, {
            type: FETCH_USER_SUCCESS,
            payload: USER,
        });
        expect(state.user).toEqual(USER);
    });
    it('should clear user with logout', () => {
        const currentState = { ...initialState, user: USER };
        const state = userReducer(currentState, { type: CLEAR_USER });
        expect(state.user).toBeNull();
    });
    it('should set error when fetching is incorrect', () => {
        const state = userReducer(initialState, { type: FETCH_USER_FAILED });
        expect(state.status.fetchUserFailed).toBe(true);
    });
});
