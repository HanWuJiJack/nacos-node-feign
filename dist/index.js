var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var dist$6 = {};

var dist$5 = {};

var client = {};

var commands$6 = {};

var commands$5 = {};

var APPEND$1 = {};

Object.defineProperty(APPEND$1, "__esModule", { value: true });
APPEND$1.transformArguments = APPEND$1.FIRST_KEY_INDEX = void 0;
APPEND$1.FIRST_KEY_INDEX = 1;
function transformArguments$5u(key, value) {
    return ['APPEND', key, value];
}
APPEND$1.transformArguments = transformArguments$5u;

var BITCOUNT$1 = {};

Object.defineProperty(BITCOUNT$1, "__esModule", { value: true });
BITCOUNT$1.transformArguments = BITCOUNT$1.IS_READ_ONLY = BITCOUNT$1.FIRST_KEY_INDEX = void 0;
BITCOUNT$1.FIRST_KEY_INDEX = 1;
BITCOUNT$1.IS_READ_ONLY = true;
function transformArguments$5t(key, range) {
    const args = ['BITCOUNT', key];
    if (range) {
        args.push(range.start.toString(), range.end.toString());
        if (range.mode) {
            args.push(range.mode);
        }
    }
    return args;
}
BITCOUNT$1.transformArguments = transformArguments$5t;

var BITFIELD_RO$1 = {};

Object.defineProperty(BITFIELD_RO$1, "__esModule", { value: true });
BITFIELD_RO$1.transformArguments = BITFIELD_RO$1.IS_READ_ONLY = BITFIELD_RO$1.FIRST_KEY_INDEX = void 0;
BITFIELD_RO$1.FIRST_KEY_INDEX = 1;
BITFIELD_RO$1.IS_READ_ONLY = true;
function transformArguments$5s(key, operations) {
    const args = ['BITFIELD_RO', key];
    for (const operation of operations) {
        args.push('GET', operation.encoding, operation.offset.toString());
    }
    return args;
}
BITFIELD_RO$1.transformArguments = transformArguments$5s;

var BITFIELD$1 = {};

Object.defineProperty(BITFIELD$1, "__esModule", { value: true });
BITFIELD$1.transformArguments = BITFIELD$1.FIRST_KEY_INDEX = void 0;
BITFIELD$1.FIRST_KEY_INDEX = 1;
function transformArguments$5r(key, operations) {
    const args = ['BITFIELD', key];
    for (const options of operations) {
        switch (options.operation) {
            case 'GET':
                args.push('GET', options.encoding, options.offset.toString());
                break;
            case 'SET':
                args.push('SET', options.encoding, options.offset.toString(), options.value.toString());
                break;
            case 'INCRBY':
                args.push('INCRBY', options.encoding, options.offset.toString(), options.increment.toString());
                break;
            case 'OVERFLOW':
                args.push('OVERFLOW', options.behavior);
                break;
        }
    }
    return args;
}
BITFIELD$1.transformArguments = transformArguments$5r;

var BITOP$1 = {};

var genericTransformers = {};

Object.defineProperty(genericTransformers, "__esModule", { value: true });
genericTransformers.transformRangeReply = genericTransformers.pushSlotRangesArguments = genericTransformers.pushSortArguments = genericTransformers.transformFunctionListItemReply = genericTransformers.RedisFunctionFlags = genericTransformers.transformCommandReply = genericTransformers.CommandCategories = genericTransformers.CommandFlags = genericTransformers.pushOptionalVerdictArgument = genericTransformers.pushVerdictArgument = genericTransformers.pushVerdictNumberArguments = genericTransformers.pushVerdictArguments = genericTransformers.pushEvalArguments = genericTransformers.evalFirstKeyIndex = genericTransformers.transformPXAT = genericTransformers.transformEXAT = genericTransformers.transformGeoMembersWithReply = genericTransformers.GeoReplyWith = genericTransformers.pushGeoRadiusStoreArguments = genericTransformers.pushGeoRadiusArguments = genericTransformers.pushGeoSearchArguments = genericTransformers.pushGeoCountArgument = genericTransformers.transformLMPopArguments = genericTransformers.transformZMPopArguments = genericTransformers.transformSortedSetWithScoresReply = genericTransformers.transformSortedSetMemberReply = genericTransformers.transformSortedSetMemberNullReply = genericTransformers.transformStreamsMessagesReply = genericTransformers.transformStreamMessagesNullReply = genericTransformers.transformStreamMessagesReply = genericTransformers.transformStreamMessageNullReply = genericTransformers.transformStreamMessageReply = genericTransformers.transformTuplesReply = genericTransformers.transformStringNumberInfinityArgument = genericTransformers.transformNumberInfinityArgument = genericTransformers.transformNumberInfinityNullArrayReply = genericTransformers.transformNumberInfinityNullReply = genericTransformers.transformNumberInfinityReply = genericTransformers.pushScanArguments = genericTransformers.transformBooleanArrayReply = genericTransformers.transformBooleanReply = void 0;
function transformBooleanReply(reply) {
    return reply === 1;
}
genericTransformers.transformBooleanReply = transformBooleanReply;
function transformBooleanArrayReply(reply) {
    return reply.map(transformBooleanReply);
}
genericTransformers.transformBooleanArrayReply = transformBooleanArrayReply;
function pushScanArguments(args, cursor, options) {
    args.push(cursor.toString());
    if (options?.MATCH) {
        args.push('MATCH', options.MATCH);
    }
    if (options?.COUNT) {
        args.push('COUNT', options.COUNT.toString());
    }
    return args;
}
genericTransformers.pushScanArguments = pushScanArguments;
function transformNumberInfinityReply(reply) {
    switch (reply.toString()) {
        case '+inf':
            return Infinity;
        case '-inf':
            return -Infinity;
        default:
            return Number(reply);
    }
}
genericTransformers.transformNumberInfinityReply = transformNumberInfinityReply;
function transformNumberInfinityNullReply(reply) {
    if (reply === null)
        return null;
    return transformNumberInfinityReply(reply);
}
genericTransformers.transformNumberInfinityNullReply = transformNumberInfinityNullReply;
function transformNumberInfinityNullArrayReply(reply) {
    return reply.map(transformNumberInfinityNullReply);
}
genericTransformers.transformNumberInfinityNullArrayReply = transformNumberInfinityNullArrayReply;
function transformNumberInfinityArgument(num) {
    switch (num) {
        case Infinity:
            return '+inf';
        case -Infinity:
            return '-inf';
        default:
            return num.toString();
    }
}
genericTransformers.transformNumberInfinityArgument = transformNumberInfinityArgument;
function transformStringNumberInfinityArgument(num) {
    if (typeof num !== 'number')
        return num;
    return transformNumberInfinityArgument(num);
}
genericTransformers.transformStringNumberInfinityArgument = transformStringNumberInfinityArgument;
function transformTuplesReply(reply) {
    const message = Object.create(null);
    for (let i = 0; i < reply.length; i += 2) {
        message[reply[i].toString()] = reply[i + 1];
    }
    return message;
}
genericTransformers.transformTuplesReply = transformTuplesReply;
function transformStreamMessageReply([id, message]) {
    return {
        id,
        message: transformTuplesReply(message)
    };
}
genericTransformers.transformStreamMessageReply = transformStreamMessageReply;
function transformStreamMessageNullReply(reply) {
    if (reply === null)
        return null;
    return transformStreamMessageReply(reply);
}
genericTransformers.transformStreamMessageNullReply = transformStreamMessageNullReply;
function transformStreamMessagesReply(reply) {
    return reply.map(transformStreamMessageReply);
}
genericTransformers.transformStreamMessagesReply = transformStreamMessagesReply;
function transformStreamMessagesNullReply(reply) {
    return reply.map(transformStreamMessageNullReply);
}
genericTransformers.transformStreamMessagesNullReply = transformStreamMessagesNullReply;
function transformStreamsMessagesReply(reply) {
    if (reply === null)
        return null;
    return reply.map(([name, rawMessages]) => ({
        name,
        messages: transformStreamMessagesReply(rawMessages)
    }));
}
genericTransformers.transformStreamsMessagesReply = transformStreamsMessagesReply;
function transformSortedSetMemberNullReply(reply) {
    if (!reply.length)
        return null;
    return transformSortedSetMemberReply(reply);
}
genericTransformers.transformSortedSetMemberNullReply = transformSortedSetMemberNullReply;
function transformSortedSetMemberReply(reply) {
    return {
        value: reply[0],
        score: transformNumberInfinityReply(reply[1])
    };
}
genericTransformers.transformSortedSetMemberReply = transformSortedSetMemberReply;
function transformSortedSetWithScoresReply(reply) {
    const members = [];
    for (let i = 0; i < reply.length; i += 2) {
        members.push({
            value: reply[i],
            score: transformNumberInfinityReply(reply[i + 1])
        });
    }
    return members;
}
genericTransformers.transformSortedSetWithScoresReply = transformSortedSetWithScoresReply;
function transformZMPopArguments(args, keys, side, options) {
    pushVerdictArgument(args, keys);
    args.push(side);
    if (options?.COUNT) {
        args.push('COUNT', options.COUNT.toString());
    }
    return args;
}
genericTransformers.transformZMPopArguments = transformZMPopArguments;
function transformLMPopArguments(args, keys, side, options) {
    pushVerdictArgument(args, keys);
    args.push(side);
    if (options?.COUNT) {
        args.push('COUNT', options.COUNT.toString());
    }
    return args;
}
genericTransformers.transformLMPopArguments = transformLMPopArguments;
function pushGeoCountArgument(args, count) {
    if (typeof count === 'number') {
        args.push('COUNT', count.toString());
    }
    else if (count) {
        args.push('COUNT', count.value.toString());
        if (count.ANY) {
            args.push('ANY');
        }
    }
    return args;
}
genericTransformers.pushGeoCountArgument = pushGeoCountArgument;
function pushGeoSearchArguments(args, key, from, by, options) {
    args.push(key);
    if (typeof from === 'string') {
        args.push('FROMMEMBER', from);
    }
    else {
        args.push('FROMLONLAT', from.longitude.toString(), from.latitude.toString());
    }
    if ('radius' in by) {
        args.push('BYRADIUS', by.radius.toString());
    }
    else {
        args.push('BYBOX', by.width.toString(), by.height.toString());
    }
    args.push(by.unit);
    if (options?.SORT) {
        args.push(options.SORT);
    }
    pushGeoCountArgument(args, options?.COUNT);
    return args;
}
genericTransformers.pushGeoSearchArguments = pushGeoSearchArguments;
function pushGeoRadiusArguments(args, key, from, radius, unit, options) {
    args.push(key);
    if (typeof from === 'string') {
        args.push(from);
    }
    else {
        args.push(from.longitude.toString(), from.latitude.toString());
    }
    args.push(radius.toString(), unit);
    if (options?.SORT) {
        args.push(options.SORT);
    }
    pushGeoCountArgument(args, options?.COUNT);
    return args;
}
genericTransformers.pushGeoRadiusArguments = pushGeoRadiusArguments;
function pushGeoRadiusStoreArguments(args, key, from, radius, unit, destination, options) {
    pushGeoRadiusArguments(args, key, from, radius, unit, options);
    if (options?.STOREDIST) {
        args.push('STOREDIST', destination);
    }
    else {
        args.push('STORE', destination);
    }
    return args;
}
genericTransformers.pushGeoRadiusStoreArguments = pushGeoRadiusStoreArguments;
var GeoReplyWith;
(function (GeoReplyWith) {
    GeoReplyWith["DISTANCE"] = "WITHDIST";
    GeoReplyWith["HASH"] = "WITHHASH";
    GeoReplyWith["COORDINATES"] = "WITHCOORD";
})(GeoReplyWith || (genericTransformers.GeoReplyWith = GeoReplyWith = {}));
function transformGeoMembersWithReply(reply, replyWith) {
    const replyWithSet = new Set(replyWith);
    let index = 0;
    const distanceIndex = replyWithSet.has(GeoReplyWith.DISTANCE) && ++index, hashIndex = replyWithSet.has(GeoReplyWith.HASH) && ++index, coordinatesIndex = replyWithSet.has(GeoReplyWith.COORDINATES) && ++index;
    return reply.map(member => {
        const transformedMember = {
            member: member[0]
        };
        if (distanceIndex) {
            transformedMember.distance = member[distanceIndex];
        }
        if (hashIndex) {
            transformedMember.hash = member[hashIndex];
        }
        if (coordinatesIndex) {
            const [longitude, latitude] = member[coordinatesIndex];
            transformedMember.coordinates = {
                longitude,
                latitude
            };
        }
        return transformedMember;
    });
}
genericTransformers.transformGeoMembersWithReply = transformGeoMembersWithReply;
function transformEXAT(EXAT) {
    return (typeof EXAT === 'number' ? EXAT : Math.floor(EXAT.getTime() / 1000)).toString();
}
genericTransformers.transformEXAT = transformEXAT;
function transformPXAT(PXAT) {
    return (typeof PXAT === 'number' ? PXAT : PXAT.getTime()).toString();
}
genericTransformers.transformPXAT = transformPXAT;
function evalFirstKeyIndex(options) {
    return options?.keys?.[0];
}
genericTransformers.evalFirstKeyIndex = evalFirstKeyIndex;
function pushEvalArguments(args, options) {
    if (options?.keys) {
        args.push(options.keys.length.toString(), ...options.keys);
    }
    else {
        args.push('0');
    }
    if (options?.arguments) {
        args.push(...options.arguments);
    }
    return args;
}
genericTransformers.pushEvalArguments = pushEvalArguments;
function pushVerdictArguments(args, value) {
    if (Array.isArray(value)) {
        // https://github.com/redis/node-redis/pull/2160
        args = args.concat(value);
    }
    else {
        args.push(value);
    }
    return args;
}
genericTransformers.pushVerdictArguments = pushVerdictArguments;
function pushVerdictNumberArguments(args, value) {
    if (Array.isArray(value)) {
        for (const item of value) {
            args.push(item.toString());
        }
    }
    else {
        args.push(value.toString());
    }
    return args;
}
genericTransformers.pushVerdictNumberArguments = pushVerdictNumberArguments;
function pushVerdictArgument(args, value) {
    if (Array.isArray(value)) {
        args.push(value.length.toString(), ...value);
    }
    else {
        args.push('1', value);
    }
    return args;
}
genericTransformers.pushVerdictArgument = pushVerdictArgument;
function pushOptionalVerdictArgument(args, name, value) {
    if (value === undefined)
        return args;
    args.push(name);
    return pushVerdictArgument(args, value);
}
genericTransformers.pushOptionalVerdictArgument = pushOptionalVerdictArgument;
var CommandFlags;
(function (CommandFlags) {
    CommandFlags["WRITE"] = "write";
    CommandFlags["READONLY"] = "readonly";
    CommandFlags["DENYOOM"] = "denyoom";
    CommandFlags["ADMIN"] = "admin";
    CommandFlags["PUBSUB"] = "pubsub";
    CommandFlags["NOSCRIPT"] = "noscript";
    CommandFlags["RANDOM"] = "random";
    CommandFlags["SORT_FOR_SCRIPT"] = "sort_for_script";
    CommandFlags["LOADING"] = "loading";
    CommandFlags["STALE"] = "stale";
    CommandFlags["SKIP_MONITOR"] = "skip_monitor";
    CommandFlags["ASKING"] = "asking";
    CommandFlags["FAST"] = "fast";
    CommandFlags["MOVABLEKEYS"] = "movablekeys"; // keys have no pre-determined position. You must discover keys yourself.
})(CommandFlags || (genericTransformers.CommandFlags = CommandFlags = {}));
var CommandCategories;
(function (CommandCategories) {
    CommandCategories["KEYSPACE"] = "@keyspace";
    CommandCategories["READ"] = "@read";
    CommandCategories["WRITE"] = "@write";
    CommandCategories["SET"] = "@set";
    CommandCategories["SORTEDSET"] = "@sortedset";
    CommandCategories["LIST"] = "@list";
    CommandCategories["HASH"] = "@hash";
    CommandCategories["STRING"] = "@string";
    CommandCategories["BITMAP"] = "@bitmap";
    CommandCategories["HYPERLOGLOG"] = "@hyperloglog";
    CommandCategories["GEO"] = "@geo";
    CommandCategories["STREAM"] = "@stream";
    CommandCategories["PUBSUB"] = "@pubsub";
    CommandCategories["ADMIN"] = "@admin";
    CommandCategories["FAST"] = "@fast";
    CommandCategories["SLOW"] = "@slow";
    CommandCategories["BLOCKING"] = "@blocking";
    CommandCategories["DANGEROUS"] = "@dangerous";
    CommandCategories["CONNECTION"] = "@connection";
    CommandCategories["TRANSACTION"] = "@transaction";
    CommandCategories["SCRIPTING"] = "@scripting";
})(CommandCategories || (genericTransformers.CommandCategories = CommandCategories = {}));
function transformCommandReply$1([name, arity, flags, firstKeyIndex, lastKeyIndex, step, categories]) {
    return {
        name,
        arity,
        flags: new Set(flags),
        firstKeyIndex,
        lastKeyIndex,
        step,
        categories: new Set(categories)
    };
}
genericTransformers.transformCommandReply = transformCommandReply$1;
var RedisFunctionFlags;
(function (RedisFunctionFlags) {
    RedisFunctionFlags["NO_WRITES"] = "no-writes";
    RedisFunctionFlags["ALLOW_OOM"] = "allow-oom";
    RedisFunctionFlags["ALLOW_STALE"] = "allow-stale";
    RedisFunctionFlags["NO_CLUSTER"] = "no-cluster";
})(RedisFunctionFlags || (genericTransformers.RedisFunctionFlags = RedisFunctionFlags = {}));
function transformFunctionListItemReply(reply) {
    return {
        libraryName: reply[1],
        engine: reply[3],
        functions: reply[5].map(fn => ({
            name: fn[1],
            description: fn[3],
            flags: fn[5]
        }))
    };
}
genericTransformers.transformFunctionListItemReply = transformFunctionListItemReply;
function pushSortArguments(args, options) {
    if (options?.BY) {
        args.push('BY', options.BY);
    }
    if (options?.LIMIT) {
        args.push('LIMIT', options.LIMIT.offset.toString(), options.LIMIT.count.toString());
    }
    if (options?.GET) {
        for (const pattern of (typeof options.GET === 'string' ? [options.GET] : options.GET)) {
            args.push('GET', pattern);
        }
    }
    if (options?.DIRECTION) {
        args.push(options.DIRECTION);
    }
    if (options?.ALPHA) {
        args.push('ALPHA');
    }
    return args;
}
genericTransformers.pushSortArguments = pushSortArguments;
function pushSlotRangeArguments(args, range) {
    args.push(range.start.toString(), range.end.toString());
}
function pushSlotRangesArguments(args, ranges) {
    if (Array.isArray(ranges)) {
        for (const range of ranges) {
            pushSlotRangeArguments(args, range);
        }
    }
    else {
        pushSlotRangeArguments(args, ranges);
    }
    return args;
}
genericTransformers.pushSlotRangesArguments = pushSlotRangesArguments;
function transformRangeReply([start, end]) {
    return {
        start,
        end
    };
}
genericTransformers.transformRangeReply = transformRangeReply;

Object.defineProperty(BITOP$1, "__esModule", { value: true });
BITOP$1.transformArguments = BITOP$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1w = genericTransformers;
BITOP$1.FIRST_KEY_INDEX = 2;
function transformArguments$5q(operation, destKey, key) {
    return (0, generic_transformers_1$1w.pushVerdictArguments)(['BITOP', operation, destKey], key);
}
BITOP$1.transformArguments = transformArguments$5q;

var BITPOS$1 = {};

Object.defineProperty(BITPOS$1, "__esModule", { value: true });
BITPOS$1.transformArguments = BITPOS$1.IS_READ_ONLY = BITPOS$1.FIRST_KEY_INDEX = void 0;
BITPOS$1.FIRST_KEY_INDEX = 1;
BITPOS$1.IS_READ_ONLY = true;
function transformArguments$5p(key, bit, start, end, mode) {
    const args = ['BITPOS', key, bit.toString()];
    if (typeof start === 'number') {
        args.push(start.toString());
    }
    if (typeof end === 'number') {
        args.push(end.toString());
    }
    if (mode) {
        args.push(mode);
    }
    return args;
}
BITPOS$1.transformArguments = transformArguments$5p;

var BLMOVE$1 = {};

Object.defineProperty(BLMOVE$1, "__esModule", { value: true });
BLMOVE$1.transformArguments = BLMOVE$1.FIRST_KEY_INDEX = void 0;
BLMOVE$1.FIRST_KEY_INDEX = 1;
function transformArguments$5o(source, destination, sourceDirection, destinationDirection, timeout) {
    return [
        'BLMOVE',
        source,
        destination,
        sourceDirection,
        destinationDirection,
        timeout.toString()
    ];
}
BLMOVE$1.transformArguments = transformArguments$5o;

var BLMPOP$1 = {};

var LMPOP$1 = {};

Object.defineProperty(LMPOP$1, "__esModule", { value: true });
LMPOP$1.transformArguments = LMPOP$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1v = genericTransformers;
LMPOP$1.FIRST_KEY_INDEX = 2;
function transformArguments$5n(keys, side, options) {
    return (0, generic_transformers_1$1v.transformLMPopArguments)(['LMPOP'], keys, side, options);
}
LMPOP$1.transformArguments = transformArguments$5n;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 3;
	function transformArguments(timeout, keys, side, options) {
	    return (0, generic_transformers_1.transformLMPopArguments)(['BLMPOP', timeout.toString()], keys, side, options);
	}
	exports.transformArguments = transformArguments;
	var LMPOP_1 = LMPOP$1;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return LMPOP_1.transformReply; } }); 
} (BLMPOP$1));

var BLPOP$1 = {};

Object.defineProperty(BLPOP$1, "__esModule", { value: true });
BLPOP$1.transformReply = BLPOP$1.transformArguments = BLPOP$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1u = genericTransformers;
BLPOP$1.FIRST_KEY_INDEX = 1;
function transformArguments$5m(keys, timeout) {
    const args = (0, generic_transformers_1$1u.pushVerdictArguments)(['BLPOP'], keys);
    args.push(timeout.toString());
    return args;
}
BLPOP$1.transformArguments = transformArguments$5m;
function transformReply$O(reply) {
    if (reply === null)
        return null;
    return {
        key: reply[0],
        element: reply[1]
    };
}
BLPOP$1.transformReply = transformReply$O;

var BRPOP$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, timeout) {
	    const args = (0, generic_transformers_1.pushVerdictArguments)(['BRPOP'], key);
	    args.push(timeout.toString());
	    return args;
	}
	exports.transformArguments = transformArguments;
	var BLPOP_1 = BLPOP$1;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return BLPOP_1.transformReply; } }); 
} (BRPOP$1));

var BRPOPLPUSH$1 = {};

Object.defineProperty(BRPOPLPUSH$1, "__esModule", { value: true });
BRPOPLPUSH$1.transformArguments = BRPOPLPUSH$1.FIRST_KEY_INDEX = void 0;
BRPOPLPUSH$1.FIRST_KEY_INDEX = 1;
function transformArguments$5l(source, destination, timeout) {
    return ['BRPOPLPUSH', source, destination, timeout.toString()];
}
BRPOPLPUSH$1.transformArguments = transformArguments$5l;

var BZMPOP$1 = {};

var ZMPOP$1 = {};

Object.defineProperty(ZMPOP$1, "__esModule", { value: true });
ZMPOP$1.transformReply = ZMPOP$1.transformArguments = ZMPOP$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1t = genericTransformers;
ZMPOP$1.FIRST_KEY_INDEX = 2;
function transformArguments$5k(keys, side, options) {
    return (0, generic_transformers_1$1t.transformZMPopArguments)(['ZMPOP'], keys, side, options);
}
ZMPOP$1.transformArguments = transformArguments$5k;
function transformReply$N(reply) {
    return reply === null ? null : {
        key: reply[0],
        elements: reply[1].map(generic_transformers_1$1t.transformSortedSetMemberReply)
    };
}
ZMPOP$1.transformReply = transformReply$N;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 3;
	function transformArguments(timeout, keys, side, options) {
	    return (0, generic_transformers_1.transformZMPopArguments)(['BZMPOP', timeout.toString()], keys, side, options);
	}
	exports.transformArguments = transformArguments;
	var ZMPOP_1 = ZMPOP$1;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return ZMPOP_1.transformReply; } }); 
} (BZMPOP$1));

var BZPOPMAX$1 = {};

Object.defineProperty(BZPOPMAX$1, "__esModule", { value: true });
BZPOPMAX$1.transformReply = BZPOPMAX$1.transformArguments = BZPOPMAX$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1s = genericTransformers;
BZPOPMAX$1.FIRST_KEY_INDEX = 1;
function transformArguments$5j(key, timeout) {
    const args = (0, generic_transformers_1$1s.pushVerdictArguments)(['BZPOPMAX'], key);
    args.push(timeout.toString());
    return args;
}
BZPOPMAX$1.transformArguments = transformArguments$5j;
function transformReply$M(reply) {
    if (!reply)
        return null;
    return {
        key: reply[0],
        value: reply[1],
        score: (0, generic_transformers_1$1s.transformNumberInfinityReply)(reply[2])
    };
}
BZPOPMAX$1.transformReply = transformReply$M;

var BZPOPMIN$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, timeout) {
	    const args = (0, generic_transformers_1.pushVerdictArguments)(['BZPOPMIN'], key);
	    args.push(timeout.toString());
	    return args;
	}
	exports.transformArguments = transformArguments;
	var BZPOPMAX_1 = BZPOPMAX$1;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return BZPOPMAX_1.transformReply; } }); 
} (BZPOPMIN$1));

var COPY$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(source, destination, options) {
	    const args = ['COPY', source, destination];
	    if (options?.destinationDb) {
	        args.push('DB', options.destinationDb.toString());
	    }
	    if (options?.replace) {
	        args.push('REPLACE');
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (COPY$1));

var DECR$1 = {};

Object.defineProperty(DECR$1, "__esModule", { value: true });
DECR$1.transformArguments = DECR$1.FIRST_KEY_INDEX = void 0;
DECR$1.FIRST_KEY_INDEX = 1;
function transformArguments$5i(key) {
    return ['DECR', key];
}
DECR$1.transformArguments = transformArguments$5i;

var DECRBY$2 = {};

Object.defineProperty(DECRBY$2, "__esModule", { value: true });
DECRBY$2.transformArguments = DECRBY$2.FIRST_KEY_INDEX = void 0;
DECRBY$2.FIRST_KEY_INDEX = 1;
function transformArguments$5h(key, decrement) {
    return ['DECRBY', key, decrement.toString()];
}
DECRBY$2.transformArguments = transformArguments$5h;

var DEL$4 = {};

Object.defineProperty(DEL$4, "__esModule", { value: true });
DEL$4.transformArguments = DEL$4.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1r = genericTransformers;
DEL$4.FIRST_KEY_INDEX = 1;
function transformArguments$5g(keys) {
    return (0, generic_transformers_1$1r.pushVerdictArguments)(['DEL'], keys);
}
DEL$4.transformArguments = transformArguments$5g;

var DUMP$1 = {};

Object.defineProperty(DUMP$1, "__esModule", { value: true });
DUMP$1.transformArguments = DUMP$1.FIRST_KEY_INDEX = void 0;
DUMP$1.FIRST_KEY_INDEX = 1;
function transformArguments$5f(key) {
    return ['DUMP', key];
}
DUMP$1.transformArguments = transformArguments$5f;

var EVAL_RO$1 = {};

Object.defineProperty(EVAL_RO$1, "__esModule", { value: true });
EVAL_RO$1.transformArguments = EVAL_RO$1.IS_READ_ONLY = EVAL_RO$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1q = genericTransformers;
EVAL_RO$1.FIRST_KEY_INDEX = generic_transformers_1$1q.evalFirstKeyIndex;
EVAL_RO$1.IS_READ_ONLY = true;
function transformArguments$5e(script, options) {
    return (0, generic_transformers_1$1q.pushEvalArguments)(['EVAL_RO', script], options);
}
EVAL_RO$1.transformArguments = transformArguments$5e;

var EVAL$1 = {};

Object.defineProperty(EVAL$1, "__esModule", { value: true });
EVAL$1.transformArguments = EVAL$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1p = genericTransformers;
EVAL$1.FIRST_KEY_INDEX = generic_transformers_1$1p.evalFirstKeyIndex;
function transformArguments$5d(script, options) {
    return (0, generic_transformers_1$1p.pushEvalArguments)(['EVAL', script], options);
}
EVAL$1.transformArguments = transformArguments$5d;

var EVALSHA_RO$1 = {};

Object.defineProperty(EVALSHA_RO$1, "__esModule", { value: true });
EVALSHA_RO$1.transformArguments = EVALSHA_RO$1.IS_READ_ONLY = EVALSHA_RO$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1o = genericTransformers;
EVALSHA_RO$1.FIRST_KEY_INDEX = generic_transformers_1$1o.evalFirstKeyIndex;
EVALSHA_RO$1.IS_READ_ONLY = true;
function transformArguments$5c(sha1, options) {
    return (0, generic_transformers_1$1o.pushEvalArguments)(['EVALSHA_RO', sha1], options);
}
EVALSHA_RO$1.transformArguments = transformArguments$5c;

var EVALSHA$1 = {};

Object.defineProperty(EVALSHA$1, "__esModule", { value: true });
EVALSHA$1.transformArguments = EVALSHA$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1n = genericTransformers;
EVALSHA$1.FIRST_KEY_INDEX = generic_transformers_1$1n.evalFirstKeyIndex;
function transformArguments$5b(sha1, options) {
    return (0, generic_transformers_1$1n.pushEvalArguments)(['EVALSHA', sha1], options);
}
EVALSHA$1.transformArguments = transformArguments$5b;

var EXISTS$4 = {};

Object.defineProperty(EXISTS$4, "__esModule", { value: true });
EXISTS$4.transformArguments = EXISTS$4.IS_READ_ONLY = EXISTS$4.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1m = genericTransformers;
EXISTS$4.FIRST_KEY_INDEX = 1;
EXISTS$4.IS_READ_ONLY = true;
function transformArguments$5a(keys) {
    return (0, generic_transformers_1$1m.pushVerdictArguments)(['EXISTS'], keys);
}
EXISTS$4.transformArguments = transformArguments$5a;

var EXPIRE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, seconds, mode) {
	    const args = ['EXPIRE', key, seconds.toString()];
	    if (mode) {
	        args.push(mode);
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (EXPIRE$1));

var EXPIREAT$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, timestamp, mode) {
	    const args = [
	        'EXPIREAT',
	        key,
	        (0, generic_transformers_1.transformEXAT)(timestamp)
	    ];
	    if (mode) {
	        args.push(mode);
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_2 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformBooleanReply; } }); 
} (EXPIREAT$1));

var EXPIRETIME$1 = {};

Object.defineProperty(EXPIRETIME$1, "__esModule", { value: true });
EXPIRETIME$1.transformArguments = EXPIRETIME$1.FIRST_KEY_INDEX = void 0;
EXPIRETIME$1.FIRST_KEY_INDEX = 1;
function transformArguments$59(key) {
    return ['EXPIRETIME', key];
}
EXPIRETIME$1.transformArguments = transformArguments$59;

var FCALL_RO$1 = {};

Object.defineProperty(FCALL_RO$1, "__esModule", { value: true });
FCALL_RO$1.transformArguments = FCALL_RO$1.IS_READ_ONLY = FCALL_RO$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1l = genericTransformers;
FCALL_RO$1.FIRST_KEY_INDEX = generic_transformers_1$1l.evalFirstKeyIndex;
FCALL_RO$1.IS_READ_ONLY = true;
function transformArguments$58(fn, options) {
    return (0, generic_transformers_1$1l.pushEvalArguments)(['FCALL_RO', fn], options);
}
FCALL_RO$1.transformArguments = transformArguments$58;

var FCALL$1 = {};

Object.defineProperty(FCALL$1, "__esModule", { value: true });
FCALL$1.transformArguments = FCALL$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1k = genericTransformers;
FCALL$1.FIRST_KEY_INDEX = generic_transformers_1$1k.evalFirstKeyIndex;
function transformArguments$57(fn, options) {
    return (0, generic_transformers_1$1k.pushEvalArguments)(['FCALL', fn], options);
}
FCALL$1.transformArguments = transformArguments$57;

var GEOADD$1 = {};

Object.defineProperty(GEOADD$1, "__esModule", { value: true });
GEOADD$1.transformArguments = GEOADD$1.FIRST_KEY_INDEX = void 0;
GEOADD$1.FIRST_KEY_INDEX = 1;
function transformArguments$56(key, toAdd, options) {
    const args = ['GEOADD', key];
    if (options?.NX) {
        args.push('NX');
    }
    else if (options?.XX) {
        args.push('XX');
    }
    if (options?.CH) {
        args.push('CH');
    }
    for (const { longitude, latitude, member } of (Array.isArray(toAdd) ? toAdd : [toAdd])) {
        args.push(longitude.toString(), latitude.toString(), member);
    }
    return args;
}
GEOADD$1.transformArguments = transformArguments$56;

var GEODIST$1 = {};

Object.defineProperty(GEODIST$1, "__esModule", { value: true });
GEODIST$1.transformReply = GEODIST$1.transformArguments = GEODIST$1.IS_READ_ONLY = GEODIST$1.FIRST_KEY_INDEX = void 0;
GEODIST$1.FIRST_KEY_INDEX = 1;
GEODIST$1.IS_READ_ONLY = true;
function transformArguments$55(key, member1, member2, unit) {
    const args = ['GEODIST', key, member1, member2];
    if (unit) {
        args.push(unit);
    }
    return args;
}
GEODIST$1.transformArguments = transformArguments$55;
function transformReply$L(reply) {
    return reply === null ? null : Number(reply);
}
GEODIST$1.transformReply = transformReply$L;

var GEOHASH$1 = {};

Object.defineProperty(GEOHASH$1, "__esModule", { value: true });
GEOHASH$1.transformArguments = GEOHASH$1.IS_READ_ONLY = GEOHASH$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1j = genericTransformers;
GEOHASH$1.FIRST_KEY_INDEX = 1;
GEOHASH$1.IS_READ_ONLY = true;
function transformArguments$54(key, member) {
    return (0, generic_transformers_1$1j.pushVerdictArguments)(['GEOHASH', key], member);
}
GEOHASH$1.transformArguments = transformArguments$54;

var GEOPOS$1 = {};

Object.defineProperty(GEOPOS$1, "__esModule", { value: true });
GEOPOS$1.transformReply = GEOPOS$1.transformArguments = GEOPOS$1.IS_READ_ONLY = GEOPOS$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1i = genericTransformers;
GEOPOS$1.FIRST_KEY_INDEX = 1;
GEOPOS$1.IS_READ_ONLY = true;
function transformArguments$53(key, member) {
    return (0, generic_transformers_1$1i.pushVerdictArguments)(['GEOPOS', key], member);
}
GEOPOS$1.transformArguments = transformArguments$53;
function transformReply$K(reply) {
    return reply.map(coordinates => coordinates === null ? null : {
        longitude: coordinates[0],
        latitude: coordinates[1]
    });
}
GEOPOS$1.transformReply = transformReply$K;

var GEORADIUS_RO_WITH$1 = {};

var GEORADIUS_RO$1 = {};

Object.defineProperty(GEORADIUS_RO$1, "__esModule", { value: true });
GEORADIUS_RO$1.transformArguments = GEORADIUS_RO$1.IS_READ_ONLY = GEORADIUS_RO$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1h = genericTransformers;
GEORADIUS_RO$1.FIRST_KEY_INDEX = 1;
GEORADIUS_RO$1.IS_READ_ONLY = true;
function transformArguments$52(key, coordinates, radius, unit, options) {
    return (0, generic_transformers_1$1h.pushGeoRadiusArguments)(['GEORADIUS_RO'], key, coordinates, radius, unit, options);
}
GEORADIUS_RO$1.transformArguments = transformArguments$52;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const GEORADIUS_RO_1 = GEORADIUS_RO$1;
	var GEORADIUS_RO_2 = GEORADIUS_RO$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return GEORADIUS_RO_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return GEORADIUS_RO_2.IS_READ_ONLY; } });
	function transformArguments(key, coordinates, radius, unit, replyWith, options) {
	    const args = (0, GEORADIUS_RO_1.transformArguments)(key, coordinates, radius, unit, options);
	    args.push(...replyWith);
	    args.preserve = replyWith;
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformGeoMembersWithReply; } }); 
} (GEORADIUS_RO_WITH$1));

var GEORADIUS_WITH$1 = {};

var GEORADIUS$1 = {};

Object.defineProperty(GEORADIUS$1, "__esModule", { value: true });
GEORADIUS$1.transformArguments = GEORADIUS$1.IS_READ_ONLY = GEORADIUS$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1g = genericTransformers;
GEORADIUS$1.FIRST_KEY_INDEX = 1;
GEORADIUS$1.IS_READ_ONLY = true;
function transformArguments$51(key, coordinates, radius, unit, options) {
    return (0, generic_transformers_1$1g.pushGeoRadiusArguments)(['GEORADIUS'], key, coordinates, radius, unit, options);
}
GEORADIUS$1.transformArguments = transformArguments$51;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const GEORADIUS_1 = GEORADIUS$1;
	var GEORADIUS_2 = GEORADIUS$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return GEORADIUS_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return GEORADIUS_2.IS_READ_ONLY; } });
	function transformArguments(key, coordinates, radius, unit, replyWith, options) {
	    const args = (0, GEORADIUS_1.transformArguments)(key, coordinates, radius, unit, options);
	    args.push(...replyWith);
	    args.preserve = replyWith;
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformGeoMembersWithReply; } }); 
} (GEORADIUS_WITH$1));

var GEORADIUSBYMEMBER_RO_WITH$1 = {};

var GEORADIUSBYMEMBER_RO$1 = {};

Object.defineProperty(GEORADIUSBYMEMBER_RO$1, "__esModule", { value: true });
GEORADIUSBYMEMBER_RO$1.transformArguments = GEORADIUSBYMEMBER_RO$1.IS_READ_ONLY = GEORADIUSBYMEMBER_RO$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1f = genericTransformers;
GEORADIUSBYMEMBER_RO$1.FIRST_KEY_INDEX = 1;
GEORADIUSBYMEMBER_RO$1.IS_READ_ONLY = true;
function transformArguments$50(key, member, radius, unit, options) {
    return (0, generic_transformers_1$1f.pushGeoRadiusArguments)(['GEORADIUSBYMEMBER_RO'], key, member, radius, unit, options);
}
GEORADIUSBYMEMBER_RO$1.transformArguments = transformArguments$50;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const GEORADIUSBYMEMBER_RO_1 = GEORADIUSBYMEMBER_RO$1;
	var GEORADIUSBYMEMBER_RO_2 = GEORADIUSBYMEMBER_RO$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return GEORADIUSBYMEMBER_RO_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return GEORADIUSBYMEMBER_RO_2.IS_READ_ONLY; } });
	function transformArguments(key, member, radius, unit, replyWith, options) {
	    const args = (0, GEORADIUSBYMEMBER_RO_1.transformArguments)(key, member, radius, unit, options);
	    args.push(...replyWith);
	    args.preserve = replyWith;
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformGeoMembersWithReply; } }); 
} (GEORADIUSBYMEMBER_RO_WITH$1));

var GEORADIUSBYMEMBER_WITH$1 = {};

var GEORADIUSBYMEMBER$1 = {};

Object.defineProperty(GEORADIUSBYMEMBER$1, "__esModule", { value: true });
GEORADIUSBYMEMBER$1.transformArguments = GEORADIUSBYMEMBER$1.IS_READ_ONLY = GEORADIUSBYMEMBER$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1e = genericTransformers;
GEORADIUSBYMEMBER$1.FIRST_KEY_INDEX = 1;
GEORADIUSBYMEMBER$1.IS_READ_ONLY = true;
function transformArguments$4$(key, member, radius, unit, options) {
    return (0, generic_transformers_1$1e.pushGeoRadiusArguments)(['GEORADIUSBYMEMBER'], key, member, radius, unit, options);
}
GEORADIUSBYMEMBER$1.transformArguments = transformArguments$4$;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const GEORADIUSBYMEMBER_1 = GEORADIUSBYMEMBER$1;
	var GEORADIUSBYMEMBER_2 = GEORADIUSBYMEMBER$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return GEORADIUSBYMEMBER_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return GEORADIUSBYMEMBER_2.IS_READ_ONLY; } });
	function transformArguments(key, member, radius, unit, replyWith, options) {
	    const args = (0, GEORADIUSBYMEMBER_1.transformArguments)(key, member, radius, unit, options);
	    args.push(...replyWith);
	    args.preserve = replyWith;
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformGeoMembersWithReply; } }); 
} (GEORADIUSBYMEMBER_WITH$1));

var GEORADIUSBYMEMBERSTORE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	var GEORADIUSBYMEMBER_1 = GEORADIUSBYMEMBER$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return GEORADIUSBYMEMBER_1.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return GEORADIUSBYMEMBER_1.IS_READ_ONLY; } });
	function transformArguments(key, member, radius, unit, destination, options) {
	    return (0, generic_transformers_1.pushGeoRadiusStoreArguments)(['GEORADIUSBYMEMBER'], key, member, radius, unit, destination, options);
	}
	exports.transformArguments = transformArguments; 
} (GEORADIUSBYMEMBERSTORE$1));

var GEORADIUSSTORE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	var GEORADIUS_1 = GEORADIUS$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return GEORADIUS_1.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return GEORADIUS_1.IS_READ_ONLY; } });
	function transformArguments(key, coordinates, radius, unit, destination, options) {
	    return (0, generic_transformers_1.pushGeoRadiusStoreArguments)(['GEORADIUS'], key, coordinates, radius, unit, destination, options);
	}
	exports.transformArguments = transformArguments; 
} (GEORADIUSSTORE$1));

var GEOSEARCH_WITH$1 = {};

var GEOSEARCH$1 = {};

Object.defineProperty(GEOSEARCH$1, "__esModule", { value: true });
GEOSEARCH$1.transformArguments = GEOSEARCH$1.IS_READ_ONLY = GEOSEARCH$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1d = genericTransformers;
GEOSEARCH$1.FIRST_KEY_INDEX = 1;
GEOSEARCH$1.IS_READ_ONLY = true;
function transformArguments$4_(key, from, by, options) {
    return (0, generic_transformers_1$1d.pushGeoSearchArguments)(['GEOSEARCH'], key, from, by, options);
}
GEOSEARCH$1.transformArguments = transformArguments$4_;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const GEOSEARCH_1 = GEOSEARCH$1;
	var GEOSEARCH_2 = GEOSEARCH$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return GEOSEARCH_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return GEOSEARCH_2.IS_READ_ONLY; } });
	function transformArguments(key, from, by, replyWith, options) {
	    const args = (0, GEOSEARCH_1.transformArguments)(key, from, by, options);
	    args.push(...replyWith);
	    args.preserve = replyWith;
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformGeoMembersWithReply; } }); 
} (GEOSEARCH_WITH$1));

var GEOSEARCHSTORE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	var GEOSEARCH_1 = GEOSEARCH$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return GEOSEARCH_1.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return GEOSEARCH_1.IS_READ_ONLY; } });
	function transformArguments(destination, source, from, by, options) {
	    const args = (0, generic_transformers_1.pushGeoSearchArguments)(['GEOSEARCHSTORE', destination], source, from, by, options);
	    if (options?.STOREDIST) {
	        args.push('STOREDIST');
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	function transformReply(reply) {
	    if (typeof reply !== 'number') {
	        throw new TypeError(`https://github.com/redis/redis/issues/9261`);
	    }
	    return reply;
	}
	exports.transformReply = transformReply; 
} (GEOSEARCHSTORE$1));

var GET$3 = {};

Object.defineProperty(GET$3, "__esModule", { value: true });
GET$3.transformArguments = GET$3.IS_READ_ONLY = GET$3.FIRST_KEY_INDEX = void 0;
GET$3.FIRST_KEY_INDEX = 1;
GET$3.IS_READ_ONLY = true;
function transformArguments$4Z(key) {
    return ['GET', key];
}
GET$3.transformArguments = transformArguments$4Z;

var GETBIT$1 = {};

Object.defineProperty(GETBIT$1, "__esModule", { value: true });
GETBIT$1.transformArguments = GETBIT$1.IS_READ_ONLY = GETBIT$1.FIRST_KEY_INDEX = void 0;
GETBIT$1.FIRST_KEY_INDEX = 1;
GETBIT$1.IS_READ_ONLY = true;
function transformArguments$4Y(key, offset) {
    return ['GETBIT', key, offset.toString()];
}
GETBIT$1.transformArguments = transformArguments$4Y;

var GETDEL$1 = {};

Object.defineProperty(GETDEL$1, "__esModule", { value: true });
GETDEL$1.transformArguments = GETDEL$1.FIRST_KEY_INDEX = void 0;
GETDEL$1.FIRST_KEY_INDEX = 1;
function transformArguments$4X(key) {
    return ['GETDEL', key];
}
GETDEL$1.transformArguments = transformArguments$4X;

var GETEX$1 = {};

Object.defineProperty(GETEX$1, "__esModule", { value: true });
GETEX$1.transformArguments = GETEX$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1c = genericTransformers;
GETEX$1.FIRST_KEY_INDEX = 1;
function transformArguments$4W(key, mode) {
    const args = ['GETEX', key];
    if ('EX' in mode) {
        args.push('EX', mode.EX.toString());
    }
    else if ('PX' in mode) {
        args.push('PX', mode.PX.toString());
    }
    else if ('EXAT' in mode) {
        args.push('EXAT', (0, generic_transformers_1$1c.transformEXAT)(mode.EXAT));
    }
    else if ('PXAT' in mode) {
        args.push('PXAT', (0, generic_transformers_1$1c.transformPXAT)(mode.PXAT));
    }
    else { // PERSIST
        args.push('PERSIST');
    }
    return args;
}
GETEX$1.transformArguments = transformArguments$4W;

var GETRANGE$1 = {};

Object.defineProperty(GETRANGE$1, "__esModule", { value: true });
GETRANGE$1.transformArguments = GETRANGE$1.IS_READ_ONLY = GETRANGE$1.FIRST_KEY_INDEX = void 0;
GETRANGE$1.FIRST_KEY_INDEX = 1;
GETRANGE$1.IS_READ_ONLY = true;
function transformArguments$4V(key, start, end) {
    return ['GETRANGE', key, start.toString(), end.toString()];
}
GETRANGE$1.transformArguments = transformArguments$4V;

var GETSET$1 = {};

Object.defineProperty(GETSET$1, "__esModule", { value: true });
GETSET$1.transformArguments = GETSET$1.FIRST_KEY_INDEX = void 0;
GETSET$1.FIRST_KEY_INDEX = 1;
function transformArguments$4U(key, value) {
    return ['GETSET', key, value];
}
GETSET$1.transformArguments = transformArguments$4U;

var HDEL$1 = {};

Object.defineProperty(HDEL$1, "__esModule", { value: true });
HDEL$1.transformArguments = HDEL$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$1b = genericTransformers;
HDEL$1.FIRST_KEY_INDEX = 1;
function transformArguments$4T(key, field) {
    return (0, generic_transformers_1$1b.pushVerdictArguments)(['HDEL', key], field);
}
HDEL$1.transformArguments = transformArguments$4T;

var HEXISTS$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, field) {
	    return ['HEXISTS', key, field];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (HEXISTS$1));

var HEXPIRE$1 = {};

Object.defineProperty(HEXPIRE$1, "__esModule", { value: true });
HEXPIRE$1.transformArguments = HEXPIRE$1.FIRST_KEY_INDEX = HEXPIRE$1.HASH_EXPIRATION = void 0;
const generic_transformers_1$1a = genericTransformers;
/**
 * @readonly
 * @enum {number}
 */
HEXPIRE$1.HASH_EXPIRATION = {
    /** @property {number} */
    /** The field does not exist */
    FIELD_NOT_EXISTS: -2,
    /** @property {number} */
    /** Specified NX | XX | GT | LT condition not met */
    CONDITION_NOT_MET: 0,
    /** @property {number} */
    /** Expiration time was set or updated */
    UPDATED: 1,
    /** @property {number} */
    /** Field deleted because the specified expiration time is in the past */
    DELETED: 2
};
HEXPIRE$1.FIRST_KEY_INDEX = 1;
function transformArguments$4S(key, fields, seconds, mode) {
    const args = ['HEXPIRE', key, seconds.toString()];
    if (mode) {
        args.push(mode);
    }
    args.push('FIELDS');
    return (0, generic_transformers_1$1a.pushVerdictArgument)(args, fields);
}
HEXPIRE$1.transformArguments = transformArguments$4S;

var HEXPIREAT$1 = {};

Object.defineProperty(HEXPIREAT$1, "__esModule", { value: true });
HEXPIREAT$1.transformArguments = HEXPIREAT$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$19 = genericTransformers;
HEXPIREAT$1.FIRST_KEY_INDEX = 1;
function transformArguments$4R(key, fields, timestamp, mode) {
    const args = [
        'HEXPIREAT',
        key,
        (0, generic_transformers_1$19.transformEXAT)(timestamp)
    ];
    if (mode) {
        args.push(mode);
    }
    args.push('FIELDS');
    return (0, generic_transformers_1$19.pushVerdictArgument)(args, fields);
}
HEXPIREAT$1.transformArguments = transformArguments$4R;

var HEXPIRETIME$1 = {};

Object.defineProperty(HEXPIRETIME$1, "__esModule", { value: true });
HEXPIRETIME$1.transformArguments = HEXPIRETIME$1.IS_READ_ONLY = HEXPIRETIME$1.FIRST_KEY_INDEX = HEXPIRETIME$1.HASH_EXPIRATION_TIME = void 0;
const generic_transformers_1$18 = genericTransformers;
HEXPIRETIME$1.HASH_EXPIRATION_TIME = {
    /** @property {number} */
    /** The field does not exist */
    FIELD_NOT_EXISTS: -2,
    /** @property {number} */
    /** The field exists but has no associated expire */
    NO_EXPIRATION: -1,
};
HEXPIRETIME$1.FIRST_KEY_INDEX = 1;
HEXPIRETIME$1.IS_READ_ONLY = true;
function transformArguments$4Q(key, fields) {
    return (0, generic_transformers_1$18.pushVerdictArgument)(['HEXPIRETIME', key, 'FIELDS'], fields);
}
HEXPIRETIME$1.transformArguments = transformArguments$4Q;

var HGET$1 = {};

Object.defineProperty(HGET$1, "__esModule", { value: true });
HGET$1.transformArguments = HGET$1.IS_READ_ONLY = HGET$1.FIRST_KEY_INDEX = void 0;
HGET$1.FIRST_KEY_INDEX = 1;
HGET$1.IS_READ_ONLY = true;
function transformArguments$4P(key, field) {
    return ['HGET', key, field];
}
HGET$1.transformArguments = transformArguments$4P;

var HGETALL$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.TRANSFORM_LEGACY_REPLY = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	exports.IS_READ_ONLY = true;
	exports.TRANSFORM_LEGACY_REPLY = true;
	function transformArguments(key) {
	    return ['HGETALL', key];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformTuplesReply; } }); 
} (HGETALL$1));

var HINCRBY$1 = {};

Object.defineProperty(HINCRBY$1, "__esModule", { value: true });
HINCRBY$1.transformArguments = HINCRBY$1.FIRST_KEY_INDEX = void 0;
HINCRBY$1.FIRST_KEY_INDEX = 1;
function transformArguments$4O(key, field, increment) {
    return ['HINCRBY', key, field, increment.toString()];
}
HINCRBY$1.transformArguments = transformArguments$4O;

var HINCRBYFLOAT$1 = {};

Object.defineProperty(HINCRBYFLOAT$1, "__esModule", { value: true });
HINCRBYFLOAT$1.transformArguments = HINCRBYFLOAT$1.FIRST_KEY_INDEX = void 0;
HINCRBYFLOAT$1.FIRST_KEY_INDEX = 1;
function transformArguments$4N(key, field, increment) {
    return ['HINCRBYFLOAT', key, field, increment.toString()];
}
HINCRBYFLOAT$1.transformArguments = transformArguments$4N;

var HKEYS$1 = {};

Object.defineProperty(HKEYS$1, "__esModule", { value: true });
HKEYS$1.transformArguments = HKEYS$1.FIRST_KEY_INDEX = void 0;
HKEYS$1.FIRST_KEY_INDEX = 1;
function transformArguments$4M(key) {
    return ['HKEYS', key];
}
HKEYS$1.transformArguments = transformArguments$4M;

var HLEN$1 = {};

Object.defineProperty(HLEN$1, "__esModule", { value: true });
HLEN$1.transformArguments = HLEN$1.FIRST_KEY_INDEX = void 0;
HLEN$1.FIRST_KEY_INDEX = 1;
function transformArguments$4L(key) {
    return ['HLEN', key];
}
HLEN$1.transformArguments = transformArguments$4L;

var HMGET$1 = {};

Object.defineProperty(HMGET$1, "__esModule", { value: true });
HMGET$1.transformArguments = HMGET$1.IS_READ_ONLY = HMGET$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$17 = genericTransformers;
HMGET$1.FIRST_KEY_INDEX = 1;
HMGET$1.IS_READ_ONLY = true;
function transformArguments$4K(key, fields) {
    return (0, generic_transformers_1$17.pushVerdictArguments)(['HMGET', key], fields);
}
HMGET$1.transformArguments = transformArguments$4K;

var HPERSIST$1 = {};

Object.defineProperty(HPERSIST$1, "__esModule", { value: true });
HPERSIST$1.transformArguments = HPERSIST$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$16 = genericTransformers;
HPERSIST$1.FIRST_KEY_INDEX = 1;
function transformArguments$4J(key, fields) {
    return (0, generic_transformers_1$16.pushVerdictArgument)(['HPERSIST', key, 'FIELDS'], fields);
}
HPERSIST$1.transformArguments = transformArguments$4J;

var HPEXPIRE$1 = {};

Object.defineProperty(HPEXPIRE$1, "__esModule", { value: true });
HPEXPIRE$1.transformArguments = HPEXPIRE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$15 = genericTransformers;
HPEXPIRE$1.FIRST_KEY_INDEX = 1;
function transformArguments$4I(key, fields, ms, mode) {
    const args = ['HPEXPIRE', key, ms.toString()];
    if (mode) {
        args.push(mode);
    }
    args.push('FIELDS');
    return (0, generic_transformers_1$15.pushVerdictArgument)(args, fields);
}
HPEXPIRE$1.transformArguments = transformArguments$4I;

var HPEXPIREAT$1 = {};

Object.defineProperty(HPEXPIREAT$1, "__esModule", { value: true });
HPEXPIREAT$1.transformArguments = HPEXPIREAT$1.IS_READ_ONLY = HPEXPIREAT$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$14 = genericTransformers;
HPEXPIREAT$1.FIRST_KEY_INDEX = 1;
HPEXPIREAT$1.IS_READ_ONLY = true;
function transformArguments$4H(key, fields, timestamp, mode) {
    const args = ['HPEXPIREAT', key, (0, generic_transformers_1$14.transformPXAT)(timestamp)];
    if (mode) {
        args.push(mode);
    }
    args.push('FIELDS');
    return (0, generic_transformers_1$14.pushVerdictArgument)(args, fields);
}
HPEXPIREAT$1.transformArguments = transformArguments$4H;

var HPEXPIRETIME$1 = {};

Object.defineProperty(HPEXPIRETIME$1, "__esModule", { value: true });
HPEXPIRETIME$1.transformArguments = HPEXPIRETIME$1.IS_READ_ONLY = HPEXPIRETIME$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$13 = genericTransformers;
HPEXPIRETIME$1.FIRST_KEY_INDEX = 1;
HPEXPIRETIME$1.IS_READ_ONLY = true;
function transformArguments$4G(key, fields) {
    return (0, generic_transformers_1$13.pushVerdictArgument)(['HPEXPIRETIME', key, 'FIELDS'], fields);
}
HPEXPIRETIME$1.transformArguments = transformArguments$4G;

var HPTTL$1 = {};

Object.defineProperty(HPTTL$1, "__esModule", { value: true });
HPTTL$1.transformArguments = HPTTL$1.IS_READ_ONLY = HPTTL$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$12 = genericTransformers;
HPTTL$1.FIRST_KEY_INDEX = 1;
HPTTL$1.IS_READ_ONLY = true;
function transformArguments$4F(key, fields) {
    return (0, generic_transformers_1$12.pushVerdictArgument)(['HPTTL', key, 'FIELDS'], fields);
}
HPTTL$1.transformArguments = transformArguments$4F;

var HRANDFIELD_COUNT_WITHVALUES$1 = {};

var HRANDFIELD_COUNT$1 = {};

var HRANDFIELD$1 = {};

Object.defineProperty(HRANDFIELD$1, "__esModule", { value: true });
HRANDFIELD$1.transformArguments = HRANDFIELD$1.IS_READ_ONLY = HRANDFIELD$1.FIRST_KEY_INDEX = void 0;
HRANDFIELD$1.FIRST_KEY_INDEX = 1;
HRANDFIELD$1.IS_READ_ONLY = true;
function transformArguments$4E(key) {
    return ['HRANDFIELD', key];
}
HRANDFIELD$1.transformArguments = transformArguments$4E;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const HRANDFIELD_1 = HRANDFIELD$1;
	var HRANDFIELD_2 = HRANDFIELD$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return HRANDFIELD_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return HRANDFIELD_2.IS_READ_ONLY; } });
	function transformArguments(key, count) {
	    return [
	        ...(0, HRANDFIELD_1.transformArguments)(key),
	        count.toString()
	    ];
	}
	exports.transformArguments = transformArguments; 
} (HRANDFIELD_COUNT$1));

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const HRANDFIELD_COUNT_1 = HRANDFIELD_COUNT$1;
	var HRANDFIELD_COUNT_2 = HRANDFIELD_COUNT$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return HRANDFIELD_COUNT_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return HRANDFIELD_COUNT_2.IS_READ_ONLY; } });
	function transformArguments(key, count) {
	    return [
	        ...(0, HRANDFIELD_COUNT_1.transformArguments)(key, count),
	        'WITHVALUES'
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformTuplesReply; } }); 
} (HRANDFIELD_COUNT_WITHVALUES$1));

var HSCAN$1 = {};

Object.defineProperty(HSCAN$1, "__esModule", { value: true });
HSCAN$1.transformReply = HSCAN$1.transformArguments = HSCAN$1.IS_READ_ONLY = HSCAN$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$11 = genericTransformers;
HSCAN$1.FIRST_KEY_INDEX = 1;
HSCAN$1.IS_READ_ONLY = true;
function transformArguments$4D(key, cursor, options) {
    return (0, generic_transformers_1$11.pushScanArguments)([
        'HSCAN',
        key
    ], cursor, options);
}
HSCAN$1.transformArguments = transformArguments$4D;
function transformReply$J([cursor, rawTuples]) {
    const parsedTuples = [];
    for (let i = 0; i < rawTuples.length; i += 2) {
        parsedTuples.push({
            field: rawTuples[i],
            value: rawTuples[i + 1]
        });
    }
    return {
        cursor: Number(cursor),
        tuples: parsedTuples
    };
}
HSCAN$1.transformReply = transformReply$J;

var HSCAN_NOVALUES$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const HSCAN_1 = HSCAN$1;
	var HSCAN_2 = HSCAN$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return HSCAN_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return HSCAN_2.IS_READ_ONLY; } });
	function transformArguments(key, cursor, options) {
	    const args = (0, HSCAN_1.transformArguments)(key, cursor, options);
	    args.push('NOVALUES');
	    return args;
	}
	exports.transformArguments = transformArguments;
	function transformReply([cursor, rawData]) {
	    return {
	        cursor: Number(cursor),
	        keys: rawData
	    };
	}
	exports.transformReply = transformReply; 
} (HSCAN_NOVALUES$1));

var HSET$1 = {};

Object.defineProperty(HSET$1, "__esModule", { value: true });
HSET$1.transformArguments = HSET$1.FIRST_KEY_INDEX = void 0;
HSET$1.FIRST_KEY_INDEX = 1;
function transformArguments$4C(...[key, value, fieldValue]) {
    const args = ['HSET', key];
    if (typeof value === 'string' || typeof value === 'number' || Buffer.isBuffer(value)) {
        args.push(convertValue(value), convertValue(fieldValue));
    }
    else if (value instanceof Map) {
        pushMap(args, value);
    }
    else if (Array.isArray(value)) {
        pushTuples(args, value);
    }
    else {
        pushObject(args, value);
    }
    return args;
}
HSET$1.transformArguments = transformArguments$4C;
function pushMap(args, map) {
    for (const [key, value] of map.entries()) {
        args.push(convertValue(key), convertValue(value));
    }
}
function pushTuples(args, tuples) {
    for (const tuple of tuples) {
        if (Array.isArray(tuple)) {
            pushTuples(args, tuple);
            continue;
        }
        args.push(convertValue(tuple));
    }
}
function pushObject(args, object) {
    for (const key of Object.keys(object)) {
        args.push(convertValue(key), convertValue(object[key]));
    }
}
function convertValue(value) {
    return typeof value === 'number' ?
        value.toString() :
        value;
}

var HSETNX$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, field, value) {
	    return ['HSETNX', key, field, value];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (HSETNX$1));

var HSTRLEN$1 = {};

Object.defineProperty(HSTRLEN$1, "__esModule", { value: true });
HSTRLEN$1.transformArguments = HSTRLEN$1.FIRST_KEY_INDEX = void 0;
HSTRLEN$1.FIRST_KEY_INDEX = 1;
function transformArguments$4B(key, field) {
    return ['HSTRLEN', key, field];
}
HSTRLEN$1.transformArguments = transformArguments$4B;

var HTTL$1 = {};

Object.defineProperty(HTTL$1, "__esModule", { value: true });
HTTL$1.transformArguments = HTTL$1.IS_READ_ONLY = HTTL$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$10 = genericTransformers;
HTTL$1.FIRST_KEY_INDEX = 1;
HTTL$1.IS_READ_ONLY = true;
function transformArguments$4A(key, fields) {
    return (0, generic_transformers_1$10.pushVerdictArgument)(['HTTL', key, 'FIELDS'], fields);
}
HTTL$1.transformArguments = transformArguments$4A;

var HVALS$1 = {};

Object.defineProperty(HVALS$1, "__esModule", { value: true });
HVALS$1.transformArguments = HVALS$1.FIRST_KEY_INDEX = void 0;
HVALS$1.FIRST_KEY_INDEX = 1;
function transformArguments$4z(key) {
    return ['HVALS', key];
}
HVALS$1.transformArguments = transformArguments$4z;

var INCR$1 = {};

Object.defineProperty(INCR$1, "__esModule", { value: true });
INCR$1.transformArguments = INCR$1.FIRST_KEY_INDEX = void 0;
INCR$1.FIRST_KEY_INDEX = 1;
function transformArguments$4y(key) {
    return ['INCR', key];
}
INCR$1.transformArguments = transformArguments$4y;

var INCRBY$6 = {};

Object.defineProperty(INCRBY$6, "__esModule", { value: true });
INCRBY$6.transformArguments = INCRBY$6.FIRST_KEY_INDEX = void 0;
INCRBY$6.FIRST_KEY_INDEX = 1;
function transformArguments$4x(key, increment) {
    return ['INCRBY', key, increment.toString()];
}
INCRBY$6.transformArguments = transformArguments$4x;

var INCRBYFLOAT$1 = {};

Object.defineProperty(INCRBYFLOAT$1, "__esModule", { value: true });
INCRBYFLOAT$1.transformArguments = INCRBYFLOAT$1.FIRST_KEY_INDEX = void 0;
INCRBYFLOAT$1.FIRST_KEY_INDEX = 1;
function transformArguments$4w(key, increment) {
    return ['INCRBYFLOAT', key, increment.toString()];
}
INCRBYFLOAT$1.transformArguments = transformArguments$4w;

var LCS_IDX_WITHMATCHLEN$1 = {};

var LCS$1 = {};

Object.defineProperty(LCS$1, "__esModule", { value: true });
LCS$1.transformArguments = LCS$1.IS_READ_ONLY = LCS$1.FIRST_KEY_INDEX = void 0;
LCS$1.FIRST_KEY_INDEX = 1;
LCS$1.IS_READ_ONLY = true;
function transformArguments$4v(key1, key2) {
    return [
        'LCS',
        key1,
        key2
    ];
}
LCS$1.transformArguments = transformArguments$4v;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	const LCS_1 = LCS$1;
	var LCS_2 = LCS$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return LCS_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return LCS_2.IS_READ_ONLY; } });
	function transformArguments(key1, key2) {
	    const args = (0, LCS_1.transformArguments)(key1, key2);
	    args.push('IDX', 'WITHMATCHLEN');
	    return args;
	}
	exports.transformArguments = transformArguments;
	function transformReply(reply) {
	    return {
	        matches: reply[1].map(([key1, key2, length]) => ({
	            key1: (0, generic_transformers_1.transformRangeReply)(key1),
	            key2: (0, generic_transformers_1.transformRangeReply)(key2),
	            length
	        })),
	        length: reply[3]
	    };
	}
	exports.transformReply = transformReply; 
} (LCS_IDX_WITHMATCHLEN$1));

var LCS_IDX$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	const LCS_1 = LCS$1;
	var LCS_2 = LCS$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return LCS_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return LCS_2.IS_READ_ONLY; } });
	function transformArguments(key1, key2) {
	    const args = (0, LCS_1.transformArguments)(key1, key2);
	    args.push('IDX');
	    return args;
	}
	exports.transformArguments = transformArguments;
	function transformReply(reply) {
	    return {
	        matches: reply[1].map(([key1, key2]) => ({
	            key1: (0, generic_transformers_1.transformRangeReply)(key1),
	            key2: (0, generic_transformers_1.transformRangeReply)(key2)
	        })),
	        length: reply[3]
	    };
	}
	exports.transformReply = transformReply; 
} (LCS_IDX$1));

var LCS_LEN$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const LCS_1 = LCS$1;
	var LCS_2 = LCS$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return LCS_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return LCS_2.IS_READ_ONLY; } });
	function transformArguments(key1, key2) {
	    const args = (0, LCS_1.transformArguments)(key1, key2);
	    args.push('LEN');
	    return args;
	}
	exports.transformArguments = transformArguments; 
} (LCS_LEN$1));

var LINDEX$1 = {};

Object.defineProperty(LINDEX$1, "__esModule", { value: true });
LINDEX$1.transformArguments = LINDEX$1.IS_READ_ONLY = LINDEX$1.FIRST_KEY_INDEX = void 0;
LINDEX$1.FIRST_KEY_INDEX = 1;
LINDEX$1.IS_READ_ONLY = true;
function transformArguments$4u(key, index) {
    return ['LINDEX', key, index.toString()];
}
LINDEX$1.transformArguments = transformArguments$4u;

var LINSERT$1 = {};

Object.defineProperty(LINSERT$1, "__esModule", { value: true });
LINSERT$1.transformArguments = LINSERT$1.FIRST_KEY_INDEX = void 0;
LINSERT$1.FIRST_KEY_INDEX = 1;
function transformArguments$4t(key, position, pivot, element) {
    return [
        'LINSERT',
        key,
        position,
        pivot,
        element
    ];
}
LINSERT$1.transformArguments = transformArguments$4t;

var LLEN$1 = {};

Object.defineProperty(LLEN$1, "__esModule", { value: true });
LLEN$1.transformArguments = LLEN$1.IS_READ_ONLY = LLEN$1.FIRST_KEY_INDEX = void 0;
LLEN$1.FIRST_KEY_INDEX = 1;
LLEN$1.IS_READ_ONLY = true;
function transformArguments$4s(key) {
    return ['LLEN', key];
}
LLEN$1.transformArguments = transformArguments$4s;

var LMOVE$1 = {};

Object.defineProperty(LMOVE$1, "__esModule", { value: true });
LMOVE$1.transformArguments = LMOVE$1.FIRST_KEY_INDEX = void 0;
LMOVE$1.FIRST_KEY_INDEX = 1;
function transformArguments$4r(source, destination, sourceSide, destinationSide) {
    return [
        'LMOVE',
        source,
        destination,
        sourceSide,
        destinationSide,
    ];
}
LMOVE$1.transformArguments = transformArguments$4r;

var LPOP_COUNT$1 = {};

Object.defineProperty(LPOP_COUNT$1, "__esModule", { value: true });
LPOP_COUNT$1.transformArguments = LPOP_COUNT$1.FIRST_KEY_INDEX = void 0;
LPOP_COUNT$1.FIRST_KEY_INDEX = 1;
function transformArguments$4q(key, count) {
    return ['LPOP', key, count.toString()];
}
LPOP_COUNT$1.transformArguments = transformArguments$4q;

var LPOP$1 = {};

Object.defineProperty(LPOP$1, "__esModule", { value: true });
LPOP$1.transformArguments = LPOP$1.FIRST_KEY_INDEX = void 0;
LPOP$1.FIRST_KEY_INDEX = 1;
function transformArguments$4p(key) {
    return ['LPOP', key];
}
LPOP$1.transformArguments = transformArguments$4p;

var LPOS_COUNT$1 = {};

var LPOS$1 = {};

Object.defineProperty(LPOS$1, "__esModule", { value: true });
LPOS$1.transformArguments = LPOS$1.IS_READ_ONLY = LPOS$1.FIRST_KEY_INDEX = void 0;
LPOS$1.FIRST_KEY_INDEX = 1;
LPOS$1.IS_READ_ONLY = true;
function transformArguments$4o(key, element, options) {
    const args = ['LPOS', key, element];
    if (typeof options?.RANK === 'number') {
        args.push('RANK', options.RANK.toString());
    }
    if (typeof options?.MAXLEN === 'number') {
        args.push('MAXLEN', options.MAXLEN.toString());
    }
    return args;
}
LPOS$1.transformArguments = transformArguments$4o;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	var LPOS_1 = LPOS$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return LPOS_1.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return LPOS_1.IS_READ_ONLY; } });
	function transformArguments(key, element, count, options) {
	    const args = ['LPOS', key, element];
	    if (typeof options?.RANK === 'number') {
	        args.push('RANK', options.RANK.toString());
	    }
	    args.push('COUNT', count.toString());
	    if (typeof options?.MAXLEN === 'number') {
	        args.push('MAXLEN', options.MAXLEN.toString());
	    }
	    return args;
	}
	exports.transformArguments = transformArguments; 
} (LPOS_COUNT$1));

var LPUSH$1 = {};

Object.defineProperty(LPUSH$1, "__esModule", { value: true });
LPUSH$1.transformArguments = LPUSH$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$$ = genericTransformers;
LPUSH$1.FIRST_KEY_INDEX = 1;
function transformArguments$4n(key, elements) {
    return (0, generic_transformers_1$$.pushVerdictArguments)(['LPUSH', key], elements);
}
LPUSH$1.transformArguments = transformArguments$4n;

var LPUSHX$1 = {};

Object.defineProperty(LPUSHX$1, "__esModule", { value: true });
LPUSHX$1.transformArguments = LPUSHX$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$_ = genericTransformers;
LPUSHX$1.FIRST_KEY_INDEX = 1;
function transformArguments$4m(key, element) {
    return (0, generic_transformers_1$_.pushVerdictArguments)(['LPUSHX', key], element);
}
LPUSHX$1.transformArguments = transformArguments$4m;

var LRANGE$1 = {};

Object.defineProperty(LRANGE$1, "__esModule", { value: true });
LRANGE$1.transformArguments = LRANGE$1.IS_READ_ONLY = LRANGE$1.FIRST_KEY_INDEX = void 0;
LRANGE$1.FIRST_KEY_INDEX = 1;
LRANGE$1.IS_READ_ONLY = true;
function transformArguments$4l(key, start, stop) {
    return [
        'LRANGE',
        key,
        start.toString(),
        stop.toString()
    ];
}
LRANGE$1.transformArguments = transformArguments$4l;

var LREM$1 = {};

Object.defineProperty(LREM$1, "__esModule", { value: true });
LREM$1.transformArguments = LREM$1.FIRST_KEY_INDEX = void 0;
LREM$1.FIRST_KEY_INDEX = 1;
function transformArguments$4k(key, count, element) {
    return [
        'LREM',
        key,
        count.toString(),
        element
    ];
}
LREM$1.transformArguments = transformArguments$4k;

var LSET$1 = {};

Object.defineProperty(LSET$1, "__esModule", { value: true });
LSET$1.transformArguments = LSET$1.FIRST_KEY_INDEX = void 0;
LSET$1.FIRST_KEY_INDEX = 1;
function transformArguments$4j(key, index, element) {
    return [
        'LSET',
        key,
        index.toString(),
        element
    ];
}
LSET$1.transformArguments = transformArguments$4j;

var LTRIM$1 = {};

Object.defineProperty(LTRIM$1, "__esModule", { value: true });
LTRIM$1.transformArguments = LTRIM$1.FIRST_KEY_INDEX = void 0;
LTRIM$1.FIRST_KEY_INDEX = 1;
function transformArguments$4i(key, start, stop) {
    return [
        'LTRIM',
        key,
        start.toString(),
        stop.toString()
    ];
}
LTRIM$1.transformArguments = transformArguments$4i;

var MGET$3 = {};

Object.defineProperty(MGET$3, "__esModule", { value: true });
MGET$3.transformArguments = MGET$3.IS_READ_ONLY = MGET$3.FIRST_KEY_INDEX = void 0;
MGET$3.FIRST_KEY_INDEX = 1;
MGET$3.IS_READ_ONLY = true;
function transformArguments$4h(keys) {
    return ['MGET', ...keys];
}
MGET$3.transformArguments = transformArguments$4h;

var MIGRATE$1 = {};

Object.defineProperty(MIGRATE$1, "__esModule", { value: true });
MIGRATE$1.transformArguments = void 0;
function transformArguments$4g(host, port, key, destinationDb, timeout, options) {
    const args = ['MIGRATE', host, port.toString()], isKeyArray = Array.isArray(key);
    if (isKeyArray) {
        args.push('');
    }
    else {
        args.push(key);
    }
    args.push(destinationDb.toString(), timeout.toString());
    if (options?.COPY) {
        args.push('COPY');
    }
    if (options?.REPLACE) {
        args.push('REPLACE');
    }
    if (options?.AUTH) {
        if (options.AUTH.username) {
            args.push('AUTH2', options.AUTH.username, options.AUTH.password);
        }
        else {
            args.push('AUTH', options.AUTH.password);
        }
    }
    if (isKeyArray) {
        args.push('KEYS', ...key);
    }
    return args;
}
MIGRATE$1.transformArguments = transformArguments$4g;

var MSET$2 = {};

Object.defineProperty(MSET$2, "__esModule", { value: true });
MSET$2.transformArguments = MSET$2.FIRST_KEY_INDEX = void 0;
MSET$2.FIRST_KEY_INDEX = 1;
function transformArguments$4f(toSet) {
    const args = ['MSET'];
    if (Array.isArray(toSet)) {
        args.push(...toSet.flat());
    }
    else {
        for (const key of Object.keys(toSet)) {
            args.push(key, toSet[key]);
        }
    }
    return args;
}
MSET$2.transformArguments = transformArguments$4f;

var MSETNX$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(toSet) {
	    const args = ['MSETNX'];
	    if (Array.isArray(toSet)) {
	        args.push(...toSet.flat());
	    }
	    else {
	        for (const key of Object.keys(toSet)) {
	            args.push(key, toSet[key]);
	        }
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (MSETNX$1));

var OBJECT_ENCODING$1 = {};

Object.defineProperty(OBJECT_ENCODING$1, "__esModule", { value: true });
OBJECT_ENCODING$1.transformArguments = OBJECT_ENCODING$1.IS_READ_ONLY = OBJECT_ENCODING$1.FIRST_KEY_INDEX = void 0;
OBJECT_ENCODING$1.FIRST_KEY_INDEX = 2;
OBJECT_ENCODING$1.IS_READ_ONLY = true;
function transformArguments$4e(key) {
    return ['OBJECT', 'ENCODING', key];
}
OBJECT_ENCODING$1.transformArguments = transformArguments$4e;

var OBJECT_FREQ$1 = {};

Object.defineProperty(OBJECT_FREQ$1, "__esModule", { value: true });
OBJECT_FREQ$1.transformArguments = OBJECT_FREQ$1.IS_READ_ONLY = OBJECT_FREQ$1.FIRST_KEY_INDEX = void 0;
OBJECT_FREQ$1.FIRST_KEY_INDEX = 2;
OBJECT_FREQ$1.IS_READ_ONLY = true;
function transformArguments$4d(key) {
    return ['OBJECT', 'FREQ', key];
}
OBJECT_FREQ$1.transformArguments = transformArguments$4d;

var OBJECT_IDLETIME$1 = {};

Object.defineProperty(OBJECT_IDLETIME$1, "__esModule", { value: true });
OBJECT_IDLETIME$1.transformArguments = OBJECT_IDLETIME$1.IS_READ_ONLY = OBJECT_IDLETIME$1.FIRST_KEY_INDEX = void 0;
OBJECT_IDLETIME$1.FIRST_KEY_INDEX = 2;
OBJECT_IDLETIME$1.IS_READ_ONLY = true;
function transformArguments$4c(key) {
    return ['OBJECT', 'IDLETIME', key];
}
OBJECT_IDLETIME$1.transformArguments = transformArguments$4c;

var OBJECT_REFCOUNT$1 = {};

Object.defineProperty(OBJECT_REFCOUNT$1, "__esModule", { value: true });
OBJECT_REFCOUNT$1.transformArguments = OBJECT_REFCOUNT$1.IS_READ_ONLY = OBJECT_REFCOUNT$1.FIRST_KEY_INDEX = void 0;
OBJECT_REFCOUNT$1.FIRST_KEY_INDEX = 2;
OBJECT_REFCOUNT$1.IS_READ_ONLY = true;
function transformArguments$4b(key) {
    return ['OBJECT', 'REFCOUNT', key];
}
OBJECT_REFCOUNT$1.transformArguments = transformArguments$4b;

var PERSIST$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key) {
	    return ['PERSIST', key];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (PERSIST$1));

var PEXPIRE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, milliseconds, mode) {
	    const args = ['PEXPIRE', key, milliseconds.toString()];
	    if (mode) {
	        args.push(mode);
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (PEXPIRE$1));

var PEXPIREAT$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, millisecondsTimestamp, mode) {
	    const args = [
	        'PEXPIREAT',
	        key,
	        (0, generic_transformers_1.transformPXAT)(millisecondsTimestamp)
	    ];
	    if (mode) {
	        args.push(mode);
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_2 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformBooleanReply; } }); 
} (PEXPIREAT$1));

var PEXPIRETIME$1 = {};

Object.defineProperty(PEXPIRETIME$1, "__esModule", { value: true });
PEXPIRETIME$1.transformArguments = PEXPIRETIME$1.FIRST_KEY_INDEX = void 0;
PEXPIRETIME$1.FIRST_KEY_INDEX = 1;
function transformArguments$4a(key) {
    return ['PEXPIRETIME', key];
}
PEXPIRETIME$1.transformArguments = transformArguments$4a;

var PFADD$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, element) {
	    return (0, generic_transformers_1.pushVerdictArguments)(['PFADD', key], element);
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_2 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformBooleanReply; } }); 
} (PFADD$1));

var PFCOUNT$1 = {};

Object.defineProperty(PFCOUNT$1, "__esModule", { value: true });
PFCOUNT$1.transformArguments = PFCOUNT$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$Z = genericTransformers;
PFCOUNT$1.FIRST_KEY_INDEX = 1;
function transformArguments$49(key) {
    return (0, generic_transformers_1$Z.pushVerdictArguments)(['PFCOUNT'], key);
}
PFCOUNT$1.transformArguments = transformArguments$49;

var PFMERGE$1 = {};

Object.defineProperty(PFMERGE$1, "__esModule", { value: true });
PFMERGE$1.transformArguments = PFMERGE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$Y = genericTransformers;
PFMERGE$1.FIRST_KEY_INDEX = 1;
function transformArguments$48(destination, source) {
    return (0, generic_transformers_1$Y.pushVerdictArguments)(['PFMERGE', destination], source);
}
PFMERGE$1.transformArguments = transformArguments$48;

var PSETEX$1 = {};

Object.defineProperty(PSETEX$1, "__esModule", { value: true });
PSETEX$1.transformArguments = PSETEX$1.FIRST_KEY_INDEX = void 0;
PSETEX$1.FIRST_KEY_INDEX = 1;
function transformArguments$47(key, milliseconds, value) {
    return [
        'PSETEX',
        key,
        milliseconds.toString(),
        value
    ];
}
PSETEX$1.transformArguments = transformArguments$47;

var PTTL$1 = {};

Object.defineProperty(PTTL$1, "__esModule", { value: true });
PTTL$1.transformArguments = PTTL$1.IS_READ_ONLY = PTTL$1.FIRST_KEY_INDEX = void 0;
PTTL$1.FIRST_KEY_INDEX = 1;
PTTL$1.IS_READ_ONLY = true;
function transformArguments$46(key) {
    return ['PTTL', key];
}
PTTL$1.transformArguments = transformArguments$46;

var PUBLISH$1 = {};

Object.defineProperty(PUBLISH$1, "__esModule", { value: true });
PUBLISH$1.transformArguments = PUBLISH$1.IS_READ_ONLY = void 0;
PUBLISH$1.IS_READ_ONLY = true;
function transformArguments$45(channel, message) {
    return ['PUBLISH', channel, message];
}
PUBLISH$1.transformArguments = transformArguments$45;

var RENAME$1 = {};

Object.defineProperty(RENAME$1, "__esModule", { value: true });
RENAME$1.transformArguments = RENAME$1.FIRST_KEY_INDEX = void 0;
RENAME$1.FIRST_KEY_INDEX = 1;
function transformArguments$44(key, newKey) {
    return ['RENAME', key, newKey];
}
RENAME$1.transformArguments = transformArguments$44;

var RENAMENX$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, newKey) {
	    return ['RENAMENX', key, newKey];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (RENAMENX$1));

var RESTORE$1 = {};

Object.defineProperty(RESTORE$1, "__esModule", { value: true });
RESTORE$1.transformArguments = RESTORE$1.FIRST_KEY_INDEX = void 0;
RESTORE$1.FIRST_KEY_INDEX = 1;
function transformArguments$43(key, ttl, serializedValue, options) {
    const args = ['RESTORE', key, ttl.toString(), serializedValue];
    if (options?.REPLACE) {
        args.push('REPLACE');
    }
    if (options?.ABSTTL) {
        args.push('ABSTTL');
    }
    if (options?.IDLETIME) {
        args.push('IDLETIME', options.IDLETIME.toString());
    }
    if (options?.FREQ) {
        args.push('FREQ', options.FREQ.toString());
    }
    return args;
}
RESTORE$1.transformArguments = transformArguments$43;

var RPOP_COUNT$1 = {};

Object.defineProperty(RPOP_COUNT$1, "__esModule", { value: true });
RPOP_COUNT$1.transformArguments = RPOP_COUNT$1.FIRST_KEY_INDEX = void 0;
RPOP_COUNT$1.FIRST_KEY_INDEX = 1;
function transformArguments$42(key, count) {
    return ['RPOP', key, count.toString()];
}
RPOP_COUNT$1.transformArguments = transformArguments$42;

var RPOP$1 = {};

Object.defineProperty(RPOP$1, "__esModule", { value: true });
RPOP$1.transformArguments = RPOP$1.FIRST_KEY_INDEX = void 0;
RPOP$1.FIRST_KEY_INDEX = 1;
function transformArguments$41(key) {
    return ['RPOP', key];
}
RPOP$1.transformArguments = transformArguments$41;

var RPOPLPUSH$1 = {};

Object.defineProperty(RPOPLPUSH$1, "__esModule", { value: true });
RPOPLPUSH$1.transformArguments = RPOPLPUSH$1.FIRST_KEY_INDEX = void 0;
RPOPLPUSH$1.FIRST_KEY_INDEX = 1;
function transformArguments$40(source, destination) {
    return ['RPOPLPUSH', source, destination];
}
RPOPLPUSH$1.transformArguments = transformArguments$40;

var RPUSH$1 = {};

Object.defineProperty(RPUSH$1, "__esModule", { value: true });
RPUSH$1.transformArguments = RPUSH$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$X = genericTransformers;
RPUSH$1.FIRST_KEY_INDEX = 1;
function transformArguments$3$(key, element) {
    return (0, generic_transformers_1$X.pushVerdictArguments)(['RPUSH', key], element);
}
RPUSH$1.transformArguments = transformArguments$3$;

var RPUSHX$1 = {};

Object.defineProperty(RPUSHX$1, "__esModule", { value: true });
RPUSHX$1.transformArguments = RPUSHX$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$W = genericTransformers;
RPUSHX$1.FIRST_KEY_INDEX = 1;
function transformArguments$3_(key, element) {
    return (0, generic_transformers_1$W.pushVerdictArguments)(['RPUSHX', key], element);
}
RPUSHX$1.transformArguments = transformArguments$3_;

var SADD$1 = {};

Object.defineProperty(SADD$1, "__esModule", { value: true });
SADD$1.transformArguments = SADD$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$V = genericTransformers;
SADD$1.FIRST_KEY_INDEX = 1;
function transformArguments$3Z(key, members) {
    return (0, generic_transformers_1$V.pushVerdictArguments)(['SADD', key], members);
}
SADD$1.transformArguments = transformArguments$3Z;

var SCARD$1 = {};

Object.defineProperty(SCARD$1, "__esModule", { value: true });
SCARD$1.transformArguments = SCARD$1.FIRST_KEY_INDEX = void 0;
SCARD$1.FIRST_KEY_INDEX = 1;
function transformArguments$3Y(key) {
    return ['SCARD', key];
}
SCARD$1.transformArguments = transformArguments$3Y;

var SDIFF$1 = {};

Object.defineProperty(SDIFF$1, "__esModule", { value: true });
SDIFF$1.transformArguments = SDIFF$1.IS_READ_ONLY = SDIFF$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$U = genericTransformers;
SDIFF$1.FIRST_KEY_INDEX = 1;
SDIFF$1.IS_READ_ONLY = true;
function transformArguments$3X(keys) {
    return (0, generic_transformers_1$U.pushVerdictArguments)(['SDIFF'], keys);
}
SDIFF$1.transformArguments = transformArguments$3X;

var SDIFFSTORE$1 = {};

Object.defineProperty(SDIFFSTORE$1, "__esModule", { value: true });
SDIFFSTORE$1.transformArguments = SDIFFSTORE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$T = genericTransformers;
SDIFFSTORE$1.FIRST_KEY_INDEX = 1;
function transformArguments$3W(destination, keys) {
    return (0, generic_transformers_1$T.pushVerdictArguments)(['SDIFFSTORE', destination], keys);
}
SDIFFSTORE$1.transformArguments = transformArguments$3W;

var SET$2 = {};

Object.defineProperty(SET$2, "__esModule", { value: true });
SET$2.transformArguments = SET$2.FIRST_KEY_INDEX = void 0;
SET$2.FIRST_KEY_INDEX = 1;
function transformArguments$3V(key, value, options) {
    const args = [
        'SET',
        key,
        typeof value === 'number' ? value.toString() : value
    ];
    if (options?.EX !== undefined) {
        args.push('EX', options.EX.toString());
    }
    else if (options?.PX !== undefined) {
        args.push('PX', options.PX.toString());
    }
    else if (options?.EXAT !== undefined) {
        args.push('EXAT', options.EXAT.toString());
    }
    else if (options?.PXAT !== undefined) {
        args.push('PXAT', options.PXAT.toString());
    }
    else if (options?.KEEPTTL) {
        args.push('KEEPTTL');
    }
    if (options?.NX) {
        args.push('NX');
    }
    else if (options?.XX) {
        args.push('XX');
    }
    if (options?.GET) {
        args.push('GET');
    }
    return args;
}
SET$2.transformArguments = transformArguments$3V;

var SETBIT$1 = {};

Object.defineProperty(SETBIT$1, "__esModule", { value: true });
SETBIT$1.transformArguments = SETBIT$1.FIRST_KEY_INDEX = void 0;
SETBIT$1.FIRST_KEY_INDEX = 1;
function transformArguments$3U(key, offset, value) {
    return ['SETBIT', key, offset.toString(), value.toString()];
}
SETBIT$1.transformArguments = transformArguments$3U;

var SETEX$1 = {};

Object.defineProperty(SETEX$1, "__esModule", { value: true });
SETEX$1.transformArguments = SETEX$1.FIRST_KEY_INDEX = void 0;
SETEX$1.FIRST_KEY_INDEX = 1;
function transformArguments$3T(key, seconds, value) {
    return [
        'SETEX',
        key,
        seconds.toString(),
        value
    ];
}
SETEX$1.transformArguments = transformArguments$3T;

var SETNX$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, value) {
	    return ['SETNX', key, value];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (SETNX$1));

var SETRANGE$1 = {};

Object.defineProperty(SETRANGE$1, "__esModule", { value: true });
SETRANGE$1.transformArguments = SETRANGE$1.FIRST_KEY_INDEX = void 0;
SETRANGE$1.FIRST_KEY_INDEX = 1;
function transformArguments$3S(key, offset, value) {
    return ['SETRANGE', key, offset.toString(), value];
}
SETRANGE$1.transformArguments = transformArguments$3S;

var SINTER$1 = {};

Object.defineProperty(SINTER$1, "__esModule", { value: true });
SINTER$1.transformArguments = SINTER$1.IS_READ_ONLY = SINTER$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$S = genericTransformers;
SINTER$1.FIRST_KEY_INDEX = 1;
SINTER$1.IS_READ_ONLY = true;
function transformArguments$3R(keys) {
    return (0, generic_transformers_1$S.pushVerdictArguments)(['SINTER'], keys);
}
SINTER$1.transformArguments = transformArguments$3R;

var SINTERCARD$1 = {};

Object.defineProperty(SINTERCARD$1, "__esModule", { value: true });
SINTERCARD$1.transformArguments = SINTERCARD$1.IS_READ_ONLY = SINTERCARD$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$R = genericTransformers;
SINTERCARD$1.FIRST_KEY_INDEX = 2;
SINTERCARD$1.IS_READ_ONLY = true;
function transformArguments$3Q(keys, limit) {
    const args = (0, generic_transformers_1$R.pushVerdictArgument)(['SINTERCARD'], keys);
    if (limit) {
        args.push('LIMIT', limit.toString());
    }
    return args;
}
SINTERCARD$1.transformArguments = transformArguments$3Q;

var SINTERSTORE$1 = {};

Object.defineProperty(SINTERSTORE$1, "__esModule", { value: true });
SINTERSTORE$1.transformArguments = SINTERSTORE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$Q = genericTransformers;
SINTERSTORE$1.FIRST_KEY_INDEX = 1;
function transformArguments$3P(destination, keys) {
    return (0, generic_transformers_1$Q.pushVerdictArguments)(['SINTERSTORE', destination], keys);
}
SINTERSTORE$1.transformArguments = transformArguments$3P;

var SISMEMBER$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, member) {
	    return ['SISMEMBER', key, member];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (SISMEMBER$1));

var SMEMBERS$1 = {};

Object.defineProperty(SMEMBERS$1, "__esModule", { value: true });
SMEMBERS$1.transformArguments = SMEMBERS$1.FIRST_KEY_INDEX = void 0;
SMEMBERS$1.FIRST_KEY_INDEX = 1;
function transformArguments$3O(key) {
    return ['SMEMBERS', key];
}
SMEMBERS$1.transformArguments = transformArguments$3O;

var SMISMEMBER$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, members) {
	    return ['SMISMEMBER', key, ...members];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanArrayReply; } }); 
} (SMISMEMBER$1));

var SMOVE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(source, destination, member) {
	    return ['SMOVE', source, destination, member];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (SMOVE$1));

var SORT_RO$1 = {};

Object.defineProperty(SORT_RO$1, "__esModule", { value: true });
SORT_RO$1.transformArguments = SORT_RO$1.IS_READ_ONLY = SORT_RO$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$P = genericTransformers;
SORT_RO$1.FIRST_KEY_INDEX = 1;
SORT_RO$1.IS_READ_ONLY = true;
function transformArguments$3N(key, options) {
    return (0, generic_transformers_1$P.pushSortArguments)(['SORT_RO', key], options);
}
SORT_RO$1.transformArguments = transformArguments$3N;

var SORT_STORE$1 = {};

var SORT$1 = {};

Object.defineProperty(SORT$1, "__esModule", { value: true });
SORT$1.transformArguments = SORT$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$O = genericTransformers;
SORT$1.FIRST_KEY_INDEX = 1;
function transformArguments$3M(key, options) {
    return (0, generic_transformers_1$O.pushSortArguments)(['SORT', key], options);
}
SORT$1.transformArguments = transformArguments$3M;

Object.defineProperty(SORT_STORE$1, "__esModule", { value: true });
SORT_STORE$1.transformArguments = SORT_STORE$1.FIRST_KEY_INDEX = void 0;
const SORT_1 = SORT$1;
SORT_STORE$1.FIRST_KEY_INDEX = 1;
function transformArguments$3L(source, destination, options) {
    const args = (0, SORT_1.transformArguments)(source, options);
    args.push('STORE', destination);
    return args;
}
SORT_STORE$1.transformArguments = transformArguments$3L;

var SPOP$1 = {};

Object.defineProperty(SPOP$1, "__esModule", { value: true });
SPOP$1.transformArguments = SPOP$1.FIRST_KEY_INDEX = void 0;
SPOP$1.FIRST_KEY_INDEX = 1;
function transformArguments$3K(key, count) {
    const args = ['SPOP', key];
    if (typeof count === 'number') {
        args.push(count.toString());
    }
    return args;
}
SPOP$1.transformArguments = transformArguments$3K;

var SPUBLISH$1 = {};

Object.defineProperty(SPUBLISH$1, "__esModule", { value: true });
SPUBLISH$1.transformArguments = SPUBLISH$1.FIRST_KEY_INDEX = SPUBLISH$1.IS_READ_ONLY = void 0;
SPUBLISH$1.IS_READ_ONLY = true;
SPUBLISH$1.FIRST_KEY_INDEX = 1;
function transformArguments$3J(channel, message) {
    return ['SPUBLISH', channel, message];
}
SPUBLISH$1.transformArguments = transformArguments$3J;

var SRANDMEMBER_COUNT$1 = {};

var SRANDMEMBER$1 = {};

Object.defineProperty(SRANDMEMBER$1, "__esModule", { value: true });
SRANDMEMBER$1.transformArguments = SRANDMEMBER$1.FIRST_KEY_INDEX = void 0;
SRANDMEMBER$1.FIRST_KEY_INDEX = 1;
function transformArguments$3I(key) {
    return ['SRANDMEMBER', key];
}
SRANDMEMBER$1.transformArguments = transformArguments$3I;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const SRANDMEMBER_1 = SRANDMEMBER$1;
	var SRANDMEMBER_2 = SRANDMEMBER$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return SRANDMEMBER_2.FIRST_KEY_INDEX; } });
	function transformArguments(key, count) {
	    return [
	        ...(0, SRANDMEMBER_1.transformArguments)(key),
	        count.toString()
	    ];
	}
	exports.transformArguments = transformArguments; 
} (SRANDMEMBER_COUNT$1));

var SREM$1 = {};

Object.defineProperty(SREM$1, "__esModule", { value: true });
SREM$1.transformArguments = SREM$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$N = genericTransformers;
SREM$1.FIRST_KEY_INDEX = 1;
function transformArguments$3H(key, members) {
    return (0, generic_transformers_1$N.pushVerdictArguments)(['SREM', key], members);
}
SREM$1.transformArguments = transformArguments$3H;

var SSCAN$1 = {};

Object.defineProperty(SSCAN$1, "__esModule", { value: true });
SSCAN$1.transformReply = SSCAN$1.transformArguments = SSCAN$1.IS_READ_ONLY = SSCAN$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$M = genericTransformers;
SSCAN$1.FIRST_KEY_INDEX = 1;
SSCAN$1.IS_READ_ONLY = true;
function transformArguments$3G(key, cursor, options) {
    return (0, generic_transformers_1$M.pushScanArguments)([
        'SSCAN',
        key,
    ], cursor, options);
}
SSCAN$1.transformArguments = transformArguments$3G;
function transformReply$I([cursor, members]) {
    return {
        cursor: Number(cursor),
        members
    };
}
SSCAN$1.transformReply = transformReply$I;

var STRLEN$2 = {};

Object.defineProperty(STRLEN$2, "__esModule", { value: true });
STRLEN$2.transformArguments = STRLEN$2.IS_READ_ONLY = STRLEN$2.FIRST_KEY_INDEX = void 0;
STRLEN$2.FIRST_KEY_INDEX = 1;
STRLEN$2.IS_READ_ONLY = true;
function transformArguments$3F(key) {
    return ['STRLEN', key];
}
STRLEN$2.transformArguments = transformArguments$3F;

var SUNION$1 = {};

Object.defineProperty(SUNION$1, "__esModule", { value: true });
SUNION$1.transformArguments = SUNION$1.IS_READ_ONLY = SUNION$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$L = genericTransformers;
SUNION$1.FIRST_KEY_INDEX = 1;
SUNION$1.IS_READ_ONLY = true;
function transformArguments$3E(keys) {
    return (0, generic_transformers_1$L.pushVerdictArguments)(['SUNION'], keys);
}
SUNION$1.transformArguments = transformArguments$3E;

var SUNIONSTORE$1 = {};

Object.defineProperty(SUNIONSTORE$1, "__esModule", { value: true });
SUNIONSTORE$1.transformArguments = SUNIONSTORE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$K = genericTransformers;
SUNIONSTORE$1.FIRST_KEY_INDEX = 1;
function transformArguments$3D(destination, keys) {
    return (0, generic_transformers_1$K.pushVerdictArguments)(['SUNIONSTORE', destination], keys);
}
SUNIONSTORE$1.transformArguments = transformArguments$3D;

var TOUCH$1 = {};

Object.defineProperty(TOUCH$1, "__esModule", { value: true });
TOUCH$1.transformArguments = TOUCH$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$J = genericTransformers;
TOUCH$1.FIRST_KEY_INDEX = 1;
function transformArguments$3C(key) {
    return (0, generic_transformers_1$J.pushVerdictArguments)(['TOUCH'], key);
}
TOUCH$1.transformArguments = transformArguments$3C;

var TTL$1 = {};

Object.defineProperty(TTL$1, "__esModule", { value: true });
TTL$1.transformArguments = TTL$1.IS_READ_ONLY = TTL$1.FIRST_KEY_INDEX = void 0;
TTL$1.FIRST_KEY_INDEX = 1;
TTL$1.IS_READ_ONLY = true;
function transformArguments$3B(key) {
    return ['TTL', key];
}
TTL$1.transformArguments = transformArguments$3B;

var TYPE$2 = {};

Object.defineProperty(TYPE$2, "__esModule", { value: true });
TYPE$2.transformArguments = TYPE$2.IS_READ_ONLY = TYPE$2.FIRST_KEY_INDEX = void 0;
TYPE$2.FIRST_KEY_INDEX = 1;
TYPE$2.IS_READ_ONLY = true;
function transformArguments$3A(key) {
    return ['TYPE', key];
}
TYPE$2.transformArguments = transformArguments$3A;

var UNLINK$1 = {};

Object.defineProperty(UNLINK$1, "__esModule", { value: true });
UNLINK$1.transformArguments = UNLINK$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$I = genericTransformers;
UNLINK$1.FIRST_KEY_INDEX = 1;
function transformArguments$3z(key) {
    return (0, generic_transformers_1$I.pushVerdictArguments)(['UNLINK'], key);
}
UNLINK$1.transformArguments = transformArguments$3z;

var WATCH$1 = {};

Object.defineProperty(WATCH$1, "__esModule", { value: true });
WATCH$1.transformArguments = WATCH$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$H = genericTransformers;
WATCH$1.FIRST_KEY_INDEX = 1;
function transformArguments$3y(key) {
    return (0, generic_transformers_1$H.pushVerdictArguments)(['WATCH'], key);
}
WATCH$1.transformArguments = transformArguments$3y;

var XACK$1 = {};

Object.defineProperty(XACK$1, "__esModule", { value: true });
XACK$1.transformArguments = XACK$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$G = genericTransformers;
XACK$1.FIRST_KEY_INDEX = 1;
function transformArguments$3x(key, group, id) {
    return (0, generic_transformers_1$G.pushVerdictArguments)(['XACK', key, group], id);
}
XACK$1.transformArguments = transformArguments$3x;

var XADD$1 = {};

Object.defineProperty(XADD$1, "__esModule", { value: true });
XADD$1.transformArguments = XADD$1.FIRST_KEY_INDEX = void 0;
XADD$1.FIRST_KEY_INDEX = 1;
function transformArguments$3w(key, id, message, options) {
    const args = ['XADD', key];
    if (options?.NOMKSTREAM) {
        args.push('NOMKSTREAM');
    }
    if (options?.TRIM) {
        if (options.TRIM.strategy) {
            args.push(options.TRIM.strategy);
        }
        if (options.TRIM.strategyModifier) {
            args.push(options.TRIM.strategyModifier);
        }
        args.push(options.TRIM.threshold.toString());
        if (options.TRIM.limit) {
            args.push('LIMIT', options.TRIM.limit.toString());
        }
    }
    args.push(id);
    for (const [key, value] of Object.entries(message)) {
        args.push(key, value);
    }
    return args;
}
XADD$1.transformArguments = transformArguments$3w;

var XAUTOCLAIM_JUSTID$1 = {};

var XAUTOCLAIM$1 = {};

Object.defineProperty(XAUTOCLAIM$1, "__esModule", { value: true });
XAUTOCLAIM$1.transformReply = XAUTOCLAIM$1.transformArguments = XAUTOCLAIM$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$F = genericTransformers;
XAUTOCLAIM$1.FIRST_KEY_INDEX = 1;
function transformArguments$3v(key, group, consumer, minIdleTime, start, options) {
    const args = ['XAUTOCLAIM', key, group, consumer, minIdleTime.toString(), start];
    if (options?.COUNT) {
        args.push('COUNT', options.COUNT.toString());
    }
    return args;
}
XAUTOCLAIM$1.transformArguments = transformArguments$3v;
function transformReply$H(reply) {
    return {
        nextId: reply[0],
        messages: (0, generic_transformers_1$F.transformStreamMessagesNullReply)(reply[1])
    };
}
XAUTOCLAIM$1.transformReply = transformReply$H;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const XAUTOCLAIM_1 = XAUTOCLAIM$1;
	var XAUTOCLAIM_2 = XAUTOCLAIM$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return XAUTOCLAIM_2.FIRST_KEY_INDEX; } });
	function transformArguments(...args) {
	    return [
	        ...(0, XAUTOCLAIM_1.transformArguments)(...args),
	        'JUSTID'
	    ];
	}
	exports.transformArguments = transformArguments;
	function transformReply(reply) {
	    return {
	        nextId: reply[0],
	        messages: reply[1]
	    };
	}
	exports.transformReply = transformReply; 
} (XAUTOCLAIM_JUSTID$1));

var XCLAIM_JUSTID$1 = {};

var XCLAIM$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, group, consumer, minIdleTime, id, options) {
	    const args = (0, generic_transformers_1.pushVerdictArguments)(['XCLAIM', key, group, consumer, minIdleTime.toString()], id);
	    if (options?.IDLE) {
	        args.push('IDLE', options.IDLE.toString());
	    }
	    if (options?.TIME) {
	        args.push('TIME', (typeof options.TIME === 'number' ? options.TIME : options.TIME.getTime()).toString());
	    }
	    if (options?.RETRYCOUNT) {
	        args.push('RETRYCOUNT', options.RETRYCOUNT.toString());
	    }
	    if (options?.FORCE) {
	        args.push('FORCE');
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_2 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformStreamMessagesNullReply; } }); 
} (XCLAIM$1));

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const XCLAIM_1 = XCLAIM$1;
	var XCLAIM_2 = XCLAIM$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return XCLAIM_2.FIRST_KEY_INDEX; } });
	function transformArguments(...args) {
	    return [
	        ...(0, XCLAIM_1.transformArguments)(...args),
	        'JUSTID'
	    ];
	}
	exports.transformArguments = transformArguments; 
} (XCLAIM_JUSTID$1));

var XDEL$1 = {};

Object.defineProperty(XDEL$1, "__esModule", { value: true });
XDEL$1.transformArguments = XDEL$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$E = genericTransformers;
XDEL$1.FIRST_KEY_INDEX = 1;
function transformArguments$3u(key, id) {
    return (0, generic_transformers_1$E.pushVerdictArguments)(['XDEL', key], id);
}
XDEL$1.transformArguments = transformArguments$3u;

var XGROUP_CREATE$1 = {};

Object.defineProperty(XGROUP_CREATE$1, "__esModule", { value: true });
XGROUP_CREATE$1.transformArguments = XGROUP_CREATE$1.FIRST_KEY_INDEX = void 0;
XGROUP_CREATE$1.FIRST_KEY_INDEX = 2;
function transformArguments$3t(key, group, id, options) {
    const args = ['XGROUP', 'CREATE', key, group, id];
    if (options?.MKSTREAM) {
        args.push('MKSTREAM');
    }
    return args;
}
XGROUP_CREATE$1.transformArguments = transformArguments$3t;

var XGROUP_CREATECONSUMER$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 2;
	function transformArguments(key, group, consumer) {
	    return ['XGROUP', 'CREATECONSUMER', key, group, consumer];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (XGROUP_CREATECONSUMER$1));

var XGROUP_DELCONSUMER$1 = {};

Object.defineProperty(XGROUP_DELCONSUMER$1, "__esModule", { value: true });
XGROUP_DELCONSUMER$1.transformArguments = XGROUP_DELCONSUMER$1.FIRST_KEY_INDEX = void 0;
XGROUP_DELCONSUMER$1.FIRST_KEY_INDEX = 2;
function transformArguments$3s(key, group, consumer) {
    return ['XGROUP', 'DELCONSUMER', key, group, consumer];
}
XGROUP_DELCONSUMER$1.transformArguments = transformArguments$3s;

var XGROUP_DESTROY$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 2;
	function transformArguments(key, group) {
	    return ['XGROUP', 'DESTROY', key, group];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (XGROUP_DESTROY$1));

var XGROUP_SETID$1 = {};

Object.defineProperty(XGROUP_SETID$1, "__esModule", { value: true });
XGROUP_SETID$1.transformArguments = XGROUP_SETID$1.FIRST_KEY_INDEX = void 0;
XGROUP_SETID$1.FIRST_KEY_INDEX = 2;
function transformArguments$3r(key, group, id) {
    return ['XGROUP', 'SETID', key, group, id];
}
XGROUP_SETID$1.transformArguments = transformArguments$3r;

var XINFO_CONSUMERS$1 = {};

Object.defineProperty(XINFO_CONSUMERS$1, "__esModule", { value: true });
XINFO_CONSUMERS$1.transformReply = XINFO_CONSUMERS$1.transformArguments = XINFO_CONSUMERS$1.IS_READ_ONLY = XINFO_CONSUMERS$1.FIRST_KEY_INDEX = void 0;
XINFO_CONSUMERS$1.FIRST_KEY_INDEX = 2;
XINFO_CONSUMERS$1.IS_READ_ONLY = true;
function transformArguments$3q(key, group) {
    return ['XINFO', 'CONSUMERS', key, group];
}
XINFO_CONSUMERS$1.transformArguments = transformArguments$3q;
function transformReply$G(rawReply) {
    return rawReply.map(consumer => ({
        name: consumer[1],
        pending: consumer[3],
        idle: consumer[5],
        inactive: consumer[7]
    }));
}
XINFO_CONSUMERS$1.transformReply = transformReply$G;

var XINFO_GROUPS$1 = {};

Object.defineProperty(XINFO_GROUPS$1, "__esModule", { value: true });
XINFO_GROUPS$1.transformReply = XINFO_GROUPS$1.transformArguments = XINFO_GROUPS$1.IS_READ_ONLY = XINFO_GROUPS$1.FIRST_KEY_INDEX = void 0;
XINFO_GROUPS$1.FIRST_KEY_INDEX = 2;
XINFO_GROUPS$1.IS_READ_ONLY = true;
function transformArguments$3p(key) {
    return ['XINFO', 'GROUPS', key];
}
XINFO_GROUPS$1.transformArguments = transformArguments$3p;
function transformReply$F(rawReply) {
    return rawReply.map(group => ({
        name: group[1],
        consumers: group[3],
        pending: group[5],
        lastDeliveredId: group[7]
    }));
}
XINFO_GROUPS$1.transformReply = transformReply$F;

var XINFO_STREAM$1 = {};

Object.defineProperty(XINFO_STREAM$1, "__esModule", { value: true });
XINFO_STREAM$1.transformReply = XINFO_STREAM$1.transformArguments = XINFO_STREAM$1.IS_READ_ONLY = XINFO_STREAM$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$D = genericTransformers;
XINFO_STREAM$1.FIRST_KEY_INDEX = 2;
XINFO_STREAM$1.IS_READ_ONLY = true;
function transformArguments$3o(key) {
    return ['XINFO', 'STREAM', key];
}
XINFO_STREAM$1.transformArguments = transformArguments$3o;
function transformReply$E(rawReply) {
    const parsedReply = {};
    for (let i = 0; i < rawReply.length; i += 2) {
        switch (rawReply[i]) {
            case 'length':
                parsedReply.length = rawReply[i + 1];
                break;
            case 'radix-tree-keys':
                parsedReply.radixTreeKeys = rawReply[i + 1];
                break;
            case 'radix-tree-nodes':
                parsedReply.radixTreeNodes = rawReply[i + 1];
                break;
            case 'groups':
                parsedReply.groups = rawReply[i + 1];
                break;
            case 'last-generated-id':
                parsedReply.lastGeneratedId = rawReply[i + 1];
                break;
            case 'first-entry':
                parsedReply.firstEntry = rawReply[i + 1] ? {
                    id: rawReply[i + 1][0],
                    message: (0, generic_transformers_1$D.transformTuplesReply)(rawReply[i + 1][1])
                } : null;
                break;
            case 'last-entry':
                parsedReply.lastEntry = rawReply[i + 1] ? {
                    id: rawReply[i + 1][0],
                    message: (0, generic_transformers_1$D.transformTuplesReply)(rawReply[i + 1][1])
                } : null;
                break;
        }
    }
    return parsedReply;
}
XINFO_STREAM$1.transformReply = transformReply$E;

var XLEN$1 = {};

Object.defineProperty(XLEN$1, "__esModule", { value: true });
XLEN$1.transformArguments = XLEN$1.IS_READ_ONLY = XLEN$1.FIRST_KEY_INDEX = void 0;
XLEN$1.FIRST_KEY_INDEX = 1;
XLEN$1.IS_READ_ONLY = true;
function transformArguments$3n(key) {
    return ['XLEN', key];
}
XLEN$1.transformArguments = transformArguments$3n;

var XPENDING_RANGE$1 = {};

Object.defineProperty(XPENDING_RANGE$1, "__esModule", { value: true });
XPENDING_RANGE$1.transformReply = XPENDING_RANGE$1.transformArguments = XPENDING_RANGE$1.IS_READ_ONLY = XPENDING_RANGE$1.FIRST_KEY_INDEX = void 0;
XPENDING_RANGE$1.FIRST_KEY_INDEX = 1;
XPENDING_RANGE$1.IS_READ_ONLY = true;
function transformArguments$3m(key, group, start, end, count, options) {
    const args = ['XPENDING', key, group];
    if (options?.IDLE) {
        args.push('IDLE', options.IDLE.toString());
    }
    args.push(start, end, count.toString());
    if (options?.consumer) {
        args.push(options.consumer);
    }
    return args;
}
XPENDING_RANGE$1.transformArguments = transformArguments$3m;
function transformReply$D(reply) {
    return reply.map(([id, owner, millisecondsSinceLastDelivery, deliveriesCounter]) => ({
        id,
        owner,
        millisecondsSinceLastDelivery,
        deliveriesCounter
    }));
}
XPENDING_RANGE$1.transformReply = transformReply$D;

var XPENDING$1 = {};

Object.defineProperty(XPENDING$1, "__esModule", { value: true });
XPENDING$1.transformReply = XPENDING$1.transformArguments = XPENDING$1.IS_READ_ONLY = XPENDING$1.FIRST_KEY_INDEX = void 0;
XPENDING$1.FIRST_KEY_INDEX = 1;
XPENDING$1.IS_READ_ONLY = true;
function transformArguments$3l(key, group) {
    return ['XPENDING', key, group];
}
XPENDING$1.transformArguments = transformArguments$3l;
function transformReply$C(reply) {
    return {
        pending: reply[0],
        firstId: reply[1],
        lastId: reply[2],
        consumers: reply[3] === null ? null : reply[3].map(([name, deliveriesCounter]) => ({
            name,
            deliveriesCounter: Number(deliveriesCounter)
        }))
    };
}
XPENDING$1.transformReply = transformReply$C;

var XRANGE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	exports.IS_READ_ONLY = true;
	function transformArguments(key, start, end, options) {
	    const args = ['XRANGE', key, start, end];
	    if (options?.COUNT) {
	        args.push('COUNT', options.COUNT.toString());
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformStreamMessagesReply; } }); 
} (XRANGE$1));

var XREAD$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const FIRST_KEY_INDEX = (streams) => {
	    return Array.isArray(streams) ? streams[0].key : streams.key;
	};
	exports.FIRST_KEY_INDEX = FIRST_KEY_INDEX;
	exports.IS_READ_ONLY = true;
	function transformArguments(streams, options) {
	    const args = ['XREAD'];
	    if (options?.COUNT) {
	        args.push('COUNT', options.COUNT.toString());
	    }
	    if (typeof options?.BLOCK === 'number') {
	        args.push('BLOCK', options.BLOCK.toString());
	    }
	    args.push('STREAMS');
	    const streamsArray = Array.isArray(streams) ? streams : [streams], argsLength = args.length;
	    for (let i = 0; i < streamsArray.length; i++) {
	        const stream = streamsArray[i];
	        args[argsLength + i] = stream.key;
	        args[argsLength + streamsArray.length + i] = stream.id;
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformStreamsMessagesReply; } }); 
} (XREAD$1));

var XREADGROUP$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const FIRST_KEY_INDEX = (_group, _consumer, streams) => {
	    return Array.isArray(streams) ? streams[0].key : streams.key;
	};
	exports.FIRST_KEY_INDEX = FIRST_KEY_INDEX;
	exports.IS_READ_ONLY = true;
	function transformArguments(group, consumer, streams, options) {
	    const args = ['XREADGROUP', 'GROUP', group, consumer];
	    if (options?.COUNT) {
	        args.push('COUNT', options.COUNT.toString());
	    }
	    if (typeof options?.BLOCK === 'number') {
	        args.push('BLOCK', options.BLOCK.toString());
	    }
	    if (options?.NOACK) {
	        args.push('NOACK');
	    }
	    args.push('STREAMS');
	    const streamsArray = Array.isArray(streams) ? streams : [streams], argsLength = args.length;
	    for (let i = 0; i < streamsArray.length; i++) {
	        const stream = streamsArray[i];
	        args[argsLength + i] = stream.key;
	        args[argsLength + streamsArray.length + i] = stream.id;
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformStreamsMessagesReply; } }); 
} (XREADGROUP$1));

var XREVRANGE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	exports.IS_READ_ONLY = true;
	function transformArguments(key, start, end, options) {
	    const args = ['XREVRANGE', key, start, end];
	    if (options?.COUNT) {
	        args.push('COUNT', options.COUNT.toString());
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformStreamMessagesReply; } }); 
} (XREVRANGE$1));

var XSETID$1 = {};

Object.defineProperty(XSETID$1, "__esModule", { value: true });
XSETID$1.transformArguments = XSETID$1.FIRST_KEY_INDEX = void 0;
XSETID$1.FIRST_KEY_INDEX = 1;
function transformArguments$3k(key, lastId, options) {
    const args = ['XSETID', key, lastId];
    if (options?.ENTRIESADDED) {
        args.push('ENTRIESADDED', options.ENTRIESADDED.toString());
    }
    if (options?.MAXDELETEDID) {
        args.push('MAXDELETEDID', options.MAXDELETEDID);
    }
    return args;
}
XSETID$1.transformArguments = transformArguments$3k;

var XTRIM$1 = {};

Object.defineProperty(XTRIM$1, "__esModule", { value: true });
XTRIM$1.transformArguments = XTRIM$1.FIRST_KEY_INDEX = void 0;
XTRIM$1.FIRST_KEY_INDEX = 1;
function transformArguments$3j(key, strategy, threshold, options) {
    const args = ['XTRIM', key, strategy];
    if (options?.strategyModifier) {
        args.push(options.strategyModifier);
    }
    args.push(threshold.toString());
    if (options?.LIMIT) {
        args.push('LIMIT', options.LIMIT.toString());
    }
    return args;
}
XTRIM$1.transformArguments = transformArguments$3j;

var ZADD$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, members, options) {
	    const args = ['ZADD', key];
	    if (options?.NX) {
	        args.push('NX');
	    }
	    else {
	        if (options?.XX) {
	            args.push('XX');
	        }
	        if (options?.GT) {
	            args.push('GT');
	        }
	        else if (options?.LT) {
	            args.push('LT');
	        }
	    }
	    if (options?.CH) {
	        args.push('CH');
	    }
	    if (options?.INCR) {
	        args.push('INCR');
	    }
	    for (const { score, value } of (Array.isArray(members) ? members : [members])) {
	        args.push((0, generic_transformers_1.transformNumberInfinityArgument)(score), value);
	    }
	    return args;
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_2 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformNumberInfinityReply; } }); 
} (ZADD$1));

var ZCARD$1 = {};

Object.defineProperty(ZCARD$1, "__esModule", { value: true });
ZCARD$1.transformArguments = ZCARD$1.IS_READ_ONLY = ZCARD$1.FIRST_KEY_INDEX = void 0;
ZCARD$1.FIRST_KEY_INDEX = 1;
ZCARD$1.IS_READ_ONLY = true;
function transformArguments$3i(key) {
    return ['ZCARD', key];
}
ZCARD$1.transformArguments = transformArguments$3i;

var ZCOUNT$1 = {};

Object.defineProperty(ZCOUNT$1, "__esModule", { value: true });
ZCOUNT$1.transformArguments = ZCOUNT$1.IS_READ_ONLY = ZCOUNT$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$C = genericTransformers;
ZCOUNT$1.FIRST_KEY_INDEX = 1;
ZCOUNT$1.IS_READ_ONLY = true;
function transformArguments$3h(key, min, max) {
    return [
        'ZCOUNT',
        key,
        (0, generic_transformers_1$C.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1$C.transformStringNumberInfinityArgument)(max)
    ];
}
ZCOUNT$1.transformArguments = transformArguments$3h;

var ZDIFF_WITHSCORES$1 = {};

var ZDIFF$1 = {};

Object.defineProperty(ZDIFF$1, "__esModule", { value: true });
ZDIFF$1.transformArguments = ZDIFF$1.IS_READ_ONLY = ZDIFF$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$B = genericTransformers;
ZDIFF$1.FIRST_KEY_INDEX = 2;
ZDIFF$1.IS_READ_ONLY = true;
function transformArguments$3g(keys) {
    return (0, generic_transformers_1$B.pushVerdictArgument)(['ZDIFF'], keys);
}
ZDIFF$1.transformArguments = transformArguments$3g;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const ZDIFF_1 = ZDIFF$1;
	var ZDIFF_2 = ZDIFF$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return ZDIFF_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return ZDIFF_2.IS_READ_ONLY; } });
	function transformArguments(...args) {
	    return [
	        ...(0, ZDIFF_1.transformArguments)(...args),
	        'WITHSCORES'
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformSortedSetWithScoresReply; } }); 
} (ZDIFF_WITHSCORES$1));

var ZDIFFSTORE$1 = {};

Object.defineProperty(ZDIFFSTORE$1, "__esModule", { value: true });
ZDIFFSTORE$1.transformArguments = ZDIFFSTORE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$A = genericTransformers;
ZDIFFSTORE$1.FIRST_KEY_INDEX = 1;
function transformArguments$3f(destination, keys) {
    return (0, generic_transformers_1$A.pushVerdictArgument)(['ZDIFFSTORE', destination], keys);
}
ZDIFFSTORE$1.transformArguments = transformArguments$3f;

var ZINCRBY$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, increment, member) {
	    return [
	        'ZINCRBY',
	        key,
	        (0, generic_transformers_1.transformNumberInfinityArgument)(increment),
	        member
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_2 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformNumberInfinityReply; } }); 
} (ZINCRBY$1));

var ZINTER_WITHSCORES$1 = {};

var ZINTER$1 = {};

Object.defineProperty(ZINTER$1, "__esModule", { value: true });
ZINTER$1.transformArguments = ZINTER$1.IS_READ_ONLY = ZINTER$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$z = genericTransformers;
ZINTER$1.FIRST_KEY_INDEX = 2;
ZINTER$1.IS_READ_ONLY = true;
function transformArguments$3e(keys, options) {
    const args = (0, generic_transformers_1$z.pushVerdictArgument)(['ZINTER'], keys);
    if (options?.WEIGHTS) {
        args.push('WEIGHTS', ...options.WEIGHTS.map(weight => weight.toString()));
    }
    if (options?.AGGREGATE) {
        args.push('AGGREGATE', options.AGGREGATE);
    }
    return args;
}
ZINTER$1.transformArguments = transformArguments$3e;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const ZINTER_1 = ZINTER$1;
	var ZINTER_2 = ZINTER$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return ZINTER_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return ZINTER_2.IS_READ_ONLY; } });
	function transformArguments(...args) {
	    return [
	        ...(0, ZINTER_1.transformArguments)(...args),
	        'WITHSCORES'
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformSortedSetWithScoresReply; } }); 
} (ZINTER_WITHSCORES$1));

var ZINTERCARD$1 = {};

Object.defineProperty(ZINTERCARD$1, "__esModule", { value: true });
ZINTERCARD$1.transformArguments = ZINTERCARD$1.IS_READ_ONLY = ZINTERCARD$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$y = genericTransformers;
ZINTERCARD$1.FIRST_KEY_INDEX = 2;
ZINTERCARD$1.IS_READ_ONLY = true;
function transformArguments$3d(keys, limit) {
    const args = (0, generic_transformers_1$y.pushVerdictArgument)(['ZINTERCARD'], keys);
    if (limit) {
        args.push('LIMIT', limit.toString());
    }
    return args;
}
ZINTERCARD$1.transformArguments = transformArguments$3d;

var ZINTERSTORE$1 = {};

Object.defineProperty(ZINTERSTORE$1, "__esModule", { value: true });
ZINTERSTORE$1.transformArguments = ZINTERSTORE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$x = genericTransformers;
ZINTERSTORE$1.FIRST_KEY_INDEX = 1;
function transformArguments$3c(destination, keys, options) {
    const args = (0, generic_transformers_1$x.pushVerdictArgument)(['ZINTERSTORE', destination], keys);
    if (options?.WEIGHTS) {
        args.push('WEIGHTS', ...options.WEIGHTS.map(weight => weight.toString()));
    }
    if (options?.AGGREGATE) {
        args.push('AGGREGATE', options.AGGREGATE);
    }
    return args;
}
ZINTERSTORE$1.transformArguments = transformArguments$3c;

var ZLEXCOUNT$1 = {};

Object.defineProperty(ZLEXCOUNT$1, "__esModule", { value: true });
ZLEXCOUNT$1.transformArguments = ZLEXCOUNT$1.IS_READ_ONLY = ZLEXCOUNT$1.FIRST_KEY_INDEX = void 0;
ZLEXCOUNT$1.FIRST_KEY_INDEX = 1;
ZLEXCOUNT$1.IS_READ_ONLY = true;
function transformArguments$3b(key, min, max) {
    return [
        'ZLEXCOUNT',
        key,
        min,
        max
    ];
}
ZLEXCOUNT$1.transformArguments = transformArguments$3b;

var ZMSCORE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 1;
	exports.IS_READ_ONLY = true;
	function transformArguments(key, member) {
	    return (0, generic_transformers_1.pushVerdictArguments)(['ZMSCORE', key], member);
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_2 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformNumberInfinityNullArrayReply; } }); 
} (ZMSCORE$1));

var ZPOPMAX_COUNT$1 = {};

var ZPOPMAX$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key) {
	    return [
	        'ZPOPMAX',
	        key
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformSortedSetMemberNullReply; } }); 
} (ZPOPMAX$1));

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const ZPOPMAX_1 = ZPOPMAX$1;
	var ZPOPMAX_2 = ZPOPMAX$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return ZPOPMAX_2.FIRST_KEY_INDEX; } });
	function transformArguments(key, count) {
	    return [
	        ...(0, ZPOPMAX_1.transformArguments)(key),
	        count.toString()
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformSortedSetWithScoresReply; } }); 
} (ZPOPMAX_COUNT$1));

var ZPOPMIN_COUNT$1 = {};

var ZPOPMIN$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key) {
	    return [
	        'ZPOPMIN',
	        key
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformSortedSetMemberNullReply; } }); 
} (ZPOPMIN$1));

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const ZPOPMIN_1 = ZPOPMIN$1;
	var ZPOPMIN_2 = ZPOPMIN$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return ZPOPMIN_2.FIRST_KEY_INDEX; } });
	function transformArguments(key, count) {
	    return [
	        ...(0, ZPOPMIN_1.transformArguments)(key),
	        count.toString()
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformSortedSetWithScoresReply; } }); 
} (ZPOPMIN_COUNT$1));

var ZRANDMEMBER_COUNT_WITHSCORES$1 = {};

var ZRANDMEMBER_COUNT$1 = {};

var ZRANDMEMBER$1 = {};

Object.defineProperty(ZRANDMEMBER$1, "__esModule", { value: true });
ZRANDMEMBER$1.transformArguments = ZRANDMEMBER$1.IS_READ_ONLY = ZRANDMEMBER$1.FIRST_KEY_INDEX = void 0;
ZRANDMEMBER$1.FIRST_KEY_INDEX = 1;
ZRANDMEMBER$1.IS_READ_ONLY = true;
function transformArguments$3a(key) {
    return ['ZRANDMEMBER', key];
}
ZRANDMEMBER$1.transformArguments = transformArguments$3a;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const ZRANDMEMBER_1 = ZRANDMEMBER$1;
	var ZRANDMEMBER_2 = ZRANDMEMBER$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return ZRANDMEMBER_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return ZRANDMEMBER_2.IS_READ_ONLY; } });
	function transformArguments(key, count) {
	    return [
	        ...(0, ZRANDMEMBER_1.transformArguments)(key),
	        count.toString()
	    ];
	}
	exports.transformArguments = transformArguments; 
} (ZRANDMEMBER_COUNT$1));

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const ZRANDMEMBER_COUNT_1 = ZRANDMEMBER_COUNT$1;
	var ZRANDMEMBER_COUNT_2 = ZRANDMEMBER_COUNT$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return ZRANDMEMBER_COUNT_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return ZRANDMEMBER_COUNT_2.IS_READ_ONLY; } });
	function transformArguments(...args) {
	    return [
	        ...(0, ZRANDMEMBER_COUNT_1.transformArguments)(...args),
	        'WITHSCORES'
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformSortedSetWithScoresReply; } }); 
} (ZRANDMEMBER_COUNT_WITHSCORES$1));

var ZRANGE_WITHSCORES$1 = {};

var ZRANGE$1 = {};

Object.defineProperty(ZRANGE$1, "__esModule", { value: true });
ZRANGE$1.transformArguments = ZRANGE$1.IS_READ_ONLY = ZRANGE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$w = genericTransformers;
ZRANGE$1.FIRST_KEY_INDEX = 1;
ZRANGE$1.IS_READ_ONLY = true;
function transformArguments$39(key, min, max, options) {
    const args = [
        'ZRANGE',
        key,
        (0, generic_transformers_1$w.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1$w.transformStringNumberInfinityArgument)(max)
    ];
    switch (options?.BY) {
        case 'SCORE':
            args.push('BYSCORE');
            break;
        case 'LEX':
            args.push('BYLEX');
            break;
    }
    if (options?.REV) {
        args.push('REV');
    }
    if (options?.LIMIT) {
        args.push('LIMIT', options.LIMIT.offset.toString(), options.LIMIT.count.toString());
    }
    return args;
}
ZRANGE$1.transformArguments = transformArguments$39;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const ZRANGE_1 = ZRANGE$1;
	var ZRANGE_2 = ZRANGE$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return ZRANGE_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return ZRANGE_2.IS_READ_ONLY; } });
	function transformArguments(...args) {
	    return [
	        ...(0, ZRANGE_1.transformArguments)(...args),
	        'WITHSCORES'
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformSortedSetWithScoresReply; } }); 
} (ZRANGE_WITHSCORES$1));

var ZRANGEBYLEX$1 = {};

Object.defineProperty(ZRANGEBYLEX$1, "__esModule", { value: true });
ZRANGEBYLEX$1.transformArguments = ZRANGEBYLEX$1.IS_READ_ONLY = ZRANGEBYLEX$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$v = genericTransformers;
ZRANGEBYLEX$1.FIRST_KEY_INDEX = 1;
ZRANGEBYLEX$1.IS_READ_ONLY = true;
function transformArguments$38(key, min, max, options) {
    const args = [
        'ZRANGEBYLEX',
        key,
        (0, generic_transformers_1$v.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1$v.transformStringNumberInfinityArgument)(max)
    ];
    if (options?.LIMIT) {
        args.push('LIMIT', options.LIMIT.offset.toString(), options.LIMIT.count.toString());
    }
    return args;
}
ZRANGEBYLEX$1.transformArguments = transformArguments$38;

var ZRANGEBYSCORE_WITHSCORES$1 = {};

var ZRANGEBYSCORE$1 = {};

Object.defineProperty(ZRANGEBYSCORE$1, "__esModule", { value: true });
ZRANGEBYSCORE$1.transformArguments = ZRANGEBYSCORE$1.IS_READ_ONLY = ZRANGEBYSCORE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$u = genericTransformers;
ZRANGEBYSCORE$1.FIRST_KEY_INDEX = 1;
ZRANGEBYSCORE$1.IS_READ_ONLY = true;
function transformArguments$37(key, min, max, options) {
    const args = [
        'ZRANGEBYSCORE',
        key,
        (0, generic_transformers_1$u.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1$u.transformStringNumberInfinityArgument)(max)
    ];
    if (options?.LIMIT) {
        args.push('LIMIT', options.LIMIT.offset.toString(), options.LIMIT.count.toString());
    }
    return args;
}
ZRANGEBYSCORE$1.transformArguments = transformArguments$37;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const ZRANGEBYSCORE_1 = ZRANGEBYSCORE$1;
	var ZRANGEBYSCORE_2 = ZRANGEBYSCORE$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return ZRANGEBYSCORE_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return ZRANGEBYSCORE_2.IS_READ_ONLY; } });
	function transformArguments(key, min, max, options) {
	    return [
	        ...(0, ZRANGEBYSCORE_1.transformArguments)(key, min, max, options),
	        'WITHSCORES'
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformSortedSetWithScoresReply; } }); 
} (ZRANGEBYSCORE_WITHSCORES$1));

var ZRANGESTORE$1 = {};

Object.defineProperty(ZRANGESTORE$1, "__esModule", { value: true });
ZRANGESTORE$1.transformReply = ZRANGESTORE$1.transformArguments = ZRANGESTORE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$t = genericTransformers;
ZRANGESTORE$1.FIRST_KEY_INDEX = 1;
function transformArguments$36(dst, src, min, max, options) {
    const args = [
        'ZRANGESTORE',
        dst,
        src,
        (0, generic_transformers_1$t.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1$t.transformStringNumberInfinityArgument)(max)
    ];
    switch (options?.BY) {
        case 'SCORE':
            args.push('BYSCORE');
            break;
        case 'LEX':
            args.push('BYLEX');
            break;
    }
    if (options?.REV) {
        args.push('REV');
    }
    if (options?.LIMIT) {
        args.push('LIMIT', options.LIMIT.offset.toString(), options.LIMIT.count.toString());
    }
    if (options?.WITHSCORES) {
        args.push('WITHSCORES');
    }
    return args;
}
ZRANGESTORE$1.transformArguments = transformArguments$36;
function transformReply$B(reply) {
    if (typeof reply !== 'number') {
        throw new TypeError(`Upgrade to Redis 6.2.5 and up (https://github.com/redis/redis/pull/9089)`);
    }
    return reply;
}
ZRANGESTORE$1.transformReply = transformReply$B;

var ZRANK$1 = {};

Object.defineProperty(ZRANK$1, "__esModule", { value: true });
ZRANK$1.transformArguments = ZRANK$1.IS_READ_ONLY = ZRANK$1.FIRST_KEY_INDEX = void 0;
ZRANK$1.FIRST_KEY_INDEX = 1;
ZRANK$1.IS_READ_ONLY = true;
function transformArguments$35(key, member) {
    return ['ZRANK', key, member];
}
ZRANK$1.transformArguments = transformArguments$35;

var ZREM$1 = {};

Object.defineProperty(ZREM$1, "__esModule", { value: true });
ZREM$1.transformArguments = ZREM$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$s = genericTransformers;
ZREM$1.FIRST_KEY_INDEX = 1;
function transformArguments$34(key, member) {
    return (0, generic_transformers_1$s.pushVerdictArguments)(['ZREM', key], member);
}
ZREM$1.transformArguments = transformArguments$34;

var ZREMRANGEBYLEX$1 = {};

Object.defineProperty(ZREMRANGEBYLEX$1, "__esModule", { value: true });
ZREMRANGEBYLEX$1.transformArguments = ZREMRANGEBYLEX$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$r = genericTransformers;
ZREMRANGEBYLEX$1.FIRST_KEY_INDEX = 1;
function transformArguments$33(key, min, max) {
    return [
        'ZREMRANGEBYLEX',
        key,
        (0, generic_transformers_1$r.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1$r.transformStringNumberInfinityArgument)(max)
    ];
}
ZREMRANGEBYLEX$1.transformArguments = transformArguments$33;

var ZREMRANGEBYRANK$1 = {};

Object.defineProperty(ZREMRANGEBYRANK$1, "__esModule", { value: true });
ZREMRANGEBYRANK$1.transformArguments = ZREMRANGEBYRANK$1.FIRST_KEY_INDEX = void 0;
ZREMRANGEBYRANK$1.FIRST_KEY_INDEX = 1;
function transformArguments$32(key, start, stop) {
    return ['ZREMRANGEBYRANK', key, start.toString(), stop.toString()];
}
ZREMRANGEBYRANK$1.transformArguments = transformArguments$32;

var ZREMRANGEBYSCORE$1 = {};

Object.defineProperty(ZREMRANGEBYSCORE$1, "__esModule", { value: true });
ZREMRANGEBYSCORE$1.transformArguments = ZREMRANGEBYSCORE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$q = genericTransformers;
ZREMRANGEBYSCORE$1.FIRST_KEY_INDEX = 1;
function transformArguments$31(key, min, max) {
    return [
        'ZREMRANGEBYSCORE',
        key,
        (0, generic_transformers_1$q.transformStringNumberInfinityArgument)(min),
        (0, generic_transformers_1$q.transformStringNumberInfinityArgument)(max)
    ];
}
ZREMRANGEBYSCORE$1.transformArguments = transformArguments$31;

var ZREVRANK$1 = {};

Object.defineProperty(ZREVRANK$1, "__esModule", { value: true });
ZREVRANK$1.transformArguments = ZREVRANK$1.IS_READ_ONLY = ZREVRANK$1.FIRST_KEY_INDEX = void 0;
ZREVRANK$1.FIRST_KEY_INDEX = 1;
ZREVRANK$1.IS_READ_ONLY = true;
function transformArguments$30(key, member) {
    return ['ZREVRANK', key, member];
}
ZREVRANK$1.transformArguments = transformArguments$30;

var ZSCAN$1 = {};

Object.defineProperty(ZSCAN$1, "__esModule", { value: true });
ZSCAN$1.transformReply = ZSCAN$1.transformArguments = ZSCAN$1.IS_READ_ONLY = ZSCAN$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$p = genericTransformers;
ZSCAN$1.FIRST_KEY_INDEX = 1;
ZSCAN$1.IS_READ_ONLY = true;
function transformArguments$2$(key, cursor, options) {
    return (0, generic_transformers_1$p.pushScanArguments)([
        'ZSCAN',
        key
    ], cursor, options);
}
ZSCAN$1.transformArguments = transformArguments$2$;
function transformReply$A([cursor, rawMembers]) {
    const parsedMembers = [];
    for (let i = 0; i < rawMembers.length; i += 2) {
        parsedMembers.push({
            value: rawMembers[i],
            score: (0, generic_transformers_1$p.transformNumberInfinityReply)(rawMembers[i + 1])
        });
    }
    return {
        cursor: Number(cursor),
        members: parsedMembers
    };
}
ZSCAN$1.transformReply = transformReply$A;

var ZSCORE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	exports.IS_READ_ONLY = true;
	function transformArguments(key, member) {
	    return ['ZSCORE', key, member];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformNumberInfinityNullReply; } }); 
} (ZSCORE$1));

var ZUNION_WITHSCORES$1 = {};

var ZUNION$1 = {};

Object.defineProperty(ZUNION$1, "__esModule", { value: true });
ZUNION$1.transformArguments = ZUNION$1.IS_READ_ONLY = ZUNION$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$o = genericTransformers;
ZUNION$1.FIRST_KEY_INDEX = 2;
ZUNION$1.IS_READ_ONLY = true;
function transformArguments$2_(keys, options) {
    const args = (0, generic_transformers_1$o.pushVerdictArgument)(['ZUNION'], keys);
    if (options?.WEIGHTS) {
        args.push('WEIGHTS', ...options.WEIGHTS.map(weight => weight.toString()));
    }
    if (options?.AGGREGATE) {
        args.push('AGGREGATE', options.AGGREGATE);
    }
    return args;
}
ZUNION$1.transformArguments = transformArguments$2_;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	const ZUNION_1 = ZUNION$1;
	var ZUNION_2 = ZUNION$1;
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return ZUNION_2.FIRST_KEY_INDEX; } });
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return ZUNION_2.IS_READ_ONLY; } });
	function transformArguments(...args) {
	    return [
	        ...(0, ZUNION_1.transformArguments)(...args),
	        'WITHSCORES'
	    ];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformSortedSetWithScoresReply; } }); 
} (ZUNION_WITHSCORES$1));

var ZUNIONSTORE$1 = {};

Object.defineProperty(ZUNIONSTORE$1, "__esModule", { value: true });
ZUNIONSTORE$1.transformArguments = ZUNIONSTORE$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$n = genericTransformers;
ZUNIONSTORE$1.FIRST_KEY_INDEX = 1;
function transformArguments$2Z(destination, keys, options) {
    const args = (0, generic_transformers_1$n.pushVerdictArgument)(['ZUNIONSTORE', destination], keys);
    if (options?.WEIGHTS) {
        args.push('WEIGHTS', ...options.WEIGHTS.map(weight => weight.toString()));
    }
    if (options?.AGGREGATE) {
        args.push('AGGREGATE', options.AGGREGATE);
    }
    return args;
}
ZUNIONSTORE$1.transformArguments = transformArguments$2Z;

Object.defineProperty(commands$5, "__esModule", { value: true });
const APPEND = APPEND$1;
const BITCOUNT = BITCOUNT$1;
const BITFIELD_RO = BITFIELD_RO$1;
const BITFIELD = BITFIELD$1;
const BITOP = BITOP$1;
const BITPOS = BITPOS$1;
const BLMOVE = BLMOVE$1;
const BLMPOP = BLMPOP$1;
const BLPOP = BLPOP$1;
const BRPOP = BRPOP$1;
const BRPOPLPUSH = BRPOPLPUSH$1;
const BZMPOP = BZMPOP$1;
const BZPOPMAX = BZPOPMAX$1;
const BZPOPMIN = BZPOPMIN$1;
const COPY = COPY$1;
const DECR = DECR$1;
const DECRBY$1 = DECRBY$2;
const DEL$3 = DEL$4;
const DUMP = DUMP$1;
const EVAL_RO = EVAL_RO$1;
const EVAL = EVAL$1;
const EVALSHA_RO = EVALSHA_RO$1;
const EVALSHA = EVALSHA$1;
const EXISTS$3 = EXISTS$4;
const EXPIRE = EXPIRE$1;
const EXPIREAT = EXPIREAT$1;
const EXPIRETIME = EXPIRETIME$1;
const FCALL_RO = FCALL_RO$1;
const FCALL = FCALL$1;
const GEOADD = GEOADD$1;
const GEODIST = GEODIST$1;
const GEOHASH = GEOHASH$1;
const GEOPOS = GEOPOS$1;
const GEORADIUS_RO_WITH = GEORADIUS_RO_WITH$1;
const GEORADIUS_RO = GEORADIUS_RO$1;
const GEORADIUS_WITH = GEORADIUS_WITH$1;
const GEORADIUS = GEORADIUS$1;
const GEORADIUSBYMEMBER_RO_WITH = GEORADIUSBYMEMBER_RO_WITH$1;
const GEORADIUSBYMEMBER_RO = GEORADIUSBYMEMBER_RO$1;
const GEORADIUSBYMEMBER_WITH = GEORADIUSBYMEMBER_WITH$1;
const GEORADIUSBYMEMBER = GEORADIUSBYMEMBER$1;
const GEORADIUSBYMEMBERSTORE = GEORADIUSBYMEMBERSTORE$1;
const GEORADIUSSTORE = GEORADIUSSTORE$1;
const GEOSEARCH_WITH = GEOSEARCH_WITH$1;
const GEOSEARCH = GEOSEARCH$1;
const GEOSEARCHSTORE = GEOSEARCHSTORE$1;
const GET$2 = GET$3;
const GETBIT = GETBIT$1;
const GETDEL = GETDEL$1;
const GETEX = GETEX$1;
const GETRANGE = GETRANGE$1;
const GETSET = GETSET$1;
const HDEL = HDEL$1;
const HEXISTS = HEXISTS$1;
const HEXPIRE = HEXPIRE$1;
const HEXPIREAT = HEXPIREAT$1;
const HEXPIRETIME = HEXPIRETIME$1;
const HGET = HGET$1;
const HGETALL = HGETALL$1;
const HINCRBY = HINCRBY$1;
const HINCRBYFLOAT = HINCRBYFLOAT$1;
const HKEYS = HKEYS$1;
const HLEN = HLEN$1;
const HMGET = HMGET$1;
const HPERSIST = HPERSIST$1;
const HPEXPIRE = HPEXPIRE$1;
const HPEXPIREAT = HPEXPIREAT$1;
const HPEXPIRETIME = HPEXPIRETIME$1;
const HPTTL = HPTTL$1;
const HRANDFIELD_COUNT_WITHVALUES = HRANDFIELD_COUNT_WITHVALUES$1;
const HRANDFIELD_COUNT = HRANDFIELD_COUNT$1;
const HRANDFIELD = HRANDFIELD$1;
const HSCAN = HSCAN$1;
const HSCAN_NOVALUES = HSCAN_NOVALUES$1;
const HSET = HSET$1;
const HSETNX = HSETNX$1;
const HSTRLEN = HSTRLEN$1;
const HTTL = HTTL$1;
const HVALS = HVALS$1;
const INCR = INCR$1;
const INCRBY$5 = INCRBY$6;
const INCRBYFLOAT = INCRBYFLOAT$1;
const LCS_IDX_WITHMATCHLEN = LCS_IDX_WITHMATCHLEN$1;
const LCS_IDX = LCS_IDX$1;
const LCS_LEN = LCS_LEN$1;
const LCS = LCS$1;
const LINDEX = LINDEX$1;
const LINSERT = LINSERT$1;
const LLEN = LLEN$1;
const LMOVE = LMOVE$1;
const LMPOP = LMPOP$1;
const LPOP_COUNT = LPOP_COUNT$1;
const LPOP = LPOP$1;
const LPOS_COUNT = LPOS_COUNT$1;
const LPOS = LPOS$1;
const LPUSH = LPUSH$1;
const LPUSHX = LPUSHX$1;
const LRANGE = LRANGE$1;
const LREM = LREM$1;
const LSET = LSET$1;
const LTRIM = LTRIM$1;
const MGET$2 = MGET$3;
const MIGRATE = MIGRATE$1;
const MSET$1 = MSET$2;
const MSETNX = MSETNX$1;
const OBJECT_ENCODING = OBJECT_ENCODING$1;
const OBJECT_FREQ = OBJECT_FREQ$1;
const OBJECT_IDLETIME = OBJECT_IDLETIME$1;
const OBJECT_REFCOUNT = OBJECT_REFCOUNT$1;
const PERSIST = PERSIST$1;
const PEXPIRE = PEXPIRE$1;
const PEXPIREAT = PEXPIREAT$1;
const PEXPIRETIME = PEXPIRETIME$1;
const PFADD = PFADD$1;
const PFCOUNT = PFCOUNT$1;
const PFMERGE = PFMERGE$1;
const PSETEX = PSETEX$1;
const PTTL = PTTL$1;
const PUBLISH = PUBLISH$1;
const RENAME = RENAME$1;
const RENAMENX = RENAMENX$1;
const RESTORE = RESTORE$1;
const RPOP_COUNT = RPOP_COUNT$1;
const RPOP = RPOP$1;
const RPOPLPUSH = RPOPLPUSH$1;
const RPUSH = RPUSH$1;
const RPUSHX = RPUSHX$1;
const SADD = SADD$1;
const SCARD = SCARD$1;
const SDIFF = SDIFF$1;
const SDIFFSTORE = SDIFFSTORE$1;
const SET$1 = SET$2;
const SETBIT = SETBIT$1;
const SETEX = SETEX$1;
const SETNX = SETNX$1;
const SETRANGE = SETRANGE$1;
const SINTER = SINTER$1;
const SINTERCARD = SINTERCARD$1;
const SINTERSTORE = SINTERSTORE$1;
const SISMEMBER = SISMEMBER$1;
const SMEMBERS = SMEMBERS$1;
const SMISMEMBER = SMISMEMBER$1;
const SMOVE = SMOVE$1;
const SORT_RO = SORT_RO$1;
const SORT_STORE = SORT_STORE$1;
const SORT = SORT$1;
const SPOP = SPOP$1;
const SPUBLISH = SPUBLISH$1;
const SRANDMEMBER_COUNT = SRANDMEMBER_COUNT$1;
const SRANDMEMBER = SRANDMEMBER$1;
const SREM = SREM$1;
const SSCAN = SSCAN$1;
const STRLEN$1 = STRLEN$2;
const SUNION = SUNION$1;
const SUNIONSTORE = SUNIONSTORE$1;
const TOUCH = TOUCH$1;
const TTL = TTL$1;
const TYPE$1 = TYPE$2;
const UNLINK = UNLINK$1;
const WATCH = WATCH$1;
const XACK = XACK$1;
const XADD = XADD$1;
const XAUTOCLAIM_JUSTID = XAUTOCLAIM_JUSTID$1;
const XAUTOCLAIM = XAUTOCLAIM$1;
const XCLAIM_JUSTID = XCLAIM_JUSTID$1;
const XCLAIM = XCLAIM$1;
const XDEL = XDEL$1;
const XGROUP_CREATE = XGROUP_CREATE$1;
const XGROUP_CREATECONSUMER = XGROUP_CREATECONSUMER$1;
const XGROUP_DELCONSUMER = XGROUP_DELCONSUMER$1;
const XGROUP_DESTROY = XGROUP_DESTROY$1;
const XGROUP_SETID = XGROUP_SETID$1;
const XINFO_CONSUMERS = XINFO_CONSUMERS$1;
const XINFO_GROUPS = XINFO_GROUPS$1;
const XINFO_STREAM = XINFO_STREAM$1;
const XLEN = XLEN$1;
const XPENDING_RANGE = XPENDING_RANGE$1;
const XPENDING = XPENDING$1;
const XRANGE = XRANGE$1;
const XREAD = XREAD$1;
const XREADGROUP = XREADGROUP$1;
const XREVRANGE = XREVRANGE$1;
const XSETID = XSETID$1;
const XTRIM = XTRIM$1;
const ZADD = ZADD$1;
const ZCARD = ZCARD$1;
const ZCOUNT = ZCOUNT$1;
const ZDIFF_WITHSCORES = ZDIFF_WITHSCORES$1;
const ZDIFF = ZDIFF$1;
const ZDIFFSTORE = ZDIFFSTORE$1;
const ZINCRBY = ZINCRBY$1;
const ZINTER_WITHSCORES = ZINTER_WITHSCORES$1;
const ZINTER = ZINTER$1;
const ZINTERCARD = ZINTERCARD$1;
const ZINTERSTORE = ZINTERSTORE$1;
const ZLEXCOUNT = ZLEXCOUNT$1;
const ZMPOP = ZMPOP$1;
const ZMSCORE = ZMSCORE$1;
const ZPOPMAX_COUNT = ZPOPMAX_COUNT$1;
const ZPOPMAX = ZPOPMAX$1;
const ZPOPMIN_COUNT = ZPOPMIN_COUNT$1;
const ZPOPMIN = ZPOPMIN$1;
const ZRANDMEMBER_COUNT_WITHSCORES = ZRANDMEMBER_COUNT_WITHSCORES$1;
const ZRANDMEMBER_COUNT = ZRANDMEMBER_COUNT$1;
const ZRANDMEMBER = ZRANDMEMBER$1;
const ZRANGE_WITHSCORES = ZRANGE_WITHSCORES$1;
const ZRANGE = ZRANGE$1;
const ZRANGEBYLEX = ZRANGEBYLEX$1;
const ZRANGEBYSCORE_WITHSCORES = ZRANGEBYSCORE_WITHSCORES$1;
const ZRANGEBYSCORE = ZRANGEBYSCORE$1;
const ZRANGESTORE = ZRANGESTORE$1;
const ZRANK = ZRANK$1;
const ZREM = ZREM$1;
const ZREMRANGEBYLEX = ZREMRANGEBYLEX$1;
const ZREMRANGEBYRANK = ZREMRANGEBYRANK$1;
const ZREMRANGEBYSCORE = ZREMRANGEBYSCORE$1;
const ZREVRANK = ZREVRANK$1;
const ZSCAN = ZSCAN$1;
const ZSCORE = ZSCORE$1;
const ZUNION_WITHSCORES = ZUNION_WITHSCORES$1;
const ZUNION = ZUNION$1;
const ZUNIONSTORE = ZUNIONSTORE$1;
commands$5.default = {
    APPEND,
    append: APPEND,
    BITCOUNT,
    bitCount: BITCOUNT,
    BITFIELD_RO,
    bitFieldRo: BITFIELD_RO,
    BITFIELD,
    bitField: BITFIELD,
    BITOP,
    bitOp: BITOP,
    BITPOS,
    bitPos: BITPOS,
    BLMOVE,
    blMove: BLMOVE,
    BLMPOP,
    blmPop: BLMPOP,
    BLPOP,
    blPop: BLPOP,
    BRPOP,
    brPop: BRPOP,
    BRPOPLPUSH,
    brPopLPush: BRPOPLPUSH,
    BZMPOP,
    bzmPop: BZMPOP,
    BZPOPMAX,
    bzPopMax: BZPOPMAX,
    BZPOPMIN,
    bzPopMin: BZPOPMIN,
    COPY,
    copy: COPY,
    DECR,
    decr: DECR,
    DECRBY: DECRBY$1,
    decrBy: DECRBY$1,
    DEL: DEL$3,
    del: DEL$3,
    DUMP,
    dump: DUMP,
    EVAL_RO,
    evalRo: EVAL_RO,
    EVAL,
    eval: EVAL,
    EVALSHA,
    evalSha: EVALSHA,
    EVALSHA_RO,
    evalShaRo: EVALSHA_RO,
    EXISTS: EXISTS$3,
    exists: EXISTS$3,
    EXPIRE,
    expire: EXPIRE,
    EXPIREAT,
    expireAt: EXPIREAT,
    EXPIRETIME,
    expireTime: EXPIRETIME,
    FCALL_RO,
    fCallRo: FCALL_RO,
    FCALL,
    fCall: FCALL,
    GEOADD,
    geoAdd: GEOADD,
    GEODIST,
    geoDist: GEODIST,
    GEOHASH,
    geoHash: GEOHASH,
    GEOPOS,
    geoPos: GEOPOS,
    GEORADIUS_RO_WITH,
    geoRadiusRoWith: GEORADIUS_RO_WITH,
    GEORADIUS_RO,
    geoRadiusRo: GEORADIUS_RO,
    GEORADIUS_WITH,
    geoRadiusWith: GEORADIUS_WITH,
    GEORADIUS,
    geoRadius: GEORADIUS,
    GEORADIUSBYMEMBER_RO_WITH,
    geoRadiusByMemberRoWith: GEORADIUSBYMEMBER_RO_WITH,
    GEORADIUSBYMEMBER_RO,
    geoRadiusByMemberRo: GEORADIUSBYMEMBER_RO,
    GEORADIUSBYMEMBER_WITH,
    geoRadiusByMemberWith: GEORADIUSBYMEMBER_WITH,
    GEORADIUSBYMEMBER,
    geoRadiusByMember: GEORADIUSBYMEMBER,
    GEORADIUSBYMEMBERSTORE,
    geoRadiusByMemberStore: GEORADIUSBYMEMBERSTORE,
    GEORADIUSSTORE,
    geoRadiusStore: GEORADIUSSTORE,
    GEOSEARCH_WITH,
    geoSearchWith: GEOSEARCH_WITH,
    GEOSEARCH,
    geoSearch: GEOSEARCH,
    GEOSEARCHSTORE,
    geoSearchStore: GEOSEARCHSTORE,
    GET: GET$2,
    get: GET$2,
    GETBIT,
    getBit: GETBIT,
    GETDEL,
    getDel: GETDEL,
    GETEX,
    getEx: GETEX,
    GETRANGE,
    getRange: GETRANGE,
    GETSET,
    getSet: GETSET,
    HDEL,
    hDel: HDEL,
    HEXISTS,
    hExists: HEXISTS,
    HEXPIRE,
    hExpire: HEXPIRE,
    HEXPIREAT,
    hExpireAt: HEXPIREAT,
    HEXPIRETIME,
    hExpireTime: HEXPIRETIME,
    HGET,
    hGet: HGET,
    HGETALL,
    hGetAll: HGETALL,
    HINCRBY,
    hIncrBy: HINCRBY,
    HINCRBYFLOAT,
    hIncrByFloat: HINCRBYFLOAT,
    HKEYS,
    hKeys: HKEYS,
    HLEN,
    hLen: HLEN,
    HMGET,
    hmGet: HMGET,
    HPERSIST,
    hPersist: HPERSIST,
    HPEXPIRE,
    hpExpire: HPEXPIRE,
    HPEXPIREAT,
    hpExpireAt: HPEXPIREAT,
    HPEXPIRETIME,
    hpExpireTime: HPEXPIRETIME,
    HPTTL,
    hpTTL: HPTTL,
    HRANDFIELD_COUNT_WITHVALUES,
    hRandFieldCountWithValues: HRANDFIELD_COUNT_WITHVALUES,
    HRANDFIELD_COUNT,
    hRandFieldCount: HRANDFIELD_COUNT,
    HRANDFIELD,
    hRandField: HRANDFIELD,
    HSCAN,
    hScan: HSCAN,
    HSCAN_NOVALUES,
    hScanNoValues: HSCAN_NOVALUES,
    HSET,
    hSet: HSET,
    HSETNX,
    hSetNX: HSETNX,
    HSTRLEN,
    hStrLen: HSTRLEN,
    HTTL,
    hTTL: HTTL,
    HVALS,
    hVals: HVALS,
    INCR,
    incr: INCR,
    INCRBY: INCRBY$5,
    incrBy: INCRBY$5,
    INCRBYFLOAT,
    incrByFloat: INCRBYFLOAT,
    LCS_IDX_WITHMATCHLEN,
    lcsIdxWithMatchLen: LCS_IDX_WITHMATCHLEN,
    LCS_IDX,
    lcsIdx: LCS_IDX,
    LCS_LEN,
    lcsLen: LCS_LEN,
    LCS,
    lcs: LCS,
    LINDEX,
    lIndex: LINDEX,
    LINSERT,
    lInsert: LINSERT,
    LLEN,
    lLen: LLEN,
    LMOVE,
    lMove: LMOVE,
    LMPOP,
    lmPop: LMPOP,
    LPOP_COUNT,
    lPopCount: LPOP_COUNT,
    LPOP,
    lPop: LPOP,
    LPOS_COUNT,
    lPosCount: LPOS_COUNT,
    LPOS,
    lPos: LPOS,
    LPUSH,
    lPush: LPUSH,
    LPUSHX,
    lPushX: LPUSHX,
    LRANGE,
    lRange: LRANGE,
    LREM,
    lRem: LREM,
    LSET,
    lSet: LSET,
    LTRIM,
    lTrim: LTRIM,
    MGET: MGET$2,
    mGet: MGET$2,
    MIGRATE,
    migrate: MIGRATE,
    MSET: MSET$1,
    mSet: MSET$1,
    MSETNX,
    mSetNX: MSETNX,
    OBJECT_ENCODING,
    objectEncoding: OBJECT_ENCODING,
    OBJECT_FREQ,
    objectFreq: OBJECT_FREQ,
    OBJECT_IDLETIME,
    objectIdleTime: OBJECT_IDLETIME,
    OBJECT_REFCOUNT,
    objectRefCount: OBJECT_REFCOUNT,
    PERSIST,
    persist: PERSIST,
    PEXPIRE,
    pExpire: PEXPIRE,
    PEXPIREAT,
    pExpireAt: PEXPIREAT,
    PEXPIRETIME,
    pExpireTime: PEXPIRETIME,
    PFADD,
    pfAdd: PFADD,
    PFCOUNT,
    pfCount: PFCOUNT,
    PFMERGE,
    pfMerge: PFMERGE,
    PSETEX,
    pSetEx: PSETEX,
    PTTL,
    pTTL: PTTL,
    PUBLISH,
    publish: PUBLISH,
    RENAME,
    rename: RENAME,
    RENAMENX,
    renameNX: RENAMENX,
    RESTORE,
    restore: RESTORE,
    RPOP_COUNT,
    rPopCount: RPOP_COUNT,
    RPOP,
    rPop: RPOP,
    RPOPLPUSH,
    rPopLPush: RPOPLPUSH,
    RPUSH,
    rPush: RPUSH,
    RPUSHX,
    rPushX: RPUSHX,
    SADD,
    sAdd: SADD,
    SCARD,
    sCard: SCARD,
    SDIFF,
    sDiff: SDIFF,
    SDIFFSTORE,
    sDiffStore: SDIFFSTORE,
    SINTER,
    sInter: SINTER,
    SINTERCARD,
    sInterCard: SINTERCARD,
    SINTERSTORE,
    sInterStore: SINTERSTORE,
    SET: SET$1,
    set: SET$1,
    SETBIT,
    setBit: SETBIT,
    SETEX,
    setEx: SETEX,
    SETNX,
    setNX: SETNX,
    SETRANGE,
    setRange: SETRANGE,
    SISMEMBER,
    sIsMember: SISMEMBER,
    SMEMBERS,
    sMembers: SMEMBERS,
    SMISMEMBER,
    smIsMember: SMISMEMBER,
    SMOVE,
    sMove: SMOVE,
    SORT_RO,
    sortRo: SORT_RO,
    SORT_STORE,
    sortStore: SORT_STORE,
    SORT,
    sort: SORT,
    SPOP,
    sPop: SPOP,
    SPUBLISH,
    sPublish: SPUBLISH,
    SRANDMEMBER_COUNT,
    sRandMemberCount: SRANDMEMBER_COUNT,
    SRANDMEMBER,
    sRandMember: SRANDMEMBER,
    SREM,
    sRem: SREM,
    SSCAN,
    sScan: SSCAN,
    STRLEN: STRLEN$1,
    strLen: STRLEN$1,
    SUNION,
    sUnion: SUNION,
    SUNIONSTORE,
    sUnionStore: SUNIONSTORE,
    TOUCH,
    touch: TOUCH,
    TTL,
    ttl: TTL,
    TYPE: TYPE$1,
    type: TYPE$1,
    UNLINK,
    unlink: UNLINK,
    WATCH,
    watch: WATCH,
    XACK,
    xAck: XACK,
    XADD,
    xAdd: XADD,
    XAUTOCLAIM_JUSTID,
    xAutoClaimJustId: XAUTOCLAIM_JUSTID,
    XAUTOCLAIM,
    xAutoClaim: XAUTOCLAIM,
    XCLAIM,
    xClaim: XCLAIM,
    XCLAIM_JUSTID,
    xClaimJustId: XCLAIM_JUSTID,
    XDEL,
    xDel: XDEL,
    XGROUP_CREATE,
    xGroupCreate: XGROUP_CREATE,
    XGROUP_CREATECONSUMER,
    xGroupCreateConsumer: XGROUP_CREATECONSUMER,
    XGROUP_DELCONSUMER,
    xGroupDelConsumer: XGROUP_DELCONSUMER,
    XGROUP_DESTROY,
    xGroupDestroy: XGROUP_DESTROY,
    XGROUP_SETID,
    xGroupSetId: XGROUP_SETID,
    XINFO_CONSUMERS,
    xInfoConsumers: XINFO_CONSUMERS,
    XINFO_GROUPS,
    xInfoGroups: XINFO_GROUPS,
    XINFO_STREAM,
    xInfoStream: XINFO_STREAM,
    XLEN,
    xLen: XLEN,
    XPENDING_RANGE,
    xPendingRange: XPENDING_RANGE,
    XPENDING,
    xPending: XPENDING,
    XRANGE,
    xRange: XRANGE,
    XREAD,
    xRead: XREAD,
    XREADGROUP,
    xReadGroup: XREADGROUP,
    XREVRANGE,
    xRevRange: XREVRANGE,
    XSETID,
    xSetId: XSETID,
    XTRIM,
    xTrim: XTRIM,
    ZADD,
    zAdd: ZADD,
    ZCARD,
    zCard: ZCARD,
    ZCOUNT,
    zCount: ZCOUNT,
    ZDIFF_WITHSCORES,
    zDiffWithScores: ZDIFF_WITHSCORES,
    ZDIFF,
    zDiff: ZDIFF,
    ZDIFFSTORE,
    zDiffStore: ZDIFFSTORE,
    ZINCRBY,
    zIncrBy: ZINCRBY,
    ZINTER_WITHSCORES,
    zInterWithScores: ZINTER_WITHSCORES,
    ZINTER,
    zInter: ZINTER,
    ZINTERCARD,
    zInterCard: ZINTERCARD,
    ZINTERSTORE,
    zInterStore: ZINTERSTORE,
    ZLEXCOUNT,
    zLexCount: ZLEXCOUNT,
    ZMPOP,
    zmPop: ZMPOP,
    ZMSCORE,
    zmScore: ZMSCORE,
    ZPOPMAX_COUNT,
    zPopMaxCount: ZPOPMAX_COUNT,
    ZPOPMAX,
    zPopMax: ZPOPMAX,
    ZPOPMIN_COUNT,
    zPopMinCount: ZPOPMIN_COUNT,
    ZPOPMIN,
    zPopMin: ZPOPMIN,
    ZRANDMEMBER_COUNT_WITHSCORES,
    zRandMemberCountWithScores: ZRANDMEMBER_COUNT_WITHSCORES,
    ZRANDMEMBER_COUNT,
    zRandMemberCount: ZRANDMEMBER_COUNT,
    ZRANDMEMBER,
    zRandMember: ZRANDMEMBER,
    ZRANGE_WITHSCORES,
    zRangeWithScores: ZRANGE_WITHSCORES,
    ZRANGE,
    zRange: ZRANGE,
    ZRANGEBYLEX,
    zRangeByLex: ZRANGEBYLEX,
    ZRANGEBYSCORE_WITHSCORES,
    zRangeByScoreWithScores: ZRANGEBYSCORE_WITHSCORES,
    ZRANGEBYSCORE,
    zRangeByScore: ZRANGEBYSCORE,
    ZRANGESTORE,
    zRangeStore: ZRANGESTORE,
    ZRANK,
    zRank: ZRANK,
    ZREM,
    zRem: ZREM,
    ZREMRANGEBYLEX,
    zRemRangeByLex: ZREMRANGEBYLEX,
    ZREMRANGEBYRANK,
    zRemRangeByRank: ZREMRANGEBYRANK,
    ZREMRANGEBYSCORE,
    zRemRangeByScore: ZREMRANGEBYSCORE,
    ZREVRANK,
    zRevRank: ZREVRANK,
    ZSCAN,
    zScan: ZSCAN,
    ZSCORE,
    zScore: ZSCORE,
    ZUNION_WITHSCORES,
    zUnionWithScores: ZUNION_WITHSCORES,
    ZUNION,
    zUnion: ZUNION,
    ZUNIONSTORE,
    zUnionStore: ZUNIONSTORE
};

var ACL_CAT$1 = {};

Object.defineProperty(ACL_CAT$1, "__esModule", { value: true });
ACL_CAT$1.transformArguments = void 0;
function transformArguments$2Y(categoryName) {
    const args = ['ACL', 'CAT'];
    if (categoryName) {
        args.push(categoryName);
    }
    return args;
}
ACL_CAT$1.transformArguments = transformArguments$2Y;

var ACL_DELUSER$1 = {};

Object.defineProperty(ACL_DELUSER$1, "__esModule", { value: true });
ACL_DELUSER$1.transformArguments = void 0;
const generic_transformers_1$m = genericTransformers;
function transformArguments$2X(username) {
    return (0, generic_transformers_1$m.pushVerdictArguments)(['ACL', 'DELUSER'], username);
}
ACL_DELUSER$1.transformArguments = transformArguments$2X;

var ACL_DRYRUN$1 = {};

Object.defineProperty(ACL_DRYRUN$1, "__esModule", { value: true });
ACL_DRYRUN$1.transformArguments = ACL_DRYRUN$1.IS_READ_ONLY = void 0;
ACL_DRYRUN$1.IS_READ_ONLY = true;
function transformArguments$2W(username, command) {
    return [
        'ACL',
        'DRYRUN',
        username,
        ...command
    ];
}
ACL_DRYRUN$1.transformArguments = transformArguments$2W;

var ACL_GENPASS$1 = {};

Object.defineProperty(ACL_GENPASS$1, "__esModule", { value: true });
ACL_GENPASS$1.transformArguments = void 0;
function transformArguments$2V(bits) {
    const args = ['ACL', 'GENPASS'];
    if (bits) {
        args.push(bits.toString());
    }
    return args;
}
ACL_GENPASS$1.transformArguments = transformArguments$2V;

var ACL_GETUSER$1 = {};

Object.defineProperty(ACL_GETUSER$1, "__esModule", { value: true });
ACL_GETUSER$1.transformReply = ACL_GETUSER$1.transformArguments = void 0;
function transformArguments$2U(username) {
    return ['ACL', 'GETUSER', username];
}
ACL_GETUSER$1.transformArguments = transformArguments$2U;
function transformReply$z(reply) {
    return {
        flags: reply[1],
        passwords: reply[3],
        commands: reply[5],
        keys: reply[7],
        channels: reply[9],
        selectors: reply[11]
    };
}
ACL_GETUSER$1.transformReply = transformReply$z;

var ACL_LIST$1 = {};

Object.defineProperty(ACL_LIST$1, "__esModule", { value: true });
ACL_LIST$1.transformArguments = void 0;
function transformArguments$2T() {
    return ['ACL', 'LIST'];
}
ACL_LIST$1.transformArguments = transformArguments$2T;

var ACL_LOAD$1 = {};

Object.defineProperty(ACL_LOAD$1, "__esModule", { value: true });
ACL_LOAD$1.transformArguments = void 0;
function transformArguments$2S() {
    return ['ACL', 'LOAD'];
}
ACL_LOAD$1.transformArguments = transformArguments$2S;

var ACL_LOG_RESET$1 = {};

Object.defineProperty(ACL_LOG_RESET$1, "__esModule", { value: true });
ACL_LOG_RESET$1.transformArguments = void 0;
function transformArguments$2R() {
    return ['ACL', 'LOG', 'RESET'];
}
ACL_LOG_RESET$1.transformArguments = transformArguments$2R;

var ACL_LOG$1 = {};

Object.defineProperty(ACL_LOG$1, "__esModule", { value: true });
ACL_LOG$1.transformReply = ACL_LOG$1.transformArguments = void 0;
function transformArguments$2Q(count) {
    const args = ['ACL', 'LOG'];
    if (count) {
        args.push(count.toString());
    }
    return args;
}
ACL_LOG$1.transformArguments = transformArguments$2Q;
function transformReply$y(reply) {
    return reply.map(log => ({
        count: log[1],
        reason: log[3],
        context: log[5],
        object: log[7],
        username: log[9],
        ageSeconds: Number(log[11]),
        clientInfo: log[13]
    }));
}
ACL_LOG$1.transformReply = transformReply$y;

var ACL_SAVE$1 = {};

Object.defineProperty(ACL_SAVE$1, "__esModule", { value: true });
ACL_SAVE$1.transformArguments = void 0;
function transformArguments$2P() {
    return ['ACL', 'SAVE'];
}
ACL_SAVE$1.transformArguments = transformArguments$2P;

var ACL_SETUSER$1 = {};

Object.defineProperty(ACL_SETUSER$1, "__esModule", { value: true });
ACL_SETUSER$1.transformArguments = void 0;
const generic_transformers_1$l = genericTransformers;
function transformArguments$2O(username, rule) {
    return (0, generic_transformers_1$l.pushVerdictArguments)(['ACL', 'SETUSER', username], rule);
}
ACL_SETUSER$1.transformArguments = transformArguments$2O;

var ACL_USERS$1 = {};

Object.defineProperty(ACL_USERS$1, "__esModule", { value: true });
ACL_USERS$1.transformArguments = void 0;
function transformArguments$2N() {
    return ['ACL', 'USERS'];
}
ACL_USERS$1.transformArguments = transformArguments$2N;

var ACL_WHOAMI$1 = {};

Object.defineProperty(ACL_WHOAMI$1, "__esModule", { value: true });
ACL_WHOAMI$1.transformArguments = void 0;
function transformArguments$2M() {
    return ['ACL', 'WHOAMI'];
}
ACL_WHOAMI$1.transformArguments = transformArguments$2M;

var ASKING$1 = {};

Object.defineProperty(ASKING$1, "__esModule", { value: true });
ASKING$1.transformArguments = void 0;
function transformArguments$2L() {
    return ['ASKING'];
}
ASKING$1.transformArguments = transformArguments$2L;

var AUTH$1 = {};

Object.defineProperty(AUTH$1, "__esModule", { value: true });
AUTH$1.transformArguments = void 0;
function transformArguments$2K({ username, password }) {
    if (!username) {
        return ['AUTH', password];
    }
    return ['AUTH', username, password];
}
AUTH$1.transformArguments = transformArguments$2K;

var BGREWRITEAOF$1 = {};

Object.defineProperty(BGREWRITEAOF$1, "__esModule", { value: true });
BGREWRITEAOF$1.transformArguments = void 0;
function transformArguments$2J() {
    return ['BGREWRITEAOF'];
}
BGREWRITEAOF$1.transformArguments = transformArguments$2J;

var BGSAVE$1 = {};

Object.defineProperty(BGSAVE$1, "__esModule", { value: true });
BGSAVE$1.transformArguments = void 0;
function transformArguments$2I(options) {
    const args = ['BGSAVE'];
    if (options?.SCHEDULE) {
        args.push('SCHEDULE');
    }
    return args;
}
BGSAVE$1.transformArguments = transformArguments$2I;

var CLIENT_CACHING$1 = {};

Object.defineProperty(CLIENT_CACHING$1, "__esModule", { value: true });
CLIENT_CACHING$1.transformArguments = void 0;
function transformArguments$2H(value) {
    return [
        'CLIENT',
        'CACHING',
        value ? 'YES' : 'NO'
    ];
}
CLIENT_CACHING$1.transformArguments = transformArguments$2H;

var CLIENT_GETNAME$1 = {};

Object.defineProperty(CLIENT_GETNAME$1, "__esModule", { value: true });
CLIENT_GETNAME$1.transformArguments = void 0;
function transformArguments$2G() {
    return ['CLIENT', 'GETNAME'];
}
CLIENT_GETNAME$1.transformArguments = transformArguments$2G;

var CLIENT_GETREDIR$1 = {};

Object.defineProperty(CLIENT_GETREDIR$1, "__esModule", { value: true });
CLIENT_GETREDIR$1.transformArguments = void 0;
function transformArguments$2F() {
    return ['CLIENT', 'GETREDIR'];
}
CLIENT_GETREDIR$1.transformArguments = transformArguments$2F;

var CLIENT_ID$1 = {};

Object.defineProperty(CLIENT_ID$1, "__esModule", { value: true });
CLIENT_ID$1.transformArguments = CLIENT_ID$1.IS_READ_ONLY = void 0;
CLIENT_ID$1.IS_READ_ONLY = true;
function transformArguments$2E() {
    return ['CLIENT', 'ID'];
}
CLIENT_ID$1.transformArguments = transformArguments$2E;

var CLIENT_KILL$1 = {};

Object.defineProperty(CLIENT_KILL$1, "__esModule", { value: true });
CLIENT_KILL$1.transformArguments = CLIENT_KILL$1.ClientKillFilters = void 0;
var ClientKillFilters;
(function (ClientKillFilters) {
    ClientKillFilters["ADDRESS"] = "ADDR";
    ClientKillFilters["LOCAL_ADDRESS"] = "LADDR";
    ClientKillFilters["ID"] = "ID";
    ClientKillFilters["TYPE"] = "TYPE";
    ClientKillFilters["USER"] = "USER";
    ClientKillFilters["SKIP_ME"] = "SKIPME";
    ClientKillFilters["MAXAGE"] = "MAXAGE";
})(ClientKillFilters || (CLIENT_KILL$1.ClientKillFilters = ClientKillFilters = {}));
function transformArguments$2D(filters) {
    const args = ['CLIENT', 'KILL'];
    if (Array.isArray(filters)) {
        for (const filter of filters) {
            pushFilter(args, filter);
        }
    }
    else {
        pushFilter(args, filters);
    }
    return args;
}
CLIENT_KILL$1.transformArguments = transformArguments$2D;
function pushFilter(args, filter) {
    if (filter === ClientKillFilters.SKIP_ME) {
        args.push('SKIPME');
        return;
    }
    args.push(filter.filter);
    switch (filter.filter) {
        case ClientKillFilters.ADDRESS:
            args.push(filter.address);
            break;
        case ClientKillFilters.LOCAL_ADDRESS:
            args.push(filter.localAddress);
            break;
        case ClientKillFilters.ID:
            args.push(typeof filter.id === 'number' ?
                filter.id.toString() :
                filter.id);
            break;
        case ClientKillFilters.TYPE:
            args.push(filter.type);
            break;
        case ClientKillFilters.USER:
            args.push(filter.username);
            break;
        case ClientKillFilters.SKIP_ME:
            args.push(filter.skipMe ? 'yes' : 'no');
            break;
        case ClientKillFilters.MAXAGE:
            args.push(filter.maxAge.toString());
            break;
    }
}

var CLIENT_LIST$1 = {};

var CLIENT_INFO$1 = {};

Object.defineProperty(CLIENT_INFO$1, "__esModule", { value: true });
CLIENT_INFO$1.transformReply = CLIENT_INFO$1.transformArguments = CLIENT_INFO$1.IS_READ_ONLY = void 0;
CLIENT_INFO$1.IS_READ_ONLY = true;
function transformArguments$2C() {
    return ['CLIENT', 'INFO'];
}
CLIENT_INFO$1.transformArguments = transformArguments$2C;
const CLIENT_INFO_REGEX = /([^\s=]+)=([^\s]*)/g;
function transformReply$x(rawReply) {
    const map = {};
    for (const item of rawReply.matchAll(CLIENT_INFO_REGEX)) {
        map[item[1]] = item[2];
    }
    const reply = {
        id: Number(map.id),
        addr: map.addr,
        fd: Number(map.fd),
        name: map.name,
        age: Number(map.age),
        idle: Number(map.idle),
        flags: map.flags,
        db: Number(map.db),
        sub: Number(map.sub),
        psub: Number(map.psub),
        multi: Number(map.multi),
        qbuf: Number(map.qbuf),
        qbufFree: Number(map['qbuf-free']),
        argvMem: Number(map['argv-mem']),
        obl: Number(map.obl),
        oll: Number(map.oll),
        omem: Number(map.omem),
        totMem: Number(map['tot-mem']),
        events: map.events,
        cmd: map.cmd,
        user: map.user,
        libName: map['lib-name'],
        libVer: map['lib-ver'],
    };
    if (map.laddr !== undefined) {
        reply.laddr = map.laddr;
    }
    if (map.redir !== undefined) {
        reply.redir = Number(map.redir);
    }
    if (map.ssub !== undefined) {
        reply.ssub = Number(map.ssub);
    }
    if (map['multi-mem'] !== undefined) {
        reply.multiMem = Number(map['multi-mem']);
    }
    if (map.resp !== undefined) {
        reply.resp = Number(map.resp);
    }
    return reply;
}
CLIENT_INFO$1.transformReply = transformReply$x;

Object.defineProperty(CLIENT_LIST$1, "__esModule", { value: true });
CLIENT_LIST$1.transformReply = CLIENT_LIST$1.transformArguments = CLIENT_LIST$1.IS_READ_ONLY = void 0;
const generic_transformers_1$k = genericTransformers;
const CLIENT_INFO_1 = CLIENT_INFO$1;
CLIENT_LIST$1.IS_READ_ONLY = true;
function transformArguments$2B(filter) {
    let args = ['CLIENT', 'LIST'];
    if (filter) {
        if (filter.TYPE !== undefined) {
            args.push('TYPE', filter.TYPE);
        }
        else {
            args.push('ID');
            args = (0, generic_transformers_1$k.pushVerdictArguments)(args, filter.ID);
        }
    }
    return args;
}
CLIENT_LIST$1.transformArguments = transformArguments$2B;
function transformReply$w(rawReply) {
    const split = rawReply.split('\n'), length = split.length - 1, reply = [];
    for (let i = 0; i < length; i++) {
        reply.push((0, CLIENT_INFO_1.transformReply)(split[i]));
    }
    return reply;
}
CLIENT_LIST$1.transformReply = transformReply$w;

var CLIENT_NOEVICT = {};

Object.defineProperty(CLIENT_NOEVICT, "__esModule", { value: true });
CLIENT_NOEVICT.transformArguments = void 0;
function transformArguments$2A(value) {
    return [
        'CLIENT',
        'NO-EVICT',
        value ? 'ON' : 'OFF'
    ];
}
CLIENT_NOEVICT.transformArguments = transformArguments$2A;

var CLIENT_NOTOUCH = {};

Object.defineProperty(CLIENT_NOTOUCH, "__esModule", { value: true });
CLIENT_NOTOUCH.transformArguments = void 0;
function transformArguments$2z(value) {
    return [
        'CLIENT',
        'NO-TOUCH',
        value ? 'ON' : 'OFF'
    ];
}
CLIENT_NOTOUCH.transformArguments = transformArguments$2z;

var CLIENT_PAUSE$1 = {};

Object.defineProperty(CLIENT_PAUSE$1, "__esModule", { value: true });
CLIENT_PAUSE$1.transformArguments = void 0;
function transformArguments$2y(timeout, mode) {
    const args = [
        'CLIENT',
        'PAUSE',
        timeout.toString()
    ];
    if (mode) {
        args.push(mode);
    }
    return args;
}
CLIENT_PAUSE$1.transformArguments = transformArguments$2y;

var CLIENT_SETNAME$1 = {};

Object.defineProperty(CLIENT_SETNAME$1, "__esModule", { value: true });
CLIENT_SETNAME$1.transformArguments = void 0;
function transformArguments$2x(name) {
    return ['CLIENT', 'SETNAME', name];
}
CLIENT_SETNAME$1.transformArguments = transformArguments$2x;

var CLIENT_TRACKING$1 = {};

Object.defineProperty(CLIENT_TRACKING$1, "__esModule", { value: true });
CLIENT_TRACKING$1.transformArguments = void 0;
function transformArguments$2w(mode, options) {
    const args = [
        'CLIENT',
        'TRACKING',
        mode ? 'ON' : 'OFF'
    ];
    if (mode) {
        if (options?.REDIRECT) {
            args.push('REDIRECT', options.REDIRECT.toString());
        }
        if (isBroadcast(options)) {
            args.push('BCAST');
            if (options?.PREFIX) {
                if (Array.isArray(options.PREFIX)) {
                    for (const prefix of options.PREFIX) {
                        args.push('PREFIX', prefix);
                    }
                }
                else {
                    args.push('PREFIX', options.PREFIX);
                }
            }
        }
        else if (isOptIn(options)) {
            args.push('OPTIN');
        }
        else if (isOptOut(options)) {
            args.push('OPTOUT');
        }
        if (options?.NOLOOP) {
            args.push('NOLOOP');
        }
    }
    return args;
}
CLIENT_TRACKING$1.transformArguments = transformArguments$2w;
function isBroadcast(options) {
    return options?.BCAST === true;
}
function isOptIn(options) {
    return options?.OPTIN === true;
}
function isOptOut(options) {
    return options?.OPTOUT === true;
}

var CLIENT_TRACKINGINFO$1 = {};

Object.defineProperty(CLIENT_TRACKINGINFO$1, "__esModule", { value: true });
CLIENT_TRACKINGINFO$1.transformReply = CLIENT_TRACKINGINFO$1.transformArguments = void 0;
function transformArguments$2v() {
    return ['CLIENT', 'TRACKINGINFO'];
}
CLIENT_TRACKINGINFO$1.transformArguments = transformArguments$2v;
function transformReply$v(reply) {
    return {
        flags: new Set(reply[1]),
        redirect: reply[3],
        prefixes: reply[5]
    };
}
CLIENT_TRACKINGINFO$1.transformReply = transformReply$v;

var CLIENT_UNPAUSE$1 = {};

Object.defineProperty(CLIENT_UNPAUSE$1, "__esModule", { value: true });
CLIENT_UNPAUSE$1.transformArguments = void 0;
function transformArguments$2u() {
    return ['CLIENT', 'UNPAUSE'];
}
CLIENT_UNPAUSE$1.transformArguments = transformArguments$2u;

var CLUSTER_ADDSLOTS$1 = {};

Object.defineProperty(CLUSTER_ADDSLOTS$1, "__esModule", { value: true });
CLUSTER_ADDSLOTS$1.transformArguments = void 0;
const generic_transformers_1$j = genericTransformers;
function transformArguments$2t(slots) {
    return (0, generic_transformers_1$j.pushVerdictNumberArguments)(['CLUSTER', 'ADDSLOTS'], slots);
}
CLUSTER_ADDSLOTS$1.transformArguments = transformArguments$2t;

var CLUSTER_ADDSLOTSRANGE$1 = {};

Object.defineProperty(CLUSTER_ADDSLOTSRANGE$1, "__esModule", { value: true });
CLUSTER_ADDSLOTSRANGE$1.transformArguments = void 0;
const generic_transformers_1$i = genericTransformers;
function transformArguments$2s(ranges) {
    return (0, generic_transformers_1$i.pushSlotRangesArguments)(['CLUSTER', 'ADDSLOTSRANGE'], ranges);
}
CLUSTER_ADDSLOTSRANGE$1.transformArguments = transformArguments$2s;

var CLUSTER_BUMPEPOCH$1 = {};

Object.defineProperty(CLUSTER_BUMPEPOCH$1, "__esModule", { value: true });
CLUSTER_BUMPEPOCH$1.transformArguments = void 0;
function transformArguments$2r() {
    return ['CLUSTER', 'BUMPEPOCH'];
}
CLUSTER_BUMPEPOCH$1.transformArguments = transformArguments$2r;

var CLUSTER_COUNTFAILUREREPORTS = {};

Object.defineProperty(CLUSTER_COUNTFAILUREREPORTS, "__esModule", { value: true });
CLUSTER_COUNTFAILUREREPORTS.transformArguments = void 0;
function transformArguments$2q(nodeId) {
    return ['CLUSTER', 'COUNT-FAILURE-REPORTS', nodeId];
}
CLUSTER_COUNTFAILUREREPORTS.transformArguments = transformArguments$2q;

var CLUSTER_COUNTKEYSINSLOT$1 = {};

Object.defineProperty(CLUSTER_COUNTKEYSINSLOT$1, "__esModule", { value: true });
CLUSTER_COUNTKEYSINSLOT$1.transformArguments = void 0;
function transformArguments$2p(slot) {
    return ['CLUSTER', 'COUNTKEYSINSLOT', slot.toString()];
}
CLUSTER_COUNTKEYSINSLOT$1.transformArguments = transformArguments$2p;

var CLUSTER_DELSLOTS$1 = {};

Object.defineProperty(CLUSTER_DELSLOTS$1, "__esModule", { value: true });
CLUSTER_DELSLOTS$1.transformArguments = void 0;
const generic_transformers_1$h = genericTransformers;
function transformArguments$2o(slots) {
    return (0, generic_transformers_1$h.pushVerdictNumberArguments)(['CLUSTER', 'DELSLOTS'], slots);
}
CLUSTER_DELSLOTS$1.transformArguments = transformArguments$2o;

var CLUSTER_DELSLOTSRANGE$1 = {};

Object.defineProperty(CLUSTER_DELSLOTSRANGE$1, "__esModule", { value: true });
CLUSTER_DELSLOTSRANGE$1.transformArguments = void 0;
const generic_transformers_1$g = genericTransformers;
function transformArguments$2n(ranges) {
    return (0, generic_transformers_1$g.pushSlotRangesArguments)(['CLUSTER', 'DELSLOTSRANGE'], ranges);
}
CLUSTER_DELSLOTSRANGE$1.transformArguments = transformArguments$2n;

var CLUSTER_FAILOVER$1 = {};

Object.defineProperty(CLUSTER_FAILOVER$1, "__esModule", { value: true });
CLUSTER_FAILOVER$1.transformArguments = CLUSTER_FAILOVER$1.FailoverModes = void 0;
var FailoverModes;
(function (FailoverModes) {
    FailoverModes["FORCE"] = "FORCE";
    FailoverModes["TAKEOVER"] = "TAKEOVER";
})(FailoverModes || (CLUSTER_FAILOVER$1.FailoverModes = FailoverModes = {}));
function transformArguments$2m(mode) {
    const args = ['CLUSTER', 'FAILOVER'];
    if (mode) {
        args.push(mode);
    }
    return args;
}
CLUSTER_FAILOVER$1.transformArguments = transformArguments$2m;

var CLUSTER_FLUSHSLOTS$1 = {};

Object.defineProperty(CLUSTER_FLUSHSLOTS$1, "__esModule", { value: true });
CLUSTER_FLUSHSLOTS$1.transformArguments = void 0;
function transformArguments$2l() {
    return ['CLUSTER', 'FLUSHSLOTS'];
}
CLUSTER_FLUSHSLOTS$1.transformArguments = transformArguments$2l;

var CLUSTER_FORGET$1 = {};

Object.defineProperty(CLUSTER_FORGET$1, "__esModule", { value: true });
CLUSTER_FORGET$1.transformArguments = void 0;
function transformArguments$2k(nodeId) {
    return ['CLUSTER', 'FORGET', nodeId];
}
CLUSTER_FORGET$1.transformArguments = transformArguments$2k;

var CLUSTER_GETKEYSINSLOT$1 = {};

Object.defineProperty(CLUSTER_GETKEYSINSLOT$1, "__esModule", { value: true });
CLUSTER_GETKEYSINSLOT$1.transformArguments = void 0;
function transformArguments$2j(slot, count) {
    return ['CLUSTER', 'GETKEYSINSLOT', slot.toString(), count.toString()];
}
CLUSTER_GETKEYSINSLOT$1.transformArguments = transformArguments$2j;

var CLUSTER_INFO$1 = {};

Object.defineProperty(CLUSTER_INFO$1, "__esModule", { value: true });
CLUSTER_INFO$1.extractLineValue = CLUSTER_INFO$1.transformReply = CLUSTER_INFO$1.transformArguments = void 0;
function transformArguments$2i() {
    return ['CLUSTER', 'INFO'];
}
CLUSTER_INFO$1.transformArguments = transformArguments$2i;
function transformReply$u(reply) {
    const lines = reply.split('\r\n');
    return {
        state: extractLineValue(lines[0]),
        slots: {
            assigned: Number(extractLineValue(lines[1])),
            ok: Number(extractLineValue(lines[2])),
            pfail: Number(extractLineValue(lines[3])),
            fail: Number(extractLineValue(lines[4]))
        },
        knownNodes: Number(extractLineValue(lines[5])),
        size: Number(extractLineValue(lines[6])),
        currentEpoch: Number(extractLineValue(lines[7])),
        myEpoch: Number(extractLineValue(lines[8])),
        stats: {
            messagesSent: Number(extractLineValue(lines[9])),
            messagesReceived: Number(extractLineValue(lines[10]))
        }
    };
}
CLUSTER_INFO$1.transformReply = transformReply$u;
function extractLineValue(line) {
    return line.substring(line.indexOf(':') + 1);
}
CLUSTER_INFO$1.extractLineValue = extractLineValue;

var CLUSTER_KEYSLOT$1 = {};

Object.defineProperty(CLUSTER_KEYSLOT$1, "__esModule", { value: true });
CLUSTER_KEYSLOT$1.transformArguments = void 0;
function transformArguments$2h(key) {
    return ['CLUSTER', 'KEYSLOT', key];
}
CLUSTER_KEYSLOT$1.transformArguments = transformArguments$2h;

var CLUSTER_LINKS$1 = {};

Object.defineProperty(CLUSTER_LINKS$1, "__esModule", { value: true });
CLUSTER_LINKS$1.transformReply = CLUSTER_LINKS$1.transformArguments = void 0;
function transformArguments$2g() {
    return ['CLUSTER', 'LINKS'];
}
CLUSTER_LINKS$1.transformArguments = transformArguments$2g;
function transformReply$t(reply) {
    return reply.map(peerLink => ({
        direction: peerLink[1],
        node: peerLink[3],
        createTime: Number(peerLink[5]),
        events: peerLink[7],
        sendBufferAllocated: Number(peerLink[9]),
        sendBufferUsed: Number(peerLink[11])
    }));
}
CLUSTER_LINKS$1.transformReply = transformReply$t;

var CLUSTER_MEET$1 = {};

Object.defineProperty(CLUSTER_MEET$1, "__esModule", { value: true });
CLUSTER_MEET$1.transformArguments = void 0;
function transformArguments$2f(ip, port) {
    return ['CLUSTER', 'MEET', ip, port.toString()];
}
CLUSTER_MEET$1.transformArguments = transformArguments$2f;

var CLUSTER_MYID$1 = {};

Object.defineProperty(CLUSTER_MYID$1, "__esModule", { value: true });
CLUSTER_MYID$1.transformArguments = void 0;
function transformArguments$2e() {
    return ['CLUSTER', 'MYID'];
}
CLUSTER_MYID$1.transformArguments = transformArguments$2e;

var CLUSTER_MYSHARDID$1 = {};

Object.defineProperty(CLUSTER_MYSHARDID$1, "__esModule", { value: true });
CLUSTER_MYSHARDID$1.transformArguments = CLUSTER_MYSHARDID$1.IS_READ_ONLY = void 0;
CLUSTER_MYSHARDID$1.IS_READ_ONLY = true;
function transformArguments$2d() {
    return ['CLUSTER', 'MYSHARDID'];
}
CLUSTER_MYSHARDID$1.transformArguments = transformArguments$2d;

var CLUSTER_NODES$1 = {};

Object.defineProperty(CLUSTER_NODES$1, "__esModule", { value: true });
CLUSTER_NODES$1.transformReply = CLUSTER_NODES$1.RedisClusterNodeLinkStates = CLUSTER_NODES$1.transformArguments = void 0;
function transformArguments$2c() {
    return ['CLUSTER', 'NODES'];
}
CLUSTER_NODES$1.transformArguments = transformArguments$2c;
var RedisClusterNodeLinkStates;
(function (RedisClusterNodeLinkStates) {
    RedisClusterNodeLinkStates["CONNECTED"] = "connected";
    RedisClusterNodeLinkStates["DISCONNECTED"] = "disconnected";
})(RedisClusterNodeLinkStates || (CLUSTER_NODES$1.RedisClusterNodeLinkStates = RedisClusterNodeLinkStates = {}));
function transformReply$s(reply) {
    const lines = reply.split('\n');
    lines.pop(); // last line is empty
    const mastersMap = new Map(), replicasMap = new Map();
    for (const line of lines) {
        const [id, address, flags, masterId, pingSent, pongRecv, configEpoch, linkState, ...slots] = line.split(' '), node = {
            id,
            address,
            ...transformNodeAddress(address),
            flags: flags.split(','),
            pingSent: Number(pingSent),
            pongRecv: Number(pongRecv),
            configEpoch: Number(configEpoch),
            linkState: linkState
        };
        if (masterId === '-') {
            let replicas = replicasMap.get(id);
            if (!replicas) {
                replicas = [];
                replicasMap.set(id, replicas);
            }
            mastersMap.set(id, {
                ...node,
                slots: slots.map(slot => {
                    // TODO: importing & exporting (https://redis.io/commands/cluster-nodes#special-slot-entries)
                    const [fromString, toString] = slot.split('-', 2), from = Number(fromString);
                    return {
                        from,
                        to: toString ? Number(toString) : from
                    };
                }),
                replicas
            });
        }
        else {
            const replicas = replicasMap.get(masterId);
            if (!replicas) {
                replicasMap.set(masterId, [node]);
            }
            else {
                replicas.push(node);
            }
        }
    }
    return [...mastersMap.values()];
}
CLUSTER_NODES$1.transformReply = transformReply$s;
function transformNodeAddress(address) {
    const indexOfColon = address.lastIndexOf(':'), indexOfAt = address.indexOf('@', indexOfColon), host = address.substring(0, indexOfColon);
    if (indexOfAt === -1) {
        return {
            host,
            port: Number(address.substring(indexOfColon + 1)),
            cport: null
        };
    }
    return {
        host: address.substring(0, indexOfColon),
        port: Number(address.substring(indexOfColon + 1, indexOfAt)),
        cport: Number(address.substring(indexOfAt + 1))
    };
}

var CLUSTER_REPLICAS$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = void 0;
	function transformArguments(nodeId) {
	    return ['CLUSTER', 'REPLICAS', nodeId];
	}
	exports.transformArguments = transformArguments;
	var CLUSTER_NODES_1 = CLUSTER_NODES$1;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return CLUSTER_NODES_1.transformReply; } }); 
} (CLUSTER_REPLICAS$1));

var CLUSTER_REPLICATE$1 = {};

Object.defineProperty(CLUSTER_REPLICATE$1, "__esModule", { value: true });
CLUSTER_REPLICATE$1.transformArguments = void 0;
function transformArguments$2b(nodeId) {
    return ['CLUSTER', 'REPLICATE', nodeId];
}
CLUSTER_REPLICATE$1.transformArguments = transformArguments$2b;

var CLUSTER_RESET$1 = {};

Object.defineProperty(CLUSTER_RESET$1, "__esModule", { value: true });
CLUSTER_RESET$1.transformArguments = void 0;
function transformArguments$2a(mode) {
    const args = ['CLUSTER', 'RESET'];
    if (mode) {
        args.push(mode);
    }
    return args;
}
CLUSTER_RESET$1.transformArguments = transformArguments$2a;

var CLUSTER_SAVECONFIG$1 = {};

Object.defineProperty(CLUSTER_SAVECONFIG$1, "__esModule", { value: true });
CLUSTER_SAVECONFIG$1.transformArguments = void 0;
function transformArguments$29() {
    return ['CLUSTER', 'SAVECONFIG'];
}
CLUSTER_SAVECONFIG$1.transformArguments = transformArguments$29;

var CLUSTER_SETCONFIGEPOCH = {};

Object.defineProperty(CLUSTER_SETCONFIGEPOCH, "__esModule", { value: true });
CLUSTER_SETCONFIGEPOCH.transformArguments = void 0;
function transformArguments$28(configEpoch) {
    return ['CLUSTER', 'SET-CONFIG-EPOCH', configEpoch.toString()];
}
CLUSTER_SETCONFIGEPOCH.transformArguments = transformArguments$28;

var CLUSTER_SETSLOT$1 = {};

Object.defineProperty(CLUSTER_SETSLOT$1, "__esModule", { value: true });
CLUSTER_SETSLOT$1.transformArguments = CLUSTER_SETSLOT$1.ClusterSlotStates = void 0;
var ClusterSlotStates;
(function (ClusterSlotStates) {
    ClusterSlotStates["IMPORTING"] = "IMPORTING";
    ClusterSlotStates["MIGRATING"] = "MIGRATING";
    ClusterSlotStates["STABLE"] = "STABLE";
    ClusterSlotStates["NODE"] = "NODE";
})(ClusterSlotStates || (CLUSTER_SETSLOT$1.ClusterSlotStates = ClusterSlotStates = {}));
function transformArguments$27(slot, state, nodeId) {
    const args = ['CLUSTER', 'SETSLOT', slot.toString(), state];
    if (nodeId) {
        args.push(nodeId);
    }
    return args;
}
CLUSTER_SETSLOT$1.transformArguments = transformArguments$27;

var CLUSTER_SLOTS$1 = {};

Object.defineProperty(CLUSTER_SLOTS$1, "__esModule", { value: true });
CLUSTER_SLOTS$1.transformReply = CLUSTER_SLOTS$1.transformArguments = void 0;
function transformArguments$26() {
    return ['CLUSTER', 'SLOTS'];
}
CLUSTER_SLOTS$1.transformArguments = transformArguments$26;
function transformReply$r(reply) {
    return reply.map(([from, to, master, ...replicas]) => {
        return {
            from,
            to,
            master: transformNode(master),
            replicas: replicas.map(transformNode)
        };
    });
}
CLUSTER_SLOTS$1.transformReply = transformReply$r;
function transformNode([ip, port, id]) {
    return {
        ip,
        port,
        id
    };
}

var COMMAND_COUNT$1 = {};

Object.defineProperty(COMMAND_COUNT$1, "__esModule", { value: true });
COMMAND_COUNT$1.transformArguments = COMMAND_COUNT$1.IS_READ_ONLY = void 0;
COMMAND_COUNT$1.IS_READ_ONLY = true;
function transformArguments$25() {
    return ['COMMAND', 'COUNT'];
}
COMMAND_COUNT$1.transformArguments = transformArguments$25;

var COMMAND_GETKEYS$1 = {};

Object.defineProperty(COMMAND_GETKEYS$1, "__esModule", { value: true });
COMMAND_GETKEYS$1.transformArguments = COMMAND_GETKEYS$1.IS_READ_ONLY = void 0;
COMMAND_GETKEYS$1.IS_READ_ONLY = true;
function transformArguments$24(args) {
    return ['COMMAND', 'GETKEYS', ...args];
}
COMMAND_GETKEYS$1.transformArguments = transformArguments$24;

var COMMAND_GETKEYSANDFLAGS$1 = {};

Object.defineProperty(COMMAND_GETKEYSANDFLAGS$1, "__esModule", { value: true });
COMMAND_GETKEYSANDFLAGS$1.transformReply = COMMAND_GETKEYSANDFLAGS$1.transformArguments = COMMAND_GETKEYSANDFLAGS$1.IS_READ_ONLY = void 0;
COMMAND_GETKEYSANDFLAGS$1.IS_READ_ONLY = true;
function transformArguments$23(args) {
    return ['COMMAND', 'GETKEYSANDFLAGS', ...args];
}
COMMAND_GETKEYSANDFLAGS$1.transformArguments = transformArguments$23;
function transformReply$q(reply) {
    return reply.map(([key, flags]) => ({
        key,
        flags
    }));
}
COMMAND_GETKEYSANDFLAGS$1.transformReply = transformReply$q;

var COMMAND_INFO$1 = {};

Object.defineProperty(COMMAND_INFO$1, "__esModule", { value: true });
COMMAND_INFO$1.transformReply = COMMAND_INFO$1.transformArguments = COMMAND_INFO$1.IS_READ_ONLY = void 0;
const generic_transformers_1$f = genericTransformers;
COMMAND_INFO$1.IS_READ_ONLY = true;
function transformArguments$22(commands) {
    return ['COMMAND', 'INFO', ...commands];
}
COMMAND_INFO$1.transformArguments = transformArguments$22;
function transformReply$p(reply) {
    return reply.map(command => command ? (0, generic_transformers_1$f.transformCommandReply)(command) : null);
}
COMMAND_INFO$1.transformReply = transformReply$p;

var COMMAND_LIST$1 = {};

Object.defineProperty(COMMAND_LIST$1, "__esModule", { value: true });
COMMAND_LIST$1.transformArguments = COMMAND_LIST$1.FilterBy = COMMAND_LIST$1.IS_READ_ONLY = void 0;
COMMAND_LIST$1.IS_READ_ONLY = true;
var FilterBy;
(function (FilterBy) {
    FilterBy["MODULE"] = "MODULE";
    FilterBy["ACLCAT"] = "ACLCAT";
    FilterBy["PATTERN"] = "PATTERN";
})(FilterBy || (COMMAND_LIST$1.FilterBy = FilterBy = {}));
function transformArguments$21(filter) {
    const args = ['COMMAND', 'LIST'];
    if (filter) {
        args.push('FILTERBY', filter.filterBy, filter.value);
    }
    return args;
}
COMMAND_LIST$1.transformArguments = transformArguments$21;

var COMMAND$1 = {};

Object.defineProperty(COMMAND$1, "__esModule", { value: true });
COMMAND$1.transformReply = COMMAND$1.transformArguments = COMMAND$1.IS_READ_ONLY = void 0;
const generic_transformers_1$e = genericTransformers;
COMMAND$1.IS_READ_ONLY = true;
function transformArguments$20() {
    return ['COMMAND'];
}
COMMAND$1.transformArguments = transformArguments$20;
function transformReply$o(reply) {
    return reply.map(generic_transformers_1$e.transformCommandReply);
}
COMMAND$1.transformReply = transformReply$o;

var CONFIG_GET$3 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = void 0;
	function transformArguments(parameter) {
	    return ['CONFIG', 'GET', parameter];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformTuplesReply; } }); 
} (CONFIG_GET$3));

var CONFIG_RESETSTAT = {};

Object.defineProperty(CONFIG_RESETSTAT, "__esModule", { value: true });
CONFIG_RESETSTAT.transformArguments = void 0;
function transformArguments$1$() {
    return ['CONFIG', 'RESETSTAT'];
}
CONFIG_RESETSTAT.transformArguments = transformArguments$1$;

var CONFIG_REWRITE$1 = {};

Object.defineProperty(CONFIG_REWRITE$1, "__esModule", { value: true });
CONFIG_REWRITE$1.transformArguments = void 0;
function transformArguments$1_() {
    return ['CONFIG', 'REWRITE'];
}
CONFIG_REWRITE$1.transformArguments = transformArguments$1_;

var CONFIG_SET$3 = {};

Object.defineProperty(CONFIG_SET$3, "__esModule", { value: true });
CONFIG_SET$3.transformArguments = void 0;
function transformArguments$1Z(...[parameterOrConfig, value]) {
    const args = ['CONFIG', 'SET'];
    if (typeof parameterOrConfig === 'string') {
        args.push(parameterOrConfig, value);
    }
    else {
        for (const [key, value] of Object.entries(parameterOrConfig)) {
            args.push(key, value);
        }
    }
    return args;
}
CONFIG_SET$3.transformArguments = transformArguments$1Z;

var DBSIZE$1 = {};

Object.defineProperty(DBSIZE$1, "__esModule", { value: true });
DBSIZE$1.transformArguments = DBSIZE$1.IS_READ_ONLY = void 0;
DBSIZE$1.IS_READ_ONLY = true;
function transformArguments$1Y() {
    return ['DBSIZE'];
}
DBSIZE$1.transformArguments = transformArguments$1Y;

var DISCARD$1 = {};

Object.defineProperty(DISCARD$1, "__esModule", { value: true });
DISCARD$1.transformArguments = void 0;
function transformArguments$1X() {
    return ['DISCARD'];
}
DISCARD$1.transformArguments = transformArguments$1X;

var ECHO$1 = {};

Object.defineProperty(ECHO$1, "__esModule", { value: true });
ECHO$1.transformArguments = ECHO$1.IS_READ_ONLY = void 0;
ECHO$1.IS_READ_ONLY = true;
function transformArguments$1W(message) {
    return ['ECHO', message];
}
ECHO$1.transformArguments = transformArguments$1W;

var FAILOVER$1 = {};

Object.defineProperty(FAILOVER$1, "__esModule", { value: true });
FAILOVER$1.transformArguments = void 0;
function transformArguments$1V(options) {
    const args = ['FAILOVER'];
    if (options?.TO) {
        args.push('TO', options.TO.host, options.TO.port.toString());
        if (options.TO.FORCE) {
            args.push('FORCE');
        }
    }
    if (options?.ABORT) {
        args.push('ABORT');
    }
    if (options?.TIMEOUT) {
        args.push('TIMEOUT', options.TIMEOUT.toString());
    }
    return args;
}
FAILOVER$1.transformArguments = transformArguments$1V;

var FLUSHALL$1 = {};

Object.defineProperty(FLUSHALL$1, "__esModule", { value: true });
FLUSHALL$1.transformArguments = FLUSHALL$1.RedisFlushModes = void 0;
var RedisFlushModes;
(function (RedisFlushModes) {
    RedisFlushModes["ASYNC"] = "ASYNC";
    RedisFlushModes["SYNC"] = "SYNC";
})(RedisFlushModes || (FLUSHALL$1.RedisFlushModes = RedisFlushModes = {}));
function transformArguments$1U(mode) {
    const args = ['FLUSHALL'];
    if (mode) {
        args.push(mode);
    }
    return args;
}
FLUSHALL$1.transformArguments = transformArguments$1U;

var FLUSHDB$1 = {};

Object.defineProperty(FLUSHDB$1, "__esModule", { value: true });
FLUSHDB$1.transformArguments = void 0;
function transformArguments$1T(mode) {
    const args = ['FLUSHDB'];
    if (mode) {
        args.push(mode);
    }
    return args;
}
FLUSHDB$1.transformArguments = transformArguments$1T;

var FUNCTION_DELETE$1 = {};

Object.defineProperty(FUNCTION_DELETE$1, "__esModule", { value: true });
FUNCTION_DELETE$1.transformArguments = void 0;
function transformArguments$1S(library) {
    return ['FUNCTION', 'DELETE', library];
}
FUNCTION_DELETE$1.transformArguments = transformArguments$1S;

var FUNCTION_DUMP$1 = {};

Object.defineProperty(FUNCTION_DUMP$1, "__esModule", { value: true });
FUNCTION_DUMP$1.transformArguments = void 0;
function transformArguments$1R() {
    return ['FUNCTION', 'DUMP'];
}
FUNCTION_DUMP$1.transformArguments = transformArguments$1R;

var FUNCTION_FLUSH$1 = {};

Object.defineProperty(FUNCTION_FLUSH$1, "__esModule", { value: true });
FUNCTION_FLUSH$1.transformArguments = void 0;
function transformArguments$1Q(mode) {
    const args = ['FUNCTION', 'FLUSH'];
    if (mode) {
        args.push(mode);
    }
    return args;
}
FUNCTION_FLUSH$1.transformArguments = transformArguments$1Q;

var FUNCTION_KILL$1 = {};

Object.defineProperty(FUNCTION_KILL$1, "__esModule", { value: true });
FUNCTION_KILL$1.transformArguments = void 0;
function transformArguments$1P() {
    return ['FUNCTION', 'KILL'];
}
FUNCTION_KILL$1.transformArguments = transformArguments$1P;

var FUNCTION_LIST_WITHCODE$1 = {};

var FUNCTION_LIST$1 = {};

Object.defineProperty(FUNCTION_LIST$1, "__esModule", { value: true });
FUNCTION_LIST$1.transformReply = FUNCTION_LIST$1.transformArguments = void 0;
const generic_transformers_1$d = genericTransformers;
function transformArguments$1O(pattern) {
    const args = ['FUNCTION', 'LIST'];
    if (pattern) {
        args.push(pattern);
    }
    return args;
}
FUNCTION_LIST$1.transformArguments = transformArguments$1O;
function transformReply$n(reply) {
    return reply.map(generic_transformers_1$d.transformFunctionListItemReply);
}
FUNCTION_LIST$1.transformReply = transformReply$n;

Object.defineProperty(FUNCTION_LIST_WITHCODE$1, "__esModule", { value: true });
FUNCTION_LIST_WITHCODE$1.transformReply = FUNCTION_LIST_WITHCODE$1.transformArguments = void 0;
const FUNCTION_LIST_1 = FUNCTION_LIST$1;
const generic_transformers_1$c = genericTransformers;
function transformArguments$1N(pattern) {
    const args = (0, FUNCTION_LIST_1.transformArguments)(pattern);
    args.push('WITHCODE');
    return args;
}
FUNCTION_LIST_WITHCODE$1.transformArguments = transformArguments$1N;
function transformReply$m(reply) {
    return reply.map(library => ({
        ...(0, generic_transformers_1$c.transformFunctionListItemReply)(library),
        libraryCode: library[7]
    }));
}
FUNCTION_LIST_WITHCODE$1.transformReply = transformReply$m;

var FUNCTION_LOAD$1 = {};

Object.defineProperty(FUNCTION_LOAD$1, "__esModule", { value: true });
FUNCTION_LOAD$1.transformArguments = void 0;
function transformArguments$1M(code, options) {
    const args = ['FUNCTION', 'LOAD'];
    if (options?.REPLACE) {
        args.push('REPLACE');
    }
    args.push(code);
    return args;
}
FUNCTION_LOAD$1.transformArguments = transformArguments$1M;

var FUNCTION_RESTORE$1 = {};

Object.defineProperty(FUNCTION_RESTORE$1, "__esModule", { value: true });
FUNCTION_RESTORE$1.transformArguments = void 0;
function transformArguments$1L(dump, mode) {
    const args = ['FUNCTION', 'RESTORE', dump];
    if (mode) {
        args.push(mode);
    }
    return args;
}
FUNCTION_RESTORE$1.transformArguments = transformArguments$1L;

var FUNCTION_STATS$1 = {};

Object.defineProperty(FUNCTION_STATS$1, "__esModule", { value: true });
FUNCTION_STATS$1.transformReply = FUNCTION_STATS$1.transformArguments = void 0;
function transformArguments$1K() {
    return ['FUNCTION', 'STATS'];
}
FUNCTION_STATS$1.transformArguments = transformArguments$1K;
function transformReply$l(reply) {
    const engines = Object.create(null);
    for (let i = 0; i < reply[3].length; i++) {
        engines[reply[3][i]] = {
            librariesCount: reply[3][++i][1],
            functionsCount: reply[3][i][3]
        };
    }
    return {
        runningScript: reply[1] === null ? null : {
            name: reply[1][1],
            command: reply[1][3],
            durationMs: reply[1][5]
        },
        engines
    };
}
FUNCTION_STATS$1.transformReply = transformReply$l;

var HELLO$1 = {};

Object.defineProperty(HELLO$1, "__esModule", { value: true });
HELLO$1.transformReply = HELLO$1.transformArguments = void 0;
function transformArguments$1J(options) {
    const args = ['HELLO'];
    if (options) {
        args.push(options.protover.toString());
        if (options.auth) {
            args.push('AUTH', options.auth.username, options.auth.password);
        }
        if (options.clientName) {
            args.push('SETNAME', options.clientName);
        }
    }
    return args;
}
HELLO$1.transformArguments = transformArguments$1J;
function transformReply$k(reply) {
    return {
        server: reply[1],
        version: reply[3],
        proto: reply[5],
        id: reply[7],
        mode: reply[9],
        role: reply[11],
        modules: reply[13]
    };
}
HELLO$1.transformReply = transformReply$k;

var INFO$b = {};

Object.defineProperty(INFO$b, "__esModule", { value: true });
INFO$b.transformArguments = INFO$b.IS_READ_ONLY = void 0;
INFO$b.IS_READ_ONLY = true;
function transformArguments$1I(section) {
    const args = ['INFO'];
    if (section) {
        args.push(section);
    }
    return args;
}
INFO$b.transformArguments = transformArguments$1I;

var KEYS$1 = {};

Object.defineProperty(KEYS$1, "__esModule", { value: true });
KEYS$1.transformArguments = void 0;
function transformArguments$1H(pattern) {
    return ['KEYS', pattern];
}
KEYS$1.transformArguments = transformArguments$1H;

var LASTSAVE$1 = {};

Object.defineProperty(LASTSAVE$1, "__esModule", { value: true });
LASTSAVE$1.transformReply = LASTSAVE$1.transformArguments = LASTSAVE$1.IS_READ_ONLY = void 0;
LASTSAVE$1.IS_READ_ONLY = true;
function transformArguments$1G() {
    return ['LASTSAVE'];
}
LASTSAVE$1.transformArguments = transformArguments$1G;
function transformReply$j(reply) {
    return new Date(reply);
}
LASTSAVE$1.transformReply = transformReply$j;

var LATENCY_DOCTOR$1 = {};

Object.defineProperty(LATENCY_DOCTOR$1, "__esModule", { value: true });
LATENCY_DOCTOR$1.transformArguments = void 0;
function transformArguments$1F() {
    return ['LATENCY', 'DOCTOR'];
}
LATENCY_DOCTOR$1.transformArguments = transformArguments$1F;

var LATENCY_GRAPH$1 = {};

Object.defineProperty(LATENCY_GRAPH$1, "__esModule", { value: true });
LATENCY_GRAPH$1.transformArguments = void 0;
function transformArguments$1E(event) {
    return ['LATENCY', 'GRAPH', event];
}
LATENCY_GRAPH$1.transformArguments = transformArguments$1E;

var LATENCY_HISTORY$1 = {};

Object.defineProperty(LATENCY_HISTORY$1, "__esModule", { value: true });
LATENCY_HISTORY$1.transformArguments = void 0;
function transformArguments$1D(event) {
    return ['LATENCY', 'HISTORY', event];
}
LATENCY_HISTORY$1.transformArguments = transformArguments$1D;

var LATENCY_LATEST$1 = {};

Object.defineProperty(LATENCY_LATEST$1, "__esModule", { value: true });
LATENCY_LATEST$1.transformArguments = void 0;
function transformArguments$1C() {
    return ['LATENCY', 'LATEST'];
}
LATENCY_LATEST$1.transformArguments = transformArguments$1C;

var LOLWUT$1 = {};

Object.defineProperty(LOLWUT$1, "__esModule", { value: true });
LOLWUT$1.transformArguments = LOLWUT$1.IS_READ_ONLY = void 0;
LOLWUT$1.IS_READ_ONLY = true;
function transformArguments$1B(version, ...optionalArguments) {
    const args = ['LOLWUT'];
    if (version) {
        args.push('VERSION', version.toString(), ...optionalArguments.map(String));
    }
    return args;
}
LOLWUT$1.transformArguments = transformArguments$1B;

var MEMORY_DOCTOR$1 = {};

Object.defineProperty(MEMORY_DOCTOR$1, "__esModule", { value: true });
MEMORY_DOCTOR$1.transformArguments = void 0;
function transformArguments$1A() {
    return ['MEMORY', 'DOCTOR'];
}
MEMORY_DOCTOR$1.transformArguments = transformArguments$1A;

var MEMORY_MALLOCSTATS = {};

Object.defineProperty(MEMORY_MALLOCSTATS, "__esModule", { value: true });
MEMORY_MALLOCSTATS.transformArguments = void 0;
function transformArguments$1z() {
    return ['MEMORY', 'MALLOC-STATS'];
}
MEMORY_MALLOCSTATS.transformArguments = transformArguments$1z;

var MEMORY_PURGE$1 = {};

Object.defineProperty(MEMORY_PURGE$1, "__esModule", { value: true });
MEMORY_PURGE$1.transformArguments = void 0;
function transformArguments$1y() {
    return ['MEMORY', 'PURGE'];
}
MEMORY_PURGE$1.transformArguments = transformArguments$1y;

var MEMORY_STATS$1 = {};

Object.defineProperty(MEMORY_STATS$1, "__esModule", { value: true });
MEMORY_STATS$1.transformReply = MEMORY_STATS$1.transformArguments = void 0;
function transformArguments$1x() {
    return ['MEMORY', 'STATS'];
}
MEMORY_STATS$1.transformArguments = transformArguments$1x;
const FIELDS_MAPPING = {
    'peak.allocated': 'peakAllocated',
    'total.allocated': 'totalAllocated',
    'startup.allocated': 'startupAllocated',
    'replication.backlog': 'replicationBacklog',
    'clients.slaves': 'clientsReplicas',
    'clients.normal': 'clientsNormal',
    'aof.buffer': 'aofBuffer',
    'lua.caches': 'luaCaches',
    'overhead.total': 'overheadTotal',
    'keys.count': 'keysCount',
    'keys.bytes-per-key': 'keysBytesPerKey',
    'dataset.bytes': 'datasetBytes',
    'dataset.percentage': 'datasetPercentage',
    'peak.percentage': 'peakPercentage',
    'allocator.allocated': 'allocatorAllocated',
    'allocator.active': 'allocatorActive',
    'allocator.resident': 'allocatorResident',
    'allocator-fragmentation.ratio': 'allocatorFragmentationRatio',
    'allocator-fragmentation.bytes': 'allocatorFragmentationBytes',
    'allocator-rss.ratio': 'allocatorRssRatio',
    'allocator-rss.bytes': 'allocatorRssBytes',
    'rss-overhead.ratio': 'rssOverheadRatio',
    'rss-overhead.bytes': 'rssOverheadBytes',
    'fragmentation': 'fragmentation',
    'fragmentation.bytes': 'fragmentationBytes'
}, DB_FIELDS_MAPPING = {
    'overhead.hashtable.main': 'overheadHashtableMain',
    'overhead.hashtable.expires': 'overheadHashtableExpires'
};
function transformReply$i(rawReply) {
    const reply = {
        db: {}
    };
    for (let i = 0; i < rawReply.length; i += 2) {
        const key = rawReply[i];
        if (key.startsWith('db.')) {
            const dbTuples = rawReply[i + 1], db = {};
            for (let j = 0; j < dbTuples.length; j += 2) {
                db[DB_FIELDS_MAPPING[dbTuples[j]]] = dbTuples[j + 1];
            }
            reply.db[key.substring(3)] = db;
            continue;
        }
        reply[FIELDS_MAPPING[key]] = Number(rawReply[i + 1]);
    }
    return reply;
}
MEMORY_STATS$1.transformReply = transformReply$i;

var MEMORY_USAGE$1 = {};

Object.defineProperty(MEMORY_USAGE$1, "__esModule", { value: true });
MEMORY_USAGE$1.transformArguments = MEMORY_USAGE$1.IS_READ_ONLY = MEMORY_USAGE$1.FIRST_KEY_INDEX = void 0;
MEMORY_USAGE$1.FIRST_KEY_INDEX = 1;
MEMORY_USAGE$1.IS_READ_ONLY = true;
function transformArguments$1w(key, options) {
    const args = ['MEMORY', 'USAGE', key];
    if (options?.SAMPLES) {
        args.push('SAMPLES', options.SAMPLES.toString());
    }
    return args;
}
MEMORY_USAGE$1.transformArguments = transformArguments$1w;

var MODULE_LIST$1 = {};

Object.defineProperty(MODULE_LIST$1, "__esModule", { value: true });
MODULE_LIST$1.transformArguments = void 0;
function transformArguments$1v() {
    return ['MODULE', 'LIST'];
}
MODULE_LIST$1.transformArguments = transformArguments$1v;

var MODULE_LOAD$1 = {};

Object.defineProperty(MODULE_LOAD$1, "__esModule", { value: true });
MODULE_LOAD$1.transformArguments = void 0;
function transformArguments$1u(path, moduleArgs) {
    const args = ['MODULE', 'LOAD', path];
    if (moduleArgs) {
        args.push(...moduleArgs);
    }
    return args;
}
MODULE_LOAD$1.transformArguments = transformArguments$1u;

var MODULE_UNLOAD$1 = {};

Object.defineProperty(MODULE_UNLOAD$1, "__esModule", { value: true });
MODULE_UNLOAD$1.transformArguments = void 0;
function transformArguments$1t(name) {
    return ['MODULE', 'UNLOAD', name];
}
MODULE_UNLOAD$1.transformArguments = transformArguments$1t;

var MOVE$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, db) {
	    return ['MOVE', key, db.toString()];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (MOVE$1));

var PING$1 = {};

Object.defineProperty(PING$1, "__esModule", { value: true });
PING$1.transformArguments = void 0;
function transformArguments$1s(message) {
    const args = ['PING'];
    if (message) {
        args.push(message);
    }
    return args;
}
PING$1.transformArguments = transformArguments$1s;

var PUBSUB_CHANNELS$1 = {};

Object.defineProperty(PUBSUB_CHANNELS$1, "__esModule", { value: true });
PUBSUB_CHANNELS$1.transformArguments = PUBSUB_CHANNELS$1.IS_READ_ONLY = void 0;
PUBSUB_CHANNELS$1.IS_READ_ONLY = true;
function transformArguments$1r(pattern) {
    const args = ['PUBSUB', 'CHANNELS'];
    if (pattern) {
        args.push(pattern);
    }
    return args;
}
PUBSUB_CHANNELS$1.transformArguments = transformArguments$1r;

var PUBSUB_NUMPAT$1 = {};

Object.defineProperty(PUBSUB_NUMPAT$1, "__esModule", { value: true });
PUBSUB_NUMPAT$1.transformArguments = PUBSUB_NUMPAT$1.IS_READ_ONLY = void 0;
PUBSUB_NUMPAT$1.IS_READ_ONLY = true;
function transformArguments$1q() {
    return ['PUBSUB', 'NUMPAT'];
}
PUBSUB_NUMPAT$1.transformArguments = transformArguments$1q;

var PUBSUB_NUMSUB$1 = {};

Object.defineProperty(PUBSUB_NUMSUB$1, "__esModule", { value: true });
PUBSUB_NUMSUB$1.transformReply = PUBSUB_NUMSUB$1.transformArguments = PUBSUB_NUMSUB$1.IS_READ_ONLY = void 0;
const generic_transformers_1$b = genericTransformers;
PUBSUB_NUMSUB$1.IS_READ_ONLY = true;
function transformArguments$1p(channels) {
    const args = ['PUBSUB', 'NUMSUB'];
    if (channels)
        return (0, generic_transformers_1$b.pushVerdictArguments)(args, channels);
    return args;
}
PUBSUB_NUMSUB$1.transformArguments = transformArguments$1p;
function transformReply$h(rawReply) {
    const transformedReply = Object.create(null);
    for (let i = 0; i < rawReply.length; i += 2) {
        transformedReply[rawReply[i]] = rawReply[i + 1];
    }
    return transformedReply;
}
PUBSUB_NUMSUB$1.transformReply = transformReply$h;

var PUBSUB_SHARDCHANNELS$1 = {};

Object.defineProperty(PUBSUB_SHARDCHANNELS$1, "__esModule", { value: true });
PUBSUB_SHARDCHANNELS$1.transformArguments = PUBSUB_SHARDCHANNELS$1.IS_READ_ONLY = void 0;
PUBSUB_SHARDCHANNELS$1.IS_READ_ONLY = true;
function transformArguments$1o(pattern) {
    const args = ['PUBSUB', 'SHARDCHANNELS'];
    if (pattern)
        args.push(pattern);
    return args;
}
PUBSUB_SHARDCHANNELS$1.transformArguments = transformArguments$1o;

var PUBSUB_SHARDNUMSUB$1 = {};

Object.defineProperty(PUBSUB_SHARDNUMSUB$1, "__esModule", { value: true });
PUBSUB_SHARDNUMSUB$1.transformReply = PUBSUB_SHARDNUMSUB$1.transformArguments = PUBSUB_SHARDNUMSUB$1.IS_READ_ONLY = void 0;
const generic_transformers_1$a = genericTransformers;
PUBSUB_SHARDNUMSUB$1.IS_READ_ONLY = true;
function transformArguments$1n(channels) {
    const args = ['PUBSUB', 'SHARDNUMSUB'];
    if (channels)
        return (0, generic_transformers_1$a.pushVerdictArguments)(args, channels);
    return args;
}
PUBSUB_SHARDNUMSUB$1.transformArguments = transformArguments$1n;
function transformReply$g(rawReply) {
    const transformedReply = Object.create(null);
    for (let i = 0; i < rawReply.length; i += 2) {
        transformedReply[rawReply[i]] = rawReply[i + 1];
    }
    return transformedReply;
}
PUBSUB_SHARDNUMSUB$1.transformReply = transformReply$g;

var RANDOMKEY$1 = {};

Object.defineProperty(RANDOMKEY$1, "__esModule", { value: true });
RANDOMKEY$1.transformArguments = RANDOMKEY$1.IS_READ_ONLY = void 0;
RANDOMKEY$1.IS_READ_ONLY = true;
function transformArguments$1m() {
    return ['RANDOMKEY'];
}
RANDOMKEY$1.transformArguments = transformArguments$1m;

var READONLY$1 = {};

Object.defineProperty(READONLY$1, "__esModule", { value: true });
READONLY$1.transformArguments = void 0;
function transformArguments$1l() {
    return ['READONLY'];
}
READONLY$1.transformArguments = transformArguments$1l;

var READWRITE$1 = {};

Object.defineProperty(READWRITE$1, "__esModule", { value: true });
READWRITE$1.transformArguments = void 0;
function transformArguments$1k() {
    return ['READWRITE'];
}
READWRITE$1.transformArguments = transformArguments$1k;

var REPLICAOF$1 = {};

Object.defineProperty(REPLICAOF$1, "__esModule", { value: true });
REPLICAOF$1.transformArguments = void 0;
function transformArguments$1j(host, port) {
    return ['REPLICAOF', host, port.toString()];
}
REPLICAOF$1.transformArguments = transformArguments$1j;

var RESTOREASKING = {};

Object.defineProperty(RESTOREASKING, "__esModule", { value: true });
RESTOREASKING.transformArguments = void 0;
function transformArguments$1i() {
    return ['RESTORE-ASKING'];
}
RESTOREASKING.transformArguments = transformArguments$1i;

var ROLE$1 = {};

Object.defineProperty(ROLE$1, "__esModule", { value: true });
ROLE$1.transformReply = ROLE$1.transformArguments = ROLE$1.IS_READ_ONLY = void 0;
ROLE$1.IS_READ_ONLY = true;
function transformArguments$1h() {
    return ['ROLE'];
}
ROLE$1.transformArguments = transformArguments$1h;
function transformReply$f(reply) {
    switch (reply[0]) {
        case 'master':
            return {
                role: 'master',
                replicationOffest: reply[1],
                replicas: reply[2].map(([ip, port, replicationOffest]) => ({
                    ip,
                    port: Number(port),
                    replicationOffest: Number(replicationOffest)
                }))
            };
        case 'slave':
            return {
                role: 'slave',
                master: {
                    ip: reply[1],
                    port: reply[2]
                },
                state: reply[3],
                dataReceived: reply[4]
            };
        case 'sentinel':
            return {
                role: 'sentinel',
                masterNames: reply[1]
            };
    }
}
ROLE$1.transformReply = transformReply$f;

var SAVE$1 = {};

Object.defineProperty(SAVE$1, "__esModule", { value: true });
SAVE$1.transformArguments = void 0;
function transformArguments$1g() {
    return ['SAVE'];
}
SAVE$1.transformArguments = transformArguments$1g;

var SCAN$1 = {};

Object.defineProperty(SCAN$1, "__esModule", { value: true });
SCAN$1.transformReply = SCAN$1.transformArguments = SCAN$1.IS_READ_ONLY = void 0;
const generic_transformers_1$9 = genericTransformers;
SCAN$1.IS_READ_ONLY = true;
function transformArguments$1f(cursor, options) {
    const args = (0, generic_transformers_1$9.pushScanArguments)(['SCAN'], cursor, options);
    if (options?.TYPE) {
        args.push('TYPE', options.TYPE);
    }
    return args;
}
SCAN$1.transformArguments = transformArguments$1f;
function transformReply$e([cursor, keys]) {
    return {
        cursor: Number(cursor),
        keys
    };
}
SCAN$1.transformReply = transformReply$e;

var SCRIPT_DEBUG$1 = {};

Object.defineProperty(SCRIPT_DEBUG$1, "__esModule", { value: true });
SCRIPT_DEBUG$1.transformArguments = void 0;
function transformArguments$1e(mode) {
    return ['SCRIPT', 'DEBUG', mode];
}
SCRIPT_DEBUG$1.transformArguments = transformArguments$1e;

var SCRIPT_EXISTS$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = void 0;
	const generic_transformers_1 = genericTransformers;
	function transformArguments(sha1) {
	    return (0, generic_transformers_1.pushVerdictArguments)(['SCRIPT', 'EXISTS'], sha1);
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_2 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformBooleanArrayReply; } }); 
} (SCRIPT_EXISTS$1));

var SCRIPT_FLUSH$1 = {};

Object.defineProperty(SCRIPT_FLUSH$1, "__esModule", { value: true });
SCRIPT_FLUSH$1.transformArguments = void 0;
function transformArguments$1d(mode) {
    const args = ['SCRIPT', 'FLUSH'];
    if (mode) {
        args.push(mode);
    }
    return args;
}
SCRIPT_FLUSH$1.transformArguments = transformArguments$1d;

var SCRIPT_KILL$1 = {};

Object.defineProperty(SCRIPT_KILL$1, "__esModule", { value: true });
SCRIPT_KILL$1.transformArguments = void 0;
function transformArguments$1c() {
    return ['SCRIPT', 'KILL'];
}
SCRIPT_KILL$1.transformArguments = transformArguments$1c;

var SCRIPT_LOAD$1 = {};

Object.defineProperty(SCRIPT_LOAD$1, "__esModule", { value: true });
SCRIPT_LOAD$1.transformArguments = void 0;
function transformArguments$1b(script) {
    return ['SCRIPT', 'LOAD', script];
}
SCRIPT_LOAD$1.transformArguments = transformArguments$1b;

var SHUTDOWN$1 = {};

Object.defineProperty(SHUTDOWN$1, "__esModule", { value: true });
SHUTDOWN$1.transformArguments = void 0;
function transformArguments$1a(mode) {
    const args = ['SHUTDOWN'];
    if (mode) {
        args.push(mode);
    }
    return args;
}
SHUTDOWN$1.transformArguments = transformArguments$1a;

var SWAPDB$1 = {};

Object.defineProperty(SWAPDB$1, "__esModule", { value: true });
SWAPDB$1.transformArguments = void 0;
function transformArguments$19(index1, index2) {
    return ['SWAPDB', index1.toString(), index2.toString()];
}
SWAPDB$1.transformArguments = transformArguments$19;

var TIME$1 = {};

Object.defineProperty(TIME$1, "__esModule", { value: true });
TIME$1.transformReply = TIME$1.transformArguments = void 0;
function transformArguments$18() {
    return ['TIME'];
}
TIME$1.transformArguments = transformArguments$18;
function transformReply$d(reply) {
    const seconds = Number(reply[0]), microseconds = Number(reply[1]), d = new Date(seconds * 1000 + microseconds / 1000);
    d.microseconds = microseconds;
    return d;
}
TIME$1.transformReply = transformReply$d;

var UNWATCH$1 = {};

Object.defineProperty(UNWATCH$1, "__esModule", { value: true });
UNWATCH$1.transformArguments = void 0;
function transformArguments$17() {
    return ['UNWATCH'];
}
UNWATCH$1.transformArguments = transformArguments$17;

var WAIT$1 = {};

Object.defineProperty(WAIT$1, "__esModule", { value: true });
WAIT$1.transformArguments = WAIT$1.FIRST_KEY_INDEX = void 0;
WAIT$1.FIRST_KEY_INDEX = 1;
function transformArguments$16(numberOfReplicas, timeout) {
    return ['WAIT', numberOfReplicas.toString(), timeout.toString()];
}
WAIT$1.transformArguments = transformArguments$16;

Object.defineProperty(commands$6, "__esModule", { value: true });
const commands_1$2 = commands$5;
const ACL_CAT = ACL_CAT$1;
const ACL_DELUSER = ACL_DELUSER$1;
const ACL_DRYRUN = ACL_DRYRUN$1;
const ACL_GENPASS = ACL_GENPASS$1;
const ACL_GETUSER = ACL_GETUSER$1;
const ACL_LIST = ACL_LIST$1;
const ACL_LOAD = ACL_LOAD$1;
const ACL_LOG_RESET = ACL_LOG_RESET$1;
const ACL_LOG = ACL_LOG$1;
const ACL_SAVE = ACL_SAVE$1;
const ACL_SETUSER = ACL_SETUSER$1;
const ACL_USERS = ACL_USERS$1;
const ACL_WHOAMI = ACL_WHOAMI$1;
const ASKING = ASKING$1;
const AUTH = AUTH$1;
const BGREWRITEAOF = BGREWRITEAOF$1;
const BGSAVE = BGSAVE$1;
const CLIENT_CACHING = CLIENT_CACHING$1;
const CLIENT_GETNAME = CLIENT_GETNAME$1;
const CLIENT_GETREDIR = CLIENT_GETREDIR$1;
const CLIENT_ID = CLIENT_ID$1;
const CLIENT_KILL = CLIENT_KILL$1;
const CLIENT_LIST = CLIENT_LIST$1;
const CLIENT_NO_EVICT = CLIENT_NOEVICT;
const CLIENT_NO_TOUCH = CLIENT_NOTOUCH;
const CLIENT_PAUSE = CLIENT_PAUSE$1;
const CLIENT_SETNAME = CLIENT_SETNAME$1;
const CLIENT_TRACKING = CLIENT_TRACKING$1;
const CLIENT_TRACKINGINFO = CLIENT_TRACKINGINFO$1;
const CLIENT_UNPAUSE = CLIENT_UNPAUSE$1;
const CLIENT_INFO = CLIENT_INFO$1;
const CLUSTER_ADDSLOTS = CLUSTER_ADDSLOTS$1;
const CLUSTER_ADDSLOTSRANGE = CLUSTER_ADDSLOTSRANGE$1;
const CLUSTER_BUMPEPOCH = CLUSTER_BUMPEPOCH$1;
const CLUSTER_COUNT_FAILURE_REPORTS = CLUSTER_COUNTFAILUREREPORTS;
const CLUSTER_COUNTKEYSINSLOT = CLUSTER_COUNTKEYSINSLOT$1;
const CLUSTER_DELSLOTS = CLUSTER_DELSLOTS$1;
const CLUSTER_DELSLOTSRANGE = CLUSTER_DELSLOTSRANGE$1;
const CLUSTER_FAILOVER = CLUSTER_FAILOVER$1;
const CLUSTER_FLUSHSLOTS = CLUSTER_FLUSHSLOTS$1;
const CLUSTER_FORGET = CLUSTER_FORGET$1;
const CLUSTER_GETKEYSINSLOT = CLUSTER_GETKEYSINSLOT$1;
const CLUSTER_INFO = CLUSTER_INFO$1;
const CLUSTER_KEYSLOT = CLUSTER_KEYSLOT$1;
const CLUSTER_LINKS = CLUSTER_LINKS$1;
const CLUSTER_MEET = CLUSTER_MEET$1;
const CLUSTER_MYID = CLUSTER_MYID$1;
const CLUSTER_MYSHARDID = CLUSTER_MYSHARDID$1;
const CLUSTER_NODES = CLUSTER_NODES$1;
const CLUSTER_REPLICAS = CLUSTER_REPLICAS$1;
const CLUSTER_REPLICATE = CLUSTER_REPLICATE$1;
const CLUSTER_RESET = CLUSTER_RESET$1;
const CLUSTER_SAVECONFIG = CLUSTER_SAVECONFIG$1;
const CLUSTER_SET_CONFIG_EPOCH = CLUSTER_SETCONFIGEPOCH;
const CLUSTER_SETSLOT = CLUSTER_SETSLOT$1;
const CLUSTER_SLOTS = CLUSTER_SLOTS$1;
const COMMAND_COUNT = COMMAND_COUNT$1;
const COMMAND_GETKEYS = COMMAND_GETKEYS$1;
const COMMAND_GETKEYSANDFLAGS = COMMAND_GETKEYSANDFLAGS$1;
const COMMAND_INFO = COMMAND_INFO$1;
const COMMAND_LIST = COMMAND_LIST$1;
const COMMAND = COMMAND$1;
const CONFIG_GET$2 = CONFIG_GET$3;
const CONFIG_RESETASTAT = CONFIG_RESETSTAT;
const CONFIG_REWRITE = CONFIG_REWRITE$1;
const CONFIG_SET$2 = CONFIG_SET$3;
const DBSIZE = DBSIZE$1;
const DISCARD = DISCARD$1;
const ECHO = ECHO$1;
const FAILOVER = FAILOVER$1;
const FLUSHALL = FLUSHALL$1;
const FLUSHDB = FLUSHDB$1;
const FUNCTION_DELETE = FUNCTION_DELETE$1;
const FUNCTION_DUMP = FUNCTION_DUMP$1;
const FUNCTION_FLUSH = FUNCTION_FLUSH$1;
const FUNCTION_KILL = FUNCTION_KILL$1;
const FUNCTION_LIST_WITHCODE = FUNCTION_LIST_WITHCODE$1;
const FUNCTION_LIST = FUNCTION_LIST$1;
const FUNCTION_LOAD = FUNCTION_LOAD$1;
const FUNCTION_RESTORE = FUNCTION_RESTORE$1;
const FUNCTION_STATS = FUNCTION_STATS$1;
const HELLO = HELLO$1;
const INFO$a = INFO$b;
const KEYS = KEYS$1;
const LASTSAVE = LASTSAVE$1;
const LATENCY_DOCTOR = LATENCY_DOCTOR$1;
const LATENCY_GRAPH = LATENCY_GRAPH$1;
const LATENCY_HISTORY = LATENCY_HISTORY$1;
const LATENCY_LATEST = LATENCY_LATEST$1;
const LOLWUT = LOLWUT$1;
const MEMORY_DOCTOR = MEMORY_DOCTOR$1;
const MEMORY_MALLOC_STATS = MEMORY_MALLOCSTATS;
const MEMORY_PURGE = MEMORY_PURGE$1;
const MEMORY_STATS = MEMORY_STATS$1;
const MEMORY_USAGE = MEMORY_USAGE$1;
const MODULE_LIST = MODULE_LIST$1;
const MODULE_LOAD = MODULE_LOAD$1;
const MODULE_UNLOAD = MODULE_UNLOAD$1;
const MOVE = MOVE$1;
const PING = PING$1;
const PUBSUB_CHANNELS = PUBSUB_CHANNELS$1;
const PUBSUB_NUMPAT = PUBSUB_NUMPAT$1;
const PUBSUB_NUMSUB = PUBSUB_NUMSUB$1;
const PUBSUB_SHARDCHANNELS = PUBSUB_SHARDCHANNELS$1;
const PUBSUB_SHARDNUMSUB = PUBSUB_SHARDNUMSUB$1;
const RANDOMKEY = RANDOMKEY$1;
const READONLY = READONLY$1;
const READWRITE = READWRITE$1;
const REPLICAOF = REPLICAOF$1;
const RESTORE_ASKING = RESTOREASKING;
const ROLE = ROLE$1;
const SAVE = SAVE$1;
const SCAN = SCAN$1;
const SCRIPT_DEBUG = SCRIPT_DEBUG$1;
const SCRIPT_EXISTS = SCRIPT_EXISTS$1;
const SCRIPT_FLUSH = SCRIPT_FLUSH$1;
const SCRIPT_KILL = SCRIPT_KILL$1;
const SCRIPT_LOAD = SCRIPT_LOAD$1;
const SHUTDOWN = SHUTDOWN$1;
const SWAPDB = SWAPDB$1;
const TIME = TIME$1;
const UNWATCH = UNWATCH$1;
const WAIT = WAIT$1;
commands$6.default = {
    ...commands_1$2.default,
    ACL_CAT,
    aclCat: ACL_CAT,
    ACL_DELUSER,
    aclDelUser: ACL_DELUSER,
    ACL_DRYRUN,
    aclDryRun: ACL_DRYRUN,
    ACL_GENPASS,
    aclGenPass: ACL_GENPASS,
    ACL_GETUSER,
    aclGetUser: ACL_GETUSER,
    ACL_LIST,
    aclList: ACL_LIST,
    ACL_LOAD,
    aclLoad: ACL_LOAD,
    ACL_LOG_RESET,
    aclLogReset: ACL_LOG_RESET,
    ACL_LOG,
    aclLog: ACL_LOG,
    ACL_SAVE,
    aclSave: ACL_SAVE,
    ACL_SETUSER,
    aclSetUser: ACL_SETUSER,
    ACL_USERS,
    aclUsers: ACL_USERS,
    ACL_WHOAMI,
    aclWhoAmI: ACL_WHOAMI,
    ASKING,
    asking: ASKING,
    AUTH,
    auth: AUTH,
    BGREWRITEAOF,
    bgRewriteAof: BGREWRITEAOF,
    BGSAVE,
    bgSave: BGSAVE,
    CLIENT_CACHING,
    clientCaching: CLIENT_CACHING,
    CLIENT_GETNAME,
    clientGetName: CLIENT_GETNAME,
    CLIENT_GETREDIR,
    clientGetRedir: CLIENT_GETREDIR,
    CLIENT_ID,
    clientId: CLIENT_ID,
    CLIENT_KILL,
    clientKill: CLIENT_KILL,
    'CLIENT_NO-EVICT': CLIENT_NO_EVICT,
    clientNoEvict: CLIENT_NO_EVICT,
    'CLIENT_NO-TOUCH': CLIENT_NO_TOUCH,
    clientNoTouch: CLIENT_NO_TOUCH,
    CLIENT_LIST,
    clientList: CLIENT_LIST,
    CLIENT_PAUSE,
    clientPause: CLIENT_PAUSE,
    CLIENT_SETNAME,
    clientSetName: CLIENT_SETNAME,
    CLIENT_TRACKING,
    clientTracking: CLIENT_TRACKING,
    CLIENT_TRACKINGINFO,
    clientTrackingInfo: CLIENT_TRACKINGINFO,
    CLIENT_UNPAUSE,
    clientUnpause: CLIENT_UNPAUSE,
    CLIENT_INFO,
    clientInfo: CLIENT_INFO,
    CLUSTER_ADDSLOTS,
    clusterAddSlots: CLUSTER_ADDSLOTS,
    CLUSTER_ADDSLOTSRANGE,
    clusterAddSlotsRange: CLUSTER_ADDSLOTSRANGE,
    CLUSTER_BUMPEPOCH,
    clusterBumpEpoch: CLUSTER_BUMPEPOCH,
    CLUSTER_COUNT_FAILURE_REPORTS,
    clusterCountFailureReports: CLUSTER_COUNT_FAILURE_REPORTS,
    CLUSTER_COUNTKEYSINSLOT,
    clusterCountKeysInSlot: CLUSTER_COUNTKEYSINSLOT,
    CLUSTER_DELSLOTS,
    clusterDelSlots: CLUSTER_DELSLOTS,
    CLUSTER_DELSLOTSRANGE,
    clusterDelSlotsRange: CLUSTER_DELSLOTSRANGE,
    CLUSTER_FAILOVER,
    clusterFailover: CLUSTER_FAILOVER,
    CLUSTER_FLUSHSLOTS,
    clusterFlushSlots: CLUSTER_FLUSHSLOTS,
    CLUSTER_FORGET,
    clusterForget: CLUSTER_FORGET,
    CLUSTER_GETKEYSINSLOT,
    clusterGetKeysInSlot: CLUSTER_GETKEYSINSLOT,
    CLUSTER_INFO,
    clusterInfo: CLUSTER_INFO,
    CLUSTER_KEYSLOT,
    clusterKeySlot: CLUSTER_KEYSLOT,
    CLUSTER_LINKS,
    clusterLinks: CLUSTER_LINKS,
    CLUSTER_MEET,
    clusterMeet: CLUSTER_MEET,
    CLUSTER_MYID,
    clusterMyId: CLUSTER_MYID,
    CLUSTER_MYSHARDID,
    clusterMyShardId: CLUSTER_MYSHARDID,
    CLUSTER_NODES,
    clusterNodes: CLUSTER_NODES,
    CLUSTER_REPLICAS,
    clusterReplicas: CLUSTER_REPLICAS,
    CLUSTER_REPLICATE,
    clusterReplicate: CLUSTER_REPLICATE,
    CLUSTER_RESET,
    clusterReset: CLUSTER_RESET,
    CLUSTER_SAVECONFIG,
    clusterSaveConfig: CLUSTER_SAVECONFIG,
    CLUSTER_SET_CONFIG_EPOCH,
    clusterSetConfigEpoch: CLUSTER_SET_CONFIG_EPOCH,
    CLUSTER_SETSLOT,
    clusterSetSlot: CLUSTER_SETSLOT,
    CLUSTER_SLOTS,
    clusterSlots: CLUSTER_SLOTS,
    COMMAND_COUNT,
    commandCount: COMMAND_COUNT,
    COMMAND_GETKEYS,
    commandGetKeys: COMMAND_GETKEYS,
    COMMAND_GETKEYSANDFLAGS,
    commandGetKeysAndFlags: COMMAND_GETKEYSANDFLAGS,
    COMMAND_INFO,
    commandInfo: COMMAND_INFO,
    COMMAND_LIST,
    commandList: COMMAND_LIST,
    COMMAND,
    command: COMMAND,
    CONFIG_GET: CONFIG_GET$2,
    configGet: CONFIG_GET$2,
    CONFIG_RESETASTAT,
    configResetStat: CONFIG_RESETASTAT,
    CONFIG_REWRITE,
    configRewrite: CONFIG_REWRITE,
    CONFIG_SET: CONFIG_SET$2,
    configSet: CONFIG_SET$2,
    DBSIZE,
    dbSize: DBSIZE,
    DISCARD,
    discard: DISCARD,
    ECHO,
    echo: ECHO,
    FAILOVER,
    failover: FAILOVER,
    FLUSHALL,
    flushAll: FLUSHALL,
    FLUSHDB,
    flushDb: FLUSHDB,
    FUNCTION_DELETE,
    functionDelete: FUNCTION_DELETE,
    FUNCTION_DUMP,
    functionDump: FUNCTION_DUMP,
    FUNCTION_FLUSH,
    functionFlush: FUNCTION_FLUSH,
    FUNCTION_KILL,
    functionKill: FUNCTION_KILL,
    FUNCTION_LIST_WITHCODE,
    functionListWithCode: FUNCTION_LIST_WITHCODE,
    FUNCTION_LIST,
    functionList: FUNCTION_LIST,
    FUNCTION_LOAD,
    functionLoad: FUNCTION_LOAD,
    FUNCTION_RESTORE,
    functionRestore: FUNCTION_RESTORE,
    FUNCTION_STATS,
    functionStats: FUNCTION_STATS,
    HELLO,
    hello: HELLO,
    INFO: INFO$a,
    info: INFO$a,
    KEYS,
    keys: KEYS,
    LASTSAVE,
    lastSave: LASTSAVE,
    LATENCY_DOCTOR,
    latencyDoctor: LATENCY_DOCTOR,
    LATENCY_GRAPH,
    latencyGraph: LATENCY_GRAPH,
    LATENCY_HISTORY,
    latencyHistory: LATENCY_HISTORY,
    LATENCY_LATEST,
    latencyLatest: LATENCY_LATEST,
    LOLWUT,
    lolwut: LOLWUT,
    MEMORY_DOCTOR,
    memoryDoctor: MEMORY_DOCTOR,
    'MEMORY_MALLOC-STATS': MEMORY_MALLOC_STATS,
    memoryMallocStats: MEMORY_MALLOC_STATS,
    MEMORY_PURGE,
    memoryPurge: MEMORY_PURGE,
    MEMORY_STATS,
    memoryStats: MEMORY_STATS,
    MEMORY_USAGE,
    memoryUsage: MEMORY_USAGE,
    MODULE_LIST,
    moduleList: MODULE_LIST,
    MODULE_LOAD,
    moduleLoad: MODULE_LOAD,
    MODULE_UNLOAD,
    moduleUnload: MODULE_UNLOAD,
    MOVE,
    move: MOVE,
    PING,
    ping: PING,
    PUBSUB_CHANNELS,
    pubSubChannels: PUBSUB_CHANNELS,
    PUBSUB_NUMPAT,
    pubSubNumPat: PUBSUB_NUMPAT,
    PUBSUB_NUMSUB,
    pubSubNumSub: PUBSUB_NUMSUB,
    PUBSUB_SHARDCHANNELS,
    pubSubShardChannels: PUBSUB_SHARDCHANNELS,
    PUBSUB_SHARDNUMSUB,
    pubSubShardNumSub: PUBSUB_SHARDNUMSUB,
    RANDOMKEY,
    randomKey: RANDOMKEY,
    READONLY,
    readonly: READONLY,
    READWRITE,
    readwrite: READWRITE,
    REPLICAOF,
    replicaOf: REPLICAOF,
    'RESTORE-ASKING': RESTORE_ASKING,
    restoreAsking: RESTORE_ASKING,
    ROLE,
    role: ROLE,
    SAVE,
    save: SAVE,
    SCAN,
    scan: SCAN,
    SCRIPT_DEBUG,
    scriptDebug: SCRIPT_DEBUG,
    SCRIPT_EXISTS,
    scriptExists: SCRIPT_EXISTS,
    SCRIPT_FLUSH,
    scriptFlush: SCRIPT_FLUSH,
    SCRIPT_KILL,
    scriptKill: SCRIPT_KILL,
    SCRIPT_LOAD,
    scriptLoad: SCRIPT_LOAD,
    SHUTDOWN,
    shutdown: SHUTDOWN,
    SWAPDB,
    swapDb: SWAPDB,
    TIME,
    time: TIME,
    UNWATCH,
    unwatch: UNWATCH,
    WAIT,
    wait: WAIT
};

var socket = {};

const __viteBrowserExternal = {};

const __viteBrowserExternal$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: __viteBrowserExternal
}, Symbol.toStringTag, { value: 'Module' }));

const require$$0 = /*@__PURE__*/getAugmentedNamespace(__viteBrowserExternal$1);

var errors$2 = {};

Object.defineProperty(errors$2, "__esModule", { value: true });
errors$2.MultiErrorReply = errors$2.ErrorReply = errors$2.ReconnectStrategyError = errors$2.RootNodesUnavailableError = errors$2.SocketClosedUnexpectedlyError = errors$2.DisconnectsClientError = errors$2.ClientOfflineError = errors$2.ClientClosedError = errors$2.ConnectionTimeoutError = errors$2.WatchError = errors$2.AbortError = void 0;
class AbortError extends Error {
    constructor() {
        super('The command was aborted');
    }
}
errors$2.AbortError = AbortError;
class WatchError extends Error {
    constructor() {
        super('One (or more) of the watched keys has been changed');
    }
}
errors$2.WatchError = WatchError;
class ConnectionTimeoutError extends Error {
    constructor() {
        super('Connection timeout');
    }
}
errors$2.ConnectionTimeoutError = ConnectionTimeoutError;
class ClientClosedError extends Error {
    constructor() {
        super('The client is closed');
    }
}
errors$2.ClientClosedError = ClientClosedError;
class ClientOfflineError extends Error {
    constructor() {
        super('The client is offline');
    }
}
errors$2.ClientOfflineError = ClientOfflineError;
class DisconnectsClientError extends Error {
    constructor() {
        super('Disconnects client');
    }
}
errors$2.DisconnectsClientError = DisconnectsClientError;
class SocketClosedUnexpectedlyError extends Error {
    constructor() {
        super('Socket closed unexpectedly');
    }
}
errors$2.SocketClosedUnexpectedlyError = SocketClosedUnexpectedlyError;
class RootNodesUnavailableError extends Error {
    constructor() {
        super('All the root nodes are unavailable');
    }
}
errors$2.RootNodesUnavailableError = RootNodesUnavailableError;
class ReconnectStrategyError extends Error {
    constructor(originalError, socketError) {
        super(originalError.message);
        Object.defineProperty(this, "originalError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "socketError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.originalError = originalError;
        this.socketError = socketError;
    }
}
errors$2.ReconnectStrategyError = ReconnectStrategyError;
class ErrorReply extends Error {
    constructor(message) {
        super(message);
        this.stack = undefined;
    }
}
errors$2.ErrorReply = ErrorReply;
class MultiErrorReply extends ErrorReply {
    constructor(replies, errorIndexes) {
        super(`${errorIndexes.length} commands failed, see .replies and .errorIndexes for more information`);
        Object.defineProperty(this, "replies", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "errorIndexes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.replies = replies;
        this.errorIndexes = errorIndexes;
    }
    *errors() {
        for (const index of this.errorIndexes) {
            yield this.replies[index];
        }
    }
}
errors$2.MultiErrorReply = MultiErrorReply;

var utils$1 = {};

Object.defineProperty(utils$1, "__esModule", { value: true });
utils$1.promiseTimeout = void 0;
function promiseTimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
utils$1.promiseTimeout = promiseTimeout;

var __classPrivateFieldGet$6 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$6 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _RedisSocket_instances, _a$4, _RedisSocket_initiateOptions, _RedisSocket_isTlsSocket, _RedisSocket_initiator, _RedisSocket_options, _RedisSocket_socket, _RedisSocket_isOpen, _RedisSocket_isReady, _RedisSocket_writableNeedDrain, _RedisSocket_isSocketUnrefed, _RedisSocket_reconnectStrategy, _RedisSocket_shouldReconnect, _RedisSocket_connect, _RedisSocket_createSocket, _RedisSocket_createNetSocket, _RedisSocket_createTlsSocket, _RedisSocket_onSocketError, _RedisSocket_disconnect, _RedisSocket_isCorked;
Object.defineProperty(socket, "__esModule", { value: true });
const events_1$1 = require$$0;
const net = require$$0;
const tls = require$$0;
const errors_1$5 = errors$2;
const utils_1 = utils$1;
class RedisSocket extends events_1$1.EventEmitter {
    get isOpen() {
        return __classPrivateFieldGet$6(this, _RedisSocket_isOpen, "f");
    }
    get isReady() {
        return __classPrivateFieldGet$6(this, _RedisSocket_isReady, "f");
    }
    get writableNeedDrain() {
        return __classPrivateFieldGet$6(this, _RedisSocket_writableNeedDrain, "f");
    }
    constructor(initiator, options) {
        super();
        _RedisSocket_instances.add(this);
        _RedisSocket_initiator.set(this, void 0);
        _RedisSocket_options.set(this, void 0);
        _RedisSocket_socket.set(this, void 0);
        _RedisSocket_isOpen.set(this, false);
        _RedisSocket_isReady.set(this, false);
        // `writable.writableNeedDrain` was added in v15.2.0 and therefore can't be used
        // https://nodejs.org/api/stream.html#stream_writable_writableneeddrain
        _RedisSocket_writableNeedDrain.set(this, false);
        _RedisSocket_isSocketUnrefed.set(this, false);
        _RedisSocket_isCorked.set(this, false);
        __classPrivateFieldSet$6(this, _RedisSocket_initiator, initiator, "f");
        __classPrivateFieldSet$6(this, _RedisSocket_options, __classPrivateFieldGet$6(_a$4, _a$4, "m", _RedisSocket_initiateOptions).call(_a$4, options), "f");
    }
    async connect() {
        if (__classPrivateFieldGet$6(this, _RedisSocket_isOpen, "f")) {
            throw new Error('Socket already opened');
        }
        __classPrivateFieldSet$6(this, _RedisSocket_isOpen, true, "f");
        return __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_connect).call(this);
    }
    writeCommand(args) {
        if (!__classPrivateFieldGet$6(this, _RedisSocket_socket, "f")) {
            throw new errors_1$5.ClientClosedError();
        }
        for (const toWrite of args) {
            __classPrivateFieldSet$6(this, _RedisSocket_writableNeedDrain, !__classPrivateFieldGet$6(this, _RedisSocket_socket, "f").write(toWrite), "f");
        }
    }
    disconnect() {
        if (!__classPrivateFieldGet$6(this, _RedisSocket_isOpen, "f")) {
            throw new errors_1$5.ClientClosedError();
        }
        __classPrivateFieldSet$6(this, _RedisSocket_isOpen, false, "f");
        __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_disconnect).call(this);
    }
    async quit(fn) {
        if (!__classPrivateFieldGet$6(this, _RedisSocket_isOpen, "f")) {
            throw new errors_1$5.ClientClosedError();
        }
        __classPrivateFieldSet$6(this, _RedisSocket_isOpen, false, "f");
        const reply = await fn();
        __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_disconnect).call(this);
        return reply;
    }
    cork() {
        if (!__classPrivateFieldGet$6(this, _RedisSocket_socket, "f") || __classPrivateFieldGet$6(this, _RedisSocket_isCorked, "f")) {
            return;
        }
        __classPrivateFieldGet$6(this, _RedisSocket_socket, "f").cork();
        __classPrivateFieldSet$6(this, _RedisSocket_isCorked, true, "f");
        setImmediate(() => {
            __classPrivateFieldGet$6(this, _RedisSocket_socket, "f")?.uncork();
            __classPrivateFieldSet$6(this, _RedisSocket_isCorked, false, "f");
        });
    }
    ref() {
        __classPrivateFieldSet$6(this, _RedisSocket_isSocketUnrefed, false, "f");
        __classPrivateFieldGet$6(this, _RedisSocket_socket, "f")?.ref();
    }
    unref() {
        __classPrivateFieldSet$6(this, _RedisSocket_isSocketUnrefed, true, "f");
        __classPrivateFieldGet$6(this, _RedisSocket_socket, "f")?.unref();
    }
}
_a$4 = RedisSocket, _RedisSocket_initiator = new WeakMap(), _RedisSocket_options = new WeakMap(), _RedisSocket_socket = new WeakMap(), _RedisSocket_isOpen = new WeakMap(), _RedisSocket_isReady = new WeakMap(), _RedisSocket_writableNeedDrain = new WeakMap(), _RedisSocket_isSocketUnrefed = new WeakMap(), _RedisSocket_isCorked = new WeakMap(), _RedisSocket_instances = new WeakSet(), _RedisSocket_initiateOptions = function _RedisSocket_initiateOptions(options) {
    var _b, _c;
    options ?? (options = {});
    if (!options.path) {
        (_b = options).port ?? (_b.port = 6379);
        (_c = options).host ?? (_c.host = 'localhost');
    }
    options.connectTimeout ?? (options.connectTimeout = 5000);
    options.keepAlive ?? (options.keepAlive = 5000);
    options.noDelay ?? (options.noDelay = true);
    return options;
}, _RedisSocket_isTlsSocket = function _RedisSocket_isTlsSocket(options) {
    return options.tls === true;
}, _RedisSocket_reconnectStrategy = function _RedisSocket_reconnectStrategy(retries, cause) {
    if (__classPrivateFieldGet$6(this, _RedisSocket_options, "f").reconnectStrategy === false) {
        return false;
    }
    else if (typeof __classPrivateFieldGet$6(this, _RedisSocket_options, "f").reconnectStrategy === 'number') {
        return __classPrivateFieldGet$6(this, _RedisSocket_options, "f").reconnectStrategy;
    }
    else if (__classPrivateFieldGet$6(this, _RedisSocket_options, "f").reconnectStrategy) {
        try {
            const retryIn = __classPrivateFieldGet$6(this, _RedisSocket_options, "f").reconnectStrategy(retries, cause);
            if (retryIn !== false && !(retryIn instanceof Error) && typeof retryIn !== 'number') {
                throw new TypeError(`Reconnect strategy should return \`false | Error | number\`, got ${retryIn} instead`);
            }
            return retryIn;
        }
        catch (err) {
            this.emit('error', err);
        }
    }
    return Math.min(retries * 50, 500);
}, _RedisSocket_shouldReconnect = function _RedisSocket_shouldReconnect(retries, cause) {
    const retryIn = __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_reconnectStrategy).call(this, retries, cause);
    if (retryIn === false) {
        __classPrivateFieldSet$6(this, _RedisSocket_isOpen, false, "f");
        this.emit('error', cause);
        return cause;
    }
    else if (retryIn instanceof Error) {
        __classPrivateFieldSet$6(this, _RedisSocket_isOpen, false, "f");
        this.emit('error', cause);
        return new errors_1$5.ReconnectStrategyError(retryIn, cause);
    }
    return retryIn;
}, _RedisSocket_connect = async function _RedisSocket_connect() {
    let retries = 0;
    do {
        try {
            __classPrivateFieldSet$6(this, _RedisSocket_socket, await __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_createSocket).call(this), "f");
            __classPrivateFieldSet$6(this, _RedisSocket_writableNeedDrain, false, "f");
            this.emit('connect');
            try {
                await __classPrivateFieldGet$6(this, _RedisSocket_initiator, "f").call(this);
            }
            catch (err) {
                __classPrivateFieldGet$6(this, _RedisSocket_socket, "f").destroy();
                __classPrivateFieldSet$6(this, _RedisSocket_socket, undefined, "f");
                throw err;
            }
            __classPrivateFieldSet$6(this, _RedisSocket_isReady, true, "f");
            this.emit('ready');
        }
        catch (err) {
            const retryIn = __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_shouldReconnect).call(this, retries++, err);
            if (typeof retryIn !== 'number') {
                throw retryIn;
            }
            this.emit('error', err);
            await (0, utils_1.promiseTimeout)(retryIn);
            this.emit('reconnecting');
        }
    } while (__classPrivateFieldGet$6(this, _RedisSocket_isOpen, "f") && !__classPrivateFieldGet$6(this, _RedisSocket_isReady, "f"));
}, _RedisSocket_createSocket = function _RedisSocket_createSocket() {
    return new Promise((resolve, reject) => {
        const { connectEvent, socket } = __classPrivateFieldGet$6(_a$4, _a$4, "m", _RedisSocket_isTlsSocket).call(_a$4, __classPrivateFieldGet$6(this, _RedisSocket_options, "f")) ?
            __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_createTlsSocket).call(this) :
            __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_createNetSocket).call(this);
        if (__classPrivateFieldGet$6(this, _RedisSocket_options, "f").connectTimeout) {
            socket.setTimeout(__classPrivateFieldGet$6(this, _RedisSocket_options, "f").connectTimeout, () => socket.destroy(new errors_1$5.ConnectionTimeoutError()));
        }
        if (__classPrivateFieldGet$6(this, _RedisSocket_isSocketUnrefed, "f")) {
            socket.unref();
        }
        socket
            .setNoDelay(__classPrivateFieldGet$6(this, _RedisSocket_options, "f").noDelay)
            .once('error', reject)
            .once(connectEvent, () => {
            socket
                .setTimeout(0)
                // https://github.com/nodejs/node/issues/31663
                .setKeepAlive(__classPrivateFieldGet$6(this, _RedisSocket_options, "f").keepAlive !== false, __classPrivateFieldGet$6(this, _RedisSocket_options, "f").keepAlive || 0)
                .off('error', reject)
                .once('error', (err) => __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_onSocketError).call(this, err))
                .once('close', hadError => {
                if (!hadError && __classPrivateFieldGet$6(this, _RedisSocket_isOpen, "f") && __classPrivateFieldGet$6(this, _RedisSocket_socket, "f") === socket) {
                    __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_onSocketError).call(this, new errors_1$5.SocketClosedUnexpectedlyError());
                }
            })
                .on('drain', () => {
                __classPrivateFieldSet$6(this, _RedisSocket_writableNeedDrain, false, "f");
                this.emit('drain');
            })
                .on('data', data => this.emit('data', data));
            resolve(socket);
        });
    });
}, _RedisSocket_createNetSocket = function _RedisSocket_createNetSocket() {
    return {
        connectEvent: 'connect',
        socket: net.connect(__classPrivateFieldGet$6(this, _RedisSocket_options, "f")) // TODO
    };
}, _RedisSocket_createTlsSocket = function _RedisSocket_createTlsSocket() {
    return {
        connectEvent: 'secureConnect',
        socket: tls.connect(__classPrivateFieldGet$6(this, _RedisSocket_options, "f")) // TODO
    };
}, _RedisSocket_onSocketError = function _RedisSocket_onSocketError(err) {
    const wasReady = __classPrivateFieldGet$6(this, _RedisSocket_isReady, "f");
    __classPrivateFieldSet$6(this, _RedisSocket_isReady, false, "f");
    this.emit('error', err);
    if (!wasReady || !__classPrivateFieldGet$6(this, _RedisSocket_isOpen, "f") || typeof __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_shouldReconnect).call(this, 0, err) !== 'number')
        return;
    this.emit('reconnecting');
    __classPrivateFieldGet$6(this, _RedisSocket_instances, "m", _RedisSocket_connect).call(this).catch(() => {
        // the error was already emitted, silently ignore it
    });
}, _RedisSocket_disconnect = function _RedisSocket_disconnect() {
    __classPrivateFieldSet$6(this, _RedisSocket_isReady, false, "f");
    if (__classPrivateFieldGet$6(this, _RedisSocket_socket, "f")) {
        __classPrivateFieldGet$6(this, _RedisSocket_socket, "f").destroy();
        __classPrivateFieldSet$6(this, _RedisSocket_socket, undefined, "f");
    }
    this.emit('end');
};
socket.default = RedisSocket;

var commandsQueue = {};

var iterator;
var hasRequiredIterator;

function requireIterator () {
	if (hasRequiredIterator) return iterator;
	hasRequiredIterator = 1;
	iterator = function (Yallist) {
	  Yallist.prototype[Symbol.iterator] = function* () {
	    for (let walker = this.head; walker; walker = walker.next) {
	      yield walker.value;
	    }
	  };
	};
	return iterator;
}

var yallist = Yallist;

Yallist.Node = Node;
Yallist.create = Yallist;

function Yallist (list) {
  var self = this;
  if (!(self instanceof Yallist)) {
    self = new Yallist();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;

  return next
};

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }

  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }

  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length
};

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length
};

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res
};

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res
};

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value
  }
};

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value
  }
};

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res
};

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res
};

Yallist.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc
};

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc
};

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr
};

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr
};

Yallist.prototype.slice = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist();
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret
};

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist();
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret
};

Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }

  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }
  return ret;
};

Yallist.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this
};

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self);

  if (inserted.next === null) {
    self.tail = inserted;
  }
  if (inserted.prev === null) {
    self.head = inserted;
  }

  self.length++;

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self);
  if (!self.head) {
    self.head = self.tail;
  }
  self.length++;
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self);
  if (!self.tail) {
    self.tail = self.head;
  }
  self.length++;
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

try {
  // add if support for Symbol.iterator is present
  requireIterator()(Yallist);
} catch (er) {}

var decoder = {};

var buffer = {};

Object.defineProperty(buffer, "__esModule", { value: true });
class BufferComposer {
    constructor() {
        Object.defineProperty(this, "chunks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    write(buffer) {
        this.chunks.push(buffer);
    }
    end(buffer) {
        this.write(buffer);
        return Buffer.concat(this.chunks.splice(0));
    }
    reset() {
        this.chunks = [];
    }
}
buffer.default = BufferComposer;

var string = {};

Object.defineProperty(string, "__esModule", { value: true });
const string_decoder_1 = require$$0;
class StringComposer {
    constructor() {
        Object.defineProperty(this, "decoder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new string_decoder_1.StringDecoder()
        });
        Object.defineProperty(this, "string", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
    }
    write(buffer) {
        this.string += this.decoder.write(buffer);
    }
    end(buffer) {
        const string = this.string + this.decoder.end(buffer);
        this.string = '';
        return string;
    }
    reset() {
        this.string = '';
    }
}
string.default = StringComposer;

Object.defineProperty(decoder, "__esModule", { value: true });
const errors_1$4 = errors$2;
const buffer_1 = buffer;
const string_1 = string;
// RESP2 specification
// https://redis.io/topics/protocol
var Types;
(function (Types) {
    Types[Types["SIMPLE_STRING"] = 43] = "SIMPLE_STRING";
    Types[Types["ERROR"] = 45] = "ERROR";
    Types[Types["INTEGER"] = 58] = "INTEGER";
    Types[Types["BULK_STRING"] = 36] = "BULK_STRING";
    Types[Types["ARRAY"] = 42] = "ARRAY"; // *
})(Types || (Types = {}));
var ASCII;
(function (ASCII) {
    ASCII[ASCII["CR"] = 13] = "CR";
    ASCII[ASCII["ZERO"] = 48] = "ZERO";
    ASCII[ASCII["MINUS"] = 45] = "MINUS";
})(ASCII || (ASCII = {}));
// Using TypeScript `private` and not the build-in `#` to avoid __classPrivateFieldGet and __classPrivateFieldSet
class RESP2Decoder {
    constructor(options) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "cursor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "bufferComposer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new buffer_1.default()
        });
        Object.defineProperty(this, "stringComposer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new string_1.default()
        });
        Object.defineProperty(this, "currentStringComposer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.stringComposer
        });
        Object.defineProperty(this, "integer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "isNegativeInteger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "bulkStringRemainingLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "arraysInProcess", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "initializeArray", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "arrayItemType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    reset() {
        this.cursor = 0;
        this.type = undefined;
        this.bufferComposer.reset();
        this.stringComposer.reset();
        this.currentStringComposer = this.stringComposer;
    }
    write(chunk) {
        while (this.cursor < chunk.length) {
            if (!this.type) {
                this.currentStringComposer = this.options.returnStringsAsBuffers() ?
                    this.bufferComposer :
                    this.stringComposer;
                this.type = chunk[this.cursor];
                if (++this.cursor >= chunk.length)
                    break;
            }
            const reply = this.parseType(chunk, this.type);
            if (reply === undefined)
                break;
            this.type = undefined;
            this.options.onReply(reply);
        }
        this.cursor -= chunk.length;
    }
    parseType(chunk, type, arraysToKeep) {
        switch (type) {
            case Types.SIMPLE_STRING:
                return this.parseSimpleString(chunk);
            case Types.ERROR:
                return this.parseError(chunk);
            case Types.INTEGER:
                return this.parseInteger(chunk);
            case Types.BULK_STRING:
                return this.parseBulkString(chunk);
            case Types.ARRAY:
                return this.parseArray(chunk, arraysToKeep);
        }
    }
    compose(chunk, composer) {
        for (let i = this.cursor; i < chunk.length; i++) {
            if (chunk[i] === ASCII.CR) {
                const reply = composer.end(chunk.subarray(this.cursor, i));
                this.cursor = i + 2;
                return reply;
            }
        }
        const toWrite = chunk.subarray(this.cursor);
        composer.write(toWrite);
        this.cursor = chunk.length;
    }
    parseSimpleString(chunk) {
        return this.compose(chunk, this.currentStringComposer);
    }
    parseError(chunk) {
        const message = this.compose(chunk, this.stringComposer);
        if (message !== undefined) {
            return new errors_1$4.ErrorReply(message);
        }
    }
    parseInteger(chunk) {
        if (this.isNegativeInteger === undefined) {
            this.isNegativeInteger = chunk[this.cursor] === ASCII.MINUS;
            if (this.isNegativeInteger && ++this.cursor === chunk.length)
                return;
        }
        do {
            const byte = chunk[this.cursor];
            if (byte === ASCII.CR) {
                const integer = this.isNegativeInteger ? -this.integer : this.integer;
                this.integer = 0;
                this.isNegativeInteger = undefined;
                this.cursor += 2;
                return integer;
            }
            this.integer = this.integer * 10 + byte - ASCII.ZERO;
        } while (++this.cursor < chunk.length);
    }
    parseBulkString(chunk) {
        if (this.bulkStringRemainingLength === undefined) {
            const length = this.parseInteger(chunk);
            if (length === undefined)
                return;
            if (length === -1)
                return null;
            this.bulkStringRemainingLength = length;
            if (this.cursor >= chunk.length)
                return;
        }
        const end = this.cursor + this.bulkStringRemainingLength;
        if (chunk.length >= end) {
            const reply = this.currentStringComposer.end(chunk.subarray(this.cursor, end));
            this.bulkStringRemainingLength = undefined;
            this.cursor = end + 2;
            return reply;
        }
        const toWrite = chunk.subarray(this.cursor);
        this.currentStringComposer.write(toWrite);
        this.bulkStringRemainingLength -= toWrite.length;
        this.cursor = chunk.length;
    }
    parseArray(chunk, arraysToKeep = 0) {
        if (this.initializeArray || this.arraysInProcess.length === arraysToKeep) {
            const length = this.parseInteger(chunk);
            if (length === undefined) {
                this.initializeArray = true;
                return undefined;
            }
            this.initializeArray = false;
            this.arrayItemType = undefined;
            if (length === -1) {
                return this.returnArrayReply(null, arraysToKeep, chunk);
            }
            else if (length === 0) {
                return this.returnArrayReply([], arraysToKeep, chunk);
            }
            this.arraysInProcess.push({
                array: new Array(length),
                pushCounter: 0
            });
        }
        while (this.cursor < chunk.length) {
            if (!this.arrayItemType) {
                this.arrayItemType = chunk[this.cursor];
                if (++this.cursor >= chunk.length)
                    break;
            }
            const item = this.parseType(chunk, this.arrayItemType, arraysToKeep + 1);
            if (item === undefined)
                break;
            this.arrayItemType = undefined;
            const reply = this.pushArrayItem(item, arraysToKeep);
            if (reply !== undefined)
                return reply;
        }
    }
    returnArrayReply(reply, arraysToKeep, chunk) {
        if (this.arraysInProcess.length <= arraysToKeep)
            return reply;
        return this.pushArrayItem(reply, arraysToKeep, chunk);
    }
    pushArrayItem(item, arraysToKeep, chunk) {
        const to = this.arraysInProcess[this.arraysInProcess.length - 1];
        to.array[to.pushCounter] = item;
        if (++to.pushCounter === to.array.length) {
            return this.returnArrayReply(this.arraysInProcess.pop().array, arraysToKeep, chunk);
        }
        else if (chunk && chunk.length > this.cursor) {
            return this.parseArray(chunk, arraysToKeep);
        }
    }
}
decoder.default = RESP2Decoder;

var encoder = {};

Object.defineProperty(encoder, "__esModule", { value: true });
const CRLF = '\r\n';
function encodeCommand(args) {
    const toWrite = [];
    let strings = '*' + args.length + CRLF;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (typeof arg === 'string') {
            strings += '$' + Buffer.byteLength(arg) + CRLF + arg + CRLF;
        }
        else if (arg instanceof Buffer) {
            toWrite.push(strings + '$' + arg.length.toString() + CRLF, arg);
            strings = CRLF;
        }
        else {
            throw new TypeError('Invalid argument type');
        }
    }
    toWrite.push(strings);
    return toWrite;
}
encoder.default = encodeCommand;

var pubSub = {};

var __classPrivateFieldGet$5 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$5 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PubSub_instances, _a$3, _PubSub_channelsArray, _PubSub_listenersSet, _PubSub_subscribing, _PubSub_isActive, _PubSub_listeners, _PubSub_extendChannelListeners, _PubSub_unsubscribeCommand, _PubSub_updateIsActive, _PubSub_emitPubSubMessage;
Object.defineProperty(pubSub, "__esModule", { value: true });
pubSub.PubSub = pubSub.PubSubType = void 0;
var PubSubType;
(function (PubSubType) {
    PubSubType["CHANNELS"] = "CHANNELS";
    PubSubType["PATTERNS"] = "PATTERNS";
    PubSubType["SHARDED"] = "SHARDED";
})(PubSubType || (pubSub.PubSubType = PubSubType = {}));
const COMMANDS = {
    [PubSubType.CHANNELS]: {
        subscribe: Buffer.from('subscribe'),
        unsubscribe: Buffer.from('unsubscribe'),
        message: Buffer.from('message')
    },
    [PubSubType.PATTERNS]: {
        subscribe: Buffer.from('psubscribe'),
        unsubscribe: Buffer.from('punsubscribe'),
        message: Buffer.from('pmessage')
    },
    [PubSubType.SHARDED]: {
        subscribe: Buffer.from('ssubscribe'),
        unsubscribe: Buffer.from('sunsubscribe'),
        message: Buffer.from('smessage')
    }
};
class PubSub {
    constructor() {
        _PubSub_instances.add(this);
        _PubSub_subscribing.set(this, 0);
        _PubSub_isActive.set(this, false);
        _PubSub_listeners.set(this, {
            [PubSubType.CHANNELS]: new Map(),
            [PubSubType.PATTERNS]: new Map(),
            [PubSubType.SHARDED]: new Map()
        });
    }
    static isStatusReply(reply) {
        return (COMMANDS[PubSubType.CHANNELS].subscribe.equals(reply[0]) ||
            COMMANDS[PubSubType.CHANNELS].unsubscribe.equals(reply[0]) ||
            COMMANDS[PubSubType.PATTERNS].subscribe.equals(reply[0]) ||
            COMMANDS[PubSubType.PATTERNS].unsubscribe.equals(reply[0]) ||
            COMMANDS[PubSubType.SHARDED].subscribe.equals(reply[0]));
    }
    static isShardedUnsubscribe(reply) {
        return COMMANDS[PubSubType.SHARDED].unsubscribe.equals(reply[0]);
    }
    get isActive() {
        return __classPrivateFieldGet$5(this, _PubSub_isActive, "f");
    }
    subscribe(type, channels, listener, returnBuffers) {
        var _b;
        const args = [COMMANDS[type].subscribe], channelsArray = __classPrivateFieldGet$5(_a$3, _a$3, "m", _PubSub_channelsArray).call(_a$3, channels);
        for (const channel of channelsArray) {
            let channelListeners = __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[type].get(channel);
            if (!channelListeners || channelListeners.unsubscribing) {
                args.push(channel);
            }
        }
        if (args.length === 1) {
            // all channels are already subscribed, add listeners without issuing a command
            for (const channel of channelsArray) {
                __classPrivateFieldGet$5(_a$3, _a$3, "m", _PubSub_listenersSet).call(_a$3, __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[type].get(channel), returnBuffers).add(listener);
            }
            return;
        }
        __classPrivateFieldSet$5(this, _PubSub_isActive, true, "f");
        __classPrivateFieldSet$5(this, _PubSub_subscribing, (_b = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b++, _b), "f");
        return {
            args,
            channelsCounter: args.length - 1,
            resolve: () => {
                var _b;
                __classPrivateFieldSet$5(this, _PubSub_subscribing, (_b = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b--, _b), "f");
                for (const channel of channelsArray) {
                    let listeners = __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[type].get(channel);
                    if (!listeners) {
                        listeners = {
                            unsubscribing: false,
                            buffers: new Set(),
                            strings: new Set()
                        };
                        __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[type].set(channel, listeners);
                    }
                    __classPrivateFieldGet$5(_a$3, _a$3, "m", _PubSub_listenersSet).call(_a$3, listeners, returnBuffers).add(listener);
                }
            },
            reject: () => {
                var _b;
                __classPrivateFieldSet$5(this, _PubSub_subscribing, (_b = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b--, _b), "f");
                __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_updateIsActive).call(this);
            }
        };
    }
    extendChannelListeners(type, channel, listeners) {
        var _b;
        if (!__classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_extendChannelListeners).call(this, type, channel, listeners))
            return;
        __classPrivateFieldSet$5(this, _PubSub_isActive, true, "f");
        __classPrivateFieldSet$5(this, _PubSub_subscribing, (_b = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b++, _b), "f");
        return {
            args: [
                COMMANDS[type].subscribe,
                channel
            ],
            channelsCounter: 1,
            resolve: () => { var _b, _c; return __classPrivateFieldSet$5(this, _PubSub_subscribing, (_c = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b = _c--, _c), "f"), _b; },
            reject: () => {
                var _b;
                __classPrivateFieldSet$5(this, _PubSub_subscribing, (_b = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b--, _b), "f");
                __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_updateIsActive).call(this);
            }
        };
    }
    extendTypeListeners(type, listeners) {
        var _b;
        const args = [COMMANDS[type].subscribe];
        for (const [channel, channelListeners] of listeners) {
            if (__classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_extendChannelListeners).call(this, type, channel, channelListeners)) {
                args.push(channel);
            }
        }
        if (args.length === 1)
            return;
        __classPrivateFieldSet$5(this, _PubSub_isActive, true, "f");
        __classPrivateFieldSet$5(this, _PubSub_subscribing, (_b = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b++, _b), "f");
        return {
            args,
            channelsCounter: args.length - 1,
            resolve: () => { var _b, _c; return __classPrivateFieldSet$5(this, _PubSub_subscribing, (_c = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b = _c--, _c), "f"), _b; },
            reject: () => {
                var _b;
                __classPrivateFieldSet$5(this, _PubSub_subscribing, (_b = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b--, _b), "f");
                __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_updateIsActive).call(this);
            }
        };
    }
    unsubscribe(type, channels, listener, returnBuffers) {
        const listeners = __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[type];
        if (!channels) {
            return __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_unsubscribeCommand).call(this, [COMMANDS[type].unsubscribe], 
            // cannot use `this.#subscribed` because there might be some `SUBSCRIBE` commands in the queue
            // cannot use `this.#subscribed + this.#subscribing` because some `SUBSCRIBE` commands might fail
            NaN, () => listeners.clear());
        }
        const channelsArray = __classPrivateFieldGet$5(_a$3, _a$3, "m", _PubSub_channelsArray).call(_a$3, channels);
        if (!listener) {
            return __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_unsubscribeCommand).call(this, [COMMANDS[type].unsubscribe, ...channelsArray], channelsArray.length, () => {
                for (const channel of channelsArray) {
                    listeners.delete(channel);
                }
            });
        }
        const args = [COMMANDS[type].unsubscribe];
        for (const channel of channelsArray) {
            const sets = listeners.get(channel);
            if (sets) {
                let current, other;
                if (returnBuffers) {
                    current = sets.buffers;
                    other = sets.strings;
                }
                else {
                    current = sets.strings;
                    other = sets.buffers;
                }
                const currentSize = current.has(listener) ? current.size - 1 : current.size;
                if (currentSize !== 0 || other.size !== 0)
                    continue;
                sets.unsubscribing = true;
            }
            args.push(channel);
        }
        if (args.length === 1) {
            // all channels has other listeners,
            // delete the listeners without issuing a command
            for (const channel of channelsArray) {
                __classPrivateFieldGet$5(_a$3, _a$3, "m", _PubSub_listenersSet).call(_a$3, listeners.get(channel), returnBuffers).delete(listener);
            }
            return;
        }
        return __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_unsubscribeCommand).call(this, args, args.length - 1, () => {
            for (const channel of channelsArray) {
                const sets = listeners.get(channel);
                if (!sets)
                    continue;
                (returnBuffers ? sets.buffers : sets.strings).delete(listener);
                if (sets.buffers.size === 0 && sets.strings.size === 0) {
                    listeners.delete(channel);
                }
            }
        });
    }
    reset() {
        __classPrivateFieldSet$5(this, _PubSub_isActive, false, "f");
        __classPrivateFieldSet$5(this, _PubSub_subscribing, 0, "f");
    }
    resubscribe() {
        var _b;
        const commands = [];
        for (const [type, listeners] of Object.entries(__classPrivateFieldGet$5(this, _PubSub_listeners, "f"))) {
            if (!listeners.size)
                continue;
            __classPrivateFieldSet$5(this, _PubSub_isActive, true, "f");
            __classPrivateFieldSet$5(this, _PubSub_subscribing, (_b = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b++, _b), "f");
            const callback = () => { var _b, _c; return __classPrivateFieldSet$5(this, _PubSub_subscribing, (_c = __classPrivateFieldGet$5(this, _PubSub_subscribing, "f"), _b = _c--, _c), "f"), _b; };
            commands.push({
                args: [
                    COMMANDS[type].subscribe,
                    ...listeners.keys()
                ],
                channelsCounter: listeners.size,
                resolve: callback,
                reject: callback
            });
        }
        return commands;
    }
    handleMessageReply(reply) {
        if (COMMANDS[PubSubType.CHANNELS].message.equals(reply[0])) {
            __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_emitPubSubMessage).call(this, PubSubType.CHANNELS, reply[2], reply[1]);
            return true;
        }
        else if (COMMANDS[PubSubType.PATTERNS].message.equals(reply[0])) {
            __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_emitPubSubMessage).call(this, PubSubType.PATTERNS, reply[3], reply[2], reply[1]);
            return true;
        }
        else if (COMMANDS[PubSubType.SHARDED].message.equals(reply[0])) {
            __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_emitPubSubMessage).call(this, PubSubType.SHARDED, reply[2], reply[1]);
            return true;
        }
        return false;
    }
    removeShardedListeners(channel) {
        const listeners = __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[PubSubType.SHARDED].get(channel);
        __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[PubSubType.SHARDED].delete(channel);
        __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_updateIsActive).call(this);
        return listeners;
    }
    getTypeListeners(type) {
        return __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[type];
    }
}
pubSub.PubSub = PubSub;
_a$3 = PubSub, _PubSub_subscribing = new WeakMap(), _PubSub_isActive = new WeakMap(), _PubSub_listeners = new WeakMap(), _PubSub_instances = new WeakSet(), _PubSub_channelsArray = function _PubSub_channelsArray(channels) {
    return (Array.isArray(channels) ? channels : [channels]);
}, _PubSub_listenersSet = function _PubSub_listenersSet(listeners, returnBuffers) {
    return (returnBuffers ? listeners.buffers : listeners.strings);
}, _PubSub_extendChannelListeners = function _PubSub_extendChannelListeners(type, channel, listeners) {
    const existingListeners = __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[type].get(channel);
    if (!existingListeners) {
        __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[type].set(channel, listeners);
        return true;
    }
    for (const listener of listeners.buffers) {
        existingListeners.buffers.add(listener);
    }
    for (const listener of listeners.strings) {
        existingListeners.strings.add(listener);
    }
    return false;
}, _PubSub_unsubscribeCommand = function _PubSub_unsubscribeCommand(args, channelsCounter, removeListeners) {
    return {
        args,
        channelsCounter,
        resolve: () => {
            removeListeners();
            __classPrivateFieldGet$5(this, _PubSub_instances, "m", _PubSub_updateIsActive).call(this);
        },
        reject: undefined // use the same structure as `subscribe`
    };
}, _PubSub_updateIsActive = function _PubSub_updateIsActive() {
    __classPrivateFieldSet$5(this, _PubSub_isActive, (__classPrivateFieldGet$5(this, _PubSub_listeners, "f")[PubSubType.CHANNELS].size !== 0 ||
        __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[PubSubType.PATTERNS].size !== 0 ||
        __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[PubSubType.SHARDED].size !== 0 ||
        __classPrivateFieldGet$5(this, _PubSub_subscribing, "f") !== 0), "f");
}, _PubSub_emitPubSubMessage = function _PubSub_emitPubSubMessage(type, message, channel, pattern) {
    const keyString = (pattern ?? channel).toString(), listeners = __classPrivateFieldGet$5(this, _PubSub_listeners, "f")[type].get(keyString);
    if (!listeners)
        return;
    for (const listener of listeners.buffers) {
        listener(message, channel);
    }
    if (!listeners.strings.size)
        return;
    const channelString = pattern ? channel.toString() : keyString, messageString = channelString === '__redis__:invalidate' ?
        // https://github.com/redis/redis/pull/7469
        // https://github.com/redis/redis/issues/7463
        (message === null ? null : message.map(x => x.toString())) :
        message.toString();
    for (const listener of listeners.strings) {
        listener(messageString, channelString);
    }
};

var __classPrivateFieldGet$4 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$4 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _RedisCommandsQueue_instances, _a$2, _RedisCommandsQueue_flushQueue, _RedisCommandsQueue_maxLength, _RedisCommandsQueue_waitingToBeSent, _RedisCommandsQueue_waitingForReply, _RedisCommandsQueue_onShardedChannelMoved, _RedisCommandsQueue_pubSub, _RedisCommandsQueue_chainInExecution, _RedisCommandsQueue_decoder, _RedisCommandsQueue_pushPubSubCommand;
Object.defineProperty(commandsQueue, "__esModule", { value: true });
const LinkedList = yallist;
const errors_1$3 = errors$2;
const decoder_1 = decoder;
const encoder_1 = encoder;
const pub_sub_1$2 = pubSub;
const PONG = Buffer.from('pong');
class RedisCommandsQueue {
    get isPubSubActive() {
        return __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").isActive;
    }
    constructor(maxLength, onShardedChannelMoved) {
        _RedisCommandsQueue_instances.add(this);
        _RedisCommandsQueue_maxLength.set(this, void 0);
        _RedisCommandsQueue_waitingToBeSent.set(this, new LinkedList());
        _RedisCommandsQueue_waitingForReply.set(this, new LinkedList());
        _RedisCommandsQueue_onShardedChannelMoved.set(this, void 0);
        _RedisCommandsQueue_pubSub.set(this, new pub_sub_1$2.PubSub());
        _RedisCommandsQueue_chainInExecution.set(this, void 0);
        _RedisCommandsQueue_decoder.set(this, new decoder_1.default({
            returnStringsAsBuffers: () => {
                return !!__classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingForReply, "f").head?.value.returnBuffers ||
                    __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").isActive;
            },
            onReply: reply => {
                if (__classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").isActive && Array.isArray(reply)) {
                    if (__classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").handleMessageReply(reply))
                        return;
                    const isShardedUnsubscribe = pub_sub_1$2.PubSub.isShardedUnsubscribe(reply);
                    if (isShardedUnsubscribe && !__classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingForReply, "f").length) {
                        const channel = reply[1].toString();
                        __classPrivateFieldGet$4(this, _RedisCommandsQueue_onShardedChannelMoved, "f").call(this, channel, __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").removeShardedListeners(channel));
                        return;
                    }
                    else if (isShardedUnsubscribe || pub_sub_1$2.PubSub.isStatusReply(reply)) {
                        const head = __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingForReply, "f").head.value;
                        if ((Number.isNaN(head.channelsCounter) && reply[2] === 0) ||
                            --head.channelsCounter === 0) {
                            __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingForReply, "f").shift().resolve();
                        }
                        return;
                    }
                    if (PONG.equals(reply[0])) {
                        const { resolve, returnBuffers } = __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingForReply, "f").shift(), buffer = (reply[1].length === 0 ? reply[0] : reply[1]);
                        resolve(returnBuffers ? buffer : buffer.toString());
                        return;
                    }
                }
                const { resolve, reject } = __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingForReply, "f").shift();
                if (reply instanceof errors_1$3.ErrorReply) {
                    reject(reply);
                }
                else {
                    resolve(reply);
                }
            }
        }));
        __classPrivateFieldSet$4(this, _RedisCommandsQueue_maxLength, maxLength, "f");
        __classPrivateFieldSet$4(this, _RedisCommandsQueue_onShardedChannelMoved, onShardedChannelMoved, "f");
    }
    addCommand(args, options) {
        if (__classPrivateFieldGet$4(this, _RedisCommandsQueue_maxLength, "f") && __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingToBeSent, "f").length + __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingForReply, "f").length >= __classPrivateFieldGet$4(this, _RedisCommandsQueue_maxLength, "f")) {
            return Promise.reject(new Error('The queue is full'));
        }
        else if (options?.signal?.aborted) {
            return Promise.reject(new errors_1$3.AbortError());
        }
        return new Promise((resolve, reject) => {
            const node = new LinkedList.Node({
                args,
                chainId: options?.chainId,
                returnBuffers: options?.returnBuffers,
                resolve,
                reject
            });
            if (options?.signal) {
                const listener = () => {
                    __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingToBeSent, "f").removeNode(node);
                    node.value.reject(new errors_1$3.AbortError());
                };
                node.value.abort = {
                    signal: options.signal,
                    listener
                };
                // AbortSignal type is incorrent
                options.signal.addEventListener('abort', listener, {
                    once: true
                });
            }
            if (options?.asap) {
                __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingToBeSent, "f").unshiftNode(node);
            }
            else {
                __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingToBeSent, "f").pushNode(node);
            }
        });
    }
    subscribe(type, channels, listener, returnBuffers) {
        return __classPrivateFieldGet$4(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").subscribe(type, channels, listener, returnBuffers));
    }
    unsubscribe(type, channels, listener, returnBuffers) {
        return __classPrivateFieldGet$4(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").unsubscribe(type, channels, listener, returnBuffers));
    }
    resubscribe() {
        const commands = __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").resubscribe();
        if (!commands.length)
            return;
        return Promise.all(commands.map(command => __classPrivateFieldGet$4(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, command)));
    }
    extendPubSubChannelListeners(type, channel, listeners) {
        return __classPrivateFieldGet$4(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").extendChannelListeners(type, channel, listeners));
    }
    extendPubSubListeners(type, listeners) {
        return __classPrivateFieldGet$4(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").extendTypeListeners(type, listeners));
    }
    getPubSubListeners(type) {
        return __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").getTypeListeners(type);
    }
    getCommandToSend() {
        const toSend = __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingToBeSent, "f").shift();
        if (!toSend)
            return;
        let encoded;
        try {
            encoded = (0, encoder_1.default)(toSend.args);
        }
        catch (err) {
            toSend.reject(err);
            return;
        }
        __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingForReply, "f").push({
            resolve: toSend.resolve,
            reject: toSend.reject,
            channelsCounter: toSend.channelsCounter,
            returnBuffers: toSend.returnBuffers
        });
        __classPrivateFieldSet$4(this, _RedisCommandsQueue_chainInExecution, toSend.chainId, "f");
        return encoded;
    }
    onReplyChunk(chunk) {
        __classPrivateFieldGet$4(this, _RedisCommandsQueue_decoder, "f").write(chunk);
    }
    flushWaitingForReply(err) {
        __classPrivateFieldGet$4(this, _RedisCommandsQueue_decoder, "f").reset();
        __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").reset();
        __classPrivateFieldGet$4(_a$2, _a$2, "m", _RedisCommandsQueue_flushQueue).call(_a$2, __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingForReply, "f"), err);
        if (!__classPrivateFieldGet$4(this, _RedisCommandsQueue_chainInExecution, "f"))
            return;
        while (__classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingToBeSent, "f").head?.value.chainId === __classPrivateFieldGet$4(this, _RedisCommandsQueue_chainInExecution, "f")) {
            __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingToBeSent, "f").shift();
        }
        __classPrivateFieldSet$4(this, _RedisCommandsQueue_chainInExecution, undefined, "f");
    }
    flushAll(err) {
        __classPrivateFieldGet$4(this, _RedisCommandsQueue_decoder, "f").reset();
        __classPrivateFieldGet$4(this, _RedisCommandsQueue_pubSub, "f").reset();
        __classPrivateFieldGet$4(_a$2, _a$2, "m", _RedisCommandsQueue_flushQueue).call(_a$2, __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingForReply, "f"), err);
        __classPrivateFieldGet$4(_a$2, _a$2, "m", _RedisCommandsQueue_flushQueue).call(_a$2, __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingToBeSent, "f"), err);
    }
}
_a$2 = RedisCommandsQueue, _RedisCommandsQueue_maxLength = new WeakMap(), _RedisCommandsQueue_waitingToBeSent = new WeakMap(), _RedisCommandsQueue_waitingForReply = new WeakMap(), _RedisCommandsQueue_onShardedChannelMoved = new WeakMap(), _RedisCommandsQueue_pubSub = new WeakMap(), _RedisCommandsQueue_chainInExecution = new WeakMap(), _RedisCommandsQueue_decoder = new WeakMap(), _RedisCommandsQueue_instances = new WeakSet(), _RedisCommandsQueue_flushQueue = function _RedisCommandsQueue_flushQueue(queue, err) {
    while (queue.length) {
        queue.shift().reject(err);
    }
}, _RedisCommandsQueue_pushPubSubCommand = function _RedisCommandsQueue_pushPubSubCommand(command) {
    if (command === undefined)
        return;
    return new Promise((resolve, reject) => {
        __classPrivateFieldGet$4(this, _RedisCommandsQueue_waitingToBeSent, "f").push({
            args: command.args,
            channelsCounter: command.channelsCounter,
            returnBuffers: true,
            resolve: () => {
                command.resolve();
                resolve();
            },
            reject: err => {
                command.reject?.();
                reject(err);
            }
        });
    });
};
commandsQueue.default = RedisCommandsQueue;

var multiCommand$2 = {};

var multiCommand$1 = {};

var commander = {};

var commandOptions$1 = {};

Object.defineProperty(commandOptions$1, "__esModule", { value: true });
commandOptions$1.isCommandOptions = commandOptions$1.commandOptions = void 0;
const symbol = Symbol('Command Options');
function commandOptions(options) {
    options[symbol] = true;
    return options;
}
commandOptions$1.commandOptions = commandOptions;
function isCommandOptions(options) {
    return options?.[symbol] === true;
}
commandOptions$1.isCommandOptions = isCommandOptions;

Object.defineProperty(commander, "__esModule", { value: true });
commander.fCallArguments = commander.transformCommandReply = commander.transformLegacyCommandArguments = commander.transformCommandArguments = commander.attachExtensions = commander.attachCommands = void 0;
const command_options_1$1 = commandOptions$1;
function attachCommands({ BaseClass, commands, executor }) {
    for (const [name, command] of Object.entries(commands)) {
        BaseClass.prototype[name] = function (...args) {
            return executor.call(this, command, args, name);
        };
    }
}
commander.attachCommands = attachCommands;
function attachExtensions(config) {
    let Commander;
    if (config.modules) {
        Commander = attachWithNamespaces({
            BaseClass: config.BaseClass,
            namespaces: config.modules,
            executor: config.modulesExecutor
        });
    }
    if (config.functions) {
        Commander = attachWithNamespaces({
            BaseClass: Commander ?? config.BaseClass,
            namespaces: config.functions,
            executor: config.functionsExecutor
        });
    }
    if (config.scripts) {
        Commander ?? (Commander = class extends config.BaseClass {
        });
        attachCommands({
            BaseClass: Commander,
            commands: config.scripts,
            executor: config.scriptsExecutor
        });
    }
    return Commander ?? config.BaseClass;
}
commander.attachExtensions = attachExtensions;
function attachWithNamespaces({ BaseClass, namespaces, executor }) {
    const Commander = class extends BaseClass {
        constructor(...args) {
            super(...args);
            for (const namespace of Object.keys(namespaces)) {
                this[namespace] = Object.create(this[namespace], {
                    self: {
                        value: this
                    }
                });
            }
        }
    };
    for (const [namespace, commands] of Object.entries(namespaces)) {
        Commander.prototype[namespace] = {};
        for (const [name, command] of Object.entries(commands)) {
            Commander.prototype[namespace][name] = function (...args) {
                return executor.call(this.self, command, args, name);
            };
        }
    }
    return Commander;
}
function transformCommandArguments(command, args) {
    let options;
    if ((0, command_options_1$1.isCommandOptions)(args[0])) {
        options = args[0];
        args = args.slice(1);
    }
    return {
        jsArgs: args,
        args: command.transformArguments(...args),
        options
    };
}
commander.transformCommandArguments = transformCommandArguments;
function transformLegacyCommandArguments(args) {
    return args.flat().map(arg => {
        return typeof arg === 'number' || arg instanceof Date ?
            arg.toString() :
            arg;
    });
}
commander.transformLegacyCommandArguments = transformLegacyCommandArguments;
function transformCommandReply(command, rawReply, preserved) {
    if (!command.transformReply) {
        return rawReply;
    }
    return command.transformReply(rawReply, preserved);
}
commander.transformCommandReply = transformCommandReply;
function fCallArguments(name, fn, args) {
    const actualArgs = [
        fn.IS_READ_ONLY ? 'FCALL_RO' : 'FCALL',
        name
    ];
    if (fn.NUMBER_OF_KEYS !== undefined) {
        actualArgs.push(fn.NUMBER_OF_KEYS.toString());
    }
    actualArgs.push(...args);
    return actualArgs;
}
commander.fCallArguments = fCallArguments;

Object.defineProperty(multiCommand$1, "__esModule", { value: true });
const commander_1$2 = commander;
const errors_1$2 = errors$2;
class RedisMultiCommand {
    constructor() {
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "scriptsInUse", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set()
        });
    }
    static generateChainId() {
        return Symbol('RedisMultiCommand Chain Id');
    }
    addCommand(args, transformReply) {
        this.queue.push({
            args,
            transformReply
        });
    }
    addFunction(name, fn, args) {
        const transformedArguments = (0, commander_1$2.fCallArguments)(name, fn, fn.transformArguments(...args));
        this.queue.push({
            args: transformedArguments,
            transformReply: fn.transformReply
        });
        return transformedArguments;
    }
    addScript(script, args) {
        const transformedArguments = [];
        if (this.scriptsInUse.has(script.SHA1)) {
            transformedArguments.push('EVALSHA', script.SHA1);
        }
        else {
            this.scriptsInUse.add(script.SHA1);
            transformedArguments.push('EVAL', script.SCRIPT);
        }
        if (script.NUMBER_OF_KEYS !== undefined) {
            transformedArguments.push(script.NUMBER_OF_KEYS.toString());
        }
        const scriptArguments = script.transformArguments(...args);
        transformedArguments.push(...scriptArguments);
        if (scriptArguments.preserve) {
            transformedArguments.preserve = scriptArguments.preserve;
        }
        this.addCommand(transformedArguments, script.transformReply);
        return transformedArguments;
    }
    handleExecReplies(rawReplies) {
        const execReply = rawReplies[rawReplies.length - 1];
        if (execReply === null) {
            throw new errors_1$2.WatchError();
        }
        return this.transformReplies(execReply);
    }
    transformReplies(rawReplies) {
        const errorIndexes = [], replies = rawReplies.map((reply, i) => {
            if (reply instanceof errors_1$2.ErrorReply) {
                errorIndexes.push(i);
                return reply;
            }
            const { transformReply, args } = this.queue[i];
            return transformReply ? transformReply(reply, args.preserve) : reply;
        });
        if (errorIndexes.length)
            throw new errors_1$2.MultiErrorReply(replies, errorIndexes);
        return replies;
    }
}
multiCommand$1.default = RedisMultiCommand;

var __classPrivateFieldSet$3 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$3 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RedisClientMultiCommand_instances, _RedisClientMultiCommand_multi, _RedisClientMultiCommand_executor, _RedisClientMultiCommand_selectedDB, _RedisClientMultiCommand_legacyMode, _RedisClientMultiCommand_defineLegacyCommand;
Object.defineProperty(multiCommand$2, "__esModule", { value: true });
const commands_1$1 = commands$6;
const multi_command_1$1 = multiCommand$1;
const commander_1$1 = commander;
class RedisClientMultiCommand {
    static extend(extensions) {
        return (0, commander_1$1.attachExtensions)({
            BaseClass: RedisClientMultiCommand,
            modulesExecutor: RedisClientMultiCommand.prototype.commandsExecutor,
            modules: extensions?.modules,
            functionsExecutor: RedisClientMultiCommand.prototype.functionsExecutor,
            functions: extensions?.functions,
            scriptsExecutor: RedisClientMultiCommand.prototype.scriptsExecutor,
            scripts: extensions?.scripts
        });
    }
    constructor(executor, legacyMode = false) {
        _RedisClientMultiCommand_instances.add(this);
        _RedisClientMultiCommand_multi.set(this, new multi_command_1$1.default());
        _RedisClientMultiCommand_executor.set(this, void 0);
        Object.defineProperty(this, "v4", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        _RedisClientMultiCommand_selectedDB.set(this, void 0);
        Object.defineProperty(this, "select", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.SELECT
        });
        Object.defineProperty(this, "EXEC", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.exec
        });
        __classPrivateFieldSet$3(this, _RedisClientMultiCommand_executor, executor, "f");
        if (legacyMode) {
            __classPrivateFieldGet$3(this, _RedisClientMultiCommand_instances, "m", _RedisClientMultiCommand_legacyMode).call(this);
        }
    }
    commandsExecutor(command, args) {
        return this.addCommand(command.transformArguments(...args), command.transformReply);
    }
    SELECT(db, transformReply) {
        __classPrivateFieldSet$3(this, _RedisClientMultiCommand_selectedDB, db, "f");
        return this.addCommand(['SELECT', db.toString()], transformReply);
    }
    addCommand(args, transformReply) {
        __classPrivateFieldGet$3(this, _RedisClientMultiCommand_multi, "f").addCommand(args, transformReply);
        return this;
    }
    functionsExecutor(fn, args, name) {
        __classPrivateFieldGet$3(this, _RedisClientMultiCommand_multi, "f").addFunction(name, fn, args);
        return this;
    }
    scriptsExecutor(script, args) {
        __classPrivateFieldGet$3(this, _RedisClientMultiCommand_multi, "f").addScript(script, args);
        return this;
    }
    async exec(execAsPipeline = false) {
        if (execAsPipeline) {
            return this.execAsPipeline();
        }
        return __classPrivateFieldGet$3(this, _RedisClientMultiCommand_multi, "f").handleExecReplies(await __classPrivateFieldGet$3(this, _RedisClientMultiCommand_executor, "f").call(this, __classPrivateFieldGet$3(this, _RedisClientMultiCommand_multi, "f").queue, __classPrivateFieldGet$3(this, _RedisClientMultiCommand_selectedDB, "f"), multi_command_1$1.default.generateChainId()));
    }
    async execAsPipeline() {
        if (__classPrivateFieldGet$3(this, _RedisClientMultiCommand_multi, "f").queue.length === 0)
            return [];
        return __classPrivateFieldGet$3(this, _RedisClientMultiCommand_multi, "f").transformReplies(await __classPrivateFieldGet$3(this, _RedisClientMultiCommand_executor, "f").call(this, __classPrivateFieldGet$3(this, _RedisClientMultiCommand_multi, "f").queue, __classPrivateFieldGet$3(this, _RedisClientMultiCommand_selectedDB, "f")));
    }
}
_RedisClientMultiCommand_multi = new WeakMap(), _RedisClientMultiCommand_executor = new WeakMap(), _RedisClientMultiCommand_selectedDB = new WeakMap(), _RedisClientMultiCommand_instances = new WeakSet(), _RedisClientMultiCommand_legacyMode = function _RedisClientMultiCommand_legacyMode() {
    var _a, _b;
    this.v4.addCommand = this.addCommand.bind(this);
    this.addCommand = (...args) => {
        __classPrivateFieldGet$3(this, _RedisClientMultiCommand_multi, "f").addCommand((0, commander_1$1.transformLegacyCommandArguments)(args));
        return this;
    };
    this.v4.exec = this.exec.bind(this);
    this.exec = (callback) => {
        this.v4.exec()
            .then((reply) => {
            if (!callback)
                return;
            callback(null, reply);
        })
            .catch((err) => {
            if (!callback) {
                // this.emit('error', err);
                return;
            }
            callback(err);
        });
    };
    for (const [name, command] of Object.entries(commands_1$1.default)) {
        __classPrivateFieldGet$3(this, _RedisClientMultiCommand_instances, "m", _RedisClientMultiCommand_defineLegacyCommand).call(this, name, command);
        (_a = this)[_b = name.toLowerCase()] ?? (_a[_b] = this[name]);
    }
}, _RedisClientMultiCommand_defineLegacyCommand = function _RedisClientMultiCommand_defineLegacyCommand(name, command) {
    this.v4[name] = this[name].bind(this.v4);
    this[name] = command && command.TRANSFORM_LEGACY_REPLY && command.transformReply ?
        (...args) => {
            __classPrivateFieldGet$3(this, _RedisClientMultiCommand_multi, "f").addCommand([name, ...(0, commander_1$1.transformLegacyCommandArguments)(args)], command.transformReply);
            return this;
        } :
        (...args) => this.addCommand(name, ...args);
};
multiCommand$2.default = RedisClientMultiCommand;
(0, commander_1$1.attachCommands)({
    BaseClass: RedisClientMultiCommand,
    commands: commands_1$1.default,
    executor: RedisClientMultiCommand.prototype.commandsExecutor
});

var factoryValidator$1 = function(factory) {
  if (typeof factory.create !== "function") {
    throw new TypeError("factory.create must be a function");
  }

  if (typeof factory.destroy !== "function") {
    throw new TypeError("factory.destroy must be a function");
  }

  if (
    typeof factory.validate !== "undefined" &&
    typeof factory.validate !== "function"
  ) {
    throw new TypeError("factory.validate must be a function");
  }
};

/**
 * Create the default settings used by the pool
 *
 * @class
 */
let PoolDefaults$1 = class PoolDefaults {
  constructor() {
    this.fifo = true;
    this.priorityRange = 1;

    this.testOnBorrow = false;
    this.testOnReturn = false;

    this.autostart = true;

    this.evictionRunIntervalMillis = 0;
    this.numTestsPerEvictionRun = 3;
    this.softIdleTimeoutMillis = -1;
    this.idleTimeoutMillis = 30000;

    // FIXME: no defaults!
    this.acquireTimeoutMillis = null;
    this.destroyTimeoutMillis = null;
    this.maxWaitingClients = null;

    this.min = null;
    this.max = null;
    // FIXME: this seems odd?
    this.Promise = Promise;
  }
};

var PoolDefaults_1 = PoolDefaults$1;

const PoolDefaults = PoolDefaults_1;

let PoolOptions$1 = class PoolOptions {
  /**
   * @param {Object} opts
   *   configuration for the pool
   * @param {Number} [opts.max=null]
   *   Maximum number of items that can exist at the same time.  Default: 1.
   *   Any further acquire requests will be pushed to the waiting list.
   * @param {Number} [opts.min=null]
   *   Minimum number of items in pool (including in-use). Default: 0.
   *   When the pool is created, or a resource destroyed, this minimum will
   *   be checked. If the pool resource count is below the minimum, a new
   *   resource will be created and added to the pool.
   * @param {Number} [opts.maxWaitingClients=null]
   *   maximum number of queued requests allowed after which acquire calls will be rejected
   * @param {Boolean} [opts.testOnBorrow=false]
   *   should the pool validate resources before giving them to clients. Requires that
   *   `factory.validate` is specified.
   * @param {Boolean} [opts.testOnReturn=false]
   *   should the pool validate resources before returning them to the pool.
   * @param {Number} [opts.acquireTimeoutMillis=null]
   *   Delay in milliseconds after which the an `acquire` call will fail. optional.
   *   Default: undefined. Should be positive and non-zero
   * @param {Number} [opts.destroyTimeoutMillis=null]
   *   Delay in milliseconds after which the an `destroy` call will fail, causing it to emit a factoryDestroyError event. optional.
   *   Default: undefined. Should be positive and non-zero
   * @param {Number} [opts.priorityRange=1]
   *   The range from 1 to be treated as a valid priority
   * @param {Boolean} [opts.fifo=true]
   *   Sets whether the pool has LIFO (last in, first out) behaviour with respect to idle objects.
   *   if false then pool has FIFO behaviour
   * @param {Boolean} [opts.autostart=true]
   *   Should the pool start creating resources etc once the constructor is called
   * @param {Number} [opts.evictionRunIntervalMillis=0]
   *   How often to run eviction checks.  Default: 0 (does not run).
   * @param {Number} [opts.numTestsPerEvictionRun=3]
   *   Number of resources to check each eviction run.  Default: 3.
   * @param {Number} [opts.softIdleTimeoutMillis=-1]
   *   amount of time an object may sit idle in the pool before it is eligible
   *   for eviction by the idle object evictor (if any), with the extra condition
   *   that at least "min idle" object instances remain in the pool. Default -1 (nothing can get evicted)
   * @param {Number} [opts.idleTimeoutMillis=30000]
   *   the minimum amount of time that an object may sit idle in the pool before it is eligible for eviction
   *   due to idle time. Supercedes "softIdleTimeoutMillis" Default: 30000
   * @param {typeof Promise} [opts.Promise=Promise]
   *   What promise implementation should the pool use, defaults to native promises.
   */
  constructor(opts) {
    const poolDefaults = new PoolDefaults();

    opts = opts || {};

    this.fifo = typeof opts.fifo === "boolean" ? opts.fifo : poolDefaults.fifo;
    this.priorityRange = opts.priorityRange || poolDefaults.priorityRange;

    this.testOnBorrow =
      typeof opts.testOnBorrow === "boolean"
        ? opts.testOnBorrow
        : poolDefaults.testOnBorrow;
    this.testOnReturn =
      typeof opts.testOnReturn === "boolean"
        ? opts.testOnReturn
        : poolDefaults.testOnReturn;

    this.autostart =
      typeof opts.autostart === "boolean"
        ? opts.autostart
        : poolDefaults.autostart;

    if (opts.acquireTimeoutMillis) {
      // @ts-ignore
      this.acquireTimeoutMillis = parseInt(opts.acquireTimeoutMillis, 10);
    }

    if (opts.destroyTimeoutMillis) {
      // @ts-ignore
      this.destroyTimeoutMillis = parseInt(opts.destroyTimeoutMillis, 10);
    }

    if (opts.maxWaitingClients !== undefined) {
      // @ts-ignore
      this.maxWaitingClients = parseInt(opts.maxWaitingClients, 10);
    }

    // @ts-ignore
    this.max = parseInt(opts.max, 10);
    // @ts-ignore
    this.min = parseInt(opts.min, 10);

    this.max = Math.max(isNaN(this.max) ? 1 : this.max, 1);
    this.min = Math.min(isNaN(this.min) ? 0 : this.min, this.max);

    this.evictionRunIntervalMillis =
      opts.evictionRunIntervalMillis || poolDefaults.evictionRunIntervalMillis;
    this.numTestsPerEvictionRun =
      opts.numTestsPerEvictionRun || poolDefaults.numTestsPerEvictionRun;
    this.softIdleTimeoutMillis =
      opts.softIdleTimeoutMillis || poolDefaults.softIdleTimeoutMillis;
    this.idleTimeoutMillis =
      opts.idleTimeoutMillis || poolDefaults.idleTimeoutMillis;

    this.Promise = opts.Promise != null ? opts.Promise : poolDefaults.Promise;
  }
};

var PoolOptions_1 = PoolOptions$1;

/**
 * This is apparently a bit like a Jquery deferred, hence the name
 */

let Deferred$3 = class Deferred {
  constructor(Promise) {
    this._state = Deferred.PENDING;
    this._resolve = undefined;
    this._reject = undefined;

    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  get state() {
    return this._state;
  }

  get promise() {
    return this._promise;
  }

  reject(reason) {
    if (this._state !== Deferred.PENDING) {
      return;
    }
    this._state = Deferred.REJECTED;
    this._reject(reason);
  }

  resolve(value) {
    if (this._state !== Deferred.PENDING) {
      return;
    }
    this._state = Deferred.FULFILLED;
    this._resolve(value);
  }
};

// TODO: should these really live here? or be a seperate 'state' enum
Deferred$3.PENDING = "PENDING";
Deferred$3.FULFILLED = "FULFILLED";
Deferred$3.REJECTED = "REJECTED";

var Deferred_1 = Deferred$3;

class ExtendableError extends Error {
  constructor(message) {
    super(message);
    // @ts-ignore
    this.name = this.constructor.name;
    this.message = message;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

/* eslint-disable no-useless-constructor */
class TimeoutError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}
/* eslint-enable no-useless-constructor */

var errors$1 = {
  TimeoutError: TimeoutError
};

const Deferred$2 = Deferred_1;
const errors = errors$1;

function fbind(fn, ctx) {
  return function bound() {
    return fn.apply(ctx, arguments);
  };
}

/**
 * Wraps a users request for a resource
 * Basically a promise mashed in with a timeout
 * @private
 */
let ResourceRequest$1 = class ResourceRequest extends Deferred$2 {
  /**
   * [constructor description]
   * @param  {Number} ttl     timeout
   */
  constructor(ttl, Promise) {
    super(Promise);
    this._creationTimestamp = Date.now();
    this._timeout = null;

    if (ttl !== undefined) {
      this.setTimeout(ttl);
    }
  }

  setTimeout(delay) {
    if (this._state !== ResourceRequest.PENDING) {
      return;
    }
    const ttl = parseInt(delay, 10);

    if (isNaN(ttl) || ttl <= 0) {
      throw new Error("delay must be a positive int");
    }

    const age = Date.now() - this._creationTimestamp;

    if (this._timeout) {
      this.removeTimeout();
    }

    this._timeout = setTimeout(
      fbind(this._fireTimeout, this),
      Math.max(ttl - age, 0)
    );
  }

  removeTimeout() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = null;
  }

  _fireTimeout() {
    this.reject(new errors.TimeoutError("ResourceRequest timed out"));
  }

  reject(reason) {
    this.removeTimeout();
    super.reject(reason);
  }

  resolve(value) {
    this.removeTimeout();
    super.resolve(value);
  }
};

var ResourceRequest_1 = ResourceRequest$1;

const Deferred$1 = Deferred_1;

/**
 * Plan is to maybe add tracking via Error objects
 * and other fun stuff!
 */

let ResourceLoan$1 = class ResourceLoan extends Deferred$1 {
  /**
   *
   * @param  {any} pooledResource the PooledResource this loan belongs to
   * @return {any}                [description]
   */
  constructor(pooledResource, Promise) {
    super(Promise);
    this._creationTimestamp = Date.now();
    this.pooledResource = pooledResource;
  }

  reject() {
    /**
     * Loans can only be resolved at the moment
     */
  }
};

var ResourceLoan_1 = ResourceLoan$1;

const PooledResourceStateEnum$1 = {
  ALLOCATED: "ALLOCATED", // In use
  IDLE: "IDLE", // In the queue, not in use.
  INVALID: "INVALID", // Failed validation
  RETURNING: "RETURNING", // Resource is in process of returning
  VALIDATION: "VALIDATION" // Currently being tested
};

var PooledResourceStateEnum_1 = PooledResourceStateEnum$1;

const PooledResourceStateEnum = PooledResourceStateEnum_1;

/**
 * @class
 * @private
 */
let PooledResource$1 = class PooledResource {
  constructor(resource) {
    this.creationTime = Date.now();
    this.lastReturnTime = null;
    this.lastBorrowTime = null;
    this.lastIdleTime = null;
    this.obj = resource;
    this.state = PooledResourceStateEnum.IDLE;
  }

  // mark the resource as "allocated"
  allocate() {
    this.lastBorrowTime = Date.now();
    this.state = PooledResourceStateEnum.ALLOCATED;
  }

  // mark the resource as "deallocated"
  deallocate() {
    this.lastReturnTime = Date.now();
    this.state = PooledResourceStateEnum.IDLE;
  }

  invalidate() {
    this.state = PooledResourceStateEnum.INVALID;
  }

  test() {
    this.state = PooledResourceStateEnum.VALIDATION;
  }

  idle() {
    this.lastIdleTime = Date.now();
    this.state = PooledResourceStateEnum.IDLE;
  }

  returning() {
    this.state = PooledResourceStateEnum.RETURNING;
  }
};

var PooledResource_1 = PooledResource$1;

let DefaultEvictor$1 = class DefaultEvictor {
  evict(config, pooledResource, availableObjectsCount) {
    const idleTime = Date.now() - pooledResource.lastIdleTime;

    if (
      config.softIdleTimeoutMillis > 0 &&
      config.softIdleTimeoutMillis < idleTime &&
      config.min < availableObjectsCount
    ) {
      return true;
    }

    if (config.idleTimeoutMillis < idleTime) {
      return true;
    }

    return false;
  }
};

var DefaultEvictor_1 = DefaultEvictor$1;

/**
 * A Doubly Linked List, because there aren't enough in the world...
 * this is pretty much a direct JS port of the one wikipedia
 * https://en.wikipedia.org/wiki/Doubly_linked_list
 *
 * For most usage 'insertBeginning' and 'insertEnd' should be enough
 *
 * nodes are expected to something like a POJSO like
 * {
 *   prev: null,
 *   next: null,
 *   something: 'whatever you like'
 * }
 */
let DoublyLinkedList$2 = class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  insertBeginning(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      node.prev = null;
      node.next = null;
      this.length++;
    } else {
      this.insertBefore(this.head, node);
    }
  }

  insertEnd(node) {
    if (this.tail === null) {
      this.insertBeginning(node);
    } else {
      this.insertAfter(this.tail, node);
    }
  }

  insertAfter(node, newNode) {
    newNode.prev = node;
    newNode.next = node.next;
    if (node.next === null) {
      this.tail = newNode;
    } else {
      node.next.prev = newNode;
    }
    node.next = newNode;
    this.length++;
  }

  insertBefore(node, newNode) {
    newNode.prev = node.prev;
    newNode.next = node;
    if (node.prev === null) {
      this.head = newNode;
    } else {
      node.prev.next = newNode;
    }
    node.prev = newNode;
    this.length++;
  }

  remove(node) {
    if (node.prev === null) {
      this.head = node.next;
    } else {
      node.prev.next = node.next;
    }
    if (node.next === null) {
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
    }
    node.prev = null;
    node.next = null;
    this.length--;
  }

  // FIXME: this should not live here and has become a dumping ground...
  static createNode(data) {
    return {
      prev: null,
      next: null,
      data: data
    };
  }
};

var DoublyLinkedList_1 = DoublyLinkedList$2;

/**
 * Creates an interator for a DoublyLinkedList starting at the given node
 * It's internal cursor will remains relative to the last "iterated" node as that
 * node moves through the list until it either iterates to the end of the list,
 * or the the node it's tracking is removed from the list. Until the first 'next'
 * call it tracks the head/tail of the linked list. This means that one can create
 * an iterator on an empty list, then add nodes, and then the iterator will follow
 * those nodes. Because the DoublyLinkedList nodes don't track their owning "list" and
 * it's highly inefficient to walk the list for every iteration, the iterator won't know
 * if the node has been detached from one List and added to another list, or if the iterator
 *
 * The created object is an es6 compatible iterator
 */
let DoublyLinkedListIterator$1 = class DoublyLinkedListIterator {
  /**
   * @param  {Object} doublyLinkedList     a node that is part of a doublyLinkedList
   * @param  {Boolean} [reverse=false]     is this a reverse iterator? default: false
   */
  constructor(doublyLinkedList, reverse) {
    this._list = doublyLinkedList;
    // NOTE: these key names are tied to the DoublyLinkedListIterator
    this._direction = reverse === true ? "prev" : "next";
    this._startPosition = reverse === true ? "tail" : "head";
    this._started = false;
    this._cursor = null;
    this._done = false;
  }

  _start() {
    this._cursor = this._list[this._startPosition];
    this._started = true;
  }

  _advanceCursor() {
    if (this._started === false) {
      this._started = true;
      this._cursor = this._list[this._startPosition];
      return;
    }
    this._cursor = this._cursor[this._direction];
  }

  reset() {
    this._done = false;
    this._started = false;
    this._cursor = null;
  }

  remove() {
    if (
      this._started === false ||
      this._done === true ||
      this._isCursorDetached()
    ) {
      return false;
    }
    this._list.remove(this._cursor);
  }

  next() {
    if (this._done === true) {
      return { done: true };
    }

    this._advanceCursor();

    // if there is no node at the cursor or the node at the cursor is no longer part of
    // a doubly linked list then we are done/finished/kaput
    if (this._cursor === null || this._isCursorDetached()) {
      this._done = true;
      return { done: true };
    }

    return {
      value: this._cursor,
      done: false
    };
  }

  /**
   * Is the node detached from a list?
   * NOTE: you can trick/bypass/confuse this check by removing a node from one DoublyLinkedList
   * and adding it to another.
   * TODO: We can make this smarter by checking the direction of travel and only checking
   * the required next/prev/head/tail rather than all of them
   * @return {Boolean}      [description]
   */
  _isCursorDetached() {
    return (
      this._cursor.prev === null &&
      this._cursor.next === null &&
      this._list.tail !== this._cursor &&
      this._list.head !== this._cursor
    );
  }
};

var DoublyLinkedListIterator_1 = DoublyLinkedListIterator$1;

const DoublyLinkedListIterator = DoublyLinkedListIterator_1;
/**
 * Thin wrapper around an underlying DDL iterator
 */
let DequeIterator$1 = class DequeIterator extends DoublyLinkedListIterator {
  next() {
    const result = super.next();

    // unwrap the node...
    if (result.value) {
      result.value = result.value.data;
    }

    return result;
  }
};

var DequeIterator_1 = DequeIterator$1;

const DoublyLinkedList$1 = DoublyLinkedList_1;
const DequeIterator = DequeIterator_1;
/**
 * DoublyLinkedList backed double ended queue
 * implements just enough to keep the Pool
 */
let Deque$2 = class Deque {
  constructor() {
    this._list = new DoublyLinkedList$1();
  }

  /**
   * removes and returns the first element from the queue
   * @return {any} [description]
   */
  shift() {
    if (this.length === 0) {
      return undefined;
    }

    const node = this._list.head;
    this._list.remove(node);

    return node.data;
  }

  /**
   * adds one elemts to the beginning of the queue
   * @param  {any} element [description]
   * @return {any}         [description]
   */
  unshift(element) {
    const node = DoublyLinkedList$1.createNode(element);

    this._list.insertBeginning(node);
  }

  /**
   * adds one to the end of the queue
   * @param  {any} element [description]
   * @return {any}         [description]
   */
  push(element) {
    const node = DoublyLinkedList$1.createNode(element);

    this._list.insertEnd(node);
  }

  /**
   * removes and returns the last element from the queue
   */
  pop() {
    if (this.length === 0) {
      return undefined;
    }

    const node = this._list.tail;
    this._list.remove(node);

    return node.data;
  }

  [Symbol.iterator]() {
    return new DequeIterator(this._list);
  }

  iterator() {
    return new DequeIterator(this._list);
  }

  reverseIterator() {
    return new DequeIterator(this._list, true);
  }

  /**
   * get a reference to the item at the head of the queue
   * @return {any} [description]
   */
  get head() {
    if (this.length === 0) {
      return undefined;
    }
    const node = this._list.head;
    return node.data;
  }

  /**
   * get a reference to the item at the tail of the queue
   * @return {any} [description]
   */
  get tail() {
    if (this.length === 0) {
      return undefined;
    }
    const node = this._list.tail;
    return node.data;
  }

  get length() {
    return this._list.length;
  }
};

var Deque_1 = Deque$2;

const DoublyLinkedList = DoublyLinkedList_1;
const Deque$1 = Deque_1;

/**
 * Sort of a internal queue for holding the waiting
 * resource requets for a given "priority".
 * Also handles managing timeouts rejections on items (is this the best place for this?)
 * This is the last point where we know which queue a resourceRequest is in
 *
 */
let Queue$1 = class Queue extends Deque$1 {
  /**
   * Adds the obj to the end of the list for this slot
   * we completely override the parent method because we need access to the
   * node for our rejection handler
   * @param {any} resourceRequest [description]
   */
  push(resourceRequest) {
    const node = DoublyLinkedList.createNode(resourceRequest);
    resourceRequest.promise.catch(this._createTimeoutRejectionHandler(node));
    this._list.insertEnd(node);
  }

  _createTimeoutRejectionHandler(node) {
    return reason => {
      if (reason.name === "TimeoutError") {
        this._list.remove(node);
      }
    };
  }
};

var Queue_1 = Queue$1;

const Queue = Queue_1;

/**
 * @class
 * @private
 */
let PriorityQueue$1 = class PriorityQueue {
  constructor(size) {
    this._size = Math.max(+size | 0, 1);
    /** @type {Queue[]} */
    this._slots = [];
    // initialize arrays to hold queue elements
    for (let i = 0; i < this._size; i++) {
      this._slots.push(new Queue());
    }
  }

  get length() {
    let _length = 0;
    for (let i = 0, slots = this._slots.length; i < slots; i++) {
      _length += this._slots[i].length;
    }
    return _length;
  }

  enqueue(obj, priority) {
    // Convert to integer with a default value of 0.
    priority = (priority && +priority | 0) || 0;

    if (priority) {
      if (priority < 0 || priority >= this._size) {
        priority = this._size - 1;
        // put obj at the end of the line
      }
    }
    this._slots[priority].push(obj);
  }

  dequeue() {
    for (let i = 0, sl = this._slots.length; i < sl; i += 1) {
      if (this._slots[i].length) {
        return this._slots[i].shift();
      }
    }
    return;
  }

  get head() {
    for (let i = 0, sl = this._slots.length; i < sl; i += 1) {
      if (this._slots[i].length > 0) {
        return this._slots[i].head;
      }
    }
    return;
  }

  get tail() {
    for (let i = this._slots.length - 1; i >= 0; i--) {
      if (this._slots[i].length > 0) {
        return this._slots[i].tail;
      }
    }
    return;
  }
};

var PriorityQueue_1 = PriorityQueue$1;

var utils = {};

function noop() {}

/**
 * Reflects a promise but does not expose any
 * underlying value or rejection from that promise.
 * @param  {Promise} promise [description]
 * @return {Promise}         [description]
 */
utils.reflector = function(promise) {
  return promise.then(noop, noop);
};

const EventEmitter = require$$0.EventEmitter;

const factoryValidator = factoryValidator$1;
const PoolOptions = PoolOptions_1;
const ResourceRequest = ResourceRequest_1;
const ResourceLoan = ResourceLoan_1;
const PooledResource = PooledResource_1;
const Deferred = Deferred_1;

const reflector = utils.reflector;

/**
 * TODO: move me
 */
const FACTORY_CREATE_ERROR = "factoryCreateError";
const FACTORY_DESTROY_ERROR = "factoryDestroyError";

let Pool$1 = class Pool extends EventEmitter {
  /**
   * Generate an Object pool with a specified `factory` and `config`.
   *
   * @param {typeof DefaultEvictor} Evictor
   * @param {typeof Deque} Deque
   * @param {typeof PriorityQueue} PriorityQueue
   * @param {Object} factory
   *   Factory to be used for generating and destroying the items.
   * @param {Function} factory.create
   *   Should create the item to be acquired,
   *   and call it's first callback argument with the generated item as it's argument.
   * @param {Function} factory.destroy
   *   Should gently close any resources that the item is using.
   *   Called before the items is destroyed.
   * @param {Function} factory.validate
   *   Test if a resource is still valid .Should return a promise that resolves to a boolean, true if resource is still valid and false
   *   If it should be removed from pool.
   * @param {Object} options
   */
  constructor(Evictor, Deque, PriorityQueue, factory, options) {
    super();

    factoryValidator(factory);

    this._config = new PoolOptions(options);

    // TODO: fix up this ugly glue-ing
    this._Promise = this._config.Promise;

    this._factory = factory;
    this._draining = false;
    this._started = false;
    /**
     * Holds waiting clients
     * @type {PriorityQueue}
     */
    this._waitingClientsQueue = new PriorityQueue(this._config.priorityRange);

    /**
     * Collection of promises for resource creation calls made by the pool to factory.create
     * @type {Set}
     */
    this._factoryCreateOperations = new Set();

    /**
     * Collection of promises for resource destruction calls made by the pool to factory.destroy
     * @type {Set}
     */
    this._factoryDestroyOperations = new Set();

    /**
     * A queue/stack of pooledResources awaiting acquisition
     * TODO: replace with LinkedList backed array
     * @type {Deque}
     */
    this._availableObjects = new Deque();

    /**
     * Collection of references for any resource that are undergoing validation before being acquired
     * @type {Set}
     */
    this._testOnBorrowResources = new Set();

    /**
     * Collection of references for any resource that are undergoing validation before being returned
     * @type {Set}
     */
    this._testOnReturnResources = new Set();

    /**
     * Collection of promises for any validations currently in process
     * @type {Set}
     */
    this._validationOperations = new Set();

    /**
     * All objects associated with this pool in any state (except destroyed)
     * @type {Set}
     */
    this._allObjects = new Set();

    /**
     * Loans keyed by the borrowed resource
     * @type {Map}
     */
    this._resourceLoans = new Map();

    /**
     * Infinitely looping iterator over available object
     * @type {DequeIterator}
     */
    this._evictionIterator = this._availableObjects.iterator();

    this._evictor = new Evictor();

    /**
     * handle for setTimeout for next eviction run
     * @type {(number|null)}
     */
    this._scheduledEviction = null;

    // create initial resources (if factory.min > 0)
    if (this._config.autostart === true) {
      this.start();
    }
  }

  _destroy(pooledResource) {
    // FIXME: do we need another state for "in destruction"?
    pooledResource.invalidate();
    this._allObjects.delete(pooledResource);
    // NOTE: this maybe very bad promise usage?
    const destroyPromise = this._factory.destroy(pooledResource.obj);
    const wrappedDestroyPromise = this._config.destroyTimeoutMillis
      ? this._Promise.resolve(this._applyDestroyTimeout(destroyPromise))
      : this._Promise.resolve(destroyPromise);

    this._trackOperation(
      wrappedDestroyPromise,
      this._factoryDestroyOperations
    ).catch(reason => {
      this.emit(FACTORY_DESTROY_ERROR, reason);
    });

    // TODO: maybe ensuring minimum pool size should live outside here
    this._ensureMinimum();
  }

  _applyDestroyTimeout(promise) {
    const timeoutPromise = new this._Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("destroy timed out"));
      }, this._config.destroyTimeoutMillis).unref();
    });
    return this._Promise.race([timeoutPromise, promise]);
  }

  /**
   * Attempt to move an available resource into test and then onto a waiting client
   * @return {Boolean} could we move an available resource into test
   */
  _testOnBorrow() {
    if (this._availableObjects.length < 1) {
      return false;
    }

    const pooledResource = this._availableObjects.shift();
    // Mark the resource as in test
    pooledResource.test();
    this._testOnBorrowResources.add(pooledResource);
    const validationPromise = this._factory.validate(pooledResource.obj);
    const wrappedValidationPromise = this._Promise.resolve(validationPromise);

    this._trackOperation(
      wrappedValidationPromise,
      this._validationOperations
    ).then(isValid => {
      this._testOnBorrowResources.delete(pooledResource);

      if (isValid === false) {
        pooledResource.invalidate();
        this._destroy(pooledResource);
        this._dispense();
        return;
      }
      this._dispatchPooledResourceToNextWaitingClient(pooledResource);
    });

    return true;
  }

  /**
   * Attempt to move an available resource to a waiting client
   * @return {Boolean} [description]
   */
  _dispatchResource() {
    if (this._availableObjects.length < 1) {
      return false;
    }

    const pooledResource = this._availableObjects.shift();
    this._dispatchPooledResourceToNextWaitingClient(pooledResource);
    return false;
  }

  /**
   * Attempt to resolve an outstanding resource request using an available resource from
   * the pool, or creating new ones
   *
   * @private
   */
  _dispense() {
    /**
     * Local variables for ease of reading/writing
     * these don't (shouldn't) change across the execution of this fn
     */
    const numWaitingClients = this._waitingClientsQueue.length;

    // If there aren't any waiting requests then there is nothing to do
    // so lets short-circuit
    if (numWaitingClients < 1) {
      return;
    }

    const resourceShortfall =
      numWaitingClients - this._potentiallyAllocableResourceCount;

    const actualNumberOfResourcesToCreate = Math.min(
      this.spareResourceCapacity,
      resourceShortfall
    );
    for (let i = 0; actualNumberOfResourcesToCreate > i; i++) {
      this._createResource();
    }

    // If we are doing test-on-borrow see how many more resources need to be moved into test
    // to help satisfy waitingClients
    if (this._config.testOnBorrow === true) {
      // how many available resources do we need to shift into test
      const desiredNumberOfResourcesToMoveIntoTest =
        numWaitingClients - this._testOnBorrowResources.size;
      const actualNumberOfResourcesToMoveIntoTest = Math.min(
        this._availableObjects.length,
        desiredNumberOfResourcesToMoveIntoTest
      );
      for (let i = 0; actualNumberOfResourcesToMoveIntoTest > i; i++) {
        this._testOnBorrow();
      }
    }

    // if we aren't testing-on-borrow then lets try to allocate what we can
    if (this._config.testOnBorrow === false) {
      const actualNumberOfResourcesToDispatch = Math.min(
        this._availableObjects.length,
        numWaitingClients
      );
      for (let i = 0; actualNumberOfResourcesToDispatch > i; i++) {
        this._dispatchResource();
      }
    }
  }

  /**
   * Dispatches a pooledResource to the next waiting client (if any) else
   * puts the PooledResource back on the available list
   * @param  {PooledResource} pooledResource [description]
   * @return {Boolean}                [description]
   */
  _dispatchPooledResourceToNextWaitingClient(pooledResource) {
    const clientResourceRequest = this._waitingClientsQueue.dequeue();
    if (
      clientResourceRequest === undefined ||
      clientResourceRequest.state !== Deferred.PENDING
    ) {
      // While we were away either all the waiting clients timed out
      // or were somehow fulfilled. put our pooledResource back.
      this._addPooledResourceToAvailableObjects(pooledResource);
      // TODO: do need to trigger anything before we leave?
      return false;
    }
    const loan = new ResourceLoan(pooledResource, this._Promise);
    this._resourceLoans.set(pooledResource.obj, loan);
    pooledResource.allocate();
    clientResourceRequest.resolve(pooledResource.obj);
    return true;
  }

  /**
   * tracks on operation using given set
   * handles adding/removing from the set and resolve/rejects the value/reason
   * @param  {Promise} operation
   * @param  {Set} set       Set holding operations
   * @return {Promise}       Promise that resolves once operation has been removed from set
   */
  _trackOperation(operation, set) {
    set.add(operation);

    return operation.then(
      v => {
        set.delete(operation);
        return this._Promise.resolve(v);
      },
      e => {
        set.delete(operation);
        return this._Promise.reject(e);
      }
    );
  }

  /**
   * @private
   */
  _createResource() {
    // An attempt to create a resource
    const factoryPromise = this._factory.create();
    const wrappedFactoryPromise = this._Promise
      .resolve(factoryPromise)
      .then(resource => {
        const pooledResource = new PooledResource(resource);
        this._allObjects.add(pooledResource);
        this._addPooledResourceToAvailableObjects(pooledResource);
      });

    this._trackOperation(wrappedFactoryPromise, this._factoryCreateOperations)
      .then(() => {
        this._dispense();
        // Stop bluebird complaining about this side-effect only handler
        // - a promise was created in a handler but was not returned from it
        // https://goo.gl/rRqMUw
        return null;
      })
      .catch(reason => {
        this.emit(FACTORY_CREATE_ERROR, reason);
        this._dispense();
      });
  }

  /**
   * @private
   */
  _ensureMinimum() {
    if (this._draining === true) {
      return;
    }
    const minShortfall = this._config.min - this._count;
    for (let i = 0; i < minShortfall; i++) {
      this._createResource();
    }
  }

  _evict() {
    const testsToRun = Math.min(
      this._config.numTestsPerEvictionRun,
      this._availableObjects.length
    );
    const evictionConfig = {
      softIdleTimeoutMillis: this._config.softIdleTimeoutMillis,
      idleTimeoutMillis: this._config.idleTimeoutMillis,
      min: this._config.min
    };
    for (let testsHaveRun = 0; testsHaveRun < testsToRun; ) {
      const iterationResult = this._evictionIterator.next();

      // Safety check incase we could get stuck in infinite loop because we
      // somehow emptied the array after checking its length.
      if (iterationResult.done === true && this._availableObjects.length < 1) {
        this._evictionIterator.reset();
        return;
      }
      // If this happens it should just mean we reached the end of the
      // list and can reset the cursor.
      if (iterationResult.done === true && this._availableObjects.length > 0) {
        this._evictionIterator.reset();
        continue;
      }

      const resource = iterationResult.value;

      const shouldEvict = this._evictor.evict(
        evictionConfig,
        resource,
        this._availableObjects.length
      );
      testsHaveRun++;

      if (shouldEvict === true) {
        // take it out of the _availableObjects list
        this._evictionIterator.remove();
        this._destroy(resource);
      }
    }
  }

  _scheduleEvictorRun() {
    // Start eviction if set
    if (this._config.evictionRunIntervalMillis > 0) {
      // @ts-ignore
      this._scheduledEviction = setTimeout(() => {
        this._evict();
        this._scheduleEvictorRun();
      }, this._config.evictionRunIntervalMillis).unref();
    }
  }

  _descheduleEvictorRun() {
    if (this._scheduledEviction) {
      clearTimeout(this._scheduledEviction);
    }
    this._scheduledEviction = null;
  }

  start() {
    if (this._draining === true) {
      return;
    }
    if (this._started === true) {
      return;
    }
    this._started = true;
    this._scheduleEvictorRun();
    this._ensureMinimum();
  }

  /**
   * Request a new resource. The callback will be called,
   * when a new resource is available, passing the resource to the callback.
   * TODO: should we add a seperate "acquireWithPriority" function
   *
   * @param {Number} [priority=0]
   *   Optional.  Integer between 0 and (priorityRange - 1).  Specifies the priority
   *   of the caller if there are no available resources.  Lower numbers mean higher
   *   priority.
   *
   * @returns {Promise}
   */
  acquire(priority) {
    if (this._started === false && this._config.autostart === false) {
      this.start();
    }

    if (this._draining) {
      return this._Promise.reject(
        new Error("pool is draining and cannot accept work")
      );
    }

    // TODO: should we defer this check till after this event loop incase "the situation" changes in the meantime
    if (
      this.spareResourceCapacity < 1 &&
      this._availableObjects.length < 1 &&
      this._config.maxWaitingClients !== undefined &&
      this._waitingClientsQueue.length >= this._config.maxWaitingClients
    ) {
      return this._Promise.reject(
        new Error("max waitingClients count exceeded")
      );
    }

    const resourceRequest = new ResourceRequest(
      this._config.acquireTimeoutMillis,
      this._Promise
    );
    this._waitingClientsQueue.enqueue(resourceRequest, priority);
    this._dispense();

    return resourceRequest.promise;
  }

  /**
   * [use method, aquires a resource, passes the resource to a user supplied function and releases it]
   * @param  {Function} fn [a function that accepts a resource and returns a promise that resolves/rejects once it has finished using the resource]
   * @return {Promise}      [resolves once the resource is released to the pool]
   */
  use(fn, priority) {
    return this.acquire(priority).then(resource => {
      return fn(resource).then(
        result => {
          this.release(resource);
          return result;
        },
        err => {
          this.destroy(resource);
          throw err;
        }
      );
    });
  }

  /**
   * Check if resource is currently on loan from the pool
   *
   * @param {Function} resource
   *    Resource for checking.
   *
   * @returns {Boolean}
   *  True if resource belongs to this pool and false otherwise
   */
  isBorrowedResource(resource) {
    return this._resourceLoans.has(resource);
  }

  /**
   * Return the resource to the pool when it is no longer required.
   *
   * @param {Object} resource
   *   The acquired object to be put back to the pool.
   */
  release(resource) {
    // check for an outstanding loan
    const loan = this._resourceLoans.get(resource);

    if (loan === undefined) {
      return this._Promise.reject(
        new Error("Resource not currently part of this pool")
      );
    }

    this._resourceLoans.delete(resource);
    loan.resolve();
    const pooledResource = loan.pooledResource;

    pooledResource.deallocate();
    this._addPooledResourceToAvailableObjects(pooledResource);

    this._dispense();
    return this._Promise.resolve();
  }

  /**
   * Request the resource to be destroyed. The factory's destroy handler
   * will also be called.
   *
   * This should be called within an acquire() block as an alternative to release().
   *
   * @param {Object} resource
   *   The acquired resource to be destoyed.
   */
  destroy(resource) {
    // check for an outstanding loan
    const loan = this._resourceLoans.get(resource);

    if (loan === undefined) {
      return this._Promise.reject(
        new Error("Resource not currently part of this pool")
      );
    }

    this._resourceLoans.delete(resource);
    loan.resolve();
    const pooledResource = loan.pooledResource;

    pooledResource.deallocate();
    this._destroy(pooledResource);

    this._dispense();
    return this._Promise.resolve();
  }

  _addPooledResourceToAvailableObjects(pooledResource) {
    pooledResource.idle();
    if (this._config.fifo === true) {
      this._availableObjects.push(pooledResource);
    } else {
      this._availableObjects.unshift(pooledResource);
    }
  }

  /**
   * Disallow any new acquire calls and let the request backlog dissapate.
   * The Pool will no longer attempt to maintain a "min" number of resources
   * and will only make new resources on demand.
   * Resolves once all resource requests are fulfilled and all resources are returned to pool and available...
   * Should probably be called "drain work"
   * @returns {Promise}
   */
  drain() {
    this._draining = true;
    return this.__allResourceRequestsSettled()
      .then(() => {
        return this.__allResourcesReturned();
      })
      .then(() => {
        this._descheduleEvictorRun();
      });
  }

  __allResourceRequestsSettled() {
    if (this._waitingClientsQueue.length > 0) {
      // wait for last waiting client to be settled
      // FIXME: what if they can "resolve" out of order....?
      return reflector(this._waitingClientsQueue.tail.promise);
    }
    return this._Promise.resolve();
  }

  // FIXME: this is a horrific mess
  __allResourcesReturned() {
    const ps = Array.from(this._resourceLoans.values())
      .map(loan => loan.promise)
      .map(reflector);
    return this._Promise.all(ps);
  }

  /**
   * Forcibly destroys all available resources regardless of timeout.  Intended to be
   * invoked as part of a drain.  Does not prevent the creation of new
   * resources as a result of subsequent calls to acquire.
   *
   * Note that if factory.min > 0 and the pool isn't "draining", the pool will destroy all idle resources
   * in the pool, but replace them with newly created resources up to the
   * specified factory.min value.  If this is not desired, set factory.min
   * to zero before calling clear()
   *
   */
  clear() {
    const reflectedCreatePromises = Array.from(
      this._factoryCreateOperations
    ).map(reflector);

    // wait for outstanding factory.create to complete
    return this._Promise.all(reflectedCreatePromises).then(() => {
      // Destroy existing resources
      // @ts-ignore
      for (const resource of this._availableObjects) {
        this._destroy(resource);
      }
      const reflectedDestroyPromises = Array.from(
        this._factoryDestroyOperations
      ).map(reflector);
      return reflector(this._Promise.all(reflectedDestroyPromises));
    });
  }

  /**
   * Waits until the pool is ready.
   * We define ready by checking if the current resource number is at least
   * the minimum number defined.
   * @returns {Promise} that resolves when the minimum number is ready.
   */
  ready() {
    return new this._Promise(resolve => {
      const isReady = () => {
        if (this.available >= this.min) {
          resolve();
        } else {
          setTimeout(isReady, 100);
        }
      };

      isReady();
    });
  }

  /**
   * How many resources are available to allocated
   * (includes resources that have not been tested and may faul validation)
   * NOTE: internal for now as the name is awful and might not be useful to anyone
   * @return {Number} number of resources the pool has to allocate
   */
  get _potentiallyAllocableResourceCount() {
    return (
      this._availableObjects.length +
      this._testOnBorrowResources.size +
      this._testOnReturnResources.size +
      this._factoryCreateOperations.size
    );
  }

  /**
   * The combined count of the currently created objects and those in the
   * process of being created
   * Does NOT include resources in the process of being destroyed
   * sort of legacy...
   * @return {Number}
   */
  get _count() {
    return this._allObjects.size + this._factoryCreateOperations.size;
  }

  /**
   * How many more resources does the pool have room for
   * @return {Number} number of resources the pool could create before hitting any limits
   */
  get spareResourceCapacity() {
    return (
      this._config.max -
      (this._allObjects.size + this._factoryCreateOperations.size)
    );
  }

  /**
   * see _count above
   * @return {Number} [description]
   */
  get size() {
    return this._count;
  }

  /**
   * number of available resources
   * @return {Number} [description]
   */
  get available() {
    return this._availableObjects.length;
  }

  /**
   * number of resources that are currently acquired
   * @return {Number} [description]
   */
  get borrowed() {
    return this._resourceLoans.size;
  }

  /**
   * number of waiting acquire calls
   * @return {Number} [description]
   */
  get pending() {
    return this._waitingClientsQueue.length;
  }

  /**
   * maximum size of the pool
   * @return {Number} [description]
   */
  get max() {
    return this._config.max;
  }

  /**
   * minimum size of the pool
   * @return {Number} [description]
   */
  get min() {
    return this._config.min;
  }
};

var Pool_1 = Pool$1;

const Pool = Pool_1;
const Deque = Deque_1;
const PriorityQueue = PriorityQueue_1;
const DefaultEvictor = DefaultEvictor_1;
var genericPool = {
  Pool: Pool,
  Deque: Deque,
  PriorityQueue: PriorityQueue,
  DefaultEvictor: DefaultEvictor,
  createPool: function(factory, config) {
    return new Pool(DefaultEvictor, Deque, PriorityQueue, factory, config);
  }
};

const name = "@redis/client";
const version = "1.5.17";
const license = "MIT";
const main = "./dist/index.js";
const types = "./dist/index.d.ts";
const files = [
	"dist/"
];
const scripts = {
	test: "nyc -r text-summary -r lcov mocha -r source-map-support/register -r ts-node/register './lib/**/*.spec.ts'",
	build: "tsc",
	lint: "eslint ./*.ts ./lib/**/*.ts",
	documentation: "typedoc"
};
const dependencies = {
	"cluster-key-slot": "1.1.2",
	"generic-pool": "3.9.0",
	yallist: "4.0.0"
};
const devDependencies = {
	"@istanbuljs/nyc-config-typescript": "^1.0.2",
	"@redis/test-utils": "*",
	"@types/node": "^20.6.2",
	"@types/sinon": "^10.0.16",
	"@types/yallist": "^4.0.1",
	"@typescript-eslint/eslint-plugin": "^6.7.2",
	"@typescript-eslint/parser": "^6.7.2",
	eslint: "^8.49.0",
	nyc: "^15.1.0",
	"release-it": "^16.1.5",
	sinon: "^16.0.0",
	"source-map-support": "^0.5.21",
	"ts-node": "^10.9.1",
	typedoc: "^0.25.1",
	typescript: "^5.2.2"
};
const engines = {
	node: ">=14"
};
const repository = {
	type: "git",
	url: "git://github.com/redis/node-redis.git"
};
const bugs = {
	url: "https://github.com/redis/node-redis/issues"
};
const homepage = "https://github.com/redis/node-redis/tree/master/packages/client";
const keywords = [
	"redis"
];
const require$$11 = {
	name: name,
	version: version,
	license: license,
	main: main,
	types: types,
	files: files,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies,
	engines: engines,
	repository: repository,
	bugs: bugs,
	homepage: homepage,
	keywords: keywords
};

var __classPrivateFieldGet$2 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$2 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _RedisClient_instances, _a$1, _RedisClient_options, _RedisClient_socket, _RedisClient_queue, _RedisClient_isolationPool, _RedisClient_v4, _RedisClient_selectedDB, _RedisClient_initiateOptions, _RedisClient_initiateQueue, _RedisClient_initiateSocket, _RedisClient_initiateIsolationPool, _RedisClient_legacyMode, _RedisClient_legacySendCommand, _RedisClient_defineLegacyCommand, _RedisClient_pingTimer, _RedisClient_setPingTimer, _RedisClient_sendCommand, _RedisClient_pubSubCommand, _RedisClient_tick, _RedisClient_addMultiCommands, _RedisClient_destroyIsolationPool;
Object.defineProperty(client, "__esModule", { value: true });
const commands_1 = commands$6;
const socket_1 = socket;
const commands_queue_1 = commandsQueue;
const multi_command_1 = multiCommand$2;
const events_1 = require$$0;
const command_options_1 = commandOptions$1;
const commander_1 = commander;
const generic_pool_1 = genericPool;
const errors_1$1 = errors$2;
const url_1 = require$$0;
const pub_sub_1$1 = pubSub;
const package_json_1 = require$$11;
class RedisClient extends events_1.EventEmitter {
    static commandOptions(options) {
        return (0, command_options_1.commandOptions)(options);
    }
    static extend(extensions) {
        const Client = (0, commander_1.attachExtensions)({
            BaseClass: _a$1,
            modulesExecutor: _a$1.prototype.commandsExecutor,
            modules: extensions?.modules,
            functionsExecutor: _a$1.prototype.functionsExecuter,
            functions: extensions?.functions,
            scriptsExecutor: _a$1.prototype.scriptsExecuter,
            scripts: extensions?.scripts
        });
        if (Client !== _a$1) {
            Client.prototype.Multi = multi_command_1.default.extend(extensions);
        }
        return Client;
    }
    static create(options) {
        return new (_a$1.extend(options))(options);
    }
    static parseURL(url) {
        // https://www.iana.org/assignments/uri-schemes/prov/redis
        const { hostname, port, protocol, username, password, pathname } = new url_1.URL(url), parsed = {
            socket: {
                host: hostname
            }
        };
        if (protocol === 'rediss:') {
            parsed.socket.tls = true;
        }
        else if (protocol !== 'redis:') {
            throw new TypeError('Invalid protocol');
        }
        if (port) {
            parsed.socket.port = Number(port);
        }
        if (username) {
            parsed.username = decodeURIComponent(username);
        }
        if (password) {
            parsed.password = decodeURIComponent(password);
        }
        if (pathname.length > 1) {
            const database = Number(pathname.substring(1));
            if (isNaN(database)) {
                throw new TypeError('Invalid pathname');
            }
            parsed.database = database;
        }
        return parsed;
    }
    get options() {
        return __classPrivateFieldGet$2(this, _RedisClient_options, "f");
    }
    get isOpen() {
        return __classPrivateFieldGet$2(this, _RedisClient_socket, "f").isOpen;
    }
    get isReady() {
        return __classPrivateFieldGet$2(this, _RedisClient_socket, "f").isReady;
    }
    get isPubSubActive() {
        return __classPrivateFieldGet$2(this, _RedisClient_queue, "f").isPubSubActive;
    }
    get v4() {
        if (!__classPrivateFieldGet$2(this, _RedisClient_options, "f")?.legacyMode) {
            throw new Error('the client is not in "legacy mode"');
        }
        return __classPrivateFieldGet$2(this, _RedisClient_v4, "f");
    }
    constructor(options) {
        super();
        _RedisClient_instances.add(this);
        Object.defineProperty(this, "commandOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _a$1.commandOptions
        });
        _RedisClient_options.set(this, void 0);
        _RedisClient_socket.set(this, void 0);
        _RedisClient_queue.set(this, void 0);
        _RedisClient_isolationPool.set(this, void 0);
        _RedisClient_v4.set(this, {});
        _RedisClient_selectedDB.set(this, 0);
        _RedisClient_pingTimer.set(this, void 0);
        Object.defineProperty(this, "select", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.SELECT
        });
        Object.defineProperty(this, "subscribe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.SUBSCRIBE
        });
        Object.defineProperty(this, "unsubscribe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.UNSUBSCRIBE
        });
        Object.defineProperty(this, "pSubscribe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.PSUBSCRIBE
        });
        Object.defineProperty(this, "pUnsubscribe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.PUNSUBSCRIBE
        });
        Object.defineProperty(this, "sSubscribe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.SSUBSCRIBE
        });
        Object.defineProperty(this, "sUnsubscribe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.SUNSUBSCRIBE
        });
        Object.defineProperty(this, "quit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.QUIT
        });
        Object.defineProperty(this, "multi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.MULTI
        });
        __classPrivateFieldSet$2(this, _RedisClient_options, __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_initiateOptions).call(this, options), "f");
        __classPrivateFieldSet$2(this, _RedisClient_queue, __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_initiateQueue).call(this), "f");
        __classPrivateFieldSet$2(this, _RedisClient_socket, __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_initiateSocket).call(this), "f");
        // should be initiated in connect, not here
        // TODO: consider breaking in v5
        __classPrivateFieldSet$2(this, _RedisClient_isolationPool, __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_initiateIsolationPool).call(this), "f");
        __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_legacyMode).call(this);
    }
    duplicate(overrides) {
        return new (Object.getPrototypeOf(this).constructor)({
            ...__classPrivateFieldGet$2(this, _RedisClient_options, "f"),
            ...overrides
        });
    }
    async connect() {
        // see comment in constructor
        __classPrivateFieldSet$2(this, _RedisClient_isolationPool, __classPrivateFieldGet$2(this, _RedisClient_isolationPool, "f") ?? __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_initiateIsolationPool).call(this), "f");
        await __classPrivateFieldGet$2(this, _RedisClient_socket, "f").connect();
        return this;
    }
    async commandsExecutor(command, args) {
        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(command, args);
        return (0, commander_1.transformCommandReply)(command, await __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, redisArgs, options), redisArgs.preserve);
    }
    sendCommand(args, options) {
        return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, args, options);
    }
    async functionsExecuter(fn, args, name) {
        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(fn, args);
        return (0, commander_1.transformCommandReply)(fn, await this.executeFunction(name, fn, redisArgs, options), redisArgs.preserve);
    }
    executeFunction(name, fn, args, options) {
        return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, (0, commander_1.fCallArguments)(name, fn, args), options);
    }
    async scriptsExecuter(script, args) {
        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(script, args);
        return (0, commander_1.transformCommandReply)(script, await this.executeScript(script, redisArgs, options), redisArgs.preserve);
    }
    async executeScript(script, args, options) {
        const redisArgs = ['EVALSHA', script.SHA1];
        if (script.NUMBER_OF_KEYS !== undefined) {
            redisArgs.push(script.NUMBER_OF_KEYS.toString());
        }
        redisArgs.push(...args);
        try {
            return await __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, redisArgs, options);
        }
        catch (err) {
            if (!err?.message?.startsWith?.('NOSCRIPT')) {
                throw err;
            }
            redisArgs[0] = 'EVAL';
            redisArgs[1] = script.SCRIPT;
            return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, redisArgs, options);
        }
    }
    async SELECT(options, db) {
        if (!(0, command_options_1.isCommandOptions)(options)) {
            db = options;
            options = null;
        }
        await __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, ['SELECT', db.toString()], options);
        __classPrivateFieldSet$2(this, _RedisClient_selectedDB, db, "f");
    }
    SUBSCRIBE(channels, listener, bufferMode) {
        return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet$2(this, _RedisClient_queue, "f").subscribe(pub_sub_1$1.PubSubType.CHANNELS, channels, listener, bufferMode));
    }
    UNSUBSCRIBE(channels, listener, bufferMode) {
        return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet$2(this, _RedisClient_queue, "f").unsubscribe(pub_sub_1$1.PubSubType.CHANNELS, channels, listener, bufferMode));
    }
    PSUBSCRIBE(patterns, listener, bufferMode) {
        return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet$2(this, _RedisClient_queue, "f").subscribe(pub_sub_1$1.PubSubType.PATTERNS, patterns, listener, bufferMode));
    }
    PUNSUBSCRIBE(patterns, listener, bufferMode) {
        return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet$2(this, _RedisClient_queue, "f").unsubscribe(pub_sub_1$1.PubSubType.PATTERNS, patterns, listener, bufferMode));
    }
    SSUBSCRIBE(channels, listener, bufferMode) {
        return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet$2(this, _RedisClient_queue, "f").subscribe(pub_sub_1$1.PubSubType.SHARDED, channels, listener, bufferMode));
    }
    SUNSUBSCRIBE(channels, listener, bufferMode) {
        return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet$2(this, _RedisClient_queue, "f").unsubscribe(pub_sub_1$1.PubSubType.SHARDED, channels, listener, bufferMode));
    }
    getPubSubListeners(type) {
        return __classPrivateFieldGet$2(this, _RedisClient_queue, "f").getPubSubListeners(type);
    }
    extendPubSubChannelListeners(type, channel, listeners) {
        return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet$2(this, _RedisClient_queue, "f").extendPubSubChannelListeners(type, channel, listeners));
    }
    extendPubSubListeners(type, listeners) {
        return __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet$2(this, _RedisClient_queue, "f").extendPubSubListeners(type, listeners));
    }
    QUIT() {
        return __classPrivateFieldGet$2(this, _RedisClient_socket, "f").quit(async () => {
            if (__classPrivateFieldGet$2(this, _RedisClient_pingTimer, "f"))
                clearTimeout(__classPrivateFieldGet$2(this, _RedisClient_pingTimer, "f"));
            const quitPromise = __classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand(['QUIT']);
            __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
            const [reply] = await Promise.all([
                quitPromise,
                __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_destroyIsolationPool).call(this)
            ]);
            return reply;
        });
    }
    executeIsolated(fn) {
        if (!__classPrivateFieldGet$2(this, _RedisClient_isolationPool, "f"))
            return Promise.reject(new errors_1$1.ClientClosedError());
        return __classPrivateFieldGet$2(this, _RedisClient_isolationPool, "f").use(fn);
    }
    MULTI() {
        return new this.Multi(this.multiExecutor.bind(this), __classPrivateFieldGet$2(this, _RedisClient_options, "f")?.legacyMode);
    }
    async multiExecutor(commands, selectedDB, chainId) {
        if (!__classPrivateFieldGet$2(this, _RedisClient_socket, "f").isOpen) {
            return Promise.reject(new errors_1$1.ClientClosedError());
        }
        const promise = chainId ?
            // if `chainId` has a value, it's a `MULTI` (and not "pipeline") - need to add the `MULTI` and `EXEC` commands
            Promise.all([
                __classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand(['MULTI'], { chainId }),
                __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_addMultiCommands).call(this, commands, chainId),
                __classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand(['EXEC'], { chainId })
            ]) :
            __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_addMultiCommands).call(this, commands);
        __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
        const results = await promise;
        if (selectedDB !== undefined) {
            __classPrivateFieldSet$2(this, _RedisClient_selectedDB, selectedDB, "f");
        }
        return results;
    }
    async *scanIterator(options) {
        let cursor = 0;
        do {
            const reply = await this.scan(cursor, options);
            cursor = reply.cursor;
            for (const key of reply.keys) {
                yield key;
            }
        } while (cursor !== 0);
    }
    async *hScanIterator(key, options) {
        let cursor = 0;
        do {
            const reply = await this.hScan(key, cursor, options);
            cursor = reply.cursor;
            for (const tuple of reply.tuples) {
                yield tuple;
            }
        } while (cursor !== 0);
    }
    async *hScanNoValuesIterator(key, options) {
        let cursor = 0;
        do {
            const reply = await this.hScanNoValues(key, cursor, options);
            cursor = reply.cursor;
            for (const k of reply.keys) {
                yield k;
            }
        } while (cursor !== 0);
    }
    async *sScanIterator(key, options) {
        let cursor = 0;
        do {
            const reply = await this.sScan(key, cursor, options);
            cursor = reply.cursor;
            for (const member of reply.members) {
                yield member;
            }
        } while (cursor !== 0);
    }
    async *zScanIterator(key, options) {
        let cursor = 0;
        do {
            const reply = await this.zScan(key, cursor, options);
            cursor = reply.cursor;
            for (const member of reply.members) {
                yield member;
            }
        } while (cursor !== 0);
    }
    async disconnect() {
        if (__classPrivateFieldGet$2(this, _RedisClient_pingTimer, "f"))
            clearTimeout(__classPrivateFieldGet$2(this, _RedisClient_pingTimer, "f"));
        __classPrivateFieldGet$2(this, _RedisClient_queue, "f").flushAll(new errors_1$1.DisconnectsClientError());
        __classPrivateFieldGet$2(this, _RedisClient_socket, "f").disconnect();
        await __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_destroyIsolationPool).call(this);
    }
    ref() {
        __classPrivateFieldGet$2(this, _RedisClient_socket, "f").ref();
    }
    unref() {
        __classPrivateFieldGet$2(this, _RedisClient_socket, "f").unref();
    }
}
_a$1 = RedisClient, _RedisClient_options = new WeakMap(), _RedisClient_socket = new WeakMap(), _RedisClient_queue = new WeakMap(), _RedisClient_isolationPool = new WeakMap(), _RedisClient_v4 = new WeakMap(), _RedisClient_selectedDB = new WeakMap(), _RedisClient_pingTimer = new WeakMap(), _RedisClient_instances = new WeakSet(), _RedisClient_initiateOptions = function _RedisClient_initiateOptions(options) {
    if (options?.url) {
        const parsed = _a$1.parseURL(options.url);
        if (options.socket) {
            parsed.socket = Object.assign(options.socket, parsed.socket);
        }
        Object.assign(options, parsed);
    }
    if (options?.database) {
        __classPrivateFieldSet$2(this, _RedisClient_selectedDB, options.database, "f");
    }
    return options;
}, _RedisClient_initiateQueue = function _RedisClient_initiateQueue() {
    return new commands_queue_1.default(__classPrivateFieldGet$2(this, _RedisClient_options, "f")?.commandsQueueMaxLength, (channel, listeners) => this.emit('sharded-channel-moved', channel, listeners));
}, _RedisClient_initiateSocket = function _RedisClient_initiateSocket() {
    const socketInitiator = async () => {
        const promises = [];
        if (__classPrivateFieldGet$2(this, _RedisClient_selectedDB, "f") !== 0) {
            promises.push(__classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand(['SELECT', __classPrivateFieldGet$2(this, _RedisClient_selectedDB, "f").toString()], { asap: true }));
        }
        if (__classPrivateFieldGet$2(this, _RedisClient_options, "f")?.readonly) {
            promises.push(__classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand(commands_1.default.READONLY.transformArguments(), { asap: true }));
        }
        if (!__classPrivateFieldGet$2(this, _RedisClient_options, "f")?.disableClientInfo) {
            promises.push(__classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand(['CLIENT', 'SETINFO', 'LIB-VER', package_json_1.version], { asap: true }).catch(err => {
                if (!(err instanceof errors_1$1.ErrorReply)) {
                    throw err;
                }
            }));
            promises.push(__classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand([
                'CLIENT', 'SETINFO', 'LIB-NAME',
                __classPrivateFieldGet$2(this, _RedisClient_options, "f")?.clientInfoTag ? `node-redis(${__classPrivateFieldGet$2(this, _RedisClient_options, "f").clientInfoTag})` : 'node-redis'
            ], { asap: true }).catch(err => {
                if (!(err instanceof errors_1$1.ErrorReply)) {
                    throw err;
                }
            }));
        }
        if (__classPrivateFieldGet$2(this, _RedisClient_options, "f")?.name) {
            promises.push(__classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand(commands_1.default.CLIENT_SETNAME.transformArguments(__classPrivateFieldGet$2(this, _RedisClient_options, "f").name), { asap: true }));
        }
        if (__classPrivateFieldGet$2(this, _RedisClient_options, "f")?.username || __classPrivateFieldGet$2(this, _RedisClient_options, "f")?.password) {
            promises.push(__classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand(commands_1.default.AUTH.transformArguments({
                username: __classPrivateFieldGet$2(this, _RedisClient_options, "f").username,
                password: __classPrivateFieldGet$2(this, _RedisClient_options, "f").password ?? ''
            }), { asap: true }));
        }
        const resubscribePromise = __classPrivateFieldGet$2(this, _RedisClient_queue, "f").resubscribe();
        if (resubscribePromise) {
            promises.push(resubscribePromise);
        }
        if (promises.length) {
            __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_tick).call(this, true);
            await Promise.all(promises);
        }
    };
    return new socket_1.default(socketInitiator, __classPrivateFieldGet$2(this, _RedisClient_options, "f")?.socket)
        .on('data', chunk => __classPrivateFieldGet$2(this, _RedisClient_queue, "f").onReplyChunk(chunk))
        .on('error', err => {
        this.emit('error', err);
        if (__classPrivateFieldGet$2(this, _RedisClient_socket, "f").isOpen && !__classPrivateFieldGet$2(this, _RedisClient_options, "f")?.disableOfflineQueue) {
            __classPrivateFieldGet$2(this, _RedisClient_queue, "f").flushWaitingForReply(err);
        }
        else {
            __classPrivateFieldGet$2(this, _RedisClient_queue, "f").flushAll(err);
        }
    })
        .on('connect', () => {
        this.emit('connect');
    })
        .on('ready', () => {
        this.emit('ready');
        __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_setPingTimer).call(this);
        __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
    })
        .on('reconnecting', () => this.emit('reconnecting'))
        .on('drain', () => __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_tick).call(this))
        .on('end', () => this.emit('end'));
}, _RedisClient_initiateIsolationPool = function _RedisClient_initiateIsolationPool() {
    return (0, generic_pool_1.createPool)({
        create: async () => {
            const duplicate = this.duplicate({
                isolationPoolOptions: undefined
            }).on('error', err => this.emit('error', err));
            await duplicate.connect();
            return duplicate;
        },
        destroy: client => client.disconnect()
    }, __classPrivateFieldGet$2(this, _RedisClient_options, "f")?.isolationPoolOptions);
}, _RedisClient_legacyMode = function _RedisClient_legacyMode() {
    var _b, _c;
    if (!__classPrivateFieldGet$2(this, _RedisClient_options, "f")?.legacyMode)
        return;
    __classPrivateFieldGet$2(this, _RedisClient_v4, "f").sendCommand = __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_sendCommand).bind(this);
    this.sendCommand = (...args) => {
        const result = __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_legacySendCommand).call(this, ...args);
        if (result) {
            result.promise
                .then(reply => result.callback(null, reply))
                .catch(err => result.callback(err));
        }
    };
    for (const [name, command] of Object.entries(commands_1.default)) {
        __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, name, command);
        (_b = this)[_c = name.toLowerCase()] ?? (_b[_c] = this[name]);
    }
    // hard coded commands
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'SELECT');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'select');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'SUBSCRIBE');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'subscribe');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'PSUBSCRIBE');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'pSubscribe');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'UNSUBSCRIBE');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'unsubscribe');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'PUNSUBSCRIBE');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'pUnsubscribe');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'QUIT');
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, 'quit');
}, _RedisClient_legacySendCommand = function _RedisClient_legacySendCommand(...args) {
    const callback = typeof args[args.length - 1] === 'function' ?
        args.pop() :
        undefined;
    const promise = __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, (0, commander_1.transformLegacyCommandArguments)(args));
    if (callback)
        return {
            promise,
            callback
        };
    promise.catch(err => this.emit('error', err));
}, _RedisClient_defineLegacyCommand = function _RedisClient_defineLegacyCommand(name, command) {
    __classPrivateFieldGet$2(this, _RedisClient_v4, "f")[name] = this[name].bind(this);
    this[name] = command && command.TRANSFORM_LEGACY_REPLY && command.transformReply ?
        (...args) => {
            const result = __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_legacySendCommand).call(this, name, ...args);
            if (result) {
                result.promise
                    .then(reply => result.callback(null, command.transformReply(reply)))
                    .catch(err => result.callback(err));
            }
        } :
        (...args) => this.sendCommand(name, ...args);
}, _RedisClient_setPingTimer = function _RedisClient_setPingTimer() {
    if (!__classPrivateFieldGet$2(this, _RedisClient_options, "f")?.pingInterval || !__classPrivateFieldGet$2(this, _RedisClient_socket, "f").isReady)
        return;
    clearTimeout(__classPrivateFieldGet$2(this, _RedisClient_pingTimer, "f"));
    __classPrivateFieldSet$2(this, _RedisClient_pingTimer, setTimeout(() => {
        if (!__classPrivateFieldGet$2(this, _RedisClient_socket, "f").isReady)
            return;
        // using #sendCommand to support legacy mode
        __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, ['PING'])
            .then(reply => this.emit('ping-interval', reply))
            .catch(err => this.emit('error', err))
            .finally(() => __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_setPingTimer).call(this));
    }, __classPrivateFieldGet$2(this, _RedisClient_options, "f").pingInterval), "f");
}, _RedisClient_sendCommand = function _RedisClient_sendCommand(args, options) {
    if (!__classPrivateFieldGet$2(this, _RedisClient_socket, "f").isOpen) {
        return Promise.reject(new errors_1$1.ClientClosedError());
    }
    else if (options?.isolated) {
        return this.executeIsolated(isolatedClient => isolatedClient.sendCommand(args, {
            ...options,
            isolated: false
        }));
    }
    else if (!__classPrivateFieldGet$2(this, _RedisClient_socket, "f").isReady && __classPrivateFieldGet$2(this, _RedisClient_options, "f")?.disableOfflineQueue) {
        return Promise.reject(new errors_1$1.ClientOfflineError());
    }
    const promise = __classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand(args, options);
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
    return promise;
}, _RedisClient_pubSubCommand = function _RedisClient_pubSubCommand(promise) {
    if (promise === undefined)
        return Promise.resolve();
    __classPrivateFieldGet$2(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
    return promise;
}, _RedisClient_tick = function _RedisClient_tick(force = false) {
    if (__classPrivateFieldGet$2(this, _RedisClient_socket, "f").writableNeedDrain || (!force && !__classPrivateFieldGet$2(this, _RedisClient_socket, "f").isReady)) {
        return;
    }
    __classPrivateFieldGet$2(this, _RedisClient_socket, "f").cork();
    while (!__classPrivateFieldGet$2(this, _RedisClient_socket, "f").writableNeedDrain) {
        const args = __classPrivateFieldGet$2(this, _RedisClient_queue, "f").getCommandToSend();
        if (args === undefined)
            break;
        __classPrivateFieldGet$2(this, _RedisClient_socket, "f").writeCommand(args);
    }
}, _RedisClient_addMultiCommands = function _RedisClient_addMultiCommands(commands, chainId) {
    return Promise.all(commands.map(({ args }) => __classPrivateFieldGet$2(this, _RedisClient_queue, "f").addCommand(args, { chainId })));
}, _RedisClient_destroyIsolationPool = async function _RedisClient_destroyIsolationPool() {
    await __classPrivateFieldGet$2(this, _RedisClient_isolationPool, "f").drain();
    await __classPrivateFieldGet$2(this, _RedisClient_isolationPool, "f").clear();
    __classPrivateFieldSet$2(this, _RedisClient_isolationPool, undefined, "f");
};
client.default = RedisClient;
(0, commander_1.attachCommands)({
    BaseClass: RedisClient,
    commands: commands_1.default,
    executor: RedisClient.prototype.commandsExecutor
});
RedisClient.prototype.Multi = multi_command_1.default;

var cluster = {};

var clusterSlots = {};

var lib = {exports: {}};

/*
 * Copyright 2001-2010 Georges Menie (www.menie.org)
 * Copyright 2010 Salvatore Sanfilippo (adapted to Redis coding style)
 * Copyright 2015 Zihua Li (http://zihua.li) (ported to JavaScript)
 * Copyright 2016 Mike Diarmid (http://github.com/salakar) (re-write for performance, ~700% perf inc)
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the University of California, Berkeley nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* CRC16 implementation according to CCITT standards.
 *
 * Note by @antirez: this is actually the XMODEM CRC 16 algorithm, using the
 * following parameters:
 *
 * Name                       : "XMODEM", also known as "ZMODEM", "CRC-16/ACORN"
 * Width                      : 16 bit
 * Poly                       : 1021 (That is actually x^16 + x^12 + x^5 + 1)
 * Initialization             : 0000
 * Reflect Input byte         : False
 * Reflect Output CRC         : False
 * Xor constant to output CRC : 0000
 * Output for "123456789"     : 31C3
 */

var lookup = [
  0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7,
  0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef,
  0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
  0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de,
  0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485,
  0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d,
  0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4,
  0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc,
  0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823,
  0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b,
  0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12,
  0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a,
  0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41,
  0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49,
  0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70,
  0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78,
  0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f,
  0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
  0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e,
  0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256,
  0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
  0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405,
  0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c,
  0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634,
  0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab,
  0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3,
  0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
  0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92,
  0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9,
  0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1,
  0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8,
  0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0
];

/**
 * Convert a string to a UTF8 array - faster than via buffer
 * @param str
 * @returns {Array}
 */
var toUTF8Array = function toUTF8Array(str) {
  var char;
  var i = 0;
  var p = 0;
  var utf8 = [];
  var len = str.length;

  for (; i < len; i++) {
    char = str.charCodeAt(i);
    if (char < 128) {
      utf8[p++] = char;
    } else if (char < 2048) {
      utf8[p++] = (char >> 6) | 192;
      utf8[p++] = (char & 63) | 128;
    } else if (
        ((char & 0xFC00) === 0xD800) && (i + 1) < str.length &&
        ((str.charCodeAt(i + 1) & 0xFC00) === 0xDC00)) {
      char = 0x10000 + ((char & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
      utf8[p++] = (char >> 18) | 240;
      utf8[p++] = ((char >> 12) & 63) | 128;
      utf8[p++] = ((char >> 6) & 63) | 128;
      utf8[p++] = (char & 63) | 128;
    } else {
      utf8[p++] = (char >> 12) | 224;
      utf8[p++] = ((char >> 6) & 63) | 128;
      utf8[p++] = (char & 63) | 128;
    }
  }

  return utf8;
};

/**
 * Convert a string into a redis slot hash.
 * @param str
 * @returns {number}
 */
var generate = lib.exports = function generate(str) {
  var char;
  var i = 0;
  var start = -1;
  var result = 0;
  var resultHash = 0;
  var utf8 = typeof str === 'string' ? toUTF8Array(str) : str;
  var len = utf8.length;

  while (i < len) {
    char = utf8[i++];
    if (start === -1) {
      if (char === 0x7B) {
        start = i;
      }
    } else if (char !== 0x7D) {
      resultHash = lookup[(char ^ (resultHash >> 8)) & 0xFF] ^ (resultHash << 8);
    } else if (i - 1 !== start) {
      return resultHash & 0x3FFF;
    }

    result = lookup[(char ^ (result >> 8)) & 0xFF] ^ (result << 8);
  }

  return result & 0x3FFF;
};

/**
 * Convert an array of multiple strings into a redis slot hash.
 * Returns -1 if one of the keys is not for the same slot as the others
 * @param keys
 * @returns {number}
 */
lib.exports.generateMulti = function generateMulti(keys) {
  var i = 1;
  var len = keys.length;
  var base = generate(keys[0]);

  while (i < len) {
    if (generate(keys[i++]) !== base) return -1;
  }

  return base;
};

var libExports = lib.exports;

var __classPrivateFieldGet$1 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$1 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _RedisClusterSlots_instances, _a, _RedisClusterSlots_SLOTS, _RedisClusterSlots_options, _RedisClusterSlots_Client, _RedisClusterSlots_emit, _RedisClusterSlots_isOpen, _RedisClusterSlots_discoverWithRootNodes, _RedisClusterSlots_resetSlots, _RedisClusterSlots_discover, _RedisClusterSlots_getShards, _RedisClusterSlots_getNodeAddress, _RedisClusterSlots_clientOptionsDefaults, _RedisClusterSlots_initiateSlotNode, _RedisClusterSlots_createClient, _RedisClusterSlots_createNodeClient, _RedisClusterSlots_runningRediscoverPromise, _RedisClusterSlots_rediscover, _RedisClusterSlots_destroy, _RedisClusterSlots_execOnNodeClient, _RedisClusterSlots_iterateAllNodes, _RedisClusterSlots_randomNodeIterator, _RedisClusterSlots_slotNodesIterator, _RedisClusterSlots_initiatePubSubClient, _RedisClusterSlots_initiateShardedPubSubClient;
Object.defineProperty(clusterSlots, "__esModule", { value: true });
const client_1 = client;
const errors_1 = errors$2;
const util_1 = require$$0;
const pub_sub_1 = pubSub;
// We need to use 'require', because it's not possible with Typescript to import
// function that are exported as 'module.exports = function`, without esModuleInterop
// set to true.
const calculateSlot = libExports;
class RedisClusterSlots {
    get isOpen() {
        return __classPrivateFieldGet$1(this, _RedisClusterSlots_isOpen, "f");
    }
    constructor(options, emit) {
        _RedisClusterSlots_instances.add(this);
        _RedisClusterSlots_options.set(this, void 0);
        _RedisClusterSlots_Client.set(this, void 0);
        _RedisClusterSlots_emit.set(this, void 0);
        Object.defineProperty(this, "slots", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Array(__classPrivateFieldGet$1(_a, _a, "f", _RedisClusterSlots_SLOTS))
        });
        Object.defineProperty(this, "shards", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Array()
        });
        Object.defineProperty(this, "masters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Array()
        });
        Object.defineProperty(this, "replicas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Array()
        });
        Object.defineProperty(this, "nodeByAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "pubSubNode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _RedisClusterSlots_isOpen.set(this, false);
        _RedisClusterSlots_runningRediscoverPromise.set(this, void 0);
        _RedisClusterSlots_randomNodeIterator.set(this, void 0);
        __classPrivateFieldSet$1(this, _RedisClusterSlots_options, options, "f");
        __classPrivateFieldSet$1(this, _RedisClusterSlots_Client, client_1.default.extend(options), "f");
        __classPrivateFieldSet$1(this, _RedisClusterSlots_emit, emit, "f");
    }
    async connect() {
        if (__classPrivateFieldGet$1(this, _RedisClusterSlots_isOpen, "f")) {
            throw new Error('Cluster already open');
        }
        __classPrivateFieldSet$1(this, _RedisClusterSlots_isOpen, true, "f");
        try {
            await __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discoverWithRootNodes).call(this);
        }
        catch (err) {
            __classPrivateFieldSet$1(this, _RedisClusterSlots_isOpen, false, "f");
            throw err;
        }
    }
    nodeClient(node) {
        return node.client ?? __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_createNodeClient).call(this, node);
    }
    async rediscover(startWith) {
        __classPrivateFieldSet$1(this, _RedisClusterSlots_runningRediscoverPromise, __classPrivateFieldGet$1(this, _RedisClusterSlots_runningRediscoverPromise, "f") ?? __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_rediscover).call(this, startWith)
            .finally(() => __classPrivateFieldSet$1(this, _RedisClusterSlots_runningRediscoverPromise, undefined, "f")), "f");
        return __classPrivateFieldGet$1(this, _RedisClusterSlots_runningRediscoverPromise, "f");
    }
    quit() {
        return __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_destroy).call(this, client => client.quit());
    }
    disconnect() {
        return __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_destroy).call(this, client => client.disconnect());
    }
    getClient(firstKey, isReadonly) {
        if (!firstKey) {
            return this.nodeClient(this.getRandomNode());
        }
        const slotNumber = calculateSlot(firstKey);
        if (!isReadonly) {
            return this.nodeClient(this.slots[slotNumber].master);
        }
        return this.nodeClient(this.getSlotRandomNode(slotNumber));
    }
    getRandomNode() {
        __classPrivateFieldSet$1(this, _RedisClusterSlots_randomNodeIterator, __classPrivateFieldGet$1(this, _RedisClusterSlots_randomNodeIterator, "f") ?? __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_iterateAllNodes).call(this), "f");
        return __classPrivateFieldGet$1(this, _RedisClusterSlots_randomNodeIterator, "f").next().value;
    }
    getSlotRandomNode(slotNumber) {
        const slot = this.slots[slotNumber];
        if (!slot.replicas?.length) {
            return slot.master;
        }
        slot.nodesIterator ?? (slot.nodesIterator = __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_slotNodesIterator).call(this, slot));
        return slot.nodesIterator.next().value;
    }
    getMasterByAddress(address) {
        const master = this.nodeByAddress.get(address);
        if (!master)
            return;
        return this.nodeClient(master);
    }
    getPubSubClient() {
        return this.pubSubNode ?
            this.pubSubNode.client :
            __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiatePubSubClient).call(this);
    }
    async executeUnsubscribeCommand(unsubscribe) {
        const client = await this.getPubSubClient();
        await unsubscribe(client);
        if (!client.isPubSubActive && client.isOpen) {
            await client.disconnect();
            this.pubSubNode = undefined;
        }
    }
    getShardedPubSubClient(channel) {
        const { master } = this.slots[calculateSlot(channel)];
        return master.pubSubClient ?? __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateShardedPubSubClient).call(this, master);
    }
    async executeShardedUnsubscribeCommand(channel, unsubscribe) {
        const { master } = this.slots[calculateSlot(channel)];
        if (!master.pubSubClient)
            return Promise.resolve();
        const client = await master.pubSubClient;
        await unsubscribe(client);
        if (!client.isPubSubActive && client.isOpen) {
            await client.disconnect();
            master.pubSubClient = undefined;
        }
    }
}
_a = RedisClusterSlots, _RedisClusterSlots_options = new WeakMap(), _RedisClusterSlots_Client = new WeakMap(), _RedisClusterSlots_emit = new WeakMap(), _RedisClusterSlots_isOpen = new WeakMap(), _RedisClusterSlots_runningRediscoverPromise = new WeakMap(), _RedisClusterSlots_randomNodeIterator = new WeakMap(), _RedisClusterSlots_instances = new WeakSet(), _RedisClusterSlots_discoverWithRootNodes = async function _RedisClusterSlots_discoverWithRootNodes() {
    let start = Math.floor(Math.random() * __classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").rootNodes.length);
    for (let i = start; i < __classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").rootNodes.length; i++) {
        if (await __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discover).call(this, __classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").rootNodes[i]))
            return;
    }
    for (let i = 0; i < start; i++) {
        if (await __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discover).call(this, __classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").rootNodes[i]))
            return;
    }
    throw new errors_1.RootNodesUnavailableError();
}, _RedisClusterSlots_resetSlots = function _RedisClusterSlots_resetSlots() {
    this.slots = new Array(__classPrivateFieldGet$1(_a, _a, "f", _RedisClusterSlots_SLOTS));
    this.shards = [];
    this.masters = [];
    this.replicas = [];
    __classPrivateFieldSet$1(this, _RedisClusterSlots_randomNodeIterator, undefined, "f");
}, _RedisClusterSlots_discover = async function _RedisClusterSlots_discover(rootNode) {
    const addressesInUse = new Set();
    try {
        const shards = await __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getShards).call(this, rootNode), promises = [], eagerConnect = __classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").minimizeConnections !== true;
        __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_resetSlots).call(this);
        for (const { from, to, master, replicas } of shards) {
            const shard = {
                master: __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateSlotNode).call(this, master, false, eagerConnect, addressesInUse, promises)
            };
            if (__classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").useReplicas) {
                shard.replicas = replicas.map(replica => __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateSlotNode).call(this, replica, true, eagerConnect, addressesInUse, promises));
            }
            this.shards.push(shard);
            for (let i = from; i <= to; i++) {
                this.slots[i] = shard;
            }
        }
        if (this.pubSubNode && !addressesInUse.has(this.pubSubNode.address)) {
            if (util_1.types.isPromise(this.pubSubNode.client)) {
                promises.push(this.pubSubNode.client.then(client => client.disconnect()));
                this.pubSubNode = undefined;
            }
            else {
                promises.push(this.pubSubNode.client.disconnect());
                const channelsListeners = this.pubSubNode.client.getPubSubListeners(pub_sub_1.PubSubType.CHANNELS), patternsListeners = this.pubSubNode.client.getPubSubListeners(pub_sub_1.PubSubType.PATTERNS);
                if (channelsListeners.size || patternsListeners.size) {
                    promises.push(__classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiatePubSubClient).call(this, {
                        [pub_sub_1.PubSubType.CHANNELS]: channelsListeners,
                        [pub_sub_1.PubSubType.PATTERNS]: patternsListeners
                    }));
                }
            }
        }
        for (const [address, node] of this.nodeByAddress.entries()) {
            if (addressesInUse.has(address))
                continue;
            if (node.client) {
                promises.push(__classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, node.client, client => client.disconnect()));
            }
            const { pubSubClient } = node;
            if (pubSubClient) {
                promises.push(__classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, pubSubClient, client => client.disconnect()));
            }
            this.nodeByAddress.delete(address);
        }
        await Promise.all(promises);
        return true;
    }
    catch (err) {
        __classPrivateFieldGet$1(this, _RedisClusterSlots_emit, "f").call(this, 'error', err);
        return false;
    }
}, _RedisClusterSlots_getShards = async function _RedisClusterSlots_getShards(rootNode) {
    const client = new (__classPrivateFieldGet$1(this, _RedisClusterSlots_Client, "f"))(__classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_clientOptionsDefaults).call(this, rootNode, true));
    client.on('error', err => __classPrivateFieldGet$1(this, _RedisClusterSlots_emit, "f").call(this, 'error', err));
    await client.connect();
    try {
        // using `CLUSTER SLOTS` and not `CLUSTER SHARDS` to support older versions
        return await client.clusterSlots();
    }
    finally {
        await client.disconnect();
    }
}, _RedisClusterSlots_getNodeAddress = function _RedisClusterSlots_getNodeAddress(address) {
    switch (typeof __classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").nodeAddressMap) {
        case 'object':
            return __classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").nodeAddressMap[address];
        case 'function':
            return __classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").nodeAddressMap(address);
    }
}, _RedisClusterSlots_clientOptionsDefaults = function _RedisClusterSlots_clientOptionsDefaults(options, disableReconnect) {
    let result;
    if (__classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").defaults) {
        let socket;
        if (__classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").defaults.socket) {
            socket = {
                ...__classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").defaults.socket,
                ...options?.socket
            };
        }
        else {
            socket = options?.socket;
        }
        result = {
            ...__classPrivateFieldGet$1(this, _RedisClusterSlots_options, "f").defaults,
            ...options,
            socket
        };
    }
    else {
        result = options;
    }
    if (disableReconnect) {
        result ?? (result = {});
        result.socket ?? (result.socket = {});
        result.socket.reconnectStrategy = false;
    }
    return result;
}, _RedisClusterSlots_initiateSlotNode = function _RedisClusterSlots_initiateSlotNode({ id, ip, port }, readonly, eagerConnent, addressesInUse, promises) {
    const address = `${ip}:${port}`;
    addressesInUse.add(address);
    let node = this.nodeByAddress.get(address);
    if (!node) {
        node = {
            id,
            host: ip,
            port,
            address,
            readonly,
            client: undefined
        };
        if (eagerConnent) {
            promises.push(__classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_createNodeClient).call(this, node));
        }
        this.nodeByAddress.set(address, node);
    }
    (readonly ? this.replicas : this.masters).push(node);
    return node;
}, _RedisClusterSlots_createClient = async function _RedisClusterSlots_createClient(node, readonly = node.readonly) {
    const client = new (__classPrivateFieldGet$1(this, _RedisClusterSlots_Client, "f"))(__classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_clientOptionsDefaults).call(this, {
        socket: __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getNodeAddress).call(this, node.address) ?? {
            host: node.host,
            port: node.port
        },
        readonly
    }));
    client.on('error', err => __classPrivateFieldGet$1(this, _RedisClusterSlots_emit, "f").call(this, 'error', err));
    await client.connect();
    return client;
}, _RedisClusterSlots_createNodeClient = function _RedisClusterSlots_createNodeClient(node) {
    const promise = __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_createClient).call(this, node)
        .then(client => {
        node.client = client;
        return client;
    })
        .catch(err => {
        node.client = undefined;
        throw err;
    });
    node.client = promise;
    return promise;
}, _RedisClusterSlots_rediscover = async function _RedisClusterSlots_rediscover(startWith) {
    if (await __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discover).call(this, startWith.options))
        return;
    return __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discoverWithRootNodes).call(this);
}, _RedisClusterSlots_destroy = async function _RedisClusterSlots_destroy(fn) {
    __classPrivateFieldSet$1(this, _RedisClusterSlots_isOpen, false, "f");
    const promises = [];
    for (const { master, replicas } of this.shards) {
        if (master.client) {
            promises.push(__classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, master.client, fn));
        }
        if (master.pubSubClient) {
            promises.push(__classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, master.pubSubClient, fn));
        }
        if (replicas) {
            for (const { client } of replicas) {
                if (client) {
                    promises.push(__classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, client, fn));
                }
            }
        }
    }
    if (this.pubSubNode) {
        promises.push(__classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, this.pubSubNode.client, fn));
        this.pubSubNode = undefined;
    }
    __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_resetSlots).call(this);
    this.nodeByAddress.clear();
    await Promise.allSettled(promises);
}, _RedisClusterSlots_execOnNodeClient = function _RedisClusterSlots_execOnNodeClient(client, fn) {
    return util_1.types.isPromise(client) ?
        client.then(fn) :
        fn(client);
}, _RedisClusterSlots_iterateAllNodes = function* _RedisClusterSlots_iterateAllNodes() {
    let i = Math.floor(Math.random() * (this.masters.length + this.replicas.length));
    if (i < this.masters.length) {
        do {
            yield this.masters[i];
        } while (++i < this.masters.length);
        for (const replica of this.replicas) {
            yield replica;
        }
    }
    else {
        i -= this.masters.length;
        do {
            yield this.replicas[i];
        } while (++i < this.replicas.length);
    }
    while (true) {
        for (const master of this.masters) {
            yield master;
        }
        for (const replica of this.replicas) {
            yield replica;
        }
    }
}, _RedisClusterSlots_slotNodesIterator = function* _RedisClusterSlots_slotNodesIterator(slot) {
    let i = Math.floor(Math.random() * (1 + slot.replicas.length));
    if (i < slot.replicas.length) {
        do {
            yield slot.replicas[i];
        } while (++i < slot.replicas.length);
    }
    while (true) {
        yield slot.master;
        for (const replica of slot.replicas) {
            yield replica;
        }
    }
}, _RedisClusterSlots_initiatePubSubClient = async function _RedisClusterSlots_initiatePubSubClient(toResubscribe) {
    const index = Math.floor(Math.random() * (this.masters.length + this.replicas.length)), node = index < this.masters.length ?
        this.masters[index] :
        this.replicas[index - this.masters.length];
    this.pubSubNode = {
        address: node.address,
        client: __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_createClient).call(this, node, true)
            .then(async (client) => {
            if (toResubscribe) {
                await Promise.all([
                    client.extendPubSubListeners(pub_sub_1.PubSubType.CHANNELS, toResubscribe[pub_sub_1.PubSubType.CHANNELS]),
                    client.extendPubSubListeners(pub_sub_1.PubSubType.PATTERNS, toResubscribe[pub_sub_1.PubSubType.PATTERNS])
                ]);
            }
            this.pubSubNode.client = client;
            return client;
        })
            .catch(err => {
            this.pubSubNode = undefined;
            throw err;
        })
    };
    return this.pubSubNode.client;
}, _RedisClusterSlots_initiateShardedPubSubClient = function _RedisClusterSlots_initiateShardedPubSubClient(master) {
    const promise = __classPrivateFieldGet$1(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_createClient).call(this, master, true)
        .then(client => {
        client.on('server-sunsubscribe', async (channel, listeners) => {
            try {
                await this.rediscover(client);
                const redirectTo = await this.getShardedPubSubClient(channel);
                redirectTo.extendPubSubChannelListeners(pub_sub_1.PubSubType.SHARDED, channel, listeners);
            }
            catch (err) {
                __classPrivateFieldGet$1(this, _RedisClusterSlots_emit, "f").call(this, 'sharded-shannel-moved-error', err, channel, listeners);
            }
        });
        master.pubSubClient = client;
        return client;
    })
        .catch(err => {
        master.pubSubClient = undefined;
        throw err;
    });
    master.pubSubClient = promise;
    return promise;
};
_RedisClusterSlots_SLOTS = { value: 16384 };
clusterSlots.default = RedisClusterSlots;

var multiCommand = {};

var hasRequiredMultiCommand;

function requireMultiCommand () {
	if (hasRequiredMultiCommand) return multiCommand;
	hasRequiredMultiCommand = 1;
	var __classPrivateFieldSet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
	    if (kind === "m") throw new TypeError("Private method is not writable");
	    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
	};
	var __classPrivateFieldGet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
	    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
	var _RedisClusterMultiCommand_multi, _RedisClusterMultiCommand_executor, _RedisClusterMultiCommand_firstKey;
	Object.defineProperty(multiCommand, "__esModule", { value: true });
	const commands_1 = commands$5;
	const multi_command_1 = multiCommand$1;
	const commander_1 = commander;
	const _1 = requireCluster();
	class RedisClusterMultiCommand {
	    static extend(extensions) {
	        return (0, commander_1.attachExtensions)({
	            BaseClass: RedisClusterMultiCommand,
	            modulesExecutor: RedisClusterMultiCommand.prototype.commandsExecutor,
	            modules: extensions?.modules,
	            functionsExecutor: RedisClusterMultiCommand.prototype.functionsExecutor,
	            functions: extensions?.functions,
	            scriptsExecutor: RedisClusterMultiCommand.prototype.scriptsExecutor,
	            scripts: extensions?.scripts
	        });
	    }
	    constructor(executor, firstKey) {
	        _RedisClusterMultiCommand_multi.set(this, new multi_command_1.default());
	        _RedisClusterMultiCommand_executor.set(this, void 0);
	        _RedisClusterMultiCommand_firstKey.set(this, void 0);
	        Object.defineProperty(this, "EXEC", {
	            enumerable: true,
	            configurable: true,
	            writable: true,
	            value: this.exec
	        });
	        __classPrivateFieldSet(this, _RedisClusterMultiCommand_executor, executor, "f");
	        __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, firstKey, "f");
	    }
	    commandsExecutor(command, args) {
	        const transformedArguments = command.transformArguments(...args);
	        __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f") ?? _1.default.extractFirstKey(command, args, transformedArguments), "f");
	        return this.addCommand(undefined, transformedArguments, command.transformReply);
	    }
	    addCommand(firstKey, args, transformReply) {
	        __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f") ?? firstKey, "f");
	        __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").addCommand(args, transformReply);
	        return this;
	    }
	    functionsExecutor(fn, args, name) {
	        const transformedArguments = __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").addFunction(name, fn, args);
	        __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f") ?? _1.default.extractFirstKey(fn, args, transformedArguments), "f");
	        return this;
	    }
	    scriptsExecutor(script, args) {
	        const transformedArguments = __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").addScript(script, args);
	        __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f") ?? _1.default.extractFirstKey(script, args, transformedArguments), "f");
	        return this;
	    }
	    async exec(execAsPipeline = false) {
	        if (execAsPipeline) {
	            return this.execAsPipeline();
	        }
	        return __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").handleExecReplies(await __classPrivateFieldGet(this, _RedisClusterMultiCommand_executor, "f").call(this, __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").queue, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f"), multi_command_1.default.generateChainId()));
	    }
	    async execAsPipeline() {
	        return __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").transformReplies(await __classPrivateFieldGet(this, _RedisClusterMultiCommand_executor, "f").call(this, __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").queue, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f")));
	    }
	}
	_RedisClusterMultiCommand_multi = new WeakMap(), _RedisClusterMultiCommand_executor = new WeakMap(), _RedisClusterMultiCommand_firstKey = new WeakMap();
	multiCommand.default = RedisClusterMultiCommand;
	(0, commander_1.attachCommands)({
	    BaseClass: RedisClusterMultiCommand,
	    commands: commands_1.default,
	    executor: RedisClusterMultiCommand.prototype.commandsExecutor
	});
	return multiCommand;
}

var hasRequiredCluster;

function requireCluster () {
	if (hasRequiredCluster) return cluster;
	hasRequiredCluster = 1;
	var __classPrivateFieldGet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
	    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
	var __classPrivateFieldSet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
	    if (kind === "m") throw new TypeError("Private method is not writable");
	    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
	};
	var _RedisCluster_instances, _RedisCluster_options, _RedisCluster_slots, _RedisCluster_Multi, _RedisCluster_execute;
	Object.defineProperty(cluster, "__esModule", { value: true });
	const commands_1 = commands$5;
	const cluster_slots_1 = clusterSlots;
	const commander_1 = commander;
	const events_1 = require$$0;
	const multi_command_1 = requireMultiCommand();
	const errors_1 = errors$2;
	class RedisCluster extends events_1.EventEmitter {
	    static extractFirstKey(command, originalArgs, redisArgs) {
	        if (command.FIRST_KEY_INDEX === undefined) {
	            return undefined;
	        }
	        else if (typeof command.FIRST_KEY_INDEX === 'number') {
	            return redisArgs[command.FIRST_KEY_INDEX];
	        }
	        return command.FIRST_KEY_INDEX(...originalArgs);
	    }
	    static create(options) {
	        return new ((0, commander_1.attachExtensions)({
	            BaseClass: RedisCluster,
	            modulesExecutor: RedisCluster.prototype.commandsExecutor,
	            modules: options?.modules,
	            functionsExecutor: RedisCluster.prototype.functionsExecutor,
	            functions: options?.functions,
	            scriptsExecutor: RedisCluster.prototype.scriptsExecutor,
	            scripts: options?.scripts
	        }))(options);
	    }
	    get slots() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").slots;
	    }
	    get shards() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").shards;
	    }
	    get masters() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").masters;
	    }
	    get replicas() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").replicas;
	    }
	    get nodeByAddress() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").nodeByAddress;
	    }
	    get pubSubNode() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").pubSubNode;
	    }
	    get isOpen() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").isOpen;
	    }
	    constructor(options) {
	        super();
	        _RedisCluster_instances.add(this);
	        _RedisCluster_options.set(this, void 0);
	        _RedisCluster_slots.set(this, void 0);
	        _RedisCluster_Multi.set(this, void 0);
	        Object.defineProperty(this, "multi", {
	            enumerable: true,
	            configurable: true,
	            writable: true,
	            value: this.MULTI
	        });
	        Object.defineProperty(this, "subscribe", {
	            enumerable: true,
	            configurable: true,
	            writable: true,
	            value: this.SUBSCRIBE
	        });
	        Object.defineProperty(this, "unsubscribe", {
	            enumerable: true,
	            configurable: true,
	            writable: true,
	            value: this.UNSUBSCRIBE
	        });
	        Object.defineProperty(this, "pSubscribe", {
	            enumerable: true,
	            configurable: true,
	            writable: true,
	            value: this.PSUBSCRIBE
	        });
	        Object.defineProperty(this, "pUnsubscribe", {
	            enumerable: true,
	            configurable: true,
	            writable: true,
	            value: this.PUNSUBSCRIBE
	        });
	        Object.defineProperty(this, "sSubscribe", {
	            enumerable: true,
	            configurable: true,
	            writable: true,
	            value: this.SSUBSCRIBE
	        });
	        Object.defineProperty(this, "sUnsubscribe", {
	            enumerable: true,
	            configurable: true,
	            writable: true,
	            value: this.SUNSUBSCRIBE
	        });
	        __classPrivateFieldSet(this, _RedisCluster_options, options, "f");
	        __classPrivateFieldSet(this, _RedisCluster_slots, new cluster_slots_1.default(options, this.emit.bind(this)), "f");
	        __classPrivateFieldSet(this, _RedisCluster_Multi, multi_command_1.default.extend(options), "f");
	    }
	    duplicate(overrides) {
	        return new (Object.getPrototypeOf(this).constructor)({
	            ...__classPrivateFieldGet(this, _RedisCluster_options, "f"),
	            ...overrides
	        });
	    }
	    connect() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").connect();
	    }
	    async commandsExecutor(command, args) {
	        const { jsArgs, args: redisArgs, options } = (0, commander_1.transformCommandArguments)(command, args);
	        return (0, commander_1.transformCommandReply)(command, await this.sendCommand(RedisCluster.extractFirstKey(command, jsArgs, redisArgs), command.IS_READ_ONLY, redisArgs, options), redisArgs.preserve);
	    }
	    async sendCommand(firstKey, isReadonly, args, options) {
	        return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, firstKey, isReadonly, client => client.sendCommand(args, options));
	    }
	    async functionsExecutor(fn, args, name) {
	        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(fn, args);
	        return (0, commander_1.transformCommandReply)(fn, await this.executeFunction(name, fn, args, redisArgs, options), redisArgs.preserve);
	    }
	    async executeFunction(name, fn, originalArgs, redisArgs, options) {
	        return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, RedisCluster.extractFirstKey(fn, originalArgs, redisArgs), fn.IS_READ_ONLY, client => client.executeFunction(name, fn, redisArgs, options));
	    }
	    async scriptsExecutor(script, args) {
	        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(script, args);
	        return (0, commander_1.transformCommandReply)(script, await this.executeScript(script, args, redisArgs, options), redisArgs.preserve);
	    }
	    async executeScript(script, originalArgs, redisArgs, options) {
	        return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, RedisCluster.extractFirstKey(script, originalArgs, redisArgs), script.IS_READ_ONLY, client => client.executeScript(script, redisArgs, options));
	    }
	    MULTI(routing) {
	        return new (__classPrivateFieldGet(this, _RedisCluster_Multi, "f"))((commands, firstKey, chainId) => {
	            return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, firstKey, false, client => client.multiExecutor(commands, undefined, chainId));
	        }, routing);
	    }
	    async SUBSCRIBE(channels, listener, bufferMode) {
	        return (await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getPubSubClient())
	            .SUBSCRIBE(channels, listener, bufferMode);
	    }
	    async UNSUBSCRIBE(channels, listener, bufferMode) {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").executeUnsubscribeCommand(client => client.UNSUBSCRIBE(channels, listener, bufferMode));
	    }
	    async PSUBSCRIBE(patterns, listener, bufferMode) {
	        return (await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getPubSubClient())
	            .PSUBSCRIBE(patterns, listener, bufferMode);
	    }
	    async PUNSUBSCRIBE(patterns, listener, bufferMode) {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").executeUnsubscribeCommand(client => client.PUNSUBSCRIBE(patterns, listener, bufferMode));
	    }
	    async SSUBSCRIBE(channels, listener, bufferMode) {
	        const maxCommandRedirections = __classPrivateFieldGet(this, _RedisCluster_options, "f").maxCommandRedirections ?? 16, firstChannel = Array.isArray(channels) ? channels[0] : channels;
	        let client = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getShardedPubSubClient(firstChannel);
	        for (let i = 0;; i++) {
	            try {
	                return await client.SSUBSCRIBE(channels, listener, bufferMode);
	            }
	            catch (err) {
	                if (++i > maxCommandRedirections || !(err instanceof errors_1.ErrorReply)) {
	                    throw err;
	                }
	                if (err.message.startsWith('MOVED')) {
	                    await __classPrivateFieldGet(this, _RedisCluster_slots, "f").rediscover(client);
	                    client = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getShardedPubSubClient(firstChannel);
	                    continue;
	                }
	                throw err;
	            }
	        }
	    }
	    SUNSUBSCRIBE(channels, listener, bufferMode) {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").executeShardedUnsubscribeCommand(Array.isArray(channels) ? channels[0] : channels, client => client.SUNSUBSCRIBE(channels, listener, bufferMode));
	    }
	    quit() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").quit();
	    }
	    disconnect() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").disconnect();
	    }
	    nodeClient(node) {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").nodeClient(node);
	    }
	    getRandomNode() {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").getRandomNode();
	    }
	    getSlotRandomNode(slot) {
	        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").getSlotRandomNode(slot);
	    }
	    /**
	     * @deprecated use `.masters` instead
	     */
	    getMasters() {
	        return this.masters;
	    }
	    /**
	     * @deprecated use `.slots[<SLOT>]` instead
	     */
	    getSlotMaster(slot) {
	        return this.slots[slot].master;
	    }
	}
	_RedisCluster_options = new WeakMap(), _RedisCluster_slots = new WeakMap(), _RedisCluster_Multi = new WeakMap(), _RedisCluster_instances = new WeakSet(), _RedisCluster_execute = async function _RedisCluster_execute(firstKey, isReadonly, executor) {
	    const maxCommandRedirections = __classPrivateFieldGet(this, _RedisCluster_options, "f").maxCommandRedirections ?? 16;
	    let client = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getClient(firstKey, isReadonly);
	    for (let i = 0;; i++) {
	        try {
	            return await executor(client);
	        }
	        catch (err) {
	            if (++i > maxCommandRedirections || !(err instanceof errors_1.ErrorReply)) {
	                throw err;
	            }
	            if (err.message.startsWith('ASK')) {
	                const address = err.message.substring(err.message.lastIndexOf(' ') + 1);
	                let redirectTo = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getMasterByAddress(address);
	                if (!redirectTo) {
	                    await __classPrivateFieldGet(this, _RedisCluster_slots, "f").rediscover(client);
	                    redirectTo = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getMasterByAddress(address);
	                }
	                if (!redirectTo) {
	                    throw new Error(`Cannot find node ${address}`);
	                }
	                await redirectTo.asking();
	                client = redirectTo;
	                continue;
	            }
	            else if (err.message.startsWith('MOVED')) {
	                await __classPrivateFieldGet(this, _RedisCluster_slots, "f").rediscover(client);
	                client = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getClient(firstKey, isReadonly);
	                continue;
	            }
	            throw err;
	        }
	    }
	};
	cluster.default = RedisCluster;
	(0, commander_1.attachCommands)({
	    BaseClass: RedisCluster,
	    commands: commands_1.default,
	    executor: RedisCluster.prototype.commandsExecutor
	});
	return cluster;
}

var luaScript = {};

Object.defineProperty(luaScript, "__esModule", { value: true });
luaScript.scriptSha1 = luaScript.defineScript = void 0;
const crypto_1 = require$$0;
function defineScript(script) {
    return {
        ...script,
        SHA1: scriptSha1(script.SCRIPT)
    };
}
luaScript.defineScript = defineScript;
function scriptSha1(script) {
    return (0, crypto_1.createHash)('sha1').update(script).digest('hex');
}
luaScript.scriptSha1 = scriptSha1;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RedisFlushModes = exports.GeoReplyWith = exports.defineScript = exports.createCluster = exports.commandOptions = exports.createClient = void 0;
	const client_1 = client;
	const cluster_1 = requireCluster();
	exports.createClient = client_1.default.create;
	exports.commandOptions = client_1.default.commandOptions;
	exports.createCluster = cluster_1.default.create;
	var lua_script_1 = luaScript;
	Object.defineProperty(exports, "defineScript", { enumerable: true, get: function () { return lua_script_1.defineScript; } });
	__exportStar(errors$2, exports);
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "GeoReplyWith", { enumerable: true, get: function () { return generic_transformers_1.GeoReplyWith; } });
	var FLUSHALL_1 = FLUSHALL$1;
	Object.defineProperty(exports, "RedisFlushModes", { enumerable: true, get: function () { return FLUSHALL_1.RedisFlushModes; } }); 
} (dist$5));

var dist$4 = {};

var commands$4 = {};

var bloom = {};

var ADD$6 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, item) {
	    return ['BF.ADD', key, item];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (ADD$6));

var CARD$1 = {};

Object.defineProperty(CARD$1, "__esModule", { value: true });
CARD$1.transformArguments = CARD$1.IS_READ_ONLY = CARD$1.FIRST_KEY_INDEX = void 0;
CARD$1.FIRST_KEY_INDEX = 1;
CARD$1.IS_READ_ONLY = true;
function transformArguments$15(key) {
    return ['BF.CARD', key];
}
CARD$1.transformArguments = transformArguments$15;

var EXISTS$2 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	exports.IS_READ_ONLY = true;
	function transformArguments(key, item) {
	    return ['BF.EXISTS', key, item];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (EXISTS$2));

var INFO$9 = {};

Object.defineProperty(INFO$9, "__esModule", { value: true });
INFO$9.transformReply = INFO$9.transformArguments = INFO$9.IS_READ_ONLY = INFO$9.FIRST_KEY_INDEX = void 0;
INFO$9.FIRST_KEY_INDEX = 1;
INFO$9.IS_READ_ONLY = true;
function transformArguments$14(key) {
    return ['BF.INFO', key];
}
INFO$9.transformArguments = transformArguments$14;
function transformReply$c(reply) {
    return {
        capacity: reply[1],
        size: reply[3],
        numberOfFilters: reply[5],
        numberOfInsertedItems: reply[7],
        expansionRate: reply[9]
    };
}
INFO$9.transformReply = transformReply$c;

var INSERT$2 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, items, options) {
	    const args = ['BF.INSERT', key];
	    if (options?.CAPACITY) {
	        args.push('CAPACITY', options.CAPACITY.toString());
	    }
	    if (options?.ERROR) {
	        args.push('ERROR', options.ERROR.toString());
	    }
	    if (options?.EXPANSION) {
	        args.push('EXPANSION', options.EXPANSION.toString());
	    }
	    if (options?.NOCREATE) {
	        args.push('NOCREATE');
	    }
	    if (options?.NONSCALING) {
	        args.push('NONSCALING');
	    }
	    args.push('ITEMS');
	    return (0, generic_transformers_1.pushVerdictArguments)(args, items);
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_2 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformBooleanArrayReply; } }); 
} (INSERT$2));

var LOADCHUNK$2 = {};

Object.defineProperty(LOADCHUNK$2, "__esModule", { value: true });
LOADCHUNK$2.transformArguments = LOADCHUNK$2.FIRST_KEY_INDEX = void 0;
LOADCHUNK$2.FIRST_KEY_INDEX = 1;
function transformArguments$13(key, iteretor, chunk) {
    return ['BF.LOADCHUNK', key, iteretor.toString(), chunk];
}
LOADCHUNK$2.transformArguments = transformArguments$13;

var MADD$2 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, items) {
	    return ['BF.MADD', key, ...items];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanArrayReply; } }); 
} (MADD$2));

var MEXISTS$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	exports.IS_READ_ONLY = true;
	function transformArguments(key, items) {
	    return ['BF.MEXISTS', key, ...items];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanArrayReply; } }); 
} (MEXISTS$1));

var RESERVE$4 = {};

Object.defineProperty(RESERVE$4, "__esModule", { value: true });
RESERVE$4.transformArguments = RESERVE$4.FIRST_KEY_INDEX = void 0;
RESERVE$4.FIRST_KEY_INDEX = 1;
function transformArguments$12(key, errorRate, capacity, options) {
    const args = ['BF.RESERVE', key, errorRate.toString(), capacity.toString()];
    if (options?.EXPANSION) {
        args.push('EXPANSION', options.EXPANSION.toString());
    }
    if (options?.NONSCALING) {
        args.push('NONSCALING');
    }
    return args;
}
RESERVE$4.transformArguments = transformArguments$12;

var SCANDUMP$2 = {};

Object.defineProperty(SCANDUMP$2, "__esModule", { value: true });
SCANDUMP$2.transformReply = SCANDUMP$2.transformArguments = SCANDUMP$2.IS_READ_ONLY = SCANDUMP$2.FIRST_KEY_INDEX = void 0;
SCANDUMP$2.FIRST_KEY_INDEX = 1;
SCANDUMP$2.IS_READ_ONLY = true;
function transformArguments$11(key, iterator) {
    return ['BF.SCANDUMP', key, iterator.toString()];
}
SCANDUMP$2.transformArguments = transformArguments$11;
function transformReply$b([iterator, chunk]) {
    return {
        iterator,
        chunk
    };
}
SCANDUMP$2.transformReply = transformReply$b;

Object.defineProperty(bloom, "__esModule", { value: true });
const ADD$5 = ADD$6;
const CARD = CARD$1;
const EXISTS$1 = EXISTS$2;
const INFO$8 = INFO$9;
const INSERT$1 = INSERT$2;
const LOADCHUNK$1 = LOADCHUNK$2;
const MADD$1 = MADD$2;
const MEXISTS = MEXISTS$1;
const RESERVE$3 = RESERVE$4;
const SCANDUMP$1 = SCANDUMP$2;
bloom.default = {
    ADD: ADD$5,
    add: ADD$5,
    CARD,
    card: CARD,
    EXISTS: EXISTS$1,
    exists: EXISTS$1,
    INFO: INFO$8,
    info: INFO$8,
    INSERT: INSERT$1,
    insert: INSERT$1,
    LOADCHUNK: LOADCHUNK$1,
    loadChunk: LOADCHUNK$1,
    MADD: MADD$1,
    mAdd: MADD$1,
    MEXISTS,
    mExists: MEXISTS,
    RESERVE: RESERVE$3,
    reserve: RESERVE$3,
    SCANDUMP: SCANDUMP$1,
    scanDump: SCANDUMP$1
};

var countMinSketch = {};

var INCRBY$4 = {};

Object.defineProperty(INCRBY$4, "__esModule", { value: true });
INCRBY$4.transformArguments = INCRBY$4.FIRST_KEY_INDEX = void 0;
INCRBY$4.FIRST_KEY_INDEX = 1;
function transformArguments$10(key, items) {
    const args = ['CMS.INCRBY', key];
    if (Array.isArray(items)) {
        for (const item of items) {
            pushIncrByItem$1(args, item);
        }
    }
    else {
        pushIncrByItem$1(args, items);
    }
    return args;
}
INCRBY$4.transformArguments = transformArguments$10;
function pushIncrByItem$1(args, { item, incrementBy }) {
    args.push(item, incrementBy.toString());
}

var INFO$7 = {};

Object.defineProperty(INFO$7, "__esModule", { value: true });
INFO$7.transformReply = INFO$7.transformArguments = INFO$7.IS_READ_ONLY = INFO$7.FIRST_KEY_INDEX = void 0;
INFO$7.FIRST_KEY_INDEX = 1;
INFO$7.IS_READ_ONLY = true;
function transformArguments$$(key) {
    return ['CMS.INFO', key];
}
INFO$7.transformArguments = transformArguments$$;
function transformReply$a(reply) {
    return {
        width: reply[1],
        depth: reply[3],
        count: reply[5]
    };
}
INFO$7.transformReply = transformReply$a;

var INITBYDIM$1 = {};

Object.defineProperty(INITBYDIM$1, "__esModule", { value: true });
INITBYDIM$1.transformArguments = INITBYDIM$1.FIRST_KEY_INDEX = void 0;
INITBYDIM$1.FIRST_KEY_INDEX = 1;
function transformArguments$_(key, width, depth) {
    return ['CMS.INITBYDIM', key, width.toString(), depth.toString()];
}
INITBYDIM$1.transformArguments = transformArguments$_;

var INITBYPROB$1 = {};

Object.defineProperty(INITBYPROB$1, "__esModule", { value: true });
INITBYPROB$1.transformArguments = INITBYPROB$1.FIRST_KEY_INDEX = void 0;
INITBYPROB$1.FIRST_KEY_INDEX = 1;
function transformArguments$Z(key, error, probability) {
    return ['CMS.INITBYPROB', key, error.toString(), probability.toString()];
}
INITBYPROB$1.transformArguments = transformArguments$Z;

var MERGE$3 = {};

Object.defineProperty(MERGE$3, "__esModule", { value: true });
MERGE$3.transformArguments = MERGE$3.FIRST_KEY_INDEX = void 0;
MERGE$3.FIRST_KEY_INDEX = 1;
function transformArguments$Y(dest, src) {
    const args = [
        'CMS.MERGE',
        dest,
        src.length.toString()
    ];
    if (isStringSketches(src)) {
        args.push(...src);
    }
    else {
        for (const sketch of src) {
            args.push(sketch.name);
        }
        args.push('WEIGHTS');
        for (const sketch of src) {
            args.push(sketch.weight.toString());
        }
    }
    return args;
}
MERGE$3.transformArguments = transformArguments$Y;
function isStringSketches(src) {
    return typeof src[0] === 'string';
}

var QUERY$4 = {};

Object.defineProperty(QUERY$4, "__esModule", { value: true });
QUERY$4.transformArguments = QUERY$4.IS_READ_ONLY = QUERY$4.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$8 = genericTransformers;
QUERY$4.FIRST_KEY_INDEX = 1;
QUERY$4.IS_READ_ONLY = true;
function transformArguments$X(key, items) {
    return (0, generic_transformers_1$8.pushVerdictArguments)(['CMS.QUERY', key], items);
}
QUERY$4.transformArguments = transformArguments$X;

Object.defineProperty(countMinSketch, "__esModule", { value: true });
const INCRBY$3 = INCRBY$4;
const INFO$6 = INFO$7;
const INITBYDIM = INITBYDIM$1;
const INITBYPROB = INITBYPROB$1;
const MERGE$2 = MERGE$3;
const QUERY$3 = QUERY$4;
countMinSketch.default = {
    INCRBY: INCRBY$3,
    incrBy: INCRBY$3,
    INFO: INFO$6,
    info: INFO$6,
    INITBYDIM,
    initByDim: INITBYDIM,
    INITBYPROB,
    initByProb: INITBYPROB,
    MERGE: MERGE$2,
    merge: MERGE$2,
    QUERY: QUERY$3,
    query: QUERY$3
};

var cuckoo = {};

var ADD$4 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, item) {
	    return ['CF.ADD', key, item];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (ADD$4));

var ADDNX = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, item) {
	    return ['CF.ADDNX', key, item];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (ADDNX));

var COUNT$2 = {};

Object.defineProperty(COUNT$2, "__esModule", { value: true });
COUNT$2.transformArguments = COUNT$2.FIRST_KEY_INDEX = void 0;
COUNT$2.FIRST_KEY_INDEX = 1;
function transformArguments$W(key, item) {
    return ['CF.COUNT', key, item];
}
COUNT$2.transformArguments = transformArguments$W;

var DEL$2 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	function transformArguments(key, item) {
	    return ['CF.DEL', key, item];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (DEL$2));

var EXISTS = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
	exports.FIRST_KEY_INDEX = 1;
	exports.IS_READ_ONLY = true;
	function transformArguments(key, item) {
	    return ['CF.EXISTS', key, item];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (EXISTS));

var INFO$5 = {};

Object.defineProperty(INFO$5, "__esModule", { value: true });
INFO$5.transformReply = INFO$5.transformArguments = INFO$5.IS_READ_ONLY = INFO$5.FIRST_KEY_INDEX = void 0;
INFO$5.FIRST_KEY_INDEX = 1;
INFO$5.IS_READ_ONLY = true;
function transformArguments$V(key) {
    return ['CF.INFO', key];
}
INFO$5.transformArguments = transformArguments$V;
function transformReply$9(reply) {
    return {
        size: reply[1],
        numberOfBuckets: reply[3],
        numberOfFilters: reply[5],
        numberOfInsertedItems: reply[7],
        numberOfDeletedItems: reply[9],
        bucketSize: reply[11],
        expansionRate: reply[13],
        maxIteration: reply[15]
    };
}
INFO$5.transformReply = transformReply$9;

var INSERT = {};

var hasRequiredINSERT;

function requireINSERT () {
	if (hasRequiredINSERT) return INSERT;
	hasRequiredINSERT = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
		const _1 = requireCuckoo();
		exports.FIRST_KEY_INDEX = 1;
		function transformArguments(key, items, options) {
		    return (0, _1.pushInsertOptions)(['CF.INSERT', key], items, options);
		}
		exports.transformArguments = transformArguments;
		var generic_transformers_1 = genericTransformers;
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanArrayReply; } }); 
	} (INSERT));
	return INSERT;
}

var INSERTNX = {};

var hasRequiredINSERTNX;

function requireINSERTNX () {
	if (hasRequiredINSERTNX) return INSERTNX;
	hasRequiredINSERTNX = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
		const _1 = requireCuckoo();
		exports.FIRST_KEY_INDEX = 1;
		function transformArguments(key, items, options) {
		    return (0, _1.pushInsertOptions)(['CF.INSERTNX', key], items, options);
		}
		exports.transformArguments = transformArguments;
		var generic_transformers_1 = genericTransformers;
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanArrayReply; } }); 
	} (INSERTNX));
	return INSERTNX;
}

var LOADCHUNK = {};

Object.defineProperty(LOADCHUNK, "__esModule", { value: true });
LOADCHUNK.transformArguments = LOADCHUNK.FIRST_KEY_INDEX = void 0;
LOADCHUNK.FIRST_KEY_INDEX = 1;
function transformArguments$U(key, iterator, chunk) {
    return ['CF.LOADCHUNK', key, iterator.toString(), chunk];
}
LOADCHUNK.transformArguments = transformArguments$U;

var RESERVE$2 = {};

Object.defineProperty(RESERVE$2, "__esModule", { value: true });
RESERVE$2.transformArguments = RESERVE$2.FIRST_KEY_INDEX = void 0;
RESERVE$2.FIRST_KEY_INDEX = 1;
function transformArguments$T(key, capacity, options) {
    const args = ['CF.RESERVE', key, capacity.toString()];
    if (options?.BUCKETSIZE) {
        args.push('BUCKETSIZE', options.BUCKETSIZE.toString());
    }
    if (options?.MAXITERATIONS) {
        args.push('MAXITERATIONS', options.MAXITERATIONS.toString());
    }
    if (options?.EXPANSION) {
        args.push('EXPANSION', options.EXPANSION.toString());
    }
    return args;
}
RESERVE$2.transformArguments = transformArguments$T;

var SCANDUMP = {};

Object.defineProperty(SCANDUMP, "__esModule", { value: true });
SCANDUMP.transformReply = SCANDUMP.transformArguments = SCANDUMP.FIRST_KEY_INDEX = void 0;
SCANDUMP.FIRST_KEY_INDEX = 1;
function transformArguments$S(key, iterator) {
    return ['CF.SCANDUMP', key, iterator.toString()];
}
SCANDUMP.transformArguments = transformArguments$S;
function transformReply$8([iterator, chunk]) {
    return {
        iterator,
        chunk
    };
}
SCANDUMP.transformReply = transformReply$8;

var hasRequiredCuckoo;

function requireCuckoo () {
	if (hasRequiredCuckoo) return cuckoo;
	hasRequiredCuckoo = 1;
	Object.defineProperty(cuckoo, "__esModule", { value: true });
	cuckoo.pushInsertOptions = void 0;
	const ADD = ADD$4;
	const ADDNX$1 = ADDNX;
	const COUNT = COUNT$2;
	const DEL = DEL$2;
	const EXISTS$1 = EXISTS;
	const INFO = INFO$5;
	const INSERT = requireINSERT();
	const INSERTNX = requireINSERTNX();
	const LOADCHUNK$1 = LOADCHUNK;
	const RESERVE = RESERVE$2;
	const SCANDUMP$1 = SCANDUMP;
	const generic_transformers_1 = genericTransformers;
	cuckoo.default = {
	    ADD,
	    add: ADD,
	    ADDNX: ADDNX$1,
	    addNX: ADDNX$1,
	    COUNT,
	    count: COUNT,
	    DEL,
	    del: DEL,
	    EXISTS: EXISTS$1,
	    exists: EXISTS$1,
	    INFO,
	    info: INFO,
	    INSERT,
	    insert: INSERT,
	    INSERTNX,
	    insertNX: INSERTNX,
	    LOADCHUNK: LOADCHUNK$1,
	    loadChunk: LOADCHUNK$1,
	    RESERVE,
	    reserve: RESERVE,
	    SCANDUMP: SCANDUMP$1,
	    scanDump: SCANDUMP$1
	};
	function pushInsertOptions(args, items, options) {
	    if (options?.CAPACITY) {
	        args.push('CAPACITY');
	        args.push(options.CAPACITY.toString());
	    }
	    if (options?.NOCREATE) {
	        args.push('NOCREATE');
	    }
	    args.push('ITEMS');
	    return (0, generic_transformers_1.pushVerdictArguments)(args, items);
	}
	cuckoo.pushInsertOptions = pushInsertOptions;
	return cuckoo;
}

var tDigest = {};

var ADD$3 = {};

Object.defineProperty(ADD$3, "__esModule", { value: true });
ADD$3.transformArguments = ADD$3.FIRST_KEY_INDEX = void 0;
ADD$3.FIRST_KEY_INDEX = 1;
function transformArguments$R(key, values) {
    const args = ['TDIGEST.ADD', key];
    for (const item of values) {
        args.push(item.toString());
    }
    return args;
}
ADD$3.transformArguments = transformArguments$R;

var BYRANK = {};

var hasRequiredBYRANK;

function requireBYRANK () {
	if (hasRequiredBYRANK) return BYRANK;
	hasRequiredBYRANK = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		exports.FIRST_KEY_INDEX = 1;
		exports.IS_READ_ONLY = true;
		function transformArguments(key, ranks) {
		    const args = ['TDIGEST.BYRANK', key];
		    for (const rank of ranks) {
		        args.push(rank.toString());
		    }
		    return args;
		}
		exports.transformArguments = transformArguments;
		var _1 = requireTDigest();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _1.transformDoublesReply; } }); 
	} (BYRANK));
	return BYRANK;
}

var BYREVRANK = {};

var hasRequiredBYREVRANK;

function requireBYREVRANK () {
	if (hasRequiredBYREVRANK) return BYREVRANK;
	hasRequiredBYREVRANK = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		exports.FIRST_KEY_INDEX = 1;
		exports.IS_READ_ONLY = true;
		function transformArguments(key, ranks) {
		    const args = ['TDIGEST.BYREVRANK', key];
		    for (const rank of ranks) {
		        args.push(rank.toString());
		    }
		    return args;
		}
		exports.transformArguments = transformArguments;
		var _1 = requireTDigest();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _1.transformDoublesReply; } }); 
	} (BYREVRANK));
	return BYREVRANK;
}

var CDF = {};

var hasRequiredCDF;

function requireCDF () {
	if (hasRequiredCDF) return CDF;
	hasRequiredCDF = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		exports.FIRST_KEY_INDEX = 1;
		exports.IS_READ_ONLY = true;
		function transformArguments(key, values) {
		    const args = ['TDIGEST.CDF', key];
		    for (const item of values) {
		        args.push(item.toString());
		    }
		    return args;
		}
		exports.transformArguments = transformArguments;
		var _1 = requireTDigest();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _1.transformDoublesReply; } }); 
	} (CDF));
	return CDF;
}

var CREATE$2 = {};

var hasRequiredCREATE$2;

function requireCREATE$2 () {
	if (hasRequiredCREATE$2) return CREATE$2;
	hasRequiredCREATE$2 = 1;
	Object.defineProperty(CREATE$2, "__esModule", { value: true });
	CREATE$2.transformArguments = CREATE$2.FIRST_KEY_INDEX = void 0;
	const _1 = requireTDigest();
	CREATE$2.FIRST_KEY_INDEX = 1;
	function transformArguments(key, options) {
	    return (0, _1.pushCompressionArgument)(['TDIGEST.CREATE', key], options);
	}
	CREATE$2.transformArguments = transformArguments;
	return CREATE$2;
}

var INFO$4 = {};

Object.defineProperty(INFO$4, "__esModule", { value: true });
INFO$4.transformReply = INFO$4.transformArguments = INFO$4.IS_READ_ONLY = INFO$4.FIRST_KEY_INDEX = void 0;
INFO$4.FIRST_KEY_INDEX = 1;
INFO$4.IS_READ_ONLY = true;
function transformArguments$Q(key) {
    return [
        'TDIGEST.INFO',
        key
    ];
}
INFO$4.transformArguments = transformArguments$Q;
function transformReply$7(reply) {
    return {
        comperssion: reply[1],
        capacity: reply[3],
        mergedNodes: reply[5],
        unmergedNodes: reply[7],
        mergedWeight: Number(reply[9]),
        unmergedWeight: Number(reply[11]),
        totalCompression: reply[13]
    };
}
INFO$4.transformReply = transformReply$7;

var MAX = {};

var hasRequiredMAX;

function requireMAX () {
	if (hasRequiredMAX) return MAX;
	hasRequiredMAX = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		exports.FIRST_KEY_INDEX = 1;
		exports.IS_READ_ONLY = true;
		function transformArguments(key) {
		    return [
		        'TDIGEST.MAX',
		        key
		    ];
		}
		exports.transformArguments = transformArguments;
		var _1 = requireTDigest();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _1.transformDoubleReply; } }); 
	} (MAX));
	return MAX;
}

var MERGE$1 = {};

var hasRequiredMERGE$1;

function requireMERGE$1 () {
	if (hasRequiredMERGE$1) return MERGE$1;
	hasRequiredMERGE$1 = 1;
	Object.defineProperty(MERGE$1, "__esModule", { value: true });
	MERGE$1.transformArguments = MERGE$1.FIRST_KEY_INDEX = void 0;
	const generic_transformers_1 = genericTransformers;
	const _1 = requireTDigest();
	MERGE$1.FIRST_KEY_INDEX = 1;
	function transformArguments(destKey, srcKeys, options) {
	    const args = (0, generic_transformers_1.pushVerdictArgument)(['TDIGEST.MERGE', destKey], srcKeys);
	    (0, _1.pushCompressionArgument)(args, options);
	    if (options?.OVERRIDE) {
	        args.push('OVERRIDE');
	    }
	    return args;
	}
	MERGE$1.transformArguments = transformArguments;
	return MERGE$1;
}

var MIN = {};

var hasRequiredMIN;

function requireMIN () {
	if (hasRequiredMIN) return MIN;
	hasRequiredMIN = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		exports.FIRST_KEY_INDEX = 1;
		exports.IS_READ_ONLY = true;
		function transformArguments(key) {
		    return [
		        'TDIGEST.MIN',
		        key
		    ];
		}
		exports.transformArguments = transformArguments;
		var _1 = requireTDigest();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _1.transformDoubleReply; } }); 
	} (MIN));
	return MIN;
}

var QUANTILE = {};

var hasRequiredQUANTILE;

function requireQUANTILE () {
	if (hasRequiredQUANTILE) return QUANTILE;
	hasRequiredQUANTILE = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		exports.FIRST_KEY_INDEX = 1;
		exports.IS_READ_ONLY = true;
		function transformArguments(key, quantiles) {
		    const args = [
		        'TDIGEST.QUANTILE',
		        key
		    ];
		    for (const quantile of quantiles) {
		        args.push(quantile.toString());
		    }
		    return args;
		}
		exports.transformArguments = transformArguments;
		var _1 = requireTDigest();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _1.transformDoublesReply; } }); 
	} (QUANTILE));
	return QUANTILE;
}

var RANK = {};

Object.defineProperty(RANK, "__esModule", { value: true });
RANK.transformArguments = RANK.IS_READ_ONLY = RANK.FIRST_KEY_INDEX = void 0;
RANK.FIRST_KEY_INDEX = 1;
RANK.IS_READ_ONLY = true;
function transformArguments$P(key, values) {
    const args = ['TDIGEST.RANK', key];
    for (const item of values) {
        args.push(item.toString());
    }
    return args;
}
RANK.transformArguments = transformArguments$P;

var RESET = {};

Object.defineProperty(RESET, "__esModule", { value: true });
RESET.transformArguments = RESET.FIRST_KEY_INDEX = void 0;
RESET.FIRST_KEY_INDEX = 1;
function transformArguments$O(key) {
    return ['TDIGEST.RESET', key];
}
RESET.transformArguments = transformArguments$O;

var REVRANK = {};

Object.defineProperty(REVRANK, "__esModule", { value: true });
REVRANK.transformArguments = REVRANK.IS_READ_ONLY = REVRANK.FIRST_KEY_INDEX = void 0;
REVRANK.FIRST_KEY_INDEX = 1;
REVRANK.IS_READ_ONLY = true;
function transformArguments$N(key, values) {
    const args = ['TDIGEST.REVRANK', key];
    for (const item of values) {
        args.push(item.toString());
    }
    return args;
}
REVRANK.transformArguments = transformArguments$N;

var TRIMMED_MEAN = {};

var hasRequiredTRIMMED_MEAN;

function requireTRIMMED_MEAN () {
	if (hasRequiredTRIMMED_MEAN) return TRIMMED_MEAN;
	hasRequiredTRIMMED_MEAN = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		exports.FIRST_KEY_INDEX = 1;
		exports.IS_READ_ONLY = true;
		function transformArguments(key, lowCutPercentile, highCutPercentile) {
		    return [
		        'TDIGEST.TRIMMED_MEAN',
		        key,
		        lowCutPercentile.toString(),
		        highCutPercentile.toString()
		    ];
		}
		exports.transformArguments = transformArguments;
		var _1 = requireTDigest();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _1.transformDoubleReply; } }); 
	} (TRIMMED_MEAN));
	return TRIMMED_MEAN;
}

var hasRequiredTDigest;

function requireTDigest () {
	if (hasRequiredTDigest) return tDigest;
	hasRequiredTDigest = 1;
	Object.defineProperty(tDigest, "__esModule", { value: true });
	tDigest.transformDoublesReply = tDigest.transformDoubleReply = tDigest.pushCompressionArgument = void 0;
	const ADD = ADD$3;
	const BYRANK = requireBYRANK();
	const BYREVRANK = requireBYREVRANK();
	const CDF = requireCDF();
	const CREATE = requireCREATE$2();
	const INFO = INFO$4;
	const MAX = requireMAX();
	const MERGE = requireMERGE$1();
	const MIN = requireMIN();
	const QUANTILE = requireQUANTILE();
	const RANK$1 = RANK;
	const RESET$1 = RESET;
	const REVRANK$1 = REVRANK;
	const TRIMMED_MEAN = requireTRIMMED_MEAN();
	tDigest.default = {
	    ADD,
	    add: ADD,
	    BYRANK,
	    byRank: BYRANK,
	    BYREVRANK,
	    byRevRank: BYREVRANK,
	    CDF,
	    cdf: CDF,
	    CREATE,
	    create: CREATE,
	    INFO,
	    info: INFO,
	    MAX,
	    max: MAX,
	    MERGE,
	    merge: MERGE,
	    MIN,
	    min: MIN,
	    QUANTILE,
	    quantile: QUANTILE,
	    RANK: RANK$1,
	    rank: RANK$1,
	    RESET: RESET$1,
	    reset: RESET$1,
	    REVRANK: REVRANK$1,
	    revRank: REVRANK$1,
	    TRIMMED_MEAN,
	    trimmedMean: TRIMMED_MEAN
	};
	function pushCompressionArgument(args, options) {
	    if (options?.COMPRESSION) {
	        args.push('COMPRESSION', options.COMPRESSION.toString());
	    }
	    return args;
	}
	tDigest.pushCompressionArgument = pushCompressionArgument;
	function transformDoubleReply(reply) {
	    switch (reply) {
	        case 'inf':
	            return Infinity;
	        case '-inf':
	            return -Infinity;
	        case 'nan':
	            return NaN;
	        default:
	            return parseFloat(reply);
	    }
	}
	tDigest.transformDoubleReply = transformDoubleReply;
	function transformDoublesReply(reply) {
	    return reply.map(transformDoubleReply);
	}
	tDigest.transformDoublesReply = transformDoublesReply;
	return tDigest;
}

var topK = {};

var ADD$2 = {};

Object.defineProperty(ADD$2, "__esModule", { value: true });
ADD$2.transformArguments = ADD$2.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$7 = genericTransformers;
ADD$2.FIRST_KEY_INDEX = 1;
function transformArguments$M(key, items) {
    return (0, generic_transformers_1$7.pushVerdictArguments)(['TOPK.ADD', key], items);
}
ADD$2.transformArguments = transformArguments$M;

var COUNT$1 = {};

Object.defineProperty(COUNT$1, "__esModule", { value: true });
COUNT$1.transformArguments = COUNT$1.IS_READ_ONLY = COUNT$1.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$6 = genericTransformers;
COUNT$1.FIRST_KEY_INDEX = 1;
COUNT$1.IS_READ_ONLY = true;
function transformArguments$L(key, items) {
    return (0, generic_transformers_1$6.pushVerdictArguments)(['TOPK.COUNT', key], items);
}
COUNT$1.transformArguments = transformArguments$L;

var INCRBY$2 = {};

Object.defineProperty(INCRBY$2, "__esModule", { value: true });
INCRBY$2.transformArguments = INCRBY$2.FIRST_KEY_INDEX = void 0;
INCRBY$2.FIRST_KEY_INDEX = 1;
function transformArguments$K(key, items) {
    const args = ['TOPK.INCRBY', key];
    if (Array.isArray(items)) {
        for (const item of items) {
            pushIncrByItem(args, item);
        }
    }
    else {
        pushIncrByItem(args, items);
    }
    return args;
}
INCRBY$2.transformArguments = transformArguments$K;
function pushIncrByItem(args, { item, incrementBy }) {
    args.push(item, incrementBy.toString());
}

var INFO$3 = {};

Object.defineProperty(INFO$3, "__esModule", { value: true });
INFO$3.transformReply = INFO$3.transformArguments = INFO$3.IS_READ_ONLY = INFO$3.FIRST_KEY_INDEX = void 0;
INFO$3.FIRST_KEY_INDEX = 1;
INFO$3.IS_READ_ONLY = true;
function transformArguments$J(key) {
    return ['TOPK.INFO', key];
}
INFO$3.transformArguments = transformArguments$J;
function transformReply$6(reply) {
    return {
        k: reply[1],
        width: reply[3],
        depth: reply[5],
        decay: Number(reply[7])
    };
}
INFO$3.transformReply = transformReply$6;

var LIST_WITHCOUNT$1 = {};

Object.defineProperty(LIST_WITHCOUNT$1, "__esModule", { value: true });
LIST_WITHCOUNT$1.transformReply = LIST_WITHCOUNT$1.transformArguments = LIST_WITHCOUNT$1.IS_READ_ONLY = LIST_WITHCOUNT$1.FIRST_KEY_INDEX = void 0;
LIST_WITHCOUNT$1.FIRST_KEY_INDEX = 1;
LIST_WITHCOUNT$1.IS_READ_ONLY = true;
function transformArguments$I(key) {
    return ['TOPK.LIST', key, 'WITHCOUNT'];
}
LIST_WITHCOUNT$1.transformArguments = transformArguments$I;
function transformReply$5(rawReply) {
    const reply = [];
    for (let i = 0; i < rawReply.length; i++) {
        reply.push({
            item: rawReply[i],
            count: rawReply[++i]
        });
    }
    return reply;
}
LIST_WITHCOUNT$1.transformReply = transformReply$5;

var LIST$2 = {};

Object.defineProperty(LIST$2, "__esModule", { value: true });
LIST$2.transformArguments = LIST$2.IS_READ_ONLY = LIST$2.FIRST_KEY_INDEX = void 0;
LIST$2.FIRST_KEY_INDEX = 1;
LIST$2.IS_READ_ONLY = true;
function transformArguments$H(key) {
    return ['TOPK.LIST', key];
}
LIST$2.transformArguments = transformArguments$H;

var QUERY$2 = {};

Object.defineProperty(QUERY$2, "__esModule", { value: true });
QUERY$2.transformArguments = QUERY$2.IS_READ_ONLY = QUERY$2.FIRST_KEY_INDEX = void 0;
const generic_transformers_1$5 = genericTransformers;
QUERY$2.FIRST_KEY_INDEX = 1;
QUERY$2.IS_READ_ONLY = true;
function transformArguments$G(key, items) {
    return (0, generic_transformers_1$5.pushVerdictArguments)(['TOPK.QUERY', key], items);
}
QUERY$2.transformArguments = transformArguments$G;

var RESERVE$1 = {};

Object.defineProperty(RESERVE$1, "__esModule", { value: true });
RESERVE$1.transformArguments = RESERVE$1.IS_READ_ONLY = RESERVE$1.FIRST_KEY_INDEX = void 0;
RESERVE$1.FIRST_KEY_INDEX = 1;
RESERVE$1.IS_READ_ONLY = true;
function transformArguments$F(key, topK, options) {
    const args = ['TOPK.RESERVE', key, topK.toString()];
    if (options) {
        args.push(options.width.toString(), options.depth.toString(), options.decay.toString());
    }
    return args;
}
RESERVE$1.transformArguments = transformArguments$F;

Object.defineProperty(topK, "__esModule", { value: true });
const ADD$1 = ADD$2;
const COUNT = COUNT$1;
const INCRBY$1 = INCRBY$2;
const INFO$2 = INFO$3;
const LIST_WITHCOUNT = LIST_WITHCOUNT$1;
const LIST$1 = LIST$2;
const QUERY$1 = QUERY$2;
const RESERVE = RESERVE$1;
topK.default = {
    ADD: ADD$1,
    add: ADD$1,
    COUNT,
    count: COUNT,
    INCRBY: INCRBY$1,
    incrBy: INCRBY$1,
    INFO: INFO$2,
    info: INFO$2,
    LIST_WITHCOUNT,
    listWithCount: LIST_WITHCOUNT,
    LIST: LIST$1,
    list: LIST$1,
    QUERY: QUERY$1,
    query: QUERY$1,
    RESERVE,
    reserve: RESERVE
};

Object.defineProperty(commands$4, "__esModule", { value: true });
const bloom_1 = bloom;
const count_min_sketch_1 = countMinSketch;
const cuckoo_1 = requireCuckoo();
const t_digest_1 = requireTDigest();
const top_k_1 = topK;
commands$4.default = {
    bf: bloom_1.default,
    cms: count_min_sketch_1.default,
    cf: cuckoo_1.default,
    tDigest: t_digest_1.default,
    topK: top_k_1.default
};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var commands_1 = commands$4;
	Object.defineProperty(exports, "default", { enumerable: true, get: function () { return commands_1.default; } }); 
} (dist$4));

var dist$3 = {};

var commands$3 = {};

var CONFIG_GET$1 = {};

Object.defineProperty(CONFIG_GET$1, "__esModule", { value: true });
CONFIG_GET$1.transformArguments = CONFIG_GET$1.IS_READ_ONLY = void 0;
CONFIG_GET$1.IS_READ_ONLY = true;
function transformArguments$E(configKey) {
    return ['GRAPH.CONFIG', 'GET', configKey];
}
CONFIG_GET$1.transformArguments = transformArguments$E;

var CONFIG_SET$1 = {};

Object.defineProperty(CONFIG_SET$1, "__esModule", { value: true });
CONFIG_SET$1.transformArguments = void 0;
function transformArguments$D(configKey, value) {
    return [
        'GRAPH.CONFIG',
        'SET',
        configKey,
        value.toString()
    ];
}
CONFIG_SET$1.transformArguments = transformArguments$D;

var DELETE = {};

Object.defineProperty(DELETE, "__esModule", { value: true });
DELETE.transformArguments = DELETE.FIRST_KEY_INDEX = void 0;
DELETE.FIRST_KEY_INDEX = 1;
function transformArguments$C(key) {
    return ['GRAPH.DELETE', key];
}
DELETE.transformArguments = transformArguments$C;

var EXPLAIN$1 = {};

Object.defineProperty(EXPLAIN$1, "__esModule", { value: true });
EXPLAIN$1.transformArguments = EXPLAIN$1.IS_READ_ONLY = EXPLAIN$1.FIRST_KEY_INDEX = void 0;
EXPLAIN$1.FIRST_KEY_INDEX = 1;
EXPLAIN$1.IS_READ_ONLY = true;
function transformArguments$B(key, query) {
    return ['GRAPH.EXPLAIN', key, query];
}
EXPLAIN$1.transformArguments = transformArguments$B;

var LIST = {};

Object.defineProperty(LIST, "__esModule", { value: true });
LIST.transformArguments = LIST.IS_READ_ONLY = void 0;
LIST.IS_READ_ONLY = true;
function transformArguments$A() {
    return ['GRAPH.LIST'];
}
LIST.transformArguments = transformArguments$A;

var PROFILE = {};

Object.defineProperty(PROFILE, "__esModule", { value: true });
PROFILE.transformArguments = PROFILE.IS_READ_ONLY = PROFILE.FIRST_KEY_INDEX = void 0;
PROFILE.FIRST_KEY_INDEX = 1;
PROFILE.IS_READ_ONLY = true;
function transformArguments$z(key, query) {
    return ['GRAPH.PROFILE', key, query];
}
PROFILE.transformArguments = transformArguments$z;

var QUERY = {};

var hasRequiredQUERY;

function requireQUERY () {
	if (hasRequiredQUERY) return QUERY;
	hasRequiredQUERY = 1;
	Object.defineProperty(QUERY, "__esModule", { value: true });
	QUERY.transformReply = QUERY.transformArguments = QUERY.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$3();
	QUERY.FIRST_KEY_INDEX = 1;
	function transformArguments(graph, query, options, compact) {
	    return (0, _1.pushQueryArguments)(['GRAPH.QUERY'], graph, query, options, compact);
	}
	QUERY.transformArguments = transformArguments;
	function transformReply(reply) {
	    return reply.length === 1 ? {
	        headers: undefined,
	        data: undefined,
	        metadata: reply[0]
	    } : {
	        headers: reply[0],
	        data: reply[1],
	        metadata: reply[2]
	    };
	}
	QUERY.transformReply = transformReply;
	return QUERY;
}

var RO_QUERY = {};

var hasRequiredRO_QUERY;

function requireRO_QUERY () {
	if (hasRequiredRO_QUERY) return RO_QUERY;
	hasRequiredRO_QUERY = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		const _1 = requireCommands$3();
		var QUERY_1 = requireQUERY();
		Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return QUERY_1.FIRST_KEY_INDEX; } });
		exports.IS_READ_ONLY = true;
		function transformArguments(graph, query, options, compact) {
		    return (0, _1.pushQueryArguments)(['GRAPH.RO_QUERY'], graph, query, options, compact);
		}
		exports.transformArguments = transformArguments;
		var QUERY_2 = requireQUERY();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return QUERY_2.transformReply; } }); 
	} (RO_QUERY));
	return RO_QUERY;
}

var SLOWLOG = {};

Object.defineProperty(SLOWLOG, "__esModule", { value: true });
SLOWLOG.transformReply = SLOWLOG.transformArguments = SLOWLOG.FIRST_KEY_INDEX = SLOWLOG.IS_READ_ONLY = void 0;
SLOWLOG.IS_READ_ONLY = true;
SLOWLOG.FIRST_KEY_INDEX = 1;
function transformArguments$y(key) {
    return ['GRAPH.SLOWLOG', key];
}
SLOWLOG.transformArguments = transformArguments$y;
function transformReply$4(logs) {
    return logs.map(([timestamp, command, query, took]) => ({
        timestamp: new Date(Number(timestamp) * 1000),
        command,
        query,
        took: Number(took)
    }));
}
SLOWLOG.transformReply = transformReply$4;

var hasRequiredCommands$3;

function requireCommands$3 () {
	if (hasRequiredCommands$3) return commands$3;
	hasRequiredCommands$3 = 1;
	Object.defineProperty(commands$3, "__esModule", { value: true });
	commands$3.pushQueryArguments = void 0;
	const CONFIG_GET = CONFIG_GET$1;
	const CONFIG_SET = CONFIG_SET$1;
	const DELETE$1 = DELETE;
	const EXPLAIN = EXPLAIN$1;
	const LIST$1 = LIST;
	const PROFILE$1 = PROFILE;
	const QUERY = requireQUERY();
	const RO_QUERY = requireRO_QUERY();
	const SLOWLOG$1 = SLOWLOG;
	commands$3.default = {
	    CONFIG_GET,
	    configGet: CONFIG_GET,
	    CONFIG_SET,
	    configSet: CONFIG_SET,
	    DELETE: DELETE$1,
	    delete: DELETE$1,
	    EXPLAIN,
	    explain: EXPLAIN,
	    LIST: LIST$1,
	    list: LIST$1,
	    PROFILE: PROFILE$1,
	    profile: PROFILE$1,
	    QUERY,
	    query: QUERY,
	    RO_QUERY,
	    roQuery: RO_QUERY,
	    SLOWLOG: SLOWLOG$1,
	    slowLog: SLOWLOG$1
	};
	function pushQueryArguments(args, graph, query, options, compact) {
	    args.push(graph);
	    if (typeof options === 'number') {
	        args.push(query);
	        pushTimeout(args, options);
	    }
	    else {
	        args.push(options?.params ?
	            `CYPHER ${queryParamsToString(options.params)} ${query}` :
	            query);
	        if (options?.TIMEOUT !== undefined) {
	            pushTimeout(args, options.TIMEOUT);
	        }
	    }
	    if (compact) {
	        args.push('--compact');
	    }
	    return args;
	}
	commands$3.pushQueryArguments = pushQueryArguments;
	function pushTimeout(args, timeout) {
	    args.push('TIMEOUT', timeout.toString());
	}
	function queryParamsToString(params) {
	    const parts = [];
	    for (const [key, value] of Object.entries(params)) {
	        parts.push(`${key}=${queryParamToString(value)}`);
	    }
	    return parts.join(' ');
	}
	function queryParamToString(param) {
	    if (param === null) {
	        return 'null';
	    }
	    switch (typeof param) {
	        case 'string':
	            return `"${param.replace(/["\\]/g, '\\$&')}"`;
	        case 'number':
	        case 'boolean':
	            return param.toString();
	    }
	    if (Array.isArray(param)) {
	        return `[${param.map(queryParamToString).join(',')}]`;
	    }
	    else if (typeof param === 'object') {
	        const body = [];
	        for (const [key, value] of Object.entries(param)) {
	            body.push(`${key}:${queryParamToString(value)}`);
	        }
	        return `{${body.join(',')}}`;
	    }
	    else {
	        throw new TypeError(`Unexpected param type ${typeof param} ${param}`);
	    }
	}
	return commands$3;
}

var graph = {};

var __classPrivateFieldSet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Graph_instances, _Graph_client, _Graph_name, _Graph_metadata, _Graph_setMetadataPromise, _Graph_updateMetadata, _Graph_setMetadata, _Graph_cleanMetadataArray, _Graph_getMetadata, _Graph_getMetadataAsync, _Graph_parseReply, _Graph_parseValue, _Graph_parseEdge, _Graph_parseNode, _Graph_parseProperties;
Object.defineProperty(graph, "__esModule", { value: true });
// https://github.com/RedisGraph/RedisGraph/blob/master/src/resultset/formatters/resultset_formatter.h#L20
var GraphValueTypes;
(function (GraphValueTypes) {
    GraphValueTypes[GraphValueTypes["UNKNOWN"] = 0] = "UNKNOWN";
    GraphValueTypes[GraphValueTypes["NULL"] = 1] = "NULL";
    GraphValueTypes[GraphValueTypes["STRING"] = 2] = "STRING";
    GraphValueTypes[GraphValueTypes["INTEGER"] = 3] = "INTEGER";
    GraphValueTypes[GraphValueTypes["BOOLEAN"] = 4] = "BOOLEAN";
    GraphValueTypes[GraphValueTypes["DOUBLE"] = 5] = "DOUBLE";
    GraphValueTypes[GraphValueTypes["ARRAY"] = 6] = "ARRAY";
    GraphValueTypes[GraphValueTypes["EDGE"] = 7] = "EDGE";
    GraphValueTypes[GraphValueTypes["NODE"] = 8] = "NODE";
    GraphValueTypes[GraphValueTypes["PATH"] = 9] = "PATH";
    GraphValueTypes[GraphValueTypes["MAP"] = 10] = "MAP";
    GraphValueTypes[GraphValueTypes["POINT"] = 11] = "POINT";
})(GraphValueTypes || (GraphValueTypes = {}));
class Graph {
    constructor(client, name) {
        _Graph_instances.add(this);
        _Graph_client.set(this, void 0);
        _Graph_name.set(this, void 0);
        _Graph_metadata.set(this, void 0);
        _Graph_setMetadataPromise.set(this, void 0);
        __classPrivateFieldSet(this, _Graph_client, client, "f");
        __classPrivateFieldSet(this, _Graph_name, name, "f");
    }
    async query(query, options) {
        return __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseReply).call(this, await __classPrivateFieldGet(this, _Graph_client, "f").graph.query(__classPrivateFieldGet(this, _Graph_name, "f"), query, options, true));
    }
    async roQuery(query, options) {
        return __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseReply).call(this, await __classPrivateFieldGet(this, _Graph_client, "f").graph.roQuery(__classPrivateFieldGet(this, _Graph_name, "f"), query, options, true));
    }
}
_Graph_client = new WeakMap(), _Graph_name = new WeakMap(), _Graph_metadata = new WeakMap(), _Graph_setMetadataPromise = new WeakMap(), _Graph_instances = new WeakSet(), _Graph_updateMetadata = function _Graph_updateMetadata() {
    __classPrivateFieldSet(this, _Graph_setMetadataPromise, __classPrivateFieldGet(this, _Graph_setMetadataPromise, "f") ?? __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_setMetadata).call(this)
        .finally(() => __classPrivateFieldSet(this, _Graph_setMetadataPromise, undefined, "f")), "f");
    return __classPrivateFieldGet(this, _Graph_setMetadataPromise, "f");
}, _Graph_setMetadata = 
// DO NOT use directly, use #updateMetadata instead
async function _Graph_setMetadata() {
    const [labels, relationshipTypes, propertyKeys] = await Promise.all([
        __classPrivateFieldGet(this, _Graph_client, "f").graph.roQuery(__classPrivateFieldGet(this, _Graph_name, "f"), 'CALL db.labels()'),
        __classPrivateFieldGet(this, _Graph_client, "f").graph.roQuery(__classPrivateFieldGet(this, _Graph_name, "f"), 'CALL db.relationshipTypes()'),
        __classPrivateFieldGet(this, _Graph_client, "f").graph.roQuery(__classPrivateFieldGet(this, _Graph_name, "f"), 'CALL db.propertyKeys()')
    ]);
    __classPrivateFieldSet(this, _Graph_metadata, {
        labels: __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_cleanMetadataArray).call(this, labels.data),
        relationshipTypes: __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_cleanMetadataArray).call(this, relationshipTypes.data),
        propertyKeys: __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_cleanMetadataArray).call(this, propertyKeys.data)
    }, "f");
    return __classPrivateFieldGet(this, _Graph_metadata, "f");
}, _Graph_cleanMetadataArray = function _Graph_cleanMetadataArray(arr) {
    return arr.map(([value]) => value);
}, _Graph_getMetadata = function _Graph_getMetadata(key, id) {
    return __classPrivateFieldGet(this, _Graph_metadata, "f")?.[key][id] ?? __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_getMetadataAsync).call(this, key, id);
}, _Graph_getMetadataAsync = 
// DO NOT use directly, use #getMetadata instead
async function _Graph_getMetadataAsync(key, id) {
    const value = (await __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_updateMetadata).call(this))[key][id];
    if (value === undefined)
        throw new Error(`Cannot find value from ${key}[${id}]`);
    return value;
}, _Graph_parseReply = async function _Graph_parseReply(reply) {
    if (!reply.data)
        return reply;
    const promises = [], parsed = {
        metadata: reply.metadata,
        data: reply.data.map((row) => {
            const data = {};
            for (let i = 0; i < row.length; i++) {
                data[reply.headers[i][1]] = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseValue).call(this, row[i], promises);
            }
            return data;
        })
    };
    if (promises.length)
        await Promise.all(promises);
    return parsed;
}, _Graph_parseValue = function _Graph_parseValue([valueType, value], promises) {
    switch (valueType) {
        case GraphValueTypes.NULL:
            return null;
        case GraphValueTypes.STRING:
        case GraphValueTypes.INTEGER:
            return value;
        case GraphValueTypes.BOOLEAN:
            return value === 'true';
        case GraphValueTypes.DOUBLE:
            return parseFloat(value);
        case GraphValueTypes.ARRAY:
            return value.map(x => __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseValue).call(this, x, promises));
        case GraphValueTypes.EDGE:
            return __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseEdge).call(this, value, promises);
        case GraphValueTypes.NODE:
            return __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseNode).call(this, value, promises);
        case GraphValueTypes.PATH:
            return {
                nodes: value[0][1].map(([, node]) => __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseNode).call(this, node, promises)),
                edges: value[1][1].map(([, edge]) => __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseEdge).call(this, edge, promises))
            };
        case GraphValueTypes.MAP:
            const map = {};
            for (let i = 0; i < value.length; i++) {
                map[value[i++]] = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseValue).call(this, value[i], promises);
            }
            return map;
        case GraphValueTypes.POINT:
            return {
                latitude: parseFloat(value[0]),
                longitude: parseFloat(value[1])
            };
        default:
            throw new Error(`unknown scalar type: ${valueType}`);
    }
}, _Graph_parseEdge = function _Graph_parseEdge([id, relationshipTypeId, sourceId, destinationId, properties], promises) {
    const edge = {
        id,
        sourceId,
        destinationId,
        properties: __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseProperties).call(this, properties, promises)
    };
    const relationshipType = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_getMetadata).call(this, 'relationshipTypes', relationshipTypeId);
    if (relationshipType instanceof Promise) {
        promises.push(relationshipType.then(value => edge.relationshipType = value));
    }
    else {
        edge.relationshipType = relationshipType;
    }
    return edge;
}, _Graph_parseNode = function _Graph_parseNode([id, labelIds, properties], promises) {
    const labels = new Array(labelIds.length);
    for (let i = 0; i < labelIds.length; i++) {
        const value = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_getMetadata).call(this, 'labels', labelIds[i]);
        if (value instanceof Promise) {
            promises.push(value.then(value => labels[i] = value));
        }
        else {
            labels[i] = value;
        }
    }
    return {
        id,
        labels,
        properties: __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseProperties).call(this, properties, promises)
    };
}, _Graph_parseProperties = function _Graph_parseProperties(raw, promises) {
    const parsed = {};
    for (const [id, type, value] of raw) {
        const parsedValue = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseValue).call(this, [type, value], promises), key = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_getMetadata).call(this, 'propertyKeys', id);
        if (key instanceof Promise) {
            promises.push(key.then(key => parsed[key] = parsedValue));
        }
        else {
            parsed[key] = parsedValue;
        }
    }
    return parsed;
};
graph.default = Graph;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Graph = exports.default = void 0;
	var commands_1 = requireCommands$3();
	Object.defineProperty(exports, "default", { enumerable: true, get: function () { return commands_1.default; } });
	var graph_1 = graph;
	Object.defineProperty(exports, "Graph", { enumerable: true, get: function () { return graph_1.default; } }); 
} (dist$3));

var dist$2 = {};

var commands$2 = {};

var ARRAPPEND = {};

var hasRequiredARRAPPEND;

function requireARRAPPEND () {
	if (hasRequiredARRAPPEND) return ARRAPPEND;
	hasRequiredARRAPPEND = 1;
	Object.defineProperty(ARRAPPEND, "__esModule", { value: true });
	ARRAPPEND.transformArguments = ARRAPPEND.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$2();
	ARRAPPEND.FIRST_KEY_INDEX = 1;
	function transformArguments(key, path, ...jsons) {
	    const args = ['JSON.ARRAPPEND', key, path];
	    for (const json of jsons) {
	        args.push((0, _1.transformRedisJsonArgument)(json));
	    }
	    return args;
	}
	ARRAPPEND.transformArguments = transformArguments;
	return ARRAPPEND;
}

var ARRINDEX = {};

var hasRequiredARRINDEX;

function requireARRINDEX () {
	if (hasRequiredARRINDEX) return ARRINDEX;
	hasRequiredARRINDEX = 1;
	Object.defineProperty(ARRINDEX, "__esModule", { value: true });
	ARRINDEX.transformArguments = ARRINDEX.IS_READ_ONLY = ARRINDEX.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$2();
	ARRINDEX.FIRST_KEY_INDEX = 1;
	ARRINDEX.IS_READ_ONLY = true;
	function transformArguments(key, path, json, start, stop) {
	    const args = ['JSON.ARRINDEX', key, path, (0, _1.transformRedisJsonArgument)(json)];
	    if (start !== undefined && start !== null) {
	        args.push(start.toString());
	        if (stop !== undefined && stop !== null) {
	            args.push(stop.toString());
	        }
	    }
	    return args;
	}
	ARRINDEX.transformArguments = transformArguments;
	return ARRINDEX;
}

var ARRINSERT = {};

var hasRequiredARRINSERT;

function requireARRINSERT () {
	if (hasRequiredARRINSERT) return ARRINSERT;
	hasRequiredARRINSERT = 1;
	Object.defineProperty(ARRINSERT, "__esModule", { value: true });
	ARRINSERT.transformArguments = ARRINSERT.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$2();
	ARRINSERT.FIRST_KEY_INDEX = 1;
	function transformArguments(key, path, index, ...jsons) {
	    const args = ['JSON.ARRINSERT', key, path, index.toString()];
	    for (const json of jsons) {
	        args.push((0, _1.transformRedisJsonArgument)(json));
	    }
	    return args;
	}
	ARRINSERT.transformArguments = transformArguments;
	return ARRINSERT;
}

var ARRLEN = {};

Object.defineProperty(ARRLEN, "__esModule", { value: true });
ARRLEN.transformArguments = ARRLEN.IS_READ_ONLY = ARRLEN.FIRST_KEY_INDEX = void 0;
ARRLEN.FIRST_KEY_INDEX = 1;
ARRLEN.IS_READ_ONLY = true;
function transformArguments$x(key, path) {
    const args = ['JSON.ARRLEN', key];
    if (path) {
        args.push(path);
    }
    return args;
}
ARRLEN.transformArguments = transformArguments$x;

var ARRPOP = {};

var hasRequiredARRPOP;

function requireARRPOP () {
	if (hasRequiredARRPOP) return ARRPOP;
	hasRequiredARRPOP = 1;
	Object.defineProperty(ARRPOP, "__esModule", { value: true });
	ARRPOP.transformReply = ARRPOP.transformArguments = ARRPOP.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$2();
	ARRPOP.FIRST_KEY_INDEX = 1;
	function transformArguments(key, path, index) {
	    const args = ['JSON.ARRPOP', key];
	    if (path) {
	        args.push(path);
	        if (index !== undefined && index !== null) {
	            args.push(index.toString());
	        }
	    }
	    return args;
	}
	ARRPOP.transformArguments = transformArguments;
	function transformReply(reply) {
	    if (reply === null)
	        return null;
	    if (Array.isArray(reply)) {
	        return reply.map(_1.transformRedisJsonNullReply);
	    }
	    return (0, _1.transformRedisJsonNullReply)(reply);
	}
	ARRPOP.transformReply = transformReply;
	return ARRPOP;
}

var ARRTRIM = {};

Object.defineProperty(ARRTRIM, "__esModule", { value: true });
ARRTRIM.transformArguments = ARRTRIM.FIRST_KEY_INDEX = void 0;
ARRTRIM.FIRST_KEY_INDEX = 1;
function transformArguments$w(key, path, start, stop) {
    return ['JSON.ARRTRIM', key, path, start.toString(), stop.toString()];
}
ARRTRIM.transformArguments = transformArguments$w;

var DEBUG_MEMORY = {};

Object.defineProperty(DEBUG_MEMORY, "__esModule", { value: true });
DEBUG_MEMORY.transformArguments = DEBUG_MEMORY.FIRST_KEY_INDEX = void 0;
DEBUG_MEMORY.FIRST_KEY_INDEX = 2;
function transformArguments$v(key, path) {
    const args = ['JSON.DEBUG', 'MEMORY', key];
    if (path) {
        args.push(path);
    }
    return args;
}
DEBUG_MEMORY.transformArguments = transformArguments$v;

var DEL$1 = {};

Object.defineProperty(DEL$1, "__esModule", { value: true });
DEL$1.transformArguments = DEL$1.FIRST_KEY_INDEX = void 0;
DEL$1.FIRST_KEY_INDEX = 1;
function transformArguments$u(key, path) {
    const args = ['JSON.DEL', key];
    if (path) {
        args.push(path);
    }
    return args;
}
DEL$1.transformArguments = transformArguments$u;

var FORGET = {};

Object.defineProperty(FORGET, "__esModule", { value: true });
FORGET.transformArguments = FORGET.FIRST_KEY_INDEX = void 0;
FORGET.FIRST_KEY_INDEX = 1;
function transformArguments$t(key, path) {
    const args = ['JSON.FORGET', key];
    if (path) {
        args.push(path);
    }
    return args;
}
FORGET.transformArguments = transformArguments$t;

var GET$1 = {};

var hasRequiredGET$1;

function requireGET$1 () {
	if (hasRequiredGET$1) return GET$1;
	hasRequiredGET$1 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		const generic_transformers_1 = genericTransformers;
		exports.FIRST_KEY_INDEX = 1;
		exports.IS_READ_ONLY = true;
		function transformArguments(key, options) {
		    let args = ['JSON.GET', key];
		    if (options?.path) {
		        args = (0, generic_transformers_1.pushVerdictArguments)(args, options.path);
		    }
		    if (options?.INDENT) {
		        args.push('INDENT', options.INDENT);
		    }
		    if (options?.NEWLINE) {
		        args.push('NEWLINE', options.NEWLINE);
		    }
		    if (options?.SPACE) {
		        args.push('SPACE', options.SPACE);
		    }
		    if (options?.NOESCAPE) {
		        args.push('NOESCAPE');
		    }
		    return args;
		}
		exports.transformArguments = transformArguments;
		var _1 = requireCommands$2();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _1.transformRedisJsonNullReply; } }); 
	} (GET$1));
	return GET$1;
}

var MERGE = {};

var hasRequiredMERGE;

function requireMERGE () {
	if (hasRequiredMERGE) return MERGE;
	hasRequiredMERGE = 1;
	Object.defineProperty(MERGE, "__esModule", { value: true });
	MERGE.transformArguments = MERGE.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$2();
	MERGE.FIRST_KEY_INDEX = 1;
	function transformArguments(key, path, json) {
	    return ['JSON.MERGE', key, path, (0, _1.transformRedisJsonArgument)(json)];
	}
	MERGE.transformArguments = transformArguments;
	return MERGE;
}

var MGET$1 = {};

var hasRequiredMGET$1;

function requireMGET$1 () {
	if (hasRequiredMGET$1) return MGET$1;
	hasRequiredMGET$1 = 1;
	Object.defineProperty(MGET$1, "__esModule", { value: true });
	MGET$1.transformReply = MGET$1.transformArguments = MGET$1.IS_READ_ONLY = MGET$1.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$2();
	MGET$1.FIRST_KEY_INDEX = 1;
	MGET$1.IS_READ_ONLY = true;
	function transformArguments(keys, path) {
	    return [
	        'JSON.MGET',
	        ...keys,
	        path
	    ];
	}
	MGET$1.transformArguments = transformArguments;
	function transformReply(reply) {
	    return reply.map(_1.transformRedisJsonNullReply);
	}
	MGET$1.transformReply = transformReply;
	return MGET$1;
}

var MSET = {};

var hasRequiredMSET;

function requireMSET () {
	if (hasRequiredMSET) return MSET;
	hasRequiredMSET = 1;
	Object.defineProperty(MSET, "__esModule", { value: true });
	MSET.transformArguments = MSET.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$2();
	MSET.FIRST_KEY_INDEX = 1;
	function transformArguments(items) {
	    const args = new Array(1 + items.length * 3);
	    args[0] = 'JSON.MSET';
	    let argsIndex = 1;
	    for (let i = 0; i < items.length; i++) {
	        const item = items[i];
	        args[argsIndex++] = item.key;
	        args[argsIndex++] = item.path;
	        args[argsIndex++] = (0, _1.transformRedisJsonArgument)(item.value);
	    }
	    return args;
	}
	MSET.transformArguments = transformArguments;
	return MSET;
}

var NUMINCRBY = {};

var hasRequiredNUMINCRBY;

function requireNUMINCRBY () {
	if (hasRequiredNUMINCRBY) return NUMINCRBY;
	hasRequiredNUMINCRBY = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
		exports.FIRST_KEY_INDEX = 1;
		function transformArguments(key, path, by) {
		    return ['JSON.NUMINCRBY', key, path, by.toString()];
		}
		exports.transformArguments = transformArguments;
		var _1 = requireCommands$2();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _1.transformNumbersReply; } }); 
	} (NUMINCRBY));
	return NUMINCRBY;
}

var NUMMULTBY = {};

var hasRequiredNUMMULTBY;

function requireNUMMULTBY () {
	if (hasRequiredNUMMULTBY) return NUMMULTBY;
	hasRequiredNUMMULTBY = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
		exports.FIRST_KEY_INDEX = 1;
		function transformArguments(key, path, by) {
		    return ['JSON.NUMMULTBY', key, path, by.toString()];
		}
		exports.transformArguments = transformArguments;
		var _1 = requireCommands$2();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _1.transformNumbersReply; } }); 
	} (NUMMULTBY));
	return NUMMULTBY;
}

var OBJKEYS = {};

Object.defineProperty(OBJKEYS, "__esModule", { value: true });
OBJKEYS.transformArguments = OBJKEYS.FIRST_KEY_INDEX = void 0;
OBJKEYS.FIRST_KEY_INDEX = 1;
function transformArguments$s(key, path) {
    const args = ['JSON.OBJKEYS', key];
    if (path) {
        args.push(path);
    }
    return args;
}
OBJKEYS.transformArguments = transformArguments$s;

var OBJLEN = {};

Object.defineProperty(OBJLEN, "__esModule", { value: true });
OBJLEN.transformArguments = OBJLEN.FIRST_KEY_INDEX = void 0;
OBJLEN.FIRST_KEY_INDEX = 1;
function transformArguments$r(key, path) {
    const args = ['JSON.OBJLEN', key];
    if (path) {
        args.push(path);
    }
    return args;
}
OBJLEN.transformArguments = transformArguments$r;

var RESP = {};

Object.defineProperty(RESP, "__esModule", { value: true });
RESP.transformArguments = RESP.FIRST_KEY_INDEX = void 0;
RESP.FIRST_KEY_INDEX = 1;
function transformArguments$q(key, path) {
    const args = ['JSON.RESP', key];
    if (path) {
        args.push(path);
    }
    return args;
}
RESP.transformArguments = transformArguments$q;

var SET = {};

var hasRequiredSET;

function requireSET () {
	if (hasRequiredSET) return SET;
	hasRequiredSET = 1;
	Object.defineProperty(SET, "__esModule", { value: true });
	SET.transformArguments = SET.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$2();
	SET.FIRST_KEY_INDEX = 1;
	function transformArguments(key, path, json, options) {
	    const args = ['JSON.SET', key, path, (0, _1.transformRedisJsonArgument)(json)];
	    if (options?.NX) {
	        args.push('NX');
	    }
	    else if (options?.XX) {
	        args.push('XX');
	    }
	    return args;
	}
	SET.transformArguments = transformArguments;
	return SET;
}

var STRAPPEND = {};

var hasRequiredSTRAPPEND;

function requireSTRAPPEND () {
	if (hasRequiredSTRAPPEND) return STRAPPEND;
	hasRequiredSTRAPPEND = 1;
	Object.defineProperty(STRAPPEND, "__esModule", { value: true });
	STRAPPEND.transformArguments = STRAPPEND.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$2();
	STRAPPEND.FIRST_KEY_INDEX = 1;
	function transformArguments(...[key, pathOrAppend, append]) {
	    const args = ['JSON.STRAPPEND', key];
	    if (append !== undefined && append !== null) {
	        args.push(pathOrAppend, (0, _1.transformRedisJsonArgument)(append));
	    }
	    else {
	        args.push((0, _1.transformRedisJsonArgument)(pathOrAppend));
	    }
	    return args;
	}
	STRAPPEND.transformArguments = transformArguments;
	return STRAPPEND;
}

var STRLEN = {};

Object.defineProperty(STRLEN, "__esModule", { value: true });
STRLEN.transformArguments = STRLEN.IS_READ_ONLY = STRLEN.FIRST_KEY_INDEX = void 0;
STRLEN.FIRST_KEY_INDEX = 1;
STRLEN.IS_READ_ONLY = true;
function transformArguments$p(key, path) {
    const args = ['JSON.STRLEN', key];
    if (path) {
        args.push(path);
    }
    return args;
}
STRLEN.transformArguments = transformArguments$p;

var TYPE = {};

Object.defineProperty(TYPE, "__esModule", { value: true });
TYPE.transformArguments = TYPE.FIRST_KEY_INDEX = void 0;
TYPE.FIRST_KEY_INDEX = 1;
function transformArguments$o(key, path) {
    const args = ['JSON.TYPE', key];
    if (path) {
        args.push(path);
    }
    return args;
}
TYPE.transformArguments = transformArguments$o;

var hasRequiredCommands$2;

function requireCommands$2 () {
	if (hasRequiredCommands$2) return commands$2;
	hasRequiredCommands$2 = 1;
	Object.defineProperty(commands$2, "__esModule", { value: true });
	commands$2.transformNumbersReply = commands$2.transformRedisJsonNullReply = commands$2.transformRedisJsonReply = commands$2.transformRedisJsonArgument = void 0;
	const ARRAPPEND = requireARRAPPEND();
	const ARRINDEX = requireARRINDEX();
	const ARRINSERT = requireARRINSERT();
	const ARRLEN$1 = ARRLEN;
	const ARRPOP = requireARRPOP();
	const ARRTRIM$1 = ARRTRIM;
	const DEBUG_MEMORY$1 = DEBUG_MEMORY;
	const DEL = DEL$1;
	const FORGET$1 = FORGET;
	const GET = requireGET$1();
	const MERGE = requireMERGE();
	const MGET = requireMGET$1();
	const MSET = requireMSET();
	const NUMINCRBY = requireNUMINCRBY();
	const NUMMULTBY = requireNUMMULTBY();
	const OBJKEYS$1 = OBJKEYS;
	const OBJLEN$1 = OBJLEN;
	const RESP$1 = RESP;
	const SET = requireSET();
	const STRAPPEND = requireSTRAPPEND();
	const STRLEN$1 = STRLEN;
	const TYPE$1 = TYPE;
	commands$2.default = {
	    ARRAPPEND,
	    arrAppend: ARRAPPEND,
	    ARRINDEX,
	    arrIndex: ARRINDEX,
	    ARRINSERT,
	    arrInsert: ARRINSERT,
	    ARRLEN: ARRLEN$1,
	    arrLen: ARRLEN$1,
	    ARRPOP,
	    arrPop: ARRPOP,
	    ARRTRIM: ARRTRIM$1,
	    arrTrim: ARRTRIM$1,
	    DEBUG_MEMORY: DEBUG_MEMORY$1,
	    debugMemory: DEBUG_MEMORY$1,
	    DEL,
	    del: DEL,
	    FORGET: FORGET$1,
	    forget: FORGET$1,
	    GET,
	    get: GET,
	    MERGE,
	    merge: MERGE,
	    MGET,
	    mGet: MGET,
	    MSET,
	    mSet: MSET,
	    NUMINCRBY,
	    numIncrBy: NUMINCRBY,
	    NUMMULTBY,
	    numMultBy: NUMMULTBY,
	    OBJKEYS: OBJKEYS$1,
	    objKeys: OBJKEYS$1,
	    OBJLEN: OBJLEN$1,
	    objLen: OBJLEN$1,
	    RESP: RESP$1,
	    resp: RESP$1,
	    SET,
	    set: SET,
	    STRAPPEND,
	    strAppend: STRAPPEND,
	    STRLEN: STRLEN$1,
	    strLen: STRLEN$1,
	    TYPE: TYPE$1,
	    type: TYPE$1
	};
	function transformRedisJsonArgument(json) {
	    return JSON.stringify(json);
	}
	commands$2.transformRedisJsonArgument = transformRedisJsonArgument;
	function transformRedisJsonReply(json) {
	    return JSON.parse(json);
	}
	commands$2.transformRedisJsonReply = transformRedisJsonReply;
	function transformRedisJsonNullReply(json) {
	    if (json === null)
	        return null;
	    return transformRedisJsonReply(json);
	}
	commands$2.transformRedisJsonNullReply = transformRedisJsonNullReply;
	function transformNumbersReply(reply) {
	    return JSON.parse(reply);
	}
	commands$2.transformNumbersReply = transformNumbersReply;
	return commands$2;
}

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var commands_1 = requireCommands$2();
	Object.defineProperty(exports, "default", { enumerable: true, get: function () { return commands_1.default; } }); 
} (dist$2));

var dist$1 = {};

var commands$1 = {};

var _LIST = {};

Object.defineProperty(_LIST, "__esModule", { value: true });
_LIST.transformArguments = void 0;
function transformArguments$n() {
    return ['FT._LIST'];
}
_LIST.transformArguments = transformArguments$n;

var ALTER$1 = {};

var hasRequiredALTER$1;

function requireALTER$1 () {
	if (hasRequiredALTER$1) return ALTER$1;
	hasRequiredALTER$1 = 1;
	Object.defineProperty(ALTER$1, "__esModule", { value: true });
	ALTER$1.transformArguments = void 0;
	const _1 = requireCommands$1();
	function transformArguments(index, schema) {
	    const args = ['FT.ALTER', index, 'SCHEMA', 'ADD'];
	    (0, _1.pushSchema)(args, schema);
	    return args;
	}
	ALTER$1.transformArguments = transformArguments;
	return ALTER$1;
}

var AGGREGATE_WITHCURSOR = {};

var AGGREGATE = {};

var hasRequiredAGGREGATE;

function requireAGGREGATE () {
	if (hasRequiredAGGREGATE) return AGGREGATE;
	hasRequiredAGGREGATE = 1;
	Object.defineProperty(AGGREGATE, "__esModule", { value: true });
	AGGREGATE.transformReply = AGGREGATE.pushAggregatehOptions = AGGREGATE.transformArguments = AGGREGATE.IS_READ_ONLY = AGGREGATE.FIRST_KEY_INDEX = AGGREGATE.AggregateGroupByReducers = AGGREGATE.AggregateSteps = void 0;
	const generic_transformers_1 = genericTransformers;
	const _1 = requireCommands$1();
	var AggregateSteps;
	(function (AggregateSteps) {
	    AggregateSteps["GROUPBY"] = "GROUPBY";
	    AggregateSteps["SORTBY"] = "SORTBY";
	    AggregateSteps["APPLY"] = "APPLY";
	    AggregateSteps["LIMIT"] = "LIMIT";
	    AggregateSteps["FILTER"] = "FILTER";
	})(AggregateSteps || (AGGREGATE.AggregateSteps = AggregateSteps = {}));
	var AggregateGroupByReducers;
	(function (AggregateGroupByReducers) {
	    AggregateGroupByReducers["COUNT"] = "COUNT";
	    AggregateGroupByReducers["COUNT_DISTINCT"] = "COUNT_DISTINCT";
	    AggregateGroupByReducers["COUNT_DISTINCTISH"] = "COUNT_DISTINCTISH";
	    AggregateGroupByReducers["SUM"] = "SUM";
	    AggregateGroupByReducers["MIN"] = "MIN";
	    AggregateGroupByReducers["MAX"] = "MAX";
	    AggregateGroupByReducers["AVG"] = "AVG";
	    AggregateGroupByReducers["STDDEV"] = "STDDEV";
	    AggregateGroupByReducers["QUANTILE"] = "QUANTILE";
	    AggregateGroupByReducers["TOLIST"] = "TOLIST";
	    AggregateGroupByReducers["TO_LIST"] = "TOLIST";
	    AggregateGroupByReducers["FIRST_VALUE"] = "FIRST_VALUE";
	    AggregateGroupByReducers["RANDOM_SAMPLE"] = "RANDOM_SAMPLE";
	})(AggregateGroupByReducers || (AGGREGATE.AggregateGroupByReducers = AggregateGroupByReducers = {}));
	AGGREGATE.FIRST_KEY_INDEX = 1;
	AGGREGATE.IS_READ_ONLY = true;
	function transformArguments(index, query, options) {
	    return pushAggregatehOptions(['FT.AGGREGATE', index, query], options);
	}
	AGGREGATE.transformArguments = transformArguments;
	function pushAggregatehOptions(args, options) {
	    if (options?.VERBATIM) {
	        args.push('VERBATIM');
	    }
	    if (options?.ADDSCORES) {
	        args.push('ADDSCORES');
	    }
	    if (options?.LOAD) {
	        args.push('LOAD');
	        (0, _1.pushArgumentsWithLength)(args, () => {
	            if (Array.isArray(options.LOAD)) {
	                for (const load of options.LOAD) {
	                    pushLoadField(args, load);
	                }
	            }
	            else {
	                pushLoadField(args, options.LOAD);
	            }
	        });
	    }
	    if (options?.STEPS) {
	        for (const step of options.STEPS) {
	            switch (step.type) {
	                case AggregateSteps.GROUPBY:
	                    args.push('GROUPBY');
	                    if (!step.properties) {
	                        args.push('0');
	                    }
	                    else {
	                        (0, generic_transformers_1.pushVerdictArgument)(args, step.properties);
	                    }
	                    if (Array.isArray(step.REDUCE)) {
	                        for (const reducer of step.REDUCE) {
	                            pushGroupByReducer(args, reducer);
	                        }
	                    }
	                    else {
	                        pushGroupByReducer(args, step.REDUCE);
	                    }
	                    break;
	                case AggregateSteps.SORTBY:
	                    (0, _1.pushSortByArguments)(args, 'SORTBY', step.BY);
	                    if (step.MAX) {
	                        args.push('MAX', step.MAX.toString());
	                    }
	                    break;
	                case AggregateSteps.APPLY:
	                    args.push('APPLY', step.expression, 'AS', step.AS);
	                    break;
	                case AggregateSteps.LIMIT:
	                    args.push('LIMIT', step.from.toString(), step.size.toString());
	                    break;
	                case AggregateSteps.FILTER:
	                    args.push('FILTER', step.expression);
	                    break;
	            }
	        }
	    }
	    (0, _1.pushParamsArgs)(args, options?.PARAMS);
	    if (options?.DIALECT) {
	        args.push('DIALECT', options.DIALECT.toString());
	    }
	    if (options?.TIMEOUT !== undefined) {
	        args.push('TIMEOUT', options.TIMEOUT.toString());
	    }
	    return args;
	}
	AGGREGATE.pushAggregatehOptions = pushAggregatehOptions;
	function pushLoadField(args, toLoad) {
	    if (typeof toLoad === 'string') {
	        args.push(toLoad);
	    }
	    else {
	        args.push(toLoad.identifier);
	        if (toLoad.AS) {
	            args.push('AS', toLoad.AS);
	        }
	    }
	}
	function pushGroupByReducer(args, reducer) {
	    args.push('REDUCE', reducer.type);
	    switch (reducer.type) {
	        case AggregateGroupByReducers.COUNT:
	            args.push('0');
	            break;
	        case AggregateGroupByReducers.COUNT_DISTINCT:
	        case AggregateGroupByReducers.COUNT_DISTINCTISH:
	        case AggregateGroupByReducers.SUM:
	        case AggregateGroupByReducers.MIN:
	        case AggregateGroupByReducers.MAX:
	        case AggregateGroupByReducers.AVG:
	        case AggregateGroupByReducers.STDDEV:
	        case AggregateGroupByReducers.TOLIST:
	            args.push('1', reducer.property);
	            break;
	        case AggregateGroupByReducers.QUANTILE:
	            args.push('2', reducer.property, reducer.quantile.toString());
	            break;
	        case AggregateGroupByReducers.FIRST_VALUE: {
	            (0, _1.pushArgumentsWithLength)(args, () => {
	                args.push(reducer.property);
	                if (reducer.BY) {
	                    args.push('BY');
	                    if (typeof reducer.BY === 'string') {
	                        args.push(reducer.BY);
	                    }
	                    else {
	                        args.push(reducer.BY.property);
	                        if (reducer.BY.direction) {
	                            args.push(reducer.BY.direction);
	                        }
	                    }
	                }
	            });
	            break;
	        }
	        case AggregateGroupByReducers.RANDOM_SAMPLE:
	            args.push('2', reducer.property, reducer.sampleSize.toString());
	            break;
	    }
	    if (reducer.AS) {
	        args.push('AS', reducer.AS);
	    }
	}
	function transformReply(rawReply) {
	    const results = [];
	    for (let i = 1; i < rawReply.length; i++) {
	        results.push((0, generic_transformers_1.transformTuplesReply)(rawReply[i]));
	    }
	    return {
	        total: rawReply[0],
	        results
	    };
	}
	AGGREGATE.transformReply = transformReply;
	return AGGREGATE;
}

var hasRequiredAGGREGATE_WITHCURSOR;

function requireAGGREGATE_WITHCURSOR () {
	if (hasRequiredAGGREGATE_WITHCURSOR) return AGGREGATE_WITHCURSOR;
	hasRequiredAGGREGATE_WITHCURSOR = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		const AGGREGATE_1 = requireAGGREGATE();
		var AGGREGATE_2 = requireAGGREGATE();
		Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return AGGREGATE_2.FIRST_KEY_INDEX; } });
		Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return AGGREGATE_2.IS_READ_ONLY; } });
		function transformArguments(index, query, options) {
		    const args = (0, AGGREGATE_1.transformArguments)(index, query, options);
		    args.push('WITHCURSOR');
		    if (options?.COUNT) {
		        args.push('COUNT', options.COUNT.toString());
		    }
		    return args;
		}
		exports.transformArguments = transformArguments;
		function transformReply(reply) {
		    return {
		        ...(0, AGGREGATE_1.transformReply)(reply[0]),
		        cursor: reply[1]
		    };
		}
		exports.transformReply = transformReply; 
	} (AGGREGATE_WITHCURSOR));
	return AGGREGATE_WITHCURSOR;
}

var ALIASADD = {};

Object.defineProperty(ALIASADD, "__esModule", { value: true });
ALIASADD.transformArguments = void 0;
function transformArguments$m(name, index) {
    return ['FT.ALIASADD', name, index];
}
ALIASADD.transformArguments = transformArguments$m;

var ALIASDEL = {};

Object.defineProperty(ALIASDEL, "__esModule", { value: true });
ALIASDEL.transformArguments = void 0;
function transformArguments$l(name, index) {
    return ['FT.ALIASDEL', name, index];
}
ALIASDEL.transformArguments = transformArguments$l;

var ALIASUPDATE = {};

Object.defineProperty(ALIASUPDATE, "__esModule", { value: true });
ALIASUPDATE.transformArguments = void 0;
function transformArguments$k(name, index) {
    return ['FT.ALIASUPDATE', name, index];
}
ALIASUPDATE.transformArguments = transformArguments$k;

var CONFIG_GET = {};

Object.defineProperty(CONFIG_GET, "__esModule", { value: true });
CONFIG_GET.transformReply = CONFIG_GET.transformArguments = void 0;
function transformArguments$j(option) {
    return ['FT.CONFIG', 'GET', option];
}
CONFIG_GET.transformArguments = transformArguments$j;
function transformReply$3(rawReply) {
    const transformedReply = Object.create(null);
    for (const [key, value] of rawReply) {
        transformedReply[key] = value;
    }
    return transformedReply;
}
CONFIG_GET.transformReply = transformReply$3;

var CONFIG_SET = {};

Object.defineProperty(CONFIG_SET, "__esModule", { value: true });
CONFIG_SET.transformArguments = void 0;
function transformArguments$i(option, value) {
    return ['FT.CONFIG', 'SET', option, value];
}
CONFIG_SET.transformArguments = transformArguments$i;

var CREATE$1 = {};

var hasRequiredCREATE$1;

function requireCREATE$1 () {
	if (hasRequiredCREATE$1) return CREATE$1;
	hasRequiredCREATE$1 = 1;
	Object.defineProperty(CREATE$1, "__esModule", { value: true });
	CREATE$1.transformArguments = void 0;
	const generic_transformers_1 = genericTransformers;
	const _1 = requireCommands$1();
	function transformArguments(index, schema, options) {
	    const args = ['FT.CREATE', index];
	    if (options?.ON) {
	        args.push('ON', options.ON);
	    }
	    (0, generic_transformers_1.pushOptionalVerdictArgument)(args, 'PREFIX', options?.PREFIX);
	    if (options?.FILTER) {
	        args.push('FILTER', options.FILTER);
	    }
	    if (options?.LANGUAGE) {
	        args.push('LANGUAGE', options.LANGUAGE);
	    }
	    if (options?.LANGUAGE_FIELD) {
	        args.push('LANGUAGE_FIELD', options.LANGUAGE_FIELD);
	    }
	    if (options?.SCORE) {
	        args.push('SCORE', options.SCORE.toString());
	    }
	    if (options?.SCORE_FIELD) {
	        args.push('SCORE_FIELD', options.SCORE_FIELD);
	    }
	    // if (options?.PAYLOAD_FIELD) {
	    //     args.push('PAYLOAD_FIELD', options.PAYLOAD_FIELD);
	    // }
	    if (options?.MAXTEXTFIELDS) {
	        args.push('MAXTEXTFIELDS');
	    }
	    if (options?.TEMPORARY) {
	        args.push('TEMPORARY', options.TEMPORARY.toString());
	    }
	    if (options?.NOOFFSETS) {
	        args.push('NOOFFSETS');
	    }
	    if (options?.NOHL) {
	        args.push('NOHL');
	    }
	    if (options?.NOFIELDS) {
	        args.push('NOFIELDS');
	    }
	    if (options?.NOFREQS) {
	        args.push('NOFREQS');
	    }
	    if (options?.SKIPINITIALSCAN) {
	        args.push('SKIPINITIALSCAN');
	    }
	    (0, generic_transformers_1.pushOptionalVerdictArgument)(args, 'STOPWORDS', options?.STOPWORDS);
	    args.push('SCHEMA');
	    (0, _1.pushSchema)(args, schema);
	    return args;
	}
	CREATE$1.transformArguments = transformArguments;
	return CREATE$1;
}

var CURSOR_DEL = {};

Object.defineProperty(CURSOR_DEL, "__esModule", { value: true });
CURSOR_DEL.transformArguments = CURSOR_DEL.FIRST_KEY_INDEX = void 0;
CURSOR_DEL.FIRST_KEY_INDEX = 1;
function transformArguments$h(index, cursorId) {
    return [
        'FT.CURSOR',
        'DEL',
        index,
        cursorId.toString()
    ];
}
CURSOR_DEL.transformArguments = transformArguments$h;

var CURSOR_READ = {};

var hasRequiredCURSOR_READ;

function requireCURSOR_READ () {
	if (hasRequiredCURSOR_READ) return CURSOR_READ;
	hasRequiredCURSOR_READ = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
		exports.FIRST_KEY_INDEX = 1;
		exports.IS_READ_ONLY = true;
		function transformArguments(index, cursor, options) {
		    const args = [
		        'FT.CURSOR',
		        'READ',
		        index,
		        cursor.toString()
		    ];
		    if (options?.COUNT) {
		        args.push('COUNT', options.COUNT.toString());
		    }
		    return args;
		}
		exports.transformArguments = transformArguments;
		var AGGREGATE_WITHCURSOR_1 = requireAGGREGATE_WITHCURSOR();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return AGGREGATE_WITHCURSOR_1.transformReply; } }); 
	} (CURSOR_READ));
	return CURSOR_READ;
}

var DICTADD = {};

Object.defineProperty(DICTADD, "__esModule", { value: true });
DICTADD.transformArguments = void 0;
const generic_transformers_1$4 = genericTransformers;
function transformArguments$g(dictionary, term) {
    return (0, generic_transformers_1$4.pushVerdictArguments)(['FT.DICTADD', dictionary], term);
}
DICTADD.transformArguments = transformArguments$g;

var DICTDEL = {};

Object.defineProperty(DICTDEL, "__esModule", { value: true });
DICTDEL.transformArguments = void 0;
const generic_transformers_1$3 = genericTransformers;
function transformArguments$f(dictionary, term) {
    return (0, generic_transformers_1$3.pushVerdictArguments)(['FT.DICTDEL', dictionary], term);
}
DICTDEL.transformArguments = transformArguments$f;

var DICTDUMP = {};

Object.defineProperty(DICTDUMP, "__esModule", { value: true });
DICTDUMP.transformArguments = void 0;
function transformArguments$e(dictionary) {
    return ['FT.DICTDUMP', dictionary];
}
DICTDUMP.transformArguments = transformArguments$e;

var DROPINDEX = {};

Object.defineProperty(DROPINDEX, "__esModule", { value: true });
DROPINDEX.transformArguments = void 0;
function transformArguments$d(index, options) {
    const args = ['FT.DROPINDEX', index];
    if (options?.DD) {
        args.push('DD');
    }
    return args;
}
DROPINDEX.transformArguments = transformArguments$d;

var EXPLAIN = {};

var hasRequiredEXPLAIN;

function requireEXPLAIN () {
	if (hasRequiredEXPLAIN) return EXPLAIN;
	hasRequiredEXPLAIN = 1;
	Object.defineProperty(EXPLAIN, "__esModule", { value: true });
	EXPLAIN.transformArguments = EXPLAIN.IS_READ_ONLY = void 0;
	const _1 = requireCommands$1();
	EXPLAIN.IS_READ_ONLY = true;
	function transformArguments(index, query, options) {
	    const args = ['FT.EXPLAIN', index, query];
	    (0, _1.pushParamsArgs)(args, options?.PARAMS);
	    if (options?.DIALECT) {
	        args.push('DIALECT', options.DIALECT.toString());
	    }
	    return args;
	}
	EXPLAIN.transformArguments = transformArguments;
	return EXPLAIN;
}

var EXPLAINCLI = {};

Object.defineProperty(EXPLAINCLI, "__esModule", { value: true });
EXPLAINCLI.transformArguments = EXPLAINCLI.IS_READ_ONLY = void 0;
EXPLAINCLI.IS_READ_ONLY = true;
function transformArguments$c(index, query) {
    return ['FT.EXPLAINCLI', index, query];
}
EXPLAINCLI.transformArguments = transformArguments$c;

var INFO$1 = {};

Object.defineProperty(INFO$1, "__esModule", { value: true });
INFO$1.transformReply = INFO$1.transformArguments = void 0;
const generic_transformers_1$2 = genericTransformers;
function transformArguments$b(index) {
    return ['FT.INFO', index];
}
INFO$1.transformArguments = transformArguments$b;
function transformReply$2(rawReply) {
    return {
        indexName: rawReply[1],
        indexOptions: rawReply[3],
        indexDefinition: (0, generic_transformers_1$2.transformTuplesReply)(rawReply[5]),
        attributes: rawReply[7].map(attribute => (0, generic_transformers_1$2.transformTuplesReply)(attribute)),
        numDocs: rawReply[9],
        maxDocId: rawReply[11],
        numTerms: rawReply[13],
        numRecords: rawReply[15],
        invertedSzMb: rawReply[17],
        vectorIndexSzMb: rawReply[19],
        totalInvertedIndexBlocks: rawReply[21],
        offsetVectorsSzMb: rawReply[23],
        docTableSizeMb: rawReply[25],
        sortableValuesSizeMb: rawReply[27],
        keyTableSizeMb: rawReply[29],
        recordsPerDocAvg: rawReply[31],
        bytesPerRecordAvg: rawReply[33],
        offsetsPerTermAvg: rawReply[35],
        offsetBitsPerRecordAvg: rawReply[37],
        hashIndexingFailures: rawReply[39],
        indexing: rawReply[41],
        percentIndexed: rawReply[43],
        gcStats: {
            bytesCollected: rawReply[45][1],
            totalMsRun: rawReply[45][3],
            totalCycles: rawReply[45][5],
            averageCycleTimeMs: rawReply[45][7],
            lastRunTimeMs: rawReply[45][9],
            gcNumericTreesMissed: rawReply[45][11],
            gcBlocksDenied: rawReply[45][13]
        },
        cursorStats: {
            globalIdle: rawReply[47][1],
            globalTotal: rawReply[47][3],
            indexCapacity: rawReply[47][5],
            idnexTotal: rawReply[47][7]
        },
        stopWords: rawReply[49]
    };
}
INFO$1.transformReply = transformReply$2;

var PROFILE_SEARCH = {};

var SEARCH = {};

var hasRequiredSEARCH;

function requireSEARCH () {
	if (hasRequiredSEARCH) return SEARCH;
	hasRequiredSEARCH = 1;
	Object.defineProperty(SEARCH, "__esModule", { value: true });
	SEARCH.transformReply = SEARCH.transformArguments = SEARCH.IS_READ_ONLY = SEARCH.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$1();
	SEARCH.FIRST_KEY_INDEX = 1;
	SEARCH.IS_READ_ONLY = true;
	function transformArguments(index, query, options) {
	    return (0, _1.pushSearchOptions)(['FT.SEARCH', index, query], options);
	}
	SEARCH.transformArguments = transformArguments;
	function transformReply(reply, withoutDocuments) {
	    const documents = [];
	    let i = 1;
	    while (i < reply.length) {
	        documents.push({
	            id: reply[i++],
	            value: withoutDocuments ? Object.create(null) : documentValue(reply[i++])
	        });
	    }
	    return {
	        total: reply[0],
	        documents
	    };
	}
	SEARCH.transformReply = transformReply;
	function documentValue(tuples) {
	    const message = Object.create(null);
	    let i = 0;
	    while (i < tuples.length) {
	        const key = tuples[i++], value = tuples[i++];
	        if (key === '$') { // might be a JSON reply
	            try {
	                Object.assign(message, JSON.parse(value));
	                continue;
	            }
	            catch {
	                // set as a regular property if not a valid JSON
	            }
	        }
	        message[key] = value;
	    }
	    return message;
	}
	return SEARCH;
}

var hasRequiredPROFILE_SEARCH;

function requirePROFILE_SEARCH () {
	if (hasRequiredPROFILE_SEARCH) return PROFILE_SEARCH;
	hasRequiredPROFILE_SEARCH = 1;
	Object.defineProperty(PROFILE_SEARCH, "__esModule", { value: true });
	PROFILE_SEARCH.transformReply = PROFILE_SEARCH.transformArguments = PROFILE_SEARCH.IS_READ_ONLY = void 0;
	const SEARCH_1 = requireSEARCH();
	const _1 = requireCommands$1();
	PROFILE_SEARCH.IS_READ_ONLY = true;
	function transformArguments(index, query, options) {
	    let args = ['FT.PROFILE', index, 'SEARCH'];
	    if (options?.LIMITED) {
	        args.push('LIMITED');
	    }
	    args.push('QUERY', query);
	    return (0, _1.pushSearchOptions)(args, options);
	}
	PROFILE_SEARCH.transformArguments = transformArguments;
	function transformReply(reply, withoutDocuments) {
	    return {
	        results: (0, SEARCH_1.transformReply)(reply[0], withoutDocuments),
	        profile: (0, _1.transformProfile)(reply[1])
	    };
	}
	PROFILE_SEARCH.transformReply = transformReply;
	return PROFILE_SEARCH;
}

var PROFILE_AGGREGATE = {};

var hasRequiredPROFILE_AGGREGATE;

function requirePROFILE_AGGREGATE () {
	if (hasRequiredPROFILE_AGGREGATE) return PROFILE_AGGREGATE;
	hasRequiredPROFILE_AGGREGATE = 1;
	Object.defineProperty(PROFILE_AGGREGATE, "__esModule", { value: true });
	PROFILE_AGGREGATE.transformReply = PROFILE_AGGREGATE.transformArguments = PROFILE_AGGREGATE.IS_READ_ONLY = void 0;
	const AGGREGATE_1 = requireAGGREGATE();
	const _1 = requireCommands$1();
	PROFILE_AGGREGATE.IS_READ_ONLY = true;
	function transformArguments(index, query, options) {
	    const args = ['FT.PROFILE', index, 'AGGREGATE'];
	    if (options?.LIMITED) {
	        args.push('LIMITED');
	    }
	    args.push('QUERY', query);
	    (0, AGGREGATE_1.pushAggregatehOptions)(args, options);
	    return args;
	}
	PROFILE_AGGREGATE.transformArguments = transformArguments;
	function transformReply(reply) {
	    return {
	        results: (0, AGGREGATE_1.transformReply)(reply[0]),
	        profile: (0, _1.transformProfile)(reply[1])
	    };
	}
	PROFILE_AGGREGATE.transformReply = transformReply;
	return PROFILE_AGGREGATE;
}

var SEARCH_NOCONTENT = {};

var hasRequiredSEARCH_NOCONTENT;

function requireSEARCH_NOCONTENT () {
	if (hasRequiredSEARCH_NOCONTENT) return SEARCH_NOCONTENT;
	hasRequiredSEARCH_NOCONTENT = 1;
	Object.defineProperty(SEARCH_NOCONTENT, "__esModule", { value: true });
	SEARCH_NOCONTENT.transformReply = SEARCH_NOCONTENT.transformArguments = SEARCH_NOCONTENT.IS_READ_ONLY = SEARCH_NOCONTENT.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands$1();
	SEARCH_NOCONTENT.FIRST_KEY_INDEX = 1;
	SEARCH_NOCONTENT.IS_READ_ONLY = true;
	function transformArguments(index, query, options) {
	    return (0, _1.pushSearchOptions)(['FT.SEARCH', index, query, 'NOCONTENT'], options);
	}
	SEARCH_NOCONTENT.transformArguments = transformArguments;
	function transformReply(reply) {
	    return {
	        total: reply[0],
	        documents: reply.slice(1)
	    };
	}
	SEARCH_NOCONTENT.transformReply = transformReply;
	return SEARCH_NOCONTENT;
}

var SPELLCHECK = {};

Object.defineProperty(SPELLCHECK, "__esModule", { value: true });
SPELLCHECK.transformReply = SPELLCHECK.transformArguments = void 0;
function transformArguments$a(index, query, options) {
    const args = ['FT.SPELLCHECK', index, query];
    if (options?.DISTANCE) {
        args.push('DISTANCE', options.DISTANCE.toString());
    }
    if (options?.TERMS) {
        if (Array.isArray(options.TERMS)) {
            for (const term of options.TERMS) {
                pushTerms(args, term);
            }
        }
        else {
            pushTerms(args, options.TERMS);
        }
    }
    if (options?.DIALECT) {
        args.push('DIALECT', options.DIALECT.toString());
    }
    return args;
}
SPELLCHECK.transformArguments = transformArguments$a;
function pushTerms(args, { mode, dictionary }) {
    args.push('TERMS', mode, dictionary);
}
function transformReply$1(rawReply) {
    return rawReply.map(([, term, suggestions]) => ({
        term,
        suggestions: suggestions.map(([score, suggestion]) => ({
            score: Number(score),
            suggestion
        }))
    }));
}
SPELLCHECK.transformReply = transformReply$1;

var SUGADD = {};

Object.defineProperty(SUGADD, "__esModule", { value: true });
SUGADD.transformArguments = void 0;
function transformArguments$9(key, string, score, options) {
    const args = ['FT.SUGADD', key, string, score.toString()];
    if (options?.INCR) {
        args.push('INCR');
    }
    if (options?.PAYLOAD) {
        args.push('PAYLOAD', options.PAYLOAD);
    }
    return args;
}
SUGADD.transformArguments = transformArguments$9;

var SUGDEL = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = void 0;
	function transformArguments(key, string) {
	    return ['FT.SUGDEL', key, string];
	}
	exports.transformArguments = transformArguments;
	var generic_transformers_1 = genericTransformers;
	Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_1.transformBooleanReply; } }); 
} (SUGDEL));

var SUGGET_WITHPAYLOADS = {};

var SUGGET = {};

Object.defineProperty(SUGGET, "__esModule", { value: true });
SUGGET.transformArguments = SUGGET.IS_READ_ONLY = void 0;
SUGGET.IS_READ_ONLY = true;
function transformArguments$8(key, prefix, options) {
    const args = ['FT.SUGGET', key, prefix];
    if (options?.FUZZY) {
        args.push('FUZZY');
    }
    if (options?.MAX) {
        args.push('MAX', options.MAX.toString());
    }
    return args;
}
SUGGET.transformArguments = transformArguments$8;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
	const SUGGET_1 = SUGGET;
	var SUGGET_2 = SUGGET;
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return SUGGET_2.IS_READ_ONLY; } });
	function transformArguments(key, prefix, options) {
	    return [
	        ...(0, SUGGET_1.transformArguments)(key, prefix, options),
	        'WITHPAYLOADS'
	    ];
	}
	exports.transformArguments = transformArguments;
	function transformReply(rawReply) {
	    if (rawReply === null)
	        return null;
	    const transformedReply = [];
	    for (let i = 0; i < rawReply.length; i += 2) {
	        transformedReply.push({
	            suggestion: rawReply[i],
	            payload: rawReply[i + 1]
	        });
	    }
	    return transformedReply;
	}
	exports.transformReply = transformReply; 
} (SUGGET_WITHPAYLOADS));

var SUGGET_WITHSCORES_WITHPAYLOADS = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
	const SUGGET_1 = SUGGET;
	var SUGGET_2 = SUGGET;
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return SUGGET_2.IS_READ_ONLY; } });
	function transformArguments(key, prefix, options) {
	    return [
	        ...(0, SUGGET_1.transformArguments)(key, prefix, options),
	        'WITHSCORES',
	        'WITHPAYLOADS'
	    ];
	}
	exports.transformArguments = transformArguments;
	function transformReply(rawReply) {
	    if (rawReply === null)
	        return null;
	    const transformedReply = [];
	    for (let i = 0; i < rawReply.length; i += 3) {
	        transformedReply.push({
	            suggestion: rawReply[i],
	            score: Number(rawReply[i + 1]),
	            payload: rawReply[i + 2]
	        });
	    }
	    return transformedReply;
	}
	exports.transformReply = transformReply; 
} (SUGGET_WITHSCORES_WITHPAYLOADS));

var SUGGET_WITHSCORES = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
	const SUGGET_1 = SUGGET;
	var SUGGET_2 = SUGGET;
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return SUGGET_2.IS_READ_ONLY; } });
	function transformArguments(key, prefix, options) {
	    return [
	        ...(0, SUGGET_1.transformArguments)(key, prefix, options),
	        'WITHSCORES'
	    ];
	}
	exports.transformArguments = transformArguments;
	function transformReply(rawReply) {
	    if (rawReply === null)
	        return null;
	    const transformedReply = [];
	    for (let i = 0; i < rawReply.length; i += 2) {
	        transformedReply.push({
	            suggestion: rawReply[i],
	            score: Number(rawReply[i + 1])
	        });
	    }
	    return transformedReply;
	}
	exports.transformReply = transformReply; 
} (SUGGET_WITHSCORES));

var SUGLEN = {};

Object.defineProperty(SUGLEN, "__esModule", { value: true });
SUGLEN.transformArguments = SUGLEN.IS_READ_ONLY = void 0;
SUGLEN.IS_READ_ONLY = true;
function transformArguments$7(key) {
    return ['FT.SUGLEN', key];
}
SUGLEN.transformArguments = transformArguments$7;

var SYNDUMP = {};

Object.defineProperty(SYNDUMP, "__esModule", { value: true });
SYNDUMP.transformArguments = void 0;
function transformArguments$6(index) {
    return ['FT.SYNDUMP', index];
}
SYNDUMP.transformArguments = transformArguments$6;

var SYNUPDATE = {};

Object.defineProperty(SYNUPDATE, "__esModule", { value: true });
SYNUPDATE.transformArguments = void 0;
const generic_transformers_1$1 = genericTransformers;
function transformArguments$5(index, groupId, terms, options) {
    const args = ['FT.SYNUPDATE', index, groupId];
    if (options?.SKIPINITIALSCAN) {
        args.push('SKIPINITIALSCAN');
    }
    return (0, generic_transformers_1$1.pushVerdictArguments)(args, terms);
}
SYNUPDATE.transformArguments = transformArguments$5;

var TAGVALS = {};

Object.defineProperty(TAGVALS, "__esModule", { value: true });
TAGVALS.transformArguments = void 0;
function transformArguments$4(index, fieldName) {
    return ['FT.TAGVALS', index, fieldName];
}
TAGVALS.transformArguments = transformArguments$4;

var hasRequiredCommands$1;

function requireCommands$1 () {
	if (hasRequiredCommands$1) return commands$1;
	hasRequiredCommands$1 = 1;
	Object.defineProperty(commands$1, "__esModule", { value: true });
	commands$1.transformProfile = commands$1.pushSearchOptions = commands$1.pushParamsArgs = commands$1.pushSchema = commands$1.SCHEMA_GEO_SHAPE_COORD_SYSTEM = commands$1.VectorAlgorithms = commands$1.SchemaTextFieldPhonetics = commands$1.SchemaFieldTypes = commands$1.pushArgumentsWithLength = commands$1.pushSortByArguments = commands$1.pushSortByProperty = commands$1.RedisSearchLanguages = void 0;
	const _LIST$1 = _LIST;
	const ALTER = requireALTER$1();
	const AGGREGATE_WITHCURSOR = requireAGGREGATE_WITHCURSOR();
	const AGGREGATE = requireAGGREGATE();
	const ALIASADD$1 = ALIASADD;
	const ALIASDEL$1 = ALIASDEL;
	const ALIASUPDATE$1 = ALIASUPDATE;
	const CONFIG_GET$1 = CONFIG_GET;
	const CONFIG_SET$1 = CONFIG_SET;
	const CREATE = requireCREATE$1();
	const CURSOR_DEL$1 = CURSOR_DEL;
	const CURSOR_READ = requireCURSOR_READ();
	const DICTADD$1 = DICTADD;
	const DICTDEL$1 = DICTDEL;
	const DICTDUMP$1 = DICTDUMP;
	const DROPINDEX$1 = DROPINDEX;
	const EXPLAIN = requireEXPLAIN();
	const EXPLAINCLI$1 = EXPLAINCLI;
	const INFO = INFO$1;
	const PROFILESEARCH = requirePROFILE_SEARCH();
	const PROFILEAGGREGATE = requirePROFILE_AGGREGATE();
	const SEARCH = requireSEARCH();
	const SEARCH_NOCONTENT = requireSEARCH_NOCONTENT();
	const SPELLCHECK$1 = SPELLCHECK;
	const SUGADD$1 = SUGADD;
	const SUGDEL$1 = SUGDEL;
	const SUGGET_WITHPAYLOADS$1 = SUGGET_WITHPAYLOADS;
	const SUGGET_WITHSCORES_WITHPAYLOADS$1 = SUGGET_WITHSCORES_WITHPAYLOADS;
	const SUGGET_WITHSCORES$1 = SUGGET_WITHSCORES;
	const SUGGET$1 = SUGGET;
	const SUGLEN$1 = SUGLEN;
	const SYNDUMP$1 = SYNDUMP;
	const SYNUPDATE$1 = SYNUPDATE;
	const TAGVALS$1 = TAGVALS;
	const generic_transformers_1 = genericTransformers;
	commands$1.default = {
	    _LIST: _LIST$1,
	    _list: _LIST$1,
	    ALTER,
	    alter: ALTER,
	    AGGREGATE_WITHCURSOR,
	    aggregateWithCursor: AGGREGATE_WITHCURSOR,
	    AGGREGATE,
	    aggregate: AGGREGATE,
	    ALIASADD: ALIASADD$1,
	    aliasAdd: ALIASADD$1,
	    ALIASDEL: ALIASDEL$1,
	    aliasDel: ALIASDEL$1,
	    ALIASUPDATE: ALIASUPDATE$1,
	    aliasUpdate: ALIASUPDATE$1,
	    CONFIG_GET: CONFIG_GET$1,
	    configGet: CONFIG_GET$1,
	    CONFIG_SET: CONFIG_SET$1,
	    configSet: CONFIG_SET$1,
	    CREATE,
	    create: CREATE,
	    CURSOR_DEL: CURSOR_DEL$1,
	    cursorDel: CURSOR_DEL$1,
	    CURSOR_READ,
	    cursorRead: CURSOR_READ,
	    DICTADD: DICTADD$1,
	    dictAdd: DICTADD$1,
	    DICTDEL: DICTDEL$1,
	    dictDel: DICTDEL$1,
	    DICTDUMP: DICTDUMP$1,
	    dictDump: DICTDUMP$1,
	    DROPINDEX: DROPINDEX$1,
	    dropIndex: DROPINDEX$1,
	    EXPLAIN,
	    explain: EXPLAIN,
	    EXPLAINCLI: EXPLAINCLI$1,
	    explainCli: EXPLAINCLI$1,
	    INFO,
	    info: INFO,
	    PROFILESEARCH,
	    profileSearch: PROFILESEARCH,
	    PROFILEAGGREGATE,
	    profileAggregate: PROFILEAGGREGATE,
	    SEARCH,
	    search: SEARCH,
	    SEARCH_NOCONTENT,
	    searchNoContent: SEARCH_NOCONTENT,
	    SPELLCHECK: SPELLCHECK$1,
	    spellCheck: SPELLCHECK$1,
	    SUGADD: SUGADD$1,
	    sugAdd: SUGADD$1,
	    SUGDEL: SUGDEL$1,
	    sugDel: SUGDEL$1,
	    SUGGET_WITHPAYLOADS: SUGGET_WITHPAYLOADS$1,
	    sugGetWithPayloads: SUGGET_WITHPAYLOADS$1,
	    SUGGET_WITHSCORES_WITHPAYLOADS: SUGGET_WITHSCORES_WITHPAYLOADS$1,
	    sugGetWithScoresWithPayloads: SUGGET_WITHSCORES_WITHPAYLOADS$1,
	    SUGGET_WITHSCORES: SUGGET_WITHSCORES$1,
	    sugGetWithScores: SUGGET_WITHSCORES$1,
	    SUGGET: SUGGET$1,
	    sugGet: SUGGET$1,
	    SUGLEN: SUGLEN$1,
	    sugLen: SUGLEN$1,
	    SYNDUMP: SYNDUMP$1,
	    synDump: SYNDUMP$1,
	    SYNUPDATE: SYNUPDATE$1,
	    synUpdate: SYNUPDATE$1,
	    TAGVALS: TAGVALS$1,
	    tagVals: TAGVALS$1
	};
	var RedisSearchLanguages;
	(function (RedisSearchLanguages) {
	    RedisSearchLanguages["ARABIC"] = "Arabic";
	    RedisSearchLanguages["BASQUE"] = "Basque";
	    RedisSearchLanguages["CATALANA"] = "Catalan";
	    RedisSearchLanguages["DANISH"] = "Danish";
	    RedisSearchLanguages["DUTCH"] = "Dutch";
	    RedisSearchLanguages["ENGLISH"] = "English";
	    RedisSearchLanguages["FINNISH"] = "Finnish";
	    RedisSearchLanguages["FRENCH"] = "French";
	    RedisSearchLanguages["GERMAN"] = "German";
	    RedisSearchLanguages["GREEK"] = "Greek";
	    RedisSearchLanguages["HUNGARIAN"] = "Hungarian";
	    RedisSearchLanguages["INDONESAIN"] = "Indonesian";
	    RedisSearchLanguages["IRISH"] = "Irish";
	    RedisSearchLanguages["ITALIAN"] = "Italian";
	    RedisSearchLanguages["LITHUANIAN"] = "Lithuanian";
	    RedisSearchLanguages["NEPALI"] = "Nepali";
	    RedisSearchLanguages["NORWEIGAN"] = "Norwegian";
	    RedisSearchLanguages["PORTUGUESE"] = "Portuguese";
	    RedisSearchLanguages["ROMANIAN"] = "Romanian";
	    RedisSearchLanguages["RUSSIAN"] = "Russian";
	    RedisSearchLanguages["SPANISH"] = "Spanish";
	    RedisSearchLanguages["SWEDISH"] = "Swedish";
	    RedisSearchLanguages["TAMIL"] = "Tamil";
	    RedisSearchLanguages["TURKISH"] = "Turkish";
	    RedisSearchLanguages["CHINESE"] = "Chinese";
	})(RedisSearchLanguages || (commands$1.RedisSearchLanguages = RedisSearchLanguages = {}));
	function pushSortByProperty(args, sortBy) {
	    if (typeof sortBy === 'string') {
	        args.push(sortBy);
	    }
	    else {
	        args.push(sortBy.BY);
	        if (sortBy.DIRECTION) {
	            args.push(sortBy.DIRECTION);
	        }
	    }
	}
	commands$1.pushSortByProperty = pushSortByProperty;
	function pushSortByArguments(args, name, sortBy) {
	    const lengthBefore = args.push(name, '' // will be overwritten
	    );
	    if (Array.isArray(sortBy)) {
	        for (const field of sortBy) {
	            pushSortByProperty(args, field);
	        }
	    }
	    else {
	        pushSortByProperty(args, sortBy);
	    }
	    args[lengthBefore - 1] = (args.length - lengthBefore).toString();
	    return args;
	}
	commands$1.pushSortByArguments = pushSortByArguments;
	function pushArgumentsWithLength(args, fn) {
	    const lengthIndex = args.push('') - 1;
	    fn(args);
	    args[lengthIndex] = (args.length - lengthIndex - 1).toString();
	    return args;
	}
	commands$1.pushArgumentsWithLength = pushArgumentsWithLength;
	var SchemaFieldTypes;
	(function (SchemaFieldTypes) {
	    SchemaFieldTypes["TEXT"] = "TEXT";
	    SchemaFieldTypes["NUMERIC"] = "NUMERIC";
	    SchemaFieldTypes["GEO"] = "GEO";
	    SchemaFieldTypes["TAG"] = "TAG";
	    SchemaFieldTypes["VECTOR"] = "VECTOR";
	    SchemaFieldTypes["GEOSHAPE"] = "GEOSHAPE";
	})(SchemaFieldTypes || (commands$1.SchemaFieldTypes = SchemaFieldTypes = {}));
	function pushCommonFieldArguments(args, fieldOptions) {
	    if (fieldOptions.SORTABLE) {
	        args.push('SORTABLE');
	        if (fieldOptions.SORTABLE === 'UNF') {
	            args.push('UNF');
	        }
	    }
	    if (fieldOptions.NOINDEX) {
	        args.push('NOINDEX');
	    }
	}
	var SchemaTextFieldPhonetics;
	(function (SchemaTextFieldPhonetics) {
	    SchemaTextFieldPhonetics["DM_EN"] = "dm:en";
	    SchemaTextFieldPhonetics["DM_FR"] = "dm:fr";
	    SchemaTextFieldPhonetics["FM_PT"] = "dm:pt";
	    SchemaTextFieldPhonetics["DM_ES"] = "dm:es";
	})(SchemaTextFieldPhonetics || (commands$1.SchemaTextFieldPhonetics = SchemaTextFieldPhonetics = {}));
	var VectorAlgorithms;
	(function (VectorAlgorithms) {
	    VectorAlgorithms["FLAT"] = "FLAT";
	    VectorAlgorithms["HNSW"] = "HNSW";
	})(VectorAlgorithms || (commands$1.VectorAlgorithms = VectorAlgorithms = {}));
	commands$1.SCHEMA_GEO_SHAPE_COORD_SYSTEM = {
	    SPHERICAL: 'SPHERICAL',
	    FLAT: 'FLAT'
	};
	function pushSchema(args, schema) {
	    for (const [field, fieldOptions] of Object.entries(schema)) {
	        args.push(field);
	        if (typeof fieldOptions === 'string') {
	            args.push(fieldOptions);
	            continue;
	        }
	        if (fieldOptions.AS) {
	            args.push('AS', fieldOptions.AS);
	        }
	        args.push(fieldOptions.type);
	        switch (fieldOptions.type) {
	            case SchemaFieldTypes.TEXT:
	                if (fieldOptions.NOSTEM) {
	                    args.push('NOSTEM');
	                }
	                if (fieldOptions.WEIGHT) {
	                    args.push('WEIGHT', fieldOptions.WEIGHT.toString());
	                }
	                if (fieldOptions.PHONETIC) {
	                    args.push('PHONETIC', fieldOptions.PHONETIC);
	                }
	                if (fieldOptions.WITHSUFFIXTRIE) {
	                    args.push('WITHSUFFIXTRIE');
	                }
	                pushCommonFieldArguments(args, fieldOptions);
	                if (fieldOptions.INDEXEMPTY) {
	                    args.push('INDEXEMPTY');
	                }
	                break;
	            case SchemaFieldTypes.NUMERIC:
	            case SchemaFieldTypes.GEO:
	                pushCommonFieldArguments(args, fieldOptions);
	                break;
	            case SchemaFieldTypes.TAG:
	                if (fieldOptions.SEPARATOR) {
	                    args.push('SEPARATOR', fieldOptions.SEPARATOR);
	                }
	                if (fieldOptions.CASESENSITIVE) {
	                    args.push('CASESENSITIVE');
	                }
	                if (fieldOptions.WITHSUFFIXTRIE) {
	                    args.push('WITHSUFFIXTRIE');
	                }
	                pushCommonFieldArguments(args, fieldOptions);
	                if (fieldOptions.INDEXEMPTY) {
	                    args.push('INDEXEMPTY');
	                }
	                break;
	            case SchemaFieldTypes.VECTOR:
	                args.push(fieldOptions.ALGORITHM);
	                pushArgumentsWithLength(args, () => {
	                    args.push('TYPE', fieldOptions.TYPE, 'DIM', fieldOptions.DIM.toString(), 'DISTANCE_METRIC', fieldOptions.DISTANCE_METRIC);
	                    if (fieldOptions.INITIAL_CAP) {
	                        args.push('INITIAL_CAP', fieldOptions.INITIAL_CAP.toString());
	                    }
	                    switch (fieldOptions.ALGORITHM) {
	                        case VectorAlgorithms.FLAT:
	                            if (fieldOptions.BLOCK_SIZE) {
	                                args.push('BLOCK_SIZE', fieldOptions.BLOCK_SIZE.toString());
	                            }
	                            break;
	                        case VectorAlgorithms.HNSW:
	                            if (fieldOptions.M) {
	                                args.push('M', fieldOptions.M.toString());
	                            }
	                            if (fieldOptions.EF_CONSTRUCTION) {
	                                args.push('EF_CONSTRUCTION', fieldOptions.EF_CONSTRUCTION.toString());
	                            }
	                            if (fieldOptions.EF_RUNTIME) {
	                                args.push('EF_RUNTIME', fieldOptions.EF_RUNTIME.toString());
	                            }
	                            break;
	                    }
	                });
	                break;
	            case SchemaFieldTypes.GEOSHAPE:
	                if (fieldOptions.COORD_SYSTEM !== undefined) {
	                    args.push('COORD_SYSTEM', fieldOptions.COORD_SYSTEM);
	                }
	                pushCommonFieldArguments(args, fieldOptions);
	                break;
	        }
	        if (fieldOptions.INDEXMISSING) {
	            args.push('INDEXMISSING');
	        }
	    }
	}
	commands$1.pushSchema = pushSchema;
	function pushParamsArgs(args, params) {
	    if (params) {
	        const enrties = Object.entries(params);
	        args.push('PARAMS', (enrties.length * 2).toString());
	        for (const [key, value] of enrties) {
	            args.push(key, typeof value === 'number' ? value.toString() : value);
	        }
	    }
	    return args;
	}
	commands$1.pushParamsArgs = pushParamsArgs;
	function pushSearchOptions(args, options) {
	    if (options?.VERBATIM) {
	        args.push('VERBATIM');
	    }
	    if (options?.NOSTOPWORDS) {
	        args.push('NOSTOPWORDS');
	    }
	    // if (options?.WITHSCORES) {
	    //     args.push('WITHSCORES');
	    // }
	    // if (options?.WITHPAYLOADS) {
	    //     args.push('WITHPAYLOADS');
	    // }
	    (0, generic_transformers_1.pushOptionalVerdictArgument)(args, 'INKEYS', options?.INKEYS);
	    (0, generic_transformers_1.pushOptionalVerdictArgument)(args, 'INFIELDS', options?.INFIELDS);
	    (0, generic_transformers_1.pushOptionalVerdictArgument)(args, 'RETURN', options?.RETURN);
	    if (options?.SUMMARIZE) {
	        args.push('SUMMARIZE');
	        if (typeof options.SUMMARIZE === 'object') {
	            if (options.SUMMARIZE.FIELDS) {
	                args.push('FIELDS');
	                (0, generic_transformers_1.pushVerdictArgument)(args, options.SUMMARIZE.FIELDS);
	            }
	            if (options.SUMMARIZE.FRAGS) {
	                args.push('FRAGS', options.SUMMARIZE.FRAGS.toString());
	            }
	            if (options.SUMMARIZE.LEN) {
	                args.push('LEN', options.SUMMARIZE.LEN.toString());
	            }
	            if (options.SUMMARIZE.SEPARATOR) {
	                args.push('SEPARATOR', options.SUMMARIZE.SEPARATOR);
	            }
	        }
	    }
	    if (options?.HIGHLIGHT) {
	        args.push('HIGHLIGHT');
	        if (typeof options.HIGHLIGHT === 'object') {
	            if (options.HIGHLIGHT.FIELDS) {
	                args.push('FIELDS');
	                (0, generic_transformers_1.pushVerdictArgument)(args, options.HIGHLIGHT.FIELDS);
	            }
	            if (options.HIGHLIGHT.TAGS) {
	                args.push('TAGS', options.HIGHLIGHT.TAGS.open, options.HIGHLIGHT.TAGS.close);
	            }
	        }
	    }
	    if (options?.SLOP) {
	        args.push('SLOP', options.SLOP.toString());
	    }
	    if (options?.INORDER) {
	        args.push('INORDER');
	    }
	    if (options?.LANGUAGE) {
	        args.push('LANGUAGE', options.LANGUAGE);
	    }
	    if (options?.EXPANDER) {
	        args.push('EXPANDER', options.EXPANDER);
	    }
	    if (options?.SCORER) {
	        args.push('SCORER', options.SCORER);
	    }
	    // if (options?.EXPLAINSCORE) {
	    //     args.push('EXPLAINSCORE');
	    // }
	    // if (options?.PAYLOAD) {
	    //     args.push('PAYLOAD', options.PAYLOAD);
	    // }
	    if (options?.SORTBY) {
	        args.push('SORTBY');
	        pushSortByProperty(args, options.SORTBY);
	    }
	    // if (options?.MSORTBY) {
	    //     pushSortByArguments(args, 'MSORTBY', options.MSORTBY);
	    // }
	    if (options?.LIMIT) {
	        args.push('LIMIT', options.LIMIT.from.toString(), options.LIMIT.size.toString());
	    }
	    if (options?.PARAMS) {
	        pushParamsArgs(args, options.PARAMS);
	    }
	    if (options?.DIALECT) {
	        args.push('DIALECT', options.DIALECT.toString());
	    }
	    if (options?.RETURN?.length === 0) {
	        args.preserve = true;
	    }
	    if (options?.TIMEOUT !== undefined) {
	        args.push('TIMEOUT', options.TIMEOUT.toString());
	    }
	    return args;
	}
	commands$1.pushSearchOptions = pushSearchOptions;
	function transformProfile(reply) {
	    return {
	        totalProfileTime: reply[0][1],
	        parsingTime: reply[1][1],
	        pipelineCreationTime: reply[2][1],
	        iteratorsProfile: transformIterators(reply[3][1])
	    };
	}
	commands$1.transformProfile = transformProfile;
	function transformIterators(IteratorsProfile) {
	    var res = {};
	    for (let i = 0; i < IteratorsProfile.length; i += 2) {
	        const value = IteratorsProfile[i + 1];
	        switch (IteratorsProfile[i]) {
	            case 'Type':
	                res.type = value;
	                break;
	            case 'Counter':
	                res.counter = value;
	                break;
	            case 'Time':
	                res.time = value;
	                break;
	            case 'Query type':
	                res.queryType = value;
	                break;
	            case 'Child iterators':
	                res.childIterators = value.map(transformChildIterators);
	                break;
	        }
	    }
	    return res;
	}
	function transformChildIterators(IteratorsProfile) {
	    var res = {};
	    for (let i = 1; i < IteratorsProfile.length; i += 2) {
	        const value = IteratorsProfile[i + 1];
	        switch (IteratorsProfile[i]) {
	            case 'Type':
	                res.type = value;
	                break;
	            case 'Counter':
	                res.counter = value;
	                break;
	            case 'Time':
	                res.time = value;
	                break;
	            case 'Size':
	                res.size = value;
	                break;
	            case 'Term':
	                res.term = value;
	                break;
	            case 'Child iterators':
	                res.childIterators = value.map(transformChildIterators);
	                break;
	        }
	    }
	    return res;
	}
	return commands$1;
}

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AggregateSteps = exports.AggregateGroupByReducers = exports.VectorAlgorithms = exports.SchemaTextFieldPhonetics = exports.SchemaFieldTypes = exports.RedisSearchLanguages = exports.default = void 0;
	var commands_1 = requireCommands$1();
	Object.defineProperty(exports, "default", { enumerable: true, get: function () { return commands_1.default; } });
	var commands_2 = requireCommands$1();
	Object.defineProperty(exports, "RedisSearchLanguages", { enumerable: true, get: function () { return commands_2.RedisSearchLanguages; } });
	Object.defineProperty(exports, "SchemaFieldTypes", { enumerable: true, get: function () { return commands_2.SchemaFieldTypes; } });
	Object.defineProperty(exports, "SchemaTextFieldPhonetics", { enumerable: true, get: function () { return commands_2.SchemaTextFieldPhonetics; } });
	Object.defineProperty(exports, "VectorAlgorithms", { enumerable: true, get: function () { return commands_2.VectorAlgorithms; } });
	var AGGREGATE_1 = requireAGGREGATE();
	Object.defineProperty(exports, "AggregateGroupByReducers", { enumerable: true, get: function () { return AGGREGATE_1.AggregateGroupByReducers; } });
	Object.defineProperty(exports, "AggregateSteps", { enumerable: true, get: function () { return AGGREGATE_1.AggregateSteps; } }); 
} (dist$1));

var dist = {};

var commands = {};

var ADD = {};

var hasRequiredADD;

function requireADD () {
	if (hasRequiredADD) return ADD;
	hasRequiredADD = 1;
	Object.defineProperty(ADD, "__esModule", { value: true });
	ADD.transformArguments = ADD.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands();
	ADD.FIRST_KEY_INDEX = 1;
	function transformArguments(key, timestamp, value, options) {
	    const args = [
	        'TS.ADD',
	        key,
	        (0, _1.transformTimestampArgument)(timestamp),
	        value.toString()
	    ];
	    (0, _1.pushRetentionArgument)(args, options?.RETENTION);
	    (0, _1.pushEncodingArgument)(args, options?.ENCODING);
	    (0, _1.pushChunkSizeArgument)(args, options?.CHUNK_SIZE);
	    if (options?.ON_DUPLICATE) {
	        args.push('ON_DUPLICATE', options.ON_DUPLICATE);
	    }
	    (0, _1.pushLabelsArgument)(args, options?.LABELS);
	    (0, _1.pushIgnoreArgument)(args, options?.IGNORE);
	    return args;
	}
	ADD.transformArguments = transformArguments;
	return ADD;
}

var ALTER = {};

var hasRequiredALTER;

function requireALTER () {
	if (hasRequiredALTER) return ALTER;
	hasRequiredALTER = 1;
	Object.defineProperty(ALTER, "__esModule", { value: true });
	ALTER.transformArguments = ALTER.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands();
	ALTER.FIRST_KEY_INDEX = 1;
	function transformArguments(key, options) {
	    const args = ['TS.ALTER', key];
	    (0, _1.pushRetentionArgument)(args, options?.RETENTION);
	    (0, _1.pushChunkSizeArgument)(args, options?.CHUNK_SIZE);
	    (0, _1.pushDuplicatePolicy)(args, options?.DUPLICATE_POLICY);
	    (0, _1.pushLabelsArgument)(args, options?.LABELS);
	    (0, _1.pushIgnoreArgument)(args, options?.IGNORE);
	    return args;
	}
	ALTER.transformArguments = transformArguments;
	return ALTER;
}

var CREATE = {};

var hasRequiredCREATE;

function requireCREATE () {
	if (hasRequiredCREATE) return CREATE;
	hasRequiredCREATE = 1;
	Object.defineProperty(CREATE, "__esModule", { value: true });
	CREATE.transformArguments = CREATE.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands();
	CREATE.FIRST_KEY_INDEX = 1;
	function transformArguments(key, options) {
	    const args = ['TS.CREATE', key];
	    (0, _1.pushRetentionArgument)(args, options?.RETENTION);
	    (0, _1.pushEncodingArgument)(args, options?.ENCODING);
	    (0, _1.pushChunkSizeArgument)(args, options?.CHUNK_SIZE);
	    (0, _1.pushDuplicatePolicy)(args, options?.DUPLICATE_POLICY);
	    (0, _1.pushLabelsArgument)(args, options?.LABELS);
	    (0, _1.pushIgnoreArgument)(args, options?.IGNORE);
	    return args;
	}
	CREATE.transformArguments = transformArguments;
	return CREATE;
}

var CREATERULE = {};

Object.defineProperty(CREATERULE, "__esModule", { value: true });
CREATERULE.transformArguments = CREATERULE.FIRST_KEY_INDEX = void 0;
CREATERULE.FIRST_KEY_INDEX = 1;
function transformArguments$3(sourceKey, destinationKey, aggregationType, bucketDuration, alignTimestamp) {
    const args = [
        'TS.CREATERULE',
        sourceKey,
        destinationKey,
        'AGGREGATION',
        aggregationType,
        bucketDuration.toString()
    ];
    if (alignTimestamp) {
        args.push(alignTimestamp.toString());
    }
    return args;
}
CREATERULE.transformArguments = transformArguments$3;

var DECRBY = {};

var hasRequiredDECRBY;

function requireDECRBY () {
	if (hasRequiredDECRBY) return DECRBY;
	hasRequiredDECRBY = 1;
	Object.defineProperty(DECRBY, "__esModule", { value: true });
	DECRBY.transformArguments = DECRBY.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands();
	DECRBY.FIRST_KEY_INDEX = 1;
	function transformArguments(key, value, options) {
	    return (0, _1.transformIncrDecrArguments)('TS.DECRBY', key, value, options);
	}
	DECRBY.transformArguments = transformArguments;
	return DECRBY;
}

var DEL = {};

var hasRequiredDEL;

function requireDEL () {
	if (hasRequiredDEL) return DEL;
	hasRequiredDEL = 1;
	Object.defineProperty(DEL, "__esModule", { value: true });
	DEL.transformArguments = DEL.FIRTS_KEY_INDEX = void 0;
	const _1 = requireCommands();
	DEL.FIRTS_KEY_INDEX = 1;
	function transformArguments(key, fromTimestamp, toTimestamp) {
	    return [
	        'TS.DEL',
	        key,
	        (0, _1.transformTimestampArgument)(fromTimestamp),
	        (0, _1.transformTimestampArgument)(toTimestamp)
	    ];
	}
	DEL.transformArguments = transformArguments;
	return DEL;
}

var DELETERULE = {};

Object.defineProperty(DELETERULE, "__esModule", { value: true });
DELETERULE.transformArguments = DELETERULE.FIRST_KEY_INDEX = void 0;
DELETERULE.FIRST_KEY_INDEX = 1;
function transformArguments$2(sourceKey, destinationKey) {
    return [
        'TS.DELETERULE',
        sourceKey,
        destinationKey
    ];
}
DELETERULE.transformArguments = transformArguments$2;

var GET = {};

var hasRequiredGET;

function requireGET () {
	if (hasRequiredGET) return GET;
	hasRequiredGET = 1;
	Object.defineProperty(GET, "__esModule", { value: true });
	GET.transformReply = GET.transformArguments = GET.IS_READ_ONLY = GET.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands();
	GET.FIRST_KEY_INDEX = 1;
	GET.IS_READ_ONLY = true;
	function transformArguments(key, options) {
	    return (0, _1.pushLatestArgument)(['TS.GET', key], options?.LATEST);
	}
	GET.transformArguments = transformArguments;
	function transformReply(reply) {
	    if (reply.length === 0)
	        return null;
	    return (0, _1.transformSampleReply)(reply);
	}
	GET.transformReply = transformReply;
	return GET;
}

var INCRBY = {};

var hasRequiredINCRBY;

function requireINCRBY () {
	if (hasRequiredINCRBY) return INCRBY;
	hasRequiredINCRBY = 1;
	Object.defineProperty(INCRBY, "__esModule", { value: true });
	INCRBY.transformArguments = INCRBY.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands();
	INCRBY.FIRST_KEY_INDEX = 1;
	function transformArguments(key, value, options) {
	    return (0, _1.transformIncrDecrArguments)('TS.INCRBY', key, value, options);
	}
	INCRBY.transformArguments = transformArguments;
	return INCRBY;
}

var INFO_DEBUG = {};

var INFO = {};

Object.defineProperty(INFO, "__esModule", { value: true });
INFO.transformReply = INFO.transformArguments = INFO.IS_READ_ONLY = INFO.FIRST_KEY_INDEX = void 0;
INFO.FIRST_KEY_INDEX = 1;
INFO.IS_READ_ONLY = true;
function transformArguments$1(key) {
    return ['TS.INFO', key];
}
INFO.transformArguments = transformArguments$1;
function transformReply(reply) {
    return {
        totalSamples: reply[1],
        memoryUsage: reply[3],
        firstTimestamp: reply[5],
        lastTimestamp: reply[7],
        retentionTime: reply[9],
        chunkCount: reply[11],
        chunkSize: reply[13],
        chunkType: reply[15],
        duplicatePolicy: reply[17],
        labels: reply[19].map(([name, value]) => ({
            name,
            value
        })),
        sourceKey: reply[21],
        rules: reply[23].map(([key, timeBucket, aggregationType]) => ({
            key,
            timeBucket,
            aggregationType
        }))
    };
}
INFO.transformReply = transformReply;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = exports.IS_READ_ONLY = void 0;
	const INFO_1 = INFO;
	var INFO_2 = INFO;
	Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function () { return INFO_2.IS_READ_ONLY; } });
	Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function () { return INFO_2.FIRST_KEY_INDEX; } });
	function transformArguments(key) {
	    const args = (0, INFO_1.transformArguments)(key);
	    args.push('DEBUG');
	    return args;
	}
	exports.transformArguments = transformArguments;
	function transformReply(rawReply) {
	    const reply = (0, INFO_1.transformReply)(rawReply);
	    reply.keySelfName = rawReply[25];
	    reply.chunks = rawReply[27].map(chunk => ({
	        startTimestamp: chunk[1],
	        endTimestamp: chunk[3],
	        samples: chunk[5],
	        size: chunk[7],
	        bytesPerSample: chunk[9]
	    }));
	    return reply;
	}
	exports.transformReply = transformReply; 
} (INFO_DEBUG));

var MADD = {};

var hasRequiredMADD;

function requireMADD () {
	if (hasRequiredMADD) return MADD;
	hasRequiredMADD = 1;
	Object.defineProperty(MADD, "__esModule", { value: true });
	MADD.transformArguments = MADD.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands();
	MADD.FIRST_KEY_INDEX = 1;
	function transformArguments(toAdd) {
	    const args = ['TS.MADD'];
	    for (const { key, timestamp, value } of toAdd) {
	        args.push(key, (0, _1.transformTimestampArgument)(timestamp), value.toString());
	    }
	    return args;
	}
	MADD.transformArguments = transformArguments;
	return MADD;
}

var MGET = {};

var hasRequiredMGET;

function requireMGET () {
	if (hasRequiredMGET) return MGET;
	hasRequiredMGET = 1;
	Object.defineProperty(MGET, "__esModule", { value: true });
	MGET.transformReply = MGET.transformArguments = MGET.IS_READ_ONLY = void 0;
	const _1 = requireCommands();
	MGET.IS_READ_ONLY = true;
	function transformArguments(filter, options) {
	    const args = (0, _1.pushLatestArgument)(['TS.MGET'], options?.LATEST);
	    return (0, _1.pushFilterArgument)(args, filter);
	}
	MGET.transformArguments = transformArguments;
	function transformReply(reply) {
	    return reply.map(([key, _, sample]) => ({
	        key,
	        sample: (0, _1.transformSampleReply)(sample)
	    }));
	}
	MGET.transformReply = transformReply;
	return MGET;
}

var MGET_WITHLABELS = {};

var hasRequiredMGET_WITHLABELS;

function requireMGET_WITHLABELS () {
	if (hasRequiredMGET_WITHLABELS) return MGET_WITHLABELS;
	hasRequiredMGET_WITHLABELS = 1;
	Object.defineProperty(MGET_WITHLABELS, "__esModule", { value: true });
	MGET_WITHLABELS.transformReply = MGET_WITHLABELS.transformArguments = MGET_WITHLABELS.IS_READ_ONLY = void 0;
	const _1 = requireCommands();
	MGET_WITHLABELS.IS_READ_ONLY = true;
	function transformArguments(filter, options) {
	    const args = (0, _1.pushWithLabelsArgument)(['TS.MGET'], options?.SELECTED_LABELS);
	    return (0, _1.pushFilterArgument)(args, filter);
	}
	MGET_WITHLABELS.transformArguments = transformArguments;
	function transformReply(reply) {
	    return reply.map(([key, labels, sample]) => ({
	        key,
	        labels: (0, _1.transformLablesReply)(labels),
	        sample: (0, _1.transformSampleReply)(sample)
	    }));
	}
	MGET_WITHLABELS.transformReply = transformReply;
	return MGET_WITHLABELS;
}

var QUERYINDEX = {};

Object.defineProperty(QUERYINDEX, "__esModule", { value: true });
QUERYINDEX.transformArguments = QUERYINDEX.IS_READ_ONLY = void 0;
const generic_transformers_1 = genericTransformers;
QUERYINDEX.IS_READ_ONLY = true;
function transformArguments(filter) {
    return (0, generic_transformers_1.pushVerdictArguments)(['TS.QUERYINDEX'], filter);
}
QUERYINDEX.transformArguments = transformArguments;

var RANGE = {};

var hasRequiredRANGE;

function requireRANGE () {
	if (hasRequiredRANGE) return RANGE;
	hasRequiredRANGE = 1;
	Object.defineProperty(RANGE, "__esModule", { value: true });
	RANGE.transformReply = RANGE.transformArguments = RANGE.IS_READ_ONLY = RANGE.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands();
	RANGE.FIRST_KEY_INDEX = 1;
	RANGE.IS_READ_ONLY = true;
	function transformArguments(key, fromTimestamp, toTimestamp, options) {
	    return (0, _1.pushRangeArguments)(['TS.RANGE', key], fromTimestamp, toTimestamp, options);
	}
	RANGE.transformArguments = transformArguments;
	function transformReply(reply) {
	    return (0, _1.transformRangeReply)(reply);
	}
	RANGE.transformReply = transformReply;
	return RANGE;
}

var REVRANGE = {};

var hasRequiredREVRANGE;

function requireREVRANGE () {
	if (hasRequiredREVRANGE) return REVRANGE;
	hasRequiredREVRANGE = 1;
	Object.defineProperty(REVRANGE, "__esModule", { value: true });
	REVRANGE.transformReply = REVRANGE.transformArguments = REVRANGE.IS_READ_ONLY = REVRANGE.FIRST_KEY_INDEX = void 0;
	const _1 = requireCommands();
	REVRANGE.FIRST_KEY_INDEX = 1;
	REVRANGE.IS_READ_ONLY = true;
	function transformArguments(key, fromTimestamp, toTimestamp, options) {
	    return (0, _1.pushRangeArguments)(['TS.REVRANGE', key], fromTimestamp, toTimestamp, options);
	}
	REVRANGE.transformArguments = transformArguments;
	function transformReply(reply) {
	    return (0, _1.transformRangeReply)(reply);
	}
	REVRANGE.transformReply = transformReply;
	return REVRANGE;
}

var MRANGE = {};

var hasRequiredMRANGE;

function requireMRANGE () {
	if (hasRequiredMRANGE) return MRANGE;
	hasRequiredMRANGE = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
		const _1 = requireCommands();
		exports.IS_READ_ONLY = true;
		function transformArguments(fromTimestamp, toTimestamp, filters, options) {
		    return (0, _1.pushMRangeArguments)(['TS.MRANGE'], fromTimestamp, toTimestamp, filters, options);
		}
		exports.transformArguments = transformArguments;
		var _2 = requireCommands();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _2.transformMRangeReply; } }); 
	} (MRANGE));
	return MRANGE;
}

var MRANGE_WITHLABELS = {};

var hasRequiredMRANGE_WITHLABELS;

function requireMRANGE_WITHLABELS () {
	if (hasRequiredMRANGE_WITHLABELS) return MRANGE_WITHLABELS;
	hasRequiredMRANGE_WITHLABELS = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
		const _1 = requireCommands();
		exports.IS_READ_ONLY = true;
		function transformArguments(fromTimestamp, toTimestamp, filters, options) {
		    return (0, _1.pushMRangeWithLabelsArguments)(['TS.MRANGE'], fromTimestamp, toTimestamp, filters, options);
		}
		exports.transformArguments = transformArguments;
		var _2 = requireCommands();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _2.transformMRangeWithLabelsReply; } }); 
	} (MRANGE_WITHLABELS));
	return MRANGE_WITHLABELS;
}

var MREVRANGE = {};

var hasRequiredMREVRANGE;

function requireMREVRANGE () {
	if (hasRequiredMREVRANGE) return MREVRANGE;
	hasRequiredMREVRANGE = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
		const _1 = requireCommands();
		exports.IS_READ_ONLY = true;
		function transformArguments(fromTimestamp, toTimestamp, filters, options) {
		    return (0, _1.pushMRangeArguments)(['TS.MREVRANGE'], fromTimestamp, toTimestamp, filters, options);
		}
		exports.transformArguments = transformArguments;
		var _2 = requireCommands();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _2.transformMRangeReply; } }); 
	} (MREVRANGE));
	return MREVRANGE;
}

var MREVRANGE_WITHLABELS = {};

var hasRequiredMREVRANGE_WITHLABELS;

function requireMREVRANGE_WITHLABELS () {
	if (hasRequiredMREVRANGE_WITHLABELS) return MREVRANGE_WITHLABELS;
	hasRequiredMREVRANGE_WITHLABELS = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
		const _1 = requireCommands();
		exports.IS_READ_ONLY = true;
		function transformArguments(fromTimestamp, toTimestamp, filters, options) {
		    return (0, _1.pushMRangeWithLabelsArguments)(['TS.MREVRANGE'], fromTimestamp, toTimestamp, filters, options);
		}
		exports.transformArguments = transformArguments;
		var _2 = requireCommands();
		Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return _2.transformMRangeWithLabelsReply; } }); 
	} (MREVRANGE_WITHLABELS));
	return MREVRANGE_WITHLABELS;
}

var hasRequiredCommands;

function requireCommands () {
	if (hasRequiredCommands) return commands;
	hasRequiredCommands = 1;
	Object.defineProperty(commands, "__esModule", { value: true });
	commands.pushLatestArgument = commands.transformMRangeWithLabelsReply = commands.transformMRangeReply = commands.transformRangeReply = commands.pushMRangeWithLabelsArguments = commands.pushWithLabelsArgument = commands.pushMRangeArguments = commands.pushFilterArgument = commands.pushMRangeGroupByArguments = commands.pushRangeArguments = commands.TimeSeriesBucketTimestamp = commands.transformSampleReply = commands.transformIncrDecrArguments = commands.pushLabelsArgument = commands.transformLablesReply = commands.pushDuplicatePolicy = commands.pushChunkSizeArgument = commands.pushEncodingArgument = commands.TimeSeriesEncoding = commands.pushRetentionArgument = commands.pushIgnoreArgument = commands.transformTimestampArgument = commands.TimeSeriesReducers = commands.TimeSeriesDuplicatePolicies = commands.TimeSeriesAggregationType = void 0;
	const ADD = requireADD();
	const ALTER = requireALTER();
	const CREATE = requireCREATE();
	const CREATERULE$1 = CREATERULE;
	const DECRBY = requireDECRBY();
	const DEL = requireDEL();
	const DELETERULE$1 = DELETERULE;
	const GET = requireGET();
	const INCRBY = requireINCRBY();
	const INFO_DEBUG$1 = INFO_DEBUG;
	const INFO$1 = INFO;
	const MADD = requireMADD();
	const MGET = requireMGET();
	const MGET_WITHLABELS = requireMGET_WITHLABELS();
	const QUERYINDEX$1 = QUERYINDEX;
	const RANGE = requireRANGE();
	const REVRANGE = requireREVRANGE();
	const MRANGE = requireMRANGE();
	const MRANGE_WITHLABELS = requireMRANGE_WITHLABELS();
	const MREVRANGE = requireMREVRANGE();
	const MREVRANGE_WITHLABELS = requireMREVRANGE_WITHLABELS();
	const generic_transformers_1 = genericTransformers;
	commands.default = {
	    ADD,
	    add: ADD,
	    ALTER,
	    alter: ALTER,
	    CREATE,
	    create: CREATE,
	    CREATERULE: CREATERULE$1,
	    createRule: CREATERULE$1,
	    DECRBY,
	    decrBy: DECRBY,
	    DEL,
	    del: DEL,
	    DELETERULE: DELETERULE$1,
	    deleteRule: DELETERULE$1,
	    GET,
	    get: GET,
	    INCRBY,
	    incrBy: INCRBY,
	    INFO_DEBUG: INFO_DEBUG$1,
	    infoDebug: INFO_DEBUG$1,
	    INFO: INFO$1,
	    info: INFO$1,
	    MADD,
	    mAdd: MADD,
	    MGET,
	    mGet: MGET,
	    MGET_WITHLABELS,
	    mGetWithLabels: MGET_WITHLABELS,
	    QUERYINDEX: QUERYINDEX$1,
	    queryIndex: QUERYINDEX$1,
	    RANGE,
	    range: RANGE,
	    REVRANGE,
	    revRange: REVRANGE,
	    MRANGE,
	    mRange: MRANGE,
	    MRANGE_WITHLABELS,
	    mRangeWithLabels: MRANGE_WITHLABELS,
	    MREVRANGE,
	    mRevRange: MREVRANGE,
	    MREVRANGE_WITHLABELS,
	    mRevRangeWithLabels: MREVRANGE_WITHLABELS
	};
	var TimeSeriesAggregationType;
	(function (TimeSeriesAggregationType) {
	    TimeSeriesAggregationType["AVG"] = "AVG";
	    // @deprecated
	    TimeSeriesAggregationType["AVERAGE"] = "AVG";
	    TimeSeriesAggregationType["FIRST"] = "FIRST";
	    TimeSeriesAggregationType["LAST"] = "LAST";
	    TimeSeriesAggregationType["MIN"] = "MIN";
	    // @deprecated
	    TimeSeriesAggregationType["MINIMUM"] = "MIN";
	    TimeSeriesAggregationType["MAX"] = "MAX";
	    // @deprecated
	    TimeSeriesAggregationType["MAXIMUM"] = "MAX";
	    TimeSeriesAggregationType["SUM"] = "SUM";
	    TimeSeriesAggregationType["RANGE"] = "RANGE";
	    TimeSeriesAggregationType["COUNT"] = "COUNT";
	    TimeSeriesAggregationType["STD_P"] = "STD.P";
	    TimeSeriesAggregationType["STD_S"] = "STD.S";
	    TimeSeriesAggregationType["VAR_P"] = "VAR.P";
	    TimeSeriesAggregationType["VAR_S"] = "VAR.S";
	    TimeSeriesAggregationType["TWA"] = "TWA";
	})(TimeSeriesAggregationType || (commands.TimeSeriesAggregationType = TimeSeriesAggregationType = {}));
	var TimeSeriesDuplicatePolicies;
	(function (TimeSeriesDuplicatePolicies) {
	    TimeSeriesDuplicatePolicies["BLOCK"] = "BLOCK";
	    TimeSeriesDuplicatePolicies["FIRST"] = "FIRST";
	    TimeSeriesDuplicatePolicies["LAST"] = "LAST";
	    TimeSeriesDuplicatePolicies["MIN"] = "MIN";
	    TimeSeriesDuplicatePolicies["MAX"] = "MAX";
	    TimeSeriesDuplicatePolicies["SUM"] = "SUM";
	})(TimeSeriesDuplicatePolicies || (commands.TimeSeriesDuplicatePolicies = TimeSeriesDuplicatePolicies = {}));
	var TimeSeriesReducers;
	(function (TimeSeriesReducers) {
	    TimeSeriesReducers["AVG"] = "AVG";
	    TimeSeriesReducers["SUM"] = "SUM";
	    TimeSeriesReducers["MIN"] = "MIN";
	    // @deprecated
	    TimeSeriesReducers["MINIMUM"] = "MIN";
	    TimeSeriesReducers["MAX"] = "MAX";
	    // @deprecated
	    TimeSeriesReducers["MAXIMUM"] = "MAX";
	    TimeSeriesReducers["RANGE"] = "range";
	    TimeSeriesReducers["COUNT"] = "COUNT";
	    TimeSeriesReducers["STD_P"] = "STD.P";
	    TimeSeriesReducers["STD_S"] = "STD.S";
	    TimeSeriesReducers["VAR_P"] = "VAR.P";
	    TimeSeriesReducers["VAR_S"] = "VAR.S";
	})(TimeSeriesReducers || (commands.TimeSeriesReducers = TimeSeriesReducers = {}));
	function transformTimestampArgument(timestamp) {
	    if (typeof timestamp === 'string')
	        return timestamp;
	    return (typeof timestamp === 'number' ?
	        timestamp :
	        timestamp.getTime()).toString();
	}
	commands.transformTimestampArgument = transformTimestampArgument;
	function pushIgnoreArgument(args, ignore) {
	    if (ignore !== undefined) {
	        args.push('IGNORE', ignore.MAX_TIME_DIFF.toString(), ignore.MAX_VAL_DIFF.toString());
	    }
	}
	commands.pushIgnoreArgument = pushIgnoreArgument;
	function pushRetentionArgument(args, retention) {
	    if (retention !== undefined) {
	        args.push('RETENTION', retention.toString());
	    }
	    return args;
	}
	commands.pushRetentionArgument = pushRetentionArgument;
	var TimeSeriesEncoding;
	(function (TimeSeriesEncoding) {
	    TimeSeriesEncoding["COMPRESSED"] = "COMPRESSED";
	    TimeSeriesEncoding["UNCOMPRESSED"] = "UNCOMPRESSED";
	})(TimeSeriesEncoding || (commands.TimeSeriesEncoding = TimeSeriesEncoding = {}));
	function pushEncodingArgument(args, encoding) {
	    if (encoding !== undefined) {
	        args.push('ENCODING', encoding);
	    }
	    return args;
	}
	commands.pushEncodingArgument = pushEncodingArgument;
	function pushChunkSizeArgument(args, chunkSize) {
	    if (chunkSize !== undefined) {
	        args.push('CHUNK_SIZE', chunkSize.toString());
	    }
	    return args;
	}
	commands.pushChunkSizeArgument = pushChunkSizeArgument;
	function pushDuplicatePolicy(args, duplicatePolicy) {
	    if (duplicatePolicy !== undefined) {
	        args.push('DUPLICATE_POLICY', duplicatePolicy);
	    }
	    return args;
	}
	commands.pushDuplicatePolicy = pushDuplicatePolicy;
	function transformLablesReply(reply) {
	    const labels = {};
	    for (const [key, value] of reply) {
	        labels[key] = value;
	    }
	    return labels;
	}
	commands.transformLablesReply = transformLablesReply;
	function pushLabelsArgument(args, labels) {
	    if (labels) {
	        args.push('LABELS');
	        for (const [label, value] of Object.entries(labels)) {
	            args.push(label, value);
	        }
	    }
	    return args;
	}
	commands.pushLabelsArgument = pushLabelsArgument;
	function transformIncrDecrArguments(command, key, value, options) {
	    const args = [
	        command,
	        key,
	        value.toString()
	    ];
	    if (options?.TIMESTAMP !== undefined && options?.TIMESTAMP !== null) {
	        args.push('TIMESTAMP', transformTimestampArgument(options.TIMESTAMP));
	    }
	    pushRetentionArgument(args, options?.RETENTION);
	    if (options?.UNCOMPRESSED) {
	        args.push('UNCOMPRESSED');
	    }
	    pushChunkSizeArgument(args, options?.CHUNK_SIZE);
	    pushLabelsArgument(args, options?.LABELS);
	    return args;
	}
	commands.transformIncrDecrArguments = transformIncrDecrArguments;
	function transformSampleReply(reply) {
	    return {
	        timestamp: reply[0],
	        value: Number(reply[1])
	    };
	}
	commands.transformSampleReply = transformSampleReply;
	var TimeSeriesBucketTimestamp;
	(function (TimeSeriesBucketTimestamp) {
	    TimeSeriesBucketTimestamp["LOW"] = "-";
	    TimeSeriesBucketTimestamp["HIGH"] = "+";
	    TimeSeriesBucketTimestamp["MID"] = "~";
	})(TimeSeriesBucketTimestamp || (commands.TimeSeriesBucketTimestamp = TimeSeriesBucketTimestamp = {}));
	function pushRangeArguments(args, fromTimestamp, toTimestamp, options) {
	    args.push(transformTimestampArgument(fromTimestamp), transformTimestampArgument(toTimestamp));
	    pushLatestArgument(args, options?.LATEST);
	    if (options?.FILTER_BY_TS) {
	        args.push('FILTER_BY_TS');
	        for (const ts of options.FILTER_BY_TS) {
	            args.push(transformTimestampArgument(ts));
	        }
	    }
	    if (options?.FILTER_BY_VALUE) {
	        args.push('FILTER_BY_VALUE', options.FILTER_BY_VALUE.min.toString(), options.FILTER_BY_VALUE.max.toString());
	    }
	    if (options?.COUNT) {
	        args.push('COUNT', options.COUNT.toString());
	    }
	    if (options?.ALIGN) {
	        args.push('ALIGN', transformTimestampArgument(options.ALIGN));
	    }
	    if (options?.AGGREGATION) {
	        args.push('AGGREGATION', options.AGGREGATION.type, transformTimestampArgument(options.AGGREGATION.timeBucket));
	        if (options.AGGREGATION.BUCKETTIMESTAMP) {
	            args.push('BUCKETTIMESTAMP', options.AGGREGATION.BUCKETTIMESTAMP);
	        }
	        if (options.AGGREGATION.EMPTY) {
	            args.push('EMPTY');
	        }
	    }
	    return args;
	}
	commands.pushRangeArguments = pushRangeArguments;
	function pushMRangeGroupByArguments(args, groupBy) {
	    if (groupBy) {
	        args.push('GROUPBY', groupBy.label, 'REDUCE', groupBy.reducer);
	    }
	    return args;
	}
	commands.pushMRangeGroupByArguments = pushMRangeGroupByArguments;
	function pushFilterArgument(args, filter) {
	    args.push('FILTER');
	    return (0, generic_transformers_1.pushVerdictArguments)(args, filter);
	}
	commands.pushFilterArgument = pushFilterArgument;
	function pushMRangeArguments(args, fromTimestamp, toTimestamp, filter, options) {
	    args = pushRangeArguments(args, fromTimestamp, toTimestamp, options);
	    args = pushFilterArgument(args, filter);
	    return pushMRangeGroupByArguments(args, options?.GROUPBY);
	}
	commands.pushMRangeArguments = pushMRangeArguments;
	function pushWithLabelsArgument(args, selectedLabels) {
	    if (!selectedLabels) {
	        args.push('WITHLABELS');
	    }
	    else {
	        args.push('SELECTED_LABELS');
	        args = (0, generic_transformers_1.pushVerdictArguments)(args, selectedLabels);
	    }
	    return args;
	}
	commands.pushWithLabelsArgument = pushWithLabelsArgument;
	function pushMRangeWithLabelsArguments(args, fromTimestamp, toTimestamp, filter, options) {
	    args = pushRangeArguments(args, fromTimestamp, toTimestamp, options);
	    args = pushWithLabelsArgument(args, options?.SELECTED_LABELS);
	    args = pushFilterArgument(args, filter);
	    return pushMRangeGroupByArguments(args, options?.GROUPBY);
	}
	commands.pushMRangeWithLabelsArguments = pushMRangeWithLabelsArguments;
	function transformRangeReply(reply) {
	    return reply.map(transformSampleReply);
	}
	commands.transformRangeReply = transformRangeReply;
	function transformMRangeReply(reply) {
	    const args = [];
	    for (const [key, _, sample] of reply) {
	        args.push({
	            key,
	            samples: sample.map(transformSampleReply)
	        });
	    }
	    return args;
	}
	commands.transformMRangeReply = transformMRangeReply;
	function transformMRangeWithLabelsReply(reply) {
	    const args = [];
	    for (const [key, labels, samples] of reply) {
	        args.push({
	            key,
	            labels: transformLablesReply(labels),
	            samples: samples.map(transformSampleReply)
	        });
	    }
	    return args;
	}
	commands.transformMRangeWithLabelsReply = transformMRangeWithLabelsReply;
	function pushLatestArgument(args, latest) {
	    if (latest) {
	        args.push('LATEST');
	    }
	    return args;
	}
	commands.pushLatestArgument = pushLatestArgument;
	return commands;
}

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TimeSeriesBucketTimestamp = exports.TimeSeriesReducers = exports.TimeSeriesAggregationType = exports.TimeSeriesEncoding = exports.TimeSeriesDuplicatePolicies = exports.default = void 0;
	var commands_1 = requireCommands();
	Object.defineProperty(exports, "default", { enumerable: true, get: function () { return commands_1.default; } });
	var commands_2 = requireCommands();
	Object.defineProperty(exports, "TimeSeriesDuplicatePolicies", { enumerable: true, get: function () { return commands_2.TimeSeriesDuplicatePolicies; } });
	Object.defineProperty(exports, "TimeSeriesEncoding", { enumerable: true, get: function () { return commands_2.TimeSeriesEncoding; } });
	Object.defineProperty(exports, "TimeSeriesAggregationType", { enumerable: true, get: function () { return commands_2.TimeSeriesAggregationType; } });
	Object.defineProperty(exports, "TimeSeriesReducers", { enumerable: true, get: function () { return commands_2.TimeSeriesReducers; } });
	Object.defineProperty(exports, "TimeSeriesBucketTimestamp", { enumerable: true, get: function () { return commands_2.TimeSeriesBucketTimestamp; } }); 
} (dist));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createCluster = exports.createClient = void 0;
	const client_1 = dist$5;
	const bloom_1 = dist$4;
	const graph_1 = dist$3;
	const json_1 = dist$2;
	const search_1 = dist$1;
	const time_series_1 = dist;
	__exportStar(dist$5, exports);
	__exportStar(dist$4, exports);
	__exportStar(dist$3, exports);
	__exportStar(dist$2, exports);
	__exportStar(dist$1, exports);
	__exportStar(dist, exports);
	const modules = {
	    ...bloom_1.default,
	    graph: graph_1.default,
	    json: json_1.default,
	    ft: search_1.default,
	    ts: time_series_1.default
	};
	function createClient(options) {
	    return (0, client_1.createClient)({
	        ...options,
	        modules: {
	            ...modules,
	            ...options?.modules
	        }
	    });
	}
	exports.createClient = createClient;
	function createCluster(options) {
	    return (0, client_1.createCluster)({
	        ...options,
	        modules: {
	            ...modules,
	            ...options?.modules
	        }
	    });
	}
	exports.createCluster = createCluster; 
} (dist$6));

class redisC {
  client;
  constructor(host, port, username, password, db) {
    (async () => {
      if (username && password) {
        this.client = await dist$6.createClient({
          // `redis[s]://[[username][:password]@][host][:port][/db-number]`
          url: `redis://${username}:${password}@${host}:${port}/${db}`
        }).on("error", (err) => {
          console.log("Redis Client Error", err);
        }).connect();
      } else {
        this.client = await dist$6.createClient({
          url: `redis://${host}:${port}/${db}`
        }).on("error", (err) => {
          console.log("Redis Client Error", err);
        }).connect();
      }
      console.log("链接redis成功！");
    })();
  }
  async set(key, value) {
    await this.client.set(key, JSON.stringify(value));
  }
  async get(key) {
    const val = await this.client.get(key);
    return typeof val === "string" ? JSON.parse(val) : {};
  }
  quit() {
    this.client.disconnect();
  }
}
const redisUtils = redisC;

const { resolve } = require("path");
const request = require("./utils/request");
const threadsPools = require("./utils/asyncthreadsPools");
const TPools = new threadsPools(resolve(__dirname, "./utils/seprateThread.js"));
class feign {
  serverList;
  namespaceId;
  groupName;
  serviceName;
  // 参数缓存
  runData;
  refreshTime;
  threadsinitsum;
  username;
  password;
  accessToken;
  redisKey;
  redis;
  constructor({ serverList, namespace, groupName, serviceName, username, password, rhost = "127.0.0.1", rport = 6379, rusername = "", rpassword = "", rdb = 0 }) {
    this.groupName = groupName;
    this.serverList = serverList;
    this.namespaceId = namespace;
    this.serviceName = serviceName;
    this.runData = null;
    this.refreshTime = 20 * 60 * 1e3;
    this.threadsinitsum = 0;
    this.accessToken = "";
    this.username = username;
    this.password = password;
    this.redisKey = `${this.namespaceId}-${this.serviceName}-${this.groupName}`;
    this.redis = new redisUtils(rhost, rport, rusername, rpassword, rdb);
    this.threadsinit();
  }
  // 负载均衡算法
  async LoadBalance() {
    const info = await this.redis.get(this.redisKey);
    if (info.MicroServerList.length === 0) {
      throw new Error("[nacos-node-feign]:未获取微服务列表！");
    }
    let maxIndex = 0;
    let maxNum = 0;
    const healthyArr = info.MicroServerList.filter((item) => {
      return !item.nohealthy_;
    });
    if (healthyArr.length === 0) {
      throw new Error("[nacos-node-feign]:微服务已经全部宕机！");
    }
    for (const index in healthyArr) {
      if (Object.prototype.hasOwnProperty.call(healthyArr, index)) {
        let item = healthyArr[index];
        item.weightPercentage = ~~(item.weight * 100 / info.weightSum);
        if (!item.requestNum)
          item.requestNum = 0;
        if (info.acceptRequireSum === 0) {
          item.willRequirePercentage = ~~(100 / item.weightPercentage);
        } else {
          item.willRequirePercentage = ~~(item.requestNum * 100 / item.weightPercentage);
        }
        if (Number(index) === 0) {
          maxNum = item.willRequirePercentage;
          maxIndex = Number(index);
        }
        if (maxNum > item.willRequirePercentage) {
          maxNum = item.willRequirePercentage;
          maxIndex = Number(index);
        }
      }
    }
    healthyArr[maxIndex].requestNum += 1;
    healthyArr[maxIndex].AuthenticRequestNum += 1;
    info.acceptRequireSum += 1;
    info.AuthenticAcceptRequireSum += 1;
    await this.redis.set(this.redisKey, info);
    return { ...healthyArr[maxIndex] };
  }
  async getToken() {
    try {
      const res = await request({
        baseURL: this.serverList,
        url: "/nacos/v1/auth/login",
        method: "post",
        params: {
          username: this.username,
          password: this.password
        }
      });
      this.accessToken = res.accessToken;
    } catch (error) {
      if (error.code && error.code > 5e4) {
        throw new Error("[nacos-node-feign]:请检测你的nacos是否启动成功！");
      }
      throw error;
    }
  }
  async threadsinit() {
    if (this.username && this.password) {
      await this.getToken();
    }
    const info = await this.redis.get(this.redisKey);
    let res;
    try {
      res = await TPools.run(
        {
          baseURL: this.serverList,
          url: "/nacos/v1/ns/instance/list",
          params: {
            serviceName: this.serviceName,
            namespaceId: this.namespaceId,
            groupName: this.groupName,
            healthyOnly: true,
            "accessToken": this.accessToken
          }
        }
      );
    } catch (error) {
      throw new Error("[nacos-node-feign]:获取微服务列表失败，请检测你的nacos！");
    }
    if (res.status === 403) {
      throw new Error("[nacos-node-feign]: 请配置nacos用户名密码");
    }
    if (res.hosts.length === 0) {
      if (this.threadsinitsum > 10) {
        throw new Error("[nacos-node-feign]:请将微服务注册到nacos!");
      }
      setTimeout(() => {
        this.threadsinitsum += 1;
        this.threadsinit();
      }, 1e3);
      return;
    }
    this.threadsinitsum = 0;
    console.log("[nacos-node-feign]: 微服务列表获取成功！");
    const weightSum_ = res.hosts.map(
      (item) => item.weight
    ).reduce((prev, curr) => {
      return prev + curr;
    });
    let isUpdata = 0;
    if (weightSum_ != info.weightSum) {
      isUpdata += 1;
      info.weightSum = weightSum_;
    }
    if (info.acceptRequireSum != 0 && !info.acceptRequireSum) {
      info.acceptRequireSum = 0;
      info.AuthenticAcceptRequireSum = 0;
    }
    if (info.MicroServerList && info.MicroServerList.length > 0) {
      res.hosts.forEach((item) => {
        const val = info.MicroServerList.find((val2) => val2.instanceId === item.instanceId);
        if (val && val.nohealthy_) {
          isUpdata += 1;
          val.nohealthy_ = false;
        }
      });
      if (isUpdata > 0) {
        info.acceptRequireSum = 0;
        info.MicroServerList.forEach((item) => {
          item.requestNum = 0;
        });
      }
    } else {
      info.MicroServerList = [];
    }
    let change = false;
    if (info.MicroServerList.length != res.hosts.length) {
      change = true;
    }
    if (!change) {
      for (const key in info.MicroServerList) {
        if (Object.prototype.hasOwnProperty.call(info.MicroServerList, key)) {
          if (info.MicroServerList[key].instanceId !== res.hosts[key].instanceId) {
            change = true;
          }
        }
      }
    }
    if (change) {
      isUpdata += 1;
      info.acceptRequireSum = 0;
      res.hosts.forEach((val) => {
        val.requestNum = 0;
        val.AuthenticRequestNum = 0;
        return val;
      });
      info.MicroServerList = res.hosts.map((item) => {
        const el = info.MicroServerList.find((val) => val.instanceId === item.instanceId);
        if (el) {
          el.requestNum = 0;
          return el;
        } else {
          return item;
        }
      });
    }
    if (isUpdata > 0) {
      await this.redis.set(this.redisKey, info);
    }
    setTimeout(() => {
      this.threadsinit();
    }, this.refreshTime);
  }
  async closeMircoServer({ ip, port }) {
    const info = await this.redis.get(this.redisKey);
    info.MicroServerList.forEach((el) => {
      if (el.ip == ip && el.port == port) {
        el.nohealthy_ = true;
      }
      return el;
    });
    await this.redis.set(this.redisKey, info);
    return this.run(this.runData);
  }
  async run({ url, params, data, method, timeout }) {
    this.runData = { url, params, data, method, timeout };
    const curMircoServer = await this.LoadBalance();
    return new Promise((resolve2) => {
      request({
        baseURL: `http://${curMircoServer.ip}:${curMircoServer.port}`,
        url,
        params,
        data,
        method,
        timeout
      }).then(
        (res) => {
          resolve2(res);
        },
        (err) => {
          if (err.code && err.code === 50002) {
            this.closeMircoServer(curMircoServer).then((res) => {
              resolve2(res);
            });
          } else {
            resolve2(err);
          }
        }
      );
    });
  }
}
const asyncGetFeign = ({ serverList, namespace = "public", groupName = "DEFAULT_GROUP", serviceName = "_NODE_", username, password, rhost = "192.168.10.135", rport = 6379, rusername = "", rpassword = "", rdb = 0 }) => {
  return new Promise((resolve2, reject) => {
    const feign_ = new feign({
      serverList,
      namespace,
      groupName,
      serviceName,
      username,
      password,
      rhost,
      rport,
      rusername,
      rpassword,
      rdb
    });
    resolve2(feign_);
  });
};

export { asyncGetFeign };
