# StylCompile

Link: http://stylcompile.herokuapp.com

## Details

Sometimes, I like to visualize the compilation of my Stylus using Try Stylus.
I got frustrated with the tiny space it offers to work with, though. It also
seems outdated most of the time - I remember not being able to use `@extend`
on it a while ago. So, I made this.

It uses an AJAX request to a route that compiles the Stylus and sends back the
CSS, this way there's no worrying about putting Stylus on the browser and makes
it rather easy to integrate plugins and update Stylus, with a small cost of
latency. If the latency bothers you, simply clone the project and run it
locally - there's no latency that way!

## Bear with me here...

This is still very early code and I haven't wrapped my head around most of the
features yet. For now, it does what is needed. Before adding any new features,
I will be refactoring the messy assets. You can check out my progress in the
issues tab (pull requests welcome).
