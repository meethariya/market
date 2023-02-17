/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.market.model.Category;
import com.virtusa.market.model.Product;

/**
 * All Category related database operations
 * @author meet
 * @since 12-Feb-2023
 * @see Category
 * @see Product
 */
@Repository
public interface CategoryDao extends JpaRepository<Category,Long> {
	/**
	 * Finds category based on its name
	 * @param categoryName
	 * @return
	 */
	public Category findByCategoryName(String categoryName);
}
