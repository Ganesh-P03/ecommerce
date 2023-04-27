USE ecommerce;

create TABLE cart(
  cId INT(11) NOT NULL,
  pId INT(11) NOT NULL,
  quantity INT(11) NOT NULL,
  FOREIGN KEY (pId) REFERENCES products(pId) ON DELETE CASCADE,
  FOREIGN KEY (cId) REFERENCES users(id) ON DELETE CASCADE
);



