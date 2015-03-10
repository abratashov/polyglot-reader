'use strict';

angular.module('polyglotReader')
  .factory('Translator', function ($resource) {
    return $resource('/translate/', {}, {'query':  {method:'GET', isArray: false}});
  });

//or https://glosbe.com/a-api