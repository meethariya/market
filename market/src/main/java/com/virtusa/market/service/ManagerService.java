/**
 * market
 */
package com.virtusa.market.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.virtusa.market.controller.ManagerController;
import com.virtusa.market.dao.CategoryDao;
import com.virtusa.market.dao.InventoryDao;
import com.virtusa.market.dao.OrderDao;
import com.virtusa.market.dao.ProductDao;
import com.virtusa.market.dto.InventoryDto;
import com.virtusa.market.dto.ProductDto;
import com.virtusa.market.exception.ProductAlreadyExistsException;
import com.virtusa.market.exception.ProductNotFoundException;
import com.virtusa.market.model.Category;
import com.virtusa.market.model.Inventory;
import com.virtusa.market.model.Order;
import com.virtusa.market.model.Product;

import jakarta.transaction.Transactional;

/**
 * Service class for all Manager activities
 * 
 * @author meet
 * @since 12-Feb-2023
 * @see ManagerController
 */
@Service
@Transactional
public class ManagerService {

	@Autowired
	private ProductDao productDao;

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private InventoryDao inventoryDao;
	
	@Autowired
	private OrderDao orderDao;

	@Autowired
	private MessageSource source;

	/**
	 * Saves product into database with series of actions.<br>
	 * <ul>
	 * <li>Finds product in database using name and brand. If exists throws
	 * <strong>ProductAlreadyExistsException</strong>.</li>
	 * <li>Finds Category in database using name. If exists uses same category, else
	 * creates new.</li>
	 * <li>Sets {@link Category} and {@link Product} from raw input.</li>
	 * <li>Iterates through each file.</li>
	 * <ul>
	 * <li>Saves it in resources using
	 * {@link #addProduct(ProductDto, MultipartFile[])}. May throw
	 * <strong>IOException</strong>.</li>
	 * <li>Creates List of paths using savedImage and returned path.</li>
	 * <li>Sets list in Product.</li>
	 * </ul>
	 * <li>Saves Product.</li>
	 * <li>Finally returns the Id of the Product that is saved.</li>
	 * </ul>
	 * 
	 * @param productDto
	 * @param files
	 * @return Id of product saved
	 * @throws ProductAlreadyExistsException
	 * @throws IOException
	 * @see Product
	 * @see ProductDto
	 */
	public long addProduct(ProductDto productDto, MultipartFile[] files)
			throws ProductAlreadyExistsException, IOException {

		// finds product by name and brand, if already exists then throws exception
		Product existing = productDao.findByNameAndBrand(productDto.getName(), productDto.getBrand());
		if (existing != null) {
			throw new ProductAlreadyExistsException(
					productDto.getName() + " of " + productDto.getBrand() + " already exists.");
		}

		// finds category, id found uses existing or else creates new
		Category existingCategory = categoryDao.findByCategoryName(productDto.getCategoryName());
		if (existingCategory != null) {
			productDto.setCategory(existingCategory);
		} else {
			Category category = new Category();
			category.setCategoryName(productDto.getCategoryName());
			categoryDao.save(category);
			productDto.setCategory(category);
		}

		// saving all images to resources and setting its path in Dto
		List<String> allImagePath = new ArrayList<>();
		if(files==null || files.length==0) {
			String path = source.getMessage("productFolder", null, Locale.ENGLISH) + "default/product.png";
			allImagePath.add(path);
		}else {			
			for (int i = 0; i < files.length; i++) {
				String imagePath = saveImage(i + 1, productDto.getName().concat(productDto.getBrand()), files[i]);
				allImagePath.add(imagePath);
			}
		}
		productDto.setImagePath(allImagePath);

		// sets product and saves it
		productDto.setProduct();
		Product saved = productDao.save(productDto.getProduct());

		return saved.getId();
	}

	/**
	 * Saves an image to resources and returns it entire path.<br>
	 * Name consists of Product name and Product Brand which creates a sub-folder
	 * for all its images.<br>
	 * Index is used as name of file, to store in its folder sequentially.<br>
	 * 
	 * @param index
	 * @param name
	 * @param image
	 * @return Entire file path to be saved in database.
	 * @throws IOException
	 * @see {@link #addProduct(ProductDto, MultipartFile[])}
	 * @see {@link #editProduct(long, ProductDto, MultipartFile[])}
	 */
	private String saveImage(int index, String name, MultipartFile image) throws IOException {
		// fetching product path + name(product name & brand)
		String path = source.getMessage("productFolder", null, Locale.ENGLISH).concat(name);
		// Image Name used for its extension
		String imageName = image.getOriginalFilename();
		if (imageName == null) {
			throw new IOException("Invalid File name");
		}

		// generating name using file index and its extension
		name = index + "." + imageName.split("[.]")[1];

		// generating file complete path to save file and save path in db
		String filePath = path + File.separator + name;

		// makes/uses folder based on product path+name and saves image there
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
	 * Updates product into database with series of actions.<br>
	 * <ul>
	 * <li>Finds product in database using name and brand. If exists other than its
	 * own ID throws <strong>ProductAlreadyExistsException</strong>.</li>
	 * <li>Finds Category in database using name. If exists uses same category, else
	 * creates new.</li>
	 * <li>Sets {@link Category} and {@link Product} from raw input.</li>
	 * <li>Iterates through each file.</li>
	 * <ul>
	 * <li>Saves it in resources using
	 * {@link #addProduct(ProductDto, MultipartFile[])}. May throw
	 * <strong>IOException</strong>.</li>
	 * <li>Creates List of paths using savedImage and returned path.</li>
	 * <li>Sets list in Product.</li>
	 * </ul>
	 * <li>Sets ID in Product.</li>
	 * <li>Updates Product.</li>
	 * <li>Finally returns the Id of the Product that is saved.</li>
	 * </ul>
	 * 
	 * @param id
	 * @param productDto
	 * @param files
	 * @return Updated Product
	 * @throws ProductAlreadyExistsException
	 * @throws IOException
	 */
	public Product editProduct(long id, ProductDto productDto, MultipartFile[] files)
			throws ProductAlreadyExistsException, IOException {

		// finds product by name and brand, if already exists then throws exception
		Product existing = productDao.findByNameAndBrand(productDto.getName(), productDto.getBrand());
		if (existing != null && existing.getId() != id) {
			throw new ProductAlreadyExistsException(
					productDto.getName() + " of " + productDto.getBrand() + " already exists.");
		}

		// finds category, id found uses existing or else creates new
		Category existingCategory = categoryDao.findByCategoryName(productDto.getCategoryName());
		if (existingCategory != null) {
			productDto.setCategory(existingCategory);
		} else {
			productDto.setCategory();
		}

		// saving all images to resources and setting its path in Dto
		List<String> allImagePath = new ArrayList<>();
		for (int i = 0; i < files.length; i++) {
			String imagePath = saveImage(i + 1, productDto.getName().concat(productDto.getBrand()), files[i]);
			allImagePath.add(imagePath);
		}
		productDto.setImagePath(allImagePath);

		// sets product and updates its id and saves it
		productDto.setProduct();
		Product updated = productDto.getProduct();
		updated.setId(id);

		return productDao.save(updated);
	}

	/**
	 * Deletes if product exists or else, throws ProductNotFoundException. Also
	 * deletes all its images.
	 * 
	 * @param id
	 * @throws ProductNotFoundException
	 * @throws IOException
	 */
	public void deleteProduct(long id) throws ProductNotFoundException, IOException {
		Optional<Product> optionalProduct = productDao.findById(id);

		if (optionalProduct.isEmpty())
			throw new ProductNotFoundException("No such Product found");

		// deletes entire folder of images
		Product product = optionalProduct.get();
		String filePath = product.getImagePath().get(0);
		FileUtils.deleteDirectory(new File(filePath).getParentFile());

		productDao.deleteById(id);
	}

	/**
	 * Checks if product with that Id exist, else throws
	 * ProductNotFoundException.<br>
	 * Checks if that product exists in inventory database. Updates it if exists
	 * else creates new.
	 * 
	 * @param inventoryDto
	 * @return Id of the inventory created
	 * @throws ProductNotFoundException
	 */
	public Long addToInventory(InventoryDto inventoryDto) throws ProductNotFoundException {
		Optional<Product> dbProduct = productDao.findById(inventoryDto.getId());
		if (dbProduct.isEmpty()) {
			throw new ProductNotFoundException("No such product. Please Add new product");
		}

		Inventory inventoryByProduct = inventoryDao.findByProduct(dbProduct.get());
		if (inventoryByProduct != null) {
			inventoryByProduct.setQuantity(inventoryByProduct.getQuantity() + inventoryDto.getQuantity());
			inventoryByProduct.setLastImportDate(new Date());
			inventoryDao.save(inventoryByProduct);
			return inventoryByProduct.getId();
		}

		inventoryDto.setProduct(dbProduct.get());
		inventoryDto.setInventory();
		Inventory save = inventoryDao.save(inventoryDto.getInventory());
		return save.getId();
	}
	
	/**
	 * @return List of Orders
	 */
	public List<Order> getAllOrders(){
		return orderDao.findAll();
	}
}
