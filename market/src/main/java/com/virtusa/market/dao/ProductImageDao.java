/**
 * market
 */
package com.virtusa.market.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtusa.market.model.ProductImage;

/**
 * All ProductImage related database operations.
 * @author meet
 * @since 12-Feb-2023
 * @see ProductImage
 * @see Product
 */
public interface ProductImageDao extends JpaRepository<ProductImage, Long> {

}
