/**
 * market
 */
package com.virtusa.market.model;

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see Product
 * @see Cart
 */
@Entity
public class ProductList {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(cascade = CascadeType.REMOVE)
	private Cart cart;
	
	@Column(nullable = false)
	private Timestamp addedOn;
	
	@Column(nullable = false)
	private long quantity;
	
	@ManyToOne(cascade = CascadeType.REMOVE)
	private Product product;

	/**
	 * Default Constructor
	 */
	public ProductList() {
		super();
	}

	/**
	 * @param id
	 * @param cart
	 * @param addedOn
	 * @param quantity
	 * @param product
	 */
	public ProductList(long id, Cart cart, Timestamp addedOn, long quantity, Product product) {
		super();
		this.id = id;
		this.cart = cart;
		this.addedOn = addedOn;
		this.quantity = quantity;
		this.product = product;
	}

	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}

	/**
	 * @return the cart
	 */
	public Cart getCart() {
		return cart;
	}

	/**
	 * @param cart the cart to set
	 */
	public void setCart(Cart cart) {
		this.cart = cart;
	}

	/**
	 * @return the addedOn
	 */
	public Timestamp getAddedOn() {
		return addedOn;
	}

	/**
	 * @param addedOn the addedOn to set
	 */
	public void setAddedOn(Timestamp addedOn) {
		this.addedOn = addedOn;
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
	 * @return the ProductList model string value
	 */
	@Override
	public String toString() {
		return "ProductList [id=" + id + ", cart=" + cart + ", addedOn=" + addedOn + ", quantity=" + quantity
				+ ", product=" + product + "]";
	}
	
	
}
