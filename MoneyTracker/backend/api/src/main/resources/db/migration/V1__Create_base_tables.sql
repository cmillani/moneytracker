CREATE TABLE Users (
     id SERIAL NOT NULL,
     username varchar(11) not null,
     password varchar(60) not null,
     PRIMARY KEY (ID)
);

CREATE TYPE OperationType AS ENUM('sad', 'ok', 'happy');

CREATE TABLE Operations (
    id SERIAL NOT NULL,
    type OperationType NOT NULL,
    date DATE NOT NULL,
    assetCode varchar(15) NOT NULL,
    assetSpecification VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    isManual BOOLEAN NOT NULL,
    PRIMARY KEY (ID)
);