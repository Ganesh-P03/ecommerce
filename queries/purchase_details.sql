use ecommerce;

create table purchase_details(
    oId INT(11) NOT NULL,
    pId INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    offerId INT(11),
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (oId,pId),
    FOREIGN KEY (pId) REFERENCES products(pId),
    FOREIGN KEY (oId) REFERENCES orders(oId)
);
