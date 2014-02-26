ImageUploadHelper
=================

## A HTML5 file input addon for make a preview of the files.
* This is a Jquery plugin!
* Boostrap ready!
This means default settings ready for bootstrap.
* Multiple file support!

Example
=================

```HTML
<span class="btn btn-primary btn-file">
	Select images (<span>0</span> piece)
	<!-- if the cssSupport true than the input will be hidden -->
	<input type="file" name="image" multiple>
</span>
<br/><br/>
<!-- this is the holder of the images -->
<div data-for="image">
</div>
```
```Javascript
jQuery('input[name="image"]').ImageUploadHelper({
	allFileLoaded: function(frs){
		// this will put the count of selected files
		// 'this' is always the input field
		jQuery(this).prev().text(frs.length);
	}
});
```

Extended example
==================
```javascript
jQuery('input[name="image"]').ImageUploadHelper({
	maxNumberOfFiles: 3,
	higherNumberOfFiles: function(){
		jQuery(this).each(function(i,elem){
			jQuery(elem).val('');
		});
		jQuery(this).change();
		console.log("More than 3!");
	},
	fileLoaded: function(file,fr){
		//jQuery('span:first',jQuery(this).parent()).text(file.name);
	},
	allFileLoaded: function(files,frs){
		var string = "";
		jQuery.each(files,function(a,file){
			string += ", "+file.name;
		});
		jQuery('span:first',jQuery(this).parent()).text(string.substring(2));
		//jQuery(this).prev().text(files.length);
	}
});
```

Test image
=======

[![example](http://imageshack.com/a/img600/5654/f47k.png)](#example)

Attributes
==================

| Name  | Info |
| ------------- | ------------- |
| fileLoaded | that has a parameter the contains one file which loaded |
| cssSupport | if it's true than hide the input |
| dataFor | the selector of the holder for showing images example data-for="*" |
| fileTemplate | this is a template for the images |
| allFileLoaded | that's called when all files loaded from the input |
