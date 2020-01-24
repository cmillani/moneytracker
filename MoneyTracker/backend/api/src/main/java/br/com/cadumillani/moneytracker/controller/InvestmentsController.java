package br.com.cadumillani.moneytracker.controller;

import org.springframework.web.bind.annotation.RestController;

import br.com.cadumillani.moneytracker.model.Investment;
import br.com.cadumillani.moneytracker.service.InvestmentsService;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/investments")
public class InvestmentsController {

	@Autowired
	InvestmentsService investmentService;

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

	@PostMapping(name = "/", produces = "application/json", consumes = "application/json")
	public ResponseEntity<HttpStatus> addOperation(@Valid @RequestBody Investment investment) {
		investmentService.createInvestment(investment);
		return ResponseEntity.ok(HttpStatus.OK);
	}

}