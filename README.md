# wave.js
I couldn't sleep and so I decided to make something quick. This is a wave effect library for simulating the touch wave effect seen on mobile phones. It's fairly easy to use and I made it for personal use. However, please use it as your heart desires. Currently the library only supports modern browsers, but I'll change that later. To see the effect in action, download this library and open the example file in your browser.

Currently the wave.js script allows you to modify the linear time to grow/fade the wave effect and the color (using hex, rgb, or hsl values). Examples of these are available in the example file provided. Here's a snippet if you're in a hurry:
```html
<div wave-effect wave-color="rgba(255,0,0,0.5)" wave-time="300">
  Red wave with 50% opacity and 300ms transition time
</div>
```

## How To
To use the wave effect library, copy and paste this snippet into your pages:
```html
  <script src='path/to/scripts/wave.js'></script>
```
Then for any object you wish to have the effect applied to, add the `wave-effect` attribute to the element. The library will automatically apply the effect as needed.

### Changing transition time
The default time for growing/fading the wave effect is 500ms. To modify this, add the `wave-time` attribute to your elements. e.g. an attribute of `wave-time="1000"` means that the wave effect will take one second to grow and fade.

**HTML**:
```html
<div wave-effect wave-time="1000">One Second</div>
```

### Changing wave color
The default color for the wave is set to `rgba(128,128,128,0.5)` by default. You can modify this by adding the `wave-color` attribute to your elements. e.g. an attribute of `wave-color="#f00"` will make a red wave. You can also use RGB,RGBA,HSL, and HSLA values as they are used in CSS.

**HTML**:
```html
<div wave-effect wave-color="rgba(255,0,0,0.5)">Red wave with 50% opacity</div>
```
