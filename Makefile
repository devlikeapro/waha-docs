update-swagger:
	wget http://localhost:3000/-json -O - | jq '.' > ./static/swagger/openapi.json
	git add ./static/swagger/openapi.json
