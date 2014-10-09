"use strict";

lulz.directive('emdOptions', ['OPTIONS', function(OPTIONS)
{
    var _template = '<div class="options transition">'+
                        '<ul>'+
                            '<li ng-repeat="opt in options" ' +
                                'class="hand" ' +
                                'emd-change-location-to={{opt.location}}>' +
                                    '<i class="fa fa-{{opt.icon}}"></i>'+
                            '</li>'+

                            '<li class="plus-info">'+
                                '<i class="fa fa-plus"></i>'+
                            '</li>'+
                        '</ul>'+
                    '</div>';

    var _link = function(scope, element, attrs)
    {
        scope.options = OPTIONS;
    }

    var _scope = {};

    return {
                restrict: 'E',
                template: _template,
                link: _link,
                scope: _scope
           }
}])