package com.serranomobile.sandbox.web;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.serranomobile.sandbox.domains.User;

@RequestMapping("/user/**")
@Controller
public class UserController {

    @RequestMapping(method = RequestMethod.POST, value = "{id}")
    public void post(@PathVariable Long id, ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) {
    }

    @RequestMapping(method=RequestMethod.GET)
    public String list(Model uiModel) {
    	ArrayList<User> users = new ArrayList<User>();
    	User u = new User();
    	u.setName("marc");
    	u.setPassword("password");
    	users.add(u);
    	u = new User();
    	u.setName("noah");
    	users.add(u);
    	uiModel.addAttribute("users", users);
        return "user/list";
    }
}
