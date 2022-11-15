# easy apache2 gdpr wall
This let you configure an easy gdpr wall on your vhost.

## How it works
In apache2 we can use `RewriteEngine` [^1] to rewrite requested URLs on the fly.
We redirect all requested URLs to a subpath "/gdpr" if the user has not consented to our `gdpr_cookie`.
If the user requested a URL with subpath like `https://example.com/some/path/index.html` we save
the subpath for subsequent redirects.

## Configuration
 * Copy the files in `src/` to `/var/www/gdpr` or `/var/www/gdpr/perVhostGdpr`.
 * Copy the files in `config/` to `/etc/apache2/`.

### gdpr.conf 
You have to define the `GDPR_COOKIE_NAME` variable in your vhost like:

    Define GDPR_COOKIE_NAME gdpr_approved

If your files located at `/var/www/gdpr/perVhostGdpr` or something you have to redefine the
location in `gdpr.conf`:

    Alias /gdpr /var/www/gdpr -> Alias /gdpr /var/www/gdpr/perVhostGdpr

### gdpr.js 
You have to change some variables in `files/gdpr.js`:
```
const gdpr_cookie = "gdpr_approved";
const cookie_max_age = "7776000"; // 90 days
const domain = "example.com";
```

### your vhost
Here is a snippet for an example vhost

```
<--- snip --->

Define GDPR_COOKIE_NAME gdpr_approved

<--- snip --->

  DocumentRoot /var/www/empty

  # restrict accessibility
  <Location />
    Require all denied
  </Location>

  ########### GDPR WALL #################
  Include gdpr.conf
  ########### GDPR WALL #################

  Alias /website /var/www/html/htdocs/website
  <Location /website>
    Require all granted
    Options +MultiViews
  </Location>

<--- snip --->

</VirtualHost>
</IfModule>

```

### index.html
Don't forget to change the GDPR-text in the `index.html` file :)

## Notes
 * The Brave browsers shields function [^3] blocks the `gdpr.js` javasrcipt. You have to disable it
   for your site.


## Credits
Thanks to senfcall [^2] for the inspirations.

[^1]: https://httpd.apache.org/docs/current/mod/mod_rewrite.html
[^2]: https://gitlab.senfcall.de/senfcall-public/gdpr-authenticator
[^3]: https://brave.com/shields/
