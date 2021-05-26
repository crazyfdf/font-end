import React, { Component } from "react";
import { connect } from "react-redux";
class Product extends Component {
  render() {
    return (
      <section class="container content-section">
        <h2 class="section-header">商品列表</h2>
        <div class="shop-items">
          <div class="shop-item">
            <img class="shop-item-image" src="images/01.webp" />
            <span class="shop-item-title">小户型简约现代网红双人三人客厅科技布免洗布艺</span>
            <div class="shop-item-details">
              <span class="shop-item-price">￥1020</span>
              <button class="btn btn-primary shop-item-button" type="button">
                加入购物车
              </button>
            </div>
          </div>
          <div class="shop-item">
            <img class="shop-item-image" src="images/02.webp" />
            <span class="shop-item-title">11全网通4G手机官方iPhonexr</span>
            <div class="shop-item-details">
              <span class="shop-item-price">￥4758</span>
              <button class="btn btn-primary shop-item-button" type="button">
                加入购物车
              </button>
            </div>
          </div>
          <div class="shop-item">
            <img class="shop-item-image" src="images/03.webp" />
            <span class="shop-item-title">潮休闲网红小西服套装英伦风春装</span>
            <div class="shop-item-details">
              <span class="shop-item-price">￥59</span>
              <button class="btn btn-primary shop-item-button" type="button">
                加入购物车
              </button>
            </div>
          </div>
          <div class="shop-item">
            <img class="shop-item-image" src="images/04.webp" />
            <span class="shop-item-title">夏新27英寸超薄曲面高清电脑</span>
            <div class="shop-item-details">
              <span class="shop-item-price">￥369</span>
              <button class="btn btn-primary shop-item-button" type="button">
                加入购物车
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(Product);
