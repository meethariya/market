/**
 * market
 */
package com.virtusa.market.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.virtusa.market.dao.CartListDao;
import com.virtusa.market.dao.CustomerDao;
import com.virtusa.market.dao.InventoryDao;
import com.virtusa.market.dao.OrderDao;
import com.virtusa.market.dao.ProductDao;
import com.virtusa.market.dao.ReviewDao;
import com.virtusa.market.dao.UserDao;
import com.virtusa.market.dto.CartDto;
import com.virtusa.market.dto.CustomerEditDto;
import com.virtusa.market.dto.ReviewDto;
import com.virtusa.market.exception.CartListNotFoundException;
import com.virtusa.market.exception.CustomerNotFoundException;
import com.virtusa.market.exception.IncorrectFormDetailsException;
import com.virtusa.market.exception.InsufficientStockException;
import com.virtusa.market.exception.OrderNotFoundException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.exception.ReviewNotFoundException;
import com.virtusa.market.exception.UserNotFoundException;
import com.virtusa.market.model.CartList;
import com.virtusa.market.model.Customer;
import com.virtusa.market.model.Inventory;
import com.virtusa.market.model.Order;
import com.virtusa.market.model.Product;
import com.virtusa.market.model.Review;
import com.virtusa.market.model.User;

import jakarta.transaction.Transactional;

/**
 * Service class for all Customer activities
 * 
 * @author meet
 * @since 13-Feb-2023
 */
@Service
@Transactional
public class CustomerService {

	@Value("${profileFolder}")
	private String profileFolder;
	
	@Value("${reviewFolder}")
	private String reviewFolder;
	
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

	@Autowired
	private ReviewDao reviewDao;

	/**
	 * Converts CartDto raw input to proper CartList.<br>
	 * Saves the cartItem in database and adds it to customer's cart.<br>
	 * Performs following validations.<br>
	 * <ul>
	 * <li>Product Id valid or not.</li>
	 * <li>User valid or not.</li>
	 * <li>Customer valid or not.</li>
	 * <li>If Product already exists in customer's cart</li>
	 * <ol>
	 * <li>If not, adds new product to cart</li>
	 * <li>If exists, modifies its quantity</li>
	 * </ol>
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
	 * <li>Checks if cart is empty or not.</li>
	 * <li>Creates new Order and sets it's attributes</li>
	 * <ol>
	 * <li>Sets Payment method from user input</li>
	 * <li>Sets cartItems from Cart of the Authenticated Customer</li>
	 * <li>Goes through each cart item</li>
	 * <ul>
	 * <li>Checks if the cartItem's product is in Inventory</li>
	 * <li>Checks if cartItem's quantity is less than or equal to quantity in Inventory</li>
	 * </ul>
	 * <li>Modifies Inventory's quantity and Last Sold Date</li>
	 * <li>Saves the Order</li>
	 * </ol>
	 * <li>Clears the Customer's cart</li>
	 * </ul>
	 * 
	 * @param customerEmail
	 * @param paymentMethod
	 * @return Id of the Order placed
	 * @throws CartListNotFoundException
	 * @throws ProductNotFoundException
	 * @throws InsufficientStockException
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	public long placeOrder(String customerEmail, String paymentMethod)
			throws ProductNotFoundException, InsufficientStockException {
		Customer customer = customerValidator(customerEmail);

		// Checks if any items exists in cart or not.
		if (customer.getCart().isEmpty())
			throw new CartListNotFoundException("Cart Empty");

		// create new order and set its attributes
		Order order = new Order();

		order.setPaymentMethod(paymentMethod);
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
	 * Finds order by Id. If order is not of the authenticated Customer; throws an
	 * exception
	 * 
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
		if (findById.isEmpty())
			throw new OrderNotFoundException("No Order Found");

		Order order = findById.get();
		if (order.getCustomer().getId() != customer.getId())
			throw new OrderNotFoundException("This order is not yours.");

		return order;
	}

	/**
	 * Validates User and if its a customer using its email id
	 * 
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

	/**
	 * Modifies( +/- ) the quantity of the CartList item.
	 * 
	 * @param id
	 * @param quantityDiff
	 * @return CartList
	 * @throws CartListNotFoundException
	 */
	public CartList modifyCartItem(long id, long quantityDiff, String email) {
		Customer customer = customerValidator(email);
		CartList findById = null;
		// check if the Cart Item is of the same customer
		for (CartList i : customer.getCart())
			if (i.getId() == id) {
				findById = i;
				break;
			}

		if (findById == null)
			throw new CartListNotFoundException("No Cart Item with id: " + id);

		findById.setQuantity(findById.getQuantity() + quantityDiff);

		if (findById.getQuantity() <= 0)
			throw new IncorrectFormDetailsException("Min 1 quantity required");

		return cartListDao.save(findById);
	}

	/**
	 * Deletes the cart item. Matches cartList Id with cartList item in customer's
	 * current cart
	 * 
	 * @param id
	 * @return id of the deleted cart item
	 */
	public long deleteCartItem(long id, String email) {
		Customer customer = customerValidator(email);

		// check if the Cart Item is of the same customer
		for (CartList i : customer.getCart())
			if (i.getId() == id) {
				customer.setCart(new HashSet<>(customer.getCart().stream().filter(t -> t.getId() != id).toList()));
				customerDao.save(customer);
				cartListDao.deleteById(id);
				return id;
			}
		throw new CartListNotFoundException("Invalid cartList ID");
	}

	/**
	 * Get Customer profile using authenticated email
	 * 
	 * @param email
	 * @return Customer
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	public Customer getProfile(String email) {
		return customerValidator(email);
	}

	/**
	 * Finds Customer using ID.<br>
	 * If no Customer found then throws error.<br>
	 * Finds Customer by new Phone number. If Exists and not same Customer then
	 * throws error.<br>
	 * If Image is uploaded, concatenate customer id with its extension and save
	 * image in profile picture folder.<br>
	 * Sets Address, User, and Customer object using newly uploaded and existing
	 * data.<br>
	 * Saves Customer.<br>
	 * 
	 * @param customerId
	 * @param customerEditDto
	 * @param image
	 * @return Customer
	 * @throws IOException
	 */
	public Customer editProfile(long customerId, CustomerEditDto customerEditDto, MultipartFile image)
			throws IOException {
		Optional<Customer> findById = customerDao.findById(customerId);

		// If Customer not found then throw error
		if (findById.isEmpty())
			throw new CustomerNotFoundException();
		Customer customer = findById.get();

		// If new Phone Number already Exist by another Customer then throw error
		Customer findByPhone = customerDao.findByPhone(customerEditDto.getPhone());
		if (findByPhone != null && findByPhone.getId() != customerId) {
			throw new IncorrectFormDetailsException("Phone number is already taken");
		}

		// If Customer has changed Profile Picture
		if (image != null) {
			String path = profileFolder;
			// Image Name used for its extension
			String imageName = image.getOriginalFilename();
			if (imageName == null) {
				throw new IOException("Invalid File name");
			}

			// generating name using file index and its extension
			String name = customerId + "." + imageName.split("[.]")[1];

			// generating file complete path to save file and save path in db
			String filePath = path + File.separator + name;

			// deletes file if exists
			Files.deleteIfExists(Paths.get(filePath));

			// saves file
			Files.copy(image.getInputStream(), Paths.get(filePath));

			customerEditDto.setProfilePicPath(filePath);
		}

		// Modify Address using the new and existing customer's Address
		customerEditDto.setAddress(customer.getAddress());
		// Modify User using the new and existing customer's User
		customerEditDto.setUser(customer.getUser());
		// Modify Customer using the new and existing Customer
		customerEditDto.setCustomer(customer);

		return customerDao.save(customerEditDto.getCustomer());
	}

	/**
	 * Validates customer using authenticated user email.<br>
	 * Finds all reviews written by him and returns it.
	 * 
	 * @param customerEmail
	 * @return List of Review
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 */
	public List<Review> reviewByCustomer(String customerEmail) {
		Customer customer = customerValidator(customerEmail);
		return reviewDao.findByCustomer(customer);
	}

	/**
	 * Verify if customer exists or not using authenticated user email. Throws error
	 * if not exists.<br>
	 * Finds product using id. Throws error if not exists.<br>
	 * If user has uploaded images. Saves all image in
	 * assets/reviewPic/productId/<br>
	 * Checks if any review for same user and same product exists.<br>
	 * <ul>
	 * <li>If exists, modifies its rating, review and pictures.</li>
	 * <li>If does not exists, creates new Review.</li>
	 * </ul>
	 * <br>
	 * Creates/Modifies review, save it and return its ID.
	 * 
	 * @param reviewDto
	 * @param customerEmail
	 * @param images
	 * @return Review ID
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 * @throws ProductNotFoundException
	 * @throws IOException
	 */
	public Long addEditReview(ReviewDto reviewDto, String customerEmail, MultipartFile[] images)
			throws ProductNotFoundException, IOException {
		// finds customer using authenticated email. Throws error if not found
		Customer customer = customerValidator(customerEmail);
		reviewDto.setCustomer(customer);

		// Finds Product using id
		Optional<Product> findById = productDao.findById(reviewDto.getProductId());
		if (findById.isEmpty())
			throw new ProductNotFoundException("Product Not Found");
		Product product = findById.get();
		reviewDto.setProduct(product);

		// If image is being uploaded
		if (images != null && images.length > 0) {
			Set<String> allImagePath = new HashSet<>();
			// iterate through each image save it and add its path to a set.
			for (int i = 0; i < images.length; i++) {
				String imagePath = saveImage(i + 1, reviewDto.getProductId(), customer.getId(), images[i]);
				allImagePath.add(imagePath);
			}
			reviewDto.setImagePath(allImagePath);
		} else {
			reviewDto.setImagePath(null);
		}

		// find unique review using customer and product. If found modify it, else
		// create new
		Review review = reviewDao.findByCustomerAndProduct(customer, product);
		if (review == null) {
			reviewDto.setReview();
		} else {
			reviewDto.setReview(review);
		}

		// save newly created/modified review
		Review savedReview = reviewDao.save(reviewDto.getReview());

		modifyRatingOfProduct(product);

		return savedReview.getId();
	}

	/**
	 * Creates path of review folder using messageSource and productId.<br>
	 * Creates file name using customerId_fileIndex.extensionOfOriginalFile<br>
	 * Creates directory if does not exists.<br>
	 * Delete any existing file, if exists.<br>
	 * Save image and return its path.<br>
	 * 
	 * @param index
	 * @param productId
	 * @param customerId
	 * @param image
	 * @return Path of saved image.
	 * @throws IOException
	 */
	private String saveImage(int index, long productId, long customerId, MultipartFile image) throws IOException {
		// fetching review path + productId
		String path = reviewFolder + productId;
		// Image Name used for its extension
		String originalName = image.getOriginalFilename();
		if (originalName == null) {
			throw new IOException("Invalid File name");
		}

		// generating name using customerId_index and its original extension
		String name = customerId + "_" + index + "." + originalName.split("[.]")[1];

		// generating file complete path to save file and save path in db
		String filePath = path + File.separator + name;

		// makes/uses folder based on path+name and saves image there
		File dir = new File(path);
		if (!dir.exists())
			dir.mkdir();

		// deletes file if exists
		Files.deleteIfExists(Paths.get(filePath));

		// saves file
		Files.copy(image.getInputStream(), Paths.get(filePath));

		return filePath;
	}

	/**
	 * Checks if review exists or not. <br>
	 * Whether the review was submitted by the authenticated user or not.<br>
	 * Deletes the review and all its image if exists.<br>
	 * Modifies avg rating of the product.
	 * 
	 * @param reviewId
	 * @param customerEmail
	 * @return id of the deleted review.
	 * @throws ReviewNotFoundException
	 * @throws UserNotFoundException
	 * @throws CustomerNotFoundException
	 * @throws IOException
	 */
	public Long deleteReview(long reviewId, String customerEmail) throws IOException {
		Optional<Review> findById = reviewDao.findById(reviewId);
		if (findById.isEmpty())
			throw new ReviewNotFoundException("No such review");

		Customer customer = customerValidator(customerEmail);
		Review review = findById.get();
		if (customer.getId() != review.getCustomer().getId())
			throw new ReviewNotFoundException("This review was by other user");

		Set<String> imagePaths = review.getImagePath();
		if (imagePaths != null) {
			for (String src : imagePaths) {
				Files.deleteIfExists(Paths.get(src));
			}
		}
		Product product = review.getProduct();
		reviewDao.deleteById(reviewId);

		modifyRatingOfProduct(product);
		return reviewId;
	}

	private void modifyRatingOfProduct(Product product) {
		// Fetch avg of rating for product and modify it in Product table.
		Float avgRatingOfProduct = reviewDao.getAvgRatingOfProduct(product);
		if (avgRatingOfProduct == null)
			avgRatingOfProduct = 0F;
		product.setRating(avgRatingOfProduct);
		productDao.save(product);
	}
}
