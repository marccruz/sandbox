package com.serranomobile.sandbox.domains;

import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoEntity;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooMongoEntity
public class User {

    private String name;

    private String password;

    private String id;

    private Boolean active;

    private Boolean isActive;
}
