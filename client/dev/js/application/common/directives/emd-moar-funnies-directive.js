"use strict";

lulz.directive('emdMoarFunnies', [function()
{
    var _restrict = 'E';

    var _templateUrl = 'partials/includes/moar-funnies.html';

    var _link = function(scope, element, attrs)
    {
        element.on('click', function()
        {
            scope.loadMore();
        })
    }

    var _scope = {loadMore: '&'};

    return {
                restrict: _restrict,
                templateUrl: _templateUrl,
                link: _link,
                scope: _scope
           };
}])