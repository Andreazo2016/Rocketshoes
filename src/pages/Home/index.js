import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md'
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import { ProductList } from './styles';

import * as CartActions from '../../store/modules/Cart/actions'

class Home extends Component {

  state = {
    products: []
  }

  async componentDidMount() {
    const response = await api.get('/products')

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }))

    this.setState({ products: data })
  }

  handleAddProduct = id => {

    const { addToCartRequest } = this.props

    addToCartRequest(id)

  }

  render() {
    const { products } = this.state
    const { amount } = this.props
    return (
      <ProductList>
        {
          products.map(product => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>

              <button type="button"
                onClick={ ()=>{ this.handleAddProduct(product.id)}}
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
}


const mapStateToProps = state => ({
  amount: state.CartReducer.reduce((amount, product) => {
    /**
     * 
     * Cria um objeto amount no qual ele vai conter a quantidade de cada produto referenciado pelo id.
     * ex: { 3: 40} // o produto com id = 3 tem a quantidade 40
     */
    amount[product.id] = product.amount || 0;

    return amount;
  },{})
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Home)
