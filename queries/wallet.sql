USE ecommerce;

create table wallet(
    id INT(11) NOT NULL,
    accountNumber VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES users(id)
);


INSERT INTO wallet (id, accountNumber) VALUES
(10,656642465145)
(11,689425781426)
(13,657842365145)

