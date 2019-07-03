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
        detailProduct: detailProduct
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

    handleDetail = () => {
        console.log("hello from details");
    }

    addToCart = (id) => {
        console.log("added product with id " + id + " into the cart");
    }
    render() {
        return (
            // this object is sitting on top of the entire project
            <ProductContext.Provider value={{
                // products: this.state.products,
                // detailProduct: this.state.detailProduct,
                ...this.state, // this will includ all the attributes in state no need to type one by one
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
            }}>
                {/* and this.props.children will let all the child node use the value of this object */}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};