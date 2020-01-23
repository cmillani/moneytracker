package br.com.cadumillani.moneytracker.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.cadumillani.moneytracker.model.User;
import br.com.cadumillani.moneytracker.service.UsersService;

@RestController
@RequestMapping("/users")
class UsersController {

    @Autowired
    UsersService userService;

    @PostMapping("/signup")
    public ResponseEntity<HttpStatus> signup(@Valid @RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}