/**
 * market
 */
package com.virtusa.market.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.hibernate.validator.constraints.Length;

import com.virtusa.market.model.Address;
import com.virtusa.market.model.Customer;
import com.virtusa.market.model.User;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

/**
 * @author meet
 * @since 10-Mar-2023
 */
public class CustomerEditDto {

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

	private String profilePicPath;

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
	 * @return the profilePicPath
	 */
	public String getProfilePicPath() {
		return profilePicPath;
	}

	/**
	 * @param profilePicPath the profilePicPath to set
	 */
	public void setProfilePicPath(String profilePicPath) {
		this.profilePicPath = profilePicPath;
	}

	/**
	 * @return the address
	 */
	public Address getAddress() {
		return address;
	}

	/**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}

	/**
	 * @return the customer
	 */
	public Customer getCustomer() {
		return customer;
	}

	/**
	 * @param temp the address to set
	 */
	public void setAddress(Address temp) {
		temp.setHouseNo(houseNo);
		temp.setAddressLine1(addressLine1);
		temp.setAddressLine2(addressLine2);
		temp.setCity(city);
		temp.setState(state);
		temp.setPincode(pincode);
		address = temp;
	}

	/**
	 * @param temp the user to set
	 */
	public void setUser(User temp) {
		temp.setName(name);
		if (profilePicPath != null)
			temp.setProfilePicPath(profilePicPath);
		user = temp;
	}

	/**
	 * @param customer the customer to set
	 */
	public void setCustomer(Customer customer) {
		customer.setGender(gender.equalsIgnoreCase("male"));
		customer.setPhone(phone);
		customer.setAddress(address);
		customer.setUser(user);
		try {
			this.customer.setDob(new SimpleDateFormat("yyyy-MM-dd").parse(dob));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		this.customer = customer;
	}

}
