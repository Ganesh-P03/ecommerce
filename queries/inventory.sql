use ecommerce;

create table inventory(
    pId INT(11) NOT NULL,
    wId INT(11) NOT NULL,
    FOREIGN KEY (pId) REFERENCES products(pId) ON DELETE CASCADE,
    FOREIGN KEY (wId) REFERENCES warehouse(wId) ON DELETE CASCADE
)


INSERT INTO inventory (pId,wId) VALUES
(6,1),
(8,1),
(9,3),
(10,4),
(11,1);
