/**
 * 
 */
package com.virtusa.market.dto;

/**
 * A Projection used to fetch unique payment methods and its count.
 * 
 * @author MEETKIRTIBHAI
 * @since 02-June-2023
 * @see Order
 * @see OrderDao
 */
public interface PaymentMethodProjection {
	String getMethod();
	int getCount();
}
