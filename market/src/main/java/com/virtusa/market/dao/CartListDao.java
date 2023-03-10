/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.market.model.CartList;

/**
 * All cartlist related database operations.
 * @author meet
 * @since 17-Feb-2023
 * @see CartList
 */
@Repository
public interface CartListDao extends JpaRepository<CartList, Long> {

}
