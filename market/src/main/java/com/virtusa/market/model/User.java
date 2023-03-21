/**
 * market
 */
package com.virtusa.market.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * @author meet
 * @since 09-Feb-2023
 * @see Customer
 */
@Entity
public class User {

	@Id()
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(length = 30, nullable = false)
	private String name;
	
	@Column(length = 50, unique = true, nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String password;
	
	@Column(length = 20, nullable = false)
	private String role;
	
	@Column(nullable = false)
	private String profilePicPath;
	
	@Column(nullable = false)
	private boolean enabled = true;
	
	/**
	 * Default constructor
	 */
	public User() {
		super();
	}

	/**
	 * @param id
	 * @param name
	 * @param email
	 * @param password
	 * @param role
	 * @param profilePicPath
	 * @param enabled
	 */
	public User(long id, String name, String email, String password, String role, String profilePicPath,
			boolean enabled) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
		this.profilePicPath = profilePicPath;
		this.enabled = enabled;
	}

	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
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
	 * @return the role
	 */
	public String getRole() {
		return role;
	}

	/**
	 * @param role the role to set
	 */
	public void setRole(String role) {
		this.role = role;
	}

	/**
	 * @return the profilePicPath
	 */
	public String getProfilePicPath() {
		return profilePicPath;
	}

	/**
	 * @param profilePicAddress the profilePicPath to set
	 */
	public void setProfilePicPath(String profilePicAddress) {
		this.profilePicPath = profilePicAddress;
	}

	/**
	 * @return the enabled
	 */
	public boolean isEnabled() {
		return enabled;
	}

	/**
	 * @param enabled the enabled to set
	 */
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	/**
	 * @return the User Model string value
	 */
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", role=" + role
				+ ", profilePicPath=" + profilePicPath + "]";
	}
	

}
