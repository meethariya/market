/**
 * market
 */
package com.virtusa.market.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtusa.market.dao.ProductDao;
import com.virtusa.market.model.Product;

/**
 * @author meet
 * @since 13-Feb-2023
 */
@Service
public class CustomerService {

	@Autowired
	ProductDao productDao;
	
	/**
	 * Returns all the products and its image path from database
	 * @return
	 */
	public List<Product> getAllProducts(){
		return productDao.findAll();
	}
}
