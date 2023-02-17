/**
 * market
 */
package com.virtusa.market.service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtusa.market.dao.CartListDao;
import com.virtusa.market.dao.CustomerDao;
import com.virtusa.market.dao.InventoryDao;
import com.virtusa.market.dao.OrderDao;
import com.virtusa.market.dao.ProductDao;
import com.virtusa.market.dao.UserDao;
import com.virtusa.market.dto.CartDto;
import com.virtusa.market.exception.CustomerNotFoundException;
import com.virtusa.market.exception.InsufficientStockException;
import com.virtusa.market.exception.OrderNotFoundException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.exception.UserNotFoundException;
import com.virtusa.market.model.CartList;
import com.virtusa.market.model.Customer;
import com.virtusa.market.model.Inventory;
import com.virtusa.market.model.Order;
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

	@Autowired
	private OrderDao orderDao;

	@Autowired
	private InventoryDao inventoryDao;

	/**
	 * Converts CartDto raw input to proper CartList.<br>
	 * Saves the cartItem in database and adds it to customer's cart.<br>
	 * Performs following validations.<br>
	 * <ul>
	 * <li>Product Id valid or not.</li>
	 * <li>User valid or not.</li>
	 * <li>Customer valid or not.</li>
	 * <li>If Product already exists in customer's cart</li>
	 * <ul>
	 * <li>If not, adds new product to cart</li>
	 * <li>If exists, modifies its quantity</li>
	 * </ul>
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

		Customer customer = customerValidator(customerEmail);

		// checks if the product is already in customer's cart
		Set<CartList> cart = customer.getCart();
		List<CartList> exisiting = cart.stream().filter(c -> c.getProduct().getId() == cartDto.getProductId()).toList();
		// if product does not exist in customer's cart. Adds new product to cartList.
		// else modifies the quantity of existing one
		if (exisiting.isEmpty()) {
			// sets CartList object in DTO
			cartDto.setCartList();

			// saves CartItem
			CartList cartItem = cartListDao.save(cartDto.getCartList());

			// adds cartItem to customer's cart
			customer.getCart().add(cartItem);
			customerDao.save(customer);

			return cartItem.getId();
		} else {
			CartList item = exisiting.get(0);
			Optional<CartList> findById2 = cartListDao.findById(item.getId());
			if (findById2.isPresent()) {
				item = findById2.get();
				item.setQuantity(item.getQuantity() + cartDto.getQuantity());
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
		Customer customer = customerValidator(customerEmail);

		return customer.getCart();
	}

	/**
	 * Performs several validation actions before placing an Order.<br>
	 * <ul>
	 * <li>Validates existing User with authenticated email</li>
	 * <li>Validates existing Customer with authenticated email</li>
	 * <li>Creates new Order and sets it's attributes</li>
	 * <ul>
	 * <li>Sets Payment method from user input</li>
	 * <li>Sets cartItems from Cart of the Authenticated Customer</li>
	 * <li>Goes through each cart item</li>
	 * <ul>
	 * <li>Checks if the cartItem's product is in Inventory</li>
	 * <li>Checks if cartItem's quantity is <= quantity in Inventory</li>
	 * </ul>
	 * <li>Modifies Inventory's quantity and Last Sold Date</li>
	 * <li>Saves the Order</li>
	 * </ul>
	 * <li>Clears the Customer's cart</li>
	 * </ul>
	 * 
	 * @param customerEmail
	 * @param paymentMethod
	 * @return Id of the Order placed
	 * @throws ProductNotFoundException
	 * @throws InsufficientStockException
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	public long placeOrder(String customerEmail, String paymentMethod)
			throws ProductNotFoundException, InsufficientStockException {
		Customer customer = customerValidator(customerEmail);

		// create new order and set its attributes
		Order order = new Order();

		order.setPayementMethod(paymentMethod);
		order.setCart(customer.getCart());

		// checking the product and quantity in inventory.
		double price = 0;
		for (CartList i : order.getCart()) {
			// calculate price
			price += i.getProduct().getPrice() * i.getQuantity();

			Inventory findByProduct = inventoryDao.findByProduct(i.getProduct());
			// if product does not exist in inventory
			if (findByProduct == null)
				throw new ProductNotFoundException("No Such product");

			// if inventory quantity is less than requested quantity
			if (findByProduct.getQuantity() < i.getQuantity()) {
				String errorMessage = "Only " + findByProduct.getQuantity() + " " + findByProduct.getProduct().getName()
						+ " of " + findByProduct.getProduct().getBrand() + " available.";
				throw new InsufficientStockException(errorMessage);
			}

			// modify inventory
			findByProduct.setQuantity(findByProduct.getQuantity() - i.getQuantity());
			findByProduct.setLastSoldDate(new Date());
			inventoryDao.save(findByProduct);
		}

		order.setPrice(price);
		order.setCustomer(customer);

		// save order
		Order savedOrder = orderDao.save(order);

		// emtpy customer's cart
		customer.setCart(new HashSet<>());
		customerDao.save(customer);

		return savedOrder.getId();
	}

	/**
	 * Get All orders for the given customer.
	 * 
	 * @param customerEmail
	 * @return List of Order
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	public List<Order> getMyOrders(String customerEmail) {
		Customer customer = customerValidator(customerEmail);
		return orderDao.findByCustomer(customer);
	}

	/**
	 * Finds order by Id. If order is not of the authenticated Customer; throws an exception
	 * @param orderId
	 * @param customerEmail
	 * @return Order
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 * @throws OrderNotFoundException
	 */
	public Order findOrder(long orderId, String customerEmail) {
		Customer customer = customerValidator(customerEmail);
		
		Optional<Order> findById = orderDao.findById(orderId);
		if(findById.isEmpty())
			throw new OrderNotFoundException("No Order Found");
		
		Order order = findById.get();
		if(order.getCustomer().getId()!=customer.getId())
			throw new OrderNotFoundException("This order is not yours.");
		
		return order;
	}

	/**
	 * Validates User and if its a customer using its email id
	 * @param customerEmail
	 * @return Customer
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	private Customer customerValidator(String customerEmail) {
		// checks if user with authenticated email exists or not
		User user = userDao.findByEmail(customerEmail);
		if (user == null) {
			throw new UserNotFoundException(customerEmail);
		}

		// checks if Particular user is a customer or not
		Customer customer = customerDao.findByUser(user);
		if (customer == null) {
			throw new CustomerNotFoundException(customerEmail);
		}
		
		return customer;
	}
}
