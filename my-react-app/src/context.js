import React, { Component } from 'react'
import {storeProducts, detailProduct} from "./data";

// create a context object
const ProductContext = React.createContext();
//Provider
//Consumer

// class based component
class ProductProvider extends Component {
    state={
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
    }

    // get the copy of the data, instead of the reference
    componentDidMount() {
        this.setProducts();
    };

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const eachItem = {...item};
            tempProducts = [...tempProducts, eachItem];
        });
        this.setState(() => {
            return {products: tempProducts};
        });
    };

    getItem = (id) => {
        const retrivedProduct = this.state.products.find(item => item.id === id);
        return retrivedProduct;
    };

    handleDetail = (id) => {
        const getProduct = this.getItem(id);
        this.setState(() => {
            return {detailProduct: getProduct};
        })
    };

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price * product.count;
        this.setState(() => {
            return {
                products: tempProducts, cart: [...this.state.cart, product]
            };
        }, () => {
            console.log(this.state.cart);
        });
    };

    openModal = (id) => {
        const thisProduct = this.getItem(id);
        this.setState(() => {
            return {modalProduct: thisProduct, modalOpen: true};
        });
    };

    closeModal = () => {
        this.setState(() => {
            return {modalOpen: false};
        });
    };

    render() {
        return (
            // this object is sitting on top of the entire project
            <ProductContext.Provider value={{
                // products: this.state.products,
                // detailProduct: this.state.detailProduct,
                ...this.state, // this will includ all the attributes in state no need to type one by one
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal
            }}>
                {/* and this.props.children will let all the child node use the value of this object */}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};