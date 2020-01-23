package br.com.cadumillani.moneytracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.cadumillani.moneytracker.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findOneByUsername(String username);
}