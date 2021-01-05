<%@ Language = "VBScript" %>
<%
Dim username
username = request.ServerVariables("AUTH_USER")
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>ASP Test</title>
	</head>
	<body>
		<h1>Test</h1>
	<p>Hello <% =username %>.</p>
	</body>
</html>

