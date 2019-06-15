#!/bin/bash -e
file="$1"
GIT_COMMIT="$2"
GIT_PREV_COMMIT="$3"

trigger_build="false"
detect_changed() {
  folders=`git diff --name-only $GIT_COMMIT $GIT_PREV_COMMIT | sort -u | uniq`
  export tochanged="${folders}"
}

run_tests() {
  for component in $tochanged; do
    if echo $component | grep -q $file; then
      trigger_build="true"
      break 3
    fi
  done
}

detect_changed

echo $trigger_build
