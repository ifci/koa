"use strict";
//view locals
module.exports={
    name: 'koa-mvc',
    title: 'Koa-mvc',
    description: '',
        flash: function(){
        return this.flash;
    },
            user: function(){
        return this.request.user;
    },
    isAuthenticated: function(){
        return this.isAuthenticated()
    },
}