import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../services/actions';

export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators<any, any>(actionCreators, dispatch);
};
