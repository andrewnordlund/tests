<%@ Language = "VBScript" %>
<%
Dim username, userFile, mydoc, serverFile, dirPrefix
username = request.ServerVariables("AUTH_USER")
username = replace(username, "HRDC-DRHC\", "")
dirPrefix = "/tests/sin-cis/"
userFile = dirPrefix & "xml/users.xml"

set userDoc = Server.CreateObject("Microsoft.XMLDOM")
userDoc.async=false
serverFile = Server.mapPath(userFile)
userDoc.load(serverFile)

'If (userDoc.FileExists(userFile))=false Then
'	set file = userDoc.OpenTextFile(userFile,8,true)
'	file.WriteLine("<?xml version=""1.0"" encoding=""utf-8""?>\n<users>\n</users>")
'	file.close
'End If

'mydoc = new XmlDocument()
'mydoc.load(Server.MapPath("xml/users.xml"))


%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>ASP Test</title>
	</head>
	<body>
		<h1>Test</h1>
	<p>Hello <% =username %>.</p>
	<div id="userListDiv">
<ol id="userList">
<%
dim user
for Each user in userDoc.documentElement.selectNodes("user")
	Response.Write "<li>" & user.getAttribute("fname") & " " & user.getAttribute("lname") & " (" & user.getAttribute("uname")
	if (user.getAttribute("admin") = "t") then Response.write(" Admin")
	'end if
	if (user.getAttribute("programmer") = "t") then Response.write(" Programmer")
	Response.Write ")</li>"
Next
%>
</ol>
	</div>
	</body>
</html>

