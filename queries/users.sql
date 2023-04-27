USE ecommerce;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  mobile VARCHAR(255) NOT NULL,
  role ENUM('seller', 'buyer', 'advertiser','admin') NOT NULL
);

INSERT INTO users (name, email, password, mobile, role) VALUES
  ('Ganesh','ganesh@gmail.com','12345','9188258888','seller');


