-- <pre class="line-numbers language-sql">
-- <code class="language-sql">
-- --
-- Database: `login`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

USE login;

CREATE TABLE `user_login` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_session_id` varchar(100) NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`user_id`, `user_email`, `user_password`, `user_session_id`) VALUES
(1, 'test@test.com', 'testtest'),
(2, 'test2@test2.com', 'testtest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- </code>
-- </pre>

-- <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/prism.js" type="text/javascript"></script>
-- <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.css" rel="stylesheet" type="text/css"/>