import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TRootState } from '../services/reducers/root';

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;
