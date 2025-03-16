CREATE DATABASE gms;
USE gms;
show tables;
drop table equipment;
CREATE TABLE equipment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    purchase_date DATE,
    last_maintenance_date DATE,
    status ENUM("AVAILABLE","UNAVAILABLE","UNDER_MAINTENANCE","OUT_OF_ORDER") DEFAULT 'Available',
    warranty_expiry DATE
);

select * from equipment;
