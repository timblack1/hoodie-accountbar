| [![Build Status](https://travis-ci.org/timblack1/hoodie-accountbar.svg?branch=master)](https://travis-ci.org/timblack1/hoodie-accountbar) | [![Coverage Status](https://coveralls.io/repos/timblack1/hoodie-accountbar/badge.svg?branch=master&service=github)](https://coveralls.io/github/timblack1/hoodie-accountbar?branch=master) | [![Dependency Status](https://david-dm.org/timblack1/hoodie-accountbar.svg)](https://david-dm.org/timblack1/hoodie-accountbar/master) | [![devDependency Status](https://david-dm.org/timblack1/hoodie-accountbar/master/dev-status.svg)](https://david-dm.org/timblack1/hoodie-accountbar/master#info=devDependencies) |
| --- | --- | --- | --- |
# hoodie-accountbar

A Polymer element providing an accountbar to manage user account actions in [Hoodie](http://hood.ie).

This element is still a work in progress.  Code for all of the functionality is present,
but not all of it is working correctly yet, as is described in the open issues on GitHub.

Online docs & demo are at http://timblack1.github.io/hoodie-accountbar/.

# Installation

    $ bower install --save hoodie-accountbar
    $ # Optionally, install <hoodie-service> to provide the `hoodie` object
    $ bower install --save hoodie-service

# Usage

Import hoodie-accountbar (and optionally, hoodie-service) into the `<head>` 
of your Polymer element or `elements.html` file:

```html
    <head>
      <link rel="import" href="../../hoodie-service/hoodie-service.html">
      <link rel="import" href="../../hoodie-accountbar/hoodie-accountbar.html">
    </head>
```

Place the hoodie-accountbar (and optionally, hoodie-service) element where you 
would like it to appear in the context of your app:

```html
    <hoodie-service hoodie="{{hoodie}}"></hoodie-service>
    <hoodie-accountbar hoodie="{{hoodie}}"></hoodie-accountbar>
```

Use Hoodie in your code:

```html
    <script>
    (function() {
      Polymer({
        attached:function(){
          this.async(function(){
            var thiz = this;
            // Get selected_colors from a user preference
            this.hoodie.store.find('preferences', 'selected-colors')
            .then(function(selected_colors){
              thiz.selected_colors = selected_colors.colors;
            });
          });
        }
      });
    });
    </script>
```

# Development

Run the following commands to set up a development environment to improve hoodie-accountbar:

    $ npm install -g polyserve && npm install && bower install
    $ npm start

Navigate to [http://localhost:8080/components/hoodie-accountbar/](http://localhost:8080/components/hoodie-accountbar/)
to see the component's docs and demo.

# Integration tests

You can run the integration tests in one of two ways: 

1. From the command line:  Run `npm test`.

2. In your browser:  Run `npm start` and navigate to
[http://localhost:8080/components/hoodie-accountbar/test/index.html](http://localhost:8080/components/hoodie-accountbar/test/index.html).
