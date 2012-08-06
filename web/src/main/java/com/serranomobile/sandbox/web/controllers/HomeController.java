package com.serranomobile.sandbox.web.controllers;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.serranomobile.sandbox.web.domains.User;

@RequestMapping("/")
@Controller
public class HomeController {
    @RequestMapping public String index(Model uiModel) {
    	ArrayList<User> users = new ArrayList<User>();
    	User u = new User();
    	u.setAccountNumber("CRUZMC*216ME");
    	u.setFirstName("Marc");
    	u.setLastName("Cruz");
    	users.add(u);
    	
    	u = new User();
    	u.setAccountNumber("BELL*N216ME");
    	u.setFirstName("Noah");
    	u.setLastName("Bell");
    	users.add(u);
    	
    	uiModel.addAttribute("users", users);
        return "index";
    }
}
