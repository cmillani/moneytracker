package br.com.cadumillani.moneytracker;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class InvestmentsController {

	@RequestMapping("/investments")
	public String index() {
		return "Greetings from Spring Boot!";
	}

	@RequestMapping(name = "/investments", method = RequestMethod.POST)
	public void addOperation() {

	}

}