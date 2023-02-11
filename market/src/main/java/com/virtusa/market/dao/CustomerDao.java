/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.market.model.Customer;

import jakarta.annotation.Nullable;

/**
 * All customer related database operations.
 * @author meet
 * @since 11-Feb-2023
 * @see Customer
 */
@Repository
public interface CustomerDao extends JpaRepository<Customer, Long>{
	/**
	 * Finds customer by Phone
	 * @param phone
	 * @return null or Customer
	 */
	@Nullable
	public Customer findByPhone(String phone);
}
