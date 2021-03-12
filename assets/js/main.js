/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);


/*
Copyright (c) 2021 by Jack Rugile (https://codepen.io/jackrugile/pen/fHwEo)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Playground
var elem = document.querySelector( '.playground--ball' ),
    mx = 0,
    my = 0,
    mxOffset = 0,
    myOffset = 0,
    ex = window.innerWidth / 2,
    ey = 0,
    ew = elem.offsetWidth,
    eh = elem.offsetHeight,
    vx = 0,
    vy = 0,
    // ww = window.innerWidth,
    // wh = window.innerHeight,
    ww = elem.parentElement.clientWidth,
    wh = elem.parentElement.clientHeight,
    tracking = false,
    raf = null,
    prefixes = [ '-o-', '-ms-', '-moz-', '-webkit-', '' ];


function prefixCss( elem, prop, val ) {
	  var length = prefixes.length,
		  i = 0;
	  for( ; i < length; i++ ) {
		    elem.style[ prefixes[ i ] + prop ] = val;
	  }
}


function setElemCoords( x, y ) {
  prefixCss( elem, 'transform', 'translate3d( ' + x + 'px, ' + y + 'px, 0)'  );
  elem.setAttribute( 'data-x', x );
  elem.setAttribute( 'data-y', y );
  ex = x;
  ey = y;
}

function checkBounds() {
  if( ex + ew > ww ) {
    if( tracking ) {
      vx = 0;
    } else {
      vx = -vx * 0.7;
      vy *= 0.99;
    }
    ex = ww - ew;    
  }
  
  if( ex < 0 ) {
    if( tracking ) {
      vx = 0;
    } else {
      vx = -vx * 0.7;
      vy *= 0.99;
    }
    ex = 0;    
  }
  
  if( ey + eh > wh ) {
    if( tracking ) {
      vy = 0;
    } else {
      vx *= 0.99;
      vy = -vy * 0.7;
    }
    ey = wh - eh;    
  }
  
  if( ey < 0 ) {
    if( tracking ) {
      vy = 0;
    } else {
      vx *= 0.99;
      vy = -vy * 0.7;
    }
    ey = 0;    
  }
}

function mousedowncb() {
  tracking = true;
  setElemCoords( ex, ey );
  mxOffset = mx - ex;
  myOffset = my - ey;
}

function mouseupcb() {
  tracking = false;
}

function mousemovecb( e ) {
  mx = e.clientX;
  my = e.clientY;
}

// function resizecb() {
//   ww = window.innerWidth;
//   wh = self.innerHeight;
// }

function resizecb() {
  // ww = 600;
  // wh = 600;
}

function loop() {
  raf = requestAnimationFrame( loop );
  if( tracking ) {
    vx = ( mx - mxOffset - ex ) / 2;
    vy = ( my - myOffset - ey ) / 2;
  }
  vy += 0.9;
  vx *= 0.99;
  vy *= 0.99;
  ex += vx;
  ey += vy;
  
  checkBounds();
  
  setElemCoords( ex, ey );
}

// bind events
elem.addEventListener( 'mousedown', mousedowncb, false );
window.addEventListener( 'mouseup', mouseupcb, false );
window.addEventListener( 'mousemove', mousemovecb, false );
window.addEventListener( 'resize', resizecb, false );

// set initial properties for element
setElemCoords( ex, ey );

loop();