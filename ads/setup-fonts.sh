#!/usr/bin/env bash
# Installs the two Google-hosted faces the creatives render with.
# Cormorant Garamond stands in for The Seasons (commercial licence).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p fonts && cd fonts
for spec in "Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400" \
            "Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600"; do
  curl -s -A "Mozilla/5.0" "https://fonts.googleapis.com/css2?family=${spec}&display=swap" \
    -o "css_${spec%%:*}.css"
done
grep -ohE 'https://fonts.gstatic.com/[^)]+\.ttf' ./*.css | sort -u > urls.txt
i=0; while read -r u; do i=$((i+1)); curl -s "$u" -o "f_$i.ttf"; done < urls.txt
mkdir -p ~/.fonts && cp ./*.ttf ~/.fonts/ && fc-cache -f >/dev/null
echo "installed $(ls -1 ./*.ttf | wc -l) font files"
