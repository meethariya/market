/**
 * market
 */
package com.virtusa.market.dto;

import com.virtusa.market.model.CartList;
import com.virtusa.market.model.Product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * All fields of {@link CartList}.<br>
 * Generates proper models from raw input.<br>
 * Contains all backend validation annotations.
 * @author meet
 * @since 16-Feb-2023
 */
public class CartDto {
	
	@NotNull(message = "{NotNull.cart.productId}")
	@Min(value = 1, message = "{Min.cart.productId}")
	private long productId;

	@NotNull(message = "{NotNull.cart.quantity}")
	@Min(value = 1, message = "{Min.cart.quantity}")
	private long quantity;
	
	private Product product;
	
	private CartList cartList;
	
	/**
	 * Default Constructor
	 */
	public CartDto() {
		super();
	}

	/**
	 * @return the productId
	 */
	public long getProductId() {
		return productId;
	}

	/**
	 * @param productId the productId to set
	 */
	public void setProductId(long productId) {
		this.productId = productId;
	}

	/**
	 * @return the quantity
	 */
	public long getQuantity() {
		return quantity;
	}

	/**
	 * @param quantity the quantity to set
	 */
	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}

	/**
	 * @return the product
	 */
	public Product getProduct() {
		return product;
	}

	/**
	 * @param product the product to set
	 */
	public void setProduct(Product product) {
		this.product = product;
	}

	/**
	 * @return the cartList
	 */
	public CartList getCartList() {
		return cartList;
	}

	/**
	 * set new cartlist using other attributes
	 */
	public void setCartList() {
		CartList temp = new CartList();
		temp.setProduct(getProduct());
		temp.setQuantity(getQuantity());
		this.cartList = temp;
	}

	/**
	 * @return CartDto string value
	 */
	@Override
	public String toString() {
		return "CartDto [productId=" + productId + ", quantity=" + quantity + ", product=" + product + "]";
	}
	
	
}
