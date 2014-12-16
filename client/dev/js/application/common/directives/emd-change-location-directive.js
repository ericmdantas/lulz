"use strict";

lulz.directive('emdChangeLocationTo', ['$rootScope', '$location', function($rootScope, $location)
{
    var _link = function(scope, element, attrs)
    {
        element.on('click', function()
        {
            $rootScope.$apply(function()
            {
                $location.path(attrs.emdChangeLocationTo);
            })
        })
    }

    return _link;
}])