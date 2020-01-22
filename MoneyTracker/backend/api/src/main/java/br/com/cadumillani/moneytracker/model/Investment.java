package br.com.cadumillani.moneytracker.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "Operations")
public class Investment {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column(name = "type")
    @NotNull
    OperationType type;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    Date date;

    @Column(name = "assetCode")
    @NotBlank
    String assetCode;

    @Column(name = "assetSpecification")
    @NotBlank
    String assetSpecification;

    @Column(name = "price")
    @NotNull
    BigDecimal price;

    @Column(name = "quantity")
    @NotNull
    Integer quantity;
    
    @Column(name = "isManual")
    @NotNull
    Boolean isManual;
}