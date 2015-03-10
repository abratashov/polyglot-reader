angular.module('polyglotReader')
  .controller('MainCtrl', function ($scope, localStorageService, Translator) {

    $scope.dictionary = localStorageService.get('en_dict')

    $scope.addWord = function() {
      var word = $scope.word.toLowerCase().trim();
      if(word){
        var dictionary = localStorageService.get('en_dict');
        dictionary = dictionary || '';
        dictionary = dictionary + ',' + word;
        dictionary = normalizeWords(dictionary.split(','));
        localStorageService.set('en_dict', dictionary);
        $scope.word = '';
        $scope.dictionary = dictionary.join(',');
      }
    };

    $scope.saveDictionary = function() {
      var dictionary = normalizeWords($scope.dictionary.split(',')).join(',');
      localStorageService.set('en_dict', dictionary);
      $scope.dictionary = dictionary;
    };

    $scope.extractNewWords = function() {
      var text_words = normalizeWords($scope.text.split(/[\s,\.]+/).join(',').split(','));
      console.log(localStorageService.get('en_dict'));
      var dictionary = localStorageService.get('en_dict').split(',');
      $scope.new_words = $scope.difference(text_words, dictionary);
    };

    $scope.translate = function() {
      Translator.query({text: $scope.new_words.join('; ')}, function(data){
        $scope.translations = data.translation.split('; ');
      });
    };

    function normalizeWords(words){
      var filtered_words = $scope.map(words, function(word) {
        result = word.toLowerCase().trim();
        //remove all escape chars on the begining
        if (result[result.length-1]) {
          if (!result[0].match(/[a-z]/)){
            result = result.substring(1, result.length);
          }
        }
        //remove all escape chars in the end
        if (result[result.length-1]) {
          if (!result[result.length-1].match(/[a-z]/)){
            result = result.substring(0, result.length - 1);
          }
        }
        //remove all plurals
        if (result.length > 3 && result[result.length-1] == 's') {
          if (result[result.length-2].match(/[qwrtpdfghjklzxcvbnmy]/)){
            console.log(result);
            console.log(result.substring(0, result.length - 1));
            result = result.substring(0, result.length - 1);
          }
        }
        //remove all "'s"
        if (result.length > 2 && result[result.length-2].match(/’|'/) && result[result.length-1] == 's') {
          console.log(result);
          console.log(result.substring(0, result.length - 2));
          result = result.substring(0, result.length - 2);
        }
        result = result.length > 2 ? result : '';
        return result;
      });
      filtered_words = $scope.compact(filtered_words);
      return $scope.uniq(filtered_words);
    }

  });
