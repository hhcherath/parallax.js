# Parallax.js
This repository provides a customizable and responsive JavaScript plugin to create parallax scrolling effects on elements within a webpage. It allows you to apply parallax effects to both foreground and background elements, with adjustable speed factors depending on the viewport size.

## Features
  * Responsive: Automatically adjusts the parallax speed factor based on the screen size (extra small, small, medium, large, and extra-large).
  * Background & Foreground Parallax: Supports both background and foreground transformations (translation effects).
  * Direction Options: Parallax effect can be applied horizontally or vertically.
  * Customizable Speed Factor: You can control the speed of the parallax effect using the data-parallax-factor attribute or via JavaScript options.

## Installation
### Option 1: Use from GitHub
  1. Download the parallax.js file:
  * You can either clone this repository or download the file directly from the parallax.js file section in this repository.
  2. Link the parallax.js file in your HTML: Include the script at the bottom of your HTML page, before the closing </body> tag
  ```html
  <script src="https://raw.githubusercontent.com/hhcherath/parallax.js/refs/heads/main/parallax.js"></script>
  ```
### Option 2: Download and Include Locally
  1. Download the parallax.js file.
  2. Include it locally in your project:
  ```html
  <script src="path/to/parallax.js"></script>
  ```

## Usage
Once the script is included in your project, you can add the data-parallax attribute to any HTML element that you want to apply the parallax effect to.
Example:
```html
<section class="parallax-section" data-parallax data-parallax-factor="-0.4" style="background-image: url('image.jpg'); background-position: center;">
  <div class="content">
    <h2>Parallax Example</h2>
    <p>This is a parallax example.</p>
  </div>
</section>
```
  1. <b>data-parallax:</b> This attribute enables the parallax effect.
  2. <b>data-parallax-factor:</b> The speed factor of the parallax effect. A value of <b>"-0.4"</b> will scroll slower than the page, giving a subtle effect. Adjust this value to make the effect more or less intense.

## Options
The parallax effect can be customized using the following options:
  1. Factor Based on Screen Size
You can customize the parallax factor for different screen sizes. The script automatically detects the viewport width and applies the appropriate factor:
  * Extra Small Screens (xs): <b>data-parallax-factor-xs</b>
  * Small Screens (sm): <b>data-parallax-factor-sm</b>
  * Medium Screens (md): <b>data-parallax-factor-md</b>
  * Large Screens (lg): <b>data-parallax-factor-lg</b>
  * Extra Large Screens (xl): <b>data-parallax-factor-xl</b>
```html
<section class="parallax-section" data-parallax data-parallax-factor-xs="-0.3" data-parallax-factor-sm="-0.4" data-parallax-factor-md="-0.5" style="background-image: url('image.jpg'); background-position: center;">
  <div class="content">
    <h2>Responsive Parallax</h2>
    <p>This section adjusts its parallax effect based on screen size.</p>
  </div>
</section>
```
  2. Direction
The parallax effect can be applied in either <b>vertical</b> or <b>horizontal</b> direction.
```html
<section class="parallax-section" data-parallax data-parallax-direction="horizontal" data-parallax-factor="-0.4" style="background-image: url('image.jpg');">
  <div class="content">
    <h2>Horizontal Parallax</h2>
    <p>This parallax effect moves horizontally as you scroll.</p>
  </div>
</section>
```
  * <b>data-parallax-direction="horizontal"</b>: Moves horizontally.
  * <b>data-parallax-direction="vertical"</b>: Moves vertically (default).

## Advanced Usage
If you prefer to initialize the parallax effect programmatically, you can call the <b>".parallax()"</b> function directly on any jQuery element.
```javascript
$(document).ready(function() {
  $('.parallax-section').parallax({
    factor: -0.5,             // Default parallax factor
    factorXs: -0.3,           // Factor for small screens
    factorSm: -0.4,           // Factor for medium screens
    factorMd: -0.5,           // Factor for large screens
    type: 'background',       // Apply parallax to background
    direction: 'vertical',    // Apply parallax vertically
    transition: 'transform .2s ease' // Transition effect
  });
});
```
## Special Thanks
This script is a modified version of the original work by <a href="https://github.com/tgomilar" target="_blank">tgomilar</a>. A big thank you for providing the foundation and inspiration for this project! 🙏
