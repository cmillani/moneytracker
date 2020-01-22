package br.com.cadumillani.moneytracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.cadumillani.moneytracker.model.Investment;

public interface InvestmentsRepository extends JpaRepository<Investment, Long> {
    
}