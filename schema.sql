DROP DATABASE IF EXISTS bab_DB;
CREATE DATABASE bab_DB;

USE bab_DB;

CREATE TABLE maincourse(
  id INT NOT NULL AUTO_INCREMENT,
  mainCourse VARCHAR(200) NOT NULL,
  toppings TEXT(2000),
  patty VARCHAR(45),
  PRIMARY KEY (id)
);

CREATE TABLE meal(
  id INT NOT NULL AUTO_INCREMENT,
  mainCourse TEXT(2000) NOT NULL,
  side VARCHAR(45),
  drink VARCHAR(45),
  PRIMARY KEY (id)
);
CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT,
  orderZ TEXT(2000) NOT NULL,
  
  PRIMARY KEY (id)
);
--  this.mainCourse=mainCourse;
--     this.toppings=toppings;
--     this.patty=patty;
