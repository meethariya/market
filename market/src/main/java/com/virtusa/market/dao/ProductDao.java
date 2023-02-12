/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtusa.market.model.Category;
import com.virtusa.market.model.Product;
import com.virtusa.market.model.ProductImage;

/**
 * All Product related database operations.
 * @author meet
 * @since 12-Feb-2023
 * @see Product
 * @see ProductImage
 * @see Category
 */
public interface ProductDao extends JpaRepository<Product, Long> {
	/**
	 * Finds product given name and brand
	 * @param name
	 * @param brand
	 * @return null or Product
	 */
	public Product findByNameAndBrand(String name, String brand);
}
