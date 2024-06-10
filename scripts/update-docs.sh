#!/bin/bash

# Edit these vars at your peril
base_dir=./src/components
output_file="components.md"

echo "# Component Documentation" > "docs/$output_file"
echo -e "<!-- This file is auto-generated from README.md files contained in the components directory, no need to edit this file directly. -->\n" >> "docs/$output_file"

for dir in $base_dir/*/; do
    dir_name=$(basename "$dir")
    dir_normalized=.$dir

    # Check if a README.md file exists in the directory
    if [ -f "$dir/README.md" ]; then
        # If so, write the link to the output file
        echo "- [$dir_name]($dir_normalized/README.md)" >> "docs/$output_file"
    fi
done

# create a commit, only if there are changes
if git diff --quiet docs/$output_file; then
    echo -e "No new component README files detected.\nProceeding with push"
    exit 0
else
    commit_msg="chore(docs): auto-update to component docs"

    echo "New README files detected, committing updated docs/$output_file file..."
    git add docs/$output_file && git commit -m "$commit_msg" --no-verify && echo "Commit finished, proceeding with push"
fi
