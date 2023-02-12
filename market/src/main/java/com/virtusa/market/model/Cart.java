/**
 * market
 */
package com.virtusa.market.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see Customer
 * @see ProductList
 * @See Order
 */
@Entity
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToOne(cascade = CascadeType.REMOVE)
	private Customer customer;

	/**
	 * Default Constructor
	 */
	public Cart() {
		super();
	}

	/**
	 * @param id
	 * @param customer
	 */
	public Cart(long id, Customer customer) {
		super();
		this.id = id;
		this.customer = customer;
	}

	/**
	 * @param customer
	 */
	public Cart(Customer customer) {
		super();
		this.customer = customer;
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
	 * @return the customer
	 */
	public Customer getCustomer() {
		return customer;
	}

	/**
	 * @param customer the customer to set
	 */
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	/**
	 * @return the Cart model string value
	 */
	@Override
	public String toString() {
		return "Cart [id=" + id + ", customer=" + customer + "]";
	}
	
	
}
