#!c:\perl\bin\perl.exe

my $cmd = "dir *.shtml /b";

my $output = `$cmd`;

#my @output = ($output =~ /(.*?\.shtml)/isg);

$output = "<div id=\"leftMenu\">\n\t<ul>\n";
#foreach sort (@output) {
#	$output .= "\t\t<li><a href=\"$_\">$_</a></li>\n";
#}
$output .= "\t</ul>\n</div>\n";
print $output;
