import React, { Component } from 'react';
import Product from "./Product";
import Title from "./Title";
import {ProductConsumer} from "../context";

// class based component
export default class ProductList extends Component {
    eachProduct = (product) => {
        return <Product key={product.id} product={product} />;
    }

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="products"></Title>
                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    return value.products.map(product => this.eachProduct(product));
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
