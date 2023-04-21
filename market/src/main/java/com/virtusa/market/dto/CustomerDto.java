/**
 * market
 */
package com.virtusa.market.dto;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.Random;

import org.hibernate.validator.constraints.Length;
import org.springframework.context.MessageSource;

import com.virtusa.market.model.Address;
import com.virtusa.market.model.Customer;
import com.virtusa.market.model.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

/**
 * All fields of {@link Customer}, {@link User} and {@link Address}.<br>
 * Generates proper models from raw input.<br>
 * Contains all backend validation annotations.
 * @author meet
 * @since 11-Feb-2023
 */
public class CustomerDto {

	private static final Random RANDOM = new Random();
	
	@NotEmpty(message = "{NotEmpty.customer.gender}")
	private String gender;

	@NotEmpty(message = "{NotEmpty.customer.phone}")
	@Length(min = 10, max = 10, message = "{Length.customer.phone}")
	private String phone;

	@NotEmpty(message = "{NotEmpty.customer.dob}")
	private String dob;

	@NotEmpty(message = "{NotEmpty.customer.name}")
	@Length(max = 30, message = "{Length.customer.name}")
	private String name;

	@NotEmpty(message = "{NotEmpty.customer.email}")
	@Email(message = "{Email.customer.email}")
	@Length(max = 50, message = "{Length.customer.email}")
	private String email;

	@NotEmpty(message = "{NotEmpty.customer.password}")
	private String password;

	private String profilePicPath;

	@NotEmpty(message = "{NotEmpty.customer.houseNo}")
	@Length(max = 30, message = "{Length.customer.houseNo}")
	private String houseNo;

	@NotEmpty(message = "{NotEmpty.customer.addressLine1}")
	@Length(max = 50, message = "{Length.customer.addressLine1}")
	private String addressLine1;

	@Length(max = 50, message = "{Length.customer.addressLine2}")
	private String addressLine2;

	@NotEmpty(message = "{NotEmpty.customer.city}")
	@Length(max = 30, message = "{Length.customer.city}")
	private String city;

	@NotEmpty(message = "{NotEmpty.customer.state}")
	@Length(max = 30, message = "{Length.customer.state}")
	private String state;

	@NotNull(message = "{NotNull.customer.pincode}")
	@Min(value = 100000, message = "{Min.customer.pincode}")
	@Max(value = 999999, message = "{Max.customer.pincode}")
	private int pincode;

	private Address address = new Address();

	private User user = new User();

	private Customer customer = new Customer();

	/**
	 * @return the gender
	 */
	public String getGender() {
		return gender;
	}

	/**
	 * @param gender the gender to set
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}

	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * @return the dob
	 */
	public String getDob() {
		return dob;
	}

	/**
	 * @param dob the dob to set
	 */
	public void setDob(String dob) {
		this.dob = dob;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the profilePicPath
	 */
	public String getProfilePicPath() {
		return profilePicPath;
	}

	/**
	 * @param source
	 */
	public void setProfilePicPath(MessageSource source) {

		String path = source.getMessage("profileFolder", null, Locale.ENGLISH)+"default"+File.separator;
		// appending folder name
		if (getGender().equalsIgnoreCase("male")) {
			path += "male"+File.separator;
		} else {
			path += "female"+File.separator;
		}
		// getting list of all images
		String[] contents = new File(path).list();
		// selecting random image
		String random = contents[(RANDOM.nextInt(contents.length))];
		this.profilePicPath = path+random;
	}

	/**
	 * @return the houseNo
	 */
	public String getHouseNo() {
		return houseNo;
	}

	/**
	 * @param houseNo the houseNo to set
	 */
	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}

	/**
	 * @return the addressLine1
	 */
	public String getAddressLine1() {
		return addressLine1;
	}

	/**
	 * @param addressLine1 the addressLine1 to set
	 */
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	/**
	 * @return the addressLine2
	 */
	public String getAddressLine2() {
		return addressLine2;
	}

	/**
	 * @param addressLine2 the addressLine2 to set
	 */
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * @return the pincode
	 */
	public int getPincode() {
		return pincode;
	}

	/**
	 * @param pincode the pincode to set
	 */
	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	/**
	 * @return the address
	 */
	public Address getAddress() {
		return address;
	}

	/**
	 * the address to set using other field attributes
	 */
	public void setAddress() {
		this.address.setHouseNo(getHouseNo());
		this.address.setAddressLine1(getAddressLine1());
		this.address.setAddressLine2(getAddressLine2());
		this.address.setCity(getCity());
		this.address.setState(getState());
		this.address.setPincode(getPincode());
	}

	/**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}

	/**
	 * the user to set using other field attributes
	 */
	public void setUser() {
		this.user.setEmail(getEmail());
		this.user.setName(getName());
		this.user.setPassword(getPassword());
		this.user.setRole("Customer");
		this.user.setProfilePicPath(getProfilePicPath());
	}

	/**
	 * @return the customer
	 */
	public Customer getCustomer() {
		return customer;
	}

	/**
	 * the customer to set using other field attributes
	 */
	public void setCustomer() {
		this.customer.setAddress(getAddress());		
		this.customer.setGender(getGender().equalsIgnoreCase("male"));

		this.customer.setPhone(getPhone());
		this.customer.setUser(getUser());
		try {
			this.customer.setDob(new SimpleDateFormat("yyyy-MM-dd").parse(getDob()));
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

}
