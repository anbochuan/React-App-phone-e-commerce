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
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };

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
            this.calculateTotal();
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

    increment(id) {
        console.log("this is increment method.");
    };

    decrement(id) {
        console.log("this is decrement method.");
    };

    removeItem(id) {
        console.log("this is remove item method.");
    };

    clearCart = function() {
        console.log("this is clear cart method.");
    };

    calculateTotal = function() {
        let subTotal = 0;
        this.state.cart.map(item => {
            subTotal += item.total;
        });

        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            };
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
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {/* and this.props.children will let all the child node use the value of this object */}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};