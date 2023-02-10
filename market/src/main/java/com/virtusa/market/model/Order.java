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
import jakarta.persistence.OneToOne;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see Cart
 * @see Product
 */
@Entity
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToOne(cascade = CascadeType.REMOVE)
	private Cart cart;
	
	@Column(nullable = false)
	private Timestamp timestamp;
	
	@Column(nullable = false, precision = 2)
	private double price;
	
	@Column(length = 30)
	private String payementMethod;

	/**
	 * Default Constructor
	 */
	public Order() {
		super();
	}

	/**
	 * @param id
	 * @param cart
	 * @param timestamp
	 * @param price
	 * @param payementMethod
	 */
	public Order(long id, Cart cart, Timestamp timestamp, double price, String payementMethod) {
		super();
		this.id = id;
		this.cart = cart;
		this.timestamp = timestamp;
		this.price = price;
		this.payementMethod = payementMethod;
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
	 * @return the timestamp
	 */
	public Timestamp getTimestamp() {
		return timestamp;
	}

	/**
	 * @param timestamp the timestamp to set
	 */
	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	/**
	 * @return the price
	 */
	public double getPrice() {
		return price;
	}

	/**
	 * @param price the price to set
	 */
	public void setPrice(double price) {
		this.price = price;
	}

	/**
	 * @return the payementMethod
	 */
	public String getPayementMethod() {
		return payementMethod;
	}

	/**
	 * @param payementMethod the payementMethod to set
	 */
	public void setPayementMethod(String payementMethod) {
		this.payementMethod = payementMethod;
	}

	/**
	 * @return the Order model string value
	 */
	@Override
	public String toString() {
		return "Order [id=" + id + ", cart=" + cart + ", timestamp=" + timestamp + ", price=" + price
				+ ", payementMethod=" + payementMethod + "]";
	}
	
	
}
