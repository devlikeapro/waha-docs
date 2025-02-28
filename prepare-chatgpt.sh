#!/bin/bash

# Set source and output file
SOURCE_DIR="content"
OUTPUT_DIR="$HOME/Downloads/chatgpt"
OUTPUT_FILE="$OUTPUT_DIR/waha.md"

# Create or clear the output file
rm -f "$OUTPUT_FILE"
touch "$OUTPUT_FILE"

# Find all .md files in the source directory and combine them
find "$SOURCE_DIR" -type f -name "*.md" | while read -r file; do
  # Append the content of the file to the output file
  cat "$file" >> "$OUTPUT_FILE"

  # Append the separator
  echo -e "\n-------\n" >> "$OUTPUT_FILE"
done

cp -f static/swagger/openapi.json "$OUTPUT_DIR/openapi.json"

echo "All .md files combined into $OUTPUT_FILE with separators."
echo "openapi.json copied to $OUTPUT_DIR/openapi.json"
