package br.com.cadumillani.moneytracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.cadumillani.moneytracker.model.Investment;
import br.com.cadumillani.moneytracker.model.User;
import br.com.cadumillani.moneytracker.repository.InvestmentsRepository;

@Service
public class InvestmentsService {

    @Autowired
    InvestmentsRepository investmentsRepository;

    public List<Investment> getAllForUser(User user) {
        return investmentsRepository.findAllByUser(user);
    }

    public void createInvestment(Investment investment) {
        investmentsRepository.save(investment);
    }
}