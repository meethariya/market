/**
 * market
 */
package com.virtusa.market.model;

import java.util.Date;
import java.util.Set;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 * @author meet
 * @since 14-Mar-2023
 * @see Product
 * @see Customer
 */
@Entity
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne()
	@JoinColumn(nullable = false)
	private Customer customer;
	
	@ManyToOne()
	@JoinColumn(nullable = false)
	private Product product;
	
	@Column(length = 65535)
	private String comment;
	
	@Column(nullable = false)
	private byte rating;
	
	@ElementCollection(fetch = FetchType.EAGER)
	private Set<String> imagePath;
	
	@UpdateTimestamp
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	private Date modifiedOn;
	
	/**
	 * Default Constructor
	 */
	public Review() {
		super();
	}

	/**
	 * @param id
	 * @param customer
	 * @param product
	 * @param comment
	 * @param rating
	 * @param imagePath
	 * @param modifiedOn
	 */
	public Review(long id, Customer customer, Product product, String comment, byte rating, Set<String> imagePath,
			Date modifiedOn) {
		super();
		this.id = id;
		this.customer = customer;
		this.product = product;
		this.comment = comment;
		this.rating = rating;
		this.imagePath = imagePath;
		this.modifiedOn = modifiedOn;
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
	 * @return the comment
	 */
	public String getComment() {
		return comment;
	}

	/**
	 * @param review the comment to set
	 */
	public void setComment(String review) {
		this.comment = review;
	}

	/**
	 * @return the rating
	 */
	public byte getRating() {
		return rating;
	}

	/**
	 * @param rating the rating to set
	 */
	public void setRating(byte rating) {
		this.rating = rating;
	}

	/**
	 * @return the imagePath
	 */
	public Set<String> getImagePath() {
		return imagePath;
	}

	/**
	 * @param imagePath the imagePath to set
	 */
	public void setImagePath(Set<String> imagePath) {
		this.imagePath = imagePath;
	}

	/**
	 * @return the modifiedOn
	 */
	public Date getModifiedOn() {
		return modifiedOn;
	}

	/**
	 * @param modifiedOn the modifiedOn to set
	 */
	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
	}

	/**
	 * @return Review model's string value
	 */
	@Override
	public String toString() {
		return "Review [id=" + id + ", customer=" + customer + ", product=" + product + ", comment=" + comment
				+ ", rating=" + rating + ", imagePath=" + imagePath + ", modifiedOn=" + modifiedOn + "]";
	}
	
	
}
