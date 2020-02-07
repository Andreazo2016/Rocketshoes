import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md'
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import { ProductList } from './styles';

import * as CartActions from '../../store/modules/Cart/actions'

export default function Home() {

  const amount = useSelector( state => 
      state.CartReducer.reduce((amountSum, product) => {
      /**
       * 
       * Cria um objeto amount no qual ele vai conter a quantidade de cada produto referenciado pelo id.
       * ex: { 3: 40} // o produto com id = 3 tem a quantidade 40
       */
      amountSum[product.id] = product.amount || 0;
  
      return amountSum;
    }, {})
   )

  const dispatch = useDispatch()

  const [products, setProducts] = useState([])


  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products')

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }))


      setProducts(data);
    }

    loadProducts();
  }, []);


  /**
   * 
   * Só usa useCallback caso a função dependesse de algum variavel vindo de props ou State
   *  
   */
  function handleAddProduct(id) {

    dispatch(CartActions.addToCartRequest(id))

  }

  return (
    <ProductList>
      {
        products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button type="button"
              onClick={() => { handleAddProduct(product.id) }}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" /> {amount[product.id] || 0}
              </div>
              <span>Adicionar ao carrinho</span>

            </button>
          </li>
        ))
      }
    </ProductList>
  );

}


/*

#SEM HOOKS



const mapStateToProps = state => ({
  amount: state.CartReducer.reduce((amount, product) => {
    amount[product.id] = product.amount || 0;

    return amount;
  }, {})
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home)
*/