//Age gate must go inline so that it fires first up

"use strict";

/**
 * [AgeGate Constructor]
 * @param {int} restrict    the minimum legal age to view site
 * @param {string} cookieName unique name for the cookie
 */
var AgeGate = function (restrict, cookieName){
    this.host        =  window.location.hostname;
    this.http        = (location.protocol === 'https:')? 'https://' : 'http://';
    this.path        = window.location.pathname;
    this.oldHash     = (window.location.href.split("#").slice(1).join('#') || "");
    this.ageGateUrl    = this.http 
                        + this.host 
                        + '/#/age-gate';
    this.restrict    = restrict || 18;
    this.cookieName  = cookieName || window.location.hostname + 'AgeGate';
    this.haveCookie  = false;
    this.secondsInYear = 31556926;
    this.validAge = false;
}

AgeGate.prototype = {
   
    //  :: cookies.js ::
    //
    //  A complete cookies reader/writer framework with full unicode support.
    //
    //  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
    //
    //  This framework is released under the GNU Public License, version 3 or later.
    //  http://www.gnu.org/licenses/gpl-3.0-standalone.html
    docCookies : {
      /**
       * Retreives a cookie bassed on sKey
       * @param  {string} sKey cookie
       * @return {string}   cookie value
       */
      getItem: function (sKey) {
        return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*)|.*"), "$1")) || null;
      },
      /**
       * Sets a cookie and it's value
       * @param {string} sKey    the cookie name
       * @param {string|int} sValue  the value to be stored in the cookie
       * @param {int} vEnd    cookies expire time
       * @param {string} sPath   path of the cookie. use / for entire site
       * @param {string} sDomain domain name to map cookie to
       * @param {book} bSecure use SSL
       */
      setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
          switch (vEnd.constructor) {
            case Number:
              sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
              break;
            case String:
              sExpires = "; expires=" + vEnd;
              break;
            case Date:
              sExpires = "; expires=" + vEnd.toGMTString();
              break;
          }
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
      },
      /**
       * removes a cookie
       * @param  {string} sKey  cookie name
       * @param  {string} sPath saved path. / for entire site
       * @return {bool}       true
       */
      removeItem: function (sKey, sPath) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
        return true;
      },
      /**
       * Checks to see if a cookie exists    
       * @param  {String}  sKey cookie name
       * @return {Boolean}
       */
      hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      },
      keys: /* optional method: you can safely remove it! */ function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
        return aKeys;
      }
    },
    /**
     * Validates a Unix timestamp to see if it's less than the minimum age
     * @param  {int} birthday Unix timestamp. If using Date object, must divide by 1000 to remove the milliseconds
     * @return {bool}          true|false
     */
    validate : function(birthday){
        var today = new Date(),
        
        //convert dates to Unix Timestamps by dividing them by 1000
        today = (Math.round(today.getTime() / 1000)) - (this.secondsInYear * this.restrict);
        birthday = (Math.round(birthday.getTime()) / 1000);
        
        this.validAge = birthday < today? true : false;
        if (!this.validAge) alert('You are not 18 are you...?');
        return this.validAge
    },
    /**
     * Wrapper to set the cookie
     */
    setCookieAsValid : function(){
        this.docCookies.setItem(this.cookieName,'ageCheckValid=true',0,'/');
    },
    /**
     * Wrapper to get the cookie
     * @return {string} string from cookie
     */
    getCookie : function(){
        return this.docCookies.getItem(this.cookieName);
    },
    /**
     * Redirects to the refering @package [name]    
     */
    redirectToReferrer : function(){
        liocation = this.theUrl;
    }
}