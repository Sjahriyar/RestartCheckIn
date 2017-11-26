# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20)
# Database: checking_system
# Generation Time: 2017-11-17 15:15:58 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table bootcamp_name
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bootcamp_name`;

CREATE TABLE `bootcamp_name` (
  `bootcamp_id` int(11) NOT NULL AUTO_INCREMENT,
  `bootcamp_name` varchar(250) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `bootcamp_cancel` int(11) DEFAULT '0',
  `slack_link` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `login_id` int(11) DEFAULT '0',
  PRIMARY KEY (`bootcamp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

LOCK TABLES `bootcamp_name` WRITE;
/*!40000 ALTER TABLE `bootcamp_name` DISABLE KEYS */;

INSERT INTO `bootcamp_name` (`bootcamp_id`, `bootcamp_name`, `start_date`, `end_date`, `bootcamp_cancel`, `slack_link`, `created_at`, `login_id`)
VALUES
	(0,'Two Bootcamp Summer18','2018-01-10','2018-03-26',0,'https://hooks.slack.com/services/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','2018-01-01 00:00:00',1),
	(1,'One Bootcamp Summer17','2017-06-25','2017-08-25',0,'https://hooks.slack.com/services/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','2017-06-23 00:00:00',1),
	(2,'bootcamp winter 2017','2017-11-30','2017-12-15',0,'https://hooks.slack.com/services/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','2017-11-17 13:33:39',0);

/*!40000 ALTER TABLE `bootcamp_name` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bootcamp_students
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bootcamp_students`;

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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

LOCK TABLES `bootcamp_students` WRITE;
/*!40000 ALTER TABLE `bootcamp_students` DISABLE KEYS */;

INSERT INTO `bootcamp_students` (`stu_id`, `stu_name`, `stu_birth_date`, `nath_id`, `phone_num`, `email`, `postcode`, `address`, `city`, `card_id`, `stu_photo_name`, `stu_cancel`, `stu_cancel_date`, `stu_cancel_user_id`, `stu_stop`, `stu_stop_date`, `stu_stop_user_id`, `stu_stop_reason`, `bootcamp_id`)
VALUES
	(32,'Shahrokh Nabavi','2017-12-31',364,'06182718','shahrokh@dsa.com','3027cc','Schaepmanstraat 11B','rotterdam','19407323','shahrokh.png',0,NULL,0,0,NULL,0,NULL,0),
	(37,'Ivas','2017-12-31',440,'032841834','ivas@restart.net','3421OP','Schaepmannen','Rotterdam','19551915','Screen Shot 2017-11-16 at 18.36.26.png',0,NULL,0,0,NULL,0,NULL,0),
	(38,'Shahriyar Soheili','1989-12-31',364,'0686019093','sh.soheytizadeh@gmail.com','1839 CK','schaepmanstraat 11B','Rotterdam','19506747','IMG_2233.jpg',0,NULL,0,0,NULL,0,NULL,0),
	(39,'Sheril Greg','1999-12-31',356,'02389130','sheril@gmail.com','3027cc','4281 Express LN','rotterdam','19542283','b.png',0,NULL,0,0,NULL,0,NULL,0),
	(40,'Irene Jobey','2017-12-31',356,'092929391','irene@restart.com','823u291 IL','Schaepmanstraat 11B','rotterdam','19413147','Screen Shot 2017-11-16 at 18.42.09.png',0,NULL,0,0,NULL,0,NULL,1),
	(41,'Misheil Boul','2017-12-31',818,'89013891','michel@fdsda.com','3014ad','diergaardesingel','rotterdam','19397867','Screen Shot 2017-11-16 at 18.43.29.png',0,NULL,0,0,NULL,0,NULL,0),
	(42,'Mahmoud Almorahlee','1981-12-31',760,'0686192018','mahmoud@restart.com','3029 JL','Kiningstraat 11N','Rotterdam','19591227','mahmoud.png',0,NULL,0,0,NULL,0,NULL,1),
	(43,'Sadek Al Shaar','1987-08-29',760,'0687129971','sadek@restart.com','9810 YL','WeenaStraat 49','Rotterdam','12313813819','sadek.png',0,NULL,0,0,NULL,0,NULL,1),
	(44,'Essu','1987-01-01',0,NULL,NULL,NULL,NULL,NULL,'19409147',NULL,0,NULL,0,0,NULL,0,NULL,1);

/*!40000 ALTER TABLE `bootcamp_students` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table check_ok
# ------------------------------------------------------------

DROP TABLE IF EXISTS `check_ok`;

CREATE TABLE `check_ok` (
  `check_ok` int(11) NOT NULL AUTO_INCREMENT,
  `check_message` varchar(400) DEFAULT NULL,
  `sound` varchar(100) DEFAULT NULL,
  `played` int(11) DEFAULT '0',
  PRIMARY KEY (`check_ok`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

LOCK TABLES `check_ok` WRITE;
/*!40000 ALTER TABLE `check_ok` DISABLE KEYS */;

INSERT INTO `check_ok` (`check_ok`, `check_message`, `sound`, `played`)
VALUES
	(1,'','',1);

/*!40000 ALTER TABLE `check_ok` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table countries
# ------------------------------------------------------------

DROP TABLE IF EXISTS `countries`;

CREATE TABLE `countries` (
  `num_code` int(11) DEFAULT NULL,
  `alpha_2_code` text,
  `alpha_3_code` text,
  `en_short_name` text,
  `nationality` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;

INSERT INTO `countries` (`num_code`, `alpha_2_code`, `alpha_3_code`, `en_short_name`, `nationality`)
VALUES
	(4,'AF','AFG','Afghanistan','Afghan'),
	(248,'AX','ALA','Åland Islands','Åland Island'),
	(8,'AL','ALB','Albania','Albanian'),
	(12,'DZ','DZA','Algeria','Algerian'),
	(16,'AS','ASM','American Samoa','American Samoan'),
	(20,'AD','AND','Andorra','Andorran'),
	(24,'AO','AGO','Angola','Angolan'),
	(660,'AI','AIA','Anguilla','Anguillan'),
	(10,'AQ','ATA','Antarctica','Antarctic'),
	(28,'AG','ATG','Antigua and Barbuda','Antiguan or Barbudan'),
	(32,'AR','ARG','Argentina','Argentine'),
	(51,'AM','ARM','Armenia','Armenian'),
	(533,'AW','ABW','Aruba','Aruban'),
	(36,'AU','AUS','Australia','Australian'),
	(40,'AT','AUT','Austria','Austrian'),
	(31,'AZ','AZE','Azerbaijan','Azerbaijani, Azeri'),
	(44,'BS','BHS','Bahamas','Bahamian'),
	(48,'BH','BHR','Bahrain','Bahraini'),
	(50,'BD','BGD','Bangladesh','Bangladeshi'),
	(52,'BB','BRB','Barbados','Barbadian'),
	(112,'BY','BLR','Belarus','Belarusian'),
	(56,'BE','BEL','Belgium','Belgian'),
	(84,'BZ','BLZ','Belize','Belizean'),
	(204,'BJ','BEN','Benin','Beninese, Beninois'),
	(60,'BM','BMU','Bermuda','Bermudian, Bermudan'),
	(64,'BT','BTN','Bhutan','Bhutanese'),
	(68,'BO','BOL','Bolivia (Plurinational State of)','Bolivian'),
	(535,'BQ','BES','Bonaire, Sint Eustatius and Saba','Bonaire'),
	(70,'BA','BIH','Bosnia and Herzegovina','Bosnian or Herzegovinian'),
	(72,'BW','BWA','Botswana','Motswana, Botswanan'),
	(74,'BV','BVT','Bouvet Island','Bouvet Island'),
	(76,'BR','BRA','Brazil','Brazilian'),
	(86,'IO','IOT','British Indian Ocean Territory','BIOT'),
	(96,'BN','BRN','Brunei Darussalam','Bruneian'),
	(100,'BG','BGR','Bulgaria','Bulgarian'),
	(854,'BF','BFA','Burkina Faso','Burkinabé'),
	(108,'BI','BDI','Burundi','Burundian'),
	(132,'CV','CPV','Cabo Verde','Cabo Verdean'),
	(116,'KH','KHM','Cambodia','Cambodian'),
	(120,'CM','CMR','Cameroon','Cameroonian'),
	(124,'CA','CAN','Canada','Canadian'),
	(136,'KY','CYM','Cayman Islands','Caymanian'),
	(140,'CF','CAF','Central African Republic','Central African'),
	(148,'TD','TCD','Chad','Chadian'),
	(152,'CL','CHL','Chile','Chilean'),
	(156,'CN','CHN','China','Chinese'),
	(162,'CX','CXR','Christmas Island','Christmas Island'),
	(166,'CC','CCK','Cocos (Keeling) Islands','Cocos Island'),
	(170,'CO','COL','Colombia','Colombian'),
	(174,'KM','COM','Comoros','Comoran, Comorian'),
	(178,'CG','COG','Congo (Republic of the)','Congolese'),
	(180,'CD','COD','Congo (Democratic Republic of the)','Congolese'),
	(184,'CK','COK','Cook Islands','Cook Island'),
	(188,'CR','CRI','Costa Rica','Costa Rican'),
	(384,'CI','CIV','Côte d\'Ivoire','Ivorian'),
	(191,'HR','HRV','Croatia','Croatian'),
	(192,'CU','CUB','Cuba','Cuban'),
	(531,'CW','CUW','Curaçao','Curaçaoan'),
	(196,'CY','CYP','Cyprus','Cypriot'),
	(203,'CZ','CZE','Czech Republic','Czech'),
	(208,'DK','DNK','Denmark','Danish'),
	(262,'DJ','DJI','Djibouti','Djiboutian'),
	(212,'DM','DMA','Dominica','Dominican'),
	(214,'DO','DOM','Dominican Republic','Dominican'),
	(218,'EC','ECU','Ecuador','Ecuadorian'),
	(818,'EG','EGY','Egypt','Egyptian'),
	(222,'SV','SLV','El Salvador','Salvadoran'),
	(226,'GQ','GNQ','Equatorial Guinea','Equatorial Guinean, Equatoguinean'),
	(232,'ER','ERI','Eritrea','Eritrean'),
	(233,'EE','EST','Estonia','Estonian'),
	(231,'ET','ETH','Ethiopia','Ethiopian'),
	(238,'FK','FLK','Falkland Islands (Malvinas)','Falkland Island'),
	(234,'FO','FRO','Faroe Islands','Faroese'),
	(242,'FJ','FJI','Fiji','Fijian'),
	(246,'FI','FIN','Finland','Finnish'),
	(250,'FR','FRA','France','French'),
	(254,'GF','GUF','French Guiana','French Guianese'),
	(258,'PF','PYF','French Polynesia','French Polynesian'),
	(260,'TF','ATF','French Southern Territories','French Southern Territories'),
	(266,'GA','GAB','Gabon','Gabonese'),
	(270,'GM','GMB','Gambia','Gambian'),
	(268,'GE','GEO','Georgia','Georgian'),
	(276,'DE','DEU','Germany','German'),
	(288,'GH','GHA','Ghana','Ghanaian'),
	(292,'GI','GIB','Gibraltar','Gibraltar'),
	(300,'GR','GRC','Greece','Greek, Hellenic'),
	(304,'GL','GRL','Greenland','Greenlandic'),
	(308,'GD','GRD','Grenada','Grenadian'),
	(312,'GP','GLP','Guadeloupe','Guadeloupe'),
	(316,'GU','GUM','Guam','Guamanian, Guambat'),
	(320,'GT','GTM','Guatemala','Guatemalan'),
	(831,'GG','GGY','Guernsey','Channel Island'),
	(324,'GN','GIN','Guinea','Guinean'),
	(624,'GW','GNB','Guinea-Bissau','Bissau-Guinean'),
	(328,'GY','GUY','Guyana','Guyanese'),
	(332,'HT','HTI','Haiti','Haitian'),
	(334,'HM','HMD','Heard Island and McDonald Islands','Heard Island or McDonald Islands'),
	(336,'VA','VAT','Vatican City State','Vatican'),
	(340,'HN','HND','Honduras','Honduran'),
	(344,'HK','HKG','Hong Kong','Hong Kong, Hong Kongese'),
	(348,'HU','HUN','Hungary','Hungarian, Magyar'),
	(352,'IS','ISL','Iceland','Icelandic'),
	(356,'IN','IND','India','Indian'),
	(360,'ID','IDN','Indonesia','Indonesian'),
	(364,'IR','IRN','Iran','Iranian, Persian'),
	(368,'IQ','IRQ','Iraq','Iraqi'),
	(372,'IE','IRL','Ireland','Irish'),
	(833,'IM','IMN','Isle of Man','Manx'),
	(376,'IL','ISR','Israel','Israeli'),
	(380,'IT','ITA','Italy','Italian'),
	(388,'JM','JAM','Jamaica','Jamaican'),
	(392,'JP','JPN','Japan','Japanese'),
	(832,'JE','JEY','Jersey','Channel Island'),
	(400,'JO','JOR','Jordan','Jordanian'),
	(398,'KZ','KAZ','Kazakhstan','Kazakhstani, Kazakh'),
	(404,'KE','KEN','Kenya','Kenyan'),
	(296,'KI','KIR','Kiribati','I-Kiribati'),
	(408,'KP','PRK','Korea (Democratic People\'s Republic of)','North Korean'),
	(410,'KR','KOR','Korea (Republic of)','South Korean'),
	(414,'KW','KWT','Kuwait','Kuwaiti'),
	(417,'KG','KGZ','Kyrgyzstan','Kyrgyzstani, Kyrgyz, Kirgiz, Kirghiz'),
	(418,'LA','LAO','Lao People\'s Democratic Republic','Lao, Laotian'),
	(428,'LV','LVA','Latvia','Latvian'),
	(422,'LB','LBN','Lebanon','Lebanese'),
	(426,'LS','LSO','Lesotho','Basotho'),
	(430,'LR','LBR','Liberia','Liberian'),
	(434,'LY','LBY','Libya','Libyan'),
	(438,'LI','LIE','Liechtenstein','Liechtenstein'),
	(440,'LT','LTU','Lithuania','Lithuanian'),
	(442,'LU','LUX','Luxembourg','Luxembourg, Luxembourgish'),
	(446,'MO','MAC','Macao','Macanese, Chinese'),
	(807,'MK','MKD','Macedonia (the former Yugoslav Republic of)','Macedonian'),
	(450,'MG','MDG','Madagascar','Malagasy'),
	(454,'MW','MWI','Malawi','Malawian'),
	(458,'MY','MYS','Malaysia','Malaysian'),
	(462,'MV','MDV','Maldives','Maldivian'),
	(466,'ML','MLI','Mali','Malian, Malinese'),
	(470,'MT','MLT','Malta','Maltese'),
	(584,'MH','MHL','Marshall Islands','Marshallese'),
	(474,'MQ','MTQ','Martinique','Martiniquais, Martinican'),
	(478,'MR','MRT','Mauritania','Mauritanian'),
	(480,'MU','MUS','Mauritius','Mauritian'),
	(175,'YT','MYT','Mayotte','Mahoran'),
	(484,'MX','MEX','Mexico','Mexican'),
	(583,'FM','FSM','Micronesia (Federated States of)','Micronesian'),
	(498,'MD','MDA','Moldova (Republic of)','Moldovan'),
	(492,'MC','MCO','Monaco','Monégasque, Monacan'),
	(496,'MN','MNG','Mongolia','Mongolian'),
	(499,'ME','MNE','Montenegro','Montenegrin'),
	(500,'MS','MSR','Montserrat','Montserratian'),
	(504,'MA','MAR','Morocco','Moroccan'),
	(508,'MZ','MOZ','Mozambique','Mozambican'),
	(104,'MM','MMR','Myanmar','Burmese'),
	(516,'NA','NAM','Namibia','Namibian'),
	(520,'NR','NRU','Nauru','Nauruan'),
	(524,'NP','NPL','Nepal','Nepali, Nepalese'),
	(528,'NL','NLD','Netherlands','Dutch, Netherlandic'),
	(540,'NC','NCL','New Caledonia','New Caledonian'),
	(554,'NZ','NZL','New Zealand','New Zealand, NZ'),
	(558,'NI','NIC','Nicaragua','Nicaraguan'),
	(562,'NE','NER','Niger','Nigerien'),
	(566,'NG','NGA','Nigeria','Nigerian'),
	(570,'NU','NIU','Niue','Niuean'),
	(574,'NF','NFK','Norfolk Island','Norfolk Island'),
	(580,'MP','MNP','Northern Mariana Islands','Northern Marianan'),
	(578,'NO','NOR','Norway','Norwegian'),
	(512,'OM','OMN','Oman','Omani'),
	(586,'PK','PAK','Pakistan','Pakistani'),
	(585,'PW','PLW','Palau','Palauan'),
	(275,'PS','PSE','Palestine, State of','Palestinian'),
	(591,'PA','PAN','Panama','Panamanian'),
	(598,'PG','PNG','Papua New Guinea','Papua New Guinean, Papuan'),
	(600,'PY','PRY','Paraguay','Paraguayan'),
	(604,'PE','PER','Peru','Peruvian'),
	(608,'PH','PHL','Philippines','Philippine, Filipino'),
	(612,'PN','PCN','Pitcairn','Pitcairn Island'),
	(616,'PL','POL','Poland','Polish'),
	(620,'PT','PRT','Portugal','Portuguese'),
	(630,'PR','PRI','Puerto Rico','Puerto Rican'),
	(634,'QA','QAT','Qatar','Qatari'),
	(638,'RE','REU','Réunion','Réunionese, Réunionnais'),
	(642,'RO','ROU','Romania','Romanian'),
	(643,'RU','RUS','Russian Federation','Russian'),
	(646,'RW','RWA','Rwanda','Rwandan'),
	(652,'BL','BLM','Saint Barthélemy','Barthélemois'),
	(654,'SH','SHN','Saint Helena, Ascension and Tristan da Cunha','Saint Helenian'),
	(659,'KN','KNA','Saint Kitts and Nevis','Kittitian or Nevisian'),
	(662,'LC','LCA','Saint Lucia','Saint Lucian'),
	(663,'MF','MAF','Saint Martin (French part)','Saint-Martinoise'),
	(666,'PM','SPM','Saint Pierre and Miquelon','Saint-Pierrais or Miquelonnais'),
	(670,'VC','VCT','Saint Vincent and the Grenadines','Saint Vincentian, Vincentian'),
	(882,'WS','WSM','Samoa','Samoan'),
	(674,'SM','SMR','San Marino','Sammarinese'),
	(678,'ST','STP','Sao Tome and Principe','São Toméan'),
	(682,'SA','SAU','Saudi Arabia','Saudi, Saudi Arabian'),
	(686,'SN','SEN','Senegal','Senegalese'),
	(688,'RS','SRB','Serbia','Serbian'),
	(690,'SC','SYC','Seychelles','Seychellois'),
	(694,'SL','SLE','Sierra Leone','Sierra Leonean'),
	(702,'SG','SGP','Singapore','Singaporean'),
	(534,'SX','SXM','Sint Maarten (Dutch part)','Sint Maarten'),
	(703,'SK','SVK','Slovakia','Slovak'),
	(705,'SI','SVN','Slovenia','Slovenian, Slovene'),
	(90,'SB','SLB','Solomon Islands','Solomon Island'),
	(706,'SO','SOM','Somalia','Somali, Somalian'),
	(710,'ZA','ZAF','South Africa','South African'),
	(239,'GS','SGS','South Georgia and the South Sandwich Islands','South Georgia or South Sandwich Islands'),
	(728,'SS','SSD','South Sudan','South Sudanese'),
	(724,'ES','ESP','Spain','Spanish'),
	(144,'LK','LKA','Sri Lanka','Sri Lankan'),
	(729,'SD','SDN','Sudan','Sudanese'),
	(740,'SR','SUR','Suriname','Surinamese'),
	(744,'SJ','SJM','Svalbard and Jan Mayen','Svalbard'),
	(748,'SZ','SWZ','Swaziland','Swazi'),
	(752,'SE','SWE','Sweden','Swedish'),
	(756,'CH','CHE','Switzerland','Swiss'),
	(760,'SY','SYR','Syrian Arab Republic','Syrian'),
	(158,'TW','TWN','Taiwan, Province of China','Chinese, Taiwanese'),
	(762,'TJ','TJK','Tajikistan','Tajikistani'),
	(834,'TZ','TZA','Tanzania, United Republic of','Tanzanian'),
	(764,'TH','THA','Thailand','Thai'),
	(626,'TL','TLS','Timor-Leste','Timorese'),
	(768,'TG','TGO','Togo','Togolese'),
	(772,'TK','TKL','Tokelau','Tokelauan'),
	(776,'TO','TON','Tonga','Tongan'),
	(780,'TT','TTO','Trinidad and Tobago','Trinidadian or Tobagonian'),
	(788,'TN','TUN','Tunisia','Tunisian'),
	(792,'TR','TUR','Turkey','Turkish'),
	(795,'TM','TKM','Turkmenistan','Turkmen'),
	(796,'TC','TCA','Turks and Caicos Islands','Turks and Caicos Island'),
	(798,'TV','TUV','Tuvalu','Tuvaluan'),
	(800,'UG','UGA','Uganda','Ugandan'),
	(804,'UA','UKR','Ukraine','Ukrainian'),
	(784,'AE','ARE','United Arab Emirates','Emirati, Emirian, Emiri'),
	(826,'GB','GBR','United Kingdom of Great Britain and Northern Ireland','British, UK'),
	(581,'UM','UMI','United States Minor Outlying Islands','American'),
	(840,'US','USA','United States of America','American'),
	(858,'UY','URY','Uruguay','Uruguayan'),
	(860,'UZ','UZB','Uzbekistan','Uzbekistani, Uzbek'),
	(548,'VU','VUT','Vanuatu','Ni-Vanuatu, Vanuatuan'),
	(862,'VE','VEN','Venezuela (Bolivarian Republic of)','Venezuelan'),
	(704,'VN','VNM','Vietnam','Vietnamese'),
	(92,'VG','VGB','Virgin Islands (British)','British Virgin Island'),
	(850,'VI','VIR','Virgin Islands (U.S.)','U.S. Virgin Island'),
	(876,'WF','WLF','Wallis and Futuna','Wallis and Futuna, Wallisian or Futunan'),
	(732,'EH','ESH','Western Sahara','Sahrawi, Sahrawian, Sahraouian'),
	(887,'YE','YEM','Yemen','Yemeni'),
	(894,'ZM','ZMB','Zambia','Zambian'),
	(716,'ZW','ZWE','Zimbabwe','Zimbabwean');

/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table execuse_condithion
# ------------------------------------------------------------

DROP TABLE IF EXISTS `execuse_condithion`;

CREATE TABLE `execuse_condithion` (
  `execuse_id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` int(11) DEFAULT '0',
  `bootcamp_id` int(11) DEFAULT NULL,
  `execuse_date` date DEFAULT NULL,
  `execuse_reason` varchar(600) DEFAULT NULL,
  `slack_message` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`execuse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

LOCK TABLES `execuse_condithion` WRITE;
/*!40000 ALTER TABLE `execuse_condithion` DISABLE KEYS */;

INSERT INTO `execuse_condithion` (`execuse_id`, `stu_id`, `bootcamp_id`, `execuse_date`, `execuse_reason`, `slack_message`)
VALUES
	(1,2,1,'2017-11-22','Not come','it is ok'),
	(2,2,1,'2017-11-23','Not come','it is ok');

/*!40000 ALTER TABLE `execuse_condithion` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table login
# ------------------------------------------------------------

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `login_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `user_cancel` int(11) DEFAULT '0',
  `user_priv` int(11) DEFAULT '0',
  PRIMARY KEY (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;

INSERT INTO `login` (`login_id`, `full_name`, `email`, `password`, `user_cancel`, `user_priv`)
VALUES
	(1,'Ted','ted@restart.com','1',0,0);

/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sign_in_tabel
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sign_in_tabel`;

CREATE TABLE `sign_in_tabel` (
  `sign_id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` int(11) DEFAULT '0',
  `bootcamp_id` int(11) DEFAULT '0',
  `card_id` varchar(100) DEFAULT NULL,
  `sign_in_date` datetime DEFAULT NULL,
  `sign_alarm` int(11) DEFAULT '0',
  `check_message` varchar(400) DEFAULT NULL,
  `sent_slack` int(11) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sign_id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;

LOCK TABLES `sign_in_tabel` WRITE;
/*!40000 ALTER TABLE `sign_in_tabel` DISABLE KEYS */;

INSERT INTO `sign_in_tabel` (`sign_id`, `stu_id`, `bootcamp_id`, `card_id`, `sign_in_date`, `sign_alarm`, `check_message`, `sent_slack`, `updated_at`)
VALUES
	(113,32,0,'19407323','2017-11-17 16:11:52',1,'Notice Shahrokh Nabavi : You are in cool down period ... *** Restart Network Notification *** ',1,'2017-11-17 16:08:14'),
	(114,44,1,'19409147','2017-11-17 16:11:52',1,'Notice Essu : You are in cool down period ... *** Restart Network Notification *** ',1,'2017-11-17 16:10:01'),
	(115,39,0,'19542283','2017-11-17 16:11:52',1,'Notice Sheril Greg : You are in cool down period ... *** Restart Network Notification *** ',1,'2017-11-17 16:11:54');

/*!40000 ALTER TABLE `sign_in_tabel` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
