/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.market.model.Cart;

/**
 * All Cart related database operations.
 * @author meet
 * @since 12-Feb-2023
 * @see Cart
 * @see Customer
 */
@Repository
public interface CartDao extends JpaRepository<Cart, Long>{
	
}
