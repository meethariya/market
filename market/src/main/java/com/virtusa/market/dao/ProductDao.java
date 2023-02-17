/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.market.model.Category;
import com.virtusa.market.model.Product;

/**
 * All Product related database operations.
 * @author meet
 * @since 12-Feb-2023
 * @see Product
 * @see Category
 */
@Repository
public interface ProductDao extends JpaRepository<Product, Long> {
	/**
	 * Finds product given name and brand
	 * @param name
	 * @param brand
	 * @return null or Product
	 */
	public Product findByNameAndBrand(String name, String brand);
}
