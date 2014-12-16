"use strict";

lulz.directive('toTheTop', ['$window', function($window)
{
    var _template = '<div id="to-the-top" class="hand"><i class="fa fa-angle-up"></i></div>';

    var _link = function(scope, element, attrs)
    {
        element.fadeOut();

        var _onScroll = function()
        {
            var _method = ($($window).scrollTop() > 500) ? 'fadeIn' : 'fadeOut';

            element[_method]();
        }

        $($window).scroll(_onScroll);

        element.on('click', function()
        {
            $window.scrollTo(0, 0);
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
}])