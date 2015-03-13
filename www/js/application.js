'use strict';

angular.module('polyglotReader', ['LocalStorageModule', 'angular-underscore', 'ngResource', 'ui.bootstrap']);

// https://www.googleapis.com/language/translate/v2?q=hello&target=ru&source=en&key={YOUR_API_KEY}