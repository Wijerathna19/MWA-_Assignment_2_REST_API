import React, { Component } from 'react'
import Menu from './MenuBar'
import ProductDisplay from './ProductDisplay'
import Footer from './Footer'

export default class ProductsPage extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <ProductDisplay/>
                <Footer/>
            </div>
        )
    }
}
