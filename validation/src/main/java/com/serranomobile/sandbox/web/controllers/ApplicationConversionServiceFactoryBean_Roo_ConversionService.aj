// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.serranomobile.sandbox.web.controllers;

import com.serranomobile.sandbox.domains.User;
import com.serranomobile.sandbox.web.controllers.ApplicationConversionServiceFactoryBean;
import java.math.BigInteger;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;

privileged aspect ApplicationConversionServiceFactoryBean_Roo_ConversionService {
    
    declare @type: ApplicationConversionServiceFactoryBean: @Configurable;
    
    public Converter<User, String> ApplicationConversionServiceFactoryBean.getUserToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.serranomobile.sandbox.domains.User, java.lang.String>() {
            public String convert(User user) {
                return new StringBuilder().append(user.getId()).append(" ").append(user.getFirstName()).append(" ").append(user.getLastName()).append(" ").append(user.getDateCreated()).toString();
            }
        };
    }
    
    public Converter<String, User> ApplicationConversionServiceFactoryBean.getStringToUserConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.serranomobile.sandbox.domains.User>() {
            public com.serranomobile.sandbox.domains.User convert(String id) {
                return getObject().convert(getObject().convert(id, BigInteger.class), User.class);
            }
        };
    }
    
    public void ApplicationConversionServiceFactoryBean.installLabelConverters(FormatterRegistry registry) {
        registry.addConverter(getUserToStringConverter());
        registry.addConverter(getStringToUserConverter());
    }
    
    public void ApplicationConversionServiceFactoryBean.afterPropertiesSet() {
        super.afterPropertiesSet();
        installLabelConverters(getObject());
    }
    
}
