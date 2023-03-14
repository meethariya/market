/**
 * market
 */
package com.virtusa.market.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.virtusa.market.model.Customer;
import com.virtusa.market.model.Product;
import com.virtusa.market.model.Review;

/**
 * All Review related database operations
 * @author meet
 * @since 14-Mar-2023
 */
@Repository
public interface ReviewDao extends JpaRepository<Review, Long> {

	/**
	 * Find all Review for given Product
	 * @param product
	 * @return List of Review
	 */
	public List<Review> findByProduct(Product product);
	
	/**
	 * Find all Review given by a Customer
	 * @param customer
	 * @return List of Review
	 */
	public List<Review> findByCustomer(Customer customer);
	
	/**
	 * Find Unique Review given by a Customer on a Product.
	 * @param customer
	 * @param product
	 * @return Review
	 */
	public Review findByCustomerAndProduct(Customer customer, Product product);
	
	@Query("SELECT ROUND(AVG(rating), 2) FROM Review GROUP BY product HAVING product = :product")
	public Float getAvgRatingOfProduct(Product product);
}
