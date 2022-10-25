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

