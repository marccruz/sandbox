package com.serranomobile.sandbox.web.controllers;

import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.serranomobile.sandbox.web.domains.User;

@RequestMapping("/web")
@Controller
public class HomeController {
	
    @RequestMapping(method=RequestMethod.GET)
    public String index(Model uiModel) {
    	ArrayList<User> users = getAllUsers();
    	uiModel.addAttribute("users", users);
    	return "users/list";
    }

    @RequestMapping(value="/users?form", method=RequestMethod.GET)
    public String createForm(@ModelAttribute User u, Model uiModel) {
    	if (u == null) {
    		u = new User();
    	}
    	uiModel.addAttribute("user", u);
    	return "users/create";
    }
    
    private ArrayList<User> getAllUsers() {
    	ArrayList<User> users = new ArrayList<User>();
    	User u = new User();
    	u.setAccountNumber("CRUZMC216ME");
    	u.setFirstName("Marc");
    	u.setLastName("Cruz");
    	users.add(u);
    	
    	u = new User();
    	u.setAccountNumber("BELLN216ME");
    	u.setFirstName("Noah");
    	u.setLastName("Bell");
    	users.add(u);
    	
    	return users;
    }

}
