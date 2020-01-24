package br.com.cadumillani.moneytracker.model.search;

public class InvestmentSearchParams {
    private Long userId;

    public InvestmentSearchParams() {
    }

    public InvestmentSearchParams(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public InvestmentSearchParams userId(Long userId) {
        this.userId = userId;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof InvestmentSearchParams)) {
            return false;
        }
        InvestmentSearchParams investmentSearchParams = (InvestmentSearchParams) o;
        return Objects.equals(userId, investmentSearchParams.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(userId);
    }

    @Override
    public String toString() {
        return "{" +
            " userId='" + getUserId() + "'" +
            "}";
    }

}