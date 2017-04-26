/* eslint angular/window-service: 0 */
/* eslint angular/document-service: 0 */

'use strict';

window.getThumbSize = function(rs, w, h, lengthByRow) {
  var width = 384,
    height = 205;
  /**
   * Nahuel: por ahora:
   * IS_TABLET: 3 items por fila portrait
   * IS_MOBILE: 2 items por fila portrait
   **/
  if (rs.IS_TABLET) {
    if (rs.IS_PORTRAIT) {
      width = 230 * 2;
      height = 144 * 2;
    } else {
      width = 244 * 2;
      height = 153 * 2;
    }
  } else if (rs.IS_PORTRAIT) {
    if (lengthByRow === 1) {
      width = 640;//304;
      height = 360;//480//193;
    } else {
      //2 items por fila
      width = 144 * 2;
      height = 91 * 2;
    }
  } else {
    //3 items por fila
    width = 144;
    height = 91;
  }

  return {
    width: w || width,
    height: h || height
  };
};

angular
  .module('app.filters', [])
  .filter('thumb', ['$rootScope', 'KALTURA',
    function($rootScope, KALTURA) {
      return function(input, width, height, lengthByRow, extra) {
        var size = window.getThumbSize($rootScope, width, height, lengthByRow),
          sizeStr = [];

        if (input && input.indexOf('amazonaws') === -1) {
          if (width !== null) {
            sizeStr.push('w_' + (width === 0 ? size.width : width));
          }
          if (height !== null) {
            sizeStr.push('h_' + (height === 0 ? size.height : height));
          }
          sizeStr = sizeStr.join(',');

          if (input.indexOf('w_') !== -1) {
            return input.replace('w_320,h_180', sizeStr);
          } else if (input.indexOf('upload') !== -1) {
            return input.substring(0, input.indexOf('upload')) + 'upload/' + sizeStr + input.substring(input.lastIndexOf('upload') + 6);
          } else if (input.indexOf('cameratag.com') === -1) {
            sizeStr = [];
            if (width !== null) {
              sizeStr.push('/width/' + (width === 0 ? size.width : width));
            }
            if (height !== null) {
              sizeStr.push('/height/' + (height === 0 ? size.height : height));
            }
            return KALTURA.FULL_PATH + input + sizeStr.join('') + '/type/3' + (extra ? extra : '');
          }
        }

        return input;
      };
    }
  ])
  .filter('trustSrc', ['$sce',
    function($sce) {
      return function(src) {
        return $sce.trustAsResourceUrl(src);
      };
    }
  ])
  .filter('trustHtml', ['$sce',
    function($sce) {
      return function(html) {
        return $sce.trustAsHtml(html);
      };
    }
  ])
  .filter('parseDate', [function() {
    return function(input, full) {
      var d = null;
      if (input) {
        d = new Date(input);
        input = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

        if (full) {
          input += ' ' + d.getHours() + ':' + d.getMinutes();
        }
      }
      return input;
    };
  }])
  .filter('cut', [function() {
    return function(input, chars) {
      var output = '',
        truncated = '',
        lastSpacePos = '';

      if (input && input.length > chars) {
        truncated = input.substring(0, chars);
        lastSpacePos = truncated.lastIndexOf(' ');
        if (lastSpacePos > 0) {
          output = truncated.substring(0, lastSpacePos);
        } else {
          output = truncated;
        }
        output += '...';
      }
      return output || input;
    };
  }])
  .filter('secondsToHuman', [function() {
    return function(input) {
      var sec = null,
        hours = null,
        minutes = null,
        seconds = null;

      if (input) {
        sec = parseInt(input, 10);
        hours = Math.floor(sec / 3600);
        minutes = Math.floor((sec - (hours * 3600)) / 60);
        seconds = sec - (hours * 3600) - (minutes * 60);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        input = hours + ':' + minutes + ':' + seconds;
      }
      return input;
    };
  }]);
