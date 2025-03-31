-- -------------------------------------------------------------
-- TablePlus 6.1.6(570)
--
-- https://tableplus.com/
--
-- Database: laravel_project_management
-- Generation Time: 2025-03-31 17:16:03.6330
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `clients`;
CREATE TABLE `clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `invoice_items`;
CREATE TABLE `invoice_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint unsigned NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` decimal(8,2) NOT NULL DEFAULT '1.00',
  `rate` decimal(8,2) NOT NULL DEFAULT '0.00',
  `amount` decimal(8,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_items_invoice_id_foreign` (`invoice_id`),
  CONSTRAINT `invoice_items_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `invoices`;
CREATE TABLE `invoices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint unsigned DEFAULT NULL,
  `from` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  PRIMARY KEY (`id`),
  KEY `invoices_client_id_foreign` (`client_id`),
  CONSTRAINT `invoices_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `model_has_permissions`;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `model_has_roles`;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `options`;
CREATE TABLE `options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `due_date` timestamp NULL DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` bigint unsigned NOT NULL,
  `updated_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_created_by_foreign` (`created_by`),
  KEY `projects_updated_by_foreign` (`updated_by`),
  KEY `projects_client_id_foreign` (`client_id`),
  CONSTRAINT `projects_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL,
  CONSTRAINT `projects_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `projects_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `replies`;
CREATE TABLE `replies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `reply` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachment_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `replied_by` bigint unsigned NOT NULL,
  `task_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `replies_replied_by_foreign` (`replied_by`),
  KEY `replies_task_id_foreign` (`task_id`),
  CONSTRAINT `replies_replied_by_foreign` FOREIGN KEY (`replied_by`) REFERENCES `users` (`id`),
  CONSTRAINT `replies_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `role_has_permissions`;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `attachment_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estimated_time` decimal(8,2) DEFAULT NULL,
  `assigned_user_id` bigint unsigned NOT NULL,
  `created_by` bigint unsigned NOT NULL,
  `updated_by` bigint unsigned NOT NULL,
  `project_id` bigint unsigned NOT NULL,
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

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:8:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:12:\"manage_users\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:15:\"manage_projects\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:12:\"manage_tasks\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:3;a:4:{s:1:\"a\";i:4;s:1:\"b\";s:16:\"manage_own_tasks\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:4;a:4:{s:1:\"a\";i:5;s:1:\"b\";s:15:\"manage_invoices\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:5;a:4:{s:1:\"a\";i:6;s:1:\"b\";s:14:\"manage_clients\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:6;a:4:{s:1:\"a\";i:7;s:1:\"b\";s:15:\"manage_settings\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:7;a:4:{s:1:\"a\";i:8;s:1:\"b\";s:22:\"view_dashboard_widgets\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}}s:5:\"roles\";a:2:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:8:\"standard\";s:1:\"c\";s:3:\"web\";}}}', 1743502350);

INSERT INTO `clients` (`id`, `name`, `email`, `city`, `state`, `zip`, `country`, `telephone`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Dylan Morra', 'team@vagajobs.com', 'Alaska', 'Alaska', '122823', 'United States', '+1 (631) 219-8129', NULL, '2025-03-01 12:07:29', '2025-03-01 12:07:29'),
(2, 'RO NEW YORK', 'david@ro-ny.com', 'NY', NULL, '10027', 'United States', NULL, NULL, '2025-03-31 10:12:28', '2025-03-31 10:12:28');

INSERT INTO `invoice_items` (`id`, `invoice_id`, `description`, `quantity`, `rate`, `amount`, `created_at`, `updated_at`) VALUES
(1, 1, 'Monthly maintenance', 16.00, 12.50, 200.00, '2025-03-01 12:10:46', '2025-03-01 12:10:46'),
(2, 1, 'Add google recaptcha to prevent spam on the pop up modal for both registration type', 4.00, 20.00, 80.00, '2025-03-01 12:10:46', '2025-03-01 12:10:46'),
(3, 1, 'Update layout of job listsing by putting texts on the buttons and show download resume on the first section of the user profile page', 1.00, 20.00, 20.00, '2025-03-01 12:10:46', '2025-03-01 12:10:46'),
(33, 2, 'Portal github research convo', 0.75, 14.99, 11.24, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(34, 2, 'Discussion on tasks and assignments meeting', 1.25, 15.00, 18.75, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(35, 2, 'Task discussion and finalization after CTO meeting with mini orange SSO etc', 1.25, 15.00, 18.75, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(36, 2, 'Working on customizing default woo commerce account pages to match with design comp', 4.75, 15.00, 71.25, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(37, 2, 'Added custom fields of date of birth with date picker and gender on user profile edit and saved the data', 0.50, 15.00, 7.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(38, 2, 'Post update meeting and discussion on next tasks', 0.75, 15.00, 11.25, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(39, 2, 'Disabled the sidebar display on account pages, except for the account dashboard and make the remaining pages full width. Added a shortcode to display the user’s name. Implemented login redirection to /dashboard when user login which will work for mini Orange SSO login as well. Set a default image for the account dashboard page', 4.50, 15.00, 67.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(40, 2, 'Status call and post discussion', 0.50, 15.00, 7.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(41, 2, 'Added dob and gender on personal information, logout now redirects to the homepage. /dashboard page is restricted to authorized users only. Fixed add payment method UI by adding cancel button, removed intermediate page and redirection after adding a payment method', 1.25, 15.00, 18.75, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(42, 2, 'Removed password section from account edit page, removed display name from account edit page and make a way so that if there is no display name, it will be created automatically using first name and last name', 0.75, 15.00, 11.25, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(43, 2, 'added phone number in edit account page and make a link with billing address so that when phone number update from edit account, it will update phone number from billing info', 0.50, 15.00, 7.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(44, 2, 'Hide phone number form edit billing form but retain it upon form submission from user phone meta', 1.50, 15.00, 22.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(45, 2, 'task discussion on Web toffee subscription configuration and replace default Woo Subscription from user dashboard', 0.80, 15.00, 12.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(46, 2, 'Fixed listing payment method and ajaxify payment method delete', 2.00, 15.00, 30.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(47, 2, 'Pulled WooCommerce Subscription data form WebToffee Woo Subscription', 3.50, 15.00, 52.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(48, 2, 'Post update task discussion and planning for next day of tasks', 0.75, 15.00, 11.25, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(49, 2, 'Remove First and Last name from Billing fields Add Single field of \"Name on Card\" (for Stripe) Prefill with First Name and Last Name from profile', 1.50, 15.00, 22.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(50, 2, 'Converted billing address and current subscription into tables', 0.80, 15.00, 12.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(51, 2, 'Prevent remove payment method if there is only one', 1.50, 15.00, 22.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(52, 2, 'Retrieved end date and next payment date in subscription', 1.40, 15.00, 21.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(53, 2, 'Post task update and discussion', 0.75, 15.00, 11.25, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(54, 2, 'Restored first name and last name to billing address and updated logic', 0.50, 15.00, 7.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(55, 2, 'Convert Account Information tables to responsive pivot tables', 3.50, 15.00, 52.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(56, 2, 'Redirect no longer needed WooCommerce intermediary pages', 0.08, 15.00, 1.20, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(57, 2, 'Remove Subscription details from Order Invoice view', 0.50, 15.00, 7.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(58, 2, 'Added Suspend and Reactivate account option to work from Dashboard', 4.80, 15.00, 72.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(59, 2, 'Discussion on next phase of tasks and planning', 0.90, 15.00, 13.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(60, 2, 'Change DOB separated to / instead of (-)', 0.16, 15.00, 2.40, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(61, 2, 'Add 1 additional day to renewal date for accuracy with transactions', 0.08, 15.00, 1.20, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(62, 2, 'Assign member role to user when purchase a subscription (force apply)', 2.25, 15.00, 33.75, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(63, 2, 'Set default role as user when a user is created in WordPress through registration or from a 3rd party api', 0.50, 15.00, 7.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(64, 2, 'Added a cron job that will run every one hour to check active subscribers. If any user who don’t have active subscription , cron will remove member role from the user, and also logged cron job data for future enquiry, so that when cron runs every time, it will log in wp_options table of what changes are made. You can access the cron via this url as well', 9.40, 15.00, 141.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(65, 2, 'Added sidebar navigation to all account inner pages and figured a solution so that when it is /account page clicking the navbar items will not reload the page and move to a specific section.  But if it is any  inner page, it will redirect to the account page then move to that particular section', 3.00, 15.00, 45.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(66, 2, 'Delete saved payment method now refresh the page with a nice sweet alert 2 confirmation. Refresh a particular section is not possible unless using a client side script like reactJS or vue js. So when I delete a saved payment method, I refresh the page instead.', 0.50, 15.00, 7.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(67, 2, 'Web toffee auto renew subscription feature RnD and preparation of technical questions', 2.00, 15.00, 30.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(68, 2, 'Added lead source user meta in account edit', 2.83, 15.00, 42.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(69, 2, 'Added notification message on dashboard after editing and saving account details', 0.80, 15.00, 12.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(70, 2, 'Discussion on next tasks and QnA', 0.90, 15.00, 13.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(71, 2, 'If subscription expired, user should not be able to login to account  bypass logic for admin user', 1.50, 15.00, 22.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(72, 2, 'Disable subscribe button for a user if he is already under an active subscription', 1.50, 15.00, 22.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(73, 2, 'Redirect to checkout page after adding product to cart', 0.50, 15.00, 7.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(74, 2, 'RnD on Mini Orange SSO platform', 4.00, 15.00, 60.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(75, 2, 'Discussion on various tasks and post update meeting', 2.50, 15.00, 37.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(76, 2, 'Change option of Suspend to say Cancel instead', 0.83, 15.00, 12.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(77, 2, 'Upon completion of testing, remove \"status\" from subscription panel', 0.00, 15.00, 0.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(78, 2, 'f subscription expired, any user can still able to login to the system except users without member role will not be able to view /dashboard and /account or any internal /account pages', 0.80, 15.00, 12.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(79, 2, 'Disable subscribe button for user if they are already under an active subscription. Button should still display, but disabled Text can be smaller and under the button centered. Converted as a shortcode name [subscription_button] , you can use that anywhere you want.', 2.00, 15.00, 30.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(80, 2, 'Discussion on various tasks and post update meeting', 0.97, 15.00, 14.55, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(81, 2, 'Remove limitation on WebToffee suspend / unsuspend limitation', 4.30, 15.00, 64.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(82, 2, 'For shortcode, show the disabled purchase button by default (dont hide)', 0.00, 15.00, 0.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(83, 2, 'If account expired, give option to add subscription to cart from account dashboard . Done. Also updated shortcode to pass link as a parameter to render the button as link, ex: [subscription_button type=\"link\"] this is how you need to render as link, if you need to render as button then just use [subscription_button]', 1.50, 15.00, 22.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(84, 2, 'Rework the Member role only access to dashboard and account pages(Users would still need to get to these pages based on above logic) - User role and member role can access those pages now', 0.00, 15.00, 0.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(85, 2, 'Post update discussion and planning for next set of tasks', 1.70, 15.00, 25.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(86, 2, 'Discussion and reviewing tasks, stripe test account and mini orange integration', 1.27, 15.00, 19.05, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(87, 2, 'Configured 3rd party stripe plugin and pushed cognito sub ID meta data to payment information', 4.00, 15.00, 60.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(88, 2, 'Task discussion and mini orange plugin configuration for AWS cognito', 2.30, 15.00, 34.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(89, 2, 'Research on various topics on mini orange, managed to map cognito_sub_id and role and updated code on role based redirection', 5.50, 15.00, 82.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(90, 2, 'Updated short code so that if a guest user clicks the button it will redirect them to the amazon cognito registration page, also show a message under the button if the user has already a subscription but do not show the message if button type is link', 1.00, 15.00, 15.00, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(91, 2, 'Updated redirection logic so that it sends a registered user to the checkout page after adding the product to cart , if the user is a fresh user and has no subscription, otherwise it will push the user to the /dashboard page', 6.30, 15.00, 94.50, '2025-03-31 11:13:41', '2025-03-31 11:13:41'),
(92, 2, 'Completely hide contact information section for logged in user but let WooCommerce use the information in the background', 2.25, 15.00, 33.75, '2025-03-31 11:13:41', '2025-03-31 11:13:41');

INSERT INTO `invoices` (`id`, `client_id`, `from`, `ship_to`, `date`, `payment_terms`, `due_date`, `invoice_number`, `tax`, `discount`, `shipping`, `amount_paid`, `balance_due`, `notes`, `terms`, `invoice_status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Quantiklab', NULL, '2025-03-01', NULL, NULL, 'INV01032025', NULL, NULL, NULL, 0.00, 300.00, NULL, NULL, 'pending', '2025-03-01 12:10:46', '2025-03-01 12:10:46'),
(2, 2, 'Quantiklab', NULL, '2025-04-01', NULL, NULL, 'INV04012025', NULL, NULL, NULL, 0.00, 1630.13, NULL, NULL, 'pending', '2025-03-31 10:54:26', '2025-03-31 11:13:41');

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_05_06_131908_create_projects_table', 1),
(5, '2024_05_06_131954_create_tasks_table', 1),
(6, '2024_05_20_141209_create_permission_tables', 1),
(7, '2024_05_22_122337_create_options_table', 1),
(8, '2024_05_28_193634_create_replies_table', 1),
(9, '2024_05_31_205213_create_clients_table', 1),
(10, '2024_05_31_210531_add_client_id_to_projects_table', 1),
(11, '2024_06_02_002540_create_invoices_table', 1),
(12, '2024_06_02_002559_create_invoice_items_table', 1),
(13, '2024_06_02_035835_add_invoice_status_to_invoices_table', 1);

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2);

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'manage_users', 'web', '2025-03-01 12:06:00', '2025-03-01 12:06:00'),
(2, 'manage_projects', 'web', '2025-03-01 12:06:00', '2025-03-01 12:06:00'),
(3, 'manage_tasks', 'web', '2025-03-01 12:06:00', '2025-03-01 12:06:00'),
(4, 'manage_own_tasks', 'web', '2025-03-01 12:06:00', '2025-03-01 12:06:00'),
(5, 'manage_invoices', 'web', '2025-03-01 12:06:00', '2025-03-01 12:06:00'),
(6, 'manage_clients', 'web', '2025-03-01 12:06:00', '2025-03-01 12:06:00'),
(7, 'manage_settings', 'web', '2025-03-01 12:06:01', '2025-03-01 12:06:01'),
(8, 'view_dashboard_widgets', 'web', '2025-03-01 12:06:01', '2025-03-01 12:06:01');

INSERT INTO `projects` (`id`, `client_id`, `name`, `description`, `due_date`, `status`, `image_path`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'Vagajobs', '<p>Vagajobs update and monthly maintenance</p>', NULL, 'in_progress', NULL, 1, 1, '2025-03-01 12:08:03', '2025-03-01 12:08:03'),
(2, 2, 'THE HRT CLUB', '<p>THE HRT CLUB on going development</p>', NULL, 'in_progress', NULL, 1, 1, '2025-03-31 10:12:54', '2025-03-31 10:12:54');

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(3, 2),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1);

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-03-01 12:06:00', '2025-03-01 12:06:00'),
(2, 'standard', 'web', '2025-03-01 12:06:00', '2025-03-01 12:06:00');

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('s7XvK8LYWVZUbSjjL9sdwmPzgUB3w1QOwvTH2KvK', 1, '192.168.65.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiSGZDVmJZZ2JxSGloN29tSEtiTmtzM2ZCUkZZcFVTUFZ6eFhhTlNQWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly9sb2NhbGhvc3QvaW52b2ljZS8yL2VkaXQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YTowOnt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1743419640);

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Mahmudur Rahman', 'shibly.phy@gmail.com', '2025-03-01 12:06:01', '$2y$12$T7/nXqN/GfScuLqXHOEVbOhllD4AxpeKWltX9pd2oN1eS/ptL0xZi', NULL, '2025-03-01 12:06:01', '2025-03-01 12:06:43'),
(2, 'James Anik', 'james_anik@yahoo.com', '2025-03-01 12:06:01', '$2y$12$OcbL2UL8yzVN/0OBHMvv2.6ttECHN/xeVqT8339LSg8AvS7OKWG5.', NULL, '2025-03-01 12:06:01', '2025-03-01 12:06:01');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;