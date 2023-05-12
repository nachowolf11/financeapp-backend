-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema financeapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema financeapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `financeapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `financeapp` ;

-- -----------------------------------------------------
-- Table `financeapp`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `financeapp`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `cellphone` VARCHAR(50) NOT NULL,
  `birthday` DATE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `financeapp`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `financeapp`.`account` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `balance` INT NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE INDEX `account_id` (`account_id` ASC) VISIBLE,
  UNIQUE INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `account_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `financeapp`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `financeapp`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `financeapp`.`categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `category_id` (`category_id` ASC) VISIBLE,
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `financeapp`.`account_movement_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `financeapp`.`account_movement_type` (
  `account_movement_type_id` INT NOT NULL AUTO_INCREMENT,
  `account_movement_name` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`account_movement_type_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `financeapp`.`account_movement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `financeapp`.`account_movement` (
  `account_movement_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `account_movement_type_id` INT NOT NULL,
  `amount` INT NOT NULL,
  `category_id` INT NOT NULL,
  `creation_date` DATE NOT NULL,
  PRIMARY KEY (`account_movement_id`),
  UNIQUE INDEX `account_movement_id` (`account_movement_id` ASC) VISIBLE,
  INDEX `category_id` (`category_id` ASC) VISIBLE,
  INDEX `account_movement_type_id` (`account_movement_type_id` ASC) VISIBLE,
  INDEX `account_movement_ibfk_1` (`user_id` ASC) VISIBLE,
  CONSTRAINT `account_movement_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `financeapp`.`users` (`user_id`),
  CONSTRAINT `account_movement_ibfk_2`
    FOREIGN KEY (`category_id`)
    REFERENCES `financeapp`.`categories` (`category_id`),
  CONSTRAINT `account_movement_ibfk_3`
    FOREIGN KEY (`account_movement_type_id`)
    REFERENCES `financeapp`.`account_movement_type` (`account_movement_type_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 80
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
