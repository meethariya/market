/**
 * market
 */
package com.virtusa.market.model;

import java.util.Date;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see Customer
 * @see Product
 * @See Order
 */
@Entity
public class CartList {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	private Date addedOn;
	
	@Column(nullable = false)
	private long quantity;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(nullable = false)
	private Product product;

	/**
	 * Default Constructor
	 */
	public CartList() {
		super();
	}

	/**
	 * @param id
	 * @param customer
	 * @param addedOn
	 * @param quantity
	 * @param product
	 */
	public CartList(long id, Date addedOn, long quantity, Product product) {
		super();
		this.id = id;
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
	 * @return the addedOn
	 */
	public Date getAddedOn() {
		return addedOn;
	}

	/**
	 * @param addedOn the addedOn to set
	 */
	public void setAddedOn(Date addedOn) {
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

	@Override
	public String toString() {
		return "CartList [id=" + id + ", addedOn=" + addedOn + ", quantity=" + quantity
				+ ", product=" + product + "]";
	}
	
}
