#!/usr/bin/env python

import os, socket, sys, time

os.chdir(os.environ['SALVUS_ROOT'])

def cmd(s):
    print s
    os.system(s)

def hub(command, server_id):
    cmd("/home/salvus/salvus/salvus/hub {command} {args} ".format(command=command, args=hub_args(server_id)))

def hub_args(server_id):
    port = 5000 + 2*int(server_id)
    proxy_port = port + 1
    logpath = "%s/logs"%os.environ['HOME']
    pidpath = "%s/pids"%os.environ['HOME']
    if not os.path.exists(logpath):
        os.makedirs(logpath)
    if not os.path.exists(pidpath):
        os.makedirs(pidpath)
    logfile = "%s/hub%s.log"%(logpath, server_id)
    pidfile = "%s/hub%s.pid"%(pidpath, server_id)
    return "--host={hostname} --id {server_id} --database_nodes {db} --port {port} --proxy_port {proxy_port} --logfile {logfile} --pidfile {pidfile}".format(
        hostname=args.hostname, db=args.db, server_id=server_id, port=port, proxy_port=proxy_port,
        logfile=logfile, pidfile=pidfile)

def start_hub(server_id):
    hub('start', server_id)

def stop_hub(server_id):
    hub('stop', server_id)

def restart_hub(server_id):
    hub('stop', server_id)
    time.sleep(1)
    hub('start', server_id)

def gap():
    print("waiting %s seconds before restarting next hub"%args.gap)
    time.sleep(args.gap)

def start(args):
    for server_id in args.id.split(','):
        start_hub(server_id)

def stop(args):
    for server_id in args.id.split(','):
        stop_hub(server_id)

def restart(args):
    v = args.id.split(',')
    for i, server_id in enumerate(v):
        restart_hub(server_id)
        if i < len(v)-1:
            gap()

if __name__ == "__main__":

    import argparse
    parser = argparse.ArgumentParser(description="Control hub servers")
    subparsers = parser.add_subparsers(help='sub-command help')

    parser.add_argument("--id", help="comma separated list ids of servers to start/stop [default: 0]", dest="id", default="0", type=str)
    parser.add_argument("--db", help="comma separated list of database server nodes [default: localhost]", dest="db", default="localhost", type=str)
    parser.add_argument("--hostname", help="hostname to listen on [default: hostname of computer]", dest="hostname", default=socket.gethostname(), type=str)
    parser.add_argument("--gap", help="time (in seconds) to wait before restarting each hub [default: 10]", dest="gap", default=10, type=int)

    parser_stop    = subparsers.add_parser('stop',    help='stop the hubs')
    parser_stop.set_defaults(func=stop)
    parser_start   = subparsers.add_parser('start',   help='start the hubs')
    parser_start.set_defaults(func=start)
    parser_restart = subparsers.add_parser('restart', help='restart the hubs')
    parser_restart.set_defaults(func=restart)

    args = parser.parse_args()
    args.func(args)


