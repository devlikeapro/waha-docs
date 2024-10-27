#!/bin/bash

# Set source and output file
SOURCE_DIR="content"
OUTPUT_FILE="$HOME/Downloads/chatgpt/waha.md"

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

echo "All .md files combined into $OUTPUT_FILE with separators."
