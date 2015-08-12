| [![Build Status](https://travis-ci.org/timblack1/hoodie-accountbar.svg?branch=master)](https://travis-ci.org/timblack1/hoodie-accountbar) | [![Coverage Status](https://coveralls.io/repos/timblack1/hoodie-accountbar/badge.svg?branch=master&service=github)](https://coveralls.io/github/timblack1/hoodie-accountbar?branch=master) | [![Dependency Status](https://david-dm.org/timblack1/hoodie-accountbar.svg)](https://david-dm.org/timblack1/hoodie-accountbar/master) | [![devDependency Status](https://david-dm.org/timblack1/hoodie-accountbar/master/dev-status.svg)](https://david-dm.org/timblack1/hoodie-accountbar/master#info=devDependencies) |
| --- | --- | --- | --- |
# hoodie-accountbar

A Polymer element providing an accountbar to manage user account actions in [Hoodie](http://hood.ie).

This element is still a work in progress.  Code for all of the functionality is present,
but not all of it is working correctly yet, as is described in the open issues on GitHub.

Online docs & demo are at http://timblack1.github.io/hoodie-accountbar/.

# Installation

    $ bower install --save hoodie-accountbar

# Usage

Import hoodie-accountbar into the `<head>` of your Polymer element or `elements.html` file:

```html
    <head>
      <link rel="import" href="../../hoodie-accountbar/hoodie-accountbar.html">
    </head>
```

Place the element where you would like it to appear in the context of your app:

```html
    <hoodie-accountbar></hoodie-accountbar>
```

Use Hoodie in your code:

```html
  <script>
  (function() {
    Polymer({
      attached:function(){
        this.async(function(){
          this.hoodie = document.querySelector('hoodie-accountbar').hoodie;
          var thiz = this;
          // Get selected_cgroups from a user preference
          this.hoodie.store.find('preferences', 'selected-cgroups')
          .then(function(selected_cgroups){
            thiz.selected_cgroups = selected_cgroups.cgroups;
          });
        });
      }
    });
  });
  </script>
```

# Development

Run the following commands to set up a development environment to improve hoodie-accountbar:

    $ bower install && npm install
    $ gulp serve

Navigate to http://localhost:3000/components/hoodie-accountbar/ to see the component's docs and demo.

# Integration tests

You can run the integration tests by navigating to http://localhost:3000/components/hoodie-accountbar/test