## About

server.rb implements a static file web server
by using the fast performing Ruby web server
[Puma](https://github.com/puma/puma)
and a small
[Rack](https://github.com/rack/rack)
application.

## Examples

### Server.for_dir

The `Server.for_dir` method returns a Server instance
that serves the contents of a directory. `Server#start` spawns
a new thread to listen for requests, and afterwards returns
the thread. `Thread#join` can block execution at that point,
or execution can continue as normal by not calling `Thread#join`:

```ruby
require "server"

##
# Create a Server instance for the contents of a directory
server = Server.for_dir("./build/website/")

##
# Start listening for connections
thr = server.start

##
# Prevent the main thread from exiting
thr.join
```

## License

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/).
<br>
See [LICENSE](./LICENSE).
