/** Saga é um middleware que haje depois que uma action é desparada e antes de chegar no redux
 * 
 */

import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import {toast} from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { addToCartSucess,updateAmountSucess } from './actions'

function* addToCart({ id }) {


    const productExist = yield select(
        state => state.CartReducer.find(p => p.id === id)
    )

    const stock = yield call(api.get,`/stock/${id}`)

    const stockAmount = stock.data.amount;
    const currentAmount = productExist ? productExist.amount : 0;

    const amount = currentAmount + 1;

    if( amount > stockAmount ){
        toast.error('Quantidade fora de estoque!!!')
        return;
    }

    if (productExist) {

        yield put( updateAmountSucess(id, amount))
    } else {
        const response = yield call(api.get, `/products/${id}`)

        const data = {
            ...response.data,
            amount: 1,
            priceFotmatted: formatPrice(response.data.price)
        }
        yield put(addToCartSucess(data));

        history.push('/cart')

    }
}


function* updateAmount({ id, amount }){
    if( amount <= 0 ) return;

    const stock = yield call(api.get,`/stock/${id}`)

    const stockAmount = stock.data.amount;

    if( amount > stockAmount){
        toast.error('Quantidade fora de estoque!!!')
        return;
    }

    yield put( updateAmountSucess(id, amount))

}

export default all([
    takeLatest('ADD_TO_CART_REQUEST', addToCart),
    takeLatest('UPDATE_AMOUNT_REQUEST', updateAmount),
])