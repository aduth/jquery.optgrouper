# jQuery Optgrouper

Optgrouper is a jQuery plugin which makes it easy to group related `<option>` elements into `<optgroup>` groupings using a custom `data-optgroup` attribute.

[Demonstration](http://aduth.github.com/jquery.optgrouper/)

### Usage

Add `data-optgroup` attribute to each `<option>` element.

```html
<select id="selAnimals">
    <option data-optgroup="Mammals">Cheetah</option>
    <option data-optgroup="Reptiles">Lizard</option>
    <option data-optgroup="Reptiles">Snake</option>
    <option data-optgroup="Mammals">Elephant</option>
</select>
```

Include jquery.js and jquery.optgrouper.js, then call Optgrouper when page is ready.

```html
<script src="jquery.js"></script>
<script src="jquery.optgrouper.js"></script>
<script>
$(document).ready(function() {
    $('#selAnimals').optgrouper();
});
</script>
```
