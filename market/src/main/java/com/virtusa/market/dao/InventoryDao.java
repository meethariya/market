/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.market.model.Inventory;
import com.virtusa.market.model.Product;

/**
 * All Inventory related database operations
 * @author meet
 * @since 13-Feb-2023
 */
@Repository
public interface InventoryDao extends JpaRepository<Inventory, Long> {
	
	/**
	 * find Inventory item by product
	 * @param product
	 * @return Optional of Inventory
	 */
	public Inventory findByProduct(Product product);
}
