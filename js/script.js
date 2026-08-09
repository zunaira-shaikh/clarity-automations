/* =============================================================
   CLARITY AUTOMATIONS - site scripts
   Stack: jQuery 3.x (CDN) + vanilla JS helpers.
   Philosophy: subtle, professional motion. Every scroll-driven
   behaviour uses IntersectionObserver (never window scroll).
   Reduced motion is respected throughout.
   ============================================================= */

/* If jQuery never loaded (offline CDN), fall back to a fully
   visible static page: remove the .js hook so reveals render. */
if (typeof window.jQuery === 'undefined') {
  document.documentElement.classList.remove('js');
  document.documentElement.classList.add('no-js');
}

(function ($) {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------------
     0. Single source for the contact email.
        The address lives in index.html (search "js-email").
        Updating it there updates the form builder below too.
     --------------------------------------------------------- */
  var CONTACT_EMAIL = ($('.js-email').first().attr('href') || '').replace('mailto:', '');

  /* ---------------------------------------------------------
     1. Header scrolled state + back-to-top visibility.
        A sentinel sits at the top of the page. When it leaves
        the viewport, the user has scrolled. No scroll listener.
     --------------------------------------------------------- */
  var $header = $('#site-header');
  var $backToTop = $('#back-to-top');
  var sentinel = document.getElementById('top-sentinel');

  if (sentinel && 'IntersectionObserver' in window) {
    var sentinelIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var scrolled = !entry.isIntersecting;
        $header.toggleClass('is-scrolled', scrolled);
        $backToTop.toggleClass('is-visible', scrolled);
      });
    });
    sentinelIO.observe(sentinel);
  }

  $backToTop.on('click', function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReduced.matches ? 'auto' : 'smooth'
    });
  });

  /* ---------------------------------------------------------
     2. Mobile navigation (hamburger).
        The CTA button is cloned into the mobile menu so desktop
        and mobile both have one "Start a Project" affordance.
     --------------------------------------------------------- */
  var $navToggle = $('#nav-toggle');
  var $siteNav = $('#site-nav');

  $siteNav.append(
    $('<a class="btn btn-primary mobile-cta" href="#contact">Let\'s Work Together</a>')
  );

  function setMenu(open) {
    $siteNav.toggleClass('is-open', open);
    $navToggle.toggleClass('is-open', open);
    $navToggle.attr('aria-expanded', String(open));
    $navToggle.attr('aria-label', open ? 'Close menu' : 'Open menu');
  }

  $navToggle.on('click', function () {
    setMenu(!$siteNav.hasClass('is-open'));
  });

  // Close the menu when a link is chosen, Escape is pressed, or a click lands outside.
  $siteNav.on('click', 'a', function () { setMenu(false); });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  $(document).on('click', function (e) {
    if ($siteNav.hasClass('is-open') && !$(e.target).closest('.site-header').length) {
      setMenu(false);
    }
  });

  /* ---------------------------------------------------------
     3. Scroll-spy: highlight the nav item for the section
        currently in the middle of the viewport.
     --------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var $links = $siteNav.find('a');
          $links.removeClass('is-active');
          $siteNav
            .find('a[href="#' + entry.target.id + '"]')
            .addClass('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    document.querySelectorAll('main section[id]').forEach(function (section) {
      spyIO.observe(section);
    });
  }

  /* ---------------------------------------------------------
     4. Scroll-reveal: fade-up sections as they enter the viewport.
        Stagger is applied per element from its data-delay value.
     --------------------------------------------------------- */
  var $reveals = $('.reveal');

  $reveals.each(function () {
    var delay = $(this).data('delay');
    if (delay != null) {
      this.style.setProperty('--rd', delay + 'ms');
    }
  });

  if ('IntersectionObserver' in window && !prefersReduced.matches) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    $reveals.each(function () { revealIO.observe(this); });
  } else {
    // No observer support or reduced motion: show everything without animation.
    $reveals.addClass('is-inview');
  }

  /* ---------------------------------------------------------
     5. Placeholder links (e.g. "View Project" until real URLs
        exist). Remove the js-placeholder-link class once you add
        a real href and the click stops being intercepted.
     --------------------------------------------------------- */
  $('.js-placeholder-link').on('click', function (e) {
    e.preventDefault();
  });

  /* ---------------------------------------------------------
     6. Contact form: client-side validation, then open the
        visitor's email client with a pre-filled message.
        This is intentionally frontend-only. To send from the
        site directly, see the backend options commented in
        index.html (Formspree / EmailJS / Netlify Forms) and
        replace the mailto block at the end of this section.
     --------------------------------------------------------- */
  var $form = $('#contact-form');

  if ($form.length) {

    var $name = $('#name');
    var $email = $('#email');
    var $company = $('#company');
    var $message = $('#message');
    var $success = $('#form-success');

    var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError($field, message) {
      var $wrap = $field.closest('.form-field');
      $wrap.toggleClass('is-error', !!message);
      $wrap.find('.form-error').text(message || '');
      return !message;
    }

    function validateName() {
      var value = $.trim($name.val());
      if (!value) return setError($name, 'Please enter your name.');
      if (value.length < 2) return setError($name, 'Your name should be at least 2 characters.');
      return setError($name, '');
    }

    function validateEmail() {
      var value = $.trim($email.val());
      if (!value) return setError($email, 'Please enter your email.');
      if (!EMAIL_PATTERN.test(value)) return setError($email, 'Please enter a valid email address.');
      return setError($email, '');
    }

    function validateMessage() {
      var value = $.trim($message.val());
      if (!value) return setError($message, 'Please enter a message.');
      if (value.length < 10) return setError($message, 'Your message should be at least 10 characters.');
      return setError($message, '');
    }

    // Tie each validator to its field so submit can focus the first failed one.
    validateName.$fieldEl = $name;
    validateEmail.$fieldEl = $email;
    validateMessage.$fieldEl = $message;

    // Validate a field when the user leaves it.
    $name.on('blur', validateName);
    $email.on('blur', validateEmail);
    $message.on('blur', validateMessage);

    // Clear the error as soon as the user starts correcting the field.
    $name.add($email).add($message).on('input', function () {
      $(this).closest('.form-field').removeClass('is-error');
      $(this).closest('.form-field').find('.form-error').text('');
    });

    $form.on('submit', function (e) {
      e.preventDefault();

      var firstError = null;

      [validateName, validateEmail, validateMessage].forEach(function (check) {
        if (!check() && !firstError) firstError = check.$fieldEl || null;
      });

      if (firstError) {
        if (typeof firstError.trigger === 'function') firstError.trigger('focus');
        return;
      }

      // Build the pre-filled message and hand off to the visitor's mail client.
      if (!CONTACT_EMAIL) {
        setError($email, 'No contact email is configured. Add one in index.html (search "js-email").');
        return;
      }

      var subject = 'Project inquiry from ' + $.trim($name.val());
      var body =
        'Name: ' + $.trim($name.val()) +
        '\nEmail: ' + $.trim($email.val()) +
        '\nCompany: ' + ($.trim($company.val()) || 'Not provided') +
        '\n\nMessage:\n' + $.trim($message.val());

      var mailto =
        'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailto;

      if ($success) $success.prop('hidden', false);
    });
  }

})(window.jQuery);