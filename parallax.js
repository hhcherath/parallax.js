/*!
 * parallax.js v1.0 (https://github.com/hhcherath/parallax.js/)
 * @license MIT (https://github.com/hhcherath/parallax.js/blob/main/LICENSE)
 */

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define('parallaxjs', ['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function ($) {
    'use strict';

    var round = Math.round;
    let animationScheduled = false;

    const scheduleAnimation = function () {
        animationScheduled = false;
    };

    const transformations = {
        bgVertical: function (element, offset) {
            return element.css({
                "background-position": 'center ' + -offset + 'px'
            });
        },
        bgHorizontal: function (element, offset) {
            return element.css({
                "background-position": -offset + 'px center'
            });
        },
        vertical: function (element, offset, transition, transform) {
            if (transform === 'none') transform = '';
            return element.css({
                "-webkit-transform": 'translateY(' + offset + 'px)' + transform,
                "-moz-transform": 'translateY(' + offset + 'px)' + transform,
                transform: 'translate(0,' + offset + 'px)' + transform,
                transition: transition,
                "will-change": 'transform'
            });
        },
        horizontal: function (element, offset, transition, transform) {
            if (transform === 'none') transform = '';
            return element.css({
                "-webkit-transform": 'translateX(' + offset + 'px)' + transform,
                "-moz-transform": 'translateX(' + offset + 'px)' + transform,
                transform: 'translate(' + offset + 'px, 0)' + transform,
                transition: transition,
                "will-change": 'transform'
            });
        }
    };

    const calculations = {
        factor: function (element, viewportWidth, settings) {
            let factor = element.data('parallax-factor') || settings.factor;

            if (viewportWidth < 576) {
                return element.data('parallax-factor-xs') || settings.factorXs || factor;
            } else if (viewportWidth <= 768) {
                return element.data('parallax-factor-sm') || settings.factorSm || factor;
            } else if (viewportWidth <= 1024) {
                return element.data('parallax-factor-md') || settings.factorMd || factor;
            } else if (viewportWidth <= 1200) {
                return element.data('parallax-factor-lg') || settings.factorLg || factor;
            } else if (viewportWidth <= 1920) {
                return element.data('parallax-factor-xl') || settings.factorXl || factor;
            }

            return factor;
        },
        bgOffset: function (offset, factor) {
            return round(offset * factor);
        },
        transform: function (offset, factor, viewportHeight, elementHeight) {
            return round((offset - elementHeight / 2 + viewportHeight) * factor);
        }
    };

    const reset = {
        background: function (element) {
            return element.css({ "background-position": 'unset' });
        },
        foreground: function (element) {
            return element.css({ transform: 'unset', transition: 'unset' });
        }
    };

    $.fn.parallax = function (options) {
        const viewportHeight = $(window).height();
        const documentHeight = $(document).height();

        // Default options
        options = $.extend({
            factor: 0,
            factorXs: 0,
            factorSm: 0,
            factorMd: 0,
            factorLg: 0,
            factorXl: 0,
            transition: 'transform .2s ease',
            type: 'background',
            direction: 'vertical'
        }, options);

        return this.each(function () {
            const element = $(this);
            let elementHeight = element.outerHeight();
            let viewportWidth = $(window).width();
            let elementOffset = element.offset().top;
            let initialScrollOffset = 0;

            const trackScroll = function (scrollOffset, newOffset) {
                return initialScrollOffset || (initialScrollOffset = newOffset), newOffset - initialScrollOffset;
            };

            const dataType = element.data('parallax-type') || options.type;
            const dataDirection = element.data('parallax-direction') || options.direction;
            const dataTransition = element.data('parallax-transition') || options.transition;
            const initialTransform = element.css('transform');
            let factor = calculations.factor(element, viewportWidth, options);
            let backgroundOffset = calculations.bgOffset(elementOffset, factor);
            let transformValue = calculations.transform(elementOffset, factor, viewportHeight, elementHeight);

            const updateParallax = function () {
                if (dataType === 'background') {
                    if (dataDirection === 'vertical') {
                        transformations.bgVertical(element, backgroundOffset);
                    } else if (dataDirection === 'horizontal') {
                        transformations.bgHorizontal(element, backgroundOffset);
                    }
                } else if (dataType === 'foreground') {
                    if (dataDirection === 'vertical') {
                        transformations.vertical(element, transformValue, dataTransition, initialTransform);
                    } else if (dataDirection === 'horizontal') {
                        transformations.horizontal(element, transformValue, dataTransition, initialTransform);
                    }
                }
            };

            const isElementInViewport = function () {
                let scrollTop = $(window).scrollTop();
                let elementTop = element.offset().top;
                let elementBottom = elementTop + element.outerHeight();

                return (elementBottom >= scrollTop) && (elementTop <= (scrollTop + viewportHeight));
            };

            $(window).on('resize', function () {
                let scrollTop = $(this).scrollTop();
                viewportWidth = $(window).width();
                elementOffset = element.offset().top;
                elementHeight = element.outerHeight();
                factor = calculations.factor(element, viewportWidth, options);

                backgroundOffset = calculations.bgOffset(elementOffset, factor);
            
                let adjustedTransform = trackScroll(
                    $(document).scrollTop(),
                    calculations.transform(elementOffset, factor, viewportHeight, elementHeight)
                );
            
                if (!animationScheduled) {
                    window.requestAnimationFrame(scheduleAnimation);
                    animationScheduled = true;
                }

                if (isElementInViewport()) {
                    if (dataType === 'background') {
                        reset.background(element);
                        if (dataDirection === 'vertical') {
                            transformations.bgVertical(element, backgroundOffset);
                        } else if (dataDirection === 'horizontal') {
                            transformations.bgHorizontal(element, backgroundOffset);
                        }
                    } else if (dataType === 'foreground' && scrollTop <= documentHeight) {
                        reset.foreground(element);
                        if (dataDirection === 'vertical') {
                            transformations.vertical(element, adjustedTransform, dataTransition);
                        } else if (dataDirection === 'horizontal') {
                            transformations.horizontal(element, adjustedTransform, dataTransition);
                        }
                    }
                }
            });

            $(window).on('load scroll', function () {
                let scrollTop = $(this).scrollTop();
                let docScrollTop = $(document).scrollTop();
                factor = calculations.factor(element, viewportWidth, options);
            
                backgroundOffset = calculations.bgOffset(elementOffset - scrollTop, factor);
            
                let adjustedTransform = trackScroll(
                    docScrollTop,
                    calculations.transform(elementOffset, factor, viewportHeight, elementHeight - scrollTop)
                );
            
                if (!animationScheduled) {
                    window.requestAnimationFrame(scheduleAnimation);
                    animationScheduled = true;
                }

                if (isElementInViewport()) {
                    if (dataType === 'background') {
                        if (dataDirection === 'vertical') {
                            transformations.bgVertical(element, backgroundOffset);
                        } else if (dataDirection === 'horizontal') {
                            transformations.bgHorizontal(element, backgroundOffset);
                        }
                    } else if (dataType === 'foreground') {
                        if (dataDirection === 'vertical') {
                            transformations.vertical(element, adjustedTransform, dataTransition, initialTransform);
                        } else if (dataDirection === 'horizontal') {
                            transformations.horizontal(element, adjustedTransform, dataTransition, initialTransform);
                        }
                    }
                }
            });

            updateParallax();
        });
    };
});
