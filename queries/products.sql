USE ecommerce;

create TABLE products(
  pId INT(11) NOT NULL AUTO_INCREMENT,
  pName VARCHAR(50) NOT NULL,
  pDesc TEXT NOT NULL,
  pImg VARCHAR(255),
  pCost DECIMAL(10,2) NOT NULL,
  pQty INT(11) NOT NULL,
  PRIMARY KEY (pId)
);

INSERT INTO products (pName, pDesc, pImg, pCost, pQty,sId) VALUES
('Iphone 14', '15.40 cm (6.1″)','https://www.apple.com/v/iphone-14/f/images/key-features/features/size/size_yellow__dnv9794q7loy_large.jpg',79900,200,10),
('MacBook Pro','16GB Unified Memory','https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1671304673229',199900,100,10),
('Apple Watch','GPS + Cellular','https://img3.gadgetsnow.com/gd/images/products/additional/large/G392636_View_1/accessories/smart-watches/apple-watch-ultra-gps-cellular-49-mm-retina-oled-display-orange-alpine-loop-large-smart-watch.jpg',49900,100,10),

ALTER Table products
ADD sId INT NOT NULL;
ALTER Table products
ADD FOREIGN KEY (sId) REFERENCES users(id);



