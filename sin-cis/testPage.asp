<%@ Language = "VBScript" %>
<%
' To turn on authentication:
' Enable Windows authentication IIS.
' If your IIS installation does not contain Windows Authentication by default, you need to install it:

'   Go to Control Panel -> Programs and Features -> Turn windows features on or off.
'   Expand Internet Information Services -> World Wide Web Services.
'   Under Security, select the Windows Authentication check box.
'   Click OK to finish the configuration.
' 	Quit IIS Manager and restart it
'	Now you should be able to get it.


'Windows Authentication appears as an option in IIS website authentication settings.

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

