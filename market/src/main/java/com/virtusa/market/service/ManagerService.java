/**
 * market
 */
package com.virtusa.market.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.virtusa.market.controller.ManagerController;
import com.virtusa.market.dao.CategoryDao;
import com.virtusa.market.dao.ProductDao;
import com.virtusa.market.dao.ProductImageDao;
import com.virtusa.market.dto.ProductDto;
import com.virtusa.market.exception.ProductAlreadyExistsException;
import com.virtusa.market.model.Category;
import com.virtusa.market.model.Product;
import com.virtusa.market.model.ProductImage;

import jakarta.transaction.Transactional;

/**
 * Service class for all Manager activities
 * @author meet
 * @since 12-Feb-2023
 * @see ManagerController
 */
@Service
@Transactional
public class ManagerService {

	@Autowired
	ProductDao productDao;
	
	@Autowired
	CategoryDao categoryDao;
	
	@Autowired
	ProductImageDao productImageDao;
	
	@Autowired
	MessageSource source;
	
	/**
	 * Saves product into database with series of actions.<br>
	 * <ul>
	 * 	<li>Finds product in database using name and brand. If exists throws <strong>ProductAlreadyExistsException</strong>.</li>
	 * 	<li>Finds Category in database using name. If exists uses same category, else creates new.</li>
	 * 	<li>Sets {@link Category} and {@link Product} from raw input.</li>
	 * 	<li>Saves Product.</li>
	 * 	<li>Iterates through each file.</li>
	 * 	<ul>
	 * 		<li>Saves it in resources using {@link #addProduct(ProductDto, MultipartFile[])}. May throw <strong>IOException</strong>.</li>
	 * 		<li>Creates {@link ProductImage} object using savedImage and returned path.</li>
	 * 		<li>Saves {@link ProductImage} in database.</li>
	 * 	</ul>
	 * 	<li>Finally returns the Id of the Product that is saved.</li>
	 * </ul>
	 * @param productDto
	 * @param files
	 * @return Id of product saved
	 * @throws ProductAlreadyExistsException
	 * @throws IOException
	 */
	public long addProduct(ProductDto productDto, MultipartFile[] files) throws ProductAlreadyExistsException, IOException {

		// finds product by name and brand, if already exists then throws exception
		Product existing = productDao.findByNameAndBrand(productDto.getName(), productDto.getBrand());
		if(existing!=null) {
			throw new ProductAlreadyExistsException(productDto.getName()+" of "+productDto.getBrand()+" already exists.");
		}

		// finds category, id found uses existing or else creates new
		Category existingCategory = categoryDao.findByCategoryName(productDto.getCategoryName());
		if(existingCategory!=null) {
			productDto.setCategory(existingCategory);
		}else {			
			productDto.setCategory();
		}

		// sets product and saves it
		productDto.setProduct();
		Product saved = productDao.save(productDto.getProduct());
		
		// saving all images
		for(int i=0; i<files.length; i++) {
			String imagePath = saveImage(i+1,saved.getName().concat(saved.getBrand()) , files[i]);
			ProductImage pi = new ProductImage(saved,imagePath);
			productImageDao.save(pi);
		}
		
		return saved.getId();
	}
	
	/**
	 * Saves an image to resources and returns it entire path.<br>
	 * Name consists of Product name and Product Brand which creates a sub-folder for all its images.<br>
	 * Index is used as name of file, to store in its folder sequentially.<br>
	 * @param index
	 * @param name
	 * @param image
	 * @return Entire file path to be saved in database.
	 * @throws IOException
	 * @see {@link #addProduct(ProductDto, MultipartFile[])}
	 */
	private String saveImage(int index, String name, MultipartFile image) throws IOException {
		// fetching product path + name(product name & brand)
		String path = source.getMessage("productFolder", null, Locale.ENGLISH).concat(name);
		// Image Name used for its extension
		String imageName = image.getOriginalFilename();
		if(imageName==null) {
			throw new IOException("Invalid File name");
		}
		
		// generating name using file index and its extension
		name = index + "." +imageName.split("[.]")[1];

		// generating file complete path to save file and save path in db
		String filePath = path + File.separator + name;
		
		// makes/uses folder based on product path+name and saves image there
		File dir = new File(path);
		if(!dir.exists()) dir.mkdir();
		
		// deletes file if exists
		Files.deleteIfExists(Paths.get(filePath));
		
		Files.copy(image.getInputStream(), Paths.get(filePath));

		return filePath;
	}
}
