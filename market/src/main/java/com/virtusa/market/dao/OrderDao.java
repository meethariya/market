/**
 * market
 */
package com.virtusa.market.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.virtusa.market.dto.PaymentMethodProjection;
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
	
	/**
	 * Finds all orders on a given date.
	 * @param date
	 * @return List of Orders
	 */
	@Query("FROM Order WHERE DATE(timestamp)=DATE(:date)")
	public List<Order> findByTimestamp(Date date);

	/**
	 * Finds all orders between 2 dates.
	 * @param startDate
	 * @param endDate
	 * @return List of Orders
	 */
	public List<Order> findByTimestampBetween(Date startOfWeek, Date endOfWeek);
	
	/**
	 * Finds all orders in given month.
	 * @param date
	 * @return List of Orders
	 */
	@Query("FROM Order o WHERE MONTH(o.timestamp)= MONTH(:date)")
	public List<Order> findByTimestampMonth(Date date);
	
	/**
	 * Finds all orders in given year.
	 * @param date
	 * @return List of Orders
	 */
	@Query("FROM Order o WHERE YEAR(o.timestamp)= YEAR(:date)")
	public List<Order> findByTimestampYear(Date date);
	
	/**
	 * @return order with lowest price.
	 */
	public Order findFirstByOrderByPriceAsc();
	
	/**
	 * @return average price of all records.
	 */
	@Query("SELECT ROUND(AVG(o.price),0) FROM Order o")
	public Double findAvgPrice();
	
	/**
	 * @return order with highest price.
	 */
	public Order findFirstByOrderByPriceDesc();
	
	/**
	 * @return Sum of price of all the orders.
	 */
	@Query("SELECT SUM(o.price) FROM Order o")
	public Double sumOfOrderPrice();
	
	/**
	 * @return All unique payment methods and count of each.
	 */
	@Query("SELECT o.paymentMethod as method, COUNT(o.id) as count FROM Order o GROUP BY o.paymentMethod")
	public List<PaymentMethodProjection> paymentMethodCount();
}
