import { useDispatch } from 'react-redux';
import { TRootDispatch } from '../services/store';

type DispatchFunc = () => TRootDispatch;
export const useTypedDispatch: DispatchFunc = useDispatch;
