import { useDispatch } from 'react-redux';
import { TApplicationActions, TRootState } from '../services/reducers/root';
import { ThunkDispatch } from 'redux-thunk';

type TypedDispatch<T> = ThunkDispatch<T, any, TApplicationActions>;

export const useTypedDispatch = () => useDispatch<TypedDispatch<TRootState>>();
