CREATE TABLE IF NOT EXISTS `jhi_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `file_uri` varchar(255) DEFAULT NULL,
  `file_status` varchar(255) DEFAULT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_file_uri` (`file_uri`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
