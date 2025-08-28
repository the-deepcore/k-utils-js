# Developpement

This package has been initiated using https://github.com/team-innovation/vue-sfc-rollup

# Description

Utils components for kundigo projects

# Install the package

This package belongs to Kundigo and it's supposed to remain private and to be used in kundigo's projects. Add this package to `package.json` file

```js
"k-utils-js": "git+https://kundigo-ci:2381bb4546b420a55d62592192be6e65c201bf06@github.com/kundigo/k-utils-js.git#master",
```

Then import the components you need in your Rails App.

```js
import { Api, Utils} from 'k-utils-js'
```

## The `Api` utility

The `Api` utility is a simple wrapper around the popular [axios](https://github.com/axios/axios) library. This wrapper adds functionality common to all Kundigo apps.

### Default Headers

`Api`  sets by default the following headers
   
     X-CSRF-Token=ABC # this is read automatically from the
                      # corresponding meta-tag [*]
     Accept='application/json' # by default we are sending and 
                               # requesting JSON data
     X-Requested-With='XMLHttpRequest' # header needed for security reasons


[*] - see [Rails Security Guide](https://guides.rubyonrails.org/security.html#csrf-countermeasures)

### Cancellation

[Cancellation](https://github.com/axios/axios#cancellation) is turned on by default. This is a neat feature that allows us to cancel requests when we don't need the data anymore.

Typical use-case :
* Consider the scenario where we have a form component that sends data on the fly (as user types) and checks for validation errors 
* When the users types a new character, then we no longer care about the any on-going request because the data send in those requests is now obsolete
* therefore we can cancel all the previous requests and launch a new one, with the fresh data. 

Notes:

* Cancellation only happens in the front-end (in the JS code). On the server side, any request started will continue to be executed (but the returned results will be simply ignored by the front-end)
* Cancellation is scoped by url. In other words if request B follows request A, request A gets cancelled by request B if
    * if request A still ongoing
    * it request B has the same url as request A

### Delay period

We can also indicate if we want our request to be delayed in favor of a a future request. This is different from Cancellation:
* in cancellation, if request B follows request A then both request reach the server
* in delay, if request B follows request A during delay period then request A will never be triggered and will never reach the server

Notes
* the delay buffer is 300 ms (currently hardcoded)

### How to use

    Api.sendRequest({
        url: "/path/to/back/end",        // mandatory
        onSuccess: function              // callback to be executed if the request succeeds (mandatory)
        onError: function                // callback to be executed if the request fails (mandatory)
        delay: true/false                // optional (see above)
        // any other parameter is sent directly to axios instance
        // see [Axios Request Config documentation](https://github.com/axios/axios#request-config) 
        // for additional parameters
    });



## The `Utils` utility

This utility contains a bunch of small functions. 
See [utils.js](src/lib-components/utils.js)


# Updating

Updating the package:

* Make the updates to the components
* When adding new components, update `README.md` and `src/lib-components/index.js`
* Bump the version in `package.json`
* run the command `npm run build`
* commit and push changes

Get the updates in your Rails app

* Run :  `yarn upgrade k-form-js`
* Note : You can use another branch in you app, by replacing `master` with the name of the branch in the rails apps `package.json` 

# Testing

None :( 