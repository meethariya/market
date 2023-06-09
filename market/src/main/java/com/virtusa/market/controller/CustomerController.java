/**
 * market
 */
package com.virtusa.market.controller;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.core.Authentication;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.virtusa.market.dto.CartDto;
import com.virtusa.market.dto.CustomerEditDto;
import com.virtusa.market.dto.ReviewDto;
import com.virtusa.market.exception.CartListNotFoundException;
import com.virtusa.market.exception.CustomerNotFoundException;
import com.virtusa.market.exception.IncorrectFormDetailsException;
import com.virtusa.market.exception.InsufficientStockException;
import com.virtusa.market.exception.InvalidPaymentMethodException;
import com.virtusa.market.exception.OrderNotFoundException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.exception.UserNotFoundException;
import com.virtusa.market.exception.ReviewNotFoundException;
import com.virtusa.market.model.CartList;
import com.virtusa.market.model.Customer;
import com.virtusa.market.model.Order;
import com.virtusa.market.model.Review;
import com.virtusa.market.service.CustomerService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

/**
 * All methods specific for Customer.<br>
 * Security Level: <strong>Customer role</strong>.
 * 
 * @author meet
 * @since 12-Feb-2023
 */
@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = {"${angular}"})
public class CustomerController {

	@Autowired
	CustomerService customerService;

	@GetMapping("/")
	public ResponseEntity<String> customerHome() {
		return new ResponseEntity<>("Customer Home", HttpStatus.OK);
	}

	/**
	 * Get customer profile using authenticated email
	 * 
	 * @param auth
	 * @return Customer
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	@GetMapping("/profile")
	public ResponseEntity<Customer> getProfile(Authentication auth) {
		return new ResponseEntity<>(customerService.getProfile(auth.getName()), HttpStatus.OK);
	}

	/**
	 * Adds product to cartlist.<br>
	 * {@link CustomerService#addToCart(CartDto, String)}
	 * 
	 * @param cart
	 * @param error
	 * @param auth
	 * @return id of the cart item added
	 * @throws ProductNotFoundException
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	@PostMapping("/cart")
	public ResponseEntity<Long> addToCart(@Valid @ModelAttribute("cart") CartDto cart, Errors error,
			Authentication auth) throws ProductNotFoundException {

		FieldError fieldError = error.getFieldError();
		if (fieldError != null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}

		return new ResponseEntity<>(customerService.addToCart(cart, auth.getName()), HttpStatus.CREATED);
	}

	/**
	 * Gets customer's cart
	 * 
	 * @param auth
	 * @return set of cart Items
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	@GetMapping("/cart")
	public ResponseEntity<Set<CartList>> getCustomerCart(Authentication auth) {
		return new ResponseEntity<>(customerService.getCart(auth.getName()), HttpStatus.OK);
	}

	/**
	 * Modifies quantity of the cartlist item
	 * 
	 * @param id
	 * @param quantityDiff
	 * @return CartList
	 * @throws CartListNotFoundException
	 */
	@PutMapping("/cart")
	public ResponseEntity<CartList> editCartItemQuantity(@RequestParam("cartListId") long id,
			@RequestParam("quantity") long quantityDiff, Authentication auth) {
		return new ResponseEntity<>(customerService.modifyCartItem(id, quantityDiff, auth.getName()),
				HttpStatus.ACCEPTED);
	}

	/**
	 * Deletes cart item given it's id.
	 * 
	 * @param id
	 * @return id of deleted item
	 * @throws CartListNotFoundException
	 */
	@DeleteMapping("/cart/{id}")
	public ResponseEntity<Long> deleteCartItem(@PathVariable("id") long id, Authentication auth) {
		return new ResponseEntity<>(customerService.deleteCartItem(id, auth.getName()), HttpStatus.OK);
	}

	/**
	 * Place customer's order.
	 * 
	 * @param payment
	 * @param auth
	 * @return Id of the order placed
	 * @throws InvalidPaymentMethodException
	 * @throws InsufficientStockException
	 * @throws ProductNotFoundException
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	@PostMapping("/order")
	public ResponseEntity<Long> placeOrder(@RequestParam(name = "payment", required = false) String payment,
			Authentication auth)
			throws InvalidPaymentMethodException, ProductNotFoundException, InsufficientStockException {

		if (payment == null || payment.isBlank()) {
			throw new InvalidPaymentMethodException("Enter valid payment method");
		}

		return new ResponseEntity<>(customerService.placeOrder(auth.getName(), payment), HttpStatus.CREATED);
	}

	/**
	 * Get all orders for the authenticated Customer.
	 * 
	 * @param auth
	 * @return List of Order
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	@GetMapping("/order")
	public ResponseEntity<List<Order>> getMyOrders(Authentication auth) {
		return new ResponseEntity<>(customerService.getMyOrders(auth.getName()), HttpStatus.OK);
	}

	/**
	 * Finds order by its Id
	 * 
	 * @param orderId
	 * @return Order
	 * @throws OrderNotFoundException
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	@GetMapping("/order/{id}")
	public ResponseEntity<Order> findOrder(@PathVariable("id") long orderId, Authentication auth) {
		return new ResponseEntity<>(customerService.findOrder(orderId, auth.getName()), HttpStatus.OK);
	}

	/**
	 * Modifies Customer.
	 * 
	 * @param customerId
	 * @param customerEditDto
	 * @param image
	 * @return Customer
	 * @throws IOException
	 * @throws CustomerNotFoundException
	 */
	@PutMapping("/profile/{id}")
	public ResponseEntity<Customer> editProfile(@PathVariable("id") long customerId,
			@Valid @ModelAttribute("customer") CustomerEditDto customerEditDto, Errors error,
			@RequestParam(name = "images", required = false) MultipartFile image) throws IOException {

		FieldError fieldError = error.getFieldError();
		if (fieldError != null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}

		return new ResponseEntity<>(customerService.editProfile(customerId, customerEditDto, image), HttpStatus.OK);
	}

	/**
	 * Get all the reviews given by the customer.
	 * 
	 * @param auth
	 * @return List of Review
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	@GetMapping("/review")
	public ResponseEntity<List<Review>> reviewByCustomer(Authentication auth) {
		return new ResponseEntity<>(customerService.reviewByCustomer(auth.getName()), HttpStatus.OK);
	}

	/**
	 * Saves new Review or if exists, modifies it.
	 * 
	 * @param reviewDto
	 * @param error
	 * @param images
	 * @param auth
	 * @return Review ID
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 * @throws ProductNotFoundException
	 * @throws IOException
	 */
	@PostMapping("/review")
	public ResponseEntity<Long> addEditReview(@Valid @ModelAttribute("review") ReviewDto reviewDto, Errors error,
			@RequestParam(name = "images", required = false) MultipartFile[] images, Authentication auth) throws ProductNotFoundException, IOException {

		FieldError fieldError = error.getFieldError();
		if (fieldError != null) {
			throw new IncorrectFormDetailsException(fieldError.getDefaultMessage());
		}

		return new ResponseEntity<>(customerService.addEditReview(reviewDto, auth.getName(), images), HttpStatus.CREATED);
	}
	
	/**
	 * Deletes a review.
	 * 
	 * @param reviewId
	 * @param auth
	 * @return ID of the deleted review.
	 * @throws IOException 
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 * @throws ReviewNotFoundException
	 */
	@DeleteMapping("/review/{id}")
	public ResponseEntity<Long> deleteReview(@PathVariable("id")Long reviewId, Authentication auth) throws IOException{
		return new ResponseEntity<>(customerService.deleteReview(reviewId, auth.getName()), HttpStatus.OK);
	}
	
	/**
	 * Sends Order receipt as mail to the customer.
	 * 
	 * @param orderId
	 * @param auth
	 * @return Boolean
	 * @throws MessagingException 
	 * @throws MailException 
	 */
	@GetMapping("/generateReceipt/{id}")
	public ResponseEntity<Boolean> generateReceipt(@PathVariable("id") long orderId, Authentication auth) throws MailException, MessagingException {
		return new ResponseEntity<>(customerService.makeRecieptForOrder(orderId, auth.getName()), HttpStatus.OK);
	}
}
