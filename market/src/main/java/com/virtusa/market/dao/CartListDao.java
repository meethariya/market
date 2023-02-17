/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtusa.market.model.CartList;

/**
 * All cartlist related database operations.
 * @author meet
 * @since 17-Feb-2023
 * @see CartList
 */
public interface CartListDao extends JpaRepository<CartList, Long> {

}
