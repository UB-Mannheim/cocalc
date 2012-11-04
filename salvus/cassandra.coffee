#########################################################################
# 
# Interface to the Cassandra Database.
#
# *ALL* DB queries (using CQL, etc.) should be in this file, with
# *Cassandra/CQL agnostic wrapper functions defined here.   E.g.,
# to find out if an email address is available, define a function
# here that does the CQL query.
#
# (c) William Stein, University of Washington
#
#########################################################################
    
misc    = require('misc')
{to_json, from_json, to_iso, defaults} = misc
required = defaults.required

async   = require('async')
winston = require('winston')            # https://github.com/flatiron/winston
helenus = require("helenus")            # https://github.com/simplereach/helenus
uuid    = require('node-uuid')
{EventEmitter} = require('events')


now = () -> to_iso(new Date())



#########################################################################

exports.create_schema = (conn, cb) ->
    t = misc.walltime()
    blocks = require('fs').readFileSync('db_schema.cql', 'utf8').split('CREATE')
    f = (s, cb) ->
        if s.length > 0
            #console.log(s)
            conn.cql("CREATE "+s, [], (e,r)->console.log(e) if e; cb(null,0))
        else
            cb(null, 0)
    async.mapSeries(blocks, f, (err, results) ->
        winston.info("created schema in #{misc.walltime()-t} seconds.")
        cb(err))


class UUIDValueStore
    # c = new (require("cassandra").Salvus)(); s = c.uuid_value_store('sage'); u = c.uuid_value_store('user')
    # s.set(uuid:4, value:{address:'localhost', port:5000}, ttl:30, cb:console.log)
    # u.set(uuid:7, value:{address:'localhost', port:5000})
    # u.get(uuid:7, cb:console.log)
    constructor: (@cassandra, opts={}) ->
        @opts = defaults(opts,  name:'default')
        
    set: (opts={}) ->
        opts = defaults(opts,  uuid:undefined, value:undefined, ttl:0, cb:undefined)
        opts.uuid = uuid.v4() if not opts.uuid?
        @cassandra.update(
            table:'uuid_value'
            where:{name:@opts.name, uuid:opts.uuid}
            set:{value:to_json(opts.value)}
            ttl:opts.ttl
            cb:opts.cb
        )
        return opts.uuid
        
    get: (opts={}) ->
        opts = defaults(opts, uuid:undefined, cb:undefined)
        @cassandra.select(
            table:'uuid_value'
            columns:['value']
            where:{name:@opts.name, uuid:opts.uuid}
            cb:(error, results) -> opts.cb(error, if results.length == 1 then from_json(results[0]))
        )
            
    delete: (opts={}) ->
        opts = defaults(opts, uuid:undefined, cb:undefined)
        @cassandra.delete(table:'uuid_value', where:{name:@opts.name, uuid:opts.uuid}, cb:opts.cb)
        
    delete_all: (opts={}) ->
        opts = defaults(opts,  cb:undefined)
        @cassandra.delete(table:'uuid_value', where:{name:@opts.name}, cb:opts.cb)
        
    length: (opts={}) ->
        opts = defaults(opts,  cb:undefined)
        @cassandra.count(table:'uuid_value', where:{name:@opts.name}, cb:opts.cb)
        
    all: (opts={}) ->
        opts = defaults(opts,  cb:undefined)        
        @cassandra.select(
            table:'uuid_value'
            columns:['uuid', 'value']
            where:{name:@opts.name},
            cb:(err, results) ->
                obj = {}
                for r in results
                    obj[r[0]] = from_json(r[1])
                opts.cb(err, obj))

class KeyValueStore
    #   c = new (require("cassandra").Salvus)(); d = c.key_value_store('test')
    #   d.set(key:[1,2], value:[465, {abc:123, xyz:[1,2]}], ttl:5)
    #   d.get(key:[1,2], console.log)   # but call it again in > 5 seconds and get nothing...
    constructor: (@cassandra, opts={}) ->
        @opts = defaults(opts,  name:'default')
        
    set: (opts={}) ->
        opts = defaults(opts,  key:undefined, value:undefined, ttl:0, cb:undefined)        
        @cassandra.update(
            table:'key_value'
            where:{name:@opts.name, key:to_json(opts.key)}
            set:{value:to_json(opts.value)}
            ttl:opts.ttl
            cb:opts.cb
        )
                        
    get: (opts={}) ->
        opts = defaults(opts, key:undefined, cb:undefined)
        @cassandra.select(
            table:'key_value'
            columns:['value']
            where:{name:@opts.name, key:to_json(opts.key)}
            cb:(error, results) -> opts.cb?(error, if results.length == 1 then from_json(results[0]))
        )
            
    delete: (opts={}) ->
        opts = defaults(opts, key:undefined, cb:undefined)
        @cassandra.delete(table:'key_value', where:{name:@opts.name, key:to_json(opts.key)}, cb:opts.cb)
        
    delete_all: (opts={}) ->
        opts = defaults(opts,  cb:undefined)
        @cassandra.delete(table:'key_value', where:{name:@opts.name}, cb:opts.cb)
        
    length: (opts={}) ->
        opts = defaults(opts,  cb:undefined)
        @cassandra.count(table:'key_value', where:{name:@opts.name}, cb:opts.cb)
        
    all: (opts={}) ->
        opts = defaults(opts,  cb:undefined)
        @cassandra.select(
            table:'key_value'
            columns:['key', 'value']
            where:{name:@opts.name}
            cb:(error, results) -> opts.cb(error, [from_json(r[0]), from_json(r[1])] for r in results)
        )

# Convert individual entries in columns from cassandra formats to what we
# want to use everywhere in Salvus. For example, uuids are converted to
# strings instead of their own special object type, since otherwise they
# convert to JSON incorrectly.

exports.to_cassandra = to_cassandra = (obj, json) ->
    if json
        obj = from_json(obj)
    if obj and obj.hasOwnProperty(obj, 'hex')
        return obj.hex
    return obj

class exports.Cassandra extends EventEmitter
    constructor: (opts={}) ->    # cb is called on connect
        opts = defaults(opts, hosts:['localhost'], cb:undefined, keyspace:undefined, timeout:3000)
        console.log("keyspace = #{opts.keyspace}")
        @conn = new helenus.ConnectionPool(
            hosts     :  opts.hosts
            keyspace  :  opts.keyspace
            timeout   :  opts.timeout
            cqlVersion: '3.0.0'
        )
        @conn.on('error', (err) =>
            winston.error(err.name, err.message)
            @emit('error', err)
        )
        if opts.cb?
            @conn.connect(opts.cb)
        else
            @conn.connect((err) -> )

    _where: (where_key, vals, json=[]) ->
        where = "";
        for key, val of where_key
            if key in json
                val = to_json(val)
            if typeof(val) != 'boolean'
                where += "#{key}=? AND "
                vals.push(val)
            else
                # work around a *MAJOR* driver bug :-(
                where += "#{key}='#{val}' AND "
        return where.slice(0,-4)

    _set: (properties, vals, json=[]) ->
        set = ""; 
        for key, val of properties
            if key in json
                val = to_json(val)
            if val?  # only consider properties with defined values
                if typeof(val) != 'boolean'            
                    set += "#{key}=?,"
                    vals.push(val)
                else
                    # work around a driver bug :-(
                    set += "#{key}='#{val}',"
        return set.slice(0,-1)

    close: () ->
        @conn.close()
        @emit('close')

    count: (opts={}) ->
        opts = defaults(opts,  table:undefined, where:{}, cb:undefined)
        query = "SELECT COUNT(*) FROM #{opts.table}"
        vals = []
        if not misc.is_empty_object(opts.where)
            where = @_where(opts.where, vals)
            query += " WHERE #{where}"
        @cql(query, vals, (error, results) -> opts.cb?(error, results[0].get('count').value))

    update: (opts={}) -> 
        opts = defaults opts,
            table     : required
            where     : {}
            set       : {}
            ttl       : 0
            cb        : undefined
            json      : []          # list of columns to convert to JSON
        vals = []
        set = @_set(opts.set, vals, opts.json)
        where = @_where(opts.where, vals, opts.json)
        @cql("UPDATE #{opts.table} USING ttl #{opts.ttl} SET #{set} WHERE #{where}", vals, opts.cb)

    delete: (opts={}) ->
        opts = defaults(opts,  table:undefined, where:{}, cb:undefined)
        vals = []
        where = @_where(opts.where, vals)
        @cql("DELETE FROM #{opts.table} WHERE #{where}", vals, opts.cb)

    select: (opts={}) ->
        opts = defaults opts,
            table     : required    # string -- the table to query
            columns   : required    # list -- columns to extract
            where     : undefined   # object -- conditions to impose (only equality currently implemented); undefined = return everything
            cb        : required    # callback(error, results)
            objectify : false       # if false results is a array of arrays (so less redundant); if true, array of objects (so keys redundant)
            limit     : undefined   # if defined, limit the number of results returned to this integer
            json      : []          # list of columns that should be converted from JSON format
            
        vals = []
        query = "SELECT #{opts.columns.join(',')} FROM #{opts.table}"
        if opts.where?
            where = @_where(opts.where, vals, opts.json)
            query += " WHERE #{where} "
        if opts.limit?
            query += " LIMIT #{opts.limit} "
        @cql(query, vals,
            (error, results) ->
                if opts.objectify
                    x = (misc.pairs_to_obj([col,to_cassandra(r.get(col).value, col in opts.json)] for col in opts.columns) for r in results)
                else
                    x = ((to_cassandra(r.get(col).value, col in opts.json) for col in opts.columns) for r in results)
                opts.cb(error, x)
        )

    cql: (query, vals, cb) ->
        #winston.debug(query, vals)
        @conn.cql(query, vals, (error, results) =>
            winston.error("Query cql('#{query}','#{vals}') caused a CQL error:\n#{error}") if error
            @emit('error', error) if error
            cb?(error, results))

    key_value_store: (opts={}) -> # key_value_store(name:"the name")
        new KeyValueStore(@, opts)
    
    uuid_value_store: (opts={}) -> # uuid_value_store(name:"the name")
        new UUIDValueStore(@, opts)

class exports.Salvus extends exports.Cassandra
    constructor: (opts={}) ->
        if not opts.keyspace?
            opts.keyspace = 'salvus' 
        super(opts)
        
    #####################################
    # The log: we log important conceptually meaningful events
    # here.  This is something we will actually look at.
    #####################################
    log: (opts={}) ->
        opts = defaults(opts, 
            event : required    # string
            value : required    # object (will be JSON'd)
            ttl   : undefined
            cb    : undefined
        )
        @update(
            table :'central_log'
            set   : {event:opts.event, value:to_json(opts.value)}
            where : {'time':now()}
            cb    : opts.cb
        )

    get_log: (opts={}) ->
        opts = defaults(opts,
            start_time : undefined
            end_time   : undefined
            cb         : required
        )

        where = {}
        # TODO -- implement restricting the range of times -- this
        # isn't trivial because I haven't implemented ranges in
        # @select yet, and I don't want to spend a lot of time on this
        # right now. maybe just write query using CQL.
        
        @select(
            table   : 'central_log'
            where   : where
            columns : ['time', 'event', 'value']
            cb      : (error, results) ->
                if error
                    cb(error)
                else
                    cb(false, ({time:r[0], event:r[1], value:from_json(r[2])} for r in results))
        )
            

    
    #####################################
    # Managing network services
    #####################################
    running_sage_servers: (opts={}) ->  
        opts = defaults(opts,  cb:undefined)
        @select(table:'sage_servers', columns:['address'], where:{running:true}, cb:(error, results) ->
            # TODO: we hardcoded 6000 for now
            opts.cb(error, {address:x[0], port:6000} for x in results)
        )

    random_sage_server: (opts={}) -> # cb(error, random running sage server) or if there are no running sage servers, then cb(undefined)
        opts = defaults(opts,  cb:undefined)        
        @running_sage_servers(cb:(error, res) -> opts.cb(error, if res.length == 0 then undefined else misc.random_choice(res)))


    #####################################
    # Account Management
    #####################################
    is_email_address_available: (email_address, cb) ->
        @count(table:"accounts", where:{email_address:email_address}, cb:(error, cnt) ->
            if error
                cb(error)
            else
                cb(null, cnt==0)
        )
        
    create_account: (opts={}) ->
        opts = defaults(opts,
            cb:undefined
            first_name    : required
            last_name     : required
            email_address : required
            password_hash : required
        )
            
        account_id = uuid.v4()
        # TODO: plan_name
        a = {first_name:opts.first_name, last_name:opts.last_name, email_address:opts.email_address, password_hash:opts.password_hash, plan_name:"Free"}
        
        @update(
            table :'accounts'
            set   : a
            where : {account_id:account_id}
            cb    : (error, result) -> opts.cb?(error, account_id)
        )

        return account_id

    get_account: (opts={}) ->
        opts = defaults(opts,
            cb            : required
            email_address : undefined
            account_id    : undefined
        )
        where = {}
        if opts.account_id?
            where.account_id = opts.account_id
        if opts.email_address?
            where.email_address = opts.email_address
            
        @select
            table   : 'accounts'
            where   : where 
            columns : ['account_id', 'first_name', 'last_name', 'email_address', 'password_hash','plan_name']
            objectify : true
            cb      : (error, results) ->
                if error or results.length != 1
                    opts.cb(true)
                else
                    opts.cb(false, results[0])

    change_password: (opts={}) ->
        opts = defaults(opts,
            account_id    : required
            password_hash : required
            cb            : undefined
        )
        @update(
            table   : 'accounts'
            where   : {account_id:opts.account_id}
            set     : {password_hash: opts.password_hash}
            cb      : opts.cb
        )

    change_email_address: (opts={}) ->
        opts = defaults(opts,
            account_id    : required
            email_address : required
            cb            : undefined
        )
        @update(
            table   : 'accounts'
            where   : {account_id    : opts.account_id}
            set     : {email_address : opts.email_address}
            cb      : opts.cb
        )
        

    #####################################
    # User Feedback
    #####################################
    report_feedback: (opts={}) ->
        opts = defaults opts,
            account_id:  undefined
            type:        required
            description: required
            data:        required
            nps:         undefined
            cb:          undefined
            
        feedback_id = uuid.v4()
        time = now()
        @update
            table : "feedback"
            where : {time:time}
            json  : ['data']
            set   : {account_id:opts.account_id, feedback_id:feedback_id, type: opts.type, description: opts.description, nps:opts.nps, data:opts.data}
            cb    : opts.cb

    get_all_feedback_from_user: (opts={}) ->
        opts = defaults opts,
            account_id : required
            cb         : undefined
            
        @select
            table     : "feedback"
            where     : {account_id:opts.account_id}
            columns   : ['time', 'type', 'data', 'description', 'status', 'notes', 'url']
            json      : ['data']
            objectify : true
            cb        : opts.cb

    
    #############
    # Plans
    ############
    create_plan: (opts={}) ->
        opts = defaults(opts,  name:undefined, cb:undefined)        
        @update
            table : 'plans'
            where : {plan_id:uuid.v4()}
            set   : {name:opts.name, created:now()}
            cb    : opts.cb

    plan: (opts={}) ->
        opts = defaults(opts,  id:undefined, columns:[], cb:undefined)        
        @select(table:'plans', columns:columns, where:{plan_id:id}, cb:opts.cb)
        
    current_plans: (opts={}) ->
        opts = defaults(columns:[], cb:undefined)        
        @select(table:'plans', columns:opts.columns, where:{current:true}, cb:opts.cb)


    

                            
###
# EXAMPLES:

c = new (require("cassandra").Salvus)()
c.count('accounts',{},console.log)
c.select(table:'accounts', columns:['username'], cb:console.log, limit:1)

id=null; c.create_account((a) -> id=a)
c.update_account(id, {username:'williamstein'}, console.log)

###