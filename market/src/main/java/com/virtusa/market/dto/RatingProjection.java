/**
 * market
 */
package com.virtusa.market.dto;

/**
 * A Projection used to fetch Rating of product rounded up to closest
 * whole number and the count of it.
 * 
 * @author MEETKIRTIBHAI
 * @since 01-June-2023
 * @see Order
 * @see OrderDao
 */
public interface RatingProjection {
	int getRoundedRating();
	int getIdCount();
}
