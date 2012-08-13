package com.serranomobile.sandbox.web.controllers;

import com.serranomobile.sandbox.domains.User;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RequestMapping("/users")
@Controller
@RooWebScaffold(path = "users", formBackingObject = User.class)
public class UserController {
	
	@RequestMapping(params="form", method=RequestMethod.GET, produces="text/html")
	public String createForm(Model uiModel) {
		User u = new User();
		uiModel.addAttribute("user", u);
		return "users/create";
	}

	@RequestMapping(method=RequestMethod.POST, produces="text/html")
	public String create(User u, BindingResult result, Model uiModel) {
		return "users/create";
	}

}
