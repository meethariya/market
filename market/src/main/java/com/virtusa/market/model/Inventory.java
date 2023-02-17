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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 * @author meet
 * @since 10-Feb-2023
 * @see Product
 */
@Entity
public class Inventory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(unique = true, nullable = false)
	private Product product;
	
	@Column(nullable = false)
	private long quantity;
	
	@UpdateTimestamp
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	private Date lastImportDate;
	
	private Date lastSoldDate;

	/**
	 * Default Constructor
	 */
	public Inventory() {
		super();
	}

	/**
	 * @param id
	 * @param product
	 * @param quantity
	 * @param lastImportDate
	 * @param lastSoldDate
	 */
	public Inventory(long id, Product product, long quantity, Date lastImportDate, Date lastSoldDate) {
		super();
		this.id = id;
		this.product = product;
		this.quantity = quantity;
		this.lastImportDate = lastImportDate;
		this.lastSoldDate = lastSoldDate;
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
	 * @return the lastImportDate
	 */
	public Date getLastImportDate() {
		return lastImportDate;
	}

	/**
	 * @param lastImportDate the lastImportDate to set
	 */
	public void setLastImportDate(Date lastImportDate) {
		this.lastImportDate = lastImportDate;
	}

	/**
	 * @return the lastSoldDate
	 */
	public Date getLastSoldDate() {
		return lastSoldDate;
	}

	/**
	 * @param lastSoldDate the lastSoldDate to set
	 */
	public void setLastSoldDate(Date lastSoldDate) {
		this.lastSoldDate = lastSoldDate;
	}

	/**
	 * @return the Inventory model string value
	 */
	@Override
	public String toString() {
		return "Inventory [id=" + id + ", product=" + product + ", quantity=" + quantity + ", lastImportDate="
				+ lastImportDate + ", lastSoldDate=" + lastSoldDate + "]";
	}
	
	
}
