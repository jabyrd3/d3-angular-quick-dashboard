'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
}])
.directive('ladda', function(){
  return {
    require: '?ngModel',
    restrict: 'A',
   link : function postLink(scope, attr, elem, ctrl){    
    
    var l = Ladda.create( document.querySelector('#'+elem.id));
    
    scope.$watch('loading', function(newVal, oldVal){
      if (newVal !== undefined){
        if(newVal)
          l.start();
        else
          l.stop(); 
      }
    });
   } 
  
  };
  });
