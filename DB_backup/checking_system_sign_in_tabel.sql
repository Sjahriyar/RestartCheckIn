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
-- Table structure for table `sign_in_tabel`
--

DROP TABLE IF EXISTS `sign_in_tabel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sign_in_tabel` (
  `sign_id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` int(11) DEFAULT '0',
  `bootcamp_id` int(11) DEFAULT '0',
  `card_id` varchar(100) DEFAULT NULL,
  `sign_in_date` datetime DEFAULT NULL,
  `sign_alarm` int(11) DEFAULT '0',
  `check_message` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`sign_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sign_in_tabel`
--

LOCK TABLES `sign_in_tabel` WRITE;
/*!40000 ALTER TABLE `sign_in_tabel` DISABLE KEYS */;
INSERT INTO `sign_in_tabel` VALUES (1,1,1,'19397867','2017-11-14 09:50:00',0,NULL),(6,43,1,'11','2017-11-14 10:41:34',0,NULL),(7,43,1,'11',NULL,0,NULL),(8,43,1,'11',NULL,0,NULL),(9,43,1,'11','2017-11-15 10:11:52',0,NULL),(13,2,1,'19397867','2017-11-14 13:11:42',1,NULL),(14,2,1,'19397867','2017-11-15 14:11:34',1,'Thank you for check in Misheil Boulus Happy coading ... Notice there is a notification message sent now to the slack ... Please check it');
/*!40000 ALTER TABLE `sign_in_tabel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-15 16:22:55
