/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.market.model.User;

import jakarta.annotation.Nullable;

/**
 * All User related database operations.
 * @author meet
 * @since 10-Feb-2023
 * @see User
 */
@Repository
public interface UserDao extends JpaRepository<User, Long>{
	/**
	 * Finds User by email
	 * @param email
	 * @return null or User
	 */
	@Nullable
	public User findByEmail(String email);
}
