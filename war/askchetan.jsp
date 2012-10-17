<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="com.google.appengine.api.datastore.DatastoreServiceFactory" %>
<%@ page import="com.google.appengine.api.datastore.DatastoreService" %>
<%@ page import="com.google.appengine.api.datastore.Query" %>
<%@ page import="com.google.appengine.api.datastore.Entity" %>
<%@ page import="com.google.appengine.api.datastore.FetchOptions" %>
<%@ page import="com.google.appengine.api.datastore.Key" %>
<%@ page import="com.google.appengine.api.datastore.KeyFactory" %>


<html>
	<head>
		<title>AskChetan.com</title>
		<link href="bootstrap/css/bootstrap.min.css" media="screen" rel="stylesheet" type="text/css" />
		<link href="stylesheets/main.css" media="screen" rel="stylesheet" type="text/css" />
		<script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
		<script type="text/javascript" src="js/chetan.js"></script>
	</head>

	<body class="logged-out">
		<div class="container">
			<div class="header">
				<a href="/" class="brand"><img src="images/askChetan.png" alt="AskChetan" /></a>
			</div>
			<div class="content">
				<div class="content-inner">
					<h1 class="pump-up">Have a question? Ask Chetan...<br> <strong>Bam, it's that easy.</strong></h1>
					<div class="full-search-bar">
						<ul class="item-stream unstyled search-input-stream">
							<li class="stream-item stream-header search-input-item">
								<form class="form-inline search-form" action="">
									<input class="xlarge" class="question-search" id="question_search" name="q" type="text" placeholder="Do we have a plugin for..?, YUI Compressor?!?, and more..." autocomplete="off" value="" />
									<button class="btn btn-large btn-inverse" id="question_submit" type="submit"><i class="icon-search icon-white"></i></button>
								</form>
							</li>
						</ul>
					</div>
				</div>
				<div class="quote-holder">
					<span class="dixit">&ldquo; <span id="phrase"></span> &rdquo; - Chetan dixit</span>
				</div>
			</div>
			<div class="footer">
				<ul>
					<li><a href="#">About</a></li>
					<li><a href="#">FAQ</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
				<p>&#169; MArge. Made with <a target="_blank" href="http://getbootstrap.com">Bootstrap</a> (and love).</p>
			</div>
		</div>

		<script type="text/javascript">
			var chetan = new Chetan();
			document.getElementById('phrase').textContent = chetan.ask("");
		</script>
	</body>
</html>
