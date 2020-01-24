package br.com.cadumillani.moneytracker.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
    private long id;

    @Column(name = "type")
    @NotNull
    @Enumerated(EnumType.STRING)
    private OperationType type;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;

    @Column(name = "assetcode")
    @NotBlank
    private String assetCode;

    @Column(name = "assetspecification")
    @NotBlank
    private String assetSpecification;

    @Column(name = "price")
    @NotNull
    private BigDecimal price;

    @Column(name = "quantity")
    @NotNull
    private Integer quantity;
    
    @Column(name = "ismanual")
    @NotNull
    private Boolean isManual;

    public Investment() {
    }

    public Investment(long id, OperationType type, Date date, User user, String assetCode, String assetSpecification, BigDecimal price, Integer quantity, Boolean isManual) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.user = user;
        this.assetCode = assetCode;
        this.assetSpecification = assetSpecification;
        this.price = price;
        this.quantity = quantity;
        this.isManual = isManual;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public OperationType getType() {
        return this.type;
    }

    public void setType(OperationType type) {
        this.type = type;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAssetCode() {
        return this.assetCode;
    }

    public void setAssetCode(String assetCode) {
        this.assetCode = assetCode;
    }

    public String getAssetSpecification() {
        return this.assetSpecification;
    }

    public void setAssetSpecification(String assetSpecification) {
        this.assetSpecification = assetSpecification;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Boolean isIsManual() {
        return this.isManual;
    }

    public Boolean getIsManual() {
        return this.isManual;
    }

    public void setIsManual(Boolean isManual) {
        this.isManual = isManual;
    }

    public Investment id(long id) {
        this.id = id;
        return this;
    }

    public Investment type(OperationType type) {
        this.type = type;
        return this;
    }

    public Investment date(Date date) {
        this.date = date;
        return this;
    }

    public Investment user(User user) {
        this.user = user;
        return this;
    }

    public Investment assetCode(String assetCode) {
        this.assetCode = assetCode;
        return this;
    }

    public Investment assetSpecification(String assetSpecification) {
        this.assetSpecification = assetSpecification;
        return this;
    }

    public Investment price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public Investment quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public Investment isManual(Boolean isManual) {
        this.isManual = isManual;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Investment)) {
            return false;
        }
        Investment investment = (Investment) o;
        return id == investment.id && Objects.equals(type, investment.type) && Objects.equals(date, investment.date) && Objects.equals(user, investment.user) && Objects.equals(assetCode, investment.assetCode) && Objects.equals(assetSpecification, investment.assetSpecification) && Objects.equals(price, investment.price) && Objects.equals(quantity, investment.quantity) && Objects.equals(isManual, investment.isManual);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, date, user, assetCode, assetSpecification, price, quantity, isManual);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", type='" + getType() + "'" +
            ", date='" + getDate() + "'" +
            ", user='" + getUser() + "'" +
            ", assetCode='" + getAssetCode() + "'" +
            ", assetSpecification='" + getAssetSpecification() + "'" +
            ", price='" + getPrice() + "'" +
            ", quantity='" + getQuantity() + "'" +
            ", isManual='" + isIsManual() + "'" +
            "}";
    }
    
}