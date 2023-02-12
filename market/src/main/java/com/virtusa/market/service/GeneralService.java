/**
 * market
 */
package com.virtusa.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.virtusa.market.controller.GeneralController;
import com.virtusa.market.dao.CartDao;
import com.virtusa.market.dao.CustomerDao;
import com.virtusa.market.dao.UserDao;
import com.virtusa.market.dto.CustomerDto;
import com.virtusa.market.exception.CustomerAlreadyExistsException;
import com.virtusa.market.model.Cart;
import com.virtusa.market.model.Customer;
import com.virtusa.market.model.User;

import jakarta.transaction.Transactional;

/**
 * Performs all general services like login, registration, etc..
 * @author meet
 * @since 11-Feb-2023
 * @see GeneralController
 */

@Service
@Transactional
public class GeneralService {
	
	@Autowired
	MessageSource source;
	
	@Autowired
	PasswordEncoder pe;
	
	@Autowired
	private CustomerDao customerDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CartDao cartDao;
	
	/**
	 * Checks 
	 * <ul>
	 * 	<li>All form inputs</li>
	 * 	<li>Email of Customer in database for duplicates</li>
	 * 	<li>Phone of Customer in database for duplicates</li>
	 * </ul>
	 * Sets all parameters for CustomerDto's Customer field and finally saves to database.<br>
	 * Also creates a shopping cart for created customer.
	 * @param customerDto
	 * @return ID of the customer saved in database
	 * @throws CustomerAlreadyExistsException
	 */
	public Long registerCustomer(CustomerDto customerDto) throws CustomerAlreadyExistsException {
		User dbUser = userDao.findByEmail(customerDto.getEmail());
		if(dbUser!=null){
			throw new CustomerAlreadyExistsException("Customer already exists with email: "+customerDto.getEmail());
		}
		
		Customer dbCustomer = customerDao.findByPhone(customerDto.getPhone());
		if(dbCustomer!=null){
			throw new CustomerAlreadyExistsException("Customer already exists with phone: "+customerDto.getPhone());
		}
		// sets all parameters that are to be modified
		customerDto.setPassword(pe.encode(customerDto.getPassword()));
		customerDto.setProfilePicPath(source);
		customerDto.setAddress();
		customerDto.setUser();
		customerDto.setCustomer();
		
		Customer saved = customerDao.save(customerDto.getCustomer());
		cartDao.save(new Cart(saved));
		return saved.getId();
	}
}
