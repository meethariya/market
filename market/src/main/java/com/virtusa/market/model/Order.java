/**
 * market
 */
package com.virtusa.market.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see CartList
 * @see Product
 */
@Entity
@Table(name = "orderTable")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToOne(cascade = CascadeType.REMOVE)
	private Customer customer;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	private Date timestamp;
	
	@Column(nullable = false, precision = 2)
	private double price;
	
	@Column(length = 30, nullable = false)
	private String paymentMethod;
	
	@OneToMany(cascade = CascadeType.ALL)
	private Set<CartList> cart = new HashSet<>();

	/**
	 * Default Constructor
	 */
	public Order() {
		super();
	}

	/**
	 * @param id
	 * @param customer
	 * @param timestamp
	 * @param price
	 * @param paymentMethod
	 * @param cart
	 */
	public Order(long id, Customer customer, Date timestamp, double price, String payementMethod,
			Set<CartList> cart) {
		super();
		this.id = id;
		this.customer = customer;
		this.timestamp = timestamp;
		this.price = price;
		this.paymentMethod = payementMethod;
		this.cart = cart;
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
	 * @return the Customer
	 */
	public Customer getCustomer() {
		return customer;
	}

	/**
	 * @param Customer the Customer to set
	 */
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	/**
	 * @return the timestamp
	 */
	public Date getTimestamp() {
		return timestamp;
	}

	/**
	 * @param timestamp the timestamp to set
	 */
	public void setTimestamp(Date timestamp) {
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
	 * @return the paymentMethod
	 */
	public String getPaymentMethod() {
		return paymentMethod;
	}

	/**
	 * @param paymentMethod the paymentMethod to set
	 */
	public void setPaymentMethod(String payementMethod) {
		this.paymentMethod = payementMethod;
	}
	
	/**
	 * @return the cart
	 */
	public Set<CartList> getCart() {
		return cart;
	}

	/**
	 * @param cart the cart to set
	 */
	public void setCart(Set<CartList> cart) {
		this.cart = cart;
	}

	/**
	 * @return Order model's string value
	 */
	@Override
	public String toString() {
		return "Order [id=" + id + ", customer=" + customer + ", timestamp=" + timestamp + ", price=" + price
				+ ", paymentMethod=" + paymentMethod + ", cart=" + cart + "]";
	}
	
	
}
