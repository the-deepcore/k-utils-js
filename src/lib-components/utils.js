import moment from 'moment'

const Utils = {
  isString: function(value){
    return (typeof value === "string")
  },
  isUndefined: function (value) {
    return (typeof value === 'undefined')
  },
  isUndefinedOrNull: function (value) {
    return (this.isUndefined(value) || value === null )
  },
  isEmpty: function(value) {
    if (this.isObject(value)) {
      // Object.keys({}).length === 0  |> true
      // Object.keys([]).length === 0  |> true
      return Object.keys(value).length === 0
    } else if (this.isString(value)) {
      return value.length === 0
    }
  },
  isNotEmpty: function (value) {
    return !this.isEmpty(value)
  },
  isBlank : function (value) {
    return this.isUndefinedOrNull(value) || this.isEmpty(value)
  },
  isFalsy : function (value) {
    return this.isBlank(value) || (value === false)
  },
  isTruthy : function(value) {
    return !this.isFalsy(value)
  },
  isUUID : function (value) {
    if (typeof value === "string") {
      return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value);
    } else {
      return false
    }
  },
  toUnderscore: function (value) {
    if (typeof value === "string") {
      return value.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();})
    } else {
      return value
    }
  },
  toLowerCamelCase: function(value){
    if (typeof value === "string") {
      return value.replace(/(_[a-z])/g, function($1){return $1.toUpperCase().replace('_', '');})
    } else {
      return value
    }
  },
  isObject: function(value) {
    return (typeof value === "object")
  },
  isArray: function(value) {
    //source : http://stackoverflow.com/questions/767486/how-do-you-check-if-a-variable-is-an-array-in-javascript
    return (value.constructor === Array)
  },
  isFunction: function(value) {

    return (typeof value === "function")
  },
  noop: function () {
  },
  getMaxOfArray:function(numArray) {
    return Math.max.apply(null, numArray);
  },
  compareStrings: function(a,b){
    return a.localeCompare(b)
  },

  compareNumbers: function(a,b) {
    return a - b
  },

  generateIntegerHashFromString: function(str) {
    //source https://github.com/darkskyapp/string-hash
    let hash = 5381,
      i    = str.length

    while(i)
      hash = (hash * 33) ^ str.charCodeAt(--i)

    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
     * integers. Since we want the results to be always positive, convert the
     * signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;

  },

  dateHasIsoFormat: function (str) {
    //equivalent to moment format YYYY-MM-DD
    return str.match(/^\d{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/)
  },

  dateTimeHasIsoFormat: function (str) {
    //equivalent to moment format YYYY-MM-DD HH:mm
    return str.match(/^\d{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01]) ([01][0-9]|2[0-3]):([0-5][0-9])$/)
  },

  dateTimeHasStrictISO8601Format: function (string) {
    return !moment(string, "YYYY-MM-DD HH:mm", true).isValid()
  },

  dateHasCustomFormat: function (str) {
    //equivalent to moment format D/M/YYYY
    return str.match(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/)
  },
  dateTimeHasCustomFormat: function (str) {
    //equivalent to moment format D/M/YYYY H:mm
    return str.match(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4} (0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/)
  },
  count:  (from = 0, to = 1, increment = 1, exclude = []) => {
    const array = [];
    for (let i = from; i <= to; i += increment) !exclude.includes(i) && array.push(i);
    return array;
  },

  compareBy: function(key) {

    return function compare(a, b) {
      if (a[key] < b[key] ) {
        return -1;
      }
      if (a[key] > b[key] ) {
        return 1;
      }

      return 0;
    }

  },

  dotify: function (str) {
    return (str.replace(/\[/g, '.').replace(/]/g,''))
  }
};

export default Utils
