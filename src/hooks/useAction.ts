import { bindActionCreators } from 'redux';
import actionCreators from '../services/actions';
import { useTypedDispatch } from './useTypedDispatch';

export const useAction = () => {
    const dispatch = useTypedDispatch();
    return bindActionCreators<any, any>(actionCreators, dispatch);
};
