CREATE TABLE `application`
(
    `id`   bigint(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uniq_name` (`name`)
) DEFAULT CHARSET=utf8mb4;
