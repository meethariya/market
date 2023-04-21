/**
 * market
 */
package com.virtusa.market.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.virtusa.market.controller.GeneralController;
import com.virtusa.market.dao.CategoryDao;
import com.virtusa.market.dao.CustomerDao;
import com.virtusa.market.dao.InventoryDao;
import com.virtusa.market.dao.ProductDao;
import com.virtusa.market.dao.ReviewDao;
import com.virtusa.market.dao.UserDao;
import com.virtusa.market.dto.CustomerDto;
import com.virtusa.market.exception.CustomerAlreadyExistsException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.model.Category;
import com.virtusa.market.model.Customer;
import com.virtusa.market.model.Inventory;
import com.virtusa.market.model.Product;
import com.virtusa.market.model.Review;
import com.virtusa.market.model.User;

import jakarta.transaction.Transactional;

/**
 * Performs all general services like login, registration, etc..
 * 
 * @author meet
 * @since 11-Feb-2023
 * @see GeneralController
 */

@Service
@Transactional
public class GeneralService {

	@Autowired
	PasswordEncoder pe;

	@Value("${profileFolder}")
	private String profileFolder;
	
	@Autowired
	private CustomerDao customerDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private ProductDao productDao;

	@Autowired
	private InventoryDao inventoryDao;

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private ReviewDao reviewDao;

	/**
	 * Checks
	 * <ul>
	 * <li>All form inputs</li>
	 * <li>Email of Customer in database for duplicates</li>
	 * <li>Phone of Customer in database for duplicates</li>
	 * </ul>
	 * Sets all parameters for CustomerDto's Customer field and finally saves to
	 * database.<br>
	 * 
	 * @param customerDto
	 * @return ID of the customer saved in database
	 * @throws CustomerAlreadyExistsException
	 */
	public Long registerCustomer(CustomerDto customerDto) throws CustomerAlreadyExistsException {
		User dbUser = userDao.findByEmail(customerDto.getEmail());
		if (dbUser != null) {
			throw new CustomerAlreadyExistsException("Customer already exists with email: " + customerDto.getEmail());
		}

		Customer dbCustomer = customerDao.findByPhone(customerDto.getPhone());
		if (dbCustomer != null) {
			throw new CustomerAlreadyExistsException("Customer already exists with phone: " + customerDto.getPhone());
		}
		// sets all parameters that are to be modified
		customerDto.setPassword(pe.encode(customerDto.getPassword()));
		customerDto.setProfilePicPath(profileFolder);
		customerDto.setAddress();
		customerDto.setUser();
		customerDto.setCustomer();

		Customer saved = customerDao.save(customerDto.getCustomer());

		return saved.getId();
	}

	/**
	 * @return List of all products
	 */
	public List<Product> getAllProducts() {
		return productDao.findAll();
	}

	/**
	 * Get Product by id
	 * 
	 * @param id
	 * @return Product
	 * @throws ProductNotFoundException
	 */
	public Product getProduct(long id) throws ProductNotFoundException {
		Optional<Product> optionalProduct = productDao.findById(id);
		if (optionalProduct.isEmpty())
			throw new ProductNotFoundException("No Such Product");
		return optionalProduct.get();
	}

	/**
	 * @return List of all products in Inventory
	 */
	public List<Inventory> allInventory() {
		return inventoryDao.findAll();
	}

	/**
	 * @param email
	 * @return User
	 */
	public User getUser(String email) {
		return userDao.findByEmail(email);
	}

	/**
	 * @return List of Categories
	 */
	public List<Category> getAllCategory() {
		return categoryDao.findAll();
	}

	/**
	 * Searches for the product using id. Throws error if not found.
	 * Find all Reviews for given Product.
	 * 
	 * @param productId
	 * @return List of Review
	 * @throws ProductNotFoundException
	 */
	public List<Review> getProductReview(long productId) throws ProductNotFoundException {
		Optional<Product> findById = productDao.findById(productId);
		if (findById.isEmpty())
			throw new ProductNotFoundException("No Such Product Available");
		Product product = findById.get();
		return reviewDao.findByProduct(product);
	}
}
