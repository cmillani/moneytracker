package br.com.cadumillani.moneytracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.cadumillani.moneytracker.model.Investment;
import br.com.cadumillani.moneytracker.model.User;

public interface InvestmentsRepository extends JpaRepository<Investment, Long> {
    List<Investment> findAllByUser(User user);
}