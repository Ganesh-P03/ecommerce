use ecommerce;

create table purchase(
    oId INT(11) NOT NULL,
    cId INT(11) NOT NULL,
    pId INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pId) REFERENCES products(pId) ,
    FOREIGN KEY (cId) REFERENCES users(id) 
)

