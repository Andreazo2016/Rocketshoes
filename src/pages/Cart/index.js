import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';
import { formatPrice } from '../../util/format'
import * as CartActions from '../../store/modules/Cart/actions';


export default function Cart() {

  const total = useSelector( state => formatPrice(state.CartReducer.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0)))

  const cart = useSelector( state =>  state.CartReducer.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount)
  })))


  const dispatch = useDispatch()



  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1))
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1))
  }
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            cart.map(product => (
              <tr>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button"
                      onClick={() => decrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={product.amount} />
                    <button type="button"
                      onClick={() => increment(product)}
                    >
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subTotal}</strong>
                </td>
                <td>
                  <button type="button"
                    onClick={
                      () => dispatch(CartActions.removeFromCart(product.id))
                    }
                  >
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>

      </ProductTable>

      <footer>
        <button type="button">
          Finalizar pedido
        </button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

/**
 * Quando precisamos realizar algum calculo baseado em alguma informação dentro do reducer
 * melhor lugar é mapStateToProps.
 * 
 * obs: o mapStateToProps será só atualizado quando alguma valor/propriedade no reducer for atualizada
 * 
 * 
 * const mapStateToProps = state => ({
  cart: state.CartReducer.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount)
  })),
  total: formatPrice(state.CartReducer.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0))
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
 * 
 */

