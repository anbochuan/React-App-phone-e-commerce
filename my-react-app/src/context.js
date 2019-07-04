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
        product.total = price;
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

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.price * product.count;

        this.setState(() => {
            return {
                cart: [...tempCart]
            };
        }, () => {
            this.calculateTotal();
        });
    };

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if(product.count <= 0) {
            this.removeItem(id);
        } else {
            product.total = product.price * product.count;
            this.setState(() => {
                return {
                    cart: [...tempCart]
                };
            }, () => {
                this.calculateTotal();
            });
        }
    };

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id)); 
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState(() => {
            return{
                cart: [...tempCart],
                products: [...tempProducts]
            };
        }, () => {
            this.calculateTotal();
        });
    };

    clearCart = () => {
        this.setState(() => {
            return{cart: [] };
        }, () => {
            this.setProducts();
            this.calculateTotal();
        });
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
        })

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