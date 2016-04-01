# Get the last 50 log entries.
#
# This script requires a header file which includes the JWT token.
# Learn more on how to setup header files for use with CURL at:
# http://docs-api.kirtan.io/index.html?md=pages_curl.md
#
# Change permissions to allow owner to execute
# chmod 744 logs-last-50.command

echo ""
echo "========================================================="
echo "Requires: server address"
echo "Must include the port if not 443."
echo "Examples: api.kirtan.io, localhost:8081"
echo ""
echo "Requires: header file"
echo "This script executes from your home directory just"
echo "enter the file name otherwise enter the full path."
echo "Example: header-stage.txt (default)"
echo "Example: /Users/[user]]/Development/header-stage.txt"
echo "========================================================="
echo ""

addressdefault=api.kirtan.io
read -p "Enter server address (default: $addressdefault), followed by [ENTER]:" input
address=${input:-$addressdefault}
echo $address
echo ""

default=header-stage.txt
read -p "Enter header filename/path (default: $default), followed by [ENTER]:" input
header=${input:-$default}
echo $header
headerfile=$(<$header)
echo ""

limitdefault=50
read -p "Enter max records (default: $limitdefault), followed by [ENTER]:" input
limit=${input:-$limitdefault}
echo $limit
echo ""

skipdefault=0
read -p "Enter records to skip (default: $skipdefault), followed by [ENTER]:" input
skip=${input:-$skipdefault}
echo $skip
echo ""

echo "++++++++++++++++++s++++++++++++"
echo ""


curl -k -v \
-H "$headerfile"  \
"https://$address/logs?limit=$limit&skip=$skip&order=asc" \
| python -mjson.tool

read -p "Press enter to close"
