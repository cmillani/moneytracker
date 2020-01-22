package br.com.cadumillani.moneytracker.controller;

import org.springframework.web.bind.annotation.RestController;

import br.com.cadumillani.moneytracker.model.Investment;
import br.com.cadumillani.moneytracker.service.InvestmentsService;

import org.springframework.beans.factory.annotation.Autowired;
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

	@PostMapping("/")
	public void addOperation(@RequestBody Investment investment) {
		System.out.println(investment);
		investmentService.createInvestment(investment);
	}

}