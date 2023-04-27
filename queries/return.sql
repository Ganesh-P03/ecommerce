use ecommerce;

create table returns(
    rId INT(11) NOT NULL AUTO_INCREMENT,
    oId INT(11) NOT NULL,
    pId INT(11) NOT NULL,
    desc VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (rId),
    FOREIGN KEY (oId) REFERENCES orders(oId),
    FOREIGN KEY (pId) REFERENCES products(pId)
)