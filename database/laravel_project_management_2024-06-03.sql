# ************************************************************
# Sequel Ace SQL dump
# Version 20067
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 5.7.39)
# Database: laravel_project_management
# Generation Time: 2024-06-02 18:25:18 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table cache
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cache`;

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table cache_locks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cache_locks`;

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table clients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clients_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;

INSERT INTO `clients` (`id`, `name`, `email`, `city`, `state`, `zip`, `country`, `telephone`, `address`, `created_at`, `updated_at`)
VALUES
	(1,'RO-NY','david@ro-ny.com','New York','NY','10002','United States','2122132442','57 Orchard Street, NY','2024-06-02 16:16:33','2024-06-02 16:16:33'),
	(2,'Dylan Morra','dylan@vagajobs.com','Alaska','AL',NULL,'United States',NULL,NULL,'2024-06-02 16:17:02','2024-06-02 16:17:02'),
	(3,'Wali Ullah Akhund','wali@yahoo.com',NULL,NULL,NULL,'Austria','+436602262916',NULL,'2024-06-02 16:18:04','2024-06-02 16:18:04'),
	(4,'Carlos Molina','monorph@gmail.com','Florida','FL',NULL,NULL,'+1 (954) 253-2883',NULL,'2024-06-02 16:19:09','2024-06-02 16:19:09');

/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table failed_jobs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table invoice_items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `invoice_items`;

CREATE TABLE `invoice_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint(20) unsigned NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` decimal(8,2) NOT NULL DEFAULT '0.00',
  `rate` decimal(8,2) NOT NULL DEFAULT '0.00',
  `amount` decimal(8,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_items_invoice_id_foreign` (`invoice_id`),
  CONSTRAINT `invoice_items_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `invoice_items` WRITE;
/*!40000 ALTER TABLE `invoice_items` DISABLE KEYS */;

INSERT INTO `invoice_items` (`id`, `invoice_id`, `description`, `quantity`, `rate`, `amount`, `created_at`, `updated_at`)
VALUES
	(141,3,'Fixed an issue that will update expire date when customer renew their account',2.00,20.00,40.00,'2024-06-02 17:33:46','2024-06-02 17:33:46'),
	(142,3,'Disable coupon apply on subscription renew (auto or manual)',2.00,20.00,40.00,'2024-06-02 17:33:46','2024-06-02 17:33:46'),
	(143,1,'Disable manual type on dob text field',1.00,15.00,15.00,'2024-06-02 18:18:11','2024-06-02 18:18:11'),
	(144,1,'Error Log and notification capture for request and response',2.50,15.00,37.50,'2024-06-02 18:18:11','2024-06-02 18:18:11'),
	(145,1,'Clone thehrtclub.com to a new instance',3.00,15.00,45.00,'2024-06-02 18:18:11','2024-06-02 18:18:11'),
	(146,1,'Put age restriction on join the club page, do not allow to register if age is less than 18',1.50,15.00,22.50,'2024-06-02 18:18:11','2024-06-02 18:18:11'),
	(147,2,'Attorney simple bill - LOP Billing project',17.00,15.00,255.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(148,2,'Notification email - Placeholder variable not working',1.00,1.08,1.08,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(149,2,'LOP billing - Treating section',21.50,15.00,322.50,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(150,2,'No show report - Review video',0.00,0.00,0.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(151,2,'FOR pip and Lop change the \"Revised invoice\" to \"Current invoice\"',1.00,15.00,15.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(152,2,'Sandbox - scheduling solution for separating locations AMDB&M and AMD INC',1.50,15.00,22.50,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(153,2,'Baa upload - Attorney portal',7.00,15.00,105.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(154,2,'Spencer report - create a column that shows all in \"archive and all that are open\"',1.00,15.00,15.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(155,2,'Lop billing projet - scheduling',26.00,15.00,390.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(156,2,'Glitch with location - see video',0.00,0.00,0.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(157,2,'Attorney Portal Issues',4.50,15.00,67.50,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(158,2,'LOP scheduling notifications ( email and Sms ) mapping',1.25,15.00,18.75,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(159,2,'NO show report -  see video',2.75,15.00,41.25,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(160,2,'CarbonCopy all the notifications that goes to attorneys - see video',3.34,15.00,50.10,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(161,2,'Updating patient firms - please see video',5.34,15.00,80.10,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(162,2,'Internal mistake - please delete encounter one',0.00,0.00,0.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(163,2,'LOP Glitch Bill',0.00,0.00,0.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(164,2,'Email option in the scheduling box for PIP and LOP',3.00,15.00,45.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(165,2,'Login field placeholder',7.00,1.00,7.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(166,2,'Adding an email for PIP patients - see video',0.00,0.00,0.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(167,2,'Drop cases project',35.59,15.00,533.85,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(168,2,'Company Attorney issue!',0.00,0.00,0.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(169,2,'Users under attorneys',0.00,0.00,0.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(170,2,'Drop cases - something that can tag a patient that we already looked for the email and does not have an email -see video',1.25,15.00,18.75,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(171,2,'Ability to select which patient will receive drop case notification',4.50,15.00,67.50,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(172,2,'LOP Services',23.00,15.00,345.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(173,2,'THIS IS URGENT - Please watch the video and see if can add something for us to change the provider on bill for LOP patients',2.00,15.00,30.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(174,2,'Glitch with a lop charge on ready to fund folder',0.00,0.00,0.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(175,2,'LOP billing error - is not adding up correctly',0.00,0.00,0.00,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(176,2,'Hide LOP services that we are able to free type.',0.67,15.00,10.05,'2024-06-02 18:24:00','2024-06-02 18:24:00'),
	(177,2,'HCFA Mapping',20.89,15.00,313.35,'2024-06-02 18:24:00','2024-06-02 18:24:00');

/*!40000 ALTER TABLE `invoice_items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table invoices
# ------------------------------------------------------------

DROP TABLE IF EXISTS `invoices`;

CREATE TABLE `invoices` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `from` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ship_to` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date NOT NULL,
  `payment_terms` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `invoice_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax` decimal(8,2) DEFAULT NULL,
  `discount` decimal(8,2) DEFAULT NULL,
  `shipping` decimal(8,2) DEFAULT NULL,
  `amount_paid` decimal(8,2) NOT NULL DEFAULT '0.00',
  `balance_due` decimal(8,2) DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `terms` text COLLATE utf8mb4_unicode_ci,
  `invoice_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;

INSERT INTO `invoices` (`id`, `from`, `to`, `ship_to`, `date`, `payment_terms`, `due_date`, `invoice_number`, `tax`, `discount`, `shipping`, `amount_paid`, `balance_due`, `notes`, `terms`, `invoice_status`, `created_at`, `updated_at`)
VALUES
	(1,'Quantiklab','RO-NY',NULL,'2024-06-02',NULL,'2024-06-13','INV-RO-06022024',NULL,NULL,NULL,0.00,120.00,'This invoice is still in progress',NULL,'pending','2024-06-02 16:21:11','2024-06-02 18:18:11'),
	(2,'QuantikLab','Carlos Molina',NULL,'2024-06-01',NULL,'2024-06-04','INV-CRM-02062024',NULL,NULL,NULL,0.00,2754.28,NULL,NULL,'pending','2024-06-02 16:31:42','2024-06-02 18:24:00'),
	(3,'QuantikLab','Vagajobs',NULL,'2024-06-02',NULL,NULL,'VG-INV-06022024',NULL,NULL,NULL,0.00,80.00,NULL,NULL,'pending','2024-06-02 17:33:46','2024-06-02 17:33:46');

/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table job_batches
# ------------------------------------------------------------

DROP TABLE IF EXISTS `job_batches`;

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table jobs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `jobs`;

CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;

INSERT INTO `migrations` (`id`, `migration`, `batch`)
VALUES
	(1,'0001_01_01_000000_create_users_table',1),
	(2,'0001_01_01_000001_create_cache_table',1),
	(3,'0001_01_01_000002_create_jobs_table',1),
	(4,'2024_05_06_131908_create_projects_table',1),
	(5,'2024_05_06_131954_create_tasks_table',1),
	(6,'2024_05_20_141209_create_permission_tables',1),
	(7,'2024_05_22_122337_create_options_table',1),
	(8,'2024_05_28_193634_create_replies_table',1),
	(9,'2024_05_31_205213_create_clients_table',1),
	(10,'2024_05_31_210531_add_client_id_to_projects_table',1),
	(11,'2024_06_02_002540_create_invoices_table',1),
	(12,'2024_06_02_002559_create_invoice_items_table',1),
	(13,'2024_06_02_035835_add_invoice_status_to_invoices_table',1);

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table model_has_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `model_has_permissions`;

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table model_has_roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `model_has_roles`;

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`)
VALUES
	(1,'App\\Models\\User',1);

/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table options
# ------------------------------------------------------------

DROP TABLE IF EXISTS `options`;

CREATE TABLE `options` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table password_reset_tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `password_reset_tokens`;

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`)
VALUES
	(1,'manage_users','web','2024-06-02 15:19:41','2024-06-02 15:19:41'),
	(2,'manage_projects','web','2024-06-02 15:19:41','2024-06-02 15:19:41'),
	(3,'manage_tasks','web','2024-06-02 15:19:41','2024-06-02 15:19:41'),
	(4,'manage_invoice','web','2024-06-02 15:19:41','2024-06-02 15:19:41'),
	(5,'manage_clients','web','2024-06-02 15:19:41','2024-06-02 15:19:41'),
	(6,'manage_settings','web','2024-06-02 15:19:41','2024-06-02 15:19:41');

/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table projects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `due_date` timestamp NULL DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_created_by_foreign` (`created_by`),
  KEY `projects_updated_by_foreign` (`updated_by`),
  KEY `projects_client_id_foreign` (`client_id`),
  CONSTRAINT `projects_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL,
  CONSTRAINT `projects_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `projects_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;

INSERT INTO `projects` (`id`, `client_id`, `name`, `description`, `due_date`, `status`, `image_path`, `created_by`, `updated_by`, `created_at`, `updated_at`)
VALUES
	(1,4,'INJURY CRM','A custom injury data management system',NULL,'in_progress',NULL,1,1,'2024-06-02 16:53:40','2024-06-02 16:53:40'),
	(2,2,'VAGAJOBS','Vagajobs job board',NULL,'in_progress',NULL,1,1,'2024-06-02 17:22:24','2024-06-02 17:22:24'),
	(3,1,'THE HRTCLUB','Official https://thehrtclub.com project.',NULL,'in_progress',NULL,1,1,'2024-06-02 18:14:43','2024-06-02 18:14:43');

/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table replies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `replies`;

CREATE TABLE `replies` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `reply` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachment_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `replied_by` bigint(20) unsigned NOT NULL,
  `task_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `replies_replied_by_foreign` (`replied_by`),
  KEY `replies_task_id_foreign` (`task_id`),
  CONSTRAINT `replies_replied_by_foreign` FOREIGN KEY (`replied_by`) REFERENCES `users` (`id`),
  CONSTRAINT `replies_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;

INSERT INTO `replies` (`id`, `reply`, `attachment_path`, `replied_by`, `task_id`, `created_at`, `updated_at`)
VALUES
	(1,'Added code snippet to filter the validity of a coupon and determines if the current order is a subscription renewal. If it is, the coupon is invalidated.',NULL,1,1,'2024-06-02 17:24:54','2024-06-02 17:24:54'),
	(2,'Work is done, but haven\'t uploaded files on live server yet. Will only upload once confirmed.','reply_attachments/ulWD0XTqmgV9ttWX4p1gMPfPxZISQqxaPSUyIFnf.png',1,3,'2024-06-02 18:16:59','2024-06-02 18:16:59'),
	(3,'Cloned on http://3.130.223.58 \nwp-admin login: administrator / db)dmj0B%f8)$)JLKT$C5RqD',NULL,1,4,'2024-06-02 18:21:27','2024-06-02 18:21:27');

/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table role_has_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role_has_permissions`;

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`)
VALUES
	(1,1),
	(2,1),
	(3,1),
	(4,1),
	(5,1),
	(6,1),
	(3,2);

/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`)
VALUES
	(1,'admin','web','2024-06-02 15:19:41','2024-06-02 15:19:41'),
	(2,'standard','web','2024-06-02 15:19:41','2024-06-02 15:19:41');

/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`)
VALUES
	('XpGNhFtjhDs9p1EbJpzFksg3mGtOcCGYasvAtxYM',1,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiVG05VWRTcTNyRTBlYlYxd3VCNEdLdWEzMVY1N1lXODNEOExZVW9iSSI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjMxOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvcHJvamVjdC8xIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9',1717352670);

/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tasks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `attachment_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estimated_time` decimal(8,2) DEFAULT NULL,
  `assigned_user_id` bigint(20) unsigned NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  `project_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tasks_assigned_user_id_foreign` (`assigned_user_id`),
  KEY `tasks_created_by_foreign` (`created_by`),
  KEY `tasks_updated_by_foreign` (`updated_by`),
  KEY `tasks_project_id_foreign` (`project_id`),
  CONSTRAINT `tasks_assigned_user_id_foreign` FOREIGN KEY (`assigned_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `tasks_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;

INSERT INTO `tasks` (`id`, `name`, `description`, `attachment_path`, `status`, `priority`, `due_date`, `estimated_time`, `assigned_user_id`, `created_by`, `updated_by`, `project_id`, `created_at`, `updated_at`)
VALUES
	(1,'Do not apply coupon on subscription renew','After an employer uses a discount code…if they resubscribe (either manually or auto), i believe the discounted price is still the one being charged\nCan we make it so if an employer is on auto renew, it does not keep duplicating the promo code?',NULL,'completed','medium',NULL,2.00,1,1,1,2,'2024-06-02 17:23:52','2024-06-02 17:23:52'),
	(2,'Sync expire date when customer renew the subscription','Fixed an issue that will update expire date when customer renew their account.',NULL,'completed','high','2024-06-01',2.00,1,1,1,2,'2024-06-02 17:31:26','2024-06-02 17:31:26'),
	(3,'Put age restriction','On sign up page, check if the selected DOB is greater than or equal to 18, if not, do not let submit the form.',NULL,'completed','low',NULL,1.50,1,1,1,3,'2024-06-02 18:15:55','2024-06-02 18:15:55'),
	(4,'Clone live site to a new EC2 instance','Clone the live site https://thehrtclub.com to a new EC2 instance with lower config VM.',NULL,'completed','medium',NULL,3.00,1,1,1,3,'2024-06-02 18:20:23','2024-06-02 18:20:23');

/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`)
VALUES
	(1,'Mahmudur Rahman','shibly.phy@gmail.com','2024-06-02 15:19:41','$2y$12$DYqme8UZfAWqEJp7HqXWye5SkHmzo9rLX6feB8jd4VrYxl0TkCDHO','2OwJnDo7sp','2024-06-02 15:19:41','2024-06-02 15:20:06');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
