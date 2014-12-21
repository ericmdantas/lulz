"use strict";

angular
    .module('trophies')
    .controller('TrophiesController', ['TrophiesService', function(TrophiesService)
    {
        var self = this;

        self.trophies = [];

        var _getTop = function()
        {
            var _onSuccess = function(trophies)
            {
                self.trophies = trophies;
            }

            var _onError = function()
            {

            }

            TrophiesService
                .getTop()
                .then(_onSuccess, _onError);
        }

        _getTop();
    }]);