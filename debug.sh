# A shell script to run `tsc -b .`, and if there are any errors, use `code` to open the file that contains the error.

export PATH="$PATH:$PWD/node_modules/.bin"

tsc -b . > /tmp/tsc.log

# tsc.log contains the error message like this:
# packages/listbox/src/listbox-item.types.ts(1,10): error TS2305: Module '"@aria-ui/core"' has no exported member 'defineProps'.
# packages/listbox/src/listbox-item.element.gen.ts(4,10): error TS2305: Module '"./listbox-item.types"' has no exported member 'listboxItemEvents'.
# packages/listbox/src/listbox-item.element.gen.ts(4,52): error TS2305: Module '"./listbox-item.types"' has no exported member 'ListboxItemEvents'.

# We can extract the file name from the error message.

if [ $? -ne 0 ]; then
    grep "error" /tmp/tsc.log | cut -d '(' -f 1 | sort | uniq | head -n 4 | xargs code
fi
