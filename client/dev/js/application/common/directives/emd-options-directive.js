"use strict";

lulz.directive('emdOptions', ['OPTIONS', function(OPTIONS)
{
    var _templateUrl = 'partials/includes/emd-options.tpl.html';

    var _link = function(scope, element, attrs)
    {
        scope.options = OPTIONS;

        element.find('.plus-info').on('click', function()
        {
            $('.opt').slideToggle();
            $(this).find('.fa').eq(0).toggleClass('fa-minus');
        })
    }

    var _scope = {};

    return {
                restrict: 'E',
                templateUrl: _templateUrl,
                link: _link,
                scope: _scope
           }
}])