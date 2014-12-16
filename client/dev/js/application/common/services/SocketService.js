"use strict";

lulz.service('SocketService', ['socketFactory', function(socketFactory)
{
    return socketFactory();
}])