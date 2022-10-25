# ticr
Thread instruction counter tool

## Requirements

* A Linux machine. A virtual one (e.g. from Digital Ocean or AWS) may not work
* A Chrome version that supports thread instruction counting. One that is known to work is v101 available here:
https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F982481%2Fchrome-linux.zip?alt=media
* Running `echo 1 | sudo tee /proc/sys/kernel/perf_event_paranoid`

## Installation

You can run the tool with `npx` like:

```
$ npx ticr -h
```

Or you can install and run it like:

```
$ npm i ticr -g
$ ticr -h
```

The installation will come with a Chrome version bundled with Puppeteer. It may not support instruction counting. To test the support for thread instruction counting, run:

```
$ ticr support
```

To run the tool with your known-to-work version of Chrome (e.g. v101) pass the path of the chrome executable:

```
$ ticr --chrome ~/chromium/982481/chrome-linux/chrome support
`ticount` is supported
```

## Features at a glance

```
$ ticr -h
Usage: ticr [options] [command]

CLI for thread instruction counting

Options:
  -V, --version         output the version number
  -m, --marker <char>   marker to look for in the trace file (default: "testmarker")
  -t, --trace <char>    name/path to write the trace file (default: "trace.json")
  -u, --url <char>      URL of a test page (default:
                        "file:///home/s/.npm/_npx/858494ef2099568b/node_modules/ticr/examples/sandbox.html")
  --chrome <char>       path to the Chrome executable
  --runs <int>          How many times to run the test. Each run closes and opens the browser again (default: 3)
  --report-runs <char>  Options: lowest, median, all. (default: "lowest")
  -o, --options         Dump the program options (default: false)
  -h, --help            display help for command

Commands:
  ab <a.js> <b.js>      Run an A/B test by providing URLs to test page (--url option), an a.js and a b.js
                        JavaScript files
  sandbox               Print out the contents of a sandbox.html to toy with. Example use: `ticr sandbox >
                        sandbox.html`
  support               Tests if `ticount` is supported by the browser
  results               Parses a trace.json to show results
```

The rest of this document omits the `--chrome` option but you'll most likely needed it as shown above
