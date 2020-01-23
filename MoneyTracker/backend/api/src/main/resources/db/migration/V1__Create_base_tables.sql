CREATE TABLE Users (
    id SERIAL NOT NULL,
    username varchar(60) NOT NULL,
    document varchar(11) NOT NULL,
    password varchar(60) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TYPE OperationType AS ENUM('buy', 'sell');
CREATE CAST (CHARACTER VARYING as OperationType) WITH INOUT AS IMPLICIT;

CREATE TABLE Operations (
    id SERIAL NOT NULL,
    userId INTEGER NOT NULL,
    type OperationType NOT NULL,
    date DATE NOT NULL,
    assetCode varchar(15) NOT NULL,
    assetSpecification VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    isManual BOOLEAN NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (userId) REFERENCES Users (id)
);