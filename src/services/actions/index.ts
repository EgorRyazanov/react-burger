import * as UserActionCreators from './user';
import * as ConstructorActionCreators from './constructor';
import * as IngredientsActionCreators from './fetch-ingredients';
import * as OrderActionCreators from './order-details';

const actionCreators = {
    ...UserActionCreators,
    ...ConstructorActionCreators,
    ...IngredientsActionCreators,
    ...OrderActionCreators,
};

export default actionCreators;
