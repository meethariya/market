/**
 * market
 */
package com.virtusa.market.dto;

import java.util.Set;

import org.hibernate.validator.constraints.Length;

import com.virtusa.market.model.Customer;
import com.virtusa.market.model.Product;
import com.virtusa.market.model.Review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * @author meet
 * @since 14-Mar-2023
 */
public class ReviewDto {

	private Customer customer;

	@NotNull(message = "{NotNull.review.productId}")
	@Min(value = 0, message = "{Min.review.productId}")
	private Long productId;

	private Product product;

	@Length(max = 65535, message = "{Length.review.comment}")
	private String comment;

	@NotNull(message = "{NotNull.review.rating}")
	@Min(value = 0, message = "{Min.review.rating}")
	@Max(value = 5, message = "{Max.review.rating}")
	private Byte rating;

	private Set<String> imagePath;

	private Review review;

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
	 * @param comment the comment to set
	 */
	public void setComment(String comment) {
		this.comment = comment;
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
	 * @return the review
	 */
	public Review getReview() {
		return review;
	}

	/**
	 * the review to set using other field attributes
	 */
	public void setReview() {
		Review temp = new Review();
		temp.setCustomer(customer);
		temp.setProduct(product);
		temp.setComment(comment);
		temp.setRating(rating);
		temp.setImagePath(imagePath);
		review = temp;
	}

	/**
	 * @param review the review to set
	 */
	public void setReview(Review review) {
		review.setRating(rating);
		review.setComment(comment);
		if (imagePath != null && !imagePath.isEmpty())
			review.setImagePath(imagePath);
		this.review = review;
	}
}
