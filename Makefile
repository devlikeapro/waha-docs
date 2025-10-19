update-swagger:
	wget http://localhost:3000/-json -O - | jq '.' > ./static/swagger/openapi.json
	git add ./static/swagger/openapi.json

changelog-from-plus:
	@cd ../whatsapp-http-api && \
	base=$$(git merge-base plus HEAD); \
	if [ -z "$$base" ]; then \
		echo "❌ Could not find common base with 'plus'"; \
	else \
		echo "📦 Repository: $$(basename $$PWD)"; \
		echo "🧩 Common base with plus: $$base"; \
		echo; \
		git --no-pager log $$base..HEAD; \
	fi

