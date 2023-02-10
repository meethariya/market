/**
 * market
 */
package com.virtusa.market.model;

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
 */
@Entity
public class ProductImage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(cascade = CascadeType.REMOVE)
	private Product product;
	
	@Column(nullable = false, updatable = false)
	private String imagePath;
	
	/**
	 * Default Constructor
	 */
	public ProductImage() {
		super();
	}

	/**
	 * @param id
	 * @param product
	 * @param imagePath
	 */
	public ProductImage(long id, Product product, String imagePath) {
		super();
		this.id = id;
		this.product = product;
		this.imagePath = imagePath;
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
	 * @return the imagePath
	 */
	public String getImagePath() {
		return imagePath;
	}

	/**
	 * @param imagePath the imagePath to set
	 */
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	/**
	 * @return the ProductImage model string value
	 */
	@Override
	public String toString() {
		return "ProductImage [id=" + id + ", product=" + product + ", imagePath=" + imagePath + "]";
	}
	
	
}
