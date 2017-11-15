-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: checking_system
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bootcamp_students`
--

DROP TABLE IF EXISTS `bootcamp_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bootcamp_students` (
  `stu_id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_name` varchar(250) DEFAULT NULL,
  `stu_birth_date` date DEFAULT NULL,
  `nath_id` int(11) DEFAULT '0',
  `phone_num` varchar(45) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `card_id` varchar(100) DEFAULT NULL,
  `stu_photo_name` varchar(150) DEFAULT NULL,
  `stu_cancel` int(11) DEFAULT '0',
  `stu_cancel_date` datetime DEFAULT NULL,
  `stu_cancel_user_id` int(11) DEFAULT '0',
  `stu_stop` int(11) DEFAULT '0',
  `stu_stop_date` datetime DEFAULT NULL,
  `stu_stop_user_id` int(11) DEFAULT '0',
  `stu_stop_reason` varchar(400) DEFAULT NULL,
  `bootcamp_id` int(11) DEFAULT '0',
  PRIMARY KEY (`stu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bootcamp_students`
--

LOCK TABLES `bootcamp_students` WRITE;
/*!40000 ALTER TABLE `bootcamp_students` DISABLE KEYS */;
INSERT INTO `bootcamp_students` VALUES (1,'Irene','2000-01-01',5,'0659604544','irene@gmail.com','2255CA','Samstraat 11','Rotterdam','022521444225566',NULL,0,NULL,0,0,NULL,0,NULL,1),(2,'Misheil Boulus','2017-11-17',44,'0659495708','x2020x@yahoo.com','2711GA','Griekenlandlaan, 11','Zoetermeer','19397867','',0,NULL,0,0,NULL,0,NULL,1);
/*!40000 ALTER TABLE `bootcamp_students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-15 16:53:41
