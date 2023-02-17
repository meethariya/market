/**
 * market
 */
package com.virtusa.market.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtusa.market.dao.CartListDao;
import com.virtusa.market.dao.CustomerDao;
import com.virtusa.market.dao.ProductDao;
import com.virtusa.market.dao.UserDao;
import com.virtusa.market.dto.CartDto;
import com.virtusa.market.exception.CustomerNotFoundException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.exception.UserNotFoundException;
import com.virtusa.market.model.CartList;
import com.virtusa.market.model.Customer;
import com.virtusa.market.model.Product;
import com.virtusa.market.model.User;

import jakarta.transaction.Transactional;

/**
 * @author meet
 * @since 13-Feb-2023
 */
@Service
@Transactional
public class CustomerService {

	@Autowired
	private ProductDao productDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private CustomerDao customerDao;

	@Autowired
	private CartListDao cartListDao;

	/**
	 * Converts CartDto raw input to proper CartList.<br>
	 * Saves the cartItem in database and adds it to customer's cart.<br>
	 * Performs following validations.<br>
	 * <ul>
	 * 	<li>Product Id valid or not.</li>
	 * 	<li>User valid or not.</li>
	 * 	<li>Customer valid or not.</li>
	 * 	<li>If Product already exists in customer's cart</li>
	 * 	<ul>
	 * 		<li>If not, adds new product to cart</li>
	 * 		<li>If exists, modifies its quantity</li>
	 * 	</ul>
	 * </ul>
	 * 
	 * @param cartDto
	 * @param customerEmail
	 * @return id of the cartItem saved
	 * @throws ProductNotFoundException
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	public long addToCart(CartDto cartDto, String customerEmail) throws ProductNotFoundException {

		// checks if product exists or not
		Optional<Product> findById = productDao.findById(cartDto.getProductId());
		if (findById.isEmpty()) {
			throw new ProductNotFoundException("No Such product found.");
		}
		cartDto.setProduct(findById.get());

		// checks if user with authenticated email exists or not
		User user = userDao.findByEmail(customerEmail);
		if (user == null) {
			throw new UserNotFoundException("No user with email: " + customerEmail);
		}

		// checks if Particular user is a customer or not
		Customer customer = customerDao.findByUser(user);
		if (customer == null) {
			throw new CustomerNotFoundException("No Customer with email: " + customerEmail);
		}

		// checks if the product is already in customer's cart
		Set<CartList> cart = customer.getCart();
		List<CartList> exisiting = cart.stream()
								  .filter(c -> c.getProduct().getId() == cartDto.getProductId())
								  .toList();
		// if product does not exist in customer's cart. Adds new product to cartList.
		// else modifies the quantity of existing one
		if(exisiting.isEmpty()) {			
			// sets CartList object in DTO
			cartDto.setCartList();
			
			// saves CartItem
			CartList cartItem = cartListDao.save(cartDto.getCartList());
			
			// adds cartItem to customer's cart
			customer.getCart().add(cartItem);
			customerDao.save(customer);
			
			return cartItem.getId();
		}else {
			CartList item = exisiting.get(0);
			Optional<CartList> findById2 = cartListDao.findById(item.getId());
			if(findById2.isPresent()) {
				item = findById2.get();
				item.setQuantity(item.getQuantity()+cartDto.getQuantity());
				cartListDao.save(item);
			}
			return item.getId();
		}
	}

	/**
	 * checks for valid customer and returns its cart
	 * 
	 * @param customerEmail
	 * @return Set of CartList Items
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	public Set<CartList> getCart(String customerEmail) {
		// checks if user with authenticated email exists or not
		User user = userDao.findByEmail(customerEmail);
		if (user == null) {
			throw new UserNotFoundException("No user with email: " + customerEmail);
		}

		// checks if Particular user is a customer or not
		Customer customer = customerDao.findByUser(user);
		if (customer == null) {
			throw new CustomerNotFoundException("No Customer with email: " + customerEmail);
		}

		return customer.getCart();
	}
}
