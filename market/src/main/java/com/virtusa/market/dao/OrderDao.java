/**
 * market
 */
package com.virtusa.market.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.market.model.Customer;
import com.virtusa.market.model.Order;

/**
 * All Order related database operations.
 * @author meet
 * @since 17-Feb-2023
 */
@Repository
public interface OrderDao extends JpaRepository<Order, Long> {
	
	/**
	 * Finds All order for customer.
	 * @param customer
	 * @return List of Orders
	 */
	public List<Order> findByCustomer(Customer customer);
}
