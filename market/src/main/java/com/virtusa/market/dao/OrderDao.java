/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.virtusa.market.model.Order;

/**
 * All Order related database operations.
 * @author meet
 * @since 17-Feb-2023
 */
@Repository
public interface OrderDao extends JpaRepository<Order, Long> {

}
