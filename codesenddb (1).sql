-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2025 at 11:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `codesenddb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_checked`
--

CREATE TABLE `admin_checked` (
  `admin_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_file1reactjs`
--

CREATE TABLE `course_file1reactjs` (
  `c_id` int(11) NOT NULL,
  `ct_id` int(11) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `ppt` varchar(255) NOT NULL,
  `zipfile` varchar(255) NOT NULL,
  `mysqlTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_table`
--

CREATE TABLE `course_table` (
  `ct_id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `current_event`
--

CREATE TABLE `current_event` (
  `ce_id` int(11) NOT NULL,
  `discription` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `mysqlTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `current_postblog`
--

CREATE TABLE `current_postblog` (
  `cpb_id` int(11) NOT NULL,
  `discription` varchar(255) NOT NULL,
  `blog_img` varchar(255) NOT NULL,
  `blog_date` datetime NOT NULL,
  `mysqlTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recent_post`
--

CREATE TABLE `recent_post` (
  `rp_id` int(11) NOT NULL,
  `discription` varchar(255) NOT NULL,
  `recentPost_img` varchar(255) NOT NULL,
  `recent_blog_date` datetime NOT NULL,
  `mysqlTIme` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_reg`
--

CREATE TABLE `user_reg` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `gender` varchar(200) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(200) NOT NULL,
  `mysqlTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_reg`
--

INSERT INTO `user_reg` (`user_id`, `name`, `lname`, `gender`, `contact`, `address`, `state`, `city`, `email`, `password`, `image`, `mysqlTime`) VALUES
(22, 'Sumit', 'Choudhary', 'male', '8839105627', '617 New Gori Nagar', 'Madhya Pradesh', 'Indore', 'sjaaat662006@gmail.com', '22002200', 'groot-eyu0znclsfx37s76.jpg', '2025-05-06 09:29:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_checked`
--
ALTER TABLE `admin_checked`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `course_file1reactjs`
--
ALTER TABLE `course_file1reactjs`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `course_table`
--
ALTER TABLE `course_table`
  ADD PRIMARY KEY (`ct_id`);

--
-- Indexes for table `current_event`
--
ALTER TABLE `current_event`
  ADD PRIMARY KEY (`ce_id`);

--
-- Indexes for table `current_postblog`
--
ALTER TABLE `current_postblog`
  ADD PRIMARY KEY (`cpb_id`);

--
-- Indexes for table `recent_post`
--
ALTER TABLE `recent_post`
  ADD PRIMARY KEY (`rp_id`);

--
-- Indexes for table `user_reg`
--
ALTER TABLE `user_reg`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_checked`
--
ALTER TABLE `admin_checked`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course_file1reactjs`
--
ALTER TABLE `course_file1reactjs`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `course_table`
--
ALTER TABLE `course_table`
  MODIFY `ct_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `current_event`
--
ALTER TABLE `current_event`
  MODIFY `ce_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `current_postblog`
--
ALTER TABLE `current_postblog`
  MODIFY `cpb_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `recent_post`
--
ALTER TABLE `recent_post`
  MODIFY `rp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_reg`
--
ALTER TABLE `user_reg`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
