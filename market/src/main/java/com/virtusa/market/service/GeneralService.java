/**
 * market
 */
package com.virtusa.market.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
import com.virtusa.market.dto.EmailDetails;
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

	private Random random = new Random();

	@Autowired
	PasswordEncoder pe;

	@Autowired
	private JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String sender;

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
	 * Searches for the product using id. Throws error if not found. Find all
	 * Reviews for given Product.
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

	/**
	 * Accepts email details converts it to {@link SimpleMailMessage} and sends mail
	 * to all the recipients.
	 * 
	 * @param details Email details
	 */
	public void sendMail(EmailDetails details) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(sender);
		message.setTo(details.getRecipients());
		message.setSubject(details.getSubject());
		message.setText(details.getBody());

		mailSender.send(message);
	}

	/**
	 * Generates 6 digit random OTP using {@link random}.
	 * 
	 * @return String of 6 digit OTP
	 */
	private String otpGenerator() {
		StringBuilder otp = new StringBuilder();
		this.random.ints(0, 10).limit(6).forEach(otp::append);
		return otp.toString();
	}

	/**
	 * Generates Random 6 digit OTP.<br>
	 * Prepares details for {@link EmailDetails}.<br>
	 * Sends mail using {@link GeneralService#sendMail}<br>
	 * Finally returns the OTP for validation.
	 * 
	 * @param recipientUsername name for mail body
	 * @param to                email for recipient address
	 * @return 6 digit OTP
	 */
	public String sendRegisterationOtp(String recipientUsername, String to) {
		EmailDetails details = new EmailDetails();
		String otp = otpGenerator();
		String body = "Dear " + recipientUsername + ",\n\n"
				+ "Please use the following OTP to complete your registration:\nOTP: " + otp
				+ "\nThank You.\n\nBest Regards,\nTeam BigMart";
		details.setSubject("Registration OTP for BigMart");
		details.setBody(body);
		details.setRecipients(new String[] { to });
		
		sendMail(details);
		
		return otp;
	}
}
